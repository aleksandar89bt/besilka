import React, { useEffect, useState } from 'react';
import { HelpCircle, Play, Sparkles, X } from 'lucide-react';
import { HintType } from '../types/game';

interface HintButtonProps {
  disabled: boolean;
  letterHintUsed: boolean;
  descriptionRevealed: boolean;
  onUnlockHint: (type: HintType) => void;
}

export const HintButton: React.FC<HintButtonProps> = ({
  disabled,
  letterHintUsed,
  descriptionRevealed,
  onUnlockHint,
}) => {
  const [pendingHint, setPendingHint] = useState<HintType | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(3);

  useEffect(() => {
    if (!pendingHint) return;

    setSecondsLeft(3);
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          const unlocked = pendingHint;
          setPendingHint(null);
          onUnlockHint(unlocked);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [pendingHint, onUnlockHint]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2.5 w-full">
        <button
          type="button"
          disabled={disabled || letterHintUsed}
          onClick={() => setPendingHint('letter')}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-semibold hover:bg-amber-500/25 disabled:opacity-40 disabled:pointer-events-none transition"
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>{letterHintUsed ? 'Буква откриена' : 'Откриј буква (Реклама)'}</span>
        </button>

        <button
          type="button"
          disabled={disabled || descriptionRevealed}
          onClick={() => setPendingHint('description')}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-sky-500/15 border border-sky-500/40 text-sky-300 text-xs font-semibold hover:bg-sky-500/25 disabled:opacity-40 disabled:pointer-events-none transition"
        >
          <HelpCircle className="w-4 h-4 shrink-0" />
          <span>{descriptionRevealed ? 'Опис прикажан' : 'Опис на зборот (Реклама)'}</span>
        </button>
      </div>

      {/* Simulated Rewarded Ad Modal */}
      {pendingHint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-700 p-6 text-center shadow-2xl space-y-4">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span className="px-2 py-0.5 rounded bg-slate-800 font-mono">
                РЕКЛАМА (ДЕМО)
              </span>
              <button
                type="button"
                onClick={() => setPendingHint(null)}
                className="p-1 text-slate-400 hover:text-white"
                aria-label="Затвори реклама"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Play className="w-7 h-7 fill-current" />
            </div>

            <div>
              <h3 className="text-base font-bold text-white">
                Се отклучува помош...
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Наградата ќе биде доделена за{' '}
                <span className="text-amber-400 font-bold">{secondsLeft} сек.</span>
              </p>
            </div>

            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-400 h-full transition-all duration-1000 ease-linear"
                style={{ width: `${((3 - secondsLeft) / 3) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
