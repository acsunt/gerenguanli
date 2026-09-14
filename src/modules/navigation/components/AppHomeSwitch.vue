<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="home-switch">
    <RouterLink to="/dashboard" :data-active="route.path === '/dashboard' || undefined">首页</RouterLink>
    <RouterLink to="/checkin" :data-active="route.path === '/checkin' || undefined">打卡</RouterLink>
    <RouterLink to="/notes" :data-active="route.path === '/notes' || undefined">笔记</RouterLink>
  </div>
</template>
