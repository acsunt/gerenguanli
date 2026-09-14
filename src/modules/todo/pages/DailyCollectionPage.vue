<script setup lang="ts">
import { ref } from 'vue'
import PMCard from '../../../components/PMCard.vue'
import PMButton from '../../../components/PMButton.vue'
import PMInput from '../../../components/PMInput.vue'
import PMTextarea from '../../../components/PMTextarea.vue'
import { useSpaceStore } from '../../space/stores/SpaceStore'
import { useSpacePageLoad } from '../../space/composables/useSpacePageLoad'
import { useDailyCollectionStore } from '../stores/DailyCollectionStore'

const store = useDailyCollectionStore()
const spaceStore = useSpaceStore()

const editingId = ref('')
const title = ref('')
const content = ref('')

useSpacePageLoad(async (spaceId) => {
  await store.load(spaceId)
})

async function save() {
  if (!spaceStore.currentSpaceId || !title.value.trim()) return

  if (editingId.value) {
    await store.update(editingId.value, {
      title: title.value,
      content: content.value
    })
    await store.load(spaceStore.currentSpaceId)
  } else {
    await store.create({
      id: crypto.randomUUID(),
      spaceId: spaceStore.currentSpaceId,
      title: title.value,
      content: content.value,
      createdAt: new Date().toISOString()
    })
  }

  editingId.value = ''
  title.value = ''
  content.value = ''
}

function editItem(item: any) {
  editingId.value = item.id
  title.value = item.title
  content.value = item.content
}

async function removeItem(id: string) {
  await store.remove(id, spaceStore.currentSpaceId)
}
</script>

<template>
  <div>
    <h1>日用集</h1>

    <PMCard>
      <PMInput v-model="title" placeholder="标题" />
      <PMTextarea v-model="content" placeholder="内容" />
      <PMButton @click="save">{{ editingId ? '保存修改' : '新增记录' }}</PMButton>
    </PMCard>

    <PMCard v-for="item in store.items" :key="item.id">
      <div>{{ item.title }}</div>
      <div>{{ item.content }}</div>
      <PMButton variant="secondary" @click="editItem(item)">编辑</PMButton>
      <PMButton variant="ghost" @click="removeItem(item.id)">删除</PMButton>
    </PMCard>
  </div>
</template>