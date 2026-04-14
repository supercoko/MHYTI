const __VLS_props = defineProps();
const emit = defineEmits();
const scaleOptions = [
    { value: -3, label: '非常不同意' },
    { value: -2, label: '不同意' },
    { value: -1, label: '有点不同意' },
    { value: 0, label: '中立' },
    { value: 1, label: '有点同意' },
    { value: 2, label: '同意' },
    { value: 3, label: '非常同意' },
];
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['question-card']} */ ;
/** @type {__VLS_StyleScopedClasses['scale-chip']} */ ;
/** @type {__VLS_StyleScopedClasses['scale-chip']} */ ;
/** @type {__VLS_StyleScopedClasses['scale-chip']} */ ;
/** @type {__VLS_StyleScopedClasses['scale-chip']} */ ;
/** @type {__VLS_StyleScopedClasses['scale-chip']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['scale-chip']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['scale-grid']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)({
    ...{ class: "question-card card-panel" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "question-top" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "tag-pill" },
});
(__VLS_ctx.question.scene);
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "question-index" },
});
(__VLS_ctx.index);
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
(__VLS_ctx.question.text);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "scale-grid" },
    role: "radiogroup",
    'aria-label': "7级量表",
});
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.scaleOptions))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.emit('select', item.value);
            } },
        key: (item.value),
        ...{ class: "scale-chip" },
        ...{ class: ({ active: __VLS_ctx.answer === item.value }) },
        type: "button",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (item.value > 0 ? `+${item.value}` : item.value);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (item.label);
}
/** @type {__VLS_StyleScopedClasses['question-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['question-top']} */ ;
/** @type {__VLS_StyleScopedClasses['tag-pill']} */ ;
/** @type {__VLS_StyleScopedClasses['question-index']} */ ;
/** @type {__VLS_StyleScopedClasses['scale-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['scale-chip']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            emit: emit,
            scaleOptions: scaleOptions,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
