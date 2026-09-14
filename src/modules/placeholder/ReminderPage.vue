<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { daysUntil } from '../../shared/time'
import { useTodoStore } from '../todo/stores/TodoStore'
import { useEventStore } from '../todo/stores/EventStore'
import { useAssetStore } from '../todo/stores/AssetStore'

const router = useRouter()
const todoStore = useTodoStore()
const eventStore = useEventStore()
const assetStore = useAssetStore()

const items = computed(() => {
  const list = [
    ...todoStore.items.map(item => ({
      id: item.id,
      title: item.title,
      date: item.dueDate,
      kind: '待办'
    })),
    ...eventStore.items.map(item => ({
      id: item.id,
      title: item.title,
      date: item.eventDate,
      kind: '事件'
    })),
    ...assetStore.items.map(item => ({
      id: item.id,
      title: item.name,
      date: item.expireDate,
      kind: '资产'
    }))
  ]

  return list
    .map(item => ({ ...item, days: daysUntil(item.date) }))
    .filter(item => item.days !== null)
    .sort((a, b) => (a.days ?? 0) - (b.days ?? 0))
})

const overdue = computed(() => items.value.filter(item => (item.days ?? 0) < 0).length)
const today = computed(() => items.value.filter(item => item.days === 0).length)
const week = computed(() => items.value.filter(item => (item.days ?? 0) > 0 && (item.days ?? 0) <= 7).length)
const month = computed(() => items.value.filter(item => (item.days ?? 0) > 7 && (item.days ?? 0) <= 30).length)
</script>

<template>
  <div>
    <header class="topbar" style="position:relative">
      <button class="btn btn-icon btn-ghost" type="button" @click="router.back()">‹</button>
      <div class="topbar-title">临期提醒中心</div>
      <div class="topbar-actions">
        <button class="btn btn-icon btn-ghost" type="button">🔍</button>
      </div>
    </header>

    <div class="page">
    <section class="section">
      <div class="stats-grid">
        <div class="risk-tile overdue">
          <div class="label">已逾期</div>
          <div class="num">{{ overdue }}</div>
        </div>
        <div class="risk-tile today">
          <div class="label">今日到期</div>
          <div class="num">{{ today }}</div>
        </div>
        <div class="risk-tile week">
          <div class="label">7 天内</div>
          <div class="num">{{ week }}</div>
        </div>
        <div class="risk-tile month">
          <div class="label">30 天内</div>
          <div class="num">{{ month }}</div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-title">
        <div class="text-heading">按风险等级</div>
      </div>
      <div class="card">
        <div v-if="items.length === 0" class="empty">
          <div class="empty-title">暂无临期事项</div>
        </div>
        <ul v-else class="timeline" style="list-style:none;padding-left:24px;margin:0">
          <li v-for="item in items" :key="item.id" class="timeline-item">
            <span class="timeline-node" />
            <div class="timeline-time">{{ item.kind }} · {{ item.date }}</div>
            <div class="text-body">{{ item.title }}</div>
          </li>
        </ul>
      </div>
    </section>
    </div>
  </div>
</template>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.risk-tile {
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  background: var(--bg-surface);
}

.risk-tile .label {
  font-size: var(--fs-13);
  color: var(--text-2);
}

.risk-tile .num {
  font-size: var(--fs-32);
  font-weight: var(--fw-bold);
  line-height: 1;
}

.risk-tile.overdue {
  background: color-mix(in oklab, var(--status-danger) 25%, var(--bg-surface));
}

.risk-tile.today {
  background: color-mix(in oklab, var(--status-danger-strong) 22%, var(--bg-surface));
}

.risk-tile.week {
  background: color-mix(in oklab, var(--status-warn) 30%, var(--bg-surface));
}

.risk-tile.month {
  background: color-mix(in oklab, var(--status-info) 30%, var(--bg-surface));
}
</style>
