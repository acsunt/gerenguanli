<script setup lang="ts">
import { ref } from 'vue'
import { useSpaceStore } from '../../space/stores/SpaceStore'
import { useAssetStore } from '../stores/AssetStore'

const store = useAssetStore()
const spaceStore = useSpaceStore()
const name = ref('')
const expireDate = ref('')

async function save() {
  if (!spaceStore.currentSpaceId || !name.value.trim()) return

  await store.create({
    id: crypto.randomUUID(),
    spaceId: spaceStore.currentSpaceId,
    name: name.value,
    expireDate: expireDate.value || undefined,
    createdAt: new Date().toISOString()
  })

  name.value = ''
  expireDate.value = ''
}
</script>

<template>
  <div>
    <section class="section">
      <div class="card">
        <div class="field">
          <input v-model="name" class="input" placeholder="资产名称" />
        </div>
        <div class="field">
          <input v-model="expireDate" class="input" type="date" />
        </div>
        <button class="btn btn-primary btn-block" type="button" @click="save">新增资产</button>
      </div>
    </section>

    <section class="section">
      <div v-if="store.items.length === 0" class="empty">
        <div class="empty-title">暂无资产</div>
      </div>
      <div v-for="item in store.items" :key="item.id" class="card" style="margin-bottom:12px">
        <div class="text-subhead">{{ item.name }}</div>
        <div class="text-hint">{{ item.expireDate || '无到期日' }}</div>
      </div>
    </section>
  </div>
</template>
