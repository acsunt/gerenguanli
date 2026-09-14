<script setup lang="ts">
import { computed } from 'vue'
import { daysUntil } from '../../../shared/time'
import { useTodoStore } from '../../todo/stores/TodoStore'
import { useEventStore } from '../../todo/stores/EventStore'
import { useAssetStore } from '../../todo/stores/AssetStore'

const todoStore = useTodoStore()
const eventStore = useEventStore()
const assetStore = useAssetStore()

const dates = computed(() => [
  ...todoStore.items.map(item => item.dueDate),
  ...eventStore.items.map(item => item.eventDate),
  ...assetStore.items.map(item => item.expireDate)
])

const overdue = computed(() => dates.value.filter(date => {
  const days = daysUntil(date)
  return days !== null && days < 0
}).length)

const today = computed(() => dates.value.filter(date => daysUntil(date) === 0).length)

const week = computed(() => dates.value.filter(date => {
  const days = daysUntil(date)
  return days !== null && days > 0 && days <= 7
}).length)
</script>

<template>
  <section class="section">
    <div class="section-title">
      <div class="text-heading">⚠ 待处理提醒</div>
      <RouterLink class="text-caption" to="/reminder">查看全部</RouterLink>
    </div>
    <div class="alert-row">
      <div class="alert overdue">
        <div class="text-caption">已逾期</div>
        <div class="num">{{ overdue }}</div>
      </div>
      <div class="alert today">
        <div class="text-caption">今日到期</div>
        <div class="num">{{ today }}</div>
      </div>
      <div class="alert week">
        <div class="text-caption">7 天内</div>
        <div class="num">{{ week }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.alert-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
}

.alert {
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  background: var(--bg-surface);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.alert .num {
  font-size: var(--fs-26);
  font-weight: var(--fw-bold);
}

.alert.overdue {
  background: #f4e6e4;
  background: color-mix(in oklab, var(--status-danger) 25%, var(--bg-surface));
}

.alert.today {
  background: #f3e0de;
  background: color-mix(in oklab, var(--status-danger-strong) 22%, var(--bg-surface));
}

.alert.week {
  background: #f6ead9;
  background: color-mix(in oklab, var(--status-warn) 30%, var(--bg-surface));
}
</style>
