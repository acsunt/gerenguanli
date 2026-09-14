<script setup lang="ts">
import WelcomeCard from './components/WelcomeCard.vue'
import ReminderSummaryCard from './components/ReminderSummaryCard.vue'
import TodoSummaryCard from './components/TodoSummaryCard.vue'
import RecentDiaryCard from './components/RecentDiaryCard.vue'
import RecentIdeaCard from './components/RecentIdeaCard.vue'
import ModuleGrid from './components/ModuleGrid.vue'
</script>

<template>
  <div class="dashboard">
    <WelcomeCard />
    <ReminderSummaryCard />
    <TodoSummaryCard />
    <ModuleGrid />
    <RecentDiaryCard />
    <RecentIdeaCard />
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
</style>