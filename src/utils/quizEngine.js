const DIMENSION_LETTERS = {
    E_I: ['E', 'I'],
    S_N: ['S', 'N'],
    T_F: ['T', 'F'],
    J_P: ['J', 'P'],
};
const TYPE_TO_ARCHETYPE = {
    INTJ: 'shadow-strategist',
    INTP: 'icebound-observer',
    ENTJ: 'oathbound-captain',
    ENTP: 'trickster-orbit',
    INFJ: 'moonlit-guardian',
    INFP: 'gentle-healer',
    ENFJ: 'luminous-lead',
    ENFP: 'trickster-orbit',
    ISTJ: 'oathbound-captain',
    ISFJ: 'moonlit-guardian',
    ESTJ: 'oathbound-captain',
    ESFJ: 'luminous-lead',
    ISTP: 'icebound-observer',
    ISFP: 'gentle-healer',
    ESTP: 'chaos-spark',
    ESFP: 'chaos-spark',
};
const ROLE_TO_ARCHETYPE = {
    hero: 'luminous-lead',
    strategist: 'shadow-strategist',
    guardian: 'moonlit-guardian',
    lonewolf: 'icebound-observer',
    healer: 'gentle-healer',
    berserker: 'chaos-spark',
    trickster: 'trickster-orbit',
    ruler: 'oathbound-captain',
};
const QUESTION_WEIGHT_FALLBACKS = {
    E_I: { hero: 2, trickster: 2, healer: 1, lonewolf: -2, strategist: -1 },
    S_N: { strategist: 2, trickster: 2, healer: 1, ruler: -1, guardian: -1 },
    T_F: { strategist: 2, ruler: 1, healer: -2, guardian: -1, berserker: 1 },
    J_P: { ruler: 2, guardian: 1, strategist: 1, trickster: -2, berserker: -1 },
};
const VECTOR_AXES = [
    'expression',
    'temperature',
    'judgement',
    'order',
    'agency',
    'aura',
];
const ARCHETYPE_IDS = Object.values(ROLE_TO_ARCHETYPE);
const MBTI_WEIGHT = 0.25;
const ARCHETYPE_WEIGHT = 0.35;
const VECTOR_WEIGHT = 0.3;
const CHARACTER_SPECIFIC_WEIGHT = 0.1;
const CLOSE_MATCH_THRESHOLD = 0.03;
export const TRAIT_CONFIG = {
    E_I: {
        label: '能量',
        leftLabel: 'Extraverted',
        rightLabel: 'Introverted',
        leftCN: '外放',
        rightCN: '收束',
        color: '#f0a34f',
    },
    S_N: {
        label: '感知',
        leftLabel: 'Observant',
        rightLabel: 'Intuitive',
        leftCN: '实感',
        rightCN: '直觉',
        color: '#69b6ff',
    },
    T_F: {
        label: '决策',
        leftLabel: 'Thinking',
        rightLabel: 'Feeling',
        leftCN: '理性',
        rightCN: '共情',
        color: '#ef728f',
    },
    J_P: {
        label: '节奏',
        leftLabel: 'Judging',
        rightLabel: 'Prospecting',
        leftCN: '统筹',
        rightCN: '即兴',
        color: '#86d39b',
    },
};
const MBTI_PATTERN = /^[EI][SN][TF][JP]$/;
export function calculateQuizResult(input) {
    const answerProfile = buildAnswerProfile(input);
    const rankings = rankCharactersByProfile({
        scores: answerProfile.scores,
        characters: input.characters,
        archetypeRaw: answerProfile.archetypeRaw,
        userVector: answerProfile.userVector,
        answers: input.answers,
    });
    const leadingMatches = collectLeadingMatches(rankings);
    const featuredCharacter = leadingMatches[0]?.character ?? null;
    const characterMatches = leadingMatches.slice(0, 3).map((entry) => entry.character);
    return {
        code: featuredCharacter?.code ?? 'MITI',
        mbtiCode: answerProfile.mbtiCode,
        scores: answerProfile.scores,
        archetype: answerProfile.matchedArchetype,
        tags: [
            answerProfile.matchedArchetype.narrativeRole,
            ...answerProfile.matchedArchetype.tags,
            ...(featuredCharacter?.tags ?? []),
        ].slice(0, 6),
        matchScore: calculateCharacterMatchScore(leadingMatches[0]),
        characterMatches,
        featuredCharacter,
    };
}
function buildAnswerProfile(input) {
    const rawScores = {
        E_I: 0,
        S_N: 0,
        T_F: 0,
        J_P: 0,
    };
    const directionalMaxScores = {
        E_I: { positive: 0, negative: 0 },
        S_N: { positive: 0, negative: 0 },
        T_F: { positive: 0, negative: 0 },
        J_P: { positive: 0, negative: 0 },
    };
    const archetypeRaw = createEmptyArchetypeAccumulator();
    const userVector = createEmptyUserVector();
    const archetypeMap = new Map(input.archetypes.map((item) => [item.id, item]));
    input.questions.forEach((question, index) => {
        const answer = input.answers[index];
        if (!isAnsweredValue(answer)) {
            return;
        }
        rawScores[question.dimension] += answer * question.sign;
        if (question.sign > 0) {
            directionalMaxScores[question.dimension].positive += 3;
        }
        else {
            directionalMaxScores[question.dimension].negative += 3;
        }
        const normalizedWeights = normalizeQuestionWeights(question.weights ?? QUESTION_WEIGHT_FALLBACKS[question.dimension]);
        for (const role of Object.keys(normalizedWeights)) {
            const weight = normalizedWeights[role] ?? 0;
            const archetypeId = ROLE_TO_ARCHETYPE[role];
            const archetype = archetypeMap.get(archetypeId);
            if (!archetype || weight === 0) {
                continue;
            }
            const weightedAnswer = answer * weight;
            archetypeRaw[archetypeId] += weightedAnswer;
            for (const axis of VECTOR_AXES) {
                userVector[axis] += weightedAnswer * archetype.vector[axis];
            }
        }
    });
    const scores = {};
    let mbtiCode = '';
    Object.keys(DIMENSION_LETTERS).forEach((pair) => {
        const score = normalizeDimensionScore(rawScores[pair], directionalMaxScores[pair]);
        const [leftLetter, rightLetter] = DIMENSION_LETTERS[pair];
        const dominant = score >= 0 ? leftLetter : rightLetter;
        const intensity = Math.min(1, Math.abs(score));
        const percentage = Math.round(50 + intensity * 50);
        scores[pair] = {
            pair,
            score,
            dominant,
            percentage,
        };
        mbtiCode += dominant;
    });
    return {
        scores,
        mbtiCode,
        archetypeRaw,
        userVector,
        matchedArchetype: pickMatchedArchetype(input.archetypes, archetypeRaw, mbtiCode),
    };
}
function createEmptyArchetypeAccumulator() {
    return ARCHETYPE_IDS.reduce((acc, id) => {
        acc[id] = 0;
        return acc;
    }, {});
}
function createEmptyUserVector() {
    return VECTOR_AXES.reduce((acc, axis) => {
        acc[axis] = 0;
        return acc;
    }, {});
}
function isAnsweredValue(value) {
    return typeof value === 'number' && value >= -3 && value <= 3;
}
function normalizeDimensionScore(rawScore, directionalMax) {
    if (rawScore >= 0) {
        return rawScore / Math.max(1, directionalMax.positive);
    }
    return rawScore / Math.max(1, directionalMax.negative);
}
function normalizeQuestionWeights(weights) {
    const completed = Object.keys(ROLE_TO_ARCHETYPE).reduce((acc, role) => {
        const typedRole = role;
        acc[typedRole] = weights[typedRole] ?? 0;
        return acc;
    }, {});
    const values = Object.values(completed);
    const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
    const centered = Object.fromEntries(Object.entries(completed).map(([key, value]) => [key, value - mean]));
    const norm = Object.values(centered).reduce((sum, value) => sum + Math.abs(value), 0) || 1;
    return Object.fromEntries(Object.entries(centered).map(([key, value]) => [key, value / norm]));
}
function pickMatchedArchetype(archetypes, archetypeRaw, finalCode) {
    const sortedByScore = [...archetypes].sort((left, right) => {
        const delta = archetypeRaw[right.id] - archetypeRaw[left.id];
        if (delta !== 0) {
            return delta;
        }
        return left.id.localeCompare(right.id);
    });
    return sortedByScore[0] ?? resolveArchetypeForMbti(finalCode, archetypes) ?? archetypes[0];
}
function rankCharactersByProfile(input) {
    return [...input.characters]
        .map((character) => {
        const mbti = scoreFlexibleMbti(character, input.scores);
        const archetype = scoreArchetype(character.archetypeId, input.archetypeRaw);
        const vector = scoreVector(input.userVector, character.vector);
        const specific = scoreCharacterSpecific(input.userVector, character, input.answers);
        const total = MBTI_WEIGHT * mbti +
            ARCHETYPE_WEIGHT * archetype +
            VECTOR_WEIGHT * vector +
            CHARACTER_SPECIFIC_WEIGHT * specific;
        return {
            character,
            total,
            mbti,
            archetype,
            vector,
            specific,
        };
    })
        .sort((left, right) => {
        const totalDelta = right.total - left.total;
        if (Math.abs(totalDelta) > 0.005) {
            return totalDelta;
        }
        return left.character.name.localeCompare(right.character.name, 'zh-Hans-CN');
    });
}
function scoreMbti(matchCode, scores) {
    if (!MBTI_PATTERN.test(matchCode.toUpperCase())) {
        return 0;
    }
    const pairs = ['E_I', 'S_N', 'T_F', 'J_P'];
    let total = 0;
    for (let index = 0; index < pairs.length; index += 1) {
        const pair = pairs[index];
        const actual = scores[pair];
        const expectedLetter = matchCode[index];
        total += actual.dominant === expectedLetter ? actual.percentage : 100 - actual.percentage;
    }
    return total / 400;
}
function scoreFlexibleMbti(character, scores) {
    const codes = [character.matchCode, ...(character.matchCodeFlex ?? [])];
    return codes.reduce((best, code) => Math.max(best, scoreMbti(code, scores)), 0);
}
function scoreArchetype(archetypeId, archetypeRaw) {
    const values = Object.values(archetypeRaw);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const spread = max - min;
    if (spread <= 0.0001) {
        return archetypeRaw[archetypeId] >= 0 ? 0.55 : 0.45;
    }
    return (archetypeRaw[archetypeId] - min) / spread;
}
function scoreVector(userVector, characterVector) {
    const cosine = cosineSimilarity(userVector, characterVector);
    return (cosine + 1) / 2;
}
function scoreCharacterSpecific(userVector, character, answers) {
    const uniqueAxes = character.signature?.uniqueAxes;
    const questionAffinity = character.signature?.questionAffinity ?? [];
    const axisScore = !uniqueAxes || !Object.keys(uniqueAxes).length
        ? scoreVector(userVector, character.vector)
        : scoreUniqueAxes(userVector, uniqueAxes);
    if (!questionAffinity.length) {
        return axisScore;
    }
    const affinityScore = scoreQuestionAffinity(questionAffinity, answers);
    return axisScore * 0.45 + affinityScore * 0.55;
}
function scoreUniqueAxes(userVector, uniqueAxes) {
    let weightedScore = 0;
    let weightTotal = 0;
    for (const axis of Object.keys(uniqueAxes)) {
        const expected = uniqueAxes[axis] ?? 0;
        const actual = userVector[axis];
        const axisWeight = Math.max(0.5, Math.abs(expected));
        const distance = Math.abs(actual - expected);
        const similarity = Math.max(0, 1 - distance / 18);
        weightedScore += similarity * axisWeight;
        weightTotal += axisWeight;
    }
    return weightTotal ? weightedScore / weightTotal : 0.5;
}
function scoreQuestionAffinity(affinities, answers) {
    let weightedScore = 0;
    let weightTotal = 0;
    for (const affinity of affinities) {
        const questionIndex = getQuestionIndexById(affinity.questionId);
        if (questionIndex < 0) {
            continue;
        }
        const answer = answers[questionIndex];
        if (!isAnsweredValue(answer)) {
            continue;
        }
        const weight = affinity.weight ?? 1;
        weightedScore += evaluateAffinity(answer, affinity.expected) * weight;
        weightTotal += weight;
    }
    return weightTotal ? weightedScore / weightTotal : 0.5;
}
function evaluateAffinity(answer, expected) {
    if (expected === 'agree') {
        return Math.max(0, (answer + 3) / 6);
    }
    if (expected === 'disagree') {
        return Math.max(0, (3 - answer) / 6);
    }
    return Math.max(0, 1 - Math.abs(answer) / 3);
}
function getQuestionIndexById(questionId) {
    return Number.parseInt(questionId.replace(/^q/i, ''), 10) - 1;
}
function collectLeadingMatches(rankings) {
    if (!rankings.length) {
        return [];
    }
    const leader = rankings[0];
    const closeMatches = rankings.filter((item) => leader.total - item.total <= CLOSE_MATCH_THRESHOLD);
    if (closeMatches.length === 1) {
        return rankings;
    }
    return [...closeMatches, ...rankings.filter((item) => leader.total - item.total > CLOSE_MATCH_THRESHOLD)];
}
function cosineSimilarity(left, right) {
    let dot = 0;
    let leftMagnitude = 0;
    let rightMagnitude = 0;
    for (const axis of VECTOR_AXES) {
        dot += left[axis] * right[axis];
        leftMagnitude += left[axis] * left[axis];
        rightMagnitude += right[axis] * right[axis];
    }
    const denominator = Math.sqrt(leftMagnitude) * Math.sqrt(rightMagnitude);
    if (!denominator) {
        return 0;
    }
    return dot / denominator;
}
function calculateCharacterMatchScore(topMatch) {
    if (!topMatch) {
        return 60;
    }
    return Math.max(60, Math.min(99, Math.round(topMatch.total * 100)));
}
export function normalizeMbtiCode(mbtiCode) {
    const normalized = mbtiCode.trim().toUpperCase();
    return MBTI_PATTERN.test(normalized) ? normalized : null;
}
export function buildScoresFromMbtiCode(mbtiCode, percentages) {
    const normalized = normalizeMbtiCode(mbtiCode);
    if (!normalized) {
        return null;
    }
    const defaults = {
        E_I: 74,
        S_N: 70,
        T_F: 68,
        J_P: 72,
    };
    return ['E_I', 'S_N', 'T_F', 'J_P'].reduce((acc, pair, index) => {
        const dominant = normalized[index];
        const percentage = Math.max(50, Math.min(99, Math.round(percentages?.[pair] ?? defaults[pair])));
        const sign = dominant === DIMENSION_LETTERS[pair][0] ? 1 : -1;
        acc[pair] = {
            pair,
            dominant,
            percentage,
            score: sign * (percentage - 50),
        };
        return acc;
    }, {});
}
export function resolveArchetypeForMbti(mbtiCode, archetypes) {
    const normalized = normalizeMbtiCode(mbtiCode);
    if (!normalized) {
        return null;
    }
    return archetypes.find((item) => item.id === TYPE_TO_ARCHETYPE[normalized]) ?? null;
}
