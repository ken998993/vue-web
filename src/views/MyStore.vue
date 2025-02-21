<template>
  <div class="my-store">
    <!-- 添加新商品按鈕，放置在頁面頂部 -->
    <div class="add-product-btn-container">
      <router-link to="/addProduct">
        <button class="add-product-btn">新增商品</button>
      </router-link>
    </div>

    <h1>歡迎來到我的賣場</h1>
    <p>在這裡你可以管理商品、查看訂單等。</p>

    <!-- 商品列表 -->
    <div class="product-list">
      <h2>我的商品列表</h2>
      <div v-if="products.length === 0">目前沒有商品</div>
      <div v-else>
        <div v-for="product in products" :key="product.id" class="product-card">
          <!-- 检查 image_urls 是否为空 -->
          <div v-if="product.image_urls.length > 0">
            <img :src="getImageUrl(product.image_urls[0])" alt="商品圖片" class="product-image" />
          </div>

          <div class="product-info">
            <div><strong>商品名稱:</strong> {{ product.name }}</div>
            <div><strong>價格:</strong> ¥{{ product.price.toFixed(2) }}</div>
            <div><strong>描述:</strong> {{ product.description }}</div>
          </div>
          <button @click="editProduct(product)" class="edit-btn">編輯</button>
          <button @click="deleteProduct(product.id)" class="delete-btn">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getProducts, deleteProduct } from '../services/products_api';
import { useProductStore } from '../stores/productStore';  // 引入Pinia Store

export default {
  name: 'MyStore',
  data() {
    return {
      products: [],  // 用于存储商品列表
    };
  },
  created() {
    this.loadProducts();  // 加载商品数据
  },
  methods: {
    // 加载商品数据
    async loadProducts() {
      try {
        const response = await getProducts();  // 获取商品数据
        console.log("Products data:", response);
        this.products = response;  // 将返回的商品数据存储到 products 中
               // 获取 Pinia Store 实例
        const productStore = useProductStore();
        
        // 将获取到的商品数据存储到 productStore
        productStore.setProducts(response); 
      } catch (error) {
        console.error('Error fetching products!', error);  // 错误处理
      }
    },

    // 编辑商品
    editProduct(product) {
      const productStore = useProductStore();  // 获取Pinia Store实例
      productStore.setEditingProduct([product]);  // 保存选择的商品到Store

      // 跳转到编辑页面
      this.$router.push({ name: 'editProduct' });
    },

    // 删除商品
    async deleteProduct(productId) {
      try {
        const response = await deleteProduct(productId);
        this.products = this.products.filter((product) => product.id !== productId);
        console.log("Product deleted:", response);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },

    // 获取图片的完整路径
    getImageUrl(imagePath) {
      return `http://localhost:5001/${imagePath}`;  // 假设你的后端 URL 是这样
    }
  }
};
</script>

<style scoped>
.my-store {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 2rem;
  color: #333;
}

h2 {
  font-size: 1.5rem;
  margin-top: 20px;
}

.add-product-btn-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.add-product-btn {
  background-color: #2ecc71;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.add-product-btn:hover {
  background-color: #27ae60;
}

.product-list {
  margin-top: 30px;
}

.product-card {
  display: inline-block;
  width: 250px;
  padding: 15px;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  background-color: #f9f9f9;
}

.product-images {
  margin-bottom: 10px;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin: 5px;
}

.product-info {
  margin-bottom: 10px;
}

button {
  margin-top: 10px;
  padding: 8px 15px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button.edit-btn {
  background-color: #3498db;
  color: white;
}

button.delete-btn {
  background-color: #e74c3c;
  color: white; 
}
</style>
