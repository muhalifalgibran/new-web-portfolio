import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ArrowLeft, Clock, Calendar, Globe, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { categoryLabels, type BlogCategory } from '@/data/blog';
import { sectionLabels } from '@/data/personal';
import { useBlogPost } from '@/hooks/useBlogPosts';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language, setLanguage, t } = useLanguage();
  const [showDraftWarning, setShowDraftWarning] = useState(true);
  const { post, loading } = useBlogPost(slug);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-4 bg-white/5 rounded w-32 mb-8" />
          <div className="h-8 bg-white/5 rounded w-2/3 mb-4" />
          <div className="h-4 bg-white/5 rounded w-1/3 mb-12" />
          <div className="aspect-video bg-white/5 rounded-lg mb-12" />
          <div className="space-y-3">
            <div className="h-4 bg-white/5 rounded w-full" />
            <div className="h-4 bg-white/5 rounded w-5/6" />
            <div className="h-4 bg-white/5 rounded w-4/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const hasEnglishContent = post.content.en && post.content.en.trim().length > 0;
  const hasIndonesianContent = post.content.id && post.content.id.trim().length > 0;

  const showContent = () => {
    if (language === 'en' && hasEnglishContent) return post.content.en;
    if (language === 'id' && hasIndonesianContent) return post.content.id;
    if (hasEnglishContent) return post.content.en;
    if (hasIndonesianContent) return post.content.id;
    return '';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: BlogCategory) => {
    switch (category) {
      case 'engineering': return 'bg-indigo-500/80';
      case 'religion': return 'bg-emerald-500/80';
      case 'social': return 'bg-rose-500/80';
      default: return 'bg-white/20';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t(sectionLabels.backToBlog.en, sectionLabels.backToBlog.id)}</span>
        </Link>

        {/* Draft Warning */}
        {post.draft && showDraftWarning && (
          <div className="mb-8 glass-card border-destructive/30 p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-destructive text-sm">
                {t('Draft Post', 'Posting Draf')}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {t(
                  'This post is still a draft and not publicly visible.',
                  'Posting ini masih draf dan tidak terlihat secara publik.'
                )}
              </p>
            </div>
            <button
              onClick={() => setShowDraftWarning(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              x
            </button>
          </div>
        )}

        {/* Header */}
        <header className="mb-12">
          <div className={`inline-block px-2.5 py-1 text-xs font-medium text-white rounded-md mb-4 ${getCategoryColor(post.tags[0])}`}>
            {categoryLabels[post.tags[0]][language]}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {post.title[language]}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readingTime} {t(sectionLabels.readingTime.en, sectionLabels.readingTime.id)}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="badge-modern"
              >
                {categoryLabels[tag][language]}
              </span>
            ))}
          </div>

          {(hasEnglishContent && hasIndonesianContent) && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <div className="flex rounded-full overflow-hidden border border-white/10">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 text-sm transition-colors ${
                    language === 'en'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('id')}
                  className={`px-4 py-2 text-sm transition-colors ${
                    language === 'id'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                  }`}
                >
                  Bahasa Indonesia
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Featured Image */}
        <div className="aspect-video bg-secondary rounded-lg mb-12 relative overflow-hidden">
          <img
            src={post.featuredImage || '/blog/pixel-code.png'}
            alt={post.title[language]}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <article className="markdown-content">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {showContent()}
          </ReactMarkdown>
        </article>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              {t('Thanks for reading!', 'Terima kasih sudah membaca!')}
            </p>
            <Link
              to="/blog"
              className="btn-ghost"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t(sectionLabels.backToBlog.en, sectionLabels.backToBlog.id)}</span>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
