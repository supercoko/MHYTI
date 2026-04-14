<script setup lang="ts">
import type { Question } from '@/types/quiz'

defineProps<{
  question: Question
  index: number
  answer: number | null
}>()

const emit = defineEmits<{
  select: [value: number]
}>()

const scaleOptions = [
  { value: -3, label: '非常不同意' },
  { value: -2, label: '不同意' },
  { value: -1, label: '有点不同意' },
  { value: 0, label: '中立' },
  { value: 1, label: '有点同意' },
  { value: 2, label: '同意' },
  { value: 3, label: '非常同意' },
]
</script>

<template>
  <article class="question-card card-panel">
    <div class="question-top">
      <span class="tag-pill">{{ question.scene }}</span>
      <span class="question-index">Q{{ index }}</span>
    </div>
    <h2>{{ question.text }}</h2>

    <div class="scale-grid" role="radiogroup" aria-label="7级量表">
      <button
        v-for="item in scaleOptions"
        :key="item.value"
        class="scale-chip"
        :class="{ active: answer === item.value }"
        type="button"
        @click="emit('select', item.value)"
      >
        <strong>{{ item.value > 0 ? `+${item.value}` : item.value }}</strong>
        <span>{{ item.label }}</span>
      </button>
    </div>
  </article>
</template>

<style scoped>
.question-card {
  padding: 1.6rem;
}

.question-top {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
}

.question-index {
  color: var(--text-dim);
  font-size: 0.95rem;
}

.question-card h2 {
  margin: 1rem 0 0;
  font-size: clamp(1.35rem, 3vw, 2rem);
  line-height: 1.5;
}

.scale-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 0.7rem;
  margin-top: 1.5rem;
}

.scale-chip {
  min-height: 88px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text-main);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.75rem 0.45rem;
  transition: transform 0.18s ease, border-color 0.18s ease, background-color 0.18s ease;
}

.scale-chip strong {
  font-size: 1.05rem;
}

.scale-chip span {
  font-size: 0.78rem;
  color: var(--text-dim);
  line-height: 1.35;
}

.scale-chip:hover,
.scale-chip.active {
  transform: translateY(-2px);
  border-color: rgba(255, 215, 143, 0.5);
  background: rgba(255, 215, 143, 0.12);
}

.scale-chip.active span,
.scale-chip.active strong {
  color: #fff6dd;
}

@media (max-width: 900px) {
  .scale-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
