<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="sub-tabs">
    <RouterLink to="/task" :data-active="route.path === '/task' || undefined">待办</RouterLink>
    <RouterLink to="/quote" :data-active="route.path === '/quote' || undefined">摘抄</RouterLink>
    <RouterLink to="/event" :data-active="route.path === '/event' || undefined">事件</RouterLink>
    <RouterLink to="/asset" :data-active="route.path === '/asset' || undefined">资产</RouterLink>
  </div>
</template>
