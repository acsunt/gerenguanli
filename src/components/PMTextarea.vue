<template>
  <textarea class="pm-textarea" v-bind="$attrs" />
</template>

<style scoped>
.pm-textarea {
  width: 100%;
  min-height: 120px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg-subtle);
  padding: var(--space-4);
  color: var(--text-1);
}
</style>
