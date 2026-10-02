import React from 'react';
import { BookOpen, CheckCircle, Brain, FileCheck, Calculator, ArrowUpRight, Award, Flame } from 'lucide-react';
import { StudentProgress } from '../types/math';

interface DashboardProps {
  progress: StudentProgress;
  onNavigate: (sectionId: string) => void;
  totalTopics: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ progress, onNavigate, totalTopics }) => {
  const cards = [
    {
      id: 'mavzular',
      title: 'Mavzular',
      countBadge: `${totalTopics} ta mavzu`,
      description: 'Algebra, geometriya, darajalar va kasrlar bo‘yicha to‘liq 7-sinf qo‘llanmalari.',
      buttonText: 'Ko‘rish',
      icon: BookOpen,
      iconColor: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50/80 dark:bg-blue-950/40',
      borderColor: 'border-blue-100 dark:border-blue-900/50',
    },
    {
      id: 'masalalar',
      title: 'Masalalar',
      countBadge: 'Interaktiv mashqlar',
      description: 'O‘z bilimingizni mustahkamlash uchun interaktiv amaliy misollar va darhol tekshirish.',
      buttonText: 'Boshlash',
      icon: CheckCircle,
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-50/80 dark:bg-emerald-950/40',
      borderColor: 'border-emerald-100 dark:border-emerald-900/50',
    },
    {
      id: 'ai-yordamchi',
      title: 'AI Yordamchi',
      countBadge: 'Aqlli repetitor',
      description: 'Istalgan matematik savolingizni yozing. Bosqichma-bosqich oson yechib beradi.',
      buttonText: 'Savol berish',
      icon: Brain,
      iconColor: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50/80 dark:bg-purple-950/40',
      borderColor: 'border-purple-100 dark:border-purple-900/50',
    },
    {
      id: 'test',
      title: 'Test',
      countBadge: 'Bilimni tekshirish',
      description: '7-sinf matematika darsligi asosida tuzilgan test orqali o‘z darajangizni baholang.',
      buttonText: 'Testni boshlash',
      icon: FileCheck,
      iconColor: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-50/80 dark:bg-amber-950/40',
      borderColor: 'border-amber-100 dark:border-amber-900/50',
    },
    {
      id: 'kalkulyator',
      title: 'Kalkulyator',
      countBadge: 'Tezkor hisoblash',
      description: 'Hisob-kitoblarni tez bajaring: daraja, ildiz, qavslar va foiz amallari.',
      buttonText: 'Kalkulyatorni ochish',
      icon: Calculator,
      iconColor: 'text-sky-600 dark:text-sky-400',
      bgColor: 'bg-sky-50/80 dark:bg-sky-950/40',
      borderColor: 'border-sky-100 dark:border-sky-900/50',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Asosiy bo‘limlar
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
            Matematikani chuqur o‘rganish uchun kerakli barcha vositalar bir joyda.
          </p>
        </div>

        {/* Progress Snapshot */}
        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Flame className="w-4 h-4" />
          </div>
          <div className="text-xs">
            <span className="text-slate-500 dark:text-slate-400 block">Bugungi natija:</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {progress.todayCorrect} ta to‘g‘ri yechildi
            </span>
          </div>
        </div>
      </div>

      {/* 5 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 p-6 border border-slate-200/90 dark:border-slate-800 hover:border-blue-400/60 dark:hover:border-blue-500/60 shadow-xs hover:shadow-md transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${card.bgColor} ${card.borderColor} border flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${card.iconColor}`} />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {card.countBadge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              <div>
                <button
                  onClick={() => onNavigate(card.id)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-blue-600 dark:bg-slate-800 dark:hover:bg-blue-600 text-slate-800 hover:text-white dark:text-slate-200 dark:hover:text-white text-sm font-semibold transition-all group-hover:bg-blue-600 group-hover:text-white cursor-pointer"
                >
                  <span>{card.buttonText}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          );
        })}

        {/* 6th Card: Student Progress Summary */}
        <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 shadow-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/20 text-white">
                O‘quvchi hisoboti
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Sizning faolligingiz</h3>
            <p className="text-sm text-blue-100 mb-4">
              Har kuni mashq qiling va darslik mavzularini bosqichma-bosqich o‘zlashtiring.
            </p>
            <div className="grid grid-cols-2 gap-3 py-2 border-t border-white/20 text-xs">
              <div>
                <span className="text-blue-200 block">Yechilgan masalalar:</span>
                <span className="font-bold text-base text-white">{progress.solvedPracticeIds.length} ta</span>
              </div>
              <div>
                <span className="text-blue-200 block">Eng yaxshi test balli:</span>
                <span className="font-bold text-base text-white">{progress.bestTestScore} / 10</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('test')}
            className="w-full mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-900 text-sm font-bold hover:bg-blue-50 transition-colors shadow-xs cursor-pointer"
          >
            Bilimni sinash (Test)
          </button>
        </div>
      </div>
    </div>
  );
};
