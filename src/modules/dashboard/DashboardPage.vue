<script setup lang="ts">
import ReminderSummaryCard from './components/ReminderSummaryCard.vue'
import TodoSummaryCard from './components/TodoSummaryCard.vue'
import RecentDiaryCard from './components/RecentDiaryCard.vue'
import RecentIdeaCard from './components/RecentIdeaCard.vue'
import ModuleGrid from './components/ModuleGrid.vue'
</script>

<template>
  <div>
    <ModuleGrid />
    <ReminderSummaryCard />
    <TodoSummaryCard />
    <RecentDiaryCard />
    <RecentIdeaCard />
  </div>
</template>
