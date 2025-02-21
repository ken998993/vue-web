import axios from 'axios';
import { useUserStore } from '../stores/userStore';  // 导入 Pinia 的 store

// API 基础 URL
const API_URL = 'http://127.0.0.1:5001';

// 创建一个 Axios 实例
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});




// 添加好友
export const addFriends = async (friendId) => {
  try {
    // 获取当前用户的 ID 和 Token
    const userStore = useUserStore();  // 获取 store 实例
    const userId = userStore.getUser?.id;  // 获取用户 ID
    const token = userStore.getToken;  // 获取 Token

    // 检查是否获取到 userId 和 token
    if (!userId || !token) {
      throw new Error('User is not authenticated');
    }

    // 请求体数据，包含用户ID、Token 和好友ID
    const data = {
      userId,
      friendId
    };
    const response = await api.post('/add_friends', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    return response;  // 返回响应数据
  } catch (error) {
    console.error('Failed to add friend:', error);
    throw error;  // 继续抛出错误，确保调用方可以处理
  }
};

// 删除好友
export const removeFriend = async (friendId) => {
  try {
    const data = { friendId };  // 请求体数据
    const result = await handleRequest('/remove_friend', data);
    return result;
  } catch (error) {
    console.error('Failed to remove friend:', error);
    throw error;
  }
};

export const checkFriendList = async () => {
  try {
    // 获取当前用户的 ID 和 Token
    const userStore = useUserStore();  // 获取 store 实例
    const userId = userStore.getUser?.id;  // 获取用户 ID
    const token = userStore.getToken;  // 获取 Token

    // 检查是否获取到 userId 和 token
    if (!userId || !token) {
      throw new Error('User is not authenticated');
    }

    // 请求体数据，包含用户ID、Token 和好友ID
    const data = {
      userId
    };
    const response = await api.post('/get_friend_list', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    return response.data;  // 返回响应数据
  } catch (error) {
    console.error('Failed to add friend:', error);
    throw error;  // 继续抛出错误，确保调用方可以处理
  }
};


export const getAllUsers = async () => {
  try {
    // 获取当前用户的 ID 和 Token
    const userStore = useUserStore();  // 获取 store 实例
    const userId = userStore.getUser?.id;  // 获取用户 ID
    const token = userStore.getToken;  // 获取 Token

    // 检查是否获取到 userId 和 token
    if (!userId || !token) {
      throw new Error('User is not authenticated');
    }

    // 请求体数据，包含用户ID、Token 和好友ID
    const data = {
      userId
    };
    const response = await api.post('/get_all_users', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    return response.data;  // 返回响应数据
  } catch (error) {
    console.error('Failed to add friend:', error);
    throw error;  // 继续抛出错误，确保调用方可以处理
  }
};


// 获取好友请求列表
export const checkFriendRequests = async () => {
  try {
    const userStore = useUserStore();  // 获取 store 实例
    const userId = userStore.getUser?.id;  // 获取用户 ID
    const token = userStore.getToken;  // 获取 Token

    if (!userId || !token) {
      throw new Error('User is not authenticated');
    }

    const data = { userId };
    const response = await api.post('/check_friend_requests', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    return response.data;  // 返回好友请求数据
  } catch (error) {
    console.error('Failed to get friend requests:', error);
    throw error;
  }
};

// 同意好友请求
export const acceptFriendRequest = async (friendId) => {
  try {
    const userStore = useUserStore();  // 获取 store 实例
    const token = userStore.getToken;  // 获取 Token

    if (!friendId || !token) {
      throw new Error('Invalid request');
    }

    const data = { friendId };
    const response = await api.post('/accept_friend_request', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    return response.data;  // 返回响应数据
  } catch (error) {
    console.error('Failed to accept friend request:', error);
    throw error;
  }
};

// 拒绝好友请求
export const rejectFriendRequest = async (friendId) => {
  try {
    const userStore = useUserStore();  // 获取 store 实例
    const token = userStore.getToken;  // 获取 Token

    if (!friendId || !token) {
      throw new Error('Invalid request');
    }

    const data = { friendId };
    const response = await api.post('/reject_friend_request', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    return response.data;  // 返回响应数据
  } catch (error) {
    console.error('Failed to reject friend request:', error);
    throw error;
  }
};
