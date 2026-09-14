import { onMounted } from 'vue'
import { useSpaceStore } from '../stores/SpaceStore'

export function useSpacePageLoad(load: (spaceId: string) => Promise<void>) {
  const spaceStore = useSpaceStore()

  onMounted(async () => {
    if (spaceStore.currentSpaceId) {
      await load(spaceStore.currentSpaceId)
    }
  })
}
