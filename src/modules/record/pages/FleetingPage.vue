<script setup lang="ts">
import { ref } from 'vue'
import { useSpaceStore } from '../../space/stores/SpaceStore'
import PMCard from '../../../components/PMCard.vue'
import PMButton from '../../../components/PMButton.vue'
import PMTextarea from '../../../components/PMTextarea.vue'
import { useFleetingStore } from '../stores/FleetingStore'

const store = useFleetingStore()
const spaceStore = useSpaceStore()
const content = ref('')

async function addItem() {
  if (!content.value.trim() || !spaceStore.currentSpaceId) return

  await store.create({
    id: crypto.randomUUID(),
    spaceId: spaceStore.currentSpaceId,
    content: content.value,
    createdAt: new Date().toISOString()
  })

  content.value = ''
}
</script>

<template>
  <div>
    <h1>碎碎念</h1>
    <PMCard>
      <PMTextarea v-model="content" placeholder="记录此刻想法..." />
      <PMButton @click="addItem">新增记录</PMButton>
    </PMCard>

    <PMCard v-for="item in store.items" :key="item.id">
      <div>{{ item.content }}</div>
      <small>{{ item.createdAt }}</small>
    </PMCard>
  </div>
</template>