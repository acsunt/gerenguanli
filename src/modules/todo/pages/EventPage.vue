<script setup lang="ts">
import { ref } from 'vue'
import { useSpaceStore } from '../../space/stores/SpaceStore'
import { useEventStore } from '../stores/EventStore'

const store = useEventStore()
const spaceStore = useSpaceStore()
const title = ref('')
const eventDate = ref('')

async function save() {
  if (!spaceStore.currentSpaceId || !title.value.trim()) return

  await store.create({
    id: crypto.randomUUID(),
    spaceId: spaceStore.currentSpaceId,
    title: title.value,
    eventDate: eventDate.value || new Date().toISOString().slice(0, 10),
    createdAt: new Date().toISOString()
  })

  title.value = ''
  eventDate.value = ''
}
</script>

<template>
  <div>
    <section class="section">
      <div class="card">
        <div class="field">
          <input v-model="title" class="input" placeholder="事件标题" />
        </div>
        <div class="field">
          <input v-model="eventDate" class="input" type="date" />
        </div>
        <button class="btn btn-primary btn-block" type="button" @click="save">新增事件</button>
      </div>
    </section>

    <section class="section">
      <div v-if="store.items.length === 0" class="empty">
        <div class="empty-title">暂无事件</div>
      </div>
      <div v-for="item in store.items" :key="item.id" class="card" style="margin-bottom:12px">
        <div class="text-subhead">{{ item.title }}</div>
        <div class="text-hint">{{ item.eventDate }}</div>
      </div>
    </section>
  </div>
</template>
