<template>
  <div class="register-container">
    <input v-model="newUsername" placeholder="Username" />
    <input v-model="newPassword" placeholder="Password" type="password" />
    <button @click="register">確認</button>
    <p>You already have an account? <RouterLink to="/login">Login</RouterLink></p>
    <p v-if="registrationSuccess">Registration successful! Redirecting to DetailPage...</p>
    <p v-if="registrationFailed" style="color: red;">Registration failed. Please try again.</p>
  </div>
</template>

<script>
import axios from 'axios';
import { saveUser, saveToken } from '../utils/storage';

export default {
  data() {
    return {
      newUsername: '',
      newPassword: '',
      registrationSuccess: false,
      registrationFailed: false
    };
  },
  methods: {
    register() {
      axios.post('http://127.0.0.1:5001/register', {
        username: this.newUsername,
        password: this.newPassword,
      })
      .then(response => {
        this.registrationSuccess = true;
        this.registrationFailed = false;

        // 儲存用戶資料和 token 到 localStorage
        const user = response.data.user;
        const token = response.data.token;

        console.log("user:"+user+"token:"+token)
        
        saveUser(user);  // 使用封裝的 saveUser
        saveToken(token);  // 使用封裝的 saveToken

        // 跳轉到 DetailPage
        setTimeout(() => {
          this.$router.push('/detail');
        }, 2000);
      })
      .catch(error => {
        this.registrationFailed = true;
        this.registrationSuccess = false;
        console.error("Registration failed:", error);
      });
    }
  }
};
</script>

<style scoped>
/* 确保页面内容居中但不使用背景颜色 */
.register-container {
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
