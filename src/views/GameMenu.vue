<template>
  <div id="game-menu">
    <h1>游戏菜单</h1>
    <div class="menu-options">
      <button @click="goToCreateCharacter">创建角色</button>
      <button @click="goToSelectCharacter">选择角色</button>
      <button @click="startGame">开始游戏</button>
      <button @click="goToCreateChapter">创建章节故事</button> <!-- 新的按钮 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameMenu',
  methods: {
    goToCreateCharacter() {
      this.$router.push({ name: 'createCharacter' }); // 跳转到创建角色页面
    },
    goToSelectCharacter() {
      this.$router.push({ name: 'selectCharacter' }); // 跳转到选择角色页面
    },
    startGame() {
      const selectedCharacter = JSON.parse(localStorage.getItem('selectedCharacter'));
      if (!selectedCharacter) {
        alert('请先选择一个角色');
        return;
      }
      this.$router.push({ name: 'tacticalGame' }); // 跳转到选择关卡页面
    },
    goToCreateChapter() {
      this.$router.push({ name: 'createChapter' }); // 跳转到创建章节故事页面
    }
  }
};
</script>

<style scoped>
#game-menu {
  text-align: center;
  padding: 20px;
}

.menu-options {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style>
