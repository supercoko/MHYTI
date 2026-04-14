import { computed, ref } from 'vue';
import CharacterCard from '@/components/CharacterCard.vue';
import { characters, gameThemes } from '@/data';
const selectedGame = ref('all');
const selectedType = ref('all');
const mbtiOptions = [...new Set(characters.map((item) => item.matchCode))].sort();
const filteredCharacters = computed(() => characters.filter((character) => {
    const gameMatched = selectedGame.value === 'all' || character.game === selectedGame.value;
    const typeMatched = selectedType.value === 'all' || character.matchCode === selectedType.value;
    return gameMatched && typeMatched;
}));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['filter-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-chip']} */ ;
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
    ...{ class: "card-panel filter-panel" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "eyebrow" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filter-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.selectedGame = 'all';
        } },
    ...{ class: "filter-chip" },
    ...{ class: ({ active: __VLS_ctx.selectedGame === 'all' }) },
    type: "button",
});
for (const [theme] of __VLS_getVForSourceType((__VLS_ctx.gameThemes))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.selectedGame = theme.id;
            } },
        key: (theme.id),
        ...{ class: "filter-chip" },
        ...{ class: ({ active: __VLS_ctx.selectedGame === theme.id }) },
        type: "button",
    });
    (theme.name);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "eyebrow" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "filter-row" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.selectedType = 'all';
        } },
    ...{ class: "filter-chip" },
    ...{ class: ({ active: __VLS_ctx.selectedType === 'all' }) },
    type: "button",
});
for (const [type] of __VLS_getVForSourceType((__VLS_ctx.mbtiOptions))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.selectedType = type;
            } },
        key: (type),
        ...{ class: "filter-chip" },
        ...{ class: ({ active: __VLS_ctx.selectedType === type }) },
        type: "button",
    });
    (type);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
    ...{ class: "result-count" },
});
(__VLS_ctx.filteredCharacters.length);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "character-grid" },
});
for (const [character] of __VLS_getVForSourceType((__VLS_ctx.filteredCharacters))) {
    /** @type {[typeof CharacterCard, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(CharacterCard, new CharacterCard({
        key: (character.id),
        character: (character),
    }));
    const __VLS_1 = __VLS_0({
        key: (character.id),
        character: (character),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
/** @type {__VLS_StyleScopedClasses['page-shell']} */ ;
/** @type {__VLS_StyleScopedClasses['shell-container']} */ ;
/** @type {__VLS_StyleScopedClasses['stack-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['section-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['card-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-row']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-chip']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-chip']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-row']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-chip']} */ ;
/** @type {__VLS_StyleScopedClasses['filter-chip']} */ ;
/** @type {__VLS_StyleScopedClasses['result-count']} */ ;
/** @type {__VLS_StyleScopedClasses['character-grid']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            CharacterCard: CharacterCard,
            gameThemes: gameThemes,
            selectedGame: selectedGame,
            selectedType: selectedType,
            mbtiOptions: mbtiOptions,
            filteredCharacters: filteredCharacters,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
