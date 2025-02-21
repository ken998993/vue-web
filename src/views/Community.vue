<template>
  <div class="community-list">
    <!-- 我的社團鏈接 -->
    <div class="store-link">
      <router-link to="/mycommunity" class="store-link-btn">我的社團</router-link>
    </div>

    <!-- 創建社團按鈕 -->
    <div class="create-community-btn">
      <router-link to="/createCommunity" class="create-btn">創建社團</router-link>
    </div>

    <h1>社團列表</h1>
    <div class="communities">
      <!-- 使用 v-for 遍歷每個社團，並顯示詳細信息 -->
      <div class="community-card" v-for="community in communities" :key="community.id">
        <div v-if="community.avatarUrl">
          <img 
            :src="getAvatarUrl(community.avatarUrl)" 
            alt="社團頭像" 
            class="community-avatar" 
          />
        </div>

        <div class="community-info">
          <div><strong>社團名:</strong> {{ community.name }}</div>
          <div v-if="community.description"><strong>描述:</strong> {{ community.description }}</div>
        </div>

        <!-- 判断用户是否已加入社团 -->
        <button 
          v-if="!community.isJoined"
          @click="joinCommunity(community)" 
          class="join-community-btn"
        >
          加入社團
        </button>

        <!-- 如果已加入社團，顯示“進入社團主頁”按鈕 -->
        <div v-if="community.isJoined" class="community-footer">
          <router-link 
            :to="`/community/${community.id}`"
            class="joined-btn"
          >
            進入社團主頁
          </router-link>
        </div>

        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { getCommunities } from '../services/community_api'; 
import { useCommunityStore } from '../stores/communityStore'; 

export default {
  name: 'CommunityList',
  data() {
    return {
      communities: []  // 存儲社團列表
    };
  },
  created() {
    this.loadCommunities();  // 加載社團數據
  },
  methods: {
    // 獲取社團數據
    async loadCommunities() {
      try {
        const response = await getCommunities();
        this.communities = response;

        // 將社團數據存入 store
        const communityStore = useCommunityStore();
        communityStore.setCommunities(response);
      } catch (error) {
        console.error('獲取社團列表時發生錯誤!', error);
      }
    },
    
    // 獲取頭像的完整 URL
    getAvatarUrl(avatarPath) {
      return `http://localhost:5001/${avatarPath}`;
    },

    // 加入社團的方法
    joinCommunity(community) {
      const communityStore = useCommunityStore();
      const joinedCommunities = communityStore.joinedCommunities;

      // 檢查當前社團是否已經加入
      const existingCommunity = joinedCommunities.find(item => item.id === community.id);

      if (existingCommunity) {
        alert('你已加入該社團!');
      } else {
        communityStore.addToJoinedCommunities(community);
        alert('成功加入社團!');
      }
    }
  }
};
</script>

<style scoped>
.create-community-btn {
  text-align: center;
  margin: 20px;
}

.create-btn {
  background-color: #2ecc71;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
}

.create-btn:hover {
  background-color: #27ae60;
}

/* 加入社團按鈕樣式 */
.join-community-btn {
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.join-community-btn:hover {
  background-color: #2980b9;
}

/* 已加入按鈕樣式 */
.joined-btn {
  background-color: #95a5a6;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
}

.joined-btn:hover {
  background-color: #7f8c8d;
}

.community-footer {
  margin-top: 20px;  /* 添加 margin-top 使按鈕與其他內容分開 */
  text-align: center;
  margin-bottom: 10px;  /* 保證底部有適當的間距 */
}
</style>
