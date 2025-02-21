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

// 发布新帖子
export const addPost = async (title, content) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;
    if (!token) {
      throw new Error('No token found. Please log in.');
    }
    console.log('title',title)
    // 这里确保数据的格式正确
    const postData = { title, content };

    const response = await api.post('/add_post', postData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    console.log('Post added---------:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
};


// 获取所有帖子
export const getPosts = async () => {
  try {
    const response = await api.get('/get_posts');
    console.log('Posts fetched:', response.data);
    return response.data;  // 返回帖子列表数据
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// 获取单个帖子
export const getPost = async (postId) => {
  try {
    const response = await api.get(`/get_post/${postId}`);
    console.log('Post fetched:', response.data);
    return response.data;  // 返回单个帖子的详细信息
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

// 更新帖子
export const updatePost = async (postId, content) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await api.put(`/update_post/${postId}`, { content }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    console.log('Post updated:', response.data);
    return response.data;  // 返回更新后的帖子数据
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

// 删除帖子
export const deletePost = async (postId) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await api.delete(`/delete_post/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    console.log('Post deleted:', response.data);
    return response.data;  // 返回删除的帖子数据
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};
