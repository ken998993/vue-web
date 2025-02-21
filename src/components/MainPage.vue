<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <!-- 文字内容 -->
  <div class="greetings">
    <h1>{{ msg }}</h1>
    <h3>
      恭喜您成功创建了您的个人主页，开始在这里发现志同道合的朋友吧！<br />
      我们的社区充满了有趣和真诚的人，等你加入！
    </h3>
    <p class="tagline">
      无论您是寻找朋友、伴侣，还是想探索新的社交圈，我们都能为您提供一个完美的起点。
    </p>
  </div>
</template>
