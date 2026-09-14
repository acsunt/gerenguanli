<script setup lang="ts">
import AppTopBar from '../../modules/navigation/components/AppTopBar.vue'
</script>

<template>
  <div class="app-layout">
    <AppTopBar />
    <aside class="sidebar">
      <h3>个人管理</h3>

      <RouterLink to="/dashboard">首页</RouterLink>
      <RouterLink to="/space">空间</RouterLink>
      <RouterLink to="/diary">记录</RouterLink>
      <RouterLink to="/idea">想法</RouterLink>
      <RouterLink to="/task">待办</RouterLink>
      <RouterLink to="/note">笔记</RouterLink>
      <RouterLink to="/review">回顾</RouterLink>
      <RouterLink to="/reminder">提醒</RouterLink>
      <RouterLink to="/setting">设置</RouterLink>
    </aside>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background: var(--bg-page);
}

.sidebar {
  width: 220px;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--bg-surface);
  border-right: 1px solid var(--border);
}

.main-content {
  flex: 1;
  padding: var(--space-6);
}
</style>
