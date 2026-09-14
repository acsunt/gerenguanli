<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFleetingStore } from '../../record/stores/FleetingStore'
import { useIdeaStore } from '../../record/stores/IdeaStore'
import { useDiaryStore } from '../../record/stores/DiaryStore'
import { useDirectionStore } from '../../record/stores/DirectionStore'
import { useTodoStore } from '../../todo/stores/TodoStore'
import { useQuoteStore } from '../../todo/stores/QuoteStore'
import { useEventStore } from '../../todo/stores/EventStore'
import { useAssetStore } from '../../todo/stores/AssetStore'

const fleetingStore = useFleetingStore()
const ideaStore = useIdeaStore()
const diaryStore = useDiaryStore()
const directionStore = useDirectionStore()
const todoStore = useTodoStore()
const quoteStore = useQuoteStore()
const eventStore = useEventStore()
const assetStore = useAssetStore()

const quotes = [
  '今天也要好好生活呀，慢一点也没关系。',
  '今天完成一点点，也是在前进。',
  '持续记录，持续成长。',
  '专注当下的小目标。'
]

const quoteIndex = ref(new Date().getDate() % quotes.length)
const quote = computed(() => quotes[quoteIndex.value])

function refreshQuote() {
  quoteIndex.value = (quoteIndex.value + 1) % quotes.length
}

const modules = computed(() => [
  { to: '/fleeting', icon: '💬', name: '碎碎念', count: fleetingStore.items.length, bg: '#e4ece0' },
  { to: '/idea', icon: '💡', name: '灵感', count: ideaStore.items.length, bg: '#f4e6d0' },
  { to: '/diary', icon: '📖', name: '日记', count: diaryStore.items.length, bg: '#ebe6f1' },
  { to: '/direction', icon: '🧭', name: '方向', count: directionStore.items.length, bg: '#dbe8f0' },
  { to: '/task', icon: '✅', name: '待办', count: todoStore.items.length, bg: '#e4e7d4' },
  { to: '/quote', icon: '📎', name: '摘抄', count: quoteStore.items.length, bg: '#dfeae4' },
  { to: '/event', icon: '🎯', name: '事件', count: eventStore.items.length, bg: '#e6dff0' },
  { to: '/asset', icon: '📦', name: '资产', count: assetStore.items.length, bg: '#ece3d2' }
])
</script>

<template>
  <div>
    <section class="section">
      <div class="grid-4">
        <RouterLink
          v-for="item in modules"
          :key="item.to"
          class="tile"
          :to="item.to"
        >
          <div class="icon-box" :style="{ background: item.bg }">
            {{ item.icon }}
          </div>
          <div class="text-subhead">{{ item.name }}</div>
          <div class="text-hint">{{ item.count }}</div>
        </RouterLink>
      </div>
    </section>

    <section class="section">
      <div class="welcome">
        <div class="quote">“{{ quote }}”</div>
        <div class="author">— 留言板 · 昨日的自己</div>
        <button class="btn btn-sm btn-secondary refresh" type="button" @click="refreshQuote">🔄 换一条</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.welcome {
  background: linear-gradient(135deg, #d7e3d0, #e3dceb);
  background: linear-gradient(
    135deg,
    color-mix(in oklab, var(--color-brand) 55%, #fff),
    color-mix(in oklab, var(--color-brand-2) 55%, #fff)
  );
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  color: var(--text-1);
  position: relative;
  overflow: hidden;
}

.welcome .quote {
  font-size: var(--fs-22);
  font-weight: var(--fw-medium);
  line-height: var(--lh-relaxed);
}

.welcome .author {
  font-size: var(--fs-13);
  color: var(--text-2);
  margin-top: var(--space-3);
}

.welcome .refresh {
  position: absolute;
  right: var(--space-4);
  bottom: var(--space-4);
}

.welcome::before {
  content: "";
  position: absolute;
  right: -40px;
  top: -40px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
}
</style>
