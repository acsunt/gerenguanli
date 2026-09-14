<script setup lang="ts">
defineProps<{
  items: string[]
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="pm-segment">
    <button
      v-for="item in items"
      :key="item"
      class="pm-segment-item"
      :data-active="item === modelValue"
      @click="$emit('update:modelValue', item)"
    >
      {{ item }}
    </button>
  </div>
</template>

<style scoped>
.pm-segment {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-2);
  border-radius: var(--radius-full);
  background: var(--bg-muted);
}
.pm-segment-item {
  border: none;
  border-radius: var(--radius-full);
  padding: var(--space-2) var(--space-4);
  background: transparent;
}
.pm-segment-item[data-active="true"] {
  background: var(--bg-surface);
  box-shadow: var(--shadow-sm);
}
</style>
