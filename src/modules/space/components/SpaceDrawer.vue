<script setup lang="ts">
import PMDrawer from '../../../components/PMDrawer.vue'
import { useSpaceStore } from '../stores/SpaceStore'

const store = useSpaceStore()

async function removeSpace(id: string) {
  await store.remove(id)
}
</script>

<template>
  <PMDrawer>
    <h3>空间管理</h3>

    <div
      v-for="space in store.spaces"
      :key="space.id"
      class="space-item"
    >
      <span @click="store.switchSpace(space.id)">
        {{ space.name }}
      </span>

      <button
        v-if="!space.isDefault"
        @click="removeSpace(space.id)"
      >
        删除
      </button>
    </div>
  </PMDrawer>
</template>

<style scoped>
.space-item {
  display: flex;
  justify-content: space-between;
  padding: var(--space-3);
  border-radius: var(--radius-md);
  cursor: pointer;
}
</style>