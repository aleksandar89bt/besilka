import React from 'react';

interface VirtualKeyboardProps {
  guessedLetters: Set<string>;
  wrongLetters: string[];
  currentWord: string;
  onGuessLetter: (letter: string) => void;
  disabled: boolean;
}

const MACEDONIAN_ROWS = [
  ['Љ', 'Њ', 'Е', 'Р', 'Т', 'З', 'У', 'И', 'О', 'П'],
  ['А', 'С', 'Д', 'Ф', 'Г', 'Х', 'Ј', 'К', 'Л', 'Ч'],
  ['Ѕ', 'Џ', 'Ц', 'В', 'Б', 'Н', 'М', 'Ш', 'Ж', 'Ќ', 'Ѓ']
];

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  guessedLetters,
  wrongLetters,
  currentWord,
  onGuessLetter,
  disabled,
}) => {
  const isCorrect = (letter: string) => 
    guessedLetters.has(letter) && currentWord.includes(letter);
  
  const isWrong = (letter: string) => 
    wrongLetters.includes(letter);

  return (
    <div className="w-full flex flex-col items-center gap-1.5 my-2 px-1">
      {MACEDONIAN_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex items-center justify-center gap-1 w-full">
          {row.map((letter) => {
            const correct = isCorrect(letter);
            const wrong = isWrong(letter);
            const guessed = correct || wrong || guessedLetters.has(letter);

            let btnStyles = 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700';
            if (correct) {
              btnStyles = 'bg-emerald-600/90 text-white border-emerald-500 shadow-sm shadow-emerald-900/50';
            } else if (wrong) {
              btnStyles = 'bg-rose-950/80 text-rose-300/60 border-rose-900/50 opacity-60';
            }

            return (
              <button
                key={letter}
                type="button"
                disabled={disabled || guessed}
                onClick={() => onGuessLetter(letter)}
                className={`flex-1 min-w-[26px] max-w-[38px] h-11 sm:h-12 rounded-lg font-bold text-xs sm:text-sm border flex items-center justify-center transition active:scale-95 disabled:cursor-not-allowed select-none ${btnStyles}`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};
