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

// 获取商品列表
export const getProducts = async () => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;

    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await api.post('/getProducts', {}, {  // Adjusted to match backend route
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',  // Add Content-Type here
      },
    });

    console.log('Fetched products:', response.data);
    return response.data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// 添加商品
export const addProduct = async (productData) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;

    if (!token) {
      throw new Error('No token found. Please log in.');
    }
    
    const response = await api.post('/add_product', productData, {
      headers: {
        Authorization: `Bearer ${token}`,
       'Content-Type': 'multipart/form-data', // 確保設置了這個
      },
    });

    console.log('Product added:', response.data);
    return response.data.product;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// 编辑商品
export const editProduct = async (productId, productData) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;

    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await api.post('/edit_product', {  // Adjusted to match backend route
      productId,
      name: productData.name,
      price: productData.price,
      description: productData.description,
      // add other necessary fields from productData
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',  // Add Content-Type here
      },
    });

    console.log('Product edited:', response.data);
    return response.data.product;
  } catch (error) {
    console.error('Error editing product:', error);
    throw error;
  }
};

// 删除商品
export const deleteProduct = async (productId) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;

    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await api.delete(`/products/${productId}`, {  // Adjusted to match backend route
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',  // Add Content-Type here
      },
    });

    console.log('Product deleted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const getAmazonProducts = async (keyword) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;
    console.log("getAmazonProducts test",keyword);
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    const response = await api.post('/crawer', { keyword }, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('爬取結果:', response.data);
    return response.data.products || [];
  } catch (error) {
    console.error('爬取失敗:', error);
    throw error;
  }
};




export const getImage = async (filename) => {
  try {
    const userStore = useUserStore();
    const token = userStore.getToken;

    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    // 使用 POST 方法發送請求，並且設置 responseType 為 blob
    const response = await api.post('/getImage', 
      { filename }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        responseType: 'blob'  // 接收圖片作為 Blob
      }
    );

    // 創建圖片 URL
    const imageUrl = URL.createObjectURL(response.data);
    return imageUrl;

  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
};
