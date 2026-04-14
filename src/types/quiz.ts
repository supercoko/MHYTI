export type GameId = 'genshin' | 'starrail' | 'hi3' | 'zzz'

export type DimensionId =
  | 'expression'
  | 'temperature'
  | 'judgement'
  | 'order'
  | 'agency'
  | 'aura'

export type ArchetypeId =
  | 'luminous-lead'
  | 'icebound-observer'
  | 'oathbound-captain'
  | 'trickster-orbit'
  | 'gentle-healer'
  | 'shadow-strategist'
  | 'chaos-spark'
  | 'moonlit-guardian'

export type DimensionPair = 'E_I' | 'S_N' | 'T_F' | 'J_P'

export type MBTILetter = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

export type QuestionArchetypeWeightId =
  | 'hero'
  | 'strategist'
  | 'guardian'
  | 'lonewolf'
  | 'healer'
  | 'berserker'
  | 'trickster'
  | 'ruler'

export interface Question {
  id: string
  text: string
  scene: string
  dimension: DimensionPair
  sign: 1 | -1
  weights?: Partial<Record<QuestionArchetypeWeightId, number>>
}

export interface Archetype {
  id: ArchetypeId
  name: string
  subtitle: string
  oneLiner: string
  description: string
  tags: string[]
  narrativeRole: string
  spotlight: string
  weakness: string
  keywords: string[]
  accent: string
  vector: Record<DimensionId, number>
}

export interface CharacterSignature {
  uniqueAxes?: Partial<Record<DimensionId, number>>
  questionAffinity?: Array<{
    questionId: string
    expected: 'agree' | 'disagree' | 'neutral'
    weight?: number
  }>
}

export interface CharacterMatch {
  id: string
  name: string
  game: GameId
  title: string
  image: string
  accent: string
  matchCode: string
  matchCodeFlex?: string[]
  code: string
  archetypeId: ArchetypeId
  tags: string[]
  note: string
  vector: Record<DimensionId, number>
  signature?: CharacterSignature
}

export interface DimensionScore {
  pair: DimensionPair
  score: number
  dominant: MBTILetter
  percentage: number
}

export interface QuizResult {
  code: string
  mbtiCode: string
  archetype: Archetype
  scores: Record<DimensionPair, DimensionScore>
  tags: string[]
  matchScore: number
  characterMatches: CharacterMatch[]
  featuredCharacter: CharacterMatch | null
}

export interface TraitConfig {
  label: string
  leftLabel: string
  rightLabel: string
  leftCN: string
  rightCN: string
  color: string
}
