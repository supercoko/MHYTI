const __VLS_props = defineProps();
const gameLabels = {
    genshin: '原神',
    starrail: '星穹铁道',
    hi3: '崩坏3',
    zzz: '绝区零',
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['character-media']} */ ;
/** @type {__VLS_StyleScopedClasses['rank-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['game-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['character-title-row']} */ ;
/** @type {__VLS_StyleScopedClasses['character-title-row']} */ ;
/** @type {__VLS_StyleScopedClasses['character-title-row']} */ ;
/** @type {__VLS_StyleScopedClasses['character-title-row']} */ ;
/** @type {__VLS_StyleScopedClasses['character-title-row']} */ ;
/** @type {__VLS_StyleScopedClasses['character-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['compact']} */ ;
/** @type {__VLS_StyleScopedClasses['character-title-row']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.article, __VLS_intrinsicElements.article)({
    ...{ class: "character-card card-panel" },
    ...{ class: ({ compact: __VLS_ctx.compact }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "character-media" },
    ...{ style: ({ background: `linear-gradient(140deg, ${__VLS_ctx.character.accent}, #101726)` }) },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.character.image),
    alt: (__VLS_ctx.character.name),
    loading: "lazy",
});
if (__VLS_ctx.rank) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "rank-badge" },
    });
    (__VLS_ctx.rank);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
    ...{ class: "game-badge" },
});
(__VLS_ctx.gameLabels[__VLS_ctx.character.game]);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "character-copy" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "character-title-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
(__VLS_ctx.character.name);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.character.title);
__VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
(__VLS_ctx.character.matchCode);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "tag-row" },
});
for (const [tag] of __VLS_getVForSourceType((__VLS_ctx.character.tags.slice(0, 3)))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        key: (tag),
        ...{ class: "mini-tag" },
    });
    (tag);
}
if (!__VLS_ctx.compact) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "character-note" },
    });
    (__VLS_ctx.character.note);
}
/** @type {__VLS_StyleScopedClasses['character-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['character-media']} */ ;
/** @type {__VLS_StyleScopedClasses['rank-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['game-badge']} */ ;
/** @type {__VLS_StyleScopedClasses['character-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['character-title-row']} */ ;
/** @type {__VLS_StyleScopedClasses['tag-row']} */ ;
/** @type {__VLS_StyleScopedClasses['mini-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['character-note']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            gameLabels: gameLabels,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
