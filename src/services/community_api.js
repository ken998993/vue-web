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

// 获取社团列表
// 获取社团列表
export const getCommunities = async () => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;  // 获取用户的 token
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await api.get('/get_communities', {
      headers: {
        Authorization: `Bearer ${token}`,  // 添加 Authorization 头部
        'Content-Type': 'application/json',
      }
    });
    console.log('Communities fetched:', response.data);
    return response.data;  // 返回社团列表
  } catch (error) {
    console.error('Error fetching communities:', error);
    throw error;
  }
};


// 获取指定社团的详细信息
export const getCommunityDetails = async (communityId) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;  // 获取用户 token
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await api.get('/get_community', {
      params: { communityId },
      headers: {
        Authorization: `Bearer ${token}`,  // 添加 Authorization 头部
        'Content-Type': 'application/json',
      }
    });
    console.log('Community details fetched:', response.data);
    return response.data;  // 返回社团的详细信息
  } catch (error) {
    console.error('Error fetching community details:', error);
    throw error;
  }
};


// 创建社团
export const createCommunity = async (name, description, avatarUrl) => {
  try {
    console.log("createCommunity-----",name)
    const userStore = useUserStore();
    const token = userStore.getToken;
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await api.post('/create_community', { 
      name,
      description,
      avatarUrl
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    console.log('Community created:', response.data);
    return response.data;  // 返回创建的社团数据
  } catch (error) {
    console.error('Error creating community:', error);
    throw error;
  }
};

// 更新社团信息
export const updateCommunity = async (communityId, name, description, avatarUrl) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await api.put('/update_community', { 
      communityId, 
      name, 
      description, 
      avatarUrl 
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    console.log('Community updated:', response.data);
    return response.data;  // 返回更新后的社团数据
  } catch (error) {
    console.error('Error updating community:', error);
    throw error;
  }
};

// 删除社团
export const deleteCommunity = async (communityId) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await api.delete('/delete_community', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: { communityId },  // 使用 body 传递删除的 communityId
    });

    console.log('Community deleted:', response.data);
    return response.data;  // 返回删除的社团数据
  } catch (error) {
    console.error('Error deleting community:', error);
    throw error;
  }
};


// // 加入社團
// export const joinCommunity = async (communityId) => {
//   try {
//     const userStore = useUserStore();
//     const token = userStore.getToken;
//     if (!token) {
//       throw new Error('No token found. Please log in.');
//     }

//     const response = await api.post('/join_community', { 
//       communityId 
//     }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       }
//     });

//     console.log('Joined community:', response.data);
//     return response.data;  // 返回加入社團的結果
//   } catch (error) {
//     console.error('Error joining community:', error);
//     throw error;
//   }
// };


