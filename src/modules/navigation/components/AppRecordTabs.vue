<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="sub-tabs">
    <RouterLink to="/fleeting" :data-active="route.path === '/fleeting' || undefined">碎碎念</RouterLink>
    <RouterLink to="/diary" :data-active="route.path === '/diary' || undefined">日记</RouterLink>
    <RouterLink to="/idea" :data-active="route.path === '/idea' || undefined">灵感</RouterLink>
    <RouterLink to="/direction" :data-active="route.path === '/direction' || undefined">方向</RouterLink>
  </div>
</template>
