<script setup lang="ts">
import { ref } from 'vue'
import { useSpaceStore } from '../../space/stores/SpaceStore'
import { useTodoStore } from '../stores/TodoStore'

const store = useTodoStore()
const spaceStore = useSpaceStore()
const title = ref('')

async function addTodo() {
  if (!title.value.trim() || !spaceStore.currentSpaceId) return

  await store.create({
    id: crypto.randomUUID(),
    spaceId: spaceStore.currentSpaceId,
    title: title.value,
    completed: false,
    createdAt: new Date().toISOString()
  })

  title.value = ''
}

async function toggle(id: string, completed: boolean) {
  await store.update(id, { completed: !completed })
  if (spaceStore.currentSpaceId) {
    await store.load(spaceStore.currentSpaceId)
  }
}
</script>

<template>
  <div>
    <section class="section">
      <div class="card">
        <div class="field">
          <input v-model="title" class="input" placeholder="输入待办事项" />
        </div>
        <button class="btn btn-primary btn-block" type="button" @click="addTodo">新增待办</button>
      </div>
    </section>

    <section class="section">
      <div class="card">
        <div v-if="store.items.length === 0" class="empty">
          <div class="empty-title">还没有待办</div>
        </div>
        <div
          v-for="item in store.items"
          :key="item.id"
          class="todo-item"
          @click="toggle(item.id, item.completed)"
        >
          <span class="checkbox" :data-checked="item.completed || undefined" />
          <span class="text-body" :class="{ done: item.completed }">{{ item.title }}</span>
        </div>
      </div>
    </section>
  </div>
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
