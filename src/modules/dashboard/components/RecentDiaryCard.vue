<script setup lang="ts">
import { computed } from 'vue'
import { formatMonthDay } from '../../../shared/time'
import { useDiaryStore } from '../../record/stores/DiaryStore'

const diaryStore = useDiaryStore()
const diaries = computed(() => diaryStore.items.slice(0, 2))
</script>

<template>
  <section class="section">
    <div class="section-title">
      <div class="text-heading">📝 最近日记</div>
      <RouterLink class="text-caption" to="/diary">更多</RouterLink>
    </div>
    <div class="card">
      <div v-if="diaries.length === 0" class="empty">
        <div class="empty-title">暂无日记</div>
      </div>
      <div v-for="item in diaries" :key="item.id" class="diary-line">
        <div class="diary-date">{{ formatMonthDay(item.createdAt) }}</div>
        <div class="text-body">{{ item.content || item.title }}</div>
      </div>
    </div>
  </section>
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
