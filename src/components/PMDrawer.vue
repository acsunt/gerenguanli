<template>
  <aside class="pm-drawer">
    <slot />
  </aside>
</template>

<style scoped>
.pm-drawer {
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: min(420px, 90vw);
  background: var(--bg-surface);
  border-radius: var(--radius-2xl) 0 0 var(--radius-2xl);
  box-shadow: var(--shadow-lg);
  padding: var(--space-6);
}
</style>