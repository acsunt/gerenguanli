<script setup lang="ts">
import { computed } from 'vue'
import { useSpaceStore } from '../stores/SpaceStore'

const store = useSpaceStore()

const currentSpace = computed(() =>
  store.spaces.find(item => item.id === store.currentSpaceId),
)
</script>

<template>
  <button class="space-selector">
    当前空间：{{ currentSpace?.name ?? '未选择空间' }}
  </button>
</template>

<style scoped>
.space-selector {
  border: none;
  background: var(--bg-surface);
  color: var(--text-1);
  border-radius: var(--radius-full);
  padding: var(--space-2) var(--space-4);
}
</style>