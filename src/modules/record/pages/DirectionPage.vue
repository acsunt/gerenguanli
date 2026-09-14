<script setup lang="ts">
import { ref } from 'vue'
import { useSpaceStore } from '../../space/stores/SpaceStore'
import { useDirectionStore } from '../stores/DirectionStore'

const store = useDirectionStore()
const spaceStore = useSpaceStore()
const title = ref('')
const category = ref('默认')

async function save() {
  if (!spaceStore.currentSpaceId || !title.value.trim()) return

  await store.create({
    id: crypto.randomUUID(),
    spaceId: spaceStore.currentSpaceId,
    title: title.value,
    category: category.value,
    createdAt: new Date().toISOString()
  })

  title.value = ''
  category.value = '默认'
}
</script>

<template>
  <div>
    <section class="section">
      <div class="card">
        <div class="field">
          <input v-model="title" class="input" placeholder="方向名称" />
        </div>
        <div class="field">
          <input v-model="category" class="input" placeholder="分类" />
        </div>
        <button class="btn btn-primary btn-block" type="button" @click="save">新增方向</button>
      </div>
    </section>

    <section class="section">
      <div v-if="store.items.length === 0" class="empty">
        <div class="empty-title">暂无方向</div>
      </div>
      <div v-for="item in store.items" :key="item.id" class="card" style="margin-bottom:12px">
        <div class="text-subhead">{{ item.title }}</div>
        <div class="text-hint">{{ item.category }}</div>
      </div>
    </section>
  </div>
</template>
