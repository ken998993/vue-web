<template>
  <div class="login-container">
    <input v-model="username" placeholder="Username" />
    <input v-model="password" placeholder="Password" type="password" />
    <button @click="login">登入</button>
    
    <!-- 显示登录成功或失败的信息 -->
    <p v-if="loginSuccess">Login successful! Redirecting...</p>
    <p v-if="loginFailed" style="color: red;">Invalid credentials. Please try again.</p>
    
    <!-- 添加注册链接 -->
    <p>Don't have an account? <RouterLink to="/register">Register</RouterLink></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';  // 引入 useRouter 来获取路由实例
import { loginUser } from '../services/user_api';  // 导入登录 API

// 获取路由实例
const router = useRouter();

const username = ref('');
const password = ref('');
const loginSuccess = ref(false);
const loginFailed = ref(false);

// 登录方法
const login = async () => {
  try {
    // 调用 loginUser 服务方法进行登录
    await loginUser(username.value, password.value);

    loginSuccess.value = true;
    loginFailed.value = false;

    // 跳转到 detail 页面
    router.push({ name: 'detail' });  // 使用路由跳转
  } catch (error) {
    // 登录失败
    loginFailed.value = true;
    loginSuccess.value = false;
    console.error("Login failed:", error);
  }
};
</script>

<style scoped>
/* 确保页面内容居中但不使用背景颜色 */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
}

input {
  width: 250px;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  width: 250px;
  padding: 10px;
  margin: 10px 0;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

p {
  margin-top: 10px;
}

.RouterLink {
  text-decoration: none;
  color: #007BFF;
}

.RouterLink:hover {
  text-decoration: underline;
}
</style>
