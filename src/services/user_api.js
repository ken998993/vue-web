import axios from 'axios';
import { useUserStore } from '../stores/userStore';

// API 基础 URL
const API_URL = 'http://127.0.0.1:5001';

// 创建一个 Axios 实例
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 登录请求
export const loginUser = async (username, password) => {
  try {
    console.log("startlogin");
    // 发送登录请求
    const response = await api.post('/login', { username, password });

    const { user, token } = response.data;
    // 获取 Vuex store
    const userStore = useUserStore();
    userStore.setUser(user);
    userStore.setToken(token);
    console.log("login token after userUserStore"+userStore.getToken);
    return { user, token };
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login failed");
  }
};



// 更新用户信息
export const updateUser = async (userData) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    // 发送请求更新用户信息
    const response = await api.post('/update_user', userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    console.log('User data updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};


// 注册请求
export const registerUser = async (username, password) => {
    try {
      // 发送注册请求
      const response = await api.post('/register', { username, password });
  
      const { user, token } = response.data;
  
      // 保存用户数据和 token 到 localStorage
      const userStore = useUserStore();
      userStore.setUser(user);
      userStore.setToken(token);
  
      return { user, token };
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed");
    }
  };
 
  // 取得用户信息
export const getUser = async (userId) => {
    try {
      const userStore = useUserStore();
      const token = userStore.getToken;  // 获取 token
      if (!token) {
        throw new Error('No token found. Please log in.');
      }
  
      // 发送 POST 请求获取用户信息
      const response = await api.post('/getUser', { id: userId }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
  
      console.log('User data fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };
  