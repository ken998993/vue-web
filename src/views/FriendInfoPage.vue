<template>
    <div class="chat-window" v-if="isChatWindowVisible">
      <!-- 左侧：好友列表 -->
      <div class="friend-list">
        <h3>好友列表</h3>
        <ul>
          <li v-if="friends.length === 0">查无好友</li>
          <li 
            v-for="friend in friends" 
            :key="friend.id"
            @click="selectFriend(friend)"
          >
            {{ friend.username }}
          </li>
        </ul>
      </div>
  
      <!-- 右侧：聊天内容 -->
      <div class="chat-box">
        <div class="chat-header">
          <h2 v-if="selectedFriend">{{ selectedFriend.username }}的聊天</h2>
          <h2 v-else>聊天列表</h2>
          <button @click="closeChatWindow">关闭</button>
        </div>
  
        <!-- 消息内容 -->
        <div class="messages" ref="messagesContainer">
          <div v-if="messages.length === 0 && !isConnected" class="error-message">
            连接失败，请检查网络或稍后再试。
          </div>
          
          <div v-for="(msg, index) in messages" :key="index" class="message">
            <div class="message-content">
              <!-- 头像使用动态路径 -->
              <div class="profile-image-container">
                <img :src="`/src/image/photo/${msg.sender.profile_picture}`" alt="Profile Picture" class="profile-image" />
              </div>
              <div class="message-info">
                <strong>{{ msg.sender.username }}</strong>
                <p v-html="msg.content"></p>
              </div>
            </div>
          </div>
        </div>
    
        <!-- 输入框 -->
        <div class="input-area">
          <input type="text" v-model="messageInput" @keyup.enter="sendMessage" placeholder="输入消息" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useUserStore } from '@/stores/userStore';  // 导入 Pinia store
  import { io } from 'socket.io-client';
  
  export default {
    props: {
      isChatWindowVisible: {
        type: Boolean,
        required: true
      },
      toggleChatWindow: {
        type: Function,
        required: true
      }
    },
    data() {
      return {
        socket: null,
        messages: [],
        messageInput: '',
        selectedFriend: null,  // 当前选中的好友
        friends: [],  // 好友列表
        isConnected: false,  // 连接状态
        currentUser: null,  // 当前用户信息
      };
    },
    mounted() {
      // 获取当前用户信息
      const userStore = useUserStore();
      this.currentUser = userStore.getUser;  // 获取当前用户信息
  
      // 获取好友列表
      this.fetchFriends();
  
      // WebSocket 连接
      this.connectSocket();
    },
    methods: {
      // 获取好友列表
      async fetchFriends() {
        // 伪代码：获取好友数据
        this.friends = await fetch('/api/friends').then(res => res.json());
      },
  
      // WebSocket 连接
      connectSocket() {
        this.socket = io('http://localhost:5001');
        
        this.socket.on('connect', () => {
          console.log('已连接到 WebSocket 服务器');
          this.isConnected = true;  // 成功连接
        });
  
        this.socket.on('disconnect', () => {
          console.log('连接丢失');
          this.isConnected = false;  // 连接丢失
        });
  
        // 监听聊天记录
        this.socket.on('chat_history', (data) => {
          this.messages = data.messages;  // 更新聊天记录
        });
  
        // 监听新消息
        this.socket.on('new_message', (message) => {
          console.log('收到新消息:', message);
          this.messages.push(message);
        });
      },
  
      // 发送消息
      sendMessage() {
        if (this.messageInput.trim()) {
          console.log('正在发送消息:', this.messageInput);
  
          // 发送消息
          this.socket.emit('send_message', {
            senderId: this.currentUser.id,
            content: this.messageInput,
          });
  
          this.messageInput = '';  // 清空输入框
        }
      },
  
      // 选择好友进行聊天
      selectFriend(friend) {
        this.selectedFriend = friend;
      },
  
      // 关闭聊天窗口
      closeChatWindow() {
        this.toggleChatWindow();
      },
    }
  };
  </script>
  
  <style scoped>
  .chat-window {
    display: flex;
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 500px;
    height: 450px;
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    z-index: 9999;
    overflow: hidden;
  }
  
  .friend-list {
    width: 120px;
    border-right: 1px solid #ddd;
    padding: 10px;
    overflow-y: auto;
  }
  
  .friend-list ul {
    list-style-type: none;
    padding-left: 0;
  }
  
  .friend-list li {
    padding: 8px;
    cursor: pointer;
  }
  
  .friend-list li:hover {
    background-color: #3498db;
    color: white;
  }
  
  .chat-box {
    flex-grow: 1;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }
  
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #3498db;
    color: white;
  }
  
  .messages {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
  }
  
  .message {
    display: flex;
    margin-bottom: 10px;
  }
  
  .profile-image-container {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
  }
  
  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .message-info {
    flex-grow: 1;
  }
  
  .message-info strong {
    display: block;
    margin-bottom: 5px;
  }
  
  .message-info p {
    margin: 0;
  }
  
  .input-area {
    padding: 10px;
  }
  
  .input-area input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  </style>
  