import { TestQuestion } from '../types/math';

export const TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 'tq-1',
    topic: 'Tenglamalar',
    question: '4x - 7 = 17 tenglamaning ildizini toping.',
    options: ['x = 5', 'x = 6', 'x = 4', 'x = 7'],
    correctOptionIndex: 1, // x = 6 (4x = 24 => x = 6)
    explanation: '4x = 17 + 7 => 4x = 24 => x = 24 ÷ 4 = 6.',
  },
  {
    id: 'tq-2',
    topic: 'Kasrlar',
    question: '3/5 + 1/4 yig‘indisini hisoblang.',
    options: ['4/9', '17/20', '7/20', '19/20'],
    correctOptionIndex: 1, // 17/20
    explanation: 'EKUK(5, 4) = 20. 3/5 = 12/20 va 1/4 = 5/20. (12 + 5)/20 = 17/20.',
  },
  {
    id: 'tq-3',
    topic: 'Foizlar',
    question: '300 sonining 25 foizi nechaga teng?',
    options: ['60', '75', '80', '50'],
    correctOptionIndex: 1, // 75
    explanation: '(300 · 25) ÷ 100 = 75.',
  },
  {
    id: 'tq-4',
    topic: 'Darajalar',
    question: '(a⁴ · a³) ÷ a⁵ ifodani soddalashtiring.',
    options: ['a²', 'a³', 'a', 'a⁶'],
    correctOptionIndex: 0, // a²
    explanation: 'a^(4+3) = a⁷. a⁷ ÷ a⁵ = a^(7-5) = a².',
  },
  {
    id: 'tq-5',
    topic: 'Algebraik ifodalar',
    question: 'Agar x = 3, y = -2 bo‘lsa, 2x² - 3y ifodaning qiymatini toping.',
    options: ['24', '12', '18', '20'],
    correctOptionIndex: 0, // 24
    explanation: '2 · (3)² - 3 · (-2) = 2 · 9 - (-6) = 18 + 6 = 24.',
  },
  {
    id: 'tq-6',
    topic: 'Geometriya',
    question: 'Uchburchakning ichki burchaklari yig‘indisi necha gradusga teng?',
    options: ['90°', '180°', '270°', '360°'],
    correctOptionIndex: 1, // 180°
    explanation: 'Ixtiyoriy uchburchakning ichki burchaklari yig‘indisi har doim 180° ga teng bo‘ladi.',
  },
  {
    id: 'tq-7',
    topic: 'Geometriya',
    question: 'Bo‘yi 12 cm va eni 5 cm bo‘lgan to‘g‘ri to‘rtburchakning perimetri qancha?',
    options: ['60 cm', '34 cm', '17 cm', '24 cm'],
    correctOptionIndex: 1, // 34 cm
    explanation: 'P = 2 · (a + b) = 2 · (12 + 5) = 2 · 17 = 34 cm.',
  },
  {
    id: 'tq-8',
    topic: 'Proporsiya',
    question: '4 : x = 12 : 15 proporsiyadan x noma’lumni toping.',
    options: ['5', '3', '6', '4'],
    correctOptionIndex: 0, // 5
    explanation: 'Proporsiya xossasi: 12 · x = 4 · 15 => 12x = 60 => x = 5.',
  },
  {
    id: 'tq-9',
    topic: 'Sonlar',
    question: '|-18| + |-6| - |10| ifodaning qiymati necha?',
    options: ['14', '2', '24', '-14'],
    correctOptionIndex: 0, // 14
    explanation: '18 + 6 - 10 = 24 - 10 = 14.',
  },
  {
    id: 'tq-10',
    topic: 'Statistika',
    question: '6, 8, 10, 16 sonlarining o‘rta arifmetigini toping.',
    options: ['9', '10', '11', '12'],
    correctOptionIndex: 1, // 10
    explanation: '(6 + 8 + 10 + 16) ÷ 4 = 40 ÷ 4 = 10.',
  },
];
