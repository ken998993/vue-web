<template>
  <div class="amazon-scraper">
    <h1>Amazon 商品爬取</h1>

    <!-- 關鍵字輸入框 -->
    <div class="form-group">
      <input v-model="keyword" placeholder="輸入 Amazon 搜尋關鍵字" />
      <button @click="fetchAmazonProducts">開始爬取</button>
    </div>

    <!-- 爬取結果 -->
    <div v-if="loading">🔄 爬取中，請稍候...</div>

    <div v-if="products.length">
      <h2>爬取結果 (點擊加入我的商店)</h2>
      <div class="product-list">
        <div v-for="(product, index) in products" :key="index" class="product-card" @click="selectProduct(product)">
          <img :src="product.image_urls[0]" alt="商品圖片" />
          <h3>{{ product.name }}</h3>
          <p>價格: ${{ product.price }}</p>
        </div>
      </div>
    </div>

    <!-- 選擇的商品 -->
    <div v-if="selectedProducts.length">
      <h2>已選擇的商品</h2>
      <ul>
        <li v-for="(product, index) in selectedProducts" :key="index">
          {{ product.name }} - ${{ product.price }}
        </li>
      </ul>
      <button @click="submitProducts">提交商品到商店</button>
    </div>
  </div>
</template>

<script>

import { getAmazonProducts } from '../services/products_api';  // 假设你有一个API来获取商品列表
import axios from "axios";

export default {
  data() {
    return {
      keyword: "", // 使用者輸入的關鍵字
      products: [], // 爬取的 Amazon 產品
      selectedProducts: [], // 已選擇的商品
      loading: false
    };
  },
  methods: {
    // 🔍 觸發爬蟲 API
    async fetchAmazonProducts() {
      if (!this.keyword) {
        alert("請輸入關鍵字！");
        return;
      }

      this.loading = true;
      this.products = [];

      try {
        const response = await getAmazonProducts(this.keyword);
        if (response.products) {
          this.products = response.products;
        } else {
          alert("未找到商品，請更換關鍵字！");
        }
      } catch (error) {
        console.error("爬取失敗:", error);
        alert("爬取失敗，請檢查後端！");
      } finally {
        this.loading = false;
      }
    },

    // ✅ 選擇商品
    selectProduct(product) {
      if (!this.selectedProducts.some(p => p.name === product.name)) {
        this.selectedProducts.push(product);
      }
    },

    // 🚀 提交選擇的商品到商店
    async submitProducts() {
      if (!this.selectedProducts.length) {
        alert("請選擇商品！");
        return;
      }

      try {
        await axios.post("http://127.0.0.1:5000/add_products", {
          products: this.selectedProducts
        });

        alert("商品提交成功！");
        this.selectedProducts = [];
      } catch (error) {
        console.error("提交商品失敗:", error);
        alert("提交失敗，請稍後再試！");
      }
    }
  }
};
</script>

<style scoped>
.amazon-scraper {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

h1, h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 20px;
}

input {
  padding: 10px;
  width: 250px;
  font-size: 1rem;
  margin-right: 10px;
}

button {
  padding: 10px 15px;
  font-size: 1rem;
  background: #2ecc71;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background: #27ae60;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.product-card {
  width: 200px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
}

.product-card:hover {
  background: #f1f1f1;
}

.product-card img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}
</style>
