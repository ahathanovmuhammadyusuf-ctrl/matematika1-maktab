import React from 'react';
import { ArrowRight, Sparkles, BookOpen, Brain, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onStartPractice: () => void;
  onOpenAI: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartPractice, onOpenAI }) => {
  const floatingSymbols = [
    { symbol: '+', top: '12%', left: '8%', delay: '0s', size: 'text-3xl sm:text-4xl' },
    { symbol: '−', top: '24%', right: '12%', delay: '1s', size: 'text-3xl sm:text-5xl' },
    { symbol: '×', top: '65%', left: '6%', delay: '2s', size: 'text-2xl sm:text-4xl' },
    { symbol: '÷', top: '75%', right: '10%', delay: '1.5s', size: 'text-3xl sm:text-4xl' },
    { symbol: '√', top: '18%', left: '42%', delay: '0.5s', size: 'text-2xl sm:text-3xl' },
    { symbol: 'π', top: '35%', left: '88%', delay: '2.5s', size: 'text-2xl sm:text-4xl' },
    { symbol: 'x', top: '82%', left: '35%', delay: '3s', size: 'text-2xl sm:text-3xl' },
    { symbol: 'y', top: '70%', right: '30%', delay: '2.2s', size: 'text-2xl sm:text-3xl' },
    { symbol: '%', top: '15%', right: '28%', delay: '1.8s', size: 'text-2xl sm:text-3xl' },
    { symbol: '=', top: '80%', left: '75%', delay: '0.8s', size: 'text-3xl sm:text-4xl' },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-blue-50/50 via-slate-50 to-white dark:from-slate-900/40 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800/80">
      {/* Decorative Floating Math Background Elements */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        {floatingSymbols.map((item, idx) => (
          <span
            key={idx}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              animationDelay: item.delay,
            }}
            className={`absolute font-mono font-bold text-slate-300/40 dark:text-slate-700/30 ${item.size} ${
              idx % 2 === 0 ? 'animate-float-slow' : 'animate-float-reverse'
            }`}
          >
            {item.symbol}
          </span>
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-medium mb-6 border border-blue-200/60 dark:border-blue-800/60 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>7-sinf o‘quvchilari uchun interaktiv matematika dasturi</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-none mb-6">
          7-sinf matematikasini <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-400 dark:via-indigo-300 dark:to-blue-500">
            oson o‘rganing
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10">
          Mavzularni o‘rganing, masalalarni yeching va AI yordamchidan foydalaning.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
          <button
            onClick={onStartPractice}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <span>Masalalarni boshlash</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenAI}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-base border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>AI yordamchi</span>
          </button>
        </div>

        {/* Quick Highlights */}
        <div className="mt-12 pt-8 border-t border-slate-200/60 dark:border-slate-800/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-2">
            <span className="block text-2xl font-bold text-slate-900 dark:text-white">24 ta</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Darslik mavzulari</span>
          </div>
          <div className="p-2">
            <span className="block text-2xl font-bold text-slate-900 dark:text-white">Bosqichma-bosqich</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">AI masala yechimi</span>
          </div>
          <div className="p-2">
            <span className="block text-2xl font-bold text-slate-900 dark:text-white">Interaktiv</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Mashqlar va testlar</span>
          </div>
          <div className="p-2">
            <span className="block text-2xl font-bold text-slate-900 dark:text-white">100% O‘zbekcha</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Oddiy va tushunarli</span>
          </div>
        </div>
      </div>
    </section>
  );
};
