<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost'
}>()
</script>

<template>
  <button class="pm-button" :data-variant="variant ?? 'primary'">
    <slot />
  </button>
</template>

<style scoped>
.pm-button {
  height: var(--height-btn);
  border: none;
  border-radius: var(--radius-md);
  padding: 0 var(--space-4);
}
.pm-button[data-variant="primary"] {
  background: var(--color-brand);
}
.pm-button[data-variant="secondary"] {
  background: var(--bg-muted);
}
.pm-button[data-variant="ghost"] {
  background: transparent;
}
</style>
