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
      case 'engineering': return 'bg-indigo-500/80';
      case 'religion': return 'bg-emerald-500/80';
      case 'social': return 'bg-rose-500/80';
      default: return 'bg-white/20';
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
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t(sectionLabels.backToHome.en, sectionLabels.backToHome.id)}</span>
        </Link>

        {/* Header */}
        <div ref={headerRef} className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('Blog', 'Blog')}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t(
              'Personal thoughts, research, and tutorials on engineering, faith, and social issues.',
              'Pikiran pribadi, penelitian, dan tutorial tentang teknik, iman, dan isu sosial.'
            )}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <p className="text-sm text-muted-foreground mb-4">
            {t(sectionLabels.filterBy.en, sectionLabels.filterBy.id)}
          </p>
          <div ref={filtersRef} className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm rounded-full border transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-foreground'
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
              <div key={i} className="glass-card h-full flex flex-col animate-pulse overflow-hidden">
                <div className="aspect-video bg-white/5" />
                <div className="flex-1 flex flex-col gap-2 p-5">
                  <div className="h-3 bg-white/5 rounded w-1/3" />
                  <div className="h-5 bg-white/5 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded w-full" />
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
                <article className="glass-card h-full flex flex-col overflow-hidden">
                  {/* Featured Image */}
                  <div className="aspect-video bg-secondary relative overflow-hidden">
                    <img
                      src={post.featuredImage || '/blog/pixel-code.png'}
                      alt={post.title[language]}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-medium text-white rounded-md z-10 backdrop-blur-sm ${getCategoryColor(post.tags[0])}`}>
                      {categoryLabels[post.tags[0]][language]}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col p-5">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span>{formatDate(post.date)}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTime} {t(sectionLabels.readingTime.en, sectionLabels.readingTime.id)}
                      </span>
                    </div>

                    <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title[language]}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                      {post.excerpt[language]}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="badge-modern text-xs"
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
            <p className="text-muted-foreground">
              {t('No posts found in this category.', 'Tidak ada postingan di kategori ini.')}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
