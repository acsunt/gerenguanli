<template>
  <div>
    <section class="section">
      <div class="search-bar">
        <input class="search-input" placeholder="搜索笔记…" />
        <button class="btn btn-primary btn-sm" type="button">+ 新建笔记</button>
      </div>
    </section>

    <section class="section">
      <div class="card">
        <div class="empty">
          <div style="font-size:48px">🌱</div>
          <div class="empty-title">这里空空的，先写下第一篇笔记吧</div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  gap: var(--space-2);
  align-items: center;
}

.search-input {
  flex: 1;
  height: 44px;
  padding: 0 var(--space-4);
  background: var(--bg-surface);
  border: var(--border-thin);
  border-radius: var(--radius-full);
}
</style>
