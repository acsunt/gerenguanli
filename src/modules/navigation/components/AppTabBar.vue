<template>
  <PMTabBar>
    <RouterLink to="/dashboard">首页</RouterLink>
    <RouterLink to="/diary">记录</RouterLink>
    <RouterLink to="/task">待办</RouterLink>
    <RouterLink to="/review">回顾</RouterLink>
  </PMTabBar>
</template>

<script setup lang="ts">
import PMTabBar from '../../../components/PMTabBar.vue'
</script>