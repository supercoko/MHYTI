<script setup lang="ts">
import { gameThemes } from '@/data'

const metrics = [
  { label: '情境题目', value: '32' },
  { label: '人格原型', value: '8' },
  { label: '首发角色', value: '32' },
]

const flow = [
  '回答 32 道米游玩家场景题',
  '计算 MBTI 四维倾向',
  '映射 8 个叙事原型',
  '命中最像你的米哈游角色',
]
</script>

<template>
  <div class="page-shell home-page">
    <section class="hero-home">
      <div class="shell-container hero-layout">
        <div class="hero-copy">
          <p class="eyebrow">MITI · miHoYo Type Indicator</p>
          <h1>把 MBTI 的答题爽感，改造成米哈游角色人格测试。</h1>
          <p class="hero-text">
            这不是“你是哪种玩家”的粗糙二分，而是先做四维人格，再结合原型气质和角色向量，
            算出更像你的那一位米哈游角色。
          </p>
          <div class="button-row">
            <RouterLink class="primary-btn" to="/quiz">立即开始</RouterLink>
            <RouterLink class="ghost-btn" to="/characters">先逛图鉴</RouterLink>
          </div>
          <p class="hero-note">
            纯前端、本地计算、无账号、无上传。结果仅供娱乐，不构成任何心理学结论。
          </p>
        </div>

        <div class="hero-visual card-panel">
          <div class="hero-metrics">
            <article v-for="item in metrics" :key="item.label" class="metric-card">
              <strong>{{ item.value }}</strong>
              <span>{{ item.label }}</span>
            </article>
          </div>
          <div class="hero-game-grid">
            <article
              v-for="theme in gameThemes"
              :key="theme.id"
              class="game-card"
              :style="{ '--card-accent': theme.accent }"
            >
              <p>{{ theme.name }}</p>
              <span>{{ theme.subtitle }}</span>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="content-section">
      <div class="shell-container stack-section">
        <div class="section-heading">
          <p class="eyebrow">How It Works</p>
          <h2>不是简单对号入座，而是混合匹配。</h2>
        </div>
        <div class="flow-grid">
          <article v-for="(item, index) in flow" :key="item" class="flow-card card-panel">
            <span class="flow-index">0{{ index + 1 }}</span>
            <p>{{ item }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="content-section">
      <div class="shell-container split-section">
        <div class="section-heading">
          <p class="eyebrow">Game Mix</p>
          <h2>四个游戏放进同一套人格框架里。</h2>
          <p class="section-copy">
            首页首发覆盖《原神》《崩坏：星穹铁道》《崩坏3》《绝区零》。风格不同，角色气质不同，
            但会在同一组题和同一套引擎里做统一匹配。
          </p>
        </div>
        <div class="world-grid">
          <article
            v-for="theme in gameThemes"
            :key="theme.id"
            class="world-card card-panel"
            :style="{ '--world-accent': theme.accent }"
          >
            <h3>{{ theme.name }}</h3>
            <p>{{ theme.subtitle }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="content-section">
      <div class="shell-container disclaimer-panel card-panel">
        <div>
          <p class="eyebrow">Disclaimer</p>
          <h2>结果是同人娱乐，不是官方设定，也不是专业人格诊断。</h2>
        </div>
        <p>
          角色对应基于公开剧情印象、玩家共识与娱乐化重构。站内使用的是原创风格化角色卡图，不代表官方素材授权。
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-home {
  padding: 3rem 0 2rem;
}

.hero-layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1.5rem;
  align-items: stretch;
}

.hero-copy h1 {
  margin: 0.5rem 0 0;
  font-size: clamp(2.4rem, 6vw, 4.8rem);
  line-height: 1.05;
}

.hero-text {
  max-width: 680px;
  margin: 1.4rem 0 0;
  font-size: 1.1rem;
  line-height: 1.85;
  color: var(--text-soft);
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.9rem;
  margin-top: 1.8rem;
}

.hero-note {
  margin: 1.1rem 0 0;
  color: var(--text-dim);
  line-height: 1.7;
}

.hero-visual {
  padding: 1.2rem;
  background:
    radial-gradient(circle at top right, rgba(255, 212, 122, 0.16), transparent 45%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
}

.hero-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
}

.metric-card {
  padding: 1rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
}

.metric-card strong {
  display: block;
  font-size: 2rem;
  color: var(--accent-gold);
}

.metric-card span {
  display: block;
  margin-top: 0.45rem;
  color: var(--text-dim);
}

.hero-game-grid,
.world-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
  margin-top: 1rem;
}

.game-card,
.world-card {
  padding: 1.05rem;
  border-radius: 22px;
  background:
    linear-gradient(145deg, color-mix(in srgb, var(--card-accent) 30%, #101726), #101726);
}

.game-card p,
.world-card h3 {
  margin: 0;
  font-size: 1.05rem;
}

.game-card span,
.world-card p {
  display: block;
  margin-top: 0.6rem;
  color: rgba(235, 241, 255, 0.82);
  line-height: 1.7;
}

.section-heading h2 {
  margin: 0.4rem 0 0;
  font-size: clamp(1.9rem, 5vw, 3rem);
}

.section-copy {
  max-width: 720px;
  margin: 1rem 0 0;
  color: var(--text-soft);
  line-height: 1.8;
}

.flow-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.flow-card {
  padding: 1.2rem;
}

.flow-index {
  display: inline-flex;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: rgba(255, 215, 143, 0.12);
  color: var(--accent-gold);
  font-size: 0.8rem;
  font-weight: 800;
}

.flow-card p {
  margin: 1rem 0 0;
  line-height: 1.7;
}

.disclaimer-panel {
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: 1rem;
  align-items: center;
  padding: 1.5rem;
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
  .hero-layout,
  .disclaimer-panel {
    grid-template-columns: 1fr;
  }

  .flow-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .hero-metrics,
  .hero-game-grid,
  .world-grid,
  .flow-grid {
    grid-template-columns: 1fr;
  }
}
</style>
