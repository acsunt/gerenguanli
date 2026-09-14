<script setup lang="ts">
import { ref } from 'vue'
import { useSpaceStore } from '../../space/stores/SpaceStore'
import PMCard from '../../../components/PMCard.vue'
import PMButton from '../../../components/PMButton.vue'
import PMInput from '../../../components/PMInput.vue'
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
</script>

<template>
  <div>
    <h1>待办中心</h1>

    <PMCard>
      <PMInput v-model="title" placeholder="输入待办事项" />
      <PMButton @click="addTodo">新增待办</PMButton>
    </PMCard>

    <PMCard v-for="item in store.items" :key="item.id">
      <div>{{ item.title }}</div>
    </PMCard>
  </div>
</template>