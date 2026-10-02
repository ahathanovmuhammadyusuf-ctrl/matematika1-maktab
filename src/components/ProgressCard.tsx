import React from 'react';
import { Award, Flame, CheckCircle2, BookOpen, RotateCcw, Target } from 'lucide-react';
import { StudentProgress } from '../types/math';

interface ProgressCardProps {
  progress: StudentProgress;
  totalTopics: number;
  onResetProgress?: () => void;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  progress,
  totalTopics,
  onResetProgress,
}) => {
  const topicsCompletedCount = progress.completedTopicIds.length;
  const topicsProgressPercent = Math.min(
    100,
    Math.round((topicsCompletedCount / totalTopics) * 100)
  );

  const accuracy =
    progress.todaySolved > 0
      ? Math.round((progress.todayCorrect / progress.todaySolved) * 100)
      : 100;

  return (
    <section className="py-8 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
                <Target className="w-3.5 h-3.5" />
                <span>O‘zlashtirish ko‘rsatkichi</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                O‘quvchi statistikasi va natijalari
              </h3>
            </div>

            {onResetProgress && (
              <button
                onClick={onResetProgress}
                className="self-start md:self-auto text-xs text-slate-400 hover:text-rose-500 transition-colors inline-flex items-center gap-1"
                title="Statistikani qayta boshlash"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Natijalarni tozalash</span>
              </button>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
            {/* Bugungi Masalalar */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1">
                Bugungi masalalar:
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {progress.todaySolved}
              </div>
              <span className="text-[11px] text-slate-400">mashq bajarildi</span>
            </div>

            {/* Bugungi To'g'ri */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300 block mb-1">
                Bugun to‘g‘ri yechildi:
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {progress.todayCorrect}
              </div>
              <span className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80">
                aniqlik: {accuracy}%
              </span>
            </div>

            {/* Testlar soni */}
            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
              <span className="text-xs font-medium text-amber-700 dark:text-amber-300 block mb-1">
                Topshirilgan testlar:
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
                {progress.testsTaken}
              </div>
              <span className="text-[11px] text-amber-600/80 dark:text-amber-400/80">
                eng yaxshi: {progress.bestTestScore}/10
              </span>
            </div>

            {/* O'rganilgan mavzular */}
            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
              <span className="text-xs font-medium text-blue-700 dark:text-blue-300 block mb-1">
                O‘rganilgan mavzular:
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                {topicsCompletedCount} / {totalTopics}
              </div>
              <span className="text-[11px] text-blue-600/80 dark:text-blue-400/80">
                {topicsProgressPercent}% o‘zlashtirildi
              </span>
            </div>
          </div>

          {/* Overall curriculum progress bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
              <span>7-sinf matematika darsligi umumiy progressi:</span>
              <span>{topicsProgressPercent}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${topicsProgressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
