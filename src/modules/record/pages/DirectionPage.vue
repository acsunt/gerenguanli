<script setup lang="ts">
import { ref } from 'vue'
import PMCard from '../../../components/PMCard.vue'
import PMButton from '../../../components/PMButton.vue'
import PMInput from '../../../components/PMInput.vue'
import { useSpaceStore } from '../../space/stores/SpaceStore'
import { useSpacePageLoad } from '../../space/composables/useSpacePageLoad'
import { useDirectionStore } from '../stores/DirectionStore'

const store = useDirectionStore()
const spaceStore = useSpaceStore()

const editingId = ref('')
const title = ref('')
const category = ref('默认')

useSpacePageLoad(async (spaceId) => {
  await store.load(spaceId)
})

async function save() {
  if (!spaceStore.currentSpaceId || !title.value.trim()) return

  if (editingId.value) {
    await store.update(editingId.value, {
      title: title.value,
      category: category.value
    })
    await store.load(spaceStore.currentSpaceId)
  } else {
    await store.create({
      id: crypto.randomUUID(),
      spaceId: spaceStore.currentSpaceId,
      title: title.value,
      category: category.value,
      createdAt: new Date().toISOString()
    })
  }

  editingId.value = ''
  title.value = ''
}

function editItem(item: any) {
  editingId.value = item.id
  title.value = item.title
  category.value = item.category
}

async function removeItem(id: string) {
  await store.remove(id, spaceStore.currentSpaceId)
}
</script>

<template>
  <div>
    <h1>方向</h1>

    <PMCard>
      <PMInput v-model="title" placeholder="方向名称" />
      <PMInput v-model="category" placeholder="分类" />
      <PMButton @click="save">{{ editingId ? '保存修改' : '新增方向' }}</PMButton>
    </PMCard>

    <PMCard v-for="item in store.items" :key="item.id">
      <div>{{ item.title }} ({{ item.category }})</div>
      <PMButton variant="secondary" @click="editItem(item)">编辑</PMButton>
      <PMButton variant="ghost" @click="removeItem(item.id)">删除</PMButton>
    </PMCard>
  </div>
</template>