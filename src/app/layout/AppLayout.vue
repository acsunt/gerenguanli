<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppTopBar from '../../modules/navigation/components/AppTopBar.vue'
import AppTabBar from '../../modules/navigation/components/AppTabBar.vue'
import AppDrawer from '../../modules/navigation/components/AppDrawer.vue'
import AppHomeSwitch from '../../modules/navigation/components/AppHomeSwitch.vue'
import AppRecordTabs from '../../modules/navigation/components/AppRecordTabs.vue'
import AppTodoTabs from '../../modules/navigation/components/AppTodoTabs.vue'
import SpaceMenu from '../../modules/space/components/SpaceMenu.vue'
import { useAppRouteGroups } from './routeGroups'
import { useThemeStore } from '../../shared/theme/themeStore'

const route = useRoute()
const { isHomeFamily, isRecordFamily, isTodoFamily } = useAppRouteGroups()
const themeStore = useThemeStore()

const drawerOpen = ref(false)
const spaceMenuOpen = ref(false)

const hideChrome = computed(() =>
  ['/reminder', '/setting', '/space'].includes(route.path)
)

onMounted(() => {
  themeStore.initialize()
})
</script>

<template>
  <div class="app-shell">
    <AppTopBar
      v-if="!hideChrome"
      @open-menu="drawerOpen = true"
      @toggle-space="spaceMenuOpen = !spaceMenuOpen"
    />

    <SpaceMenu v-if="spaceMenuOpen && !hideChrome" @close="spaceMenuOpen = false" />
    <AppHomeSwitch v-if="isHomeFamily" />
    <AppRecordTabs v-if="isRecordFamily" />
    <AppTodoTabs v-if="isTodoFamily" />

    <main :class="hideChrome ? undefined : 'page'">
      <RouterView />
    </main>

    <AppTabBar v-if="!hideChrome" />

    <AppDrawer :open="drawerOpen" @close="drawerOpen = false" />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  min-height: 100svh;
  background: var(--bg-page);
  overflow-x: hidden;
}
</style>
