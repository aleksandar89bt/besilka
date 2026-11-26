export type CategoryId =
  | 'all'
  | 'animals'
  | 'food'
  | 'nature'
  | 'objects'
  | 'geography'
  | 'sport'
  | 'culture';

export type WordLengthFilter = 'all' | 4 | 5 | 6 | 7 | '8+';

export type GameStatus = 'playing' | 'won' | 'lost';

export type HintType = 'letter' | 'description';

export interface WordEntry {
  id: string;
  word: string; // Uppercase Macedonian Cyrillic
  category: Exclude<CategoryId, 'all'>;
  description: string;
}

export interface CategoryMeta {
  id: CategoryId;
  labelMk: string;
  icon: string;
}
