<script setup lang="ts">
const pillars = [
  '32 道情境题，覆盖抽卡、养成、剧情投入、社群互动、地图探索和高压挑战。',
  '先算 MBTI 四维，再算 8 个原型分布，最后用角色向量和签名偏好做命中。',
  '测试只在浏览器本地计算，不会上传、存储或分享你的答题数据。',
]
</script>

<template>
  <div class="page-shell">
    <section class="shell-container stack-section">
      <div class="section-heading">
        <p class="eyebrow">About</p>
        <h1>MITI 的目标，是把人格测试做成一张米游角色结果卡。</h1>
        <p class="section-copy">
          结构参考 ACGTI / 16Personalities 的内容型前端站思路，但内容、题目、角色和视觉都重写成米哈游语境。
        </p>
      </div>

      <div class="flow-grid">
        <article v-for="item in pillars" :key="item" class="flow-card card-panel">
          <p>{{ item }}</p>
        </article>
      </div>

      <section class="result-grid">
        <article class="card-panel side-panel">
          <p class="eyebrow">Scoring</p>
          <h2>评分逻辑</h2>
          <p class="panel-copy">维度权重 0.25 + 原型权重 0.35 + 角色向量权重 0.30 + 角色签名权重 0.10。</p>
          <p class="panel-copy">
            这意味着结果不会只因为 MBTI 一样就完全固定，角色气质和题目细节也会参与拉开差异。
          </p>
        </article>

        <article class="card-panel side-panel">
          <p class="eyebrow">Policy</p>
          <h2>素材与声明</h2>
          <p class="panel-copy">
            角色对应关系为娱乐向同人重构，不代表官方人格设定。站内角色图为原创风格卡面，不是官方立绘。
          </p>
          <p class="panel-copy">
            如果后续需要更换资源，只会替换视觉层，不会影响题库与评分引擎。
          </p>
        </article>
      </section>
    </section>
  </div>
</template>

<style scoped>
.flow-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.flow-card {
  padding: 1.2rem;
}

.flow-card p {
  margin: 0;
  line-height: 1.8;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.side-panel {
  padding: 1.25rem;
}

.side-panel h2 {
  margin: 0.45rem 0 0;
  font-size: 1.8rem;
}

.panel-copy {
  margin: 1rem 0 0;
  color: var(--text-soft);
  line-height: 1.8;
}

@media (max-width: 900px) {
  .flow-grid,
  .result-grid {
    grid-template-columns: 1fr;
  }
}
</style>
