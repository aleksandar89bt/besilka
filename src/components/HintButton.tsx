import React, { useState } from 'react';
import { HelpCircle, Sparkles, Loader2 } from 'lucide-react';
import { HintType } from '../types/game';
import { showRewardedHintAd } from '../services/adService';

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
  const [loadingHint, setLoadingHint] = useState<HintType | null>(null);

  const handleWatchAdForHint = async (type: HintType) => {
    if (loadingHint) return;
    setLoadingHint(type);

    try {
      const earned = await showRewardedHintAd();
      if (earned) {
        onUnlockHint(type);
      }
    } catch (e) {
      console.error('Failed to show rewarded ad:', e);
    } finally {
      setLoadingHint(null);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2.5 w-full">
      <button
        type="button"
        disabled={disabled || letterHintUsed || loadingHint !== null}
        onClick={() => handleWatchAdForHint('letter')}
        className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-semibold hover:bg-amber-500/25 disabled:opacity-40 disabled:pointer-events-none transition"
      >
        {loadingHint === 'letter' ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          <Sparkles className="w-4 h-4 shrink-0" />
        )}
        <span>{letterHintUsed ? 'Буква откриена' : loadingHint === 'letter' ? 'Се вчитува...' : 'Откриј буква (Реклама)'}</span>
      </button>

      <button
        type="button"
        disabled={disabled || descriptionRevealed || loadingHint !== null}
        onClick={() => handleWatchAdForHint('description')}
        className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-sky-500/15 border border-sky-500/40 text-sky-300 text-xs font-semibold hover:bg-sky-500/25 disabled:opacity-40 disabled:pointer-events-none transition"
      >
        {loadingHint === 'description' ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          <HelpCircle className="w-4 h-4 shrink-0" />
        )}
        <span>{descriptionRevealed ? 'Опис прикажан' : loadingHint === 'description' ? 'Се вчитува...' : 'Опис на зборот (Реклама)'}</span>
      </button>
    </div>
  );
};
