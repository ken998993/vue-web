<template>
  <header>
    <!-- Logo 图片 -->
    <img alt="Vue logo" class="logo" src="@/image/project.jpg" width="20%" height="20%" />

    <!-- Greetings 文本内容 -->
    <div class="wrapper">
      <MainPage msg="Let's meet together!" />
    </div>

    <!-- 导航链接 -->
    <nav>
      <RouterLink v-if="!isLoggedIn" to="/login">登入</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/detail">個人資料</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/list">交友列表</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/friendsRequestList">交友同意列表</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/productList">商品列表</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/commentList">留言板</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/friends">我的好友</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/myStore">我的賣場</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/community">社團活動</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/gameMenu">文字冒險遊戲</RouterLink>
      <RouterLink v-if="isLoggedIn" to="/crawer">爬蟲介面</RouterLink>
 
      <a v-if="isLoggedIn" href="#" @click="logout">登出</a>
    </nav>
  </header>

  <!-- 显示路由视图 -->
  <div class="main-content">
    <RouterView />
  </div>

  <!-- 聊天图标 -->
  <button @click="toggleChatWindow" class="chat-icon">
    <i class="fa fa-comment" aria-hidden="true"></i>
  </button>

  <!-- 购物车图标 -->
  <button @click="toggleCartWindow" class="cart-icon">
    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
  </button>

  <!-- 聊天窗口 -->
  <div v-if="isChatVisible" class="chat-popup">
    <Chat :isChatWindowVisible="isChatVisible" :toggleChatWindow="toggleChatWindow" />
    <button @click="toggleChatWindow">关闭</button>
  </div>

  <!-- 购物车窗口 -->
  <div v-if="isCartVisible" class="cart-popup">
    <Cart :isCartWindowVisible="isCartVisible" :toggleCartWindow="toggleCartWindow" />
    <button @click="toggleCartWindow">关闭</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';  // 引入 computed 和 ref
import { RouterLink, RouterView } from 'vue-router';
import MainPage from './components/MainPage.vue';
import { useUserStore } from './stores/userStore';
import Chat from './components/ChatPage.vue';  // 引入 Chat.vue 作为聊天窗口组件
import Cart from './components/CartPage.vue';  // 引入 Cart.vue 作为购物车窗口组件

// 获取 Pinia store 实例
const userStore = useUserStore();

// 计算属性：根据 store 中的 token 来判断是否登录
const isLoggedIn = computed(() => !!userStore.getToken);  // 使用 computed 来判断登录状态

// 处理用户退出登录
const logout = () => {
  userStore.clearUser();
  window.location.href = '/login';  // 使用 window.location.href 进行页面重定向
};

// 控制聊天窗口和购物车窗口的显示与隐藏
const isChatVisible = ref(false);  // 控制聊天窗口的显示状态
const isCartVisible = ref(false);  // 控制购物车窗口的显示状态

// 切换聊天窗口显示与隐藏
const toggleChatWindow = () => {
  isChatVisible.value = !isChatVisible.value;
};

// 切换购物车窗口显示与隐藏
const toggleCartWindow = () => {
  isCartVisible.value = !isCartVisible.value;
};
</script>

<style scoped>
/* Header 样式 */
header {
  width: 100%;
  text-align: center;
  padding-bottom: 2rem;
}

.logo {
  display: block;
  margin: 0 auto;
  max-width: 100%; /* 让图片自适应大小 */
}

.wrapper {
  margin-top: 1rem;
}

nav {
  margin-top: 2rem;
  text-align: center;
}

nav a {
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  font-size: 1.2rem;
  color: #3498db;
  border-radius: 4px;
}

nav a:hover {
  background-color: #3498db;
  color: white;
}

/* RouterView 样式 */
.main-content {
  margin-top: 2rem; /* 距离 header 一些空白 */
  padding: 0 2rem;
  min-height: 80vh; /* 确保内容部分占据足够高度 */
  position: relative; /* 保证页面内容和聊天窗口不互相干扰 */
}

/* 聊天图标样式 */
.chat-icon {
  position: fixed; /* 固定在页面右下角 */
  bottom: 70px; /* 距离底部 70px */
  right: 20px; /* 距离右侧 20px */
  background-color: #3498db; /* 按钮背景色 */
  color: white; /* 图标颜色 */
  padding: 15px; /* 图标按钮的大小 */
  border-radius: 50%; /* 使按钮圆形 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 给按钮添加阴影 */
  font-size: 24px; /* 图标的大小 */
  cursor: pointer; /* 鼠标悬停时变为指针 */
  z-index: 9998; /* 确保它位于其他内容下 */
  transition: background-color 0.3s ease; /* 背景颜色的平滑过渡 */
}

.chat-icon:hover {
  background-color: #2980b9; /* 鼠标悬停时改变背景色 */
}

.chat-icon i {
  font-size: 24px; /* 设置图标的大小 */
}

/* 购物车图标样式 */
.cart-icon {
  position: fixed; /* 固定在页面右下角 */
  bottom: 200px; /* 距离底部 120px，确保它位于聊天图标上方 */
  right: 20px; /* 距离右侧 20px */
  background-color: #f39c12; /* 按钮背景色 */
  color: white; /* 图标颜色 */
  padding: 15px; /* 图标按钮的大小 */
  border-radius: 50%; /* 使按钮圆形 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 给按钮添加阴影 */
  font-size: 24px; /* 图标的大小 */
  cursor: pointer; /* 鼠标悬停时变为指针 */
  z-index: 9900; /* 确保它位于聊天图标之上 */
  transition: background-color 0.3s ease; /* 背景颜色的平滑过渡 */
}

.cart-icon:hover {
  background-color: #e67e22; /* 鼠标悬停时改变背景色 */
}

.cart-icon i {
  font-size: 24px; /* 设置图标的大小 */
}

/* 弹出聊天窗口样式 */
.chat-popup {
  position: fixed;
  bottom: 60px; /* 聊天窗口距离底部的距离 */
  right: 20px;
  width: 350px;
  height: 400px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-content {
  flex-grow: 1;
  overflow-y: auto;
  margin-top: 10px;
}

.chat-popup button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.chat-popup button:hover {
  background-color: #c0392b;
}

/* 弹出购物车窗口样式 */
.cart-popup {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 350px;
  height: 400px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
}
</style>
