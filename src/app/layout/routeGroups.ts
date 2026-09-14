import { computed } from 'vue'
import { useRoute } from 'vue-router'

const HOME_PATHS = ['/dashboard', '/checkin', '/notes']
const RECORD_PATHS = ['/fleeting', '/diary', '/idea', '/direction']
const TODO_PATHS = ['/task', '/quote', '/event', '/asset']

export function useAppRouteGroups() {
  const route = useRoute()

  const isHomeFamily = computed(() => HOME_PATHS.includes(route.path))
  const isRecordFamily = computed(() => RECORD_PATHS.includes(route.path))
  const isTodoFamily = computed(() => TODO_PATHS.includes(route.path))
  const isReviewFamily = computed(() => route.path === '/review')

  return {
    isHomeFamily,
    isRecordFamily,
    isTodoFamily,
    isReviewFamily
  }
}
