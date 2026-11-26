import React from 'react';
import { MAX_MISTAKES } from '../hooks/useHangman';

interface HangmanDrawingProps {
  mistakes: number;
  isLost: boolean;
  isWon: boolean;
}

/**
 * Renders the gallows and draws the hangman strictly 1 body part per mistake:
 * 1: Head
 * 2: Torso
 * 3: Left Arm
 * 4: Right Arm
 * 5: Left Leg
 * 6: Right Leg
 */
export const HangmanDrawing: React.FC<HangmanDrawingProps> = ({
  mistakes,
  isLost,
  isWon,
}) => {
  const figureColor = isLost
    ? '#f43f5e' // rose-500
    : isWon
    ? '#10b981' // emerald-500
    : '#f8fafc'; // slate-50

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox="0 0 220 230"
        className="w-44 h-44 sm:w-52 sm:h-52 overflow-visible"
        role="img"
        aria-label={`Бесилка: ${mistakes} од ${MAX_MISTAKES} грешки`}
      >
        {/* Gallows Structure (Always visible) */}
        <line
          x1="20"
          y1="215"
          x2="130"
          y2="215"
          stroke="#475569"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="55"
          y1="215"
          x2="55"
          y2="20"
          stroke="#475569"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="55"
          y1="20"
          x2="145"
          y2="20"
          stroke="#475569"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="55"
          y1="52"
          x2="88"
          y2="20"
          stroke="#475569"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Rope */}
        <line
          x1="145"
          y1="20"
          x2="145"
          y2="48"
          stroke="#94a3b8"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* 1. HEAD */}
        {mistakes >= 1 && (
          <circle
            cx="145"
            cy="70"
            r="22"
            fill="none"
            stroke={figureColor}
            strokeWidth="4.5"
            className="animate-draw"
          />
        )}

        {/* Face details on game over */}
        {isLost && (
          <g stroke={figureColor} strokeWidth="2.5" strokeLinecap="round">
            {/* Left X eye */}
            <line x1="136" y1="64" x2="141" y2="69" />
            <line x1="141" y1="64" x2="136" y2="69" />
            {/* Right X eye */}
            <line x1="149" y1="64" x2="154" y2="69" />
            <line x1="154" y1="64" x2="149" y2="69" />
            {/* Sad mouth */}
            <path d="M 138 80 Q 145 74 152 80" fill="none" />
          </g>
        )}

        {/* 2. TORSO */}
        {mistakes >= 2 && (
          <line
            x1="145"
            y1="92"
            x2="145"
            y2="150"
            stroke={figureColor}
            strokeWidth="4.5"
            strokeLinecap="round"
            className="animate-draw"
          />
        )}

        {/* 3. LEFT ARM */}
        {mistakes >= 3 && (
          <line
            x1="145"
            y1="106"
            x2="115"
            y2="134"
            stroke={figureColor}
            strokeWidth="4.5"
            strokeLinecap="round"
            className="animate-draw"
          />
        )}

        {/* 4. RIGHT ARM */}
        {mistakes >= 4 && (
          <line
            x1="145"
            y1="106"
            x2="175"
            y2="134"
            stroke={figureColor}
            strokeWidth="4.5"
            strokeLinecap="round"
            className="animate-draw"
          />
        )}

        {/* 5. LEFT LEG */}
        {mistakes >= 5 && (
          <line
            x1="145"
            y1="150"
            x2="120"
            y2="190"
            stroke={figureColor}
            strokeWidth="4.5"
            strokeLinecap="round"
            className="animate-draw"
          />
        )}

        {/* 6. RIGHT LEG */}
        {mistakes >= 6 && (
          <line
            x1="145"
            y1="150"
            x2="170"
            y2="190"
            stroke={figureColor}
            strokeWidth="4.5"
            strokeLinecap="round"
            className="animate-draw"
          />
        )}
      </svg>

      {/* Progress dots for remaining attempts */}
      <div className="flex items-center gap-1.5 mt-1">
        {Array.from({ length: MAX_MISTAKES }).map((_, idx) => {
          const isUsed = idx < mistakes;
          return (
            <span
              key={idx}
              className={`h-2 w-5 rounded-full transition-colors duration-300 ${
                isUsed ? 'bg-rose-500' : 'bg-slate-700'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
