<script setup lang="ts">
import { computed } from 'vue'
import { useFleetingStore } from '../record/stores/FleetingStore'
import { useDiaryStore } from '../record/stores/DiaryStore'
import { useIdeaStore } from '../record/stores/IdeaStore'
import { useTodoStore } from '../todo/stores/TodoStore'

const fleetingStore = useFleetingStore()
const diaryStore = useDiaryStore()
const ideaStore = useIdeaStore()
const todoStore = useTodoStore()

const completedTodos = computed(() => todoStore.items.filter(item => item.completed).length)
const cells = Array.from({ length: 7 * 26 }, (_, index) => index % 5)
</script>

<template>
  <div>
    <div class="toolbar">
      <div class="segmented">
        <button class="segmented-item" type="button">日</button>
        <button class="segmented-item" type="button">周</button>
        <button class="segmented-item" type="button" data-active="true">月</button>
        <button class="segmented-item" type="button">年</button>
      </div>
      <div class="date-nav">
        <button class="btn btn-icon btn-ghost" type="button">‹</button>
        <span>2026 · 09</span>
        <button class="btn btn-icon btn-ghost" type="button">›</button>
      </div>
    </div>

    <section class="section">
      <div class="stats-grid">
        <div class="stat-tile">
          <div class="icon" style="background:color-mix(in oklab,var(--m-fleeting) 40%,#fff)">💬</div>
          <div class="num">{{ fleetingStore.items.length }}</div>
          <div class="label">碎碎念</div>
        </div>
        <div class="stat-tile">
          <div class="icon" style="background:color-mix(in oklab,var(--m-diary) 40%,#fff)">📖</div>
          <div class="num">{{ diaryStore.items.length }}</div>
          <div class="label">日记</div>
        </div>
        <div class="stat-tile">
          <div class="icon" style="background:color-mix(in oklab,var(--m-idea) 40%,#fff)">💡</div>
          <div class="num">{{ ideaStore.items.length }}</div>
          <div class="label">灵感</div>
        </div>
        <div class="stat-tile">
          <div class="icon" style="background:color-mix(in oklab,var(--m-checkin) 40%,#fff)">🌱</div>
          <div class="num">{{ completedTodos }}</div>
          <div class="label">完成项</div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-title">
        <div class="text-heading">活跃度</div>
        <span class="text-hint">全年</span>
      </div>
      <div class="card">
        <div class="heat-wrap">
          <div class="heatmap">
            <span
              v-for="(level, index) in cells"
              :key="index"
              class="heatmap-cell"
              :data-level="level || undefined"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-title">
        <div class="text-heading">分类明细</div>
      </div>
      <div class="card">
        <div class="cat-row">
          <div class="cat-left">
            <div class="cat-icon" style="background:color-mix(in oklab,var(--m-fleeting) 40%,#fff)">💬</div>
            <div>
              <div class="text-body-lg">碎碎念</div>
              <div class="text-hint">共 {{ fleetingStore.items.length }} 条</div>
            </div>
          </div>
          <span class="badge badge-brand">{{ fleetingStore.items.length }}</span>
        </div>
        <div class="cat-row">
          <div class="cat-left">
            <div class="cat-icon" style="background:color-mix(in oklab,var(--m-diary) 40%,#fff)">📖</div>
            <div>
              <div class="text-body-lg">日记</div>
              <div class="text-hint">共 {{ diaryStore.items.length }} 篇</div>
            </div>
          </div>
          <span class="badge">{{ diaryStore.items.length }}</span>
        </div>
        <div class="cat-row">
          <div class="cat-left">
            <div class="cat-icon" style="background:color-mix(in oklab,var(--m-idea) 40%,#fff)">💡</div>
            <div>
              <div class="text-body-lg">灵感</div>
              <div class="text-hint">共 {{ ideaStore.items.length }} 个</div>
            </div>
          </div>
          <span class="badge">{{ ideaStore.items.length }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) 0;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.date-nav {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--fs-18);
  font-weight: var(--fw-medium);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
}

.stat-tile {
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.stat-tile .icon {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  display: grid;
  place-items: center;
  margin-bottom: var(--space-2);
}

.stat-tile .num {
  font-size: var(--fs-26);
  font-weight: var(--fw-bold);
}

.stat-tile .label {
  font-size: var(--fs-12);
  color: var(--text-2);
}

.heat-wrap {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.cat-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3) 0;
  border-bottom: var(--border-hair);
}

.cat-row:last-child {
  border-bottom: none;
}

.cat-left {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.cat-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  display: grid;
  place-items: center;
}
</style>
