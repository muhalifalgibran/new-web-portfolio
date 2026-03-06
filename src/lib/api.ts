import { supabase } from './supabase';
import { getPublishedPosts as getPublishedPostsFallback, getPostBySlug as getPostBySlugFallback, type BlogPost, type BlogCategory } from '@/data/blog';
import { personalInfo, navigationLabels, sectionLabels } from '@/data/personal';
import type { Tables } from '@/types/database';

type BlogPostRow = Tables<'blog_posts'>;

function rowToPost(row: BlogPostRow): BlogPost {
  return {
    slug: row.slug,
    title: { en: row.title_en, id: row.title_id },
    date: row.date,
    draft: row.draft,
    tags: row.tags as BlogCategory[],
    readingTime: row.reading_time,
    excerpt: { en: row.excerpt_en, id: row.excerpt_id },
    content: { en: row.content_en, id: row.content_id },
    featuredImage: row.featured_image ?? undefined,
  };
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('draft', false)
      .order('date', { ascending: false });

    if (error) throw error;
    return data.map(rowToPost);
  } catch {
    return getPublishedPostsFallback();
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return rowToPost(data);
  } catch {
    return getPostBySlugFallback(slug);
  }
}

export async function createPost(post: BlogPost): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from('blog_posts').insert({
    slug: post.slug,
    title_en: post.title.en,
    title_id: post.title.id,
    date: post.date,
    draft: post.draft,
    tags: post.tags,
    reading_time: post.readingTime,
    excerpt_en: post.excerpt.en,
    excerpt_id: post.excerpt.id,
    content_en: post.content.en,
    content_id: post.content.id,
    featured_image: post.featuredImage || null,
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function uploadBlogImage(file: File, path: string): Promise<string | null> {
  const { error } = await supabase.storage
    .from('blog-images')
    .upload(path, file, { upsert: true });

  if (error) return null;

  const { data } = supabase.storage.from('blog-images').getPublicUrl(path);
  return data.publicUrl;
}

export async function getPersonalInfo() {
  try {
    const { data, error } = await supabase
      .from('personal_info')
      .select('*');

    if (error) throw error;

    const map = new Map(data.map(row => [row.key, row.value]));

    return {
      personalInfo: (map.get('profile') as typeof personalInfo) ?? personalInfo,
      skills: (map.get('skills') as typeof personalInfo.skills) ?? personalInfo.skills,
      certifications: (map.get('certifications') as typeof personalInfo.certifications) ?? personalInfo.certifications,
      awards: (map.get('awards') as typeof personalInfo.awards) ?? personalInfo.awards,
      navigationLabels: (map.get('navigation_labels') as typeof navigationLabels) ?? navigationLabels,
      sectionLabels: (map.get('section_labels') as typeof sectionLabels) ?? sectionLabels,
    };
  } catch {
    return {
      personalInfo,
      skills: personalInfo.skills,
      certifications: personalInfo.certifications,
      awards: personalInfo.awards,
      navigationLabels,
      sectionLabels,
    };
  }
}
