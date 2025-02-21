<template>
  <div class="post-board">
    <h1>留言板</h1>

    <!-- 添加新帖子 -->
    <div class="add-post-container" v-show="!isCollapsed">
      <input v-model="newPostTitle" placeholder="请输入帖子标题" class="title-input" />
      <textarea v-model="newPostContent" placeholder="在这里添加新帖子..." rows="4"></textarea>
      <button @click="addPost" class="add-post-btn">发布帖子</button>
      
      <!-- 收起按钮 -->
      <button @click="toggleCollapse" class="collapse-btn">收起</button>
    </div>

    <!-- 展开按钮 -->
    <div v-show="isCollapsed">
      <button @click="toggleCollapse" class="expand-btn">展开</button>
    </div>

    <!-- 显示所有帖子 -->
    <div v-if="posts.length > 0" class="post-list">
      <div class="post-card" v-for="post in posts" :key="post.id">
        <div class="post-header">
          <img :src="`/src/image/photo/${post.profile_picture}`" alt="Avatar" class="profile-picture" />
          <div class="post-info">
            <!-- 显示帖子标题 -->
            <strong>{{ post.title }}</strong>
            <p>{{ post.content }}</p>
            <small>{{ post.created_at }}</small>
          </div>

          <!-- 删除按钮 -->
          <button @click="deletePost(post.id)" class="delete-post-btn">删除帖子</button>
        </div>

        <!-- 评论区 -->
        <div class="comment-section">
          <div class="toggle-btn-container">
            <button @click="toggleCommentCollapse(post.id)" class="collapse-btn">
              {{ post.isCommentCollapsed ? '展开评论' : '收起评论' }}
            </button>
          </div>

          <!-- 显示评论区 -->
          <div v-show="!post.isCommentCollapsed" class="comment-box">
            <div v-for="comment in post.comments" :key="comment.id" class="comment-card">
              <div class="comment-info">
                <img :src="`/src/image/photo/${comment.profile_picture}`" alt="Avatar" class="profile-picture" />
                <div class="comment-details">
                  <strong>{{ comment.username }}</strong>
                  <p>{{ comment.content }}</p>
                  <small>{{ comment.timestamp }}</small>
                </div>
                <button @click="deleteComment(post.id, comment.id)" class="delete-comment-btn">删除评论</button>
              </div>
            </div>

            <!-- 添加评论 -->
            <textarea v-model="newCommentContent" placeholder="写下你的评论..." rows="2"></textarea>
            <button @click="addComment(post.id)" class="add-comment-btn">发布评论</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 如果没有帖子 -->
    <div v-if="posts.length === 0" class="no-posts">
      <p>还没有帖子，快来发表第一个帖子吧！</p>
    </div>
  </div>
</template>


<script>
// 导入 API 方法
import { addPost, getPosts, deletePost } from '../services/post_api';  // 导入 post_api 方法
import { addComment, deleteComment } from '../services/comment_api';  // 导入 comment_api 方法

export default {
  name: 'PostBoard',
  data() {
    return {
      posts: [],  // 用来存储所有帖子
      newPostTitle: '',  // 新帖子标题
      newPostContent: '',  // 新帖子内容
      newCommentContent: '',  // 新评论内容
      isCollapsed: false,  // 控制帖子输入框是否折叠
    };
  },
  created() {
    this.fetchPosts();  // 获取帖子数据，初次加载时调用
  },
  methods: {
    // 获取所有帖子，只会在页面加载时调用一次
    fetchPosts() {
      getPosts()
        .then(response => {
          this.posts = response.posts;  // 更新 posts 数据
          
          // 初始化每个帖子的评论折叠状态
          this.posts.forEach(post => {
            post.isCommentCollapsed = true;  // 默认评论区折叠
            post.comments = post.comments || [];  // 确保每个帖子都有评论数据
          });
          
        })
        .catch(error => {
          console.error('There was an error fetching posts:', error);
        });
    },
    
    // 发布新帖子
    addPost() {
      if (this.newPostTitle.trim() === '' || this.newPostContent.trim() === '') {
        alert('帖子标题和内容不能为空');
        return;
      }

      addPost(this.newPostTitle, this.newPostContent)
        .then(response => {
          // 假设返回的帖子数据包含新帖子的详细信息
          const newPost = response;
          console.log('posts', this.posts); // 打印当前的帖子数据
          console.log('newPost', newPost);  // 打印新帖子

          this.posts.unshift(newPost);

          this.newPostTitle = '';  // 清空标题输入框
          this.newPostContent = '';  // 清空内容输入框
        })
        .catch(error => {
          console.error('There was an error adding the post:', error);
        });
    },

    // 删除帖子
    deletePost(postId) {
      // 先确认删除操作
      if (confirm("你确定要删除这个帖子吗？")) {
        // 调用后端删除帖子的 API
        deletePost(postId)
          .then(() => {
            // 删除成功后从本地 posts 中移除该帖子
            this.posts = this.posts.filter(post => post.id !== postId);
            alert('帖子已成功删除');
          })
          .catch(error => {
            console.error('删除帖子时发生错误:', error);
            alert('删除失败，请稍后再试');
          });
      }
    },

    // 添加评论
    addComment(postId) {
      if (this.newCommentContent.trim() === '') {
        alert('评论内容不能为空');
        return;
      }

      addComment(postId, this.newCommentContent)
        .then(response => {
          const newComment = response.data;
          console.log('newComment', newComment)
          const post = this.posts.find(p => p.id === postId);

          if (post) {
            post.comments.push(newComment);  // 将新评论添加到对应帖子的评论列表中
          }
          this.newCommentContent = '';  // 清空评论输入框
        })
        .catch(error => {
          console.error('There was an error adding the comment:', error);
        });
    },

    // 删除评论
    deleteComment(postId, commentId) {
      deleteComment(commentId)
        .then(() => {
          // 在前端移除删除的评论
          const post = this.posts.find(p => p.id === postId);
          if (post) {
            post.comments = post.comments.filter(c => c.id !== commentId);  // 更新本地评论列表
          }
        })
        .catch(error => {
          console.error('There was an error deleting the comment:', error);
        });
    },

    // 切换帖子评论区的折叠/展开
    toggleCommentCollapse(postId) {
      const post = this.posts.find(p => p.id === postId);
      if (post) {
        post.isCommentCollapsed = !post.isCommentCollapsed;
      }
    },

    // 切换发布帖子的折叠/展开
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    }
  }
};
</script>

<style scoped>
.add-post-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 10px;
  background-color: white;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.collapse-btn, .expand-btn {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.collapse-btn:hover, .expand-btn:hover {
  background-color: #2980b9;
}

.expand-btn {
  background-color: #2ecc71;
  padding: 10px 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}

.expand-btn:hover {
  background-color: #27ae60;
}

.toggle-btn-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.post-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post-card {
  background-color: white;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.post-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.profile-picture {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
}

.post-info {
  flex-grow: 1;
}

.delete-post-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-post-btn:hover {
  background-color: #c0392b;
}

.comment-section {
  margin-top: 20px;
}

.comment-box {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  background-color: #f9f9f9;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.comment-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.comment-info {
  display: flex;
  align-items: flex-start;
}

.comment-details {
  display: flex;
  flex-direction: column;
}

.delete-comment-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-comment-btn:hover {
  background-color: #c0392b;
}

.no-posts {
  text-align: center;
  margin-top: 20px;
}

strong {
  font-weight: bold;
}
</style>
