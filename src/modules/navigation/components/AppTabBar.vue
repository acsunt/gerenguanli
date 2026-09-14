<script setup lang="ts">
import { useAppRouteGroups } from '../../../app/layout/routeGroups'

const { isHomeFamily, isRecordFamily, isTodoFamily, isReviewFamily } = useAppRouteGroups()
</script>

<template>
  <nav class="tabbar">
    <RouterLink class="tabbar-item" to="/dashboard" :data-active="isHomeFamily || undefined">
      🏠<span>首页</span>
    </RouterLink>
    <RouterLink class="tabbar-item" to="/fleeting" :data-active="isRecordFamily || undefined">
      📖<span>记录</span>
    </RouterLink>
    <RouterLink class="tabbar-item" to="/task" :data-active="isTodoFamily || undefined">
      ✅<span>待办</span>
    </RouterLink>
    <RouterLink class="tabbar-item" to="/review" :data-active="isReviewFamily || undefined">
      📅<span>日历</span>
    </RouterLink>
  </nav>
</template>
