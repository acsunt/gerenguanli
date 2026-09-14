<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSpaceStore } from '../../space/stores/SpaceStore'
import { useFleetingStore } from '../../record/stores/FleetingStore'
import { useIdeaStore } from '../../record/stores/IdeaStore'
import { useDiaryStore } from '../../record/stores/DiaryStore'
import { useDirectionStore } from '../../record/stores/DirectionStore'
import { useTodoStore } from '../../todo/stores/TodoStore'
import { useQuoteStore } from '../../todo/stores/QuoteStore'
import { useEventStore } from '../../todo/stores/EventStore'
import { useAssetStore } from '../../todo/stores/AssetStore'

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const router = useRouter()
const spaceStore = useSpaceStore()
const fleetingStore = useFleetingStore()
const ideaStore = useIdeaStore()
const diaryStore = useDiaryStore()
const directionStore = useDirectionStore()
const todoStore = useTodoStore()
const quoteStore = useQuoteStore()
const eventStore = useEventStore()
const assetStore = useAssetStore()

const currentSpace = computed(() =>
  spaceStore.spaces.find(item => item.id === spaceStore.currentSpaceId)
)

const entries = computed(() => [
  { to: '/fleeting', icon: '💬', name: '碎碎念', count: fleetingStore.items.length },
  { to: '/idea', icon: '💡', name: '灵感', count: ideaStore.items.length },
  { to: '/diary', icon: '📖', name: '日记', count: diaryStore.items.length },
  { to: '/direction', icon: '🧭', name: '方向', count: directionStore.items.length },
  { to: '/task', icon: '✅', name: '待办', count: todoStore.items.length },
  { to: '/quote', icon: '📎', name: '摘抄', count: quoteStore.items.length },
  { to: '/event', icon: '🎯', name: '事件', count: eventStore.items.length },
  { to: '/asset', icon: '📦', name: '资产', count: assetStore.items.length }
])

function go(path: string) {
  router.push(path)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="drawer-mask" @click="emit('close')" />
    <aside v-if="open" class="drawer-left">
      <div class="drawer-profile">
        <div class="avatar">我</div>
        <div>
          <div class="text-subhead">个人管理</div>
          <div class="text-hint">{{ currentSpace?.name ?? '未选择空间' }}</div>
        </div>
      </div>

      <div class="drawer-list">
        <button
          v-for="item in entries"
          :key="item.to"
          class="drawer-item"
          type="button"
          @click="go(item.to)"
        >
          <span class="drawer-icon">{{ item.icon }}</span>
          <span class="text-body">{{ item.name }}</span>
          <span class="badge">{{ item.count }}</span>
        </button>
      </div>

      <div class="drawer-footer">
        <button class="drawer-item" type="button" @click="go('/setting')">⚙ 设置</button>
        <button class="drawer-item" type="button" @click="go('/space')">🗂 空间管理</button>
      </div>
    </aside>
  </Teleport>
</template>

<style scoped>
.drawer-profile {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.drawer-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.drawer-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-3);
  border-radius: var(--radius-md);
  text-align: left;
}

.drawer-item:hover {
  background: var(--bg-muted);
}

.drawer-icon {
  width: 28px;
  text-align: center;
}

.drawer-item .badge {
  margin-left: auto;
}

.drawer-footer {
  margin-top: var(--space-8);
  padding-top: var(--space-4);
  border-top: var(--border-hair);
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
</style>
