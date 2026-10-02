import React, { useState } from 'react';
import { Sun, Moon, Menu, X, Plus, Minus, BookOpen, Brain, Sparkles, CheckSquare } from 'lucide-react';
import { FontSizeOption } from '../utils/storage';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  fontSize: FontSizeOption;
  onChangeFontSize: (size: FontSizeOption) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  fontSize,
  onChangeFontSize,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'bosh-sahifa', label: 'Bosh sahifa' },
    { id: 'mavzular', label: 'Mavzular' },
    { id: 'masalalar', label: 'Masalalar' },
    { id: 'ai-yordamchi', label: 'AI Yordamchi' },
    { id: 'test', label: 'Test' },
    { id: 'kalkulyator', label: 'Kalkulyator' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleDecreaseFont = () => {
    if (fontSize === 'xl') onChangeFontSize('lg');
    else if (fontSize === 'lg') onChangeFontSize('normal');
    else if (fontSize === 'normal') onChangeFontSize('sm');
  };

  const handleIncreaseFont = () => {
    if (fontSize === 'sm') onChangeFontSize('normal');
    else if (fontSize === 'normal') onChangeFontSize('lg');
    else if (fontSize === 'lg') onChangeFontSize('xl');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('bosh-sahifa')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            aria-label="Matematika 7-sinf bosh sahifasi"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-blue-500/30 group-hover:scale-105 transition-transform">
              √x
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white block leading-none">
                Matematika
              </span>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
                7-sinf
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Asosiy menyu">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Controls: Font Size & Theme Switcher */}
          <div className="flex items-center gap-2">
            {/* Font Size A- / A+ Controls */}
            <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
              <button
                onClick={handleDecreaseFont}
                disabled={fontSize === 'sm'}
                title="Shriftni kichraytirish (A-)"
                aria-label="Shriftni kichraytirish"
                className="w-7 h-7 flex items-center justify-center rounded text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent font-medium transition-colors"
              >
                A-
              </button>
              <span className="px-1.5 font-mono text-[11px] text-slate-400 dark:text-slate-500 uppercase">
                {fontSize === 'normal' ? '100%' : fontSize}
              </span>
              <button
                onClick={handleIncreaseFont}
                disabled={fontSize === 'xl'}
                title="Shriftni kattalashtirish (A+)"
                aria-label="Shriftni kattalashtirish"
                className="w-7 h-7 flex items-center justify-center rounded text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 disabled:opacity-30 disabled:hover:bg-transparent font-medium transition-colors"
              >
                A+
              </button>
            </div>

            {/* Light / Dark Theme Button */}
            <button
              onClick={onToggleTheme}
              type="button"
              aria-label={theme === 'dark' ? "Yorug' rejimga o'tish" : "Qorong'i rejimga o'tish"}
              title={theme === 'dark' ? "Yorug' rejim (Oq fon)" : "Qorong'i rejim (Qora fon)"}
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Menyuni yopish" : "Menyuni ochish"}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Theme & Font Size Controls */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="font-medium">Fon rejimi (Mavzu):</span>
              <button
                onClick={onToggleTheme}
                type="button"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>Qorong‘i (Qora fon)</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-slate-700" />
                    <span>Yorug‘ (Oq fon)</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="font-medium">Matn o‘lchami:</span>
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button
                  onClick={handleDecreaseFont}
                  disabled={fontSize === 'sm'}
                  className="px-2 py-1 rounded bg-white dark:bg-slate-700 disabled:opacity-40 font-semibold"
                >
                  A−
                </button>
                <span className="px-2 font-mono uppercase text-xs">{fontSize}</span>
                <button
                  onClick={handleIncreaseFont}
                  disabled={fontSize === 'xl'}
                  className="px-2 py-1 rounded bg-white dark:bg-slate-700 disabled:opacity-40 font-semibold"
                >
                  A+
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
