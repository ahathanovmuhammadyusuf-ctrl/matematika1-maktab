import React, { useState } from 'react';
import { FileCheck, ArrowRight, ArrowLeft, RotateCcw, CheckCircle2, XCircle, Award, Sparkles } from 'lucide-react';
import { TEST_QUESTIONS } from '../data/testData';
import { StudentProgress } from '../types/math';

interface TestSectionProps {
  progress: StudentProgress;
  onTestCompleted: (score: number, total: number) => void;
}

export const TestSection: React.FC<TestSectionProps> = ({
  progress,
  onTestCompleted,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const totalQuestions = TEST_QUESTIONS.length;
  const currentQuestion = TEST_QUESTIONS[currentQuestionIndex];
  const progressPercent = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (optionIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishTest();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    TEST_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        correctCount += 1;
      }
    });
    return correctCount;
  };

  const finishTest = () => {
    const score = calculateScore();
    setIsCompleted(true);
    onTestCompleted(score, totalQuestions);
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
  };

  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <section id="test" className="py-12 sm:py-16 bg-slate-50/60 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 text-xs font-semibold mb-3">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Bilimni Sinash Tizimi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            7-sinf Matematika Testi
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
            Mavzular bo‘yicha bilimingizni tekshiring va natijangizni baholang.
          </p>
        </div>

        {!isCompleted ? (
          /* Ongoing Quiz Card */
          <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            {/* Progress Header */}
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
              <span>
                Savol: {currentQuestionIndex + 1} / {totalQuestions}
              </span>
              <span>{progressPercent}% bajarildi</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Topic Badge */}
            <div className="mb-3">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                {currentQuestion.topic}
              </span>
            </div>

            {/* Question Text */}
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6 leading-relaxed">
              {currentQuestion.question}
            </h3>

            {/* Multiple Choice Options */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === idx;
                const optionLabel = ['A', 'B', 'C', 'D'][idx];
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border text-sm sm:text-base font-medium flex items-center gap-3.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/60 text-blue-900 dark:text-white shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {optionLabel}
                    </span>
                    <span className="flex-1">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Oldingi</span>
              </button>

              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestionIndex] === undefined}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold transition-all shadow-xs cursor-pointer"
              >
                <span>
                  {currentQuestionIndex === totalQuestions - 1
                    ? 'Testni yakunlash'
                    : 'Keyingi savol'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Final Results Card */
          <div className="rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
              Test yakunlandi
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
              Natijangiz
            </h3>

            <div className="my-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 max-w-sm mx-auto border border-slate-100 dark:border-slate-800">
              <div className="text-4xl sm:text-5xl font-extrabold text-blue-600 dark:text-blue-400">
                {score} / {totalQuestions}
              </div>
              <div className="text-sm font-bold text-slate-700 dark:text-slate-300 mt-2">
                {percentage}% to‘g‘ri javob
              </div>
              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {percentage >= 80
                  ? 'Ajoyib natija! 7-sinf mavzularini yaxshi o‘zlashtirgansiz. 🎉'
                  : percentage >= 60
                  ? 'Yaxshi natija! Ba’zi mavzular ustida yana ishlash foydali bo‘ladi. 👍'
                  : 'Qayta takrorlash tavsiya etiladi. Mavzular bo‘limini ko‘rib chiqing. 📚'}
              </div>
            </div>

            {/* Score statistics breakdown */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8 text-left text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <div>
                  <span className="block font-bold">To‘g‘ri javoblar:</span>
                  <span>{score} ta</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-800/60 text-rose-800 dark:text-rose-300 flex items-center gap-2">
                <XCircle className="w-5 h-5 shrink-0" />
                <div>
                  <span className="block font-bold">Noto‘g‘ri:</span>
                  <span>{totalQuestions - score} ta</span>
                </div>
              </div>
            </div>

            {/* Review questions */}
            <div className="text-left mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
                Savollar tahlili va to‘g‘ri javoblar
              </h4>
              <div className="space-y-4">
                {TEST_QUESTIONS.map((q, idx) => {
                  const userChoice = selectedAnswers[idx];
                  const isCorrect = userChoice === q.correctOptionIndex;
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border text-xs sm:text-sm ${
                        isCorrect
                          ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20'
                          : 'border-rose-200 dark:border-rose-900/60 bg-rose-50/30 dark:bg-rose-950/20'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5 font-bold">
                        <span className="text-slate-900 dark:text-white">
                          {idx + 1}. {q.question}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            isCorrect
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          }`}
                        >
                          {isCorrect ? 'To‘g‘ri' : 'Xato'}
                        </span>
                      </div>

                      <div className="text-slate-600 dark:text-slate-400 mt-1">
                        To‘g‘ri javob: <strong className="text-slate-900 dark:text-white">{q.options[q.correctOptionIndex]}</strong>
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 mt-1 text-[11px] leading-relaxed">
                        Tushuntirish: {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Restart button */}
            <div className="mt-8 pt-4">
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Testni qayta topshirish</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
