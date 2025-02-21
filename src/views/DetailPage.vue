<template>
  <div class="user-info-container">
    <!-- Display profile image -->
    <div class="profile-image-container">
      <img :src="`/src/image/photo/${userData.profile_picture}`"  alt="Profile Picture" class="profile-image" />
    </div>

    <!-- User information fields -->
    <div class="user-info">
      <h2>User Information</h2>

      <div class="user-info-fields">
        <!-- Render all fields in editable or text mode based on isEditing -->
        <div v-for="(key, index) in prioritizedFields" :key="key" class="user-info-field" v-if="key !== 'id'">
          <div class="user-info-row">
            <label><strong>{{ keyName[key] || key }}</strong>:</label>

            <!-- Editable fields when isEditing is true -->
            <div v-if="isEditing">
              <input v-model="userData[key]" :type="getInputType(key)" :placeholder="getPlaceholder(key)" />
            </div>

            <!-- Display text when isEditing is false -->
            <div v-else>
              <!-- Only render the span if there is data for this field -->
              <span v-if="userData[key]">{{ userData[key] }}</span>
              <!-- Don't render span if no data (this is effectively nothing rendered) -->
            </div>
          </div>
        </div>
      </div>

      <!-- Toggle between Edit and Save button -->
      <button @click="toggleEditMode" class="edit-button">
        {{ isEditing ? 'Save Changes' : '修改資料' }}
      </button>
    </div>
  </div>
</template>


<script>
import { ref } from 'vue';  // 导入 ref
import { updateUser } from '../services/user_api';
import { useUserStore } from '../stores/userStore';

export default {
  data() {
    return {
      userData: ref({ // 使用 ref 来确保它是响应式的
        username: '',
        bio: '',
        age: '',
        gender: '',
        interests: '',
        location: '',
        occupation: '',
        personality_tags: '',
        profile_picture: '', // 默认空字符串
        password: '',
        id: ''
      }),
      keyName: {
        username: 'Username',
        bio: 'Bio',
        age: 'Age',
        gender: 'Gender',
        interests: 'Interests',
        location: 'Location',
        occupation: 'Occupation',
        personality_tags: 'Personality Tags',
        profile_picture: 'Profile Picture URL',
        password: 'Password',
        id: 'ID',
      },
      prioritizedFields: ['username', 'password', 'bio', 'age', 'gender', 'interests', 'location', 'occupation', 'personality_tags', 'profile_picture'],
      isEditing: false,
      isSaving: false,
    };
  },
  mounted() {
    this.loadUserData();  // Ensure user data is loaded on mount
  },
  methods: {
    loadUserData() {
      const userStore = useUserStore();  // 获取 store 实例
      const storedUser = userStore.getUser;  // 获取用户数据
      console.log(storedUser)
      if (storedUser) {
        this.userData = storedUser;  // 使用 `value` 来访问 ref 的值
      } else {
        console.warn('No user data found in storage.');
      }
    },
    toggleEditMode() {
      if (this.isEditing) {
        this.updateUser();
      }
      this.isEditing = !this.isEditing;
    },
    async updateUser() {
      try {
        this.isSaving = true;
        const response = await updateUser(this.userData); // 使用 ref 的值进行 API 调用
        console.log("User saved:", response);
        const userStore = useUserStore();  // 获取 store 实例
        userStore.setUser(response.user);
      } catch (error) {
        console.error('Error saving user data:', error);
      } finally {
        this.isSaving = false;
      }
    },

    getPlaceholder(key) {
      return this.userData[key] || '';
    },
    getInputType(key) {
      return key === 'age' ? 'number' : key === 'password' ? 'password' : 'text';
    }
  },
};
</script>

<style scoped>
/* User info container */
.user-info-container {
  width: 100%; /* Full width */
  margin: 20px auto; /* Center horizontally */
  padding: 30px; /* Add padding for spacing */
  background-color: rgba(255, 255, 255, 0.6); /* Slightly transparent background for softer feel */
  background-image: url('@/image/background/cloud.jpg'); /* Use your background image */
  background-size: cover; /* Cover the entire container */
  background-position: center center; /* Center the background image */
  background-repeat: no-repeat; /* Prevent background repeat */
  border-radius: 16px; /* Add larger border-radius for the container */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  border: 1px solid #e0e0e0; /* Light border */
  box-sizing: border-box; /* Include padding and border in the total width */
  text-align: center; /* Center text and elements inside */
}

/* Profile image container */
.profile-image-container {
  margin-bottom: 30px; /* Space between image and user information */
}

/* Profile image styling */
.profile-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  border: 5px solid #fff; /* Add a border around the image */
  margin-bottom: 20px;
}

/* Heading styling */
.user-info-container h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
}

/* Form field container (flexbox for 2 columns) */
.user-info-fields {
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to new lines */
  gap: 20px; /* Space between columns */
  justify-content: center; /* Center align the fields */
  padding: 20px 0; /* Add vertical padding */
}

/* Each individual field styling */
.user-info-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 45%; /* Each field takes up 45% of the row, 2 fields per row */
  padding: 15px;
  background-color: #f9f9f9; /* Field background color */
  border: 1px solid #dcdcdc; /* Softer border */
  border-radius: 8px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

/* Label styling */
label {
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
  margin-bottom: 6px;
  text-transform: capitalize;
}

/* Span display when not editing (optimized) */
span {
  display: inline-block;
  padding: 8px 14px;
  font-size: 1rem;
  border-radius: 6px;
  background-color: #f4f4f4; /* Softer background color */
  border: 1px solid #dcdcdc; /* Softer border */
  color: #555;
  line-height: 1.4;
  text-align: left; /* Align text to left */
  max-width: 100%; /* Prevent it from overflowing */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 5px;
  transition: all 0.3s ease;
}

/* Focus effect for span */
span:hover {
  border-color: #3498db;
  background-color: #e9f3ff;
}

/* Input fields styling when editing */
input {
  padding: 8px;
  font-size: 1rem;
  border-radius: 6px;
  border: 1px solid #dcdcdc; /* Softer border */
  width: 100%; /* Make the input take full width */
  margin-top: 5px;
  background-color: #fafafa; /* Softer background color */
}

/* Button styling */
.edit-button {
  width: 25%; /* Button width adjusted to be more flexible */
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin-top: 20px; /* Add space above the button */
}

.edit-button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
}

.edit-button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 768px) {
  .user-info-container {
    padding: 20px;
  }

  .user-info-fields {
    gap: 15px;
  }

  .user-info-field {
    width: 100%; /* On smaller screens, make the fields take up the full width */
  }

  .edit-button {
    font-size: 1.1rem;
    padding: 12px;
    width: 50%; /* Make the button wider on smaller screens */
  }
}

</style>
