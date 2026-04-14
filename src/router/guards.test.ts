import { archetypes, characters, questions } from '@/data'
import { ensureResultAvailable } from '@/router/guards'
import { saveQuizResult } from '@/utils/storage'
import { calculateQuizResult } from '@/utils/quizEngine'

describe('result route guard', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('redirects to /quiz when there is no saved result', () => {
    expect(ensureResultAvailable()).toEqual({ path: '/quiz' })
  })

  it('allows /result when a valid cached result exists', () => {
    const result = calculateQuizResult({
      answers: Array.from({ length: questions.length }, () => 0),
      questions,
      archetypes,
      characters,
    })

    saveQuizResult(result)

    expect(ensureResultAvailable()).toBe(true)
  })
})
