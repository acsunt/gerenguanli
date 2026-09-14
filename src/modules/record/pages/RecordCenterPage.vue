<template>
  <div class="record-center">
    <RouterLink to="/diary">日记</RouterLink>
    <RouterLink to="/idea">灵感</RouterLink>
  </div>
</template>

<style scoped>
.record-center {
  display: grid;
  gap: var(--space-4);
}
</style>