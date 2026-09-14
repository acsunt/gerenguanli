<script setup lang="ts">
import { ref } from 'vue'
import { useSpaceStore } from '../../space/stores/SpaceStore'
import PMCard from '../../../components/PMCard.vue'
import PMButton from '../../../components/PMButton.vue'
import PMTextarea from '../../../components/PMTextarea.vue'
import { useIdeaStore } from '../stores/IdeaStore'

const store = useIdeaStore()
const spaceStore = useSpaceStore()
const content = ref('')

async function addIdea() {
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
    <h1>灵感</h1>
    <PMCard>
      <PMTextarea v-model="content" placeholder="记录灵感..." />
      <PMButton @click="addIdea">新增灵感</PMButton>
    </PMCard>

    <PMCard v-for="item in store.items" :key="item.id">
      {{ item.content }}
    </PMCard>
  </div>
</template>