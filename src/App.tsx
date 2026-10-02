import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Dashboard } from './components/Dashboard';
import { TopicsSection } from './components/TopicsSection';
import { PracticeSection } from './components/PracticeSection';
import { AIAssistant } from './components/AIAssistant';
import { Calculator } from './components/Calculator';
import { TestSection } from './components/TestSection';
import { ProgressCard } from './components/ProgressCard';
import { Footer } from './components/Footer';
import { TOPICS } from './data/topicsData';
import {
  getStoredTheme,
  setStoredTheme,
  getStoredFontSize,
  setStoredFontSize,
  getStoredProgress,
  saveProgress,
  FontSizeOption,
} from './utils/storage';
import { StudentProgress } from './types/math';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [fontSize, setFontSize] = useState<FontSizeOption>('normal');
  const [progress, setProgress] = useState<StudentProgress>(getStoredProgress);
  const [activeSection, setActiveSection] = useState('bosh-sahifa');

  // Initialize theme and font size from localStorage
  useEffect(() => {
    const savedTheme = getStoredTheme();
    setTheme(savedTheme);
    setStoredTheme(savedTheme);

    const savedFontSize = getStoredFontSize();
    setFontSize(savedFontSize);
    setStoredFontSize(savedFontSize);

    const savedProg = getStoredProgress();
    setProgress(savedProg);
  }, []);

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setStoredTheme(newTheme);
  };

  const handleChangeFontSize = (newSize: FontSizeOption) => {
    setFontSize(newSize);
    setStoredFontSize(newSize);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'bosh-sahifa') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Update progress when a practice problem is checked
  const handleUpdatePracticeProgress = (problemId: string, isCorrect: boolean) => {
    setProgress((prev) => {
      const updatedSolved = prev.solvedPracticeIds.includes(problemId)
        ? prev.solvedPracticeIds
        : [...prev.solvedPracticeIds, problemId];

      const updatedCorrect = isCorrect && !prev.correctPracticeIds.includes(problemId)
        ? [...prev.correctPracticeIds, problemId]
        : prev.correctPracticeIds;

      const nextProg: StudentProgress = {
        ...prev,
        solvedPracticeIds: updatedSolved,
        correctPracticeIds: updatedCorrect,
        todaySolved: prev.todaySolved + 1,
        todayCorrect: isCorrect ? prev.todayCorrect + 1 : prev.todayCorrect,
      };

      saveProgress(nextProg);
      return nextProg;
    });
  };

  // Toggle topic completion in student progress
  const handleToggleTopicCompletion = (topicId: number) => {
    setProgress((prev) => {
      const exists = prev.completedTopicIds.includes(topicId);
      const updatedTopics = exists
        ? prev.completedTopicIds.filter((id) => id !== topicId)
        : [...prev.completedTopicIds, topicId];

      const nextProg: StudentProgress = {
        ...prev,
        completedTopicIds: updatedTopics,
      };

      saveProgress(nextProg);
      return nextProg;
    });
  };

  // Update progress after test completion
  const handleTestCompleted = (score: number, _total: number) => {
    setProgress((prev) => {
      const nextProg: StudentProgress = {
        ...prev,
        testsTaken: prev.testsTaken + 1,
        lastTestScore: score,
        bestTestScore: Math.max(prev.bestTestScore, score),
      };

      saveProgress(nextProg);
      return nextProg;
    });
  };

  // Optional reset of student progress
  const handleResetProgress = () => {
    if (window.confirm('Haqiqatan ham barcha natijalaringizni qaytadan boshlamoqchimisiz?')) {
      const fresh: StudentProgress = {
        solvedPracticeIds: [],
        correctPracticeIds: [],
        completedTopicIds: [],
        testsTaken: 0,
        bestTestScore: 0,
        lastTestScore: 0,
        todaySolved: 0,
        todayCorrect: 0,
        lastActiveDate: new Date().toISOString().split('T')[0],
      };
      setProgress(fresh);
      saveProgress(fresh);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['bosh-sahifa', 'mavzular', 'masalalar', 'ai-yordamchi', 'test', 'kalkulyator'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const secId = sections[i];
        if (secId === 'bosh-sahifa') {
          if (window.scrollY < 300) {
            setActiveSection('bosh-sahifa');
            break;
          }
        } else {
          const el = document.getElementById(secId);
          if (el && el.offsetTop <= scrollPos) {
            setActiveSection(secId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      data-theme={theme}
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
      }`}
    >
      {/* Sticky Header with Logo, Navigation, Font Size & Theme Controls */}
      <Header
        theme={theme}
        onToggleTheme={handleToggleTheme}
        fontSize={fontSize}
        onChangeFontSize={handleChangeFontSize}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* Hero Section with Floating Math Symbols and CTA */}
        <div id="bosh-sahifa">
          <Hero
            onStartPractice={() => handleNavigate('masalalar')}
            onOpenAI={() => handleNavigate('ai-yordamchi')}
          />
        </div>

        {/* Main Dashboard with 5 interactive cards */}
        <Dashboard
          progress={progress}
          onNavigate={handleNavigate}
          totalTopics={TOPICS.length}
        />

        {/* 7-Sinf Matematika Mavzulari (24 topics with filters, search, modal) */}
        <TopicsSection
          progress={progress}
          onToggleTopicCompletion={handleToggleTopicCompletion}
        />

        {/* AI Matematika Yordamchisi (Gemini API with step-by-step solver) */}
        <AIAssistant />

        {/* Interaktiv Masalalar (Practice questions with checks and hints) */}
        <PracticeSection
          progress={progress}
          onUpdateProgress={handleUpdatePracticeProgress}
        />

        {/* Test Tizimi (10 questions, choices, scoring, review) */}
        <TestSection
          progress={progress}
          onTestCompleted={handleTestCompleted}
        />

        {/* Matematika Kalkulyatori (Safe eval, %, √, x², parentheses, history) */}
        <Calculator />

        {/* Student Progress & Results Overview Card */}
        <ProgressCard
          progress={progress}
          totalTopics={TOPICS.length}
          onResetProgress={handleResetProgress}
        />
      </main>

      {/* Modern Footer with website name, tagline, links, and copyright */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
