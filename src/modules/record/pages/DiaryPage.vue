<script setup lang="ts">
import { ref } from 'vue'
import { useSpaceStore } from '../../space/stores/SpaceStore'
import { useDiaryStore } from '../stores/DiaryStore'
import { formatMonthDay } from '../../../shared/time'

const store = useDiaryStore()
const spaceStore = useSpaceStore()
const title = ref('')
const content = ref('')

async function save() {
  if (!spaceStore.currentSpaceId || !title.value.trim()) return

  await store.create({
    id: crypto.randomUUID(),
    spaceId: spaceStore.currentSpaceId,
    title: title.value,
    content: content.value,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })

  title.value = ''
  content.value = ''
}
</script>

<template>
  <div>
    <section class="section">
      <div class="card">
        <div class="field">
          <input v-model="title" class="input" placeholder="标题" />
        </div>
        <div class="field">
          <textarea v-model="content" class="textarea" placeholder="今天发生了什么…" />
        </div>
        <button class="btn btn-primary btn-block" type="button" @click="save">写日记</button>
      </div>
    </section>

    <section class="section">
      <div v-if="store.items.length === 0" class="empty">
        <div class="empty-title">暂无日记</div>
      </div>
      <div v-for="item in store.items" :key="item.id" class="card" style="margin-bottom:12px">
        <div class="text-hint">{{ formatMonthDay(item.createdAt) }}</div>
        <div class="text-heading">{{ item.title }}</div>
        <div class="text-long">{{ item.content }}</div>
      </div>
    </section>
  </div>
</template>
