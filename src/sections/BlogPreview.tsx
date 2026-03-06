import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { categoryLabels, type BlogCategory } from '@/data/blog';
import { sectionLabels } from '@/data/personal';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import SectionHeading from '@/components/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

export default function BlogPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();
  const { posts: allPosts } = useBlogPosts();

  const posts = allPosts.slice(0, 3);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
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

  return (
    <section ref={sectionRef} className="section-modern">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <SectionHeading
            ref={headingRef}
            title={t(sectionLabels.latestPosts.en, sectionLabels.latestPosts.id)}
            subtitle={t('Thoughts, tutorials, and reflections', 'Pikiran, tutorial, dan refleksi')}
            center={false}
          />
          <Link
            to="/blog"
            className="btn-ghost mt-4 md:mt-0 self-start md:self-auto"
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
              <article className="glass-card h-full flex flex-col overflow-hidden">
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

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                    {post.excerpt[language]}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-primary group-hover:gap-3 transition-all">
                    <span>{t(sectionLabels.readMore.en, sectionLabels.readMore.id)}</span>
                    <ArrowRight className="w-4 h-4" />
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
