import { Topic } from '../types/math';

export const TOPICS: Topic[] = [
  {
    id: 1,
    slug: 'algebraik-ifodalar',
    title: 'Algebraik ifodalar',
    category: 'Algebra',
    difficulty: 'oson',
    iconName: 'Variable',
    summary: 'Harflar, sonlar va arifmetik amallar qatnashgan ifodalar haqida asosiy tushunchalar.',
    detailedExplanation:
      'Algebraik ifoda — sonlar va o‘zgaruvchilar (harflar) arifmetik amallar hamda qavslar yordamida birlashtirilgan matematik ifodadir. Masalan, 3x + 5y - 7. Harflar o‘rniga aniq sonlar qo‘yilganda ifodaning son qiymati topiladi.',
    formulas: [
      { name: 'Algebraik yig‘indi', formula: 'a + b = b + a', explanation: 'O‘rin almashtirish qonuni' },
      { name: 'Taqsimot qonuni', formula: 'a(b + c) = ab + ac', explanation: 'Qavslarni ochishda har bir hadga ko‘paytiriladi' },
    ],
    examples: [
      {
        title: 'Ifodaning son qiymatini hisoblash',
        problem: 'Agar x = 4 bo‘lsa, 3x + 7 ifodaning qiymatini toping.',
        solutionSteps: [
          '1. Ifodadagi x o‘rniga 4 sonini qo‘yamiz: 3 · (4) + 7',
          '2. Ko‘paytirish amalini bajaramiz: 3 · 4 = 12',
          '3. Qo‘shish amalini bajaramiz: 12 + 7 = 19',
        ],
        finalAnswer: '19',
      },
    ],
    practice: [
      { id: 't1-p1', question: 'Agar a = 3 va b = 5 bo‘lsa, 2a + 4b ifodaning qiymati nechaga teng?', answer: '26', hint: '2 · 3 + 4 · 5 amalini bajaring' },
    ],
  },
  {
    id: 2,
    slug: 'birhadlar',
    title: 'Birhadlar',
    category: 'Algebra',
    difficulty: 'oson',
    iconName: 'Boxes',
    summary: 'Sonli va harfli ko‘paytuvchilardan tashkil topgan algebraik ifodalar.',
    detailedExplanation:
      'Faqat sonlar, o‘zgaruvchilar va ularning natural darajalarining ko‘paytmasidan iborat bo‘lgan algebraik ifoda birhad deyiladi. Birhadning standart shaklida faqat bitta sonli ko‘paytuvchi (koeffitsiyent) oldinda yoziladi.',
    formulas: [
      { name: 'Standart shakl', formula: 'k · x^n · y^m', explanation: 'k — koeffitsiyent, n va m — o‘zgaruvchilarning darajalari' },
      { name: 'Birhad darajasi', formula: 'deg = n + m', explanation: 'Barcha harflar daraja ko‘rsatkichlari yig‘indisi' },
    ],
    examples: [
      {
        title: 'Standart shaklga keltirish',
        problem: '3x² · (-2)xy³ birhadni standart shaklga keltiring.',
        solutionSteps: [
          '1. Koeffitsiyentlarni ko‘paytiramiz: 3 · (-2) = -6',
          '2. Bir xil asosli o‘zgaruvchilar darajalarini qo‘shamiz: x² · x = x³',
          '3. y o‘zgaruvchisini yozamiz: y³',
          '4. Natija: -6x³y³',
        ],
        finalAnswer: '-6x³y³',
      },
    ],
    practice: [
      { id: 't2-p1', question: '4a²b³ birhadning darajasi nechaga teng?', answer: '5', hint: 'a ning darajasi 2 va b ning darajasi 3 ni qo‘shing (2 + 3)' },
    ],
  },
  {
    id: 3,
    slug: 'kophadlar',
    title: 'Ko‘phadlar',
    category: 'Algebra',
    difficulty: 'orta',
    iconName: 'Layers',
    summary: 'Bir nechta birhadlarning algebraik yig‘indisi va o‘xshash hadlarni ixchamlash.',
    detailedExplanation:
      'Birhadlarning algebraik yig‘indisi ko‘phad deb ataladi. Ko‘phad tarkibidagi faqat koeffitsiyentlari bilan farq qiladigan birhadlar o‘xshash hadlar deyiladi. O‘xshash hadlarni ixchamlash algebraik hisoblashlarning asosi hisoblanadi.',
    formulas: [
      { name: 'O‘xshash hadlarni qo‘shish', formula: 'ax + bx = (a + b)x', explanation: 'Taqsimot qonuniga asosan koeffitsiyentlar qo‘shiladi' },
    ],
    examples: [
      {
        title: 'O‘xshash hadlarni ixchamlash',
        problem: '5x² - 3x + 2x² + 7x - 4 ifodani soddalashtiring.',
        solutionSteps: [
          '1. x² li hadlarni guruhlaymiz: 5x² + 2x² = (5 + 2)x² = 7x²',
          '2. x li hadlarni guruhlaymiz: -3x + 7x = (-3 + 7)x = 4x',
          '3. Ozod hadni qo‘shamiz: -4',
          '4. Yig‘indi: 7x² + 4x - 4',
        ],
        finalAnswer: '7x² + 4x - 4',
      },
    ],
    practice: [
      { id: 't3-p1', question: '7a + 4b - 3a + 2b ifodani soddalashtirganda a ning koeffitsiyenti necha bo‘ladi?', answer: '4', hint: '7a - 3a = 4a' },
    ],
  },
  {
    id: 4,
    slug: 'darajalar',
    title: 'Darajalar',
    category: 'Sonlar va Kasrlar',
    difficulty: 'oson',
    iconName: 'Superscript',
    summary: 'Natural ko‘rsatkichli daraja tushunchasi va uning xossalari.',
    detailedExplanation:
      'a sonining n natural darajasi (a^n) deb, har biri a ga teng bo‘lgan n ta ko‘paytuvchining ko‘paytmasiga aytiladi: a^n = a · a · ... · a (n marta). Har qanday a ≠ 0 son uchun a⁰ = 1 qabul qilinadi.',
    formulas: [
      { name: 'Daraja ta’rifi', formula: 'a^n = a · a · ... · a (n ta)', explanation: 'a — asos, n — daraja ko‘rsatkichi' },
      { name: 'Nolinchi daraja', formula: 'a⁰ = 1  (a ≠ 0)', explanation: 'Noldan farqli har qanday sonning 0-darajasi 1 ga teng' },
    ],
    examples: [
      {
        title: 'Darajani hisoblash',
        problem: '2⁵ va 3⁴ qiymatlarini toping.',
        solutionSteps: [
          '1. 2⁵ = 2 · 2 · 2 · 2 · 2 = 32',
          '2. 3⁴ = 3 · 3 · 3 · 3 = 81',
        ],
        finalAnswer: '32 va 81',
      },
    ],
    practice: [
      { id: 't4-p1', question: '4³ ifodaning qiymatini hisoblang.', answer: '64', hint: '4 · 4 · 4 amalini bajaring' },
    ],
  },
  {
    id: 5,
    slug: 'darajalar-ustida-amallar',
    title: 'Darajalar ustida amallar',
    category: 'Algebra',
    difficulty: 'orta',
    iconName: 'Calculator',
    summary: 'Bir xil asosli darajalarni ko‘paytirish, bo‘lish va darajaga ko‘tarish qoidalari.',
    detailedExplanation:
      'Bir xil asosli darajalarni ko‘paytirishda asos o‘zgarishsiz qolib, ko‘rsatkichlar qo‘shiladi. Bo‘lishda esa asos saqlanib, ko‘rsatkichlar ayiriladi.',
    formulas: [
      { name: 'Ko‘paytirish', formula: 'a^n · a^m = a^(n + m)', explanation: 'Daraja ko‘rsatkichlari qo‘shiladi' },
      { name: 'Bo‘lish', formula: 'a^n ÷ a^m = a^(n - m)', explanation: 'Daraja ko‘rsatkichlari ayiriladi' },
      { name: 'Darajani darajaga ko‘tarish', formula: '(a^n)^m = a^(n · m)', explanation: 'Daraja ko‘rsatkichlari ko‘paytiriladi' },
      { name: 'Ko‘paytmaning darajasi', formula: '(ab)^n = a^n · b^n', explanation: 'Har bir ko‘paytuvchi darajaga ko‘tariladi' },
    ],
    examples: [
      {
        title: 'Darajalar ustida amallar',
        problem: '(x³ · x⁴) ÷ x⁵ ifodani soddalashtiring.',
        solutionSteps: [
          '1. Qavs ichidagi ko‘paytirish: x³ · x⁴ = x^(3+4) = x⁷',
          '2. Bo‘lish amalini bajaramiz: x⁷ ÷ x⁵ = x^(7-5) = x²',
        ],
        finalAnswer: 'x²',
      },
    ],
    practice: [
      { id: 't5-p1', question: '(2³)² ning qiymati nechaga teng?', answer: '64', hint: '2^(3·2) = 2⁶ = 64' },
    ],
  },
  {
    id: 6,
    slug: 'bir-ozgaruvchili-tenglamalar',
    title: 'Bir o‘zgaruvchili tenglamalar',
    category: 'Algebra',
    difficulty: 'oson',
    iconName: 'Equal',
    summary: 'Chiziqli tenglama tushunchasi, tenglama ildizi va uning teng kuchliligi.',
    detailedExplanation:
      'Bir o‘zgaruvchili chiziqli tenglama — ax = b ko‘rinishidagi tenglamadir, bunda a va b berilgan sonlar, x — noma’lum o‘zgaruvchi. Tenglamani to‘g‘ri sonli tenglikka aylantiruvchi son tenglamaning ildizi deyiladi.',
    formulas: [
      { name: 'Standart chiziqli tenglama', formula: 'ax = b', explanation: 'x = b ÷ a (agar a ≠ 0 bo‘lsa)' },
    ],
    examples: [
      {
        title: 'Chiziqli tenglama',
        problem: '4x = 28 tenglamani yeching.',
        solutionSteps: [
          '1. Noma’lum x oldidagi koeffitsiyent 4 ga teng.',
          '2. Tenglikning ikkala tomonini 4 ga bo‘lamiz: x = 28 ÷ 4',
          '3. x = 7',
        ],
        finalAnswer: 'x = 7',
      },
    ],
    practice: [
      { id: 't6-p1', question: '6x = 42 tenglamaning ildizini toping.', answer: '7', hint: '42 ni 6 ga bo‘ling' },
    ],
  },
  {
    id: 7,
    slug: 'tenglamalarni-yechish',
    title: 'Tenglamalarni yechish',
    category: 'Algebra',
    difficulty: 'orta',
    iconName: 'CheckCircle2',
    summary: 'Hadlarni ko‘chirish, qavslarni ochish va umumiy maxrajga keltirish usullari.',
    detailedExplanation:
      'Murakkabroq tenglamalarni yechishda avval qavslar ochiladi, so‘ng noma’lum qatnashgan hadlar tenglikning chap tomoniga, ozod sonlar esa qarama-qarshi ishora bilan o‘ng tomoniga o‘tkaziladi.',
    formulas: [
      { name: 'Hadlarni ko‘chirish qoidasi', formula: 'ax + c = bx + d  =>  ax - bx = d - c', explanation: 'Had boshqa tomonga teskari ishora bilan o‘tadi' },
    ],
    examples: [
      {
        title: 'Tenglama yechish bosqichlari',
        problem: '3x + 5 = 20 - 2x tenglamani yeching.',
        solutionSteps: [
          '1. -2x ni chapga (+2x), +5 ni o‘ngga (-5) ko‘chiramiz: 3x + 2x = 20 - 5',
          '2. O‘xshash hadlarni ixchamlaymiz: 5x = 15',
          '3. x = 15 ÷ 5',
          '4. x = 3',
        ],
        finalAnswer: 'x = 3',
      },
    ],
    practice: [
      { id: 't7-p1', question: '5x - 7 = 18 tenglamani yeching.', answer: '5', hint: '5x = 18 + 7 => 5x = 25' },
    ],
  },
  {
    id: 8,
    slug: 'proporsiya',
    title: 'Proporsiya',
    category: 'Sonlar va Kasrlar',
    difficulty: 'oson',
    iconName: 'Divide',
    summary: 'Ikki nisbatning tengligi va proporsiyaning asosiy xossasi.',
    detailedExplanation:
      'Ikki nisbatning tengligi proporsiya deyiladi: a : b = c : d yoki a/b = c/d. Proporsiyaning asosiy xossasi: chetki hadlar ko‘paytmasi o‘rta hadlar ko‘paytmasiga teng: a · d = b · c.',
    formulas: [
      { name: 'Proporsiyaning asosiy xossasi', formula: 'a · d = b · c', explanation: 'Chetki hadlar ko‘paytmasi = o‘rta hadlar ko‘paytmasi' },
      { name: 'Noma’lum hadni topish', formula: 'x = (b · c) ÷ a', explanation: 'Noma’lum chetki hadni hisoblash' },
    ],
    examples: [
      {
        title: 'Noma’lum hadni topish',
        problem: 'x : 6 = 15 : 10 proporsiyadagi x ni toping.',
        solutionSteps: [
          '1. Proporsiya xossasi: x · 10 = 6 · 15',
          '2. 10x = 90',
          '3. x = 90 ÷ 10 = 9',
        ],
        finalAnswer: 'x = 9',
      },
    ],
    practice: [
      { id: 't8-p1', question: '3/x = 9/12 proporsiyadan x ni toping.', answer: '4', hint: '3 · 12 = 9 · x => 36 = 9x' },
    ],
  },
  {
    id: 9,
    slug: 'foizlar',
    title: 'Foizlar',
    category: 'Sonlar va Kasrlar',
    difficulty: 'orta',
    iconName: 'Percent',
    summary: 'Sonning foizini topish, foiziga ko‘ra sonni topish va foiz nisbatini hisoblash.',
    detailedExplanation:
      'Butunning yuzdan bir ulushi foiz deyiladi (1% = 1/100 = 0.01). Masalalarda uch turdagi foiz hisoblash mavjud: sonning foizini topish, foiziga ko‘ra sonning o‘zini topish, va ikki sonning foiz nisbatini aniqlash.',
    formulas: [
      { name: 'Sonning p% ini topish', formula: 'b = (a · p) ÷ 100', explanation: 'a sonining p foizi' },
      { name: 'Foiziga ko‘ra sonni topish', formula: 'a = (b · 100) ÷ p', explanation: 'p foizi b ga teng bo‘lgan son' },
    ],
    examples: [
      {
        title: 'Sonning foizini topish',
        problem: '250 sonining 20% ini toping.',
        solutionSteps: [
          '1. Formulaga qo‘yamiz: (250 · 20) ÷ 100',
          '2. 5000 ÷ 100 = 50',
        ],
        finalAnswer: '50',
      },
    ],
    practice: [
      { id: 't9-p1', question: '80 ning 25% i nechaga teng?', answer: '20', hint: '80 · 0.25 yoki (80 · 25)/100' },
    ],
  },
  {
    id: 10,
    slug: 'ratsional-sonlar',
    title: 'Ratsional sonlar',
    category: 'Sonlar va Kasrlar',
    difficulty: 'orta',
    iconName: 'Binary',
    summary: 'm/n ko‘rinishidagi barcha musbat, manfiy sonlar va nolning to‘plami.',
    detailedExplanation:
      'm/n ko‘rinishida yozilishi mumkin bo‘lgan sonlar ratsional sonlar deyiladi (m — butun son, n — natural son). Barcha butun va kasr sonlar ratsional sonlar to‘plamiga (Q) kiradi.',
    formulas: [
      { name: 'Ratsional son shakli', formula: 'Q = { m/n | m ∈ Z, n ∈ N }', explanation: 'm — butun, n — natural' },
    ],
    examples: [
      {
        title: 'Ratsional sonlar ustida amallar',
        problem: '-3/5 + 1/2 ifodani hisoblang.',
        solutionSteps: [
          '1. Umumiy maxraj 10: -6/10 + 5/10',
          '2. Suratlarni qo‘shamiz: (-6 + 5) / 10 = -1/10',
        ],
        finalAnswer: '-1/10 (yoki -0.1)',
      },
    ],
    practice: [
      { id: 't10-p1', question: '(-4) · (-2.5) ko‘paytmasi nechaga teng?', answer: '10', hint: 'Ikkita manfiy son ko‘paytmasi musbat bo‘ladi: 4 · 2.5 = 10' },
    ],
  },
  {
    id: 11,
    slug: 'musbat-va-manfiy-sonlar',
    title: 'Musbat va manfiy sonlar',
    category: 'Sonlar va Kasrlar',
    difficulty: 'oson',
    iconName: 'PlusCircle',
    summary: 'Koordinata to‘g‘ri chizig‘i, son moduli va qarama-qarshi sonlar.',
    detailedExplanation:
      'Noldan o‘ngda musbat, chapda manfiy sonlar joylashadi. Sonning moduli (|a|) deb son koordinatasi va sanoq boshi (0) orasidagi masofaga aytiladi. Masofa har doim manfiy bo‘lmaydi.',
    formulas: [
      { name: 'Modul qoidasi', formula: '|a| = a (agar a ≥ 0), |a| = -a (agar a < 0)', explanation: 'Modul har doim musbat yoki nol' },
    ],
    examples: [
      {
        title: 'Modulni hisoblash',
        problem: '|-8| + |5| - |-3| ifodaning qiymatini toping.',
        solutionSteps: [
          '1. Modullarni ochamiz: |-8| = 8, |5| = 5, |-3| = 3',
          '2. Hisoblaymiz: 8 + 5 - 3 = 10',
        ],
        finalAnswer: '10',
      },
    ],
    practice: [
      { id: 't11-p1', question: '|-15| - |7| ifodaning qiymati necha?', answer: '8', hint: '15 - 7 = 8' },
    ],
  },
  {
    id: 12,
    slug: 'kasrlar',
    title: 'Kasrlar',
    category: 'Sonlar va Kasrlar',
    difficulty: 'orta',
    iconName: 'Sliders',
    summary: 'Oddiy kasrlar ustida to‘rtta asosiy arifmetik amal va qisqartirish.',
    detailedExplanation:
      'Kasrlarni qo‘shish va ayirishda umumiy maxraj topiladi (EKUK). Ko‘paytirishda suratlar o‘zaro, maxrajlar o‘zaro ko‘paytiriladi. Bo‘lishda esa ikkinchi kasr teskarisiga aylantiriladi.',
    formulas: [
      { name: 'Qo‘shish', formula: 'a/c + b/c = (a+b)/c', explanation: 'Bir xil maxrajli kasrlar' },
      { name: 'Ko‘paytirish', formula: 'a/b · c/d = (a·c)/(b·d)', explanation: 'Surat suratga, maxraj maxrajga' },
      { name: 'Bo‘lish', formula: 'a/b ÷ c/d = a/b · d/c', explanation: 'Bo‘luvchi kasr to‘ntariladi' },
    ],
    examples: [
      {
        title: 'Kasrlarni qo‘shish',
        problem: '3/4 + 2/5 ifodani hisoblang.',
        solutionSteps: [
          '1. Maxrajlar 4 va 5 uchun EKUK = 20',
          '2. Kasrlarni keltiramiz: 3/4 = 15/20 va 2/5 = 8/20',
          '3. Suratlarni qo‘shamiz: (15 + 8) / 20 = 23/20 = 1 butun 3/20',
        ],
        finalAnswer: '23/20',
      },
    ],
    practice: [
      { id: 't12-p1', question: '5/6 - 1/3 ifodaning qiymatini qisqarmaydigan kasr ko‘rinishida yozing (masalan 1/2).', answer: '1/2', hint: '5/6 - 2/6 = 3/6 = 1/2' },
    ],
  },
  {
    id: 13,
    slug: 'onli-kasrlar',
    title: 'O‘nli kasrlar',
    category: 'Sonlar va Kasrlar',
    difficulty: 'oson',
    iconName: 'Hash',
    summary: 'O‘nli kasrlarni qo‘shish, ayirish, ko‘paytirish, bo‘lish va yaxlitlash.',
    detailedExplanation:
      'Maxraji 10, 100, 1000 bo‘lgan kasrlar o‘nli kasr shaklida vergul bilan yoziladi. Ko‘paytirishda vergul hisobga olinmasdan ko‘paytiriladi va natijada ikkala ko‘paytuvchidagi verguldan keyingi raqamlar sonicha ajratiladi.',
    formulas: [
      { name: 'O‘nli kasrga o‘tish', formula: '1/2 = 0.5; 1/4 = 0.25; 3/4 = 0.75', explanation: 'Asosiy o‘nli kasr ekvivalentlari' },
    ],
    examples: [
      {
        title: 'O‘nli kasrlarni ko‘paytirish',
        problem: '2.5 · 0.4 ni hisoblang.',
        solutionSteps: [
          '1. Vergulsiz ko‘paytiramiz: 25 · 4 = 100',
          '2. Verguldan keyingi raqamlar soni: 1 + 1 = 2 ta',
          '3. 100 da o‘ngdan 2 ta raqam ajratamiz: 1.00 = 1',
        ],
        finalAnswer: '1',
      },
    ],
    practice: [
      { id: 't13-p1', question: '1.2 · 0.3 ko‘paytmasini hisoblang.', answer: '0.36', hint: '12 · 3 = 36, verguldan so‘ng 2 ta raqam bo‘ladi' },
    ],
  },
  {
    id: 14,
    slug: 'funksiya-tushunchasi',
    title: 'Funksiya tushunchasi',
    category: 'Algebra',
    difficulty: 'orta',
    iconName: 'GitBranch',
    summary: 'Erkli va erksiz o‘zgaruvchilar, funksional bog‘lanish va aniqlanish sohasi.',
    detailedExplanation:
      'x to‘plamdagi har bir elementga y to‘plamdagi yagona element mos keluvchi qoida funksiya deyiladi: y = f(x). x — erkli o‘zgaruvchi (argument), y — erksiz o‘zgaruvchi (funksiya qiymati).',
    formulas: [
      { name: 'Funksiya formulasi', formula: 'y = f(x)', explanation: 'x — argument, y — funksiya' },
    ],
    examples: [
      {
        title: 'Funksiya qiymatini topish',
        problem: 'y = 3x - 4 funksiya berilgan. Agar x = 5 bo‘lsa, y ni toping.',
        solutionSteps: [
          '1. x o‘rniga 5 qo‘yamiz: y = 3 · (5) - 4',
          '2. 15 - 4 = 11',
        ],
        finalAnswer: 'y = 11',
      },
    ],
    practice: [
      { id: 't14-p1', question: 'f(x) = 2x + 7 bo‘lsa, f(3) ning qiymati nechaga teng?', answer: '13', hint: '2 · 3 + 7 = 6 + 7 = 13' },
    ],
  },
  {
    id: 15,
    slug: 'koordinata-tekisligi',
    title: 'Koordinata tekisligi',
    category: 'Geometriya',
    difficulty: 'oson',
    iconName: 'Grid',
    summary: 'O‘zaro perpendikulyar koordinata o‘qlari (Ox, Oy), choraklar va nuqtaning koordinatalari.',
    detailedExplanation:
      'Tekislikda o‘zaro perpendikulyar bo‘lgan ikkita son o‘qi (gorizontal Ox — abssissa, vertikal Oy — ordinata) to‘g‘ri burchakli koordinatalar sistemasini hosil qiladi. Tekislik 4 ta chorakka bo‘linadi.',
    formulas: [
      { name: 'Nuqta koordinatasi', formula: 'A(x; y)', explanation: 'x — abssissa, y — ordinata' },
      { name: 'Boshlang‘ich nuqta', formula: 'O(0; 0)', explanation: 'Koordinatalar boshi' },
    ],
    examples: [
      {
        title: 'Nuqtaning o‘rni',
        problem: 'P(-3; 5) nuqta qaysi koordinata choragida joylashgan?',
        solutionSteps: [
          '1. x = -3 (manfiy), y = 5 (musbat)',
          '2. x < 0 va y > 0 bo‘lgan soha II chorakka to‘g‘ri keladi.',
        ],
        finalAnswer: 'II chorak',
      },
    ],
    practice: [
      { id: 't15-p1', question: 'B(4; -2) nuqta nechanchi koordinata choragida joylashgan? (I, II, III, IV)', answer: 'IV', hint: 'x musbat (+), y manfiy (-) bo‘lsa IV chorak bo‘ladi' },
    ],
  },
  {
    id: 16,
    slug: 'chiziqli-funksiya',
    title: 'Chiziqli funksiya',
    category: 'Algebra',
    difficulty: 'orta',
    iconName: 'TrendingUp',
    summary: 'y = kx + b funksiyasi, uning grafigi va burchak koeffitsiyenti.',
    detailedExplanation:
      'y = kx + b ko‘rinishidagi funksiya chiziqli funksiya deyiladi (k va b — o‘zgarmas sonlar). Uning grafigi to‘g‘ri chiziqdan iborat. k soni burchak koeffitsiyenti deb ataladi. Agar k > 0 bo‘lsa, funksiya o‘suvchi, k < 0 bo‘lsa kamayuvchi bo‘ladi.',
    formulas: [
      { name: 'Chiziqli funksiya', formula: 'y = kx + b', explanation: 'k — burchak koeffitsiyenti, b — Oy o‘qi bilan kesishish nuqtasi' },
      { name: 'To‘g‘ri proporsionallik', formula: 'y = kx  (b = 0 bo‘lganda)', explanation: 'Grafik koordinatalar boshidan (0;0) o‘tadi' },
    ],
    examples: [
      {
        title: 'Grafikning kesishish nuqtasini topish',
        problem: 'y = 2x - 6 to‘g‘ri chiziqning Ox o‘qi bilan kesishish nuqtasini toping.',
        solutionSteps: [
          '1. Ox o‘qida y = 0 bo‘ladi: 0 = 2x - 6',
          '2. 2x = 6  =>  x = 3',
          '3. Kesishish nuqtasi: (3; 0)',
        ],
        finalAnswer: '(3; 0)',
      },
    ],
    practice: [
      { id: 't16-p1', question: 'y = -4x + 8 to‘g‘ri chiziq Oy o‘qini qaysi ordinatada kesib o‘tadi (y = ?)?', answer: '8', hint: 'x = 0 bo‘lganda y = b = 8' },
    ],
  },
  {
    id: 17,
    slug: 'geometriya-asoslari',
    title: 'Geometriya asoslari',
    category: 'Geometriya',
    difficulty: 'oson',
    iconName: 'Shapes',
    summary: 'Nuqta, to‘g‘ri chiziq, nur, kesma va ularning o‘zaro joylashuvi.',
    detailedExplanation:
      'Geometriyaning asosiy boshlang‘ich tushunchalari — nuqta va to‘g‘ri chiziqdir. Ikkita nuqtani tutashtiruvchi to‘g‘ri chiziq qismi kesma deyiladi. Bitta nuqtadan boshlanib cheksiz davom etuvchi qism nur deyiladi.',
    formulas: [
      { name: 'Kesma uzunligi', formula: 'AB = AC + CB', explanation: 'C nuqta AB kesmada yotsa' },
    ],
    examples: [
      {
        title: 'Kesma uzunligini hisoblash',
        problem: 'AB kesmada C nuqta olingan. AC = 8 cm, CB = 5 cm bo‘lsa, AB kesma uzunligini toping.',
        solutionSteps: [
          '1. AB = AC + CB qoidasiga ko‘ra',
          '2. AB = 8 + 5 = 13 cm',
        ],
        finalAnswer: '13 cm',
      },
    ],
    practice: [
      { id: 't17-p1', question: 'MN = 18 cm, K nuqta MN kesmaning o‘rtasi bo‘lsa, MK kesma uzunligi necha cm?', answer: '9', hint: '18 ÷ 2 = 9 cm' },
    ],
  },
  {
    id: 18,
    slug: 'uchburchaklar',
    title: 'Uchburchaklar',
    category: 'Geometriya',
    difficulty: 'orta',
    iconName: 'Triangle',
    summary: 'Uchburchak turlari, ichki burchaklar yig‘indisi va tenglik alomatlari.',
    detailedExplanation:
      'Bir to‘g‘ri chiziqda yotmaydigan uchta nuqta va ularni tutashtiruvchi uchta kesmadan hosil bo‘lgan shakl uchburchak deyiladi. Har qanday uchburchakning ichki burchaklari yig‘indisi doimo 180° ga teng.',
    formulas: [
      { name: 'Ichki burchaklar yig‘indisi', formula: 'α + β + γ = 180°', explanation: 'Har qanday uchburchak uchun o‘rinli' },
      { name: 'Tenglik alomatlari', formula: 'TBT, BTT, TTT', explanation: 'Tomon-Burchak-Tomon va boshqalar' },
    ],
    examples: [
      {
        title: 'Noma’lum burchakni topish',
        problem: 'Uchburchakning ikki burchagi 50° va 70° bo‘lsa, uchinchi burchakni toping.',
        solutionSteps: [
          '1. Ichki burchaklar yig‘indisi: α + β + γ = 180°',
          '2. 50° + 70° + γ = 180°',
          '3. 120° + γ = 180°  =>  γ = 180° - 120° = 60°',
        ],
        finalAnswer: '60°',
      },
    ],
    practice: [
      { id: 't18-p1', question: 'To‘g‘ri burchakli uchburchakning bitta o‘tkir burchagi 35° bo‘lsa, ikkinchi o‘tkir burchagi necha gradus?', answer: '55', hint: '90° - 35° = 55°' },
    ],
  },
  {
    id: 19,
    slug: 'tortburchaklar',
    title: 'To‘rtburchaklar',
    category: 'Geometriya',
    difficulty: 'orta',
    iconName: 'Square',
    summary: 'Parallelogramm, to‘g‘ri to‘rtburchak, romb va kvadratning xossalari.',
    detailedExplanation:
      'To‘rtta burchakka ega bo‘lgan yopiq ko‘pburchak to‘rtburchak deyiladi. To‘g‘ri to‘rtburchak — barcha burchaklari to‘g‘ri (90°) bo‘lgan parallelogrammdir. Kvadrat esa barcha tomonlari teng bo‘lgan to‘g‘ri to‘rtburchakdir.',
    formulas: [
      { name: 'To‘rtburchak ichki burchaklari', formula: 'Σ = 360°', explanation: 'Barcha to‘rtburchaklar uchun doimiydir' },
      { name: 'Parallelogramm xossasi', formula: 'Qarama-qarshi tomonlar va burchaklar teng', explanation: 'a = a, b = b' },
    ],
    examples: [
      {
        title: 'Parallelogramm burchaklari',
        problem: 'Parallelogrammning bitta burchagi 70° bo‘lsa, qolgan burchaklarini toping.',
        solutionSteps: [
          '1. Qarama-qarshi burchak teng: 70°',
          '2. Bir tomonga yopishgan burchaklar yig‘indisi 180° ga teng: 180° - 70° = 110°',
          '3. Burchaklar: 70°, 110°, 70°, 110°',
        ],
        finalAnswer: '70°, 110°, 70°, 110°',
      },
    ],
    practice: [
      { id: 't19-p1', question: 'Rombning bitta burchagi 60° bo‘lsa, unga qo‘shni burchagi necha gradus?', answer: '120', hint: '180° - 60° = 120°' },
    ],
  },
  {
    id: 20,
    slug: 'perimetr',
    title: 'Perimetr',
    category: 'Geometriya',
    difficulty: 'oson',
    iconName: 'Maximize2',
    summary: 'Geometrik shakllarning barcha tomonlari uzunliklari yig‘indisini hisoblash.',
    detailedExplanation:
      'Har qanday ko‘pburchakning perimetri — uning barcha tomonlari uzunliklarining yig‘indisidir. Perimetr P harfi bilan belgilanadi va uzunlik o‘lchov birliklarida (mm, cm, m) o‘lchanadi.',
    formulas: [
      { name: 'To‘g‘ri to‘rtburchak perimetri', formula: 'P = 2 · (a + b)', explanation: 'a — bo‘yi, b — eni' },
      { name: 'Kvadrat perimetri', formula: 'P = 4 · a', explanation: 'a — tomoni' },
      { name: 'Uchburchak perimetri', formula: 'P = a + b + c', explanation: 'Uchala tomoni yig‘indisi' },
    ],
    examples: [
      {
        title: 'To‘g‘ri to‘rtburchak perimetri',
        problem: 'Bo‘yi 8 cm, eni 5 cm bo‘lgan to‘g‘ri to‘rtburchakning perimetrini hisoblang.',
        solutionSteps: [
          '1. Formulani yozamiz: P = 2 · (a + b)',
          '2. Qiymatlarni qo‘yamiz: P = 2 · (8 + 5)',
          '3. P = 2 · 13 = 26 cm',
        ],
        finalAnswer: '26 cm',
      },
    ],
    practice: [
      { id: 't20-p1', question: 'Tomoni 7 cm bo‘lgan kvadratning perimetri necha cm?', answer: '28', hint: '4 · 7 = 28 cm' },
    ],
  },
  {
    id: 21,
    slug: 'yuza',
    title: 'Yuza',
    category: 'Geometriya',
    difficulty: 'orta',
    iconName: 'Box',
    summary: 'Kvadrat, to‘g‘ri to‘rtburchak va uchburchaklar yuzasini topish formulalari.',
    detailedExplanation:
      'Yuza — tekislikdagi shakl egallagan maydon o‘lchovidir. S harfi bilan belgilanadi va kvadrat birliklarda (cm², m²) o‘lchanadi.',
    formulas: [
      { name: 'To‘g‘ri to‘rtburchak yuzi', formula: 'S = a · b', explanation: 'Bo‘yi va eni ko‘paytmasi' },
      { name: 'Kvadrat yuzi', formula: 'S = a²', explanation: 'Tomoni kvadrati' },
      { name: 'To‘g‘ri burchakli uchburchak yuzi', formula: 'S = (a · b) ÷ 2', explanation: 'Katetlar ko‘paytmasining yarmi' },
      { name: 'Ixtiyoriy uchburchak yuzi', formula: 'S = (a · h) ÷ 2', explanation: 'Asosi va balandligi ko‘paytmasining yarmi' },
    ],
    examples: [
      {
        title: 'Uchburchak yuzasini hisoblash',
        problem: 'Asosi 10 cm va unga tushirilgan balandligi 6 cm bo‘lgan uchburchakning yuzini toping.',
        solutionSteps: [
          '1. Formulani qo‘llaymiz: S = (a · h) ÷ 2',
          '2. S = (10 · 6) ÷ 2 = 60 ÷ 2 = 30 cm²',
        ],
        finalAnswer: '30 cm²',
      },
    ],
    practice: [
      { id: 't21-p1', question: 'Bo‘yi 9 cm va eni 4 cm bo‘lgan to‘g‘ri to‘rtburchakning yuzi necha cm²?', answer: '36', hint: '9 · 4 = 36 cm²' },
    ],
  },
  {
    id: 22,
    slug: 'burchaklar',
    title: 'Burchaklar',
    category: 'Geometriya',
    difficulty: 'oson',
    iconName: 'Compass',
    summary: 'O‘tkir, to‘g‘ri, o‘tmas, yoyiq burchaklar hamda qo‘shni va vertikal burchaklar.',
    detailedExplanation:
      'Bitta nuqtadan chiquvchi ikki nurdan iborat shakl burchak deyiladi. 90° li burchak to‘g‘ri, 90° dan kichik burchak o‘tkir, 90° va 180° oralig‘idagi burchak o‘tmas, 180° li burchak yoyiq burchak deyiladi. Vertikal burchaklar o‘zaro teng bo‘ladi.',
    formulas: [
      { name: 'Qo‘shni burchaklar', formula: 'α + β = 180°', explanation: 'Yig‘indisi doimo 180° ga teng' },
      { name: 'Vertikal burchaklar', formula: 'α = β', explanation: 'Vertikal burchaklar o‘zaro teng' },
    ],
    examples: [
      {
        title: 'Qo‘shni burchakni topish',
        problem: 'Qo‘shni burchaklardan biri 65° bo‘lsa, ikkinchisini toping.',
        solutionSteps: [
          '1. Qo‘shni burchaklar yig‘indisi 180° ga teng.',
          '2. β = 180° - 65° = 115°',
        ],
        finalAnswer: '115°',
      },
    ],
    practice: [
      { id: 't22-p1', question: 'Ikkita to‘g‘ri chiziq kesishganda hosil bo‘lgan burchaklardan biri 40° bo‘lsa, unga vertikal burchak necha gradus?', answer: '40', hint: 'Vertikal burchaklar o‘zaro teng' },
    ],
  },
  {
    id: 23,
    slug: 'parallel-va-perpendikulyar-chiziqlar',
    title: 'Parallel va perpendikulyar chiziqlar',
    category: 'Geometriya',
    difficulty: 'orta',
    iconName: 'Columns',
    summary: 'Kesishmaydigan to‘g‘ri chiziqlar (a || b) va to‘g‘ri burchak ostida kesishuvchilar (a ⊥ b).',
    detailedExplanation:
      'Tekislikda hech qachon kesishmaydigan ikkita to‘g‘ri chiziq parallel chiziqlar deyiladi (a || b). O‘zaro 90° li burchak ostida kesishuvchi to‘g‘ri chiziqlar perpendikulyar deyiladi (a ⊥ b). Paralellarni kesuvchi to‘g‘ri chiziq kesib o‘tganda ichki almashinuvchi burchaklar teng bo‘ladi.',
    formulas: [
      { name: 'Parallel belgisi', formula: 'a || b', explanation: 'Kesishmaydi' },
      { name: 'Perpendikulyar belgisi', formula: 'a ⊥ b', explanation: 'Burchagi 90°' },
    ],
    examples: [
      {
        title: 'Almashinuvchi burchaklar',
        problem: 'a || b to‘g‘ri chiziqlarni c to‘g‘ri chiziq kesib o‘tganda, ichki bir tomonli burchaklardan biri 125° bo‘lsa, ikkinchisini toping.',
        solutionSteps: [
          '1. Ichki bir tomonli burchaklar yig‘indisi 180° ga teng.',
          '2. Ikkinchi burchak = 180° - 125° = 55°',
        ],
        finalAnswer: '55°',
      },
    ],
    practice: [
      { id: 't23-p1', question: 'Parallel to‘g‘ri chiziqlarni kesuvchi to‘g‘ri chiziq kesganda ichki almashinuvchi burchaklardan biri 75° bo‘lsa, ikkinchisi necha gradus?', answer: '75', hint: 'Ichki almashinuvchi burchaklar o‘zaro teng bo‘ladi' },
    ],
  },
  {
    id: 24,
    slug: 'statistik-malumotlar',
    title: 'Statistik ma’lumotlar',
    category: 'Statistika',
    difficulty: 'oson',
    iconName: 'BarChart2',
    summary: 'O‘rta arifmetik, moda, mediana va ma’lumotlar qatori ko‘lami.',
    detailedExplanation:
      'Statistika ma’lumotlarni to‘plash va tahlil qilish bilan shug‘ullanadi. O‘rta arifmetik — barcha sonlar yig‘indisini ularning soniga bo‘linganiga aytiladi. Moda — eng ko‘p uchraydigan son, mediana esa tartiblangan qatorning o‘rtasidagi sondir.',
    formulas: [
      { name: 'O‘rta arifmetik', formula: 'X̄ = (x₁ + x₂ + ... + xₙ) ÷ n', explanation: 'Yig‘indining soniga nisbati' },
      { name: 'Qator ko‘lami', formula: 'R = Xmax - Xmin', explanation: 'Eng katta va eng kichik qiymat ayirmasi' },
    ],
    examples: [
      {
        title: 'O‘rta arifmetikni topish',
        problem: '4, 8, 12, 16 sonlarining o‘rta arifmetigini toping.',
        solutionSteps: [
          '1. Yig‘indini hisoblaymiz: 4 + 8 + 12 + 16 = 40',
          '2. Sonlar soni: 4 ta',
          '3. O‘rta arifmetik: 40 ÷ 4 = 10',
        ],
        finalAnswer: '10',
      },
    ],
    practice: [
      { id: 't24-p1', question: '5, 9, 10 sonlarining o‘rta arifmetigi nechaga teng?', answer: '8', hint: '(5 + 9 + 10) / 3 = 24 / 3 = 8' },
    ],
  },
];
