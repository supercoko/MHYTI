<script setup lang="ts">
import type { DimensionScore, TraitConfig } from '@/types/quiz'

defineProps<{
  config: TraitConfig
  score: DimensionScore
}>()
</script>

<template>
  <article class="trait-bar card-panel">
    <div class="trait-head">
      <div>
        <p>{{ config.label }}</p>
        <h3>{{ score.dominant }} · {{ score.percentage }}%</h3>
      </div>
      <span class="trait-dominant">{{ score.score >= 0 ? config.leftCN : config.rightCN }}</span>
    </div>
    <div class="trait-track">
      <span :style="{ width: `${score.percentage}%`, background: config.color }"></span>
    </div>
    <div class="trait-ends">
      <span>{{ config.leftCN }}</span>
      <span>{{ config.rightCN }}</span>
    </div>
  </article>
</template>

<style scoped>
.trait-bar {
  padding: 1rem 1.1rem;
}

.trait-head {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
}

.trait-head p,
.trait-head h3 {
  margin: 0;
}

.trait-head p {
  color: var(--text-dim);
  font-size: 0.85rem;
}

.trait-head h3 {
  margin-top: 0.2rem;
  font-size: 1.05rem;
}

.trait-dominant {
  color: var(--accent-gold);
  font-weight: 700;
}

.trait-track {
  margin-top: 0.95rem;
  height: 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.07);
  overflow: hidden;
}

.trait-track span {
  display: block;
  height: 100%;
  border-radius: inherit;
}

.trait-ends {
  margin-top: 0.65rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: var(--text-dim);
  font-size: 0.84rem;
}
</style>
