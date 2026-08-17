"use client";

import Profile from "../components/Profile";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Link from "next/link";
import { ArrowRight, FileText, Settings } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export default function HomePage() {
  const { language, setLanguage } = useLanguage();

  const content = {
    id: {
      blogButton: "Lihat Blog",
      greeting: "Selamat datang di portfolio saya",
    },
    en: {
      blogButton: "View Blog",
      greeting: "Welcome to my portfolio",
    },
  };

  const d = content[language];

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-paper border-b-3 border-ink">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-pixel text-xl text-ink hover:text-ink-light transition-colors">
            GIBRAN.DEV
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher language={language} setLanguage={setLanguage} />
            <Link href="/blog">
              <button className="btn-brutal-sm flex items-center gap-2">
                <FileText size={16} />
                <span className="hidden sm:inline">{d.blogButton}</span>
              </button>
            </Link>
            <Link href="/admin">
              <button className="btn-brutal-sm flex items-center gap-2" title="Admin Panel">
                <Settings size={16} />
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content - Centered */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
        {/* Greeting - Centered */}
        <div className="mb-8 text-center">
          <p className="font-pixel text-lg text-ink-light mb-2">{d.greeting}</p>
          <div className="h-1 w-20 bg-accent mx-auto" />
        </div>

        {/* Profile Section */}
        <Profile language={language} />

        {/* Blog CTA - Centered */}
        <div className="mt-12 card-brutal p-8 text-center">
          <h2 className="font-pixel text-2xl text-ink mb-4">
            {language === "id" ? "Baca Tulisan Saya" : "Read My Writings"}
          </h2>
          <p className="text-ink-light mb-6 max-w-md mx-auto">
            {language === "id" 
              ? "Eksplorasi pemikiran, tutorial, dan ris tentang teknologi, agama, dan isu sosial."
              : "Explore thoughts, tutorials, and research on technology, religion, and social issues."}
          </p>
          <Link href="/blog">
            <button className="btn-brutal-filled inline-flex items-center gap-2">
              <span>{d.blogButton}</span>
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </main>

      {/* Footer - Always at bottom */}
      <footer className="border-t-3 border-ink mt-auto">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="font-pixel text-sm text-ink-light">
              © 2026 GIBRAN.DEV
            </p>
            <span className="hidden sm:inline text-ink-light">|</span>
            <p className="text-xs text-ink-light">
              Built with Next.js + Tailwind CSS
            </p>
            <span className="hidden sm:inline text-ink-light">|</span>
            <Link href="/admin" className="text-xs text-ink-light hover:text-ink underline">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
