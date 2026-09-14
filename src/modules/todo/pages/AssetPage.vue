<script setup lang="ts">
import { ref } from 'vue'
import PMCard from '../../../components/PMCard.vue'
import PMButton from '../../../components/PMButton.vue'
import PMInput from '../../../components/PMInput.vue'
import { useSpaceStore } from '../../space/stores/SpaceStore'
import { useSpacePageLoad } from '../../space/composables/useSpacePageLoad'
import { useAssetStore } from '../stores/AssetStore'

const store = useAssetStore()
const spaceStore = useSpaceStore()

const editingId = ref('')
const name = ref('')

useSpacePageLoad(async (spaceId) => {
  await store.load(spaceId)
})

async function save() {
  if (!spaceStore.currentSpaceId || !name.value.trim()) return

  if (editingId.value) {
    await store.update(editingId.value, { name: name.value })
    await store.load(spaceStore.currentSpaceId)
  } else {
    await store.create({
      id: crypto.randomUUID(),
      spaceId: spaceStore.currentSpaceId,
      name: name.value,
      createdAt: new Date().toISOString()
    })
  }

  editingId.value = ''
  name.value = ''
}

function editItem(item: any) {
  editingId.value = item.id
  name.value = item.name
}

async function removeItem(id: string) {
  await store.remove(id, spaceStore.currentSpaceId)
}
</script>

<template>
  <div>
    <h1>资产中心</h1>

    <PMCard>
      <PMInput v-model="name" placeholder="资产名称" />
      <PMButton @click="save">{{ editingId ? '保存修改' : '新增资产' }}</PMButton>
    </PMCard>

    <PMCard v-for="item in store.items" :key="item.id">
      <div>{{ item.name }}</div>
      <PMButton variant="secondary" @click="editItem(item)">编辑</PMButton>
      <PMButton variant="ghost" @click="removeItem(item.id)">删除</PMButton>
    </PMCard>
  </div>
</template>