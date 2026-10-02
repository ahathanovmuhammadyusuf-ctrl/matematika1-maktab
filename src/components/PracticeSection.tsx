import React, { useState } from 'react';
import { CheckCircle, AlertCircle, HelpCircle, ArrowRight, Sparkles, RefreshCw, Check } from 'lucide-react';
import { PracticeProblem, StudentProgress } from '../types/math';
import { PRACTICE_PROBLEMS } from '../data/practiceData';

interface PracticeSectionProps {
  progress: StudentProgress;
  onUpdateProgress: (problemId: string, isCorrect: boolean) => void;
}

export const PracticeSection: React.FC<PracticeSectionProps> = ({
  progress,
  onUpdateProgress,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Barchasi');
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const categories = ['Barchasi', 'Tenglamalar', 'Kasrlar', 'Foizlar', 'Algebra', 'Darajalar', 'Geometriya', 'Funksiyalar'];

  const filteredProblems = PRACTICE_PROBLEMS.filter(
    (p) => selectedCategory === 'Barchasi' || p.category === selectedCategory
  );

  const problem = filteredProblems[currentProblemIndex] || PRACTICE_PROBLEMS[0];

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentProblemIndex(0);
    resetProblemState();
  };

  const resetProblemState = () => {
    setUserAnswer('');
    setStatus('idle');
    setShowHint(false);
    setShowSolution(false);
  };

  const handleCheck = () => {
    if (!userAnswer.trim()) return;
    const cleanUser = userAnswer.trim().toLowerCase().replace(/\s+/g, '');
    const isCorrect = problem.correctAnswers.some(
      (ans) => ans.trim().toLowerCase().replace(/\s+/g, '') === cleanUser
    );

    if (isCorrect) {
      setStatus('correct');
      onUpdateProgress(problem.id, true);
    } else {
      setStatus('incorrect');
      onUpdateProgress(problem.id, false);
    }
  };

  const handleNextProblem = () => {
    const nextIdx = (currentProblemIndex + 1) % filteredProblems.length;
    setCurrentProblemIndex(nextIdx);
    resetProblemState();
  };

  const isAlreadySolvedCorrectly = progress.correctPracticeIds.includes(problem.id);

  return (
    <section id="masalalar" className="py-12 sm:py-16 bg-slate-50/70 dark:bg-slate-950/70 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-3">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Interaktiv Amaliyot</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Matematika Masalalari
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Topshiriqlarni mustaqil ishlang, javobingizni tekshiring va natijani mustahkamlang.
            </p>
          </div>

          <div className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
            Masala: {currentProblemIndex + 1} / {filteredProblems.length}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Problem Card */}
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm transition-all">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {problem.category}
              </span>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase ${
                  problem.difficulty === 'oson'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                    : problem.difficulty === 'orta'
                    ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                    : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                }`}
              >
                {problem.difficulty}
              </span>
            </div>

            {isAlreadySolvedCorrectly && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <Check className="w-3.5 h-3.5" />
                <span>Oldin to‘g‘ri yechilgan</span>
              </span>
            )}
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-relaxed">
              {problem.question}
            </h3>
          </div>

          {/* Input Box and Check Button */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 flex items-center">
              {problem.inputPrefix && (
                <span className="absolute left-3.5 text-slate-500 font-mono font-semibold text-sm sm:text-base select-none">
                  {problem.inputPrefix}
                </span>
              )}
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => {
                  setUserAnswer(e.target.value);
                  if (status !== 'idle') setStatus('idle');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCheck();
                }}
                placeholder={problem.inputPlaceholder || 'Javobingizni kiriting'}
                className={`w-full ${
                  problem.inputPrefix ? 'pl-14' : 'pl-4'
                } pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-base text-slate-900 dark:text-white placeholder-slate-400 font-mono focus:outline-none focus:ring-2 transition-all ${
                  status === 'correct'
                    ? 'border-emerald-500 focus:ring-emerald-500 bg-emerald-50/30'
                    : status === 'incorrect'
                    ? 'border-rose-400 focus:ring-rose-400 bg-rose-50/30'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-emerald-500'
                }`}
              />
            </div>

            <button
              onClick={handleCheck}
              disabled={!userAnswer.trim()}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold text-sm sm:text-base transition-colors shadow-xs cursor-pointer"
            >
              Tekshirish
            </button>
          </div>

          {/* Status Feedback */}
          {status === 'correct' && (
            <div className="mt-5 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 flex items-center justify-between gap-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2.5 font-bold text-sm sm:text-base">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>To‘g‘ri! 🎉 Barakalla.</span>
              </div>
              <button
                onClick={handleNextProblem}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs sm:text-sm font-semibold hover:bg-emerald-700 transition-colors cursor-pointer"
              >
                <span>Keyingi masala</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {status === 'incorrect' && (
            <div className="mt-5 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-sm flex items-center justify-between gap-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>Yana bir bor urinib ko‘ring.</span>
              </div>
              <button
                onClick={() => setShowHint(true)}
                className="text-xs font-semibold underline text-rose-700 dark:text-rose-300 hover:text-rose-900 cursor-pointer"
              >
                Yordam kerakmi?
              </button>
            </div>
          )}

          {/* Hint Card */}
          {showHint && (
            <div className="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm">
              <div className="flex items-center gap-2 font-bold mb-1">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>Maslahat (Yordam):</span>
              </div>
              <p>{problem.hint}</p>
            </div>
          )}

          {/* Full Solution Card */}
          {showSolution && (
            <div className="mt-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm">
              <span className="font-bold text-slate-900 dark:text-white block mb-2">
                To‘liq bosqichma-bosqich yechim:
              </span>
              <div className="space-y-1.5 font-mono text-slate-700 dark:text-slate-300">
                {problem.stepByStepSolution.map((s, idx) => (
                  <div key={idx}>{s}</div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Controls: Hint, Solution, Skip */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-colors cursor-pointer"
              >
                {showHint ? 'Yordamni yashirish' : 'Yordam (Maslahat)'}
              </button>

              <button
                onClick={() => setShowSolution(!showSolution)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-colors cursor-pointer"
              >
                {showSolution ? 'Yechimni yashirish' : 'Yechimni ko‘rish'}
              </button>
            </div>

            <button
              onClick={handleNextProblem}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-semibold transition-colors cursor-pointer"
            >
              <span>Boshqa masala</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
