import { archetypes, characters, questions } from '@/data'
import type { ArchetypeId, CharacterMatch, DimensionPair } from '@/types/quiz'
import { buildScoresFromMbtiCode, calculateQuizResult } from '@/utils/quizEngine'

function createNeutralAnswers() {
  return Array.from({ length: questions.length }, () => 0) as Array<number | null>
}

function createAnswersForMbti(code: string) {
  const letterMap: Record<DimensionPair, string> = {
    E_I: code[0],
    S_N: code[1],
    T_F: code[2],
    J_P: code[3],
  }

  return questions.map((question) => {
    const desiredLetter = letterMap[question.dimension]
    const leftLetter = {
      E_I: 'E',
      S_N: 'S',
      T_F: 'T',
      J_P: 'J',
    }[question.dimension]

    const prefersPositive = desiredLetter === leftLetter
    return prefersPositive ? 3 * question.sign : -3 * question.sign
  })
}

function makeSyntheticCharacter(input: {
  id: string
  code: string
  archetypeId: ArchetypeId
  vector: CharacterMatch['vector']
}): CharacterMatch {
  return {
    id: input.id,
    name: input.id,
    game: 'genshin',
    title: input.id,
    image: '',
    accent: '#ffffff',
    matchCode: input.code,
    code: input.id.toUpperCase(),
    archetypeId: input.archetypeId,
    tags: [],
    note: input.id,
    vector: input.vector,
  }
}

describe('quizEngine', () => {
  it('keeps neutral answers stable and repeatable', () => {
    const answers = createNeutralAnswers()
    const resultA = calculateQuizResult({ answers, questions, archetypes, characters })
    const resultB = calculateQuizResult({ answers, questions, archetypes, characters })

    expect(resultA.mbtiCode).toBe(resultB.mbtiCode)
    expect(resultA.code).toBe(resultB.code)
    expect(Object.values(resultA.scores).every((item) => item.percentage === 50)).toBe(true)
  })

  it('flips the E/I letter when that dimension is answered to opposite extremes', () => {
    const introvertedAnswers = createNeutralAnswers()
    const extravertedAnswers = createNeutralAnswers()

    questions.forEach((question, index) => {
      if (question.dimension !== 'E_I') {
        return
      }

      introvertedAnswers[index] = -3 * question.sign
      extravertedAnswers[index] = 3 * question.sign
    })

    const introvertedResult = calculateQuizResult({
      answers: introvertedAnswers,
      questions,
      archetypes,
      characters,
    })

    const extravertedResult = calculateQuizResult({
      answers: extravertedAnswers,
      questions,
      archetypes,
      characters,
    })

    expect(introvertedResult.scores.E_I.dominant).toBe('I')
    expect(extravertedResult.scores.E_I.dominant).toBe('E')
    expect(introvertedResult.scores.E_I.percentage).toBeGreaterThan(90)
    expect(extravertedResult.scores.E_I.percentage).toBeGreaterThan(90)
  })

  it('can change the matched character without changing trait bars when the same MBTI has different vectors', () => {
    const answers = createAnswersForMbti('INTJ')
    const scoresA = buildScoresFromMbtiCode('INTJ')
    const scoresB = buildScoresFromMbtiCode('INTJ')

    const poolA = [
      makeSyntheticCharacter({
        id: 'near',
        code: 'INTJ',
        archetypeId: 'shadow-strategist',
        vector: { expression: -1, temperature: -1, judgement: 3, order: 2, agency: 2, aura: 3 },
      }),
      makeSyntheticCharacter({
        id: 'far',
        code: 'INTJ',
        archetypeId: 'gentle-healer',
        vector: { expression: 1, temperature: 3, judgement: 1, order: 1, agency: 1, aura: 0 },
      }),
    ]

    const poolB = [
      makeSyntheticCharacter({
        id: 'near',
        code: 'INTJ',
        archetypeId: 'gentle-healer',
        vector: { expression: 1, temperature: 3, judgement: 1, order: 1, agency: 1, aura: 0 },
      }),
      makeSyntheticCharacter({
        id: 'far',
        code: 'INTJ',
        archetypeId: 'shadow-strategist',
        vector: { expression: -1, temperature: -1, judgement: 3, order: 2, agency: 2, aura: 3 },
      }),
    ]

    const resultA = calculateQuizResult({ answers, questions, archetypes, characters: poolA })
    const resultB = calculateQuizResult({ answers, questions, archetypes, characters: poolB })

    expect(resultA.featuredCharacter?.id).toBe('near')
    expect(resultB.featuredCharacter?.id).toBe('far')
    expect(resultA.mbtiCode).toBe('INTJ')
    expect(resultB.mbtiCode).toBe('INTJ')
    expect(resultA.scores).toEqual(resultB.scores)
    expect(scoresA).toEqual(scoresB)
  })
})
