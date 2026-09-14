<script setup lang="ts">
import { ref } from 'vue'
import { useSpaceStore } from '../../space/stores/SpaceStore'
import { useQuoteStore } from '../stores/QuoteStore'

const store = useQuoteStore()
const spaceStore = useSpaceStore()
const content = ref('')
const source = ref('')

async function save() {
  if (!spaceStore.currentSpaceId || !content.value.trim()) return

  await store.create({
    id: crypto.randomUUID(),
    spaceId: spaceStore.currentSpaceId,
    content: content.value,
    source: source.value,
    createdAt: new Date().toISOString()
  })

  content.value = ''
  source.value = ''
}
</script>

<template>
  <div>
    <section class="section">
      <div class="card">
        <div class="field">
          <input v-model="source" class="input" placeholder="来源" />
        </div>
        <div class="field">
          <textarea v-model="content" class="textarea" placeholder="摘抄内容" />
        </div>
        <button class="btn btn-primary btn-block" type="button" @click="save">新增摘抄</button>
      </div>
    </section>

    <section class="section">
      <div v-if="store.items.length === 0" class="empty">
        <div class="empty-title">暂无摘抄</div>
      </div>
      <div v-for="item in store.items" :key="item.id" class="card" style="margin-bottom:12px">
        <div class="text-body-lg">{{ item.content }}</div>
        <div class="text-hint">{{ item.source }}</div>
      </div>
    </section>
  </div>
</template>
