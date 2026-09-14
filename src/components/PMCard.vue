<template>
  <div class="pm-card">
    <slot />
  </div>
</template>

<style scoped>
.pm-card {
  background: var(--bg-surface);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  padding: var(--space-6);
}
</style>
