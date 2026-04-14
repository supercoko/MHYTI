import { computed } from 'vue';
import { useRouter } from 'vue-router';
import CharacterCard from '@/components/CharacterCard.vue';
import TraitBar from '@/components/TraitBar.vue';
import { createCharacterArtwork } from '@/utils/characterArt';
import { clearAllQuizStorage, getSavedQuizResult } from '@/utils/storage';
import { TRAIT_CONFIG } from '@/utils/quizEngine';
const router = useRouter();
const result = computed(() => getSavedQuizResult());
const featuredCharacter = computed(() => result.value?.featuredCharacter ?? null);
const otherMatches = computed(() => result.value?.characterMatches.slice(1) ?? []);
const traits = computed(() => ['E_I', 'S_N', 'T_F', 'J_P'].map((pair) => ({
    pair,
    config: TRAIT_CONFIG[pair],
    score: result.value?.scores[pair],
})));
const featuredFallbackImage = computed(() => {
    if (!featuredCharacter.value) {
        return '';
    }
    return createCharacterArtwork({
        name: featuredCharacter.value.name,
        title: featuredCharacter.value.title,
        game: featuredCharacter.value.game,
        accent: featuredCharacter.value.accent,
    });
});
function handleFeaturedImageError(event) {
    const image = event.currentTarget;
    if (!(image instanceof HTMLImageElement) || image.src === featuredFallbackImage.value) {
        return;
    }
    image.src = featuredFallbackImage.value;
}
function restartQuiz() {
    clearAllQuizStorage();
    router.push('/quiz');
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['result-main-art']} */ ;
/** @type {__VLS_StyleScopedClasses['side-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['disclaimer-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['disclaimer-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['disclaimer-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['result-hero']} */ ;
/** @type {__VLS_StyleScopedClasses['result-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['disclaimer-panel']} */ ;
// CSS variable injection 
// CSS variable injection end 
if (__VLS_ctx.result && __VLS_ctx.featuredCharacter) {
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
    (__VLS_ctx.featuredCharacter.name);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "section-copy" },
    });
    (__VLS_ctx.result.mbtiCode);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
        ...{ class: "result-hero card-panel" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "result-main-art" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        ...{ onError: (__VLS_ctx.handleFeaturedImageError) },
        src: (__VLS_ctx.featuredCharacter.image),
        alt: (__VLS_ctx.featuredCharacter.name),
        loading: "eager",
        decoding: "async",
        referrerpolicy: "no-referrer",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "result-copy" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "result-badges" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "tag-pill" },
    });
    (__VLS_ctx.result.code);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "tag-pill alt" },
    });
    (__VLS_ctx.result.mbtiCode);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "tag-pill alt" },
    });
    (__VLS_ctx.result.matchScore);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    (__VLS_ctx.featuredCharacter.name);
    (__VLS_ctx.featuredCharacter.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "result-archetype" },
    });
    (__VLS_ctx.result.archetype.name);
    (__VLS_ctx.result.archetype.subtitle);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "result-note" },
    });
    (__VLS_ctx.featuredCharacter.note);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "tag-row" },
    });
    for (const [tag] of __VLS_getVForSourceType((__VLS_ctx.result.tags))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            key: (tag),
            ...{ class: "mini-tag" },
        });
        (tag);
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "button-row" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.restartQuiz) },
        ...{ class: "primary-btn" },
        type: "button",
    });
    const __VLS_0 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.RouterLink, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ class: "ghost-btn" },
        to: "/characters",
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: "ghost-btn" },
        to: "/characters",
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    var __VLS_3;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
        ...{ class: "result-grid" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "trait-grid" },
    });
    for (const [item] of __VLS_getVForSourceType((__VLS_ctx.traits))) {
        /** @type {[typeof TraitBar, ]} */ ;
        // @ts-ignore
        const __VLS_4 = __VLS_asFunctionalComponent(TraitBar, new TraitBar({
            key: (item.pair),
            config: (item.config),
            score: (item.score),
        }));
        const __VLS_5 = __VLS_4({
            key: (item.pair),
            config: (item.config),
            score: (item.score),
        }, ...__VLS_functionalComponentArgsRest(__VLS_4));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.aside, __VLS_intrinsicElements.aside)({
        ...{ class: "card-panel side-panel" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "eyebrow" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (__VLS_ctx.result.archetype.oneLiner);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "panel-copy" },
    });
    (__VLS_ctx.result.archetype.description);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "panel-copy" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (__VLS_ctx.result.archetype.spotlight);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "panel-copy" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.strong, __VLS_intrinsicElements.strong)({});
    (__VLS_ctx.result.archetype.weakness);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
        ...{ class: "stack-section" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "section-heading" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "eyebrow" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "character-grid" },
    });
    /** @type {[typeof CharacterCard, ]} */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(CharacterCard, new CharacterCard({
        character: (__VLS_ctx.featuredCharacter),
        rank: (1),
    }));
    const __VLS_8 = __VLS_7({
        character: (__VLS_ctx.featuredCharacter),
        rank: (1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    for (const [character, index] of __VLS_getVForSourceType((__VLS_ctx.otherMatches))) {
        /** @type {[typeof CharacterCard, ]} */ ;
        // @ts-ignore
        const __VLS_10 = __VLS_asFunctionalComponent(CharacterCard, new CharacterCard({
            key: (character.id),
            character: (character),
            rank: (index + 2),
        }));
        const __VLS_11 = __VLS_10({
            key: (character.id),
            character: (character),
            rank: (index + 2),
        }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)({
        ...{ class: "disclaimer-panel card-panel" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: "eyebrow" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
/** @type {__VLS_StyleScopedClasses['page-shell']} */ ;
/** @type {__VLS_StyleScopedClasses['shell-container']} */ ;
/** @type {__VLS_StyleScopedClasses['stack-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['section-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['result-hero']} */ ;
/** @type {__VLS_StyleScopedClasses['card-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['result-main-art']} */ ;
/** @type {__VLS_StyleScopedClasses['result-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['result-badges']} */ ;
/** @type {__VLS_StyleScopedClasses['tag-pill']} */ ;
/** @type {__VLS_StyleScopedClasses['tag-pill']} */ ;
/** @type {__VLS_StyleScopedClasses['alt']} */ ;
/** @type {__VLS_StyleScopedClasses['tag-pill']} */ ;
/** @type {__VLS_StyleScopedClasses['alt']} */ ;
/** @type {__VLS_StyleScopedClasses['result-archetype']} */ ;
/** @type {__VLS_StyleScopedClasses['result-note']} */ ;
/** @type {__VLS_StyleScopedClasses['tag-row']} */ ;
/** @type {__VLS_StyleScopedClasses['mini-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['button-row']} */ ;
/** @type {__VLS_StyleScopedClasses['primary-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['ghost-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['result-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['trait-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['card-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['side-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-copy']} */ ;
/** @type {__VLS_StyleScopedClasses['stack-section']} */ ;
/** @type {__VLS_StyleScopedClasses['section-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['character-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['disclaimer-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['card-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            CharacterCard: CharacterCard,
            TraitBar: TraitBar,
            result: result,
            featuredCharacter: featuredCharacter,
            otherMatches: otherMatches,
            traits: traits,
            handleFeaturedImageError: handleFeaturedImageError,
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
