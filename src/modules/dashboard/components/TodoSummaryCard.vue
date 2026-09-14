<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTodoStore } from '../../todo/stores/TodoStore'
import { useSpaceStore } from '../../space/stores/SpaceStore'

const router = useRouter()
const todoStore = useTodoStore()
const spaceStore = useSpaceStore()

const todos = computed(() => todoStore.items.slice(0, 3))

async function toggle(id: string, completed: boolean) {
  await todoStore.update(id, { completed: !completed })
  if (spaceStore.currentSpaceId) {
    await todoStore.load(spaceStore.currentSpaceId)
  }
}
</script>

<template>
  <section class="section">
    <div class="section-title">
      <div class="text-heading">⭐ 今日必做</div>
      <button class="btn btn-sm btn-ghost" type="button" @click="router.push('/task')">+ 新增</button>
    </div>
    <div class="card">
      <div v-if="todos.length === 0" class="empty">
        <div class="empty-title">还没有待办，先记下今天最想完成的一件事</div>
      </div>
      <div
        v-for="item in todos"
        :key="item.id"
        class="todo-item"
        @click="toggle(item.id, item.completed)"
      >
        <span class="checkbox" :data-checked="item.completed || undefined" />
        <span class="text-body" :class="{ done: item.completed }">{{ item.title }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) 0;
  border-bottom: var(--border-hair);
}

.todo-item:last-child {
  border-bottom: none;
}

.checkbox {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 1.5px solid var(--border-strong);
  flex-shrink: 0;
}

.checkbox[data-checked="true"] {
  background: var(--color-brand);
  border-color: var(--color-brand);
}

.done {
  color: var(--text-3);
  text-decoration: line-through;
}
</style>
