<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
}>()
</script>

<template>
  <div class="pm-stat-card">
    <div class="label">{{ title }}</div>
    <div class="value">{{ value }}</div>
  </div>
</template>

<style scoped>
.pm-stat-card {
  background: var(--bg-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  padding: var(--space-5);
}
.label {
  color: var(--text-2);
}
.value {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-1);
}
</style>
