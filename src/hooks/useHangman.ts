import { useCallback, useMemo, useState } from 'react';
import { MACEDONIAN_ALPHABET } from '../data/words';
import { getNextWord } from '../services/wordService';
import {
  CategoryId,
  GameStatus,
  HintType,
  WordEntry,
  WordLengthFilter,
} from '../types/game';

// 6 distinct body parts drawn step by step:
// 1: Head, 2: Torso, 3: Left Arm, 4: Right Arm, 5: Left Leg, 6: Right Leg
export const MAX_MISTAKES = 6;

export interface FeedbackBanner {
  type: 'info' | 'warning' | 'error';
  message: string;
}

export function useHangman() {
  const [category, setCategory] = useState<CategoryId>('all');
  const [lengthFilter, setLengthFilter] = useState<WordLengthFilter>('all');
  const [currentWord, setCurrentWord] = useState<WordEntry>(() =>
    getNextWord('all', 'all')
  );
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [descriptionRevealed, setDescriptionRevealed] = useState(false);
  const [letterHintUsed, setLetterHintUsed] = useState(false);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackBanner | null>(null);

  const wordLetters = useMemo(
    () => currentWord.word.split(''),
    [currentWord.word]
  );

  const wrongLetters = useMemo(
    () =>
      [...guessedLetters].filter(
        (letter) => !currentWord.word.includes(letter)
      ),
    [guessedLetters, currentWord.word]
  );

  const mistakesCount = wrongLetters.length;

  const status: GameStatus = useMemo(() => {
    if (mistakesCount >= MAX_MISTAKES) return 'lost';
    const allRevealed = wordLetters.every((ch) => guessedLetters.has(ch));
    if (allRevealed) return 'won';
    return 'playing';
  }, [mistakesCount, wordLetters, guessedLetters]);

  const startNewRound = useCallback(
    (nextCategory: CategoryId = category, nextLength: WordLengthFilter = lengthFilter) => {
      const next = getNextWord(nextCategory, nextLength, currentWord.id);
      setCurrentWord(next);
      setGuessedLetters(new Set());
      setDescriptionRevealed(false);
      setLetterHintUsed(false);
      setFeedback(null);
    },
    [category, lengthFilter, currentWord.id]
  );

  const changeCategory = useCallback(
    (newCategory: CategoryId) => {
      setCategory(newCategory);
      startNewRound(newCategory, lengthFilter);
    },
    [lengthFilter, startNewRound]
  );

  const changeLengthFilter = useCallback(
    (newLength: WordLengthFilter) => {
      setLengthFilter(newLength);
      startNewRound(category, newLength);
    },
    [category, startNewRound]
  );

  const guessLetter = useCallback(
    (rawInput: string) => {
      if (status !== 'playing') return;

      const normalized = rawInput.trim().toUpperCase();
      if (!normalized) return;

      // Take the last character if multiple characters were typed/pasted
      const char = normalized[normalized.length - 1];

      if (!MACEDONIAN_ALPHABET.has(char)) {
        setFeedback({
          type: 'warning',
          message: 'Внеси буква на македонска кирилица (А–Ш)!',
        });
        return;
      }

      if (guessedLetters.has(char)) {
        setFeedback({
          type: 'info',
          message: `Буквата „${char}“ е веќе искористена.`,
        });
        return;
      }

      setFeedback(null);
      const nextGuessed = new Set(guessedLetters);
      nextGuessed.add(char);
      setGuessedLetters(nextGuessed);

      // Update streak immediately on round completion
      const isWin = wordLetters.every((ch) => nextGuessed.has(ch));
      const nextMistakes = [...nextGuessed].filter(
        (l) => !currentWord.word.includes(l)
      ).length;

      if (isWin) {
        setStreak((s) => s + 1);
      } else if (nextMistakes >= MAX_MISTAKES) {
        setStreak(0);
      }
    },
    [status, guessedLetters, wordLetters, currentWord.word]
  );

  const applyHint = useCallback(
    (hintType: HintType) => {
      if (status !== 'playing') return;

      if (hintType === 'description') {
        setDescriptionRevealed(true);
        return;
      }

      if (hintType === 'letter' && !letterHintUsed) {
        const unrevealed = wordLetters.filter((ch) => !guessedLetters.has(ch));
        if (unrevealed.length === 0) return;

        const randomLetter =
          unrevealed[Math.floor(Math.random() * unrevealed.length)];
        setLetterHintUsed(true);
        guessLetter(randomLetter);
      }
    },
    [status, letterHintUsed, wordLetters, guessedLetters, guessLetter]
  );

  return {
    category,
    lengthFilter,
    currentWord,
    guessedLetters,
    wrongLetters,
    mistakesCount,
    status,
    streak,
    feedback,
    descriptionRevealed,
    letterHintUsed,
    changeCategory,
    changeLengthFilter,
    guessLetter,
    applyHint,
    startNewRound,
  };
}
