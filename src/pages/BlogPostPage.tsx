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
          <div className="h-4 bg-paper-dark rounded w-32 mb-8" />
          <div className="h-8 bg-paper-dark rounded w-2/3 mb-4" />
          <div className="h-4 bg-paper-dark rounded w-1/3 mb-12" />
          <div className="aspect-video bg-paper-dark border-3 border-ink mb-12" />
          <div className="space-y-3">
            <div className="h-4 bg-paper-dark rounded w-full" />
            <div className="h-4 bg-paper-dark rounded w-5/6" />
            <div className="h-4 bg-paper-dark rounded w-4/6" />
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
      case 'engineering': return 'bg-accent-blue';
      case 'religion': return 'bg-accent-green';
      case 'social': return 'bg-accent-red';
      default: return 'bg-ink';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-ink-light hover:text-ink transition-colors mb-8 font-mono text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t(sectionLabels.backToBlog.en, sectionLabels.backToBlog.id)}</span>
        </Link>

        {/* Draft Warning */}
        {post.draft && showDraftWarning && (
          <div className="mb-8 brutal-border bg-accent-red/10 border-accent-red p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-accent-red flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-mono font-bold text-accent-red uppercase text-sm">
                {t('Draft Post', 'Posting Draf')}
              </p>
              <p className="text-sm text-ink-light mt-1">
                {t(
                  'This post is still a draft and not publicly visible.',
                  'Posting ini masih draf dan tidak terlihat secara publik.'
                )}
              </p>
            </div>
            <button
              onClick={() => setShowDraftWarning(false)}
              className="text-ink-light hover:text-ink"
            >
              x
            </button>
          </div>
        )}

        {/* Header */}
        <header className="mb-12">
          <div className={`inline-block px-3 py-1 text-xs font-mono uppercase text-white mb-4 ${getCategoryColor(post.tags[0])}`}>
            {categoryLabels[post.tags[0]][language]}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono font-bold mb-6 leading-tight">
            {post.title[language]}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-ink-light mb-6">
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
                className="text-xs font-mono uppercase px-3 py-1.5 bg-paper-dark border-2 border-ink"
              >
                {categoryLabels[tag][language]}
              </span>
            ))}
          </div>

          {(hasEnglishContent && hasIndonesianContent) && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-ink-light" />
              <div className="flex border-2 border-ink">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 font-mono text-sm uppercase transition-colors ${
                    language === 'en'
                      ? 'bg-ink text-paper'
                      : 'bg-paper text-ink hover:bg-ink/10'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('id')}
                  className={`px-4 py-2 font-mono text-sm uppercase transition-colors border-l-2 border-ink ${
                    language === 'id'
                      ? 'bg-ink text-paper'
                      : 'bg-paper text-ink hover:bg-ink/10'
                  }`}
                >
                  Bahasa Indonesia
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Featured Image */}
        <div className="aspect-video bg-paper-dark border-3 border-ink mb-12 flex items-center justify-center relative overflow-hidden">
          <img
            src={post.featuredImage || '/blog/pixel-code.png'}
            alt={post.title[language]}
            className="absolute inset-0 w-full h-full object-cover pixel-image"
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
        <footer className="mt-16 pt-8 border-t-3 border-ink">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-ink-light text-sm">
              {t('Thanks for reading!', 'Terima kasih sudah membaca!')} 🙏
            </p>
            <Link
              to="/blog"
              className="btn-brutal-outline"
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
