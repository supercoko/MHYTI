import { hasSavedQuizResult } from '@/utils/storage';
export const ensureResultAvailable = () => {
    if (hasSavedQuizResult()) {
        return true;
    }
    return { path: '/quiz' };
};
