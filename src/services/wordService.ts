import { WORDS_DATABASE } from '../data/words';
import { CategoryId, WordEntry, WordLengthFilter } from '../types/game';

const USED_WORDS_STORAGE_KEY = 'pgz_used_word_ids_v1';

function getUsedWordIds(): Set<string> {
  try {
    const raw = localStorage.getItem(USED_WORDS_STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed) : new Set();
  } catch {
    return new Set();
  }
}

function saveUsedWordIds(ids: Set<string>): void {
  try {
    localStorage.setItem(USED_WORDS_STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // Ignore storage quota errors
  }
}

export function filterWords(
  category: CategoryId,
  lengthFilter: WordLengthFilter
): WordEntry[] {
  return WORDS_DATABASE.filter((entry) => {
    const matchesCategory = category === 'all' || entry.category === category;
    const len = entry.word.length;
    const matchesLength =
      lengthFilter === 'all'
        ? true
        : lengthFilter === '8+'
        ? len >= 8
        : len === lengthFilter;

    return matchesCategory && matchesLength;
  });
}

/**
 * Selects a random word matching category & length while avoiding
 * previously played words until the matching pool is exhausted.
 */
export function getNextWord(
  category: CategoryId,
  lengthFilter: WordLengthFilter,
  excludeWordId?: string
): WordEntry {
  let pool = filterWords(category, lengthFilter);

  // Fallback to entire database if an exact combination has 0 words
  if (pool.length === 0) {
    pool = [...WORDS_DATABASE];
  }

  const usedIds = getUsedWordIds();
  let available = pool.filter((w) => !usedIds.has(w.id) && w.id !== excludeWordId);

  // If all words in this filtered pool have been used, reset history for this pool
  if (available.length === 0) {
    const poolIds = new Set(pool.map((w) => w.id));
    for (const id of poolIds) {
      usedIds.delete(id);
    }
    saveUsedWordIds(usedIds);

    available = pool.filter((w) => w.id !== excludeWordId);
    if (available.length === 0) {
      available = pool;
    }
  }

  const chosen = available[Math.floor(Math.random() * available.length)];
  usedIds.add(chosen.id);
  saveUsedWordIds(usedIds);

  return chosen;
}
