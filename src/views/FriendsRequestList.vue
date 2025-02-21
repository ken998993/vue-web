<template>
  <div class="about">
    <h1>好友请求列表</h1>
    <div class="people-list">
      <!-- 使用 v-for 遍历每个好友请求 -->
      <div class="person-card" v-for="person in people" :key="person.id">
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

            <div class="info-row" v-if="person.bio">
              <strong>Bio:</strong> {{ person.bio }}
            </div>
          </div>
        </div>

        <!-- 根据好友请求的状态展示不同的按钮 -->
        <div v-if="person.status === 'pending'" class="request-btns">
          <button @click="acceptFriendRequest(person.id)" class="accept-btn">同意</button>
          <button @click="rejectFriendRequest(person.id)" class="reject-btn">拒绝</button>
        </div>
        
        <!-- 已接受的好友提示 -->
        <div v-else-if="person.status === 'accepted'" class="friend-status">
          <span>已是好友</span>
        </div>

        <hr />
      </div>
    </div>
  </div>
</template>

<script>

import { checkFriendRequests, acceptFriendRequest, rejectFriendRequest } from '../services/friends_api';  // 导入 API 方法

export default {
  name: 'About',
  data() {
    return {
      people: []  // 用来存储从后端获取的好友请求数据
    };
  },
  created() {
    // 在组件创建时，获取好友请求列表
    checkFriendRequests()
    .then(response => {
        this.people = response.requests;  // 假设返回的 "requests" 包含所有好友请求
        console.log("Friend Requests:", this.people);  // 输出好友请求数据
      })
      .catch(error => {
        console.error('There was an error fetching the friend requests!', error);
      });
  },
  methods: {
    // 接受好友请求
    acceptFriendRequest(userId) {
      acceptFriendRequest(userId)
        .then(response => {
          // 更新请求状态为 'accepted'
          const index = this.people.findIndex(person => person.id === userId);
          if (index !== -1) {
            this.people[index].status = 'accepted';
          }
        })
        .catch(error => {
          console.error('Error accepting friend request', error);
        });
    },

    // 拒绝好友请求
    rejectFriendRequest(userId) {
      rejectFriendRequest(userId)
        .then(response => {
          // 删除请求或更新请求状态
          const index = this.people.findIndex(person => person.id === userId);
          if (index !== -1) {
            this.people.splice(index, 1);  // 移除拒绝的请求
          }
        })
        .catch(error => {
          console.error('Error rejecting friend request', error);
        });
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

/* 好友请求按钮 */
.request-btns {
  display: flex;
  gap: 10px;
}

.accept-btn, .reject-btn {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.accept-btn:hover {
  background-color: #2980b9;
}

.reject-btn {
  background-color: #e74c3c;
}

.reject-btn:hover {
  background-color: #c0392b;
}

/* 已是好友提示 */
.friend-status {
  color: green;
  font-weight: bold;
}

hr {
  width: 100%;
  border: 0;
  border-top: 1px solid #ddd;
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

  .accept-btn, .reject-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
