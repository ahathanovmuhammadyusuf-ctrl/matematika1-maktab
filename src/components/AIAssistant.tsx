import React, { useState } from 'react';
import { Brain, Sparkles, Send, Trash2, Check, Copy, AlertCircle, ArrowRight, CornerDownLeft } from 'lucide-react';
import { AISolveResult } from '../types/math';

export const AIAssistant: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AISolveResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const sampleQuestions = [
    '2x + 5 = 17',
    '3/4 + 2/5',
    '150 ning 20% i nechaga teng?',
    '(a + b)^2',
    '5x - 8 = 2x + 7',
    'Bo‘yi 8 cm va eni 6 cm to‘g‘ri to‘rtburchak perimetri',
    'x : 6 = 15 : 10 proporsiyadan x ni toping',
    '2^5 + 3^2',
  ];

  const handleSolve = async (queryText?: string) => {
    const textToSubmit = (queryText !== undefined ? queryText : question).trim();
    if (!textToSubmit) {
      setError('Iltimos, avval matematik savol yoki masalani kiriting.');
      return;
    }

    setLoading(true);
    setError(null);
    if (queryText !== undefined) {
      setQuestion(queryText);
    }

    try {
      const response = await fetch('/api/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: textToSubmit }),
      });

      if (!response.ok) {
        throw new Error('Serverdan javob olishda xatolik yuz berdi.');
      }

      const data: AISolveResult = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(
        'Savolni yechishda aloqa uzildi. Iltimos, internet aloqasini tekshiring yoki savolni qayta yuboring.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSolve();
    }
  };

  const handleClear = () => {
    setQuestion('');
    setResult(null);
    setError(null);
  };

  const handleCopy = () => {
    if (!result) return;
    const textToCopy = `Savol: ${result.question}\n\nYechish bosqichlari:\n${result.steps.join(
      '\n'
    )}\n\nYakuniy javob: ${result.answer}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="ai-yordamchi" className="py-12 sm:py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/70 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-3">
            <Brain className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Aqlli Matematika Repetitori</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            AI Matematika Yordamchisi
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-xl mx-auto">
            Istalgan 7-sinf matematik savolingizni yozing. Sun’iy intellekt uni bosqichma-bosqich o‘zbek tilida tushuntirib beradi.
          </p>
        </div>

        {/* Input Box Card */}
        <div className="rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-slate-800/80 p-4 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="relative">
            <textarea
              rows={3}
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Matematik savolingizni yozing... (Masalan: 2x + 5 = 17 yoki 3/4 + 2/5)"
              className="w-full p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none leading-relaxed transition-all"
            />
          </div>

          {/* Quick Examples */}
          <div className="mt-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">
              Namunaviy savollar:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {sampleQuestions.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSolve(sample)}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 hover:bg-purple-50 dark:hover:bg-purple-950/60 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-300 text-xs font-medium border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
            <button
              onClick={handleClear}
              disabled={!question && !result}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 text-xs font-medium disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Tozalash</span>
            </button>

            <button
              onClick={() => handleSolve()}
              disabled={loading || !question.trim()}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold text-sm shadow-xs hover:shadow transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Yechilmoqda...</span>
                </>
              ) : (
                <>
                  <span>Yechish</span>
                  <CornerDownLeft className="w-4 h-4 opacity-75 hidden sm:inline" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mt-4 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-sm flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="mt-6 rounded-2xl bg-white dark:bg-slate-900 p-8 border border-slate-200 dark:border-slate-800 text-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto mb-3 animate-bounce">
              <span className="font-bold text-xl">∑</span>
            </div>
            <p className="text-slate-900 dark:text-white font-semibold text-base">
              Masala yechilmoqda...
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              7-sinf qoidalari asosida bosqichma-bosqich yechim tayyorlanmoqda.
            </p>
          </div>
        )}

        {/* AI Result Card */}
        {result && !loading && (
          <div className="mt-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md animate-in fade-in slide-in-from-bottom-2 duration-200">
            {/* Header info */}
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">
                  ✓
                </span>
                <div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                    {result.category}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                title="Yechimni nusxalash"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Nusxalandi' : 'Nusxalash'}</span>
              </button>
            </div>

            {/* Question */}
            <div className="mt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Savol
              </span>
              <p className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mt-0.5">
                {result.question}
              </p>
            </div>

            {/* Yechish (Steps) */}
            <div className="mt-5">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-2">
                Bosqichma-bosqich yechish
              </span>
              <div className="space-y-2 bg-slate-50 dark:bg-slate-800/40 p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm sm:text-base text-slate-800 dark:text-slate-200 font-mono leading-relaxed">
                {result.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="text-purple-500 shrink-0 font-bold">•</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Yakuniy javob */}
            <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                Yakuniy javob
              </span>
              <div className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-300 font-mono">
                {result.answer.startsWith('Javob:') ? result.answer : `Javob: ${result.answer}`}
              </div>
            </div>

            {/* Tips / Rules reminder */}
            {result.tips && (
              <div className="mt-4 flex items-start gap-2.5 p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs sm:text-sm">
                <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Eslatma:</strong> {result.tips}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
