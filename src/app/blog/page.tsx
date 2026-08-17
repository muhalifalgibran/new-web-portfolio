"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { allBlogs } from "contentlayer/generated";
import type { Blog } from "contentlayer/generated";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { ArrowLeft, Calendar, Clock, FileText, Tag, Filter } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

type Category = "All" | "Engineering" | "Religion" | "Social";

// Category badge styles
const categoryStyles: Record<string, string> = {
  Engineering: "bg-accent-blue text-ink",
  Religion: "bg-accent-yellow text-ink",
  Social: "bg-accent text-paper",
};

export default function BlogListPage() {
  const { language, setLanguage } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  // Filter published posts (in production, hide drafts)
  const publishedPosts = useMemo(() => {
    const isDev = process.env.NODE_ENV === "development";
    return allBlogs
      .filter((post: Blog) => isDev || !post.draft)
      .sort((a: Blog, b: Blog) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  }, []);

  // Filter by category
  const filteredPosts = useMemo(() => {
    if (activeFilter === "All") return publishedPosts;
    return publishedPosts.filter((post: Blog) => post.category === activeFilter);
  }, [publishedPosts, activeFilter]);

  const filters: Category[] = ["All", "Engineering", "Religion", "Social"];

  const content = {
    id: {
      title: "Blog",
      subtitle: "Tulisan & Pemikiran",
      backHome: "Kembali",
      allPosts: "Semua",
      filterBy: "Filter:",
      noPosts: "Belum ada tulisan dalam kategori ini.",
      draftBadge: "DRAFT",
      availableIn: "Tersedia dalam:",
    },
    en: {
      title: "Blog",
      subtitle: "Writings & Thoughts",
      backHome: "Back",
      allPosts: "All",
      filterBy: "Filter:",
      noPosts: "No posts in this category yet.",
      draftBadge: "DRAFT",
      availableIn: "Available in:",
    },
  };

  const d = content[language];

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
          <div className="flex items-center gap-4">
            <LanguageSwitcher language={language} setLanguage={setLanguage} />
            <Link href="/">
              <button className="btn-brutal-sm flex items-center gap-2">
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">{d.backHome}</span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content - Centered with more margin */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-16">
        {/* Page Title - Centered */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText size={28} className="text-ink" />
            <h1 className="font-pixel text-4xl text-ink">{d.title}</h1>
          </div>
          <p className="text-ink-light text-lg">{d.subtitle}</p>
          <div className="h-1 w-24 bg-accent mx-auto mt-4" />
        </div>

        {/* Filters - Centered */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Filter size={18} className="text-ink" />
            <span className="font-bold text-ink">{d.filterBy}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={activeFilter === filter ? "filter-btn-active" : "filter-btn-inactive filter-btn"}
              >
                {filter === "All" ? d.allPosts : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid - with more spacing */}
        {filteredPosts.length === 0 ? (
          <div className="card-brutal p-8 text-center">
            <p className="text-ink-light">{d.noPosts}</p>
          </div>
        ) : (
          <div className="space-y-10">
            {filteredPosts.map((post: Blog) => {
              const title = language === "id" || !post.title_en 
                ? post.title_id 
                : post.title_en;
              
              // Get excerpt from body content
              const bodyRaw = post.body?.raw || "";
              const indonesianPart = bodyRaw.split("---")[0] || "";
              const excerpt = indonesianPart.slice(0, 150) + "...";

              return (
                <article
                  key={post.slug}
                  className="card-brutal-hover p-8 transition-all duration-200"
                >
                  {/* Header: Category & Draft Badge */}
                  <div className="flex items-start justify-between mb-6">
                    <span className={`badge-category ${categoryStyles[post.category]}`}>
                      <Tag size={12} className="inline mr-1" />
                      {post.category}
                    </span>
                    {post.draft && (
                      <span className="badge-brutal-draft">
                        {d.draftBadge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <Link href={post.url}>
                    <h2 className="font-pixel text-2xl text-ink mb-4 hover:text-ink-light transition-colors cursor-pointer">
                      {title}
                    </h2>
                  </Link>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-ink-light mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>

                  {/* Excerpt */}
                  <p className="text-ink-light mb-6 leading-relaxed">
                    {excerpt.replace(/[#*_`]/g, "")}
                  </p>

                  {/* Language Availability */}
                  {post.hasEnglish && (
                    <div className="flex items-center gap-2 mb-6 text-xs">
                      <span className="text-ink-light">{d.availableIn}</span>
                      <div className="flex gap-1">
                        <span className="px-2 py-0.5 bg-paper-dark border border-ink text-ink font-bold">
                          ID
                        </span>
                        <span className="px-2 py-0.5 bg-paper-dark border border-ink text-ink font-bold">
                          EN
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Read More Link */}
                  <Link href={post.url}>
                    <button className="btn-brutal-sm">
                      {language === "id" ? "Baca Selengkapnya →" : "Read More →"}
                    </button>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer - Always at bottom */}
      <footer className="border-t-3 border-ink mt-auto">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="font-pixel text-sm text-ink-light">
              © 2026 GIBRAN.DEV
            </p>
            <span className="hidden sm:inline text-ink-light">|</span>
            <Link href="/" className="btn-brutal-sm">
              {d.backHome}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
