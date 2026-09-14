<template>
  <span class="pm-tag">
    <slot />
  </span>
</template>

<style scoped>
.pm-tag {
  display: inline-flex;
  align-items: center;
  height: 28px;
  padding: 0 var(--space-3);
  border-radius: var(--radius-full);
  background: var(--bg-muted);
  color: var(--text-1);
}
</style>
