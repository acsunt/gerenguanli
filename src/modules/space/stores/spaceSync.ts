import { watch } from 'vue'
import { pinia } from '../../../stores'
import { useSpaceStore } from './SpaceStore'
import { useFleetingStore } from '../../record/stores/FleetingStore'
import { useIdeaStore } from '../../record/stores/IdeaStore'
import { useDiaryStore } from '../../record/stores/DiaryStore'
import { useDirectionStore } from '../../record/stores/DirectionStore'
import { useTodoStore } from '../../todo/stores/TodoStore'
import { useAssetStore } from '../../todo/stores/AssetStore'
import { useEventStore } from '../../todo/stores/EventStore'
import { useQuoteStore } from '../../todo/stores/QuoteStore'
import { useDailyCollectionStore } from '../../todo/stores/DailyCollectionStore'

export function setupSpaceSync() {
  const spaceStore = useSpaceStore(pinia)

  const reloadAll = async (spaceId: string) => {
    await Promise.all([
      useFleetingStore(pinia).load(spaceId),
      useIdeaStore(pinia).load(spaceId),
      useDiaryStore(pinia).load(spaceId),
      useDirectionStore(pinia).load(spaceId),
      useTodoStore(pinia).load(spaceId),
      useAssetStore(pinia).load(spaceId),
      useEventStore(pinia).load(spaceId),
      useQuoteStore(pinia).load(spaceId),
      useDailyCollectionStore(pinia).load(spaceId)
    ])
  }

  watch(
    () => spaceStore.currentSpaceId,
    async (spaceId) => {
      if (!spaceId) return
      await reloadAll(spaceId)
    },
    { immediate: true }
  )
}
