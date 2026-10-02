import React, { useState } from 'react';
import { Calculator as CalcIcon, Delete, RotateCcw, History, Sparkles } from 'lucide-react';

interface CalculationHistoryItem {
  expression: string;
  result: string;
}

export const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Safe expression evaluator
  const calculateResult = (expr: string): string => {
    try {
      // Replace display operators with JS operators
      let sanitized = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-')
        .replace(/\^/g, '**');

      // Handle percentage e.g. 50% => (50/100)
      sanitized = sanitized.replace(/(\d+\.?\d*)%/g, '($1/100)');

      // Validate only allowed characters
      if (!/^[0-9\.\+\-\*\/\(\)\s]+$/.test(sanitized)) {
        return 'Xato';
      }

      // Check division by zero
      if (/\/0(?!\.)/.test(sanitized.replace(/\s+/g, ''))) {
        return '0 ga bo‘lib bo‘lmaydi';
      }

      // Evaluate safely
      // eslint-disable-next-line no-eval
      const res = Function(`'use strict'; return (${sanitized})`)();

      if (typeof res !== 'number' || isNaN(res) || !isFinite(res)) {
        return 'Xato';
      }

      // Round to 8 decimal places if needed to avoid floating point artifact
      const rounded = Math.round(res * 100000000) / 100000000;
      return rounded.toString();
    } catch {
      return 'Noto‘g‘ri ifoda';
    }
  };

  const handleDigit = (digit: string) => {
    setHasError(false);
    if (display === '0' || hasError) {
      setDisplay(digit);
    } else {
      setDisplay(display + digit);
    }
  };

  const handleDecimal = () => {
    setHasError(false);
    if (hasError) {
      setDisplay('0.');
      return;
    }
    // Check if the current number segment already has a decimal
    const parts = display.split(/[\+\−\×\÷\(\)]/);
    const lastPart = parts[parts.length - 1];
    if (!lastPart.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (op: string) => {
    setHasError(false);
    if (hasError) return;
    const lastChar = display.slice(-1);
    if (['+', '−', '×', '÷'].includes(lastChar)) {
      setDisplay(display.slice(0, -1) + op);
    } else {
      setDisplay(display + op);
    }
  };

  const handleParenthesis = (p: '(' | ')') => {
    setHasError(false);
    if (display === '0') {
      setDisplay(p);
    } else {
      setDisplay(display + p);
    }
  };

  const handlePercentage = () => {
    setHasError(false);
    if (display !== '0' && !hasError) {
      setDisplay(display + '%');
    }
  };

  const handleSquareRoot = () => {
    setHasError(false);
    try {
      const val = parseFloat(display);
      if (val < 0) {
        setDisplay('Xato (manfiy son)');
        setHasError(true);
        return;
      }
      const res = Math.sqrt(val);
      const rounded = Math.round(res * 100000000) / 100000000;
      setHistory([{ expression: `√(${display})`, result: rounded.toString() }, ...history.slice(0, 9)]);
      setDisplay(rounded.toString());
      setExpression(`√(${val})`);
    } catch {
      setDisplay('Xato');
      setHasError(true);
    }
  };

  const handleSquare = () => {
    setHasError(false);
    try {
      const val = parseFloat(display);
      const res = val * val;
      const rounded = Math.round(res * 100000000) / 100000000;
      setHistory([{ expression: `(${display})²`, result: rounded.toString() }, ...history.slice(0, 9)]);
      setDisplay(rounded.toString());
      setExpression(`(${val})²`);
    } catch {
      setDisplay('Xato');
      setHasError(true);
    }
  };

  const handleToggleSign = () => {
    setHasError(false);
    if (display === '0' || hasError) return;
    if (display.startsWith('-')) {
      setDisplay(display.slice(1));
    } else {
      setDisplay('-' + display);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
    setHasError(false);
  };

  const handleBackspace = () => {
    if (hasError || display.length <= 1) {
      setDisplay('0');
      setHasError(false);
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleEquals = () => {
    if (hasError) return;
    const res = calculateResult(display);
    if (res === 'Xato' || res === 'Noto‘g‘ri ifoda' || res.includes('bo‘lib bo‘lmaydi')) {
      setHasError(true);
      setDisplay(res);
    } else {
      setExpression(display + ' =');
      setHistory([{ expression: display, result: res }, ...history.slice(0, 9)]);
      setDisplay(res);
    }
  };

  return (
    <section id="kalkulyator" className="py-12 sm:py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/70 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 text-xs font-semibold mb-3">
            <CalcIcon className="w-3.5 h-3.5" />
            <span>Matematik Vosita</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Matematika Kalkulyatori
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1">
            Kasrlar, foizlar, qavslar, daraja va kvadrat ildiz hisoblashlari uchun moslashtirilgan.
          </p>
        </div>

        {/* Calculator Outer Box */}
        <div className="max-w-md mx-auto rounded-3xl bg-slate-100 dark:bg-slate-950 p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-xl">
          {/* Display */}
          <div className="relative rounded-2xl bg-white dark:bg-slate-900 p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 mb-4 min-h-[90px] flex flex-col justify-end text-right overflow-hidden shadow-inner">
            <div className="text-xs sm:text-sm font-mono text-slate-400 dark:text-slate-500 h-5 truncate select-none">
              {expression}
            </div>
            <div
              className={`font-mono font-bold tracking-tight truncate select-all ${
                hasError
                  ? 'text-rose-500 text-lg sm:text-xl'
                  : display.length > 12
                  ? 'text-xl sm:text-2xl text-slate-900 dark:text-white'
                  : 'text-2xl sm:text-4xl text-slate-900 dark:text-white'
              }`}
            >
              {display}
            </div>
          </div>

          {/* Calculator Function Row: Extra math controls */}
          <div className="grid grid-cols-4 gap-2 mb-2">
            <button
              onClick={handleSquareRoot}
              className="py-2.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono font-semibold text-sm transition-colors cursor-pointer"
              title="Kvadrat ildiz"
            >
              √x
            </button>
            <button
              onClick={handleSquare}
              className="py-2.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono font-semibold text-sm transition-colors cursor-pointer"
              title="Kvadratga ko‘tarish"
            >
              x²
            </button>
            <button
              onClick={handleToggleSign}
              className="py-2.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono font-semibold text-sm transition-colors cursor-pointer"
              title="Ishorani o‘zgartirish (+/-)"
            >
              ±
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`py-2.5 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                showHistory
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
              title="Hisoblash tarixi"
            >
              <History className="w-4 h-4" />
            </button>
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-4 gap-2">
            {/* Row 1 */}
            <button
              onClick={handleClear}
              className="py-3.5 rounded-2xl bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-bold text-base transition-colors cursor-pointer"
            >
              C
            </button>
            <button
              onClick={() => handleParenthesis('(')}
              className="py-3.5 rounded-2xl bg-slate-200/70 hover:bg-slate-300 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-base transition-colors cursor-pointer"
            >
              (
            </button>
            <button
              onClick={() => handleParenthesis(')')}
              className="py-3.5 rounded-2xl bg-slate-200/70 hover:bg-slate-300 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-base transition-colors cursor-pointer"
            >
              )
            </button>
            <button
              onClick={handleBackspace}
              className="py-3.5 rounded-2xl bg-slate-200/70 hover:bg-slate-300 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-base flex items-center justify-center transition-colors cursor-pointer"
            >
              <Delete className="w-5 h-5" />
            </button>

            {/* Row 2 */}
            <button
              onClick={() => handleDigit('7')}
              className="py-3.5 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg shadow-xs transition-colors cursor-pointer"
            >
              7
            </button>
            <button
              onClick={() => handleDigit('8')}
              className="py-3.5 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg shadow-xs transition-colors cursor-pointer"
            >
              8
            </button>
            <button
              onClick={() => handleDigit('9')}
              className="py-3.5 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg shadow-xs transition-colors cursor-pointer"
            >
              9
            </button>
            <button
              onClick={() => handleOperator('÷')}
              className="py-3.5 rounded-2xl bg-blue-100 hover:bg-blue-200 dark:bg-blue-950 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-lg transition-colors cursor-pointer"
            >
              ÷
            </button>

            {/* Row 3 */}
            <button
              onClick={() => handleDigit('4')}
              className="py-3.5 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg shadow-xs transition-colors cursor-pointer"
            >
              4
            </button>
            <button
              onClick={() => handleDigit('5')}
              className="py-3.5 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg shadow-xs transition-colors cursor-pointer"
            >
              5
            </button>
            <button
              onClick={() => handleDigit('6')}
              className="py-3.5 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg shadow-xs transition-colors cursor-pointer"
            >
              6
            </button>
            <button
              onClick={() => handleOperator('×')}
              className="py-3.5 rounded-2xl bg-blue-100 hover:bg-blue-200 dark:bg-blue-950 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-lg transition-colors cursor-pointer"
            >
              ×
            </button>

            {/* Row 4 */}
            <button
              onClick={() => handleDigit('1')}
              className="py-3.5 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg shadow-xs transition-colors cursor-pointer"
            >
              1
            </button>
            <button
              onClick={() => handleDigit('2')}
              className="py-3.5 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg shadow-xs transition-colors cursor-pointer"
            >
              2
            </button>
            <button
              onClick={() => handleDigit('3')}
              className="py-3.5 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg shadow-xs transition-colors cursor-pointer"
            >
              3
            </button>
            <button
              onClick={() => handleOperator('−')}
              className="py-3.5 rounded-2xl bg-blue-100 hover:bg-blue-200 dark:bg-blue-950 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-lg transition-colors cursor-pointer"
            >
              −
            </button>

            {/* Row 5 */}
            <button
              onClick={handlePercentage}
              className="py-3.5 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg shadow-xs transition-colors cursor-pointer"
            >
              %
            </button>
            <button
              onClick={() => handleDigit('0')}
              className="py-3.5 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg shadow-xs transition-colors cursor-pointer"
            >
              0
            </button>
            <button
              onClick={handleDecimal}
              className="py-3.5 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg shadow-xs transition-colors cursor-pointer"
            >
              .
            </button>
            <button
              onClick={() => handleOperator('+')}
              className="py-3.5 rounded-2xl bg-blue-100 hover:bg-blue-200 dark:bg-blue-950 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-lg transition-colors cursor-pointer"
            >
              +
            </button>
          </div>

          {/* Equals Button (Full width) */}
          <div className="mt-2">
            <button
              onClick={handleEquals}
              className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xl shadow-md transition-all active:scale-[0.99] cursor-pointer"
            >
              =
            </button>
          </div>

          {/* History Drawer */}
          {showHistory && (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 animate-in fade-in duration-150">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Oxirgi hisob-kitoblar:
                </span>
                {history.length > 0 && (
                  <button
                    onClick={() => setHistory([])}
                    className="text-[11px] text-rose-500 hover:text-rose-700"
                  >
                    Tarixni tozalash
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <p className="text-xs text-slate-400 dark:text-slate-600 py-2 text-center">
                  Hozircha tarix mavjud emas.
                </p>
              ) : (
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {history.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setDisplay(item.result);
                        setExpression(item.expression);
                      }}
                      className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <span className="font-mono text-slate-500 dark:text-slate-400 truncate">
                        {item.expression}
                      </span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        = {item.result}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
