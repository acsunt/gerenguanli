<template>
  <div class="pm-timeline">
    <slot />
  </div>
</template>

<style scoped>
.pm-timeline {
  border-left: 2px solid var(--border);
  padding-left: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
</style>