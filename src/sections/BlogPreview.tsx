import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { categoryLabels, type BlogCategory } from '@/data/blog';
import { sectionLabels } from '@/data/personal';
import { useBlogPosts } from '@/hooks/useBlogPosts';

gsap.registerPlugin(ScrollTrigger);

export default function BlogPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();
  const { posts: allPosts } = useBlogPosts();

  const posts = allPosts.slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        postsRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: postsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getCategoryColor = (category: BlogCategory) => {
    switch (category) {
      case 'engineering': return 'bg-accent-blue';
      case 'religion': return 'bg-accent-green';
      case 'social': return 'bg-accent-red';
      default: return 'bg-ink';
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

  return (
    <section ref={sectionRef} className="section-brutal">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          ref={titleRef}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-mono font-bold mb-2">
              {t(sectionLabels.latestPosts.en, sectionLabels.latestPosts.id)}
            </h2>
            <p className="text-ink-light">
              {t('Thoughts, tutorials, and reflections', 'Pikiran, tutorial, dan refleksi')}
            </p>
          </div>
          <Link
            to="/blog"
            className="btn-brutal-outline mt-4 md:mt-0 self-start md:self-auto"
          >
            <span>{t(sectionLabels.viewAll.en, sectionLabels.viewAll.id)}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Posts Grid */}
        <div ref={postsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group"
            >
              <article className="card-brutal h-full flex flex-col hover:shadow-brutal-lg transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1">
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

                  <p className="text-sm text-ink-light line-clamp-2 mb-4 flex-1">
                    {post.excerpt[language]}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-mono uppercase group-hover:text-accent-red transition-colors">
                    <span>{t(sectionLabels.readMore.en, sectionLabels.readMore.id)}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
