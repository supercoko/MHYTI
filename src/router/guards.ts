import type { NavigationGuardWithThis } from 'vue-router'

import { hasSavedQuizResult } from '@/utils/storage'

export const ensureResultAvailable: NavigationGuardWithThis<undefined> = () => {
  if (hasSavedQuizResult()) {
    return true
  }

  return { path: '/quiz' }
}
