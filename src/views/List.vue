<template>
  <div class="about">
    <h1>朋友名單</h1>
    <div class="people-list">
      <!-- 使用 v-for 遍历每个用户，并显示详细信息 -->
      <div class="person-card" v-for="person in people" :key="person.id">
        <!-- 用户头像和信息 -->
        <div class="person-info">
          <img 
            v-if="person.profile_picture" 
            :src="`/src/image/photo/${person.profile_picture}`" 
            alt="Profile Picture" 
            class="profile-picture" 
          />
          <div class="info-details">
            <div class="info-row">
              <strong>Username:</strong> {{ person.username }}
            </div>

            <!-- 用户的个人简介 -->
            <div class="info-row" v-if="person.bio">
              <strong>Bio:</strong> {{ person.bio }}
            </div>
          </div>
        </div>

        <!-- 添加好友按钮 -->
        <div class="add-friend">
          <button class="add-friend-btn" @click="addFriend(person.id)">
            添加好友
          </button>
        </div>

        <!-- 每个用户的上下分隔线 -->
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { addFriends, getAllUsers } from '../services/friends_api';  // 导入 friendServiceApi

export default {
  name: 'About',
  data() {
    return {
      people: []  // 用來存儲從後端獲取的資料
    };
  },
  created() {
    // 在组件创建时，发送请求获取数据
    this.getAllUsers();  // 调用方法获取所有用户
  },
  methods: {
    // 获取所有用户（排除自己和好友）
    async getAllUsers() {
      try {
        const response = await getAllUsers();  // 调用 API 获取所有用户
        console.log("Users data:", response.users);  // 调试用
        this.people = response.users;  // 将用户数据赋值给 people
      
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('获取用户数据失败，请稍后再试');
      }
    },

    // 添加好友的功能
    async addFriend(friendId) {
      try {
        await addFriends(friendId);  // 调用 addFriends 方法，传入 friendId
        alert('成功添加為好友!');
        console.log('Successfully added friend:', friendId);  // 你可以在这里处理成功的返回数据
      } catch (error) {
        console.error('Add friend failed:', error);
        alert('加好友失败，请稍后再试');
      }
    }
  }
};
</script>

<style scoped>
.about {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  justify-content: top; /* Center content vertically */
  min-height: 100vh; /* Make sure the content takes full height */
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  color: #333;
}

.people-list {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Adjust gap between cards */
  width: 100%;
  max-width: 900px; /* Limit width to a reasonable size */
}

.person-card {
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border: 2px solid #fff; /* White border for the card */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin: 0 auto; /* Center the card */
}

.person-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.person-info {
  display: flex;
  align-items: center;
}

.profile-picture {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
}

.info-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #333;
}

.info-row {
  margin: 5px 0;
}

strong {
  font-weight: 600;
  color: #333;
}

.add-friend-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-friend-btn:hover {
  background-color: #2980b9;
}

/* Responsive Design */
@media (max-width: 768px) {
  .person-card {
    flex-direction: column;
    text-align: center;
  }

  .profile-picture {
    margin-bottom: 10px;
  }
}
</style>
