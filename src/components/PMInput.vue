<template>
  <input class="pm-input" v-bind="$attrs" />
</template>

<style scoped>
.pm-input {
  width: 100%;
  height: 56px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--bg-subtle);
  padding: 0 var(--space-4);
  color: var(--text-1);
}
</style>
