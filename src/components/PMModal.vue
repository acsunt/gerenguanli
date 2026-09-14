<template>
  <div class="pm-modal-mask">
    <div class="pm-modal">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.pm-modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.32);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.pm-modal {
  width: min(480px, 90vw);
  background: var(--bg-surface);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-lg);
}
</style>