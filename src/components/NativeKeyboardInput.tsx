import React, { useEffect, useRef } from 'react';
import { Keyboard } from 'lucide-react';

interface NativeKeyboardInputProps {
  disabled: boolean;
  onLetterInput: (char: string) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

/**
 * Triggers and captures input directly from the mobile device's native OS keyboard.
 * No custom on-screen keyboard is rendered inside the app.
 */
export const NativeKeyboardInput: React.FC<NativeKeyboardInputProps> = ({
  disabled,
  onLetterInput,
  inputRef,
}) => {
  const internalRef = useRef<HTMLInputElement>(null);
  const resolvedRef = inputRef ?? internalRef;

  const focusNativeKeyboard = () => {
    if (disabled) return;
    resolvedRef.current?.focus();
  };

  useEffect(() => {
    if (!disabled) {
      // Attempt initial focus; mobile browsers will also open it reliably on tap
      resolvedRef.current?.focus();
    }
  }, [disabled, resolvedRef]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) return;

    // Process each typed character (usually 1 character)
    for (const ch of val) {
      onLetterInput(ch);
    }

    // Clear input immediately so the user can type the next letter cleanly
    e.target.value = '';
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hidden input anchored in viewport so iOS/Android slide up the native keyboard smoothly */}
      <input
        ref={resolvedRef}
        type="text"
        lang="mk"
        inputMode="text"
        autoCapitalize="characters"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        disabled={disabled}
        onChange={handleChange}
        aria-label="Внеси буква преку тастатурата на телефонот"
        className="sr-only"
      />

      {!disabled && (
        <button
          type="button"
          onClick={focusNativeKeyboard}
          className="w-full max-w-xs flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-950/50 transition"
        >
          <Keyboard className="w-5 h-5" />
          <span>Отвори тастатура / Внеси буква</span>
        </button>
      )}
    </div>
  );
};
