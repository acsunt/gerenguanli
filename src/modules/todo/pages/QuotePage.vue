<script setup lang="ts">
import { ref } from 'vue'
import PMCard from '../../../components/PMCard.vue'
import PMButton from '../../../components/PMButton.vue'
import PMTextarea from '../../../components/PMTextarea.vue'
import PMInput from '../../../components/PMInput.vue'
import { useSpaceStore } from '../../space/stores/SpaceStore'
import { useSpacePageLoad } from '../../space/composables/useSpacePageLoad'
import { useQuoteStore } from '../stores/QuoteStore'

const store = useQuoteStore()
const spaceStore = useSpaceStore()

const editingId = ref('')
const content = ref('')
const source = ref('')

useSpacePageLoad(async (spaceId) => {
  await store.load(spaceId)
})

async function save() {
  if (!spaceStore.currentSpaceId || !content.value.trim()) return

  if (editingId.value) {
    await store.update(editingId.value, {
      content: content.value,
      source: source.value
    })
    await store.load(spaceStore.currentSpaceId)
  } else {
    await store.create({
      id: crypto.randomUUID(),
      spaceId: spaceStore.currentSpaceId,
      content: content.value,
      source: source.value,
      createdAt: new Date().toISOString()
    })
  }

  editingId.value = ''
  content.value = ''
  source.value = ''
}

function editItem(item: any) {
  editingId.value = item.id
  content.value = item.content
  source.value = item.source ?? ''
}

async function removeItem(id: string) {
  await store.remove(id, spaceStore.currentSpaceId)
}
</script>

<template>
  <div>
    <h1>摘抄中心</h1>

    <PMCard>
      <PMInput v-model="source" placeholder="来源" />
      <PMTextarea v-model="content" placeholder="摘抄内容" />
      <PMButton @click="save">{{ editingId ? '保存修改' : '新增摘抄' }}</PMButton>
    </PMCard>

    <PMCard v-for="item in store.items" :key="item.id">
      <div>{{ item.content }}</div>
      <small>{{ item.source }}</small>
      <PMButton variant="secondary" @click="editItem(item)">编辑</PMButton>
      <PMButton variant="ghost" @click="removeItem(item.id)">删除</PMButton>
    </PMCard>
  </div>
</template>