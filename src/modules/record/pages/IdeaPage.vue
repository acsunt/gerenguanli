<script setup lang="ts">
import { ref } from 'vue'
import { useSpaceStore } from '../../space/stores/SpaceStore'
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
    <section class="section">
      <div class="card">
        <div class="field">
          <textarea v-model="content" class="textarea" placeholder="记录灵感…" />
        </div>
        <button class="btn btn-primary btn-block" type="button" @click="addIdea">新增灵感</button>
      </div>
    </section>

    <section class="section">
      <div v-if="store.items.length === 0" class="empty">
        <div class="empty-title">暂无灵感</div>
      </div>
      <div v-for="item in store.items" :key="item.id" class="card" style="margin-bottom:12px">
        <div class="text-body-lg">{{ item.content }}</div>
      </div>
    </section>
  </div>
</template>
