import React, { useState } from 'react';
import { Search, X, CheckCircle2, ChevronRight, BookOpen, Sparkles, Filter, Check } from 'lucide-react';
import { Topic, DifficultyLevel, StudentProgress } from '../types/math';
import { TOPICS } from '../data/topicsData';

interface TopicsSectionProps {
  progress: StudentProgress;
  onToggleTopicCompletion: (topicId: number) => void;
}

export const TopicsSection: React.FC<TopicsSectionProps> = ({
  progress,
  onToggleTopicCompletion,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Barchasi');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'barchasi'>('barchasi');
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);

  // Practice check state in topic modal
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>({});
  const [practiceFeedback, setPracticeFeedback] = useState<Record<string, 'correct' | 'incorrect' | null>>({});

  const categories = ['Barchasi', 'Algebra', 'Geometriya', 'Sonlar va Kasrlar', 'Statistika'];
  const difficulties: (DifficultyLevel | 'barchasi')[] = ['barchasi', 'oson', 'orta', 'qiyin'];

  const handleDifficultyCycle = (direction: 'next' | 'prev') => {
    const currentIndex = difficulties.indexOf(selectedDifficulty);
    if (direction === 'next') {
      const nextIndex = (currentIndex + 1) % difficulties.length;
      setSelectedDifficulty(difficulties[nextIndex]);
    } else {
      const prevIndex = (currentIndex - 1 + difficulties.length) % difficulties.length;
      setSelectedDifficulty(difficulties[prevIndex]);
    }
  };

  const filteredTopics = TOPICS.filter((topic) => {
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Barchasi' || topic.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === 'barchasi' || topic.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleCheckPractice = (practiceId: string, correctAnswer: string) => {
    const inputVal = (practiceAnswers[practiceId] || '').trim().toLowerCase();
    const isCorrect = inputVal === correctAnswer.trim().toLowerCase();
    setPracticeFeedback((prev) => ({
      ...prev,
      [practiceId]: isCorrect ? 'correct' : 'incorrect',
    }));
  };

  return (
    <section id="mavzular" className="py-12 sm:py-16 bg-slate-50/60 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Darslik dasturi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              7-sinf matematika mavzulari
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
              Barcha 24 ta mavzu bo‘yicha nazariya, qoidalar, namunaviy yechimlar va amaliy mashqlar.
            </p>
          </div>

          {/* Plus/Minus Difficulty Selector Control */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs self-start md:self-auto">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 px-2">
              Qiyinlik darajasi:
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleDifficultyCycle('prev')}
                title="Oldingi qiyinlik"
                aria-label="Oldingi qiyinlik"
                className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold transition-colors"
              >
                −
              </button>
              <span className="px-2.5 py-0.5 text-xs font-semibold uppercase rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 min-w-[70px] text-center">
                {selectedDifficulty === 'barchasi'
                  ? 'Barchasi'
                  : selectedDifficulty === 'oson'
                  ? 'Oson'
                  : selectedDifficulty === 'orta'
                  ? 'O‘rta'
                  : 'Qiyin'}
              </span>
              <button
                onClick={() => handleDifficultyCycle('next')}
                title="Keyingi qiyinlik"
                aria-label="Keyingi qiyinlik"
                className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar & Category Pills */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Mavzuni qidiring..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTopics.map((topic) => {
            const isCompleted = progress.completedTopicIds.includes(topic.id);
            return (
              <div
                key={topic.id}
                onClick={() => setActiveTopic(topic)}
                className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-slate-900 p-5 sm:p-6 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {topic.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-full uppercase ${
                          topic.difficulty === 'oson'
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                            : topic.difficulty === 'orta'
                            ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                            : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                        }`}
                      >
                        {topic.difficulty}
                      </span>
                      {isCompleted && (
                        <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                    {topic.id}. {topic.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {topic.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                  <span>Mavzuni o‘rganish</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

        {filteredTopics.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              Mos keluvchi mavzu topilmadi. Qidiruv so‘zini o‘zgartirib ko‘ring.
            </p>
          </div>
        )}
      </div>

      {/* Detailed Topic Modal */}
      {activeTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {activeTopic.category}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
                    {activeTopic.difficulty}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {activeTopic.id}. {activeTopic.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveTopic(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Explanation */}
            <div className="py-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Tushuntirish
              </h4>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                {activeTopic.detailedExplanation}
              </p>
            </div>

            {/* Formulas */}
            {activeTopic.formulas.length > 0 && (
              <div className="py-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                  Muhim formulalar va qoidalar
                </h4>
                <div className="space-y-2.5">
                  {activeTopic.formulas.map((f, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                          {f.name}
                        </span>
                      </div>
                      <div className="font-mono font-bold text-base sm:text-lg text-slate-900 dark:text-white my-1">
                        {f.formula}
                      </div>
                      {f.explanation && (
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {f.explanation}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Examples with step-by-step solution */}
            {activeTopic.examples.length > 0 && (
              <div className="py-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                  Namunaviy masala va bosqichma-bosqich yechim
                </h4>
                {activeTopic.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2.5"
                  >
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {ex.title}
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {ex.problem}
                    </p>
                    <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-mono">
                      {ex.solutionSteps.map((step, sIdx) => (
                        <div key={sIdx} className="leading-relaxed">
                          {step}
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      Javob: {ex.finalAnswer}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Practice item in topic */}
            {activeTopic.practice.length > 0 && (
              <div className="py-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
                  Mustaqil mashq
                </h4>
                {activeTopic.practice.map((item) => {
                  const feedback = practiceFeedback[item.id];
                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700"
                    >
                      <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                        {item.question}
                      </p>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={practiceAnswers[item.id] || ''}
                          onChange={(e) =>
                            setPracticeAnswers({ ...practiceAnswers, [item.id]: e.target.value })
                          }
                          placeholder="Javobni kiriting..."
                          className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => handleCheckPractice(item.id, item.answer)}
                          className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Tekshirish
                        </button>
                      </div>

                      {feedback === 'correct' && (
                        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                          To‘g‘ri! 🎉 Ajoyib natija.
                        </p>
                      )}
                      {feedback === 'incorrect' && (
                        <div className="mt-2 text-xs text-rose-600 dark:text-rose-400">
                          <span>Yana bir bor urinib ko‘ring. </span>
                          <span className="text-slate-500 dark:text-slate-400 font-normal">
                            (Yordam: {item.hint})
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Modal Footer: Mark as Completed */}
            <div className="pt-6 mt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => onToggleTopicCompletion(activeTopic.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  progress.completedTopicIds.includes(activeTopic.id)
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {progress.completedTopicIds.includes(activeTopic.id)
                    ? 'O‘rganildi (Yakunlangan)'
                    : 'Mavzuni o‘zlashtirdim'}
                </span>
              </button>

              <button
                onClick={() => setActiveTopic(null)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
