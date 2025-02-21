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

// 创建聊天室
export const createChatroom = async (friendId) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;

    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await api.post(
      '/create_chatroom', // 假设后端路径是 /create_chatroom
      { friendId }, // 发送好友 ID 创建聊天室
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    
    console.log("Chatroom created:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating chatroom:', error);
    throw error;
  }
};

// 发送消息
export const sendMessage = async (chatroomId, message) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;

    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await api.post(
      '/send_message', // 假设后端路径是 /send_message
      { chatroomId, message }, // 发送聊天室 ID 和消息
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    
    console.log("Message sent:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// 离开聊天室
export const leaveChatroom = async (chatroomId) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;

    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await api.post(
      '/leave_chatroom', // 假设后端路径是 /leave_chatroom
      { chatroomId }, // 发送聊天室 ID 离开
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    
    console.log("Left chatroom:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error leaving chatroom:', error);
    throw error;
  }
};
