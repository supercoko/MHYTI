const ANSWERS_KEY = 'miti.answers';
const RESULT_KEY = 'miti.result';
function safeStorage() {
    if (typeof window === 'undefined') {
        return null;
    }
    return window.localStorage;
}
export function getSavedAnswers() {
    const storage = safeStorage();
    if (!storage) {
        return [];
    }
    try {
        const raw = storage.getItem(ANSWERS_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed.filter((value) => value === null || typeof value === 'number') : [];
    }
    catch {
        return [];
    }
}
export function saveAnswers(answers) {
    const storage = safeStorage();
    storage?.setItem(ANSWERS_KEY, JSON.stringify(answers));
}
export function clearSavedAnswers() {
    safeStorage()?.removeItem(ANSWERS_KEY);
}
export function getSavedQuizResult() {
    const storage = safeStorage();
    if (!storage) {
        return null;
    }
    try {
        const raw = storage.getItem(RESULT_KEY);
        return raw ? JSON.parse(raw) : null;
    }
    catch {
        return null;
    }
}
export function saveQuizResult(result) {
    safeStorage()?.setItem(RESULT_KEY, JSON.stringify(result));
}
export function clearSavedQuizResult() {
    safeStorage()?.removeItem(RESULT_KEY);
}
export function hasSavedQuizResult() {
    const result = getSavedQuizResult();
    return Boolean(result?.featuredCharacter && result?.mbtiCode);
}
export function clearAllQuizStorage() {
    clearSavedAnswers();
    clearSavedQuizResult();
}
