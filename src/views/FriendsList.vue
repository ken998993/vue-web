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
        <button @click="goToFriendInfoPage(person.id)" class="add-friend-btn">
          好友資料
        </button>

        <!-- 每个用户的上下分隔线 -->
        <hr />
      </div>
    </div>
  </div>
</template>

<script>

import { checkFriendList } from '../services/friends_api';  // 导入 friendServiceApi

export default {
  name: 'About',
  data() {
    return {
      people: []  // 用來存儲從後端獲取的資料
    };
  },
  created() {
    // 在组件创建时，调用 checkFriendList 获取好友列表
    checkFriendList()
    .then(response => {
        // 假设响应数据包含一个 "friends" 数组，我们直接提取它
        this.people = response.friends;  // 将获取的好友列表赋值给 people
        console.log("Friends data:", this.people);  // 输出朋友数据，调试用
      })
      .catch(error => {
        console.error('There was an error fetching the friend list!', error);  // 错误处理
      });
  },
  methods: {
    goToFriendInfoPage(userId) {
      this.$router.push({ name: 'friendInfo', query: { id: userId } });
    }
  }
};
</script>

<style scoped>
.about {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: top;
  min-height: 100vh;
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
  gap: 20px;
  width: 100%;
  max-width: 900px;
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
  margin: 0 auto;
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

/* 添加好友按钮样式 */
.add-friend-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
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

  .add-friend-btn {
    margin-top: 10px;
  }
}
</style>
