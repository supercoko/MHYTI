import type { Archetype, Question } from '@/types/quiz'

import archetypesJson from './archetypes.json'
import questionsJson from './questions.json'

import { characters, gameThemes } from './characters'

const archetypes = archetypesJson as Archetype[]
const questions = questionsJson as Question[]

export { archetypes, characters, gameThemes, questions }
