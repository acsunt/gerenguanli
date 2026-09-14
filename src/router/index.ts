import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: () => import('../modules/dashboard/DashboardPage.vue') },
  { path: '/checkin', component: () => import('../modules/dashboard/CheckinPage.vue') },
  { path: '/notes', component: () => import('../modules/placeholder/NotePage.vue') },
  { path: '/fleeting', component: () => import('../modules/record/pages/FleetingPage.vue') },
  { path: '/diary', component: () => import('../modules/record/pages/DiaryPage.vue') },
  { path: '/idea', component: () => import('../modules/record/pages/IdeaPage.vue') },
  { path: '/direction', component: () => import('../modules/record/pages/DirectionPage.vue') },
  { path: '/space', component: () => import('../modules/space/pages/SpacePage.vue') },
  { path: '/task', component: () => import('../modules/todo/pages/TodoPage.vue') },
  { path: '/quote', component: () => import('../modules/todo/pages/QuotePage.vue') },
  { path: '/event', component: () => import('../modules/todo/pages/EventPage.vue') },
  { path: '/asset', component: () => import('../modules/todo/pages/AssetPage.vue') },
  { path: '/note', redirect: '/notes' },
  { path: '/review', component: () => import('../modules/placeholder/ReviewPage.vue') },
  { path: '/reminder', component: () => import('../modules/placeholder/ReminderPage.vue') },
  { path: '/setting', component: () => import('../modules/placeholder/SettingPage.vue') }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
