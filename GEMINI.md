# Pogodi Go Zborot (Guess the Word)

A React + TypeScript + Vite + Tailwind CSS Hangman-style word guessing game.

## Tech Stack
- **Framework:** React 18 (TypeScript)
- **Bundler:** Vite
- **Styling:** Tailwind CSS + PostCSS
- **Icons:** Lucide React

## Development Scripts
- `npm run dev` - Start development server
- `npm run build` - Typecheck (`tsc`) and build for production (`vite build`)
- `npm run preview` - Preview production build locally

## Architecture & Conventions
- **Components:** Functional React components located in `src/components/`.
- **Hooks:** Custom hooks (e.g., `useHangman`) located in `src/hooks/`.
- **Services:** Business logic and data services located in `src/services/`.
- **Types:** Shared TypeScript interfaces and types in `src/types/`.
- **Data:** Static game data and word lists in `src/data/`.
- **Styling:** Use Tailwind CSS utility classes adhering to existing design patterns.
