import { CategoryMeta, WordEntry } from '../types/game';

export const CATEGORIES: CategoryMeta[] = [
  { id: 'all', labelMk: 'Сите категории', icon: '🎲' },
  { id: 'animals', labelMk: 'Животни', icon: '🐾' },
  { id: 'food', labelMk: 'Храна', icon: '🍲' },
  { id: 'nature', labelMk: 'Природа', icon: '🌲' },
  { id: 'objects', labelMk: 'Предмети', icon: '🧭' },
  { id: 'geography', labelMk: 'Географија', icon: '🌍' },
  { id: 'sport', labelMk: 'Спорт', icon: '⚽' },
  { id: 'culture', labelMk: 'Култура', icon: '🎭' },
];

export const MACEDONIAN_ALPHABET = new Set([
  'А', 'Б', 'В', 'Г', 'Д', 'Ѓ', 'Е', 'Ж', 'З', 'Ѕ', 'И',
  'Ј', 'К', 'Л', 'Љ', 'М', 'Н', 'Њ', 'О', 'П', 'Р', 'С',
  'Т', 'Ќ', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Џ', 'Ш'
]);

export const WORDS_DATABASE: WordEntry[] = [
  // ЖИВОТНИ (Animals)
  { id: 'ani-1', word: 'ВОЛК', category: 'animals', description: 'Диво шумско животно, предок на домашното куче.' },
  { id: 'ani-2', word: 'МЕЧКА', category: 'animals', description: 'Големо шумско животно кое спие зимски сон.' },
  { id: 'ani-3', word: 'ЛИСИЦА', category: 'animals', description: 'Итро шумско животно со црвено крзно и долга опашка.' },
  { id: 'ani-4', word: 'ВЕРВЕРИЦА', category: 'animals', description: 'Мало шумско животно кое обожава ореви и лешници.' },
  { id: 'ani-5', word: 'ПЕПЕРУТКА', category: 'animals', description: 'Инсект со шарени крилја кој настанува од гасеница.' },
  { id: 'ani-6', word: 'ОРЕЛ', category: 'animals', description: 'Голема граблива птица со остар вид.' },
  { id: 'ani-7', word: 'ЖЕЛКА', category: 'animals', description: 'Бавно животно кое го носи својот оклоп на грбот.' },
  { id: 'ani-8', word: 'ДЕЛФИН', category: 'animals', description: 'Интелигентен морски цицач познат по својата дружељубивост.' },

  // ХРАНА (Food)
  { id: 'foo-1', word: 'ЛЕБ', category: 'food', description: 'Основен пекарски производ од брашно, вода и квасец.' },
  { id: 'foo-2', word: 'АЈВАР', category: 'food', description: 'Традиционален зимски специјалитет од печени црвени пиперки.' },
  { id: 'foo-3', word: 'БУРЕК', category: 'food', description: 'Познато печиво од тенки кори со сирење или месо.' },
  { id: 'foo-4', word: 'ТАВЧЕ', category: 'food', description: 'Земјен сад во кој се подготвува познатото гравче.' },
  { id: 'foo-5', word: 'ПИНЏУР', category: 'food', description: 'Вкусен намаз од пиперки, домати, модар патлиџан и лук.' },
  { id: 'foo-6', word: 'ПАСТРМАЈЛИЈА', category: 'food', description: 'Традиционална македонска пита со сечкано месо.' },
  { id: 'foo-7', word: 'ЈАБОЛКО', category: 'food', description: 'Овошје кое според поговорката го држи лекарот настрана.' },
  { id: 'foo-8', word: 'ЧОКОЛАДО', category: 'food', description: 'Омилено слатко задоволство направено од какао.' },

  // ПРИРОДА (Nature)
  { id: 'nat-1', word: 'РЕКА', category: 'nature', description: 'Природен воден тек кој се влева во езеро или море.' },
  { id: 'nat-2', word: 'ШУМА', category: 'nature', description: 'Голема површина густо обрасната со дрвја.' },
  { id: 'nat-3', word: 'ПЛАНИНА', category: 'nature', description: 'Високо возвишение на земјината површина со врвови.' },
  { id: 'nat-4', word: 'ВОДОПАД', category: 'nature', description: 'Место каде што реката стрмно паѓа од височина.' },
  { id: 'nat-5', word: 'ВИНОЖИТО', category: 'nature', description: 'Шарен лак на небото по дожд кога ќе изгрее сонце.' },
  { id: 'nat-6', word: 'ОБЛАК', category: 'nature', description: 'Видлива маса од водени капки што лебди на небото.' },
  { id: 'nat-7', word: 'ИЗВОР', category: 'nature', description: 'Место каде подземната вода избива на површината.' },

  // ПРЕДМЕТИ (Objects)
  { id: 'obj-1', word: 'КЛУЧ', category: 'objects', description: 'Метален предмет со кој се отклучува брава.' },
  { id: 'obj-2', word: 'ЧАСОВНИК', category: 'objects', description: 'Направа што го покажува точното време.' },
  { id: 'obj-3', word: 'ОГЛЕДАЛО', category: 'objects', description: 'Стаклена површина во која се гледа сопствениот одраз.' },
  { id: 'obj-4', word: 'ТЕЛЕФОН', category: 'objects', description: 'Уред за комуникација на далечина кој секогаш го носиме.' },
  { id: 'obj-5', word: 'ЧАДОР', category: 'objects', description: 'Предмет кој нè штити од дожд или силно сонце.' },
  { id: 'obj-6', word: 'КНИГА', category: 'objects', description: 'Поврзани печатени страници полни со приказни или знаење.' },
  { id: 'obj-7', word: 'НОЖИЦИ', category: 'objects', description: 'Алатка со две сечила за сечење хартија или ткаенина.' },

  // ГЕОГРАФИЈА (Geography)
  { id: 'geo-1', word: 'ОХРИД', category: 'geography', description: 'Македонски град на брегот на едно од најстарите езера.' },
  { id: 'geo-2', word: 'ВАРДАР', category: 'geography', description: 'Најдолгата река во Македонија.' },
  { id: 'geo-3', word: 'ПЕЛИСТЕР', category: 'geography', description: 'Национален парк и највисок врв на Баба Планина.' },
  { id: 'geo-4', word: 'СКОПЈЕ', category: 'geography', description: 'Главниот и најголем град на Македонија.' },
  { id: 'geo-5', word: 'МАВРОВО', category: 'geography', description: 'Познат скијачки центар и национален парк со вештачко езеро.' },
  { id: 'geo-6', word: 'ОСТРОВ', category: 'geography', description: 'Копно од сите страни опкружено со вода.' },
  { id: 'geo-7', word: 'КОНТИНЕНТ', category: 'geography', description: 'Една од седумте најголеми копнени целини на Земјата.' },

  // СПОРТ (Sport)
  { id: 'spo-1', word: 'ФУДБАЛ', category: 'sport', description: 'Најпопуларниот екипен спорт во светот со 11 играчи.' },
  { id: 'spo-2', word: 'РАКОМЕТ', category: 'sport', description: 'Екипен спорт со топка во кој Македонија има големи успеси.' },
  { id: 'spo-3', word: 'КОШАРКА', category: 'sport', description: 'Спорт во кој целта е да се уфрли топката во обрач.' },
  { id: 'spo-4', word: 'ТЕНИС', category: 'sport', description: 'Спорт со рекет и жолто топче преку мрежа.' },
  { id: 'spo-5', word: 'ПЛИВАЊЕ', category: 'sport', description: 'Движење низ вода со помош на рацете и нозете.' },
  { id: 'spo-6', word: 'СКИЈАЊЕ', category: 'sport', description: 'Зимски спорт на снег со специјални штици на нозете.' },
  { id: 'spo-7', word: 'СТАДИОН', category: 'sport', description: 'Голем објект со трибини каде се играат натпревари.' },

  // КУЛТУРА (Culture)
  { id: 'cul-1', word: 'ТЕАТАР', category: 'culture', description: 'Уметност и зграда каде актери изведуваат претстави во живо.' },
  { id: 'cul-2', word: 'МУЗИКА', category: 'culture', description: 'Уметност на комбинирање звуци, ритам и мелодија.' },
  { id: 'cul-3', word: 'ГАЈДА', category: 'culture', description: 'Традиционален македонски дувачки народен инструмент.' },
  { id: 'cul-4', word: 'ТАПАН', category: 'culture', description: 'Голем традиционален ударен инструмент со два стапа.' },
  { id: 'cul-5', word: 'СЛИКАРСТВО', category: 'culture', description: 'Ликовна уметност на нанесување бои на платно.' },
  { id: 'cul-6', word: 'ФИЛМ', category: 'culture', description: 'Подвижни слики раскажани како приказна на големо платно.' },
  { id: 'cul-7', word: 'БИБЛИОТЕКА', category: 'culture', description: 'Место каде се чуваат и изнајмуваат книги за читање.' },
];
