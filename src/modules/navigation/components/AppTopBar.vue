<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSpaceStore } from '../../space/stores/SpaceStore'
import { useThemeStore } from '../../../shared/theme/themeStore'
import { useAppRouteGroups } from '../../../app/layout/routeGroups'

const emit = defineEmits<{
  openMenu: []
  toggleSpace: []
}>()

const router = useRouter()
const spaceStore = useSpaceStore()
const themeStore = useThemeStore()
const { isReviewFamily } = useAppRouteGroups()

const currentSpace = computed(() =>
  spaceStore.spaces.find(item => item.id === spaceStore.currentSpaceId)
)

const title = computed(() => {
  if (isReviewFamily.value) return '回顾中心'
  return currentSpace.value?.name ?? '个人管理'
})
</script>

<template>
  <header class="topbar">
    <button class="btn btn-icon btn-ghost" aria-label="菜单" @click="emit('openMenu')">☰</button>
    <button class="topbar-title" type="button" @click="emit('toggleSpace')">
      {{ title }}
      <span v-if="!isReviewFamily" class="text-hint">▾</span>
    </button>
    <div class="topbar-actions">
      <button class="btn btn-icon btn-ghost" aria-label="模式" @click="themeStore.toggleTheme()">
        {{ themeStore.theme === 'dark' ? '☀️' : '🌙' }}
      </button>
      <button class="btn btn-icon btn-ghost" aria-label="设置" @click="router.push('/setting')">⚙</button>
    </div>
  </header>
</template>
