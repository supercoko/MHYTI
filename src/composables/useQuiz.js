import { computed, ref, watch } from 'vue';
import { archetypes, characters, questions } from '@/data';
import { clearAllQuizStorage, clearSavedQuizResult, getSavedAnswers, saveAnswers, saveQuizResult, } from '@/utils/storage';
import { calculateQuizResult } from '@/utils/quizEngine';
function createDefaultAnswers() {
    return Array.from({ length: questions.length }, () => null);
}
function normalizeAnswers(input) {
    const normalized = createDefaultAnswers();
    for (let index = 0; index < questions.length; index += 1) {
        const value = input[index];
        normalized[index] = typeof value === 'number' && value >= -3 && value <= 3 ? value : null;
    }
    return normalized;
}
export function useQuiz() {
    const answers = ref(normalizeAnswers(getSavedAnswers()));
    watch(answers, (value) => {
        saveAnswers(value);
        clearSavedQuizResult();
    }, { deep: true });
    const answeredCount = computed(() => answers.value.filter((item) => item !== null).length);
    const isComplete = computed(() => answeredCount.value === questions.length);
    const firstUnansweredIndex = computed(() => answers.value.findIndex((item) => item === null));
    function setAnswer(index, value) {
        answers.value[index] = value;
    }
    function resetQuiz() {
        answers.value = createDefaultAnswers();
        clearAllQuizStorage();
    }
    function completeQuiz() {
        const result = calculateQuizResult({
            answers: answers.value,
            questions,
            archetypes,
            characters,
        });
        saveQuizResult(result);
        return result;
    }
    return {
        answers,
        questions,
        answeredCount,
        isComplete,
        firstUnansweredIndex,
        setAnswer,
        completeQuiz,
        resetQuiz,
    };
}
