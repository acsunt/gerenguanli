<template>
  <header class="pm-navbar">
    <slot />
  </header>
</template>

<style scoped>
.pm-navbar {
  height: var(--height-topbar);
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--space-4);
}
</style>