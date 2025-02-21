<template>
  <div id="chinese-checkers">
    <h1>中国跳棋棋盘</h1>

    <div class="board">
      <!-- 六个三角形组合成六芒星 -->
      <div class="triangle triangle1">
        <div class="row">
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
      </div>

      <div class="triangle triangle2">
        <div class="row">
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
      </div>

      <div class="triangle triangle3">
        <div class="row">
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
      </div>

      <div class="triangle triangle4">
        <div class="row">
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
      </div>

      <div class="triangle triangle5">
        <div class="row">
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
      </div>

      <div class="triangle triangle6">
        <div class="row">
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
        <div class="row">
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
          <div class="piece"></div>
        </div>
      </div>
    </div>

    <button @click="resetBoard">重置棋盘</button>
  </div>
</template>

<script>
export default {
  name: 'ChineseCheckers',
  data() {
    return {};
  },
  methods: {
    resetBoard() {
      console.log('重置棋盘');
    },
  },
};
</script>

<style scoped>
#chinese-checkers {
  text-align: center;
  padding: 20px;
}

.board {
  display: flex;
  justify-content: center;
  align-items: center;
}

.triangle {
  display: inline-block;
  padding: 10px;
  position: absolute;
}

.triangle1 { top: 0; left: 40px; }
.triangle2 { top: 0; right: 40px; }
.triangle3 { top: 50px; left: 0; }
.triangle4 { top: 50px; right: 0; }
.triangle5 { bottom: 0; left: 40px; }
.triangle6 { bottom: 0; right: 40px; }

.row {
  display: flex;
  justify-content: center;
}

.piece {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #3498db;
  margin: 2px;
}
</style>
