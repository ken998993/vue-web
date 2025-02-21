// src/stores/communityStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

// 定义社团类型
interface Community {
  id: number;
  name: string;
  description: string;
  avatarUrl: string;
}

// 定义 Pinia Store 类型
interface CommunityStore {
  communities: Community[]; // 存储所有社团
  userCommunity: Community | null; // 当前用户所在的社团
}

// 定义 store
export const useCommunityStore = defineStore('community', {
  state: (): CommunityStore => ({
    communities: [], // 存储社团列表
    userCommunity: null, // 当前用户所在的社团
  }),

  getters: {
    // 获取所有社团
    allCommunities: (state) => state.communities,

    // 获取当前用户所在社团
    userCommunity: (state) => state.userCommunity,
  },

  actions: {
    // 加载社团列表
    setCommunities(communities: Community[]) {
      this.communities = communities;
    },

    // 设置当前用户所在社团
    setUserCommunity(community: Community) {
      this.userCommunity = community;
    },

    // 退出当前社团
    leaveCommunity() {
      this.userCommunity = null;
    },
  },
});
