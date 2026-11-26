import React from 'react';
import { GameStatus } from '../types/game';

interface WordDisplayProps {
  word: string;
  guessedLetters: Set<string>;
  status: GameStatus;
  onTriggerKeyboard: () => void;
}

export const WordDisplay: React.FC<WordDisplayProps> = ({
  word,
  guessedLetters,
  status,
  onTriggerKeyboard,
}) => {
  const letters = word.split('');

  // Adjust tile sizing dynamically for longer words (8+ letters) so they fit mobile screens cleanly
  const isLongWord = letters.length >= 8;

  return (
    <button
      type="button"
      onClick={onTriggerKeyboard}
      className="w-full py-3 px-2 rounded-2xl bg-slate-900/60 border border-slate-800/80 active:scale-[0.99] transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
      aria-label="Допри за да ја отвориш тастатурата на телефонот"
    >
      <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
        {letters.map((letter, index) => {
          const isGuessed = guessedLetters.has(letter);
          const revealMissed = status === 'lost' && !isGuessed;
          const shouldShow = isGuessed || revealMissed;

          return (
            <div
              key={`${index}-${letter}`}
              className={`flex items-center justify-center font-extrabold rounded-xl border-b-4 transition-all duration-200 ${
                isLongWord
                  ? 'w-8 h-10 text-lg sm:w-10 sm:h-12 sm:text-xl'
                  : 'w-10 h-12 text-2xl sm:w-12 sm:h-14 sm:text-3xl'
              } ${
                revealMissed
                  ? 'bg-rose-950/70 border-rose-500 text-rose-300'
                  : isGuessed
                  ? status === 'won'
                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                    : 'bg-slate-800 border-indigo-500 text-white'
                  : 'bg-slate-800/70 border-slate-600 text-transparent'
              }`}
            >
              {shouldShow ? letter : ''}
            </div>
          );
        })}
      </div>
    </button>
  );
};
