<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSpaceStore } from '../stores/SpaceStore'

const emit = defineEmits<{
  close: []
}>()

const router = useRouter()
const store = useSpaceStore()

function select(id: string) {
  store.switchSpace(id)
  emit('close')
}

function goManage() {
  emit('close')
  router.push('/space')
}
</script>

<template>
  <div class="space-menu">
    <button
      v-for="space in store.spaces"
      :key="space.id"
      class="space-row"
      type="button"
      @click="select(space.id)"
    >
      <span class="dot" />
      <span class="text-body">{{ space.name }}</span>
      <span v-if="space.id === store.currentSpaceId" class="text-hint">✓</span>
    </button>
    <div class="space-actions">
      <button class="btn btn-sm btn-secondary" type="button" @click="goManage">管理空间</button>
    </div>
  </div>
</template>

<style scoped>
.space-menu {
  position: sticky;
  top: calc(var(--height-topbar) + env(safe-area-inset-top, 0px));
  z-index: var(--z-sticky);
  margin: 0 var(--space-4);
  background: var(--bg-surface);
  background: color-mix(in oklab, var(--bg-surface) 88%, transparent);
  backdrop-filter: blur(12px);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
  padding: var(--space-3);
}

.space-row {
  width: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-md);
}

.space-row:hover {
  background: var(--bg-muted);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  background: var(--color-brand);
}

.space-row .text-hint {
  margin-left: auto;
}

.space-actions {
  padding: var(--space-2) var(--space-3) var(--space-1);
}
</style>
