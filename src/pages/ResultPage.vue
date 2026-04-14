<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import CharacterCard from '@/components/CharacterCard.vue'
import TraitBar from '@/components/TraitBar.vue'
import type { DimensionPair } from '@/types/quiz'
import { createCharacterArtwork } from '@/utils/characterArt'
import { clearAllQuizStorage, getSavedQuizResult } from '@/utils/storage'
import { TRAIT_CONFIG } from '@/utils/quizEngine'

const router = useRouter()
const result = computed(() => getSavedQuizResult())
const featuredCharacter = computed(() => result.value?.featuredCharacter ?? null)
const otherMatches = computed(() => result.value?.characterMatches.slice(1) ?? [])

const traits = computed(() =>
  (['E_I', 'S_N', 'T_F', 'J_P'] as DimensionPair[]).map((pair) => ({
    pair,
    config: TRAIT_CONFIG[pair],
    score: result.value?.scores[pair],
  })),
)

const featuredFallbackImage = computed(() => {
  if (!featuredCharacter.value) {
    return ''
  }

  return createCharacterArtwork({
    name: featuredCharacter.value.name,
    title: featuredCharacter.value.title,
    game: featuredCharacter.value.game,
    accent: featuredCharacter.value.accent,
  })
})

function handleFeaturedImageError(event: Event) {
  const image = event.currentTarget

  if (!(image instanceof HTMLImageElement) || image.src === featuredFallbackImage.value) {
    return
  }

  image.src = featuredFallbackImage.value
}

function restartQuiz() {
  clearAllQuizStorage()
  router.push('/quiz')
}
</script>

<template>
  <div v-if="result && featuredCharacter" class="page-shell">
    <section class="shell-container stack-section">
      <div class="section-heading">
        <p class="eyebrow">Result</p>
        <h1>你的 MITI 结果是 {{ featuredCharacter.name }}。</h1>
        <p class="section-copy">
          先得到 {{ result.mbtiCode }} 四维倾向，再用原型与角色向量做混合命中。
        </p>
      </div>

      <section class="result-hero card-panel">
        <div class="result-main-art">
          <img
            :src="featuredCharacter.image"
            :alt="featuredCharacter.name"
            loading="eager"
            decoding="async"
            referrerpolicy="no-referrer"
            @error="handleFeaturedImageError"
          />
        </div>

        <div class="result-copy">
          <div class="result-badges">
            <span class="tag-pill">{{ result.code }}</span>
            <span class="tag-pill alt">{{ result.mbtiCode }}</span>
            <span class="tag-pill alt">匹配度 {{ result.matchScore }}%</span>
          </div>
          <h2>{{ featuredCharacter.name }} · {{ featuredCharacter.title }}</h2>
          <p class="result-archetype">
            {{ result.archetype.name }} · {{ result.archetype.subtitle }}
          </p>
          <p class="result-note">{{ featuredCharacter.note }}</p>

          <div class="tag-row">
            <span v-for="tag in result.tags" :key="tag" class="mini-tag">{{ tag }}</span>
          </div>

          <div class="button-row">
            <button class="primary-btn" type="button" @click="restartQuiz">再测一次</button>
            <RouterLink class="ghost-btn" to="/characters">看看其他角色</RouterLink>
          </div>
        </div>
      </section>

      <section class="result-grid">
        <div class="trait-grid">
          <TraitBar
            v-for="item in traits"
            :key="item.pair"
            :config="item.config"
            :score="item.score!"
          />
        </div>

        <aside class="card-panel side-panel">
          <p class="eyebrow">Archetype</p>
          <h3>{{ result.archetype.oneLiner }}</h3>
          <p class="panel-copy">{{ result.archetype.description }}</p>
          <p class="panel-copy"><strong>高光：</strong>{{ result.archetype.spotlight }}</p>
          <p class="panel-copy"><strong>盲点：</strong>{{ result.archetype.weakness }}</p>
        </aside>
      </section>

      <section class="stack-section">
        <div class="section-heading">
          <p class="eyebrow">Nearby Matches</p>
          <h2>和你气质相近的另外两位角色。</h2>
        </div>
        <div class="character-grid">
          <CharacterCard :character="featuredCharacter" :rank="1" />
          <CharacterCard
            v-for="(character, index) in otherMatches"
            :key="character.id"
            :character="character"
            :rank="index + 2"
          />
        </div>
      </section>

      <section class="disclaimer-panel card-panel">
        <div>
          <p class="eyebrow">Notice</p>
          <h2>测试结果为娱乐化角色匹配。</h2>
        </div>
        <p>
          角色文案与对应关系基于公开剧情印象和玩家语境做了同人化重构。站内角色图使用公开可访问立绘与社区镜像，
          仅作非商业展示，版权归对应权利方所有。
        </p>
      </section>
    </section>
  </div>
</template>

<style scoped>
.result-hero {
  display: grid;
  grid-template-columns: minmax(280px, 0.85fr) 1.15fr;
  gap: 1.25rem;
  padding: 1.25rem;
}

.result-main-art {
  border-radius: 28px;
  overflow: hidden;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
}

.result-main-art img {
  width: 100%;
  display: block;
  aspect-ratio: 4 / 5;
  object-fit: cover;
}

.result-copy h2 {
  margin: 1rem 0 0;
  font-size: clamp(2rem, 5vw, 3.1rem);
}

.result-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.alt {
  background: rgba(255, 255, 255, 0.05);
}

.result-archetype {
  margin: 0.75rem 0 0;
  color: var(--accent-gold);
  font-size: 1.05rem;
  font-weight: 700;
}

.result-note {
  margin: 1.15rem 0 0;
  color: var(--text-soft);
  line-height: 1.9;
  font-size: 1.02rem;
}

.result-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 1rem;
}

.trait-grid {
  display: grid;
  gap: 0.9rem;
}

.side-panel {
  padding: 1.2rem;
}

.side-panel h3 {
  margin: 0.45rem 0 0;
  font-size: 1.45rem;
  line-height: 1.5;
}

.panel-copy {
  margin: 1rem 0 0;
  color: var(--text-soft);
  line-height: 1.8;
}

.disclaimer-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: center;
  padding: 1.25rem;
}

.disclaimer-panel h2,
.disclaimer-panel p {
  margin: 0;
}

.disclaimer-panel p:last-child {
  color: var(--text-soft);
  line-height: 1.8;
}

@media (max-width: 980px) {
  .result-hero,
  .result-grid,
  .disclaimer-panel {
    grid-template-columns: 1fr;
  }
}
</style>
