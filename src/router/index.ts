import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: () => import('../modules/dashboard/DashboardPage.vue') },
  { path: '/space', component: () => import('../modules/space/pages/SpacePage.vue') },
  { path: '/diary', component: () => import('../modules/record/pages/DiaryPage.vue') },
  { path: '/idea', component: () => import('../modules/record/pages/IdeaPage.vue') },
  { path: '/task', component: () => import('../modules/todo/pages/TodoPage.vue') },
  { path: '/note', component: () => import('../modules/placeholder/NotePage.vue') },
  { path: '/review', component: () => import('../modules/placeholder/ReviewPage.vue') },
  { path: '/reminder', component: () => import('../modules/placeholder/ReminderPage.vue') },
  { path: '/setting', component: () => import('../modules/placeholder/SettingPage.vue') }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
