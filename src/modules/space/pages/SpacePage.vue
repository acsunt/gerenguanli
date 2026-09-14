<script setup lang="ts">
import SpaceSelector from '../components/SpaceSelector.vue'
import SpaceDrawer from '../components/SpaceDrawer.vue'
</script>

<template>
  <div class="space-page">
    <h1>空间系统</h1>
    <SpaceSelector />
    <SpaceDrawer />
  </div>
</template>

<style scoped>
.space-page {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
</style>
