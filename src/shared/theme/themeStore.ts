import { defineStore } from 'pinia'

const STORAGE_KEY = 'theme'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: (localStorage.getItem(STORAGE_KEY) as 'light' | 'dark' | null) ?? 'light'
  }),
  actions: {
    apply() {
      document.documentElement.setAttribute('data-theme', this.theme)
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem(STORAGE_KEY, this.theme)
      this.apply()
    },
    initialize() {
      this.apply()
    }
  }
})
