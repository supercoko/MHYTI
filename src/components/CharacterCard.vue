<script setup lang="ts">
import type { CharacterMatch } from '@/types/quiz'

defineProps<{
  character: CharacterMatch
  compact?: boolean
  rank?: number
}>()

const gameLabels = {
  genshin: '原神',
  starrail: '星穹铁道',
  hi3: '崩坏3',
  zzz: '绝区零',
} as const
</script>

<template>
  <article class="character-card card-panel" :class="{ compact }">
    <div class="character-media" :style="{ background: `linear-gradient(140deg, ${character.accent}, #101726)` }">
      <img :src="character.image" :alt="character.name" loading="lazy" />
      <span v-if="rank" class="rank-badge">TOP {{ rank }}</span>
      <span class="game-badge">{{ gameLabels[character.game] }}</span>
    </div>

    <div class="character-copy">
      <div class="character-title-row">
        <div>
          <h3>{{ character.name }}</h3>
          <p>{{ character.title }}</p>
        </div>
        <strong>{{ character.matchCode }}</strong>
      </div>

      <div class="tag-row">
        <span v-for="tag in character.tags.slice(0, 3)" :key="tag" class="mini-tag">{{ tag }}</span>
      </div>

      <p v-if="!compact" class="character-note">{{ character.note }}</p>
    </div>
  </article>
</template>

<style scoped>
.character-card {
  overflow: hidden;
}

.character-media {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
}

.character-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.rank-badge,
.game-badge {
  position: absolute;
  border-radius: 999px;
  padding: 0.38rem 0.75rem;
  font-size: 0.78rem;
  font-weight: 800;
}

.rank-badge {
  top: 0.85rem;
  left: 0.85rem;
  background: rgba(9, 16, 29, 0.82);
}

.game-badge {
  right: 0.85rem;
  bottom: 0.85rem;
  background: rgba(255, 245, 218, 0.88);
  color: #251506;
}

.character-copy {
  padding: 1rem 1rem 1.1rem;
}

.character-title-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.character-title-row h3,
.character-title-row p {
  margin: 0;
}

.character-title-row h3 {
  font-size: 1.25rem;
}

.character-title-row p {
  margin-top: 0.35rem;
  color: var(--text-dim);
}

.character-title-row strong {
  color: var(--accent-gold);
  font-size: 1rem;
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.9rem;
}

.mini-tag {
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-dim);
  font-size: 0.8rem;
}

.character-note {
  margin: 1rem 0 0;
  color: var(--text-soft);
  line-height: 1.75;
}

.compact .character-copy {
  padding: 0.9rem;
}

.compact .character-title-row h3 {
  font-size: 1.08rem;
}
</style>
