import React from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const links = [
    { id: 'bosh-sahifa', label: 'Bosh sahifa' },
    { id: 'mavzular', label: 'Mavzular' },
    { id: 'masalalar', label: 'Masalalar' },
    { id: 'ai-yordamchi', label: 'AI yordamchi' },
    { id: 'test', label: 'Test' },
    { id: 'kalkulyator', label: 'Kalkulyator' },
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo and Tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                √x
              </div>
              <span className="font-extrabold text-xl text-slate-900 dark:text-white">
                Matematika 7-sinf
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Matematikani oson, tushunarli va qiziqarli o‘rganing.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600 dark:text-slate-400" aria-label="Footer menyusi">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Copyright notice */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-900 text-center text-xs text-slate-500 dark:text-slate-500">
          <p>© 2026 Matematika 7-sinf. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
};
