import { useRef, useEffect } from 'react';
import { Flame, RotateCcw, Trophy } from 'lucide-react';
import { CategorySelector } from './components/CategorySelector';
import { HangmanDrawing } from './components/HangmanDrawing';
import { HintButton } from './components/HintButton';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { WordDisplay } from './components/WordDisplay';
import { CATEGORIES } from './data/words';
import { useHangman } from './hooks/useHangman';
import { initializeAds, showBannerAd, hideBannerAd } from './services/adService';

// Mapping for physical keyboard fallback (Latin/Cyrillic to Macedonian)
const KEY_MAPPING: Record<string, string> = {
  a: 'А', b: 'Б', v: 'В', g: 'Г', d: 'Д', đ: 'Ѓ', e: 'Е', ž: 'Ж', z: 'З', s: 'Ѕ', i: 'И',
  j: 'Ј', k: 'К', l: 'Л', ĺ: 'Љ', m: 'М', n: 'Н', ń: 'Њ', o: 'О', p: 'П', r: 'Р',
  c: 'Ц', t: 'Т', ć: 'Ќ', u: 'У', f: 'Ф', h: 'Х', č: 'Ч', dž: 'Џ', š: 'Ш',
  // Cyrillic direct mapping
  а: 'А', б: 'Б', в: 'В', г: 'Г', д: 'Д', ѓ: 'Ѓ', е: 'Е', ж: 'Ж', з: 'З', ѕ: 'Ѕ', и: 'И',
  ј: 'Ј', к: 'К', л: 'Л', љ: 'Љ', м: 'М', н: 'Н', њ: 'Њ', о: 'О', п: 'П', р: 'Р', с: 'С',
  т: 'Т', ќ: 'Ќ', у: 'У', ф: 'Ф', х: 'Х', ц: 'Ц', ч: 'Ч', џ: 'Џ', ш: 'Ш'
};

export function App() {
  const {
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
  } = useHangman();

  // Initialize Ads on mount
  useEffect(() => {
    initializeAds().then(() => {
      showBannerAd();
    });
    
    return () => {
      hideBannerAd();
    };
  }, []);

  const keyboardInputRef = useRef<HTMLInputElement | null>(null);

  const triggerPhoneKeyboard = () => {
    if (status === 'playing') {
      keyboardInputRef.current?.focus();
    }
  };

  // Physical keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (status !== 'playing') return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key.toLowerCase();
      const mappedLetter = KEY_MAPPING[key];
      if (mappedLetter) {
        guessLetter(mappedLetter);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, guessLetter]);

  const activeCategoryLabel =
    CATEGORIES.find((c) => c.id === currentWord.category)?.labelMk ?? '';

  return (
    <div className="min-h-dvh bg-slate-950 text-slate-100 flex flex-col items-center px-3 py-4 pb-16 pb-[calc(3rem+env(safe-area-inset-bottom))] pt-[calc(1rem+env(safe-area-inset-top))]">
      <div className="w-full max-w-md flex flex-col gap-3.5">
        {/* Dedicated Top Banner Ad Spacer for Mobile Devices */}
        <div className="h-14 shrink-0" aria-hidden="true" />

        {/* Header */}
        <header className="flex items-center justify-between px-1">
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white">
              Погоди го зборот
            </h1>
            <p className="text-xs text-slate-400">
              {activeCategoryLabel} • {currentWord.word.length} букви
            </p>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <Flame className="w-4 h-4 fill-current" />
            <span>Серија: {streak}</span>
          </div>
        </header>

        {/* Category & Length Filters */}
        <CategorySelector
          selectedCategory={category}
          selectedLength={lengthFilter}
          onSelectCategory={changeCategory}
          onSelectLength={changeLengthFilter}
        />

        {/* Hangman Gallows & Part-by-Part Figure */}
        <section className="flex flex-col items-center justify-center bg-slate-900/60 border border-slate-800/80 rounded-2xl py-3 px-4">
          <HangmanDrawing
            mistakes={mistakesCount}
            isLost={status === 'lost'}
            isWon={status === 'won'}
          />

          {/* Used Wrong Letters List */}
          <div className="mt-3 min-h-[28px] flex flex-wrap items-center justify-center gap-1.5">
            {wrongLetters.length > 0 ? (
              wrongLetters.map((letter) => (
                <span
                  key={letter}
                  className="px-2 py-0.5 rounded-md bg-rose-950/80 border border-rose-700/60 text-rose-300 text-xs font-bold line-through"
                >
                  {letter}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500">
                Погрешни букви ќе се појават тука
              </span>
            )}
          </div>
        </section>

        {/* Optional Clue / Description Banner */}
        {descriptionRevealed && (
          <div className="p-3 rounded-xl bg-sky-950/60 border border-sky-500/40 text-sky-200 text-xs leading-relaxed">
            <span className="font-bold uppercase text-sky-400 mr-1.5">Опис:</span>
            {currentWord.description}
          </div>
        )}

        {/* Word Tiles */}
        <WordDisplay
          word={currentWord.word}
          guessedLetters={guessedLetters}
          status={status}
          onTriggerKeyboard={triggerPhoneKeyboard}
        />

        {/* Validation / Already Guessed Feedback */}
        {feedback && status === 'playing' && (
          <div className="text-center text-xs font-medium text-amber-300 bg-amber-950/50 border border-amber-500/30 rounded-xl py-2 px-3">
            {feedback.message}
          </div>
        )}

        {/* Virtual On-Screen Macedonian Keyboard */}
        <VirtualKeyboard
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          currentWord={currentWord.word}
          onGuessLetter={guessLetter}
          disabled={status !== 'playing'}
        />

        {/* Rewarded Ad Hints */}
        <HintButton
          disabled={status !== 'playing'}
          letterHintUsed={letterHintUsed}
          descriptionRevealed={descriptionRevealed}
          onUnlockHint={applyHint}
        />

        {/* Win / Loss Result Banner */}
        {status !== 'playing' && (
          <div
            className={`p-4 rounded-2xl border text-center space-y-3 ${
              status === 'won'
                ? 'bg-emerald-950/60 border-emerald-500/50'
                : 'bg-rose-950/60 border-rose-500/50'
            }`}
          >
            <div className="flex items-center justify-center gap-2 text-lg font-extrabold">
              {status === 'won' ? (
                <>
                  <Trophy className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-300">Браво! Го погоди зборот!</span>
                </>
              ) : (
                <span className="text-rose-300">
                  Крај на играта! Зборот беше: {currentWord.word}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300">{currentWord.description}</p>

            <button
              type="button"
              onClick={() => startNewRound()}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-200 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Следен збор</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
