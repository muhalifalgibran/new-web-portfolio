import { useState, useEffect } from 'react';
import { getPublishedPosts, getPostBySlug } from '@/lib/api';
import { getPublishedPosts as getFallbackPosts, getPostBySlug as getFallbackPost, type BlogPost } from '@/data/blog';

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>(getFallbackPosts());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getPublishedPosts()
      .then(data => {
        if (!cancelled) setPosts(data);
      })
      .catch(err => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { posts, loading, error };
}

export function useBlogPost(slug: string | undefined) {
  const [post, setPost] = useState<BlogPost | undefined>(
    slug ? getFallbackPost(slug) : undefined
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    getPostBySlug(slug)
      .then(data => {
        if (!cancelled) setPost(data);
      })
      .catch(err => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [slug]);

  return { post, loading, error };
}
