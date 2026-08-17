"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { allBlogs } from "contentlayer/generated";
import type { Blog } from "contentlayer/generated";
import { 
  ArrowLeft, 
  FileText, 
  Eye, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  Edit2,
  AlertCircle,
  Calendar,
  Tag,
  Globe,
  FileEdit
} from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

type Tab = "create" | "manage";

interface BlogFormData {
  title_id: string;
  title_en: string;
  slug: string;
  date: string;
  category: "Engineering" | "Religion" | "Social";
  draft: boolean;
  content_id: string;
  content_en: string;
}

const initialFormData: BlogFormData = {
  title_id: "",
  title_en: "",
  slug: "",
  date: new Date().toISOString().split("T")[0],
  category: "Engineering",
  draft: false,
  content_id: "",
  content_en: "",
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("create");
  const { language, setLanguage } = useLanguage();
  const [formData, setFormData] = useState<BlogFormData>(initialFormData);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Generate markdown content
  const generatedMarkdown = useMemo(() => {
    const frontmatter = `---
title_en: "${formData.title_en}"${formData.title_en ? "" : " # Optional - remove this line if not needed"}
title_id: "${formData.title_id}"
date: "${formData.date}"
slug: "${formData.slug || generateSlug(formData.title_id)}"
category: "${formData.category}"${formData.draft ? "\ndraft: true" : ""}
---`;

    const indonesianContent = formData.content_id || "Tulis konten di sini...";
    const englishContent = formData.content_en 
      ? `---\n\n**English Version:**\n\n${formData.content_en}`
      : "";

    return `${frontmatter}\n\n${indonesianContent}${englishContent ? "\n\n" + englishContent : ""}`;
  }, [formData]);

  function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50);
  }

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(generatedMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReset() {
    setFormData(initialFormData);
  }

  function handleEditPost(post: Blog) {
    // Parse the body to separate ID and EN content
    const bodyParts = post.body.raw.split("---");
    const idContent = bodyParts[0]?.trim() || "";
    const enContent = bodyParts[1]?.replace(/\*\*English Version:\*\*/, "").trim() || "";

    setFormData({
      title_id: post.title_id,
      title_en: post.title_en || "",
      slug: post.slug,
      date: post.date,
      category: post.category,
      draft: post.draft,
      content_id: idContent,
      content_en: enContent,
    });
    setActiveTab("create");
  }

  const filteredPosts = allBlogs.sort((a: Blog, b: Blog) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-paper border-b-3 border-ink">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="font-pixel text-xl text-ink hover:text-ink-light transition-colors"
          >
            GIBRAN.DEV
          </Link>
          <div className="flex items-center gap-4">
            <span className="badge-brutal-draft">ADMIN</span>
            <Link href="/">
              <button className="btn-brutal-sm flex items-center gap-2">
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Back</span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileEdit size={28} className="text-ink" />
            <h1 className="font-pixel text-4xl text-ink">Admin Panel</h1>
          </div>
          <p className="text-ink-light">Create and manage your blog posts</p>
          <div className="h-1 w-24 bg-accent mx-auto mt-4" />
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("create")}
            className={`btn-brutal-sm ${activeTab === "create" ? "bg-ink text-paper" : ""}`}
          >
            <Plus size={16} />
            <span>Create Post</span>
          </button>
          <button
            onClick={() => setActiveTab("manage")}
            className={`btn-brutal-sm ${activeTab === "manage" ? "bg-ink text-paper" : ""}`}
          >
            <FileText size={16} />
            <span>Manage Posts ({filteredPosts.length})</span>
          </button>
        </div>

        {activeTab === "create" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              {/* Title Inputs */}
              <div className="card-brutal p-6">
                <h2 className="font-pixel text-xl mb-4 flex items-center gap-2">
                  <Globe size={20} />
                  Titles
                </h2>
                
                {/* Indonesian Title */}
                <div className="mb-4">
                  <label className="block text-sm font-bold text-ink mb-2">
                    Title (Bahasa Indonesia) *
                  </label>
                  <input
                    type="text"
                    value={formData.title_id}
                    onChange={(e) => setFormData({ ...formData, title_id: e.target.value })}
                    className="w-full p-3 border-2 border-ink bg-paper focus:outline-none focus:shadow-brutal transition-shadow"
                    placeholder="Judul dalam Bahasa Indonesia"
                  />
                </div>

                {/* English Title */}
                <div>
                  <label className="block text-sm font-bold text-ink mb-2">
                    Title (English) <span className="text-ink-light font-normal">- Optional</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title_en}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    className="w-full p-3 border-2 border-ink bg-paper focus:outline-none focus:shadow-brutal transition-shadow"
                    placeholder="Title in English"
                  />
                </div>
              </div>

              {/* Metadata */}
              <div className="card-brutal p-6">
                <h2 className="font-pixel text-xl mb-4 flex items-center gap-2">
                  <Tag size={20} />
                  Metadata
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Slug */}
                  <div>
                    <label className="block text-sm font-bold text-ink mb-2">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full p-3 border-2 border-ink bg-paper focus:outline-none focus:shadow-brutal transition-shadow"
                      placeholder={generateSlug(formData.title_id) || "post-slug"}
                    />
                    <p className="text-xs text-ink-light mt-1">
                      Auto: {generateSlug(formData.title_id) || "-"}
                    </p>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-bold text-ink mb-2">
                      <Calendar size={14} className="inline mr-1" />
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full p-3 border-2 border-ink bg-paper focus:outline-none focus:shadow-brutal transition-shadow"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="mt-4">
                  <label className="block text-sm font-bold text-ink mb-2">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Engineering", "Religion", "Social"].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat as BlogFormData["category"] })}
                        className={`px-4 py-2 border-2 border-ink font-bold text-sm transition-all ${
                          formData.category === cat
                            ? "bg-ink text-paper shadow-brutal"
                            : "bg-paper text-ink hover:shadow-brutal"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Draft Toggle */}
                <div className="mt-4 flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="draft"
                    checked={formData.draft}
                    onChange={(e) => setFormData({ ...formData, draft: e.target.checked })}
                    className="w-5 h-5 border-2 border-ink accent-accent cursor-pointer"
                  />
                  <label htmlFor="draft" className="font-bold text-ink cursor-pointer flex items-center gap-2">
                    Mark as Draft
                    {formData.draft && (
                      <span className="badge-brutal-draft text-xs">Won&apos;t be published</span>
                    )}
                  </label>
                </div>
              </div>

              {/* Content Input */}
              <div className="card-brutal p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-pixel text-xl flex items-center gap-2">
                    <FileText size={20} />
                    Content
                  </h2>
                  <div className="flex border-2 border-ink">
                    <button
                      onClick={() => setLanguage("id")}
                      className={`px-3 py-1 text-sm font-bold ${
                        language === "id" ? "bg-ink text-paper" : "bg-paper text-ink"
                      }`}
                    >
                      ID
                    </button>
                    <button
                      onClick={() => setLanguage("en")}
                      className={`px-3 py-1 text-sm font-bold ${
                        language === "en" ? "bg-ink text-paper" : "bg-paper text-ink"
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>

                {language === "id" ? (
                  <div>
                    <label className="block text-sm font-bold text-ink mb-2">
                      Content (Bahasa Indonesia) *
                    </label>
                    <textarea
                      value={formData.content_id}
                      onChange={(e) => setFormData({ ...formData, content_id: e.target.value })}
                      className="w-full h-64 p-3 border-2 border-ink bg-paper focus:outline-none focus:shadow-brutal transition-shadow font-mono text-sm"
                      placeholder="# Judul\n\nTulis konten markdown di sini..."
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-bold text-ink mb-2">
                      Content (English) <span className="text-ink-light font-normal">- Optional</span>
                    </label>
                    <textarea
                      value={formData.content_en}
                      onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                      className="w-full h-64 p-3 border-2 border-ink bg-paper focus:outline-none focus:shadow-brutal transition-shadow font-mono text-sm"
                      placeholder="# Title\n\nWrite markdown content here..."
                    />
                  </div>
                )}

                <p className="text-xs text-ink-light mt-2">
                  Supports Markdown: **bold**, *italic*, # heading, ## heading, etc.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="btn-brutal-sm flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Reset
                </button>
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="btn-brutal-sm flex items-center gap-2"
                >
                  <Eye size={16} />
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </button>
              </div>
            </div>

            {/* Preview Section */}
            <div className="space-y-6">
              {/* Generated Markdown */}
              <div className="card-brutal p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-pixel text-xl">Generated Markdown</h2>
                  <button
                    onClick={handleCopyToClipboard}
                    className="btn-brutal-sm flex items-center gap-2"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="bg-paper-dark border-2 border-ink p-4 overflow-x-auto text-xs font-mono max-h-96 overflow-y-auto">
                  {generatedMarkdown}
                </pre>
              </div>

              {/* Instructions */}
              <div className="card-brutal p-6 bg-accent-yellow/20">
                <h3 className="font-bold text-ink mb-3 flex items-center gap-2">
                  <AlertCircle size={18} />
                  How to Publish
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-ink-light">
                  <li>Fill in all required fields (marked with *)</li>
                  <li>Write your content in markdown format</li>
                  <li>Click &quot;Copy&quot; to copy the generated markdown</li>
                  <li>Create a new file in <code>/posts/</code> folder</li>
                  <li>Name it: <code>{formData.slug || "your-post-slug"}.md</code></li>
                  <li>Paste the content and save</li>
                  <li>Run <code>npm run build</code> to regenerate</li>
                </ol>
              </div>

              {/* Live Preview */}
              {showPreview && (
                <div className="card-brutal p-6">
                  <h2 className="font-pixel text-xl mb-4">Live Preview</h2>
                  <div className="border-2 border-ink p-4 bg-paper">
                    <div className="mb-4 pb-4 border-b-2 border-ink">
                      <h1 className="font-pixel text-2xl text-ink">
                        {language === "id" ? formData.title_id : (formData.title_en || formData.title_id)}
                      </h1>
                      <div className="flex items-center gap-4 mt-2 text-sm text-ink-light">
                        <span>{formData.date}</span>
                        <span className={`badge-category ${
                          formData.category === "Engineering" ? "bg-accent-blue" :
                          formData.category === "Religion" ? "bg-accent-yellow" : "bg-accent text-paper"
                        }`}>
                          {formData.category}
                        </span>
                        {formData.draft && <span className="badge-brutal-draft">DRAFT</span>}
                      </div>
                    </div>
                    <div className="prose-brutal text-ink">
                      {(language === "id" ? formData.content_id : formData.content_en)
                        .split("\n")
                        .map((line, i) => {
                          if (line.startsWith("# ")) {
                            return <h1 key={i} className="text-2xl font-bold mb-2">{line.replace("# ", "")}</h1>;
                          } else if (line.startsWith("## ")) {
                            return <h2 key={i} className="text-xl font-bold mb-2">{line.replace("## ", "")}</h2>;
                          } else if (line.startsWith("- ")) {
                            return <li key={i} className="ml-4">{line.replace("- ", "")}</li>;
                          } else if (line.trim() === "") {
                            return <br key={i} />;
                          } else {
                            return <p key={i} className="mb-2">{line}</p>;
                          }
                        })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Manage Posts Tab */
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-pixel text-2xl">Existing Posts</h2>
              <span className="text-ink-light">{filteredPosts.length} posts total</span>
            </div>

            <div className="space-y-4">
              {filteredPosts.map((post: Blog) => (
                <div key={post.slug} className="card-brutal-hover p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-pixel text-xl text-ink">{post.title_id}</h3>
                        {post.draft && (
                          <span className="badge-brutal-draft">DRAFT</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-ink-light">
                        <span>{post.date}</span>
                        <span className={`badge-category ${
                          post.category === "Engineering" ? "bg-accent-blue text-ink" :
                          post.category === "Religion" ? "bg-accent-yellow text-ink" : "bg-accent text-paper"
                        }`}>
                          {post.category}
                        </span>
                        <span>{post.readingTime}</span>
                        {post.hasEnglish && (
                          <span className="text-xs bg-paper-dark border border-ink px-2 py-0.5">
                            ID / EN
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-ink-light mt-2 font-mono">
                        File: /posts/{post.slug}.md
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditPost(post)}
                        className="btn-brutal-sm flex items-center gap-2"
                      >
                        <Edit2 size={16} />
                        Load to Edit
                      </button>
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <button className="btn-brutal-sm flex items-center gap-2">
                          <Eye size={16} />
                          View
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t-3 border-ink mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <p className="font-pixel text-sm text-ink-light">
            Admin Panel - GIBRAN.DEV
          </p>
        </div>
      </footer>
    </div>
  );
}
