import type { GameId } from '@/types/quiz'

const GAME_LABELS: Record<GameId, string> = {
  genshin: '原神',
  starrail: '星穹铁道',
  hi3: '崩坏3',
  zzz: '绝区零',
}

function pickSecondaryColor(color: string) {
  const map: Record<string, string> = {
    '#54c6eb': '#7bffd8',
    '#f5b35c': '#ffdf8f',
    '#7c8cff': '#d2d5ff',
    '#f06484': '#ffc3cf',
    '#7ac389': '#d3ffd2',
    '#e88bbb': '#ffd7eb',
    '#6dc7a3': '#c8ffe6',
    '#7186f8': '#d4dbff',
    '#ff9b70': '#ffd6bf',
    '#5eb3ff': '#d0e7ff',
    '#ffd36e': '#fff0bd',
    '#a889ff': '#e4dcff',
  }

  return map[color] ?? '#f2e7c2'
}

export function createCharacterArtwork(input: {
  name: string
  title: string
  game: GameId
  accent: string
}) {
  const initials = input.name.slice(0, 1)
  const secondary = pickSecondaryColor(input.accent)

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="900" viewBox="0 0 720 900">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${input.accent}" />
          <stop offset="100%" stop-color="#101726" />
        </linearGradient>
        <linearGradient id="halo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${secondary}" stop-opacity="0.94" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.12" />
        </linearGradient>
      </defs>
      <rect width="720" height="900" rx="40" fill="url(#bg)" />
      <circle cx="560" cy="178" r="158" fill="url(#halo)" opacity="0.95" />
      <circle cx="130" cy="735" r="170" fill="${secondary}" opacity="0.18" />
      <path d="M120 770c110-210 386-295 468-216 63 61 17 207-119 257-127 47-279 2-349-41z" fill="#0b1120" opacity="0.46" />
      <path d="M210 655c25-118 103-216 151-216 62 0 155 122 155 269H210v-53z" fill="#0a1020" opacity="0.86" />
      <path d="M276 312c0-80 47-136 114-136s114 56 114 136c0 79-46 132-114 132s-114-53-114-132z" fill="#f8efe3" opacity="0.95" />
      <path d="M225 680c26-89 80-152 170-152 94 0 144 68 171 152H225z" fill="${secondary}" opacity="0.18" />
      <text x="62" y="114" font-size="36" fill="white" fill-opacity="0.84" font-family="'Trebuchet MS','Microsoft YaHei',sans-serif">${GAME_LABELS[input.game]}</text>
      <text x="58" y="768" font-size="168" font-weight="800" fill="white" fill-opacity="0.12" font-family="Georgia,'Times New Roman',serif">${initials}</text>
      <text x="58" y="818" font-size="72" font-weight="700" fill="white" font-family="'Trebuchet MS','Microsoft YaHei',sans-serif">${input.name}</text>
      <text x="60" y="866" font-size="30" fill="white" fill-opacity="0.8" font-family="'Trebuchet MS','Microsoft YaHei',sans-serif">${input.title}</text>
    </svg>
  `.trim()

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}
