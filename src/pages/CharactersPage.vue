<script setup lang="ts">
import { computed, ref } from 'vue'

import CharacterCard from '@/components/CharacterCard.vue'
import { characters, gameThemes } from '@/data'
import type { GameId } from '@/types/quiz'

const selectedGame = ref<'all' | GameId>('all')
const selectedType = ref<'all' | string>('all')

const mbtiOptions = [...new Set(characters.map((item) => item.matchCode))].sort()

const filteredCharacters = computed(() =>
  characters.filter((character) => {
    const gameMatched = selectedGame.value === 'all' || character.game === selectedGame.value
    const typeMatched = selectedType.value === 'all' || character.matchCode === selectedType.value
    return gameMatched && typeMatched
  }),
)
</script>

<template>
  <div class="page-shell">
    <section class="shell-container stack-section">
      <div class="section-heading">
        <p class="eyebrow">Atlas</p>
        <h1>32 位首发角色，按游戏和 MBTI 快速筛选。</h1>
        <p class="section-copy">
          角色池首发覆盖四个游戏，每位角色都带有主类型、原型归属和“为什么像你”的说明。
        </p>
      </div>

      <section class="card-panel filter-panel">
        <div>
          <p class="eyebrow">游戏</p>
          <div class="filter-row">
            <button
              class="filter-chip"
              :class="{ active: selectedGame === 'all' }"
              type="button"
              @click="selectedGame = 'all'"
            >
              全部
            </button>
            <button
              v-for="theme in gameThemes"
              :key="theme.id"
              class="filter-chip"
              :class="{ active: selectedGame === theme.id }"
              type="button"
              @click="selectedGame = theme.id"
            >
              {{ theme.name }}
            </button>
          </div>
        </div>

        <div>
          <p class="eyebrow">MBTI</p>
          <div class="filter-row">
            <button
              class="filter-chip"
              :class="{ active: selectedType === 'all' }"
              type="button"
              @click="selectedType = 'all'"
            >
              全部
            </button>
            <button
              v-for="type in mbtiOptions"
              :key="type"
              class="filter-chip"
              :class="{ active: selectedType === type }"
              type="button"
              @click="selectedType = type"
            >
              {{ type }}
            </button>
          </div>
        </div>

        <p class="result-count">当前显示 {{ filteredCharacters.length }} 位角色。</p>
      </section>

      <div class="character-grid">
        <CharacterCard
          v-for="character in filteredCharacters"
          :key="character.id"
          :character="character"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.filter-panel {
  padding: 1.2rem;
}

.filter-panel > div + div {
  margin-top: 1rem;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 0.55rem;
}

.filter-chip {
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-main);
}

.filter-chip.active {
  background: rgba(255, 215, 143, 0.16);
  border-color: rgba(255, 215, 143, 0.52);
  color: #fff2cb;
}

.result-count {
  margin: 1rem 0 0;
  color: var(--text-dim);
}
</style>
