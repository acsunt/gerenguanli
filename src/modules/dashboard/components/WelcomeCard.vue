<template>
  <PMCard>
    <h2>欢迎回来</h2>
    <p>{{ message }}</p>
  </PMCard>
</template>

<script setup lang="ts">
import PMCard from '../../../components/PMCard.vue'

const messages = [
  '今天完成一点点，也是在前进。',
  '持续记录，持续成长。',
  '专注当下的小目标。'
]

const message = messages[new Date().getDate() % messages.length]
</script>