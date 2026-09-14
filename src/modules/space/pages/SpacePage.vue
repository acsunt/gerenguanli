<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSpaceStore } from '../stores/SpaceStore'

const router = useRouter()
const store = useSpaceStore()
const name = ref('')

async function addSpace() {
  if (!name.value.trim()) return

  await store.create({
    id: crypto.randomUUID(),
    name: name.value.trim(),
    isDefault: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })

  name.value = ''
}

async function removeSpace(id: string) {
  await store.remove(id)
}
</script>

<template>
  <div>
    <header class="topbar" style="position:relative">
      <button class="btn btn-icon btn-ghost" type="button" @click="router.back()">‹</button>
      <div class="topbar-title">空间管理</div>
      <div class="topbar-actions"></div>
    </header>

    <div class="page">
    <section class="section">
      <div class="card">
        <div class="field">
          <label class="field-label">新建空间</label>
          <input v-model="name" class="input" placeholder="空间名称" />
        </div>
        <button class="btn btn-primary btn-block" type="button" @click="addSpace">创建</button>
      </div>
    </section>

    <section class="section">
      <div
        v-for="space in store.spaces"
        :key="space.id"
        class="card space-card"
      >
        <div>
          <div class="text-subhead">{{ space.name }}</div>
          <div class="text-hint">{{ space.isDefault ? '默认空间' : '自定义空间' }}</div>
        </div>
        <div class="row" style="margin:0">
          <button class="btn btn-sm btn-secondary" type="button" @click="store.switchSpace(space.id)">
            {{ space.id === store.currentSpaceId ? '当前' : '切换' }}
          </button>
          <button
            v-if="!space.isDefault"
            class="btn btn-sm btn-ghost"
            type="button"
            @click="removeSpace(space.id)"
          >
            删除
          </button>
        </div>
      </div>
    </section>
    </div>
  </div>
</template>

<style scoped>
.space-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}
</style>
