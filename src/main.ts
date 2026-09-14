import { createApp } from 'vue'
import { Capacitor } from '@capacitor/core'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader'
import './styles/theme.css'
import App from './App.vue'
import { pinia } from './stores'
import { router } from './router'
import { databaseManager } from './database/sqlite/DatabaseManager'
import { useSpaceStore } from './modules/space/stores/SpaceStore'
import { setupSpaceSync } from './modules/space/stores/spaceSync'
import { useThemeStore } from './shared/theme/themeStore'

async function bootstrap() {
  if (Capacitor.getPlatform() === 'web') {
    jeepSqlite(window)
  }

  await databaseManager.initialize()

  const app = createApp(App)

  app.use(pinia)
  app.use(router)
  app.use(VueQueryPlugin)

  const themeStore = useThemeStore()
  themeStore.initialize()

  const spaceStore = useSpaceStore()
  await spaceStore.load()

  if (spaceStore.spaces.length === 0) {
    await spaceStore.create({
      id: crypto.randomUUID(),
      name: '默认空间',
      isDefault: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })
  }

  setupSpaceSync()

  app.mount('#app')
}

bootstrap()
