import { StudentProgress } from '../types/math';

const THEME_KEY = 'matematika_7_theme';
const FONT_SIZE_KEY = 'matematika_7_font_size';
const PROGRESS_KEY = 'matematika_7_progress';

export type FontSizeOption = 'sm' | 'normal' | 'lg' | 'xl';

export function getStoredTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return 'light';
}

export function setStoredTheme(theme: 'light' | 'dark'): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(THEME_KEY, theme);
  const root = document.documentElement;
  const body = document.body;
  if (theme === 'dark') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
    if (body) {
      body.classList.add('dark');
      body.setAttribute('data-theme', 'dark');
    }
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    if (body) {
      body.classList.remove('dark');
      body.setAttribute('data-theme', 'light');
    }
  }
}

export function getStoredFontSize(): FontSizeOption {
  if (typeof window === 'undefined') return 'normal';
  const saved = localStorage.getItem(FONT_SIZE_KEY) as FontSizeOption;
  if (['sm', 'normal', 'lg', 'xl'].includes(saved)) {
    return saved;
  }
  return 'normal';
}

export function setStoredFontSize(size: FontSizeOption): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(FONT_SIZE_KEY, size);
  // Apply font size class to root or body
  document.documentElement.classList.remove('text-size-sm', 'text-size-normal', 'text-size-lg', 'text-size-xl');
  document.documentElement.classList.add(`text-size-${size}`);
}

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

const defaultProgress: StudentProgress = {
  solvedPracticeIds: [],
  correctPracticeIds: [],
  completedTopicIds: [1], // Topic 1 completed by default as welcome
  testsTaken: 0,
  bestTestScore: 0,
  lastTestScore: 0,
  todaySolved: 0,
  todayCorrect: 0,
  lastActiveDate: getTodayString(),
};

export function getStoredProgress(): StudentProgress {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw) as StudentProgress;
    const today = getTodayString();
    // If date changed, reset today's counters
    if (parsed.lastActiveDate !== today) {
      parsed.todaySolved = 0;
      parsed.todayCorrect = 0;
      parsed.lastActiveDate = today;
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: StudentProgress): void {
  if (typeof window === 'undefined') return;
  try {
    progress.lastActiveDate = getTodayString();
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save student progress to localStorage', e);
  }
}
