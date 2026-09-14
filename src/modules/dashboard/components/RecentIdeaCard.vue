<script setup lang="ts">
import { computed } from 'vue'
import { useIdeaStore } from '../../record/stores/IdeaStore'

const ideaStore = useIdeaStore()
const latest = computed(() => ideaStore.items[0])
</script>

<template>
  <section class="section">
    <div class="section-title">
      <div class="text-heading">💡 最近灵感</div>
      <RouterLink class="text-caption" to="/idea">更多</RouterLink>
    </div>
    <div class="card">
      <div v-if="!latest" class="empty">
        <div class="empty-title">暂无灵感</div>
      </div>
      <template v-else>
        <div class="text-body-lg">{{ latest.content }}</div>
        <div class="row" style="margin-top:12px">
          <span class="chip">#灵感</span>
        </div>
      </template>
    </div>
  </section>
</template>
