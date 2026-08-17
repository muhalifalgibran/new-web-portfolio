"use client";

import React from "react";
import Link from "next/link";
import { allBlogs } from "contentlayer/generated";
import type { Blog } from "contentlayer/generated";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Tag, 
  Globe, 
  AlertCircle,
  FileText
} from "lucide-react";
import { useLanguage } from "../../../contexts/LanguageContext";

// Category badge styles
const categoryStyles: Record<string, string> = {
  Engineering: "bg-accent-blue text-ink",
  Religion: "bg-accent-yellow text-ink",
  Social: "bg-accent text-paper",
};

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { language, setLanguage } = useLanguage();
  const [slug, setSlug] = React.useState<string>("");

  React.useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  const post = allBlogs.find((b: Blog) => b.slug === slug);

  if (!post) {
    return <BlogPostNotFound />;
  }

  const content = {
    id: {
      backToBlog: "← Kembali ke Blog",
      draftWarning: "Ini adalah draft. Konten mungkin belum lengkap.",
      readIn: "Baca dalam:",
      notAvailable: "Konten bahasa Inggris belum tersedia.",
    },
    en: {
      backToBlog: "← Back to Blog",
      draftWarning: "This is a draft. Content may be incomplete.",
      readIn: "Read in:",
      notAvailable: "English content is not available yet.",
    },
  };

  const d = content[language];

  // Parse body content to separate Indonesian and English
  const bodyContent = post.body.raw || "";
  const parts = bodyContent.split("---");
  const indonesianContent = parts[0]?.trim() || "";
  const englishContent = parts[1]?.replace(/\*\*English Version:\*\*/, "").trim() || "";

  // Get content based on selected language
  const currentTitle = language === "id" ? post.title_id : (post.title_en || post.title_id);
  const currentContentHtml = language === "id" 
    ? post.body.html 
    : (post.hasEnglish && englishContent ? post.body.html : `<p class="text-ink-light italic">${d.notAvailable}</p>`);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "id" ? "id-ID" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-paper border-b-3 border-ink">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="font-pixel text-xl text-ink hover:text-ink-light transition-colors"
          >
            GIBRAN.DEV
          </Link>
          <Link href="/blog">
            <button className="btn-brutal-sm flex items-center gap-2">
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">{d.backToBlog}</span>
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-16">
        {/* Back Link */}
        <div className="text-center mb-8">
          <Link href="/blog" className="inline-block text-ink hover:text-ink-light transition-colors">
            {d.backToBlog}
          </Link>
        </div>

        {/* Article */}
        <article>
          {/* Header */}
          <header className="mb-10">
            {/* Category & Draft Badge */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className={`badge-category ${categoryStyles[post.category]}`}>
                <Tag size={12} className="inline mr-1" />
                {post.category}
              </span>
              {post.draft && (
                <span className="badge-brutal-draft">DRAFT</span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-pixel text-3xl sm:text-4xl text-ink mb-6 leading-tight text-center">
              {currentTitle}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-ink-light pb-6 border-b-2 border-ink">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readingTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText size={16} />
                <span>{post.wordCount} words</span>
              </div>
            </div>
          </header>

          {/* Draft Warning */}
          {post.draft && (
            <div className="mb-8 p-4 bg-accent/10 border-2 border-accent flex items-start gap-3">
              <AlertCircle size={20} className="text-accent flex-shrink-0 mt-0.5" />
              <p className="text-ink">{d.draftWarning}</p>
            </div>
          )}

          {/* Language Toggle (if English available) */}
          {post.hasEnglish && (
            <div className="mb-8 p-4 bg-paper-dark border-2 border-ink flex items-center justify-center flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-ink" />
                <span className="font-bold text-ink">{d.readIn}</span>
              </div>
              <div className="flex border-2 border-ink bg-paper shadow-[2px_2px_0px_0px_#1a1a1a]">
                <button
                  onClick={() => setLanguage("id")}
                  className={`lang-btn ${language === "id" ? "lang-btn-active" : "lang-btn-inactive"}`}
                >
                  Bahasa Indonesia
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`lang-btn ${language === "en" ? "lang-btn-active" : "lang-btn-inactive"}`}
                >
                  English
                </button>
              </div>
            </div>
          )}

          {/* Content */}
          <div 
            className="prose-brutal text-ink"
            dangerouslySetInnerHTML={{ __html: currentContentHtml || "" }}
          />

          {/* Divider */}
          <div className="divider-brutal" />

          {/* Footer */}
          <footer className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-ink-light">Category:</span>
              <span className={`badge-category ${categoryStyles[post.category]}`}>
                {post.category}
              </span>
            </div>
            <Link href="/blog">
              <button className="btn-brutal-sm">
                {language === "id" ? "← Kembali ke Blog" : "← Back to Blog"}
              </button>
            </Link>
          </footer>
        </article>
      </main>

      {/* Footer - Always at bottom */}
      <footer className="border-t-3 border-ink mt-auto">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="font-pixel text-sm text-ink-light">
              © 2026 GIBRAN.DEV
            </p>
            <span className="hidden sm:inline text-ink-light">|</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-ink-light">
                {post.hasEnglish ? "ID / EN" : "ID"}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BlogPostNotFound() {
  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <header className="sticky top-0 z-50 bg-paper border-b-3 border-ink">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link 
            href="/" 
            className="font-pixel text-xl text-ink hover:text-ink-light transition-colors"
          >
            GIBRAN.DEV
          </Link>
        </div>
      </header>
      
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-24 text-center">
        <div className="card-brutal p-12">
          <FileText size={48} className="mx-auto mb-6 text-ink-light" />
          <h1 className="font-pixel text-3xl text-ink mb-4">Post Not Found</h1>
          <p className="text-ink-light mb-8">
            The blog post you are looking for does not exist.
          </p>
          <Link href="/blog">
            <button className="btn-brutal-filled">
              ← Back to Blog
            </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-3 border-ink mt-auto">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="font-pixel text-sm text-ink-light">
              © 2026 GIBRAN.DEV
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
