import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { categoryLabels, type BlogCategory } from '@/data/blog';
import { sectionLabels } from '@/data/personal';
import { useBlogPosts } from '@/hooks/useBlogPosts';

gsap.registerPlugin(ScrollTrigger);

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'all'>('all');
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();
  const { posts: allPosts, loading } = useBlogPosts();

  const filteredPosts = selectedCategory === 'all'
    ? allPosts
    : allPosts.filter(post => post.tags.includes(selectedCategory));

  const categories: (BlogCategory | 'all')[] = ['all', 'engineering', 'religion', 'social'];

  useEffect(() => {
    if (loading) return;
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        }
      );

      // Filters animation
      gsap.fromTo(
        filtersRef.current?.children || [],
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power3.out',
          delay: 0.2,
        }
      );

      // Posts animation
      gsap.fromTo(
        postsRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.4,
        }
      );
    });

    return () => ctx.revert();
  }, [filteredPosts, loading]);

  const getCategoryColor = (category: BlogCategory) => {
    switch (category) {
      case 'engineering':
        return 'bg-accent-blue';
      case 'religion':
        return 'bg-accent-green';
      case 'social':
        return 'bg-accent-red';
      default:
        return 'bg-ink';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryLabel = (cat: BlogCategory | 'all') => {
    if (cat === 'all') {
      return t('All', 'Semua');
    }
    return categoryLabels[cat][language];
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-ink-light hover:text-ink transition-colors mb-8 font-mono text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t(sectionLabels.backToHome.en, sectionLabels.backToHome.id)}</span>
        </Link>

        {/* Header */}
        <div ref={headerRef} className="mb-8">
          <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4">
            {t('Blog', 'Blog')}
          </h1>
          <p className="text-ink-light text-lg max-w-2xl">
            {t(
              'Personal thoughts, research, and tutorials on engineering, faith, and social issues.',
              'Pikiran pribadi, penelitian, dan tutorial tentang teknik, iman, dan isu sosial.'
            )}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <p className="font-mono text-sm uppercase tracking-wider text-ink-light mb-4">
            {t(sectionLabels.filterBy.en, sectionLabels.filterBy.id)}
          </p>
          <div ref={filtersRef} className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 font-mono text-sm uppercase tracking-wider border-2 border-ink transition-all ${
                  selectedCategory === category
                    ? 'bg-ink text-paper'
                    : 'bg-paper text-ink hover:bg-ink hover:text-paper'
                }`}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="card-brutal h-full flex flex-col animate-pulse">
                <div className="aspect-video bg-paper-dark border-b-3 border-ink mb-4" />
                <div className="flex-1 flex flex-col gap-2 p-4">
                  <div className="h-3 bg-paper-dark rounded w-1/3" />
                  <div className="h-5 bg-paper-dark rounded w-3/4" />
                  <div className="h-3 bg-paper-dark rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {!loading && filteredPosts.length > 0 ? (
          <div ref={postsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group"
              >
                <article className="card-brutal h-full flex flex-col hover:shadow-brutal-lg transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1">
                  {/* Featured Image */}
                  <div className="aspect-video bg-paper-dark border-b-3 border-ink mb-4 flex items-center justify-center relative overflow-hidden">
                    <img
                      src={post.featuredImage || '/blog/pixel-code.png'}
                      alt={post.title[language]}
                      className="absolute inset-0 w-full h-full object-cover pixel-image"
                    />
                    <div className={`absolute top-3 left-3 px-2 py-1 text-xs font-mono uppercase text-white z-10 ${getCategoryColor(post.tags[0])}`}>
                      {categoryLabels[post.tags[0]][language]}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-ink-light mb-3">
                      <span className="font-mono">{formatDate(post.date)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime} {t(sectionLabels.readingTime.en, sectionLabels.readingTime.id)}
                      </span>
                    </div>

                    <h3 className="font-mono font-bold text-lg mb-2 group-hover:text-accent-red transition-colors line-clamp-2">
                      {post.title[language]}
                    </h3>

                    <p className="text-sm text-ink-light line-clamp-3 mb-4 flex-1">
                      {post.excerpt[language]}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono uppercase px-2 py-1 bg-paper-dark border border-ink/20"
                        >
                          {categoryLabels[tag][language]}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : !loading ? (
          <div className="text-center py-16">
            <p className="font-mono text-ink-light">
              {t('No posts found in this category.', 'Tidak ada postingan di kategori ini.')}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
