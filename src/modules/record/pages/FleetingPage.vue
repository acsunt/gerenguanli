<script setup lang="ts">
import { ref } from 'vue'
import { useSpaceStore } from '../../space/stores/SpaceStore'
import { useFleetingStore } from '../stores/FleetingStore'
import { formatMonthDay } from '../../../shared/time'

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
    <section class="section">
      <div class="card">
        <div class="field">
          <textarea v-model="content" class="textarea" placeholder="记录此刻想法…" />
        </div>
        <button class="btn btn-primary btn-block" type="button" @click="addItem">新增记录</button>
      </div>
    </section>

    <section class="section">
      <div v-if="store.items.length === 0" class="empty">
        <div style="font-size:48px">🌱</div>
        <div class="empty-title">这里空空的，先种下第一颗想法吧</div>
      </div>
      <div v-else class="card">
        <div v-for="item in store.items" :key="item.id" class="diary-line">
          <div class="diary-date">{{ formatMonthDay(item.createdAt) }}</div>
          <div class="text-body">{{ item.content }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.diary-line {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-3) 0;
  border-bottom: var(--border-hair);
}

.diary-line:last-child {
  border-bottom: none;
}

.diary-date {
  font-size: var(--fs-13);
  color: var(--text-3);
  width: 88px;
  flex-shrink: 0;
}
</style>
