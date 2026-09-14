<script setup lang="ts">
import { computed } from 'vue'
import { useTodoStore } from '../todo/stores/TodoStore'

const todoStore = useTodoStore()
const checkedCount = computed(() => todoStore.items.filter(item => item.completed).length)
</script>

<template>
  <div>
    <section class="section">
      <div class="star-bar">
        <div>
          <div class="text-caption">⭐ 星光余额</div>
          <div class="star-num">{{ checkedCount * 2 }}</div>
        </div>
        <button class="btn btn-primary" type="button">+ 新建技能</button>
      </div>
    </section>

    <section class="section">
      <div class="section-title">
        <div class="text-heading">🎁 今日奖励</div>
        <span class="text-hint">已完成 {{ checkedCount }} 项</span>
      </div>
      <div class="reward-card">
        <div class="reward-icon">✨</div>
        <div style="flex:1">
          <div class="text-body">获得 {{ checkedCount * 5 }} XP · {{ checkedCount * 2 }} 星光</div>
          <div class="text-hint">继续保持，明天也不要中断</div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-title">
        <div class="text-heading">我的技能</div>
      </div>
      <div class="skill-grid">
        <div class="skill-card">
          <div class="skill-top">
            <div>
              <div class="skill-name">记录</div>
              <div class="skill-level">Lv 1</div>
            </div>
            <div class="stars">★☆☆☆☆</div>
          </div>
          <div class="progress"><span style="width:24%"></span></div>
          <div class="progress-text"><span>24%</span><span>+2 XP 升级</span></div>
          <button class="btn btn-primary btn-sm" type="button">打卡 +2 XP</button>
        </div>
        <div class="skill-card">
          <div class="skill-top">
            <div>
              <div class="skill-name">待办</div>
              <div class="skill-level">Lv 2</div>
            </div>
            <div class="stars">★★☆☆☆</div>
          </div>
          <div class="progress"><span style="width:40%"></span></div>
          <div class="progress-text"><span>40%</span><span>+3 XP 升级</span></div>
          <button class="btn btn-ghost btn-sm" type="button">✓ 已打卡</button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.star-bar {
  background: linear-gradient(
    135deg,
    color-mix(in oklab, var(--m-checkin) 55%, #fff),
    color-mix(in oklab, var(--color-brand-2) 40%, #fff)
  );
  border-radius: var(--radius-2xl);
  padding: var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.star-bar::after {
  content: "";
  position: absolute;
  right: -30px;
  bottom: -30px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.28);
}

.star-num {
  font-size: 40px;
  font-weight: var(--fw-bold);
  line-height: 1;
}

.reward-card {
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  box-shadow: var(--shadow-sm);
}

.reward-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: color-mix(in oklab, var(--m-checkin) 45%, #fff);
  display: grid;
  place-items: center;
  font-size: 22px;
}

.skill-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}

.skill-card {
  background: var(--bg-surface);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.skill-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.skill-name {
  font-size: var(--fs-18);
  font-weight: var(--fw-medium);
}

.skill-level {
  font-size: var(--fs-12);
  color: var(--text-3);
}

.stars {
  letter-spacing: 2px;
  color: var(--m-checkin);
}

.progress {
  position: relative;
  height: 8px;
  background: var(--bg-muted);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress > span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--m-checkin), var(--color-brand-3));
  border-radius: inherit;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  font-size: var(--fs-12);
  color: var(--text-3);
}
</style>
