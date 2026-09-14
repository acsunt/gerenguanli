<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useThemeStore } from '../../shared/theme/themeStore'

const router = useRouter()
const themeStore = useThemeStore()
</script>

<template>
  <div>
    <header class="topbar" style="position:relative">
      <button class="btn btn-icon btn-ghost" type="button" @click="router.back()">‹</button>
      <div class="topbar-title">设置</div>
      <div class="topbar-actions"></div>
    </header>

    <div class="page">
    <section class="section">
      <div class="card">
        <button class="setting-row" type="button" @click="themeStore.toggleTheme()">
          <span>深色模式</span>
          <span class="text-hint">{{ themeStore.theme === 'dark' ? '已开启' : '已关闭' }}</span>
        </button>
        <RouterLink class="setting-row" to="/space">
          <span>空间管理</span>
          <span class="text-hint">▸</span>
        </RouterLink>
        <RouterLink class="setting-row" to="/reminder">
          <span>临期提醒</span>
          <span class="text-hint">▸</span>
        </RouterLink>
      </div>
    </section>
    </div>
  </div>
</template>

<style scoped>
.setting-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) 0;
  border-bottom: var(--border-hair);
  color: inherit;
}

.setting-row:last-child {
  border-bottom: none;
}
</style>
