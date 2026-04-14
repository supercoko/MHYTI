<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import ProgressBar from '@/components/ProgressBar.vue'
import QuestionCard from '@/components/QuestionCard.vue'
import { useQuiz } from '@/composables/useQuiz'

const router = useRouter()
const { answers, questions, answeredCount, isComplete, firstUnansweredIndex, setAnswer, completeQuiz, resetQuiz } =
  useQuiz()

const currentIndex = ref(
  Math.max(0, firstUnansweredIndex.value === -1 ? questions.length - 1 : firstUnansweredIndex.value),
)
const showValidation = ref(false)

const currentQuestion = computed(() => questions[currentIndex.value])
const currentAnswer = computed(() => answers.value[currentIndex.value])
const isLastQuestion = computed(() => currentIndex.value === questions.length - 1)

function chooseAnswer(value: number) {
  setAnswer(currentIndex.value, value)
  showValidation.value = false
}

function goPrevious() {
  currentIndex.value = Math.max(0, currentIndex.value - 1)
}

function goNext() {
  if (currentAnswer.value === null) {
    showValidation.value = true
    return
  }

  currentIndex.value = Math.min(questions.length - 1, currentIndex.value + 1)
}

function submitQuiz() {
  if (!isComplete.value) {
    showValidation.value = true
    currentIndex.value = Math.max(0, firstUnansweredIndex.value)
    return
  }

  completeQuiz()
  router.push('/result')
}

function restartQuiz() {
  resetQuiz()
  currentIndex.value = 0
  showValidation.value = false
}
</script>

<template>
  <div class="page-shell">
    <section class="shell-container stack-section">
      <div class="section-heading">
        <p class="eyebrow">Quiz</p>
        <h1>在米游玩家的真实场景里，测出你更像谁。</h1>
        <p class="section-copy">
          采用 7 级量表作答。你的答案只会保存在当前浏览器里，刷新后仍可继续。
        </p>
      </div>

      <ProgressBar :current="currentIndex + 1" :total="questions.length" :answered="answeredCount" />

      <div class="quiz-stack">
        <QuestionCard
          :index="currentIndex + 1"
          :question="currentQuestion"
          :answer="currentAnswer"
          @select="chooseAnswer"
        />

        <section class="quiz-actions card-panel">
          <div>
            <p class="eyebrow">操作</p>
            <h2>{{ isLastQuestion ? '准备生成结果' : '继续保持直觉作答' }}</h2>
            <p class="section-copy compact">
              {{ showValidation ? '还有题目未作答，先把当前题或第一道空题补完。' : '不要想太久，选更像你当下反应的一侧。' }}
            </p>
          </div>

          <div class="button-row">
            <button class="ghost-btn" type="button" :disabled="currentIndex === 0" @click="goPrevious">
              上一题
            </button>
            <button
              v-if="!isLastQuestion"
              class="primary-btn"
              type="button"
              @click="goNext"
            >
              下一题
            </button>
            <button
              v-else
              class="primary-btn"
              type="button"
              @click="submitQuiz"
            >
              生成结果
            </button>
            <button class="text-btn" type="button" @click="restartQuiz">清空重来</button>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<style scoped>
.quiz-stack {
  display: grid;
  gap: 1rem;
}

.quiz-actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  padding: 1.25rem;
}

.compact {
  margin-bottom: 0;
}

@media (max-width: 820px) {
  .quiz-actions {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
