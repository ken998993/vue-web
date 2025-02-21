<script>
import { ref, onMounted } from 'vue';
import { checkFriendList } from '@/services/friends_api';  // 导入 checkFriendList API
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
      chatRoomId: null,  // 当前聊天房间 ID
      showEmojiPicker: false,  // 表情选择器的显示状态
      emojis: ['😊', '😂', '😍', '😭', '😜', '😎', '😢', '😅', '😄']  // 可用的表情列表
    };
  },
  mounted() {
    // 获取好友列表
    this.fetchFriends();

    // 获取当前用户信息
    const userStore = useUserStore();

    if (userStore.getUser) {
      this.currentUser = userStore.getUser; // 直接从 store 获取当前用户信息
      console.log('用户信息已加载:', this.currentUser);
    } else {
      console.log('用户信息未加载');
    }

    // WebSocket 连接
    this.connectSocket();
  },
  methods: {
    // 获取好友列表
    async fetchFriends() {
      try {
        const friendsData = await checkFriendList();  // 调用 checkFriendList API 获取好友列表
        if (friendsData && friendsData.friends) {
          this.friends = friendsData.friends;  // 将好友数据赋值给 friends
          console.log('friends', this.friends);
        } else {
          this.friends = [];  // 如果没有找到好友数据，赋空数组
        }
      } catch (error) {
        console.error('获取好友列表失败:', error);
        this.friends = [];  // 如果获取失败，也赋空数组
      }
    },

    // WebSocket 连接
    connectSocket() {
      this.socket = io('http://localhost:5001');
      
      this.socket.on('connect', () => {
        console.log('已连接到 WebSocket 服务器');
        this.isConnected = true;
      });

      this.socket.on('disconnect', () => {
        console.log('连接丢失');
        this.isConnected = false;
      });

      // 监听聊天记录
      this.socket.on('chat_history', (data) => {
        console.log('收到聊天记录:', data);
        this.messages = data.messages;
        this.scrollToBottom();  // 滚动到聊天底部
      });

      // 监听新消息
      this.socket.on('new_message', (message) => {
        console.log('收到新消息:', message);
        this.messages.push(message);
        this.scrollToBottom();
      });

      // 监听错误消息
      this.socket.on('error', (error) => {
        console.error('错误:', error.message);
      });
    },

    // 发送消息
    sendMessage() {
      if (this.messageInput.trim()) {
        console.log('正在发送消息:', this.messageInput);
        
        let chatRoomId = this.selectedFriend ? this.selectedFriend.chatRoomId : null;
        let currentUserId = this.currentUser ? this.currentUser.id : null;
        let friendId = this.selectedFriend.id;
        
        if (!chatRoomId && this.chatRoomId) {
          chatRoomId = this.chatRoomId;
        }

        this.socket.emit('send_message', {
          currentUserId,
          friendId,
          chatRoomId,
          content: this.messageInput
        });

        this.messageInput = '';  // 清空输入框
      } else {
        console.log('输入框为空，未发送消息');
      }
    },

    // 切换表情选择器显示状态
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
    },

    // 插入表情
    insertEmoji(emoji) {
      this.messageInput += emoji;
      this.showEmojiPicker = false;  // 关闭表情选择器
    },

    // 滚动到消息底部
    scrollToBottom() {
      this.$nextTick(() => {
        const messagesContainer = this.$refs.messagesContainer;
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      });
    },

    // 关闭聊天窗口
    closeChatWindow() {
      this.toggleChatWindow();
    },

    // 选择好友进行聊天
    selectFriend(friend) {
      this.selectedFriend = friend;
      this.messages = [];
      this.fetchChatHistory();  // 获取新的聊天记录
    }
  }
};
</script>
<style scoped>
/* 之前的样式保持不变 */

.input-area {
  padding: 10px;
  display: flex;
  align-items: center;
}

.input-area input {
  width: 80%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.input-area button {
  padding: 8px;
  margin-left: 10px;
  font-size: 16px;
  cursor: pointer;
}

.emoji-picker {
  position: absolute;
  bottom: 40px;
  right: 20px;
  background-color: white;
  border: 1px solid #ddd;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.emoji-picker span {
  cursor: pointer;
  font-size: 20px;
}

.emoji-picker span:hover {
  background-color: #3498db;
  color: white;
  border-radius: 50%;
}
</style>
