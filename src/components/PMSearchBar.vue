<template>
  <input class="pm-searchbar" placeholder="搜索..." v-bind="$attrs" />
</template>

<style scoped>
.pm-searchbar {
  width: 100%;
  height: var(--height-btn);
  border: 1px solid var(--border);
  border-radius: var(--radius-full);
  background: var(--bg-subtle);
  padding: 0 var(--space-4);
}
</style>
