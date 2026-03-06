import { useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ArrowLeft, Eye, Edit3, Upload, Image, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { type BlogCategory, categoryLabels } from '@/data/blog';
import { createPost, uploadBlogImage } from '@/lib/api';
import { signOut } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';

const CATEGORIES: BlogCategory[] = ['engineering', 'religion', 'social'];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function estimateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

export default function NewBlogPostPage() {
  const { session } = useAuth();
  const [titleEn, setTitleEn] = useState('');
  const [titleId, setTitleId] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManual, setSlugManual] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [draft, setDraft] = useState(false);
  const [tags, setTags] = useState<BlogCategory[]>(['engineering']);
  const [readingTime, setReadingTime] = useState('');
  const [excerptEn, setExcerptEn] = useState('');
  const [excerptId, setExcerptId] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [contentId, setContentId] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'en' | 'id'>('en');
  const [previewMode, setPreviewMode] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const featuredInputRef = useRef<HTMLInputElement>(null);
  const inlineInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTitleEnChange = useCallback((val: string) => {
    setTitleEn(val);
    if (!slugManual) setSlug(slugify(val));
  }, [slugManual]);

  const handleSlugChange = useCallback((val: string) => {
    setSlug(slugify(val));
    setSlugManual(true);
  }, []);

  const handleTagToggle = useCallback((tag: BlogCategory) => {
    setTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }, []);

  const activeContent = activeTab === 'en' ? contentEn : contentId;
  const setActiveContent = activeTab === 'en' ? setContentEn : setContentId;
  const autoReadingTime = readingTime || estimateReadingTime(contentEn || contentId);

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingFeatured(true);
    const path = `featured/${Date.now()}-${file.name}`;
    const url = await uploadBlogImage(file, path);
    if (url) {
      setFeaturedImageUrl(url);
      toast.success('Featured image uploaded');
    } else {
      toast.error('Failed to upload image');
    }
    setUploadingFeatured(false);
  };

  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const path = `inline/${Date.now()}-${file.name}`;
    const url = await uploadBlogImage(file, path);
    if (url) {
      const md = `\n![${file.name}](${url})\n`;
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const before = activeContent.slice(0, start);
        const after = activeContent.slice(start);
        setActiveContent(before + md + after);
      } else {
        setActiveContent(activeContent + md);
      }
      toast.success('Image inserted');
    } else {
      toast.error('Failed to upload image');
    }
    if (inlineInputRef.current) inlineInputRef.current.value = '';
  };

  const handlePublish = async () => {
    if (!slug || !titleEn) {
      toast.error('Title (EN) and slug are required');
      return;
    }
    setPublishing(true);

    const result = await createPost({
      slug,
      title: { en: titleEn, id: titleId },
      date,
      draft,
      tags,
      readingTime: autoReadingTime,
      excerpt: { en: excerptEn, id: excerptId },
      content: { en: contentEn, id: contentId },
      featuredImage: featuredImageUrl || undefined,
    });

    if (result.success) {
      toast.success(draft ? 'Draft saved!' : 'Post published!');
      // Reset form
      setTitleEn(''); setTitleId(''); setSlug(''); setSlugManual(false);
      setDate(new Date().toISOString().split('T')[0]); setDraft(false);
      setTags(['engineering']); setReadingTime('');
      setExcerptEn(''); setExcerptId('');
      setContentEn(''); setContentId('');
      setFeaturedImageUrl('');
    } else {
      toast.error(result.error || 'Failed to publish');
    }
    setPublishing(false);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-ink-light hover:text-ink transition-colors font-mono text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-ink-light">{session?.user.email}</span>
            <button onClick={handleSignOut} className="inline-flex items-center gap-1 text-ink-light hover:text-ink font-mono text-xs">
              <LogOut className="w-3 h-3" /> Sign Out
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-mono font-bold mb-2">New Blog Post</h1>
          <p className="text-ink-light font-mono text-sm">Write and publish directly to your blog.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8">
          {/* Left: Metadata + Editor */}
          <div className="flex flex-col gap-6">
            {/* Metadata */}
            <section className="brutal-border p-6 bg-paper">
              <h2 className="font-mono font-bold uppercase text-sm tracking-wider mb-4">Metadata</h2>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-ink-light block mb-1">Title (English)</label>
                  <input
                    type="text"
                    value={titleEn}
                    onChange={e => handleTitleEnChange(e.target.value)}
                    placeholder="e.g. Vibe Code is a New Programming Language"
                    className="w-full border-2 border-ink bg-paper px-3 py-2 font-mono text-sm focus:outline-none focus:border-accent-blue"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-ink-light block mb-1">Title (Bahasa Indonesia)</label>
                  <input
                    type="text"
                    value={titleId}
                    onChange={e => setTitleId(e.target.value)}
                    placeholder="e.g. Vibe Code adalah Bahasa Pemrograman Baru"
                    className="w-full border-2 border-ink bg-paper px-3 py-2 font-mono text-sm focus:outline-none focus:border-accent-blue"
                  />
                </div>

                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-ink-light block mb-1">Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={e => handleSlugChange(e.target.value)}
                    placeholder="auto-generated-from-title"
                    className="w-full border-2 border-ink bg-paper px-3 py-2 font-mono text-sm focus:outline-none focus:border-accent-blue"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-ink-light block mb-1">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      className="w-full border-2 border-ink bg-paper px-3 py-2 font-mono text-sm focus:outline-none focus:border-accent-blue"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs uppercase tracking-wider text-ink-light block mb-1">Reading Time (auto)</label>
                    <input
                      type="text"
                      value={readingTime}
                      onChange={e => setReadingTime(e.target.value)}
                      placeholder={autoReadingTime}
                      className="w-full border-2 border-ink bg-paper px-3 py-2 font-mono text-sm focus:outline-none focus:border-accent-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-ink-light block mb-2">Tags</label>
                  <div className="flex gap-2 flex-wrap">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleTagToggle(cat)}
                        className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider border-2 border-ink transition-colors ${
                          tags.includes(cat) ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-ink/10'
                        }`}
                      >
                        {categoryLabels[cat].en}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Featured Image Upload */}
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-ink-light block mb-1">Featured Image</label>
                  <input
                    ref={featuredInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFeaturedImageUpload}
                    className="hidden"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => featuredInputRef.current?.click()}
                      disabled={uploadingFeatured}
                      className="flex items-center gap-2 px-3 py-2 border-2 border-ink bg-paper font-mono text-sm hover:bg-ink/10 transition-colors disabled:opacity-50"
                    >
                      <Upload className="w-4 h-4" />
                      {uploadingFeatured ? 'Uploading...' : 'Upload Image'}
                    </button>
                    {featuredImageUrl && (
                      <span className="font-mono text-xs text-accent-green self-center truncate max-w-[200px]">Uploaded</span>
                    )}
                  </div>
                  {featuredImageUrl && (
                    <img src={featuredImageUrl} alt="Featured preview" className="mt-2 w-full aspect-video object-cover border-2 border-ink" />
                  )}
                </div>

                {/* Draft toggle */}
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div
                    onClick={() => setDraft(d => !d)}
                    className={`w-10 h-5 border-2 border-ink relative transition-colors ${draft ? 'bg-accent-red' : 'bg-paper'}`}
                  >
                    <div className={`absolute top-0 bottom-0 w-4 border-2 border-ink bg-paper transition-transform ${draft ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                  <span className="font-mono text-sm">Draft</span>
                </label>
              </div>
            </section>

            {/* Excerpt */}
            <section className="brutal-border p-6 bg-paper">
              <h2 className="font-mono font-bold uppercase text-sm tracking-wider mb-4">Excerpt</h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-ink-light block mb-1">Excerpt (English)</label>
                  <textarea
                    value={excerptEn}
                    onChange={e => setExcerptEn(e.target.value)}
                    rows={2}
                    placeholder="Short description for the blog card..."
                    className="w-full border-2 border-ink bg-paper px-3 py-2 font-mono text-sm focus:outline-none focus:border-accent-blue resize-y"
                  />
                </div>
                <div>
                  <label className="font-mono text-xs uppercase tracking-wider text-ink-light block mb-1">Excerpt (Bahasa Indonesia)</label>
                  <textarea
                    value={excerptId}
                    onChange={e => setExcerptId(e.target.value)}
                    rows={2}
                    placeholder="Deskripsi singkat untuk kartu blog..."
                    className="w-full border-2 border-ink bg-paper px-3 py-2 font-mono text-sm focus:outline-none focus:border-accent-blue resize-y"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Right: Markdown Editor + Preview */}
          <div className="flex flex-col gap-6">
            <section className="brutal-border bg-paper flex flex-col" style={{ minHeight: '600px' }}>
              {/* Toolbar */}
              <div className="flex items-center border-b-2 border-ink">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('en')}
                    className={`px-4 py-3 font-mono text-xs uppercase tracking-wider border-r-2 border-ink transition-colors ${
                      activeTab === 'en' ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-ink/10'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setActiveTab('id')}
                    className={`px-4 py-3 font-mono text-xs uppercase tracking-wider border-r-2 border-ink transition-colors ${
                      activeTab === 'id' ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-ink/10'
                    }`}
                  >
                    Bahasa ID
                  </button>
                </div>

                <div className="flex ml-auto">
                  {/* Inline image upload */}
                  <input
                    ref={inlineInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleInlineImageUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => inlineInputRef.current?.click()}
                    className="px-4 py-3 font-mono text-xs uppercase tracking-wider border-l-2 border-ink transition-colors bg-paper text-ink hover:bg-ink/10 flex items-center gap-1.5"
                    title="Insert image"
                  >
                    <Image className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setPreviewMode(false)}
                    className={`px-4 py-3 font-mono text-xs uppercase tracking-wider border-l-2 border-ink transition-colors flex items-center gap-1.5 ${
                      !previewMode ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-ink/10'
                    }`}
                  >
                    <Edit3 className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => setPreviewMode(true)}
                    className={`px-4 py-3 font-mono text-xs uppercase tracking-wider border-l-2 border-ink transition-colors flex items-center gap-1.5 ${
                      previewMode ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-ink/10'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    Preview
                  </button>
                </div>
              </div>

              {/* Editor / Preview */}
              <div className="flex-1 relative">
                {previewMode ? (
                  <div className="p-6 markdown-content overflow-y-auto h-full">
                    {activeContent ? (
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
                              <code className={className} {...props}>{children}</code>
                            );
                          },
                        }}
                      >
                        {activeContent}
                      </ReactMarkdown>
                    ) : (
                      <p className="text-ink-light font-mono text-sm italic">Nothing to preview yet.</p>
                    )}
                  </div>
                ) : (
                  <textarea
                    ref={textareaRef}
                    value={activeContent}
                    onChange={e => setActiveContent(e.target.value)}
                    placeholder={`# Your Post Title\n\nWrite your content in Markdown...\n\n## Section\n\nParagraph text here.\n\n\`\`\`dart\n// code block\n\`\`\``}
                    className="w-full h-full px-6 py-6 font-mono text-sm bg-paper focus:outline-none resize-none leading-relaxed"
                    style={{ minHeight: '560px' }}
                    spellCheck={false}
                  />
                )}
              </div>

              {/* Word count */}
              <div className="border-t-2 border-ink px-4 py-2 flex justify-between items-center">
                <span className="font-mono text-xs text-ink-light">
                  {activeTab === 'en' ? 'English' : 'Bahasa Indonesia'} — {activeContent.trim().split(/\s+/).filter(Boolean).length} words
                </span>
                <span className="font-mono text-xs text-ink-light">
                  ~{estimateReadingTime(activeContent)} read
                </span>
              </div>
            </section>
          </div>
        </div>

        {/* Publish Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="btn-brutal flex items-center gap-2 text-base px-8 py-3 disabled:opacity-50"
          >
            <Upload className="w-5 h-5" />
            {publishing ? 'Publishing...' : draft ? 'Save Draft' : 'Publish Post'}
          </button>
        </div>
      </div>
    </div>
  );
}
