<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'

import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

const openProfileSettings = () => fetch('/profile/settings')
</script>

<template>
  <!-- Chat Section -->
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Chat</template>
    Engage in private and group chats with your matches. Start a conversation and make new connections.
  </WelcomeItem>

  <!-- Match Section -->
  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Matches</template>
    Discover your best matches based on interests, location, and personality. Find your potential connections.
  </WelcomeItem>

  <!-- Profile Section -->
  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Profile</template>
    Manage and customize your profile. Update your pictures, bio, and personal details to stand out!
  </WelcomeItem>

  <!-- Events Section -->
  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Events</template>
    Join local events and activities organized for singles. Explore fun events happening in your area.
  </WelcomeItem>

  <!-- Settings Section -->
  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Settings</template>
    Fine-tune your account and app preferences. Adjust your notification settings, privacy, and more.
    <a href="javascript:void(0)" @click="openProfileSettings"><code>Profile Settings</code></a>
  </WelcomeItem>
</template>

<style scoped>
/* Center the entire container in both axis */
body, html {
  height: 100%;
  margin: 0;
  font-family: Arial, sans-serif;
}

.welcome-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  min-height: 100vh;
  padding: 20px;
}

.welcome-item {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 280px;
  text-align: center;
  transition: transform 0.3s ease-in-out;
}

.welcome-item:hover {
  transform: translateY(-5px);
}

.welcome-item .heading {
  font-size: 1.25rem;
  font-weight: bold;
  margin-top: 10px;
  color: #333;
}

.welcome-item p {
  font-size: 1rem;
  color: #666;
}

.welcome-item .icon {
  font-size: 3rem;
  color: #ff6b81;
}

.welcome-item a {
  color: #007BFF;
  text-decoration: none;
  font-weight: bold;
}

.welcome-item a:hover {
  text-decoration: underline;
}
</style>
