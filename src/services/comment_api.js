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

// 获取指定帖子的评论
export const getComments = async (postId) => {
  try {
    const response = await api.get('/get_comments', { params: { postId } });
    console.log('Comments fetched:', response.data);
    return response.data;  // 返回评论列表
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

// 添加评论
export const addComment = async (postId, content) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await api.post('/add_comment', { postId, content }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    console.log('Comment added:', response.data);
    return response.data;  // 返回添加的评论数据
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};

// 更新评论
export const updateComment = async (commentId, content) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await api.put(`/update_comment`, { commentId, content }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    console.log('Comment updated:', response.data);
    return response.data;  // 返回更新后的评论数据
  } catch (error) {
    console.error('Error updating comment:', error);
    throw error;
  }
};

// 删除评论
export const deleteComment = async (commentId) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await api.delete(`/delete_comment`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: { commentId },  // 使用 body 传递删除的 commentId
    });

    console.log('Comment deleted:', response.data);
    return response.data;  // 返回删除的评论数据
  } catch (error) {
    console.error('Error deleting comment:', error);
    throw error;
  }
};
