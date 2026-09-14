<template>
  <nav class="pm-tabbar">
    <slot />
  </nav>
</template>

<style scoped>
.pm-tabbar {
  position: fixed;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  background: var(--bg-surface);
  border-radius: var(--radius-2xl);
  padding: var(--space-3);
  box-shadow: var(--shadow-md);
}
</style>