import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import ProgressBar from '@/components/ProgressBar.vue';
import QuestionCard from '@/components/QuestionCard.vue';
import { useQuiz } from '@/composables/useQuiz';
const router = useRouter();
const { answers, questions, answeredCount, isComplete, firstUnansweredIndex, setAnswer, completeQuiz, resetQuiz } = useQuiz();
const currentIndex = ref(Math.max(0, firstUnansweredIndex.value === -1 ? questions.length - 1 : firstUnansweredIndex.value));
const showValidation = ref(false);
const currentQuestion = computed(() => questions[currentIndex.value]);
const currentAnswer = computed(() => answers.value[currentIndex.value]);
const isLastQuestion = computed(() => currentIndex.value === questions.length - 1);
function chooseAnswer(value) {
    setAnswer(currentIndex.value, value);
    showValidation.value = false;
}
function goPrevious() {
    currentIndex.value = Math.max(0, currentIndex.value - 1);
}
function goNext() {
    if (currentAnswer.value === null) {
        showValidation.value = true;
        return;
    }
    currentIndex.value = Math.min(questions.length - 1, currentIndex.value + 1);
}
function submitQuiz() {
    if (!isComplete.value) {
        showValidation.value = true;
        currentIndex.value = Math.max(0, firstUnansweredIndex.value);
        return;
    }
    completeQuiz();
    router.push('/result');
}
function restartQuiz() {
    resetQuiz();
    currentIndex.value = 0;
    showValidation.value = false;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['quiz-actions']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "page-shell" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "shell-container stack-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "section-heading" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "eyebrow" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "section-copy" },
});
/** @type {[typeof ProgressBar, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(ProgressBar, new ProgressBar({
    current: (__VLS_ctx.currentIndex + 1),
    total: (__VLS_ctx.questions.length),
    answered: (__VLS_ctx.answeredCount),
}));
const __VLS_1 = __VLS_0({
    current: (__VLS_ctx.currentIndex + 1),
    total: (__VLS_ctx.questions.length),
    answered: (__VLS_ctx.answeredCount),
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "quiz-stack" },
});
/** @type {[typeof QuestionCard, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(QuestionCard, new QuestionCard({
    ...{ 'onSelect': {} },
    index: (__VLS_ctx.currentIndex + 1),
    question: (__VLS_ctx.currentQuestion),
    answer: (__VLS_ctx.currentAnswer),
}));
const __VLS_4 = __VLS_3({
    ...{ 'onSelect': {} },
    index: (__VLS_ctx.currentIndex + 1),
    question: (__VLS_ctx.currentQuestion),
    answer: (__VLS_ctx.currentAnswer),
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
let __VLS_6;
let __VLS_7;
let __VLS_8;
const __VLS_9 = {
    onSelect: (__VLS_ctx.chooseAnswer)
};
var __VLS_5;
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "quiz-actions card-panel" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "eyebrow" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
(__VLS_ctx.isLastQuestion ? '准备生成结果' : '继续保持直觉作答');
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "section-copy compact" },
});
(__VLS_ctx.showValidation ? '还有题目未作答，先把当前题或第一道空题补完。' : '不要想太久，选更像你当下反应的一侧。');
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "button-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.goPrevious) },
    ...{ class: "ghost-btn" },
    type: "button",
    disabled: (__VLS_ctx.currentIndex === 0),
});
if (!__VLS_ctx.isLastQuestion) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.goNext) },
        ...{ class: "primary-btn" },
        type: "button",
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.submitQuiz) },
        ...{ class: "primary-btn" },
        type: "button",
    });
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.restartQuiz) },
    ...{ class: "text-btn" },
    type: "button",
});
/** @type {__VLS_StyleScopedClasses['page-shell']} */ ;
/** @type {__VLS_StyleScopedClasses['shell-container']} */ ;
/** @type {__VLS_StyleScopedClasses['stack-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['section-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['quiz-stack']} */ ;
/** @type {__VLS_StyleScopedClasses['quiz-actions']} */ ;
/** @type {__VLS_StyleScopedClasses['card-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['section-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['compact']} */ ;
/** @type {__VLS_StyleScopedClasses['button-row']} */ ;
/** @type {__VLS_StyleScopedClasses['ghost-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['primary-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['primary-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['text-btn']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ProgressBar: ProgressBar,
            QuestionCard: QuestionCard,
            questions: questions,
            answeredCount: answeredCount,
            currentIndex: currentIndex,
            showValidation: showValidation,
            currentQuestion: currentQuestion,
            currentAnswer: currentAnswer,
            isLastQuestion: isLastQuestion,
            chooseAnswer: chooseAnswer,
            goPrevious: goPrevious,
            goNext: goNext,
            submitQuiz: submitQuiz,
            restartQuiz: restartQuiz,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
