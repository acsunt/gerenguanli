<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>

<template>
  <div class="pm-avatar">
    {{ text?.slice(0, 1) ?? '?' }}
  </div>
</template>

<style scoped>
.pm-avatar {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--color-brand-3);
  color: var(--text-1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}
</style>
