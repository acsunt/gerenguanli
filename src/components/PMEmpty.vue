<template>
  <div class="pm-empty">
    <div class="pm-empty-icon">🌱</div>
    <div class="pm-empty-text">
      <slot>暂无数据</slot>
    </div>
  </div>
</template>

<style scoped>
.pm-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  padding: var(--space-8);
  color: var(--text-2);
}
.pm-empty-icon {
  font-size: 48px;
}
</style>
