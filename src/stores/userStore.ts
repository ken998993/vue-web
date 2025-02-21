// src/stores/user.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as any,  // 存储用户数据
    token: null as string | null,  // 存储 token
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,  // 判断是否已登录
    getUser: (state) => state.user,  // 获取用户数据
    getToken: (state) => state.token,  // 获取 token
  },

  actions: {
    setUser(user: any) {
        console.log("pania user"+user)
      this.user = user;  // 设置用户数据
    },
    setToken(token: string) {
        console.log("pania token"+token)
      this.token = token;  // 设置 token
    },
    clearUser() {
      this.user = null;  // 清除用户数据
      this.token = null;  // 清除 token
    },
  },
});
