<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  current: number
  total: number
  answered: number
}>()

const percent = computed(() => Math.round((props.answered / props.total) * 100))
</script>

<template>
  <section class="progress-wrap card-panel">
    <div class="progress-copy">
      <div>
        <p class="eyebrow">测试进度</p>
        <h2>第 {{ current }} / {{ total }} 题</h2>
      </div>
      <strong>{{ percent }}%</strong>
    </div>
    <div class="progress-track">
      <span :style="{ width: `${percent}%` }"></span>
    </div>
    <p class="progress-meta">已完成 {{ answered }} 题，还剩 {{ total - answered }} 题。</p>
  </section>
</template>

<style scoped>
.progress-wrap {
  padding: 1.35rem;
}

.progress-copy {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-end;
}

.progress-copy h2 {
  margin: 0.25rem 0 0;
  font-size: clamp(1.2rem, 3vw, 1.6rem);
}

.progress-copy strong {
  font-size: 1.1rem;
  color: var(--accent-gold);
}

.progress-track {
  margin-top: 1rem;
  height: 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.progress-track span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--accent-gold), var(--accent-cyan));
}

.progress-meta {
  margin: 0.85rem 0 0;
  color: var(--text-dim);
}
</style>
