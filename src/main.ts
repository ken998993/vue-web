// src/main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';  // 引入 createPinia
import App from './App.vue';
import router from './router';
// 在 main.js 或 main.ts 中全局引入 FontAwesome
import 'font-awesome/css/font-awesome.min.css';

const app = createApp(App);

const pinia = createPinia();  // 创建 Pinia 实例
app.use(pinia);  // 使用 Pinia

app.use(router);
app.mount('#app');
