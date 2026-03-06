// ============================================================
// Site Configuration
// ============================================================

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "",
  description: "",
  language: "",
};

// ============================================================
// Navigation
// ============================================================

export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationConfig {
  brandName: string;
  links: NavLink[];
  searchPlaceholder: string;
  searchHint: string;
  searchAriaLabel: string;
  closeSearchAriaLabel: string;
}

export const navigationConfig: NavigationConfig = {
  brandName: "",
  links: [],
  searchPlaceholder: "",
  searchHint: "",
  searchAriaLabel: "",
  closeSearchAriaLabel: "",
};

// ============================================================
// Hero Section
// ============================================================

export interface HeroConfig {
  date: string;
  titleLine1: string;
  titleLine2: string;
  readTime: string;
  description: string;
  ctaText: string;
  image: string;
  imageAlt: string;
}

export const heroConfig: HeroConfig = {
  date: "",
  titleLine1: "",
  titleLine2: "",
  readTime: "",
  description: "",
  ctaText: "",
  image: "",
  imageAlt: "",
};

// ============================================================
// Latest Articles (Horizontal Scroll)
// ============================================================

export interface ArticleItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  category: string;
}

export interface LatestArticlesConfig {
  sectionTitle: string;
  articles: ArticleItem[];
}

export const latestArticlesConfig: LatestArticlesConfig = {
  sectionTitle: "",
  articles: [],
};

// ============================================================
// Art Category Section
// ============================================================

export interface EventItem {
  date: string;
  title: string;
  location: string;
}

export interface GridArticle {
  id: number;
  title: string;
  category: string;
  readTime: string;
}

export interface ArtCategoryConfig {
  sectionTitle: string;
  categoriesLabel: string;
  eventsLabel: string;
  categories: string[];
  events: EventItem[];
  featuredImage: string;
  featuredImageAlt: string;
  featuredLabel: string;
  featuredTitle: string;
  featuredDescription: string;
  featuredCtaText: string;
  gridArticles: GridArticle[];
  readSuffix: string;
}

export const artCategoryConfig: ArtCategoryConfig = {
  sectionTitle: "",
  categoriesLabel: "",
  eventsLabel: "",
  categories: [],
  events: [],
  featuredImage: "",
  featuredImageAlt: "",
  featuredLabel: "",
  featuredTitle: "",
  featuredDescription: "",
  featuredCtaText: "",
  gridArticles: [],
  readSuffix: "",
};

// ============================================================
// Lifestyle Section
// ============================================================

export interface LifestyleArticle {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  rotation: number;
  position: { x: number; y: number };
  baseZIndex?: number;
}

export interface LifestyleConfig {
  sectionTitle: string;
  viewMoreText: string;
  articles: LifestyleArticle[];
}

export const lifestyleConfig: LifestyleConfig = {
  sectionTitle: "",
  viewMoreText: "",
  articles: [],
};

// ============================================================
// Design Section
// ============================================================

export interface DesignItem {
  id: number;
  title: string;
  quote: string;
  image: string;
  size: string;
  gridColumn?: number;
}

export interface DesignConfig {
  sectionTitle: string;
  viewMoreText: string;
  items: DesignItem[];
}

export const designConfig: DesignConfig = {
  sectionTitle: "",
  viewMoreText: "",
  items: [],
};

// ============================================================
// Green Tribe Section
// ============================================================

export interface TribeMember {
  id: number;
  name: string;
  role: string;
  title: string;
  excerpt: string;
  avatar: string;
}

export interface GreenTribeConfig {
  sectionTitle: string;
  sectionDescription: string;
  readMoreText: string;
  joinTitle: string;
  joinDescription: string;
  emailPlaceholder: string;
  subscribeText: string;
  memberCountText: string;
  videoSrc: string;
  videoPoster: string;
  members: TribeMember[];
}

export const greenTribeConfig: GreenTribeConfig = {
  sectionTitle: "",
  sectionDescription: "",
  readMoreText: "",
  joinTitle: "",
  joinDescription: "",
  emailPlaceholder: "",
  subscribeText: "",
  memberCountText: "",
  videoSrc: "",
  videoPoster: "",
  members: [],
};

// ============================================================
// Authors Section
// ============================================================

export interface Author {
  id: number;
  name: string;
  role: string;
  avatar: string;
  articles: number;
  social: { instagram: string; twitter: string };
}

export interface AuthorsConfig {
  sectionTitle: string;
  sectionSubtitle: string;
  articlesSuffix: string;
  authors: Author[];
}

export const authorsConfig: AuthorsConfig = {
  sectionTitle: "",
  sectionSubtitle: "",
  articlesSuffix: "",
  authors: [],
};

// ============================================================
// Instagram Gallery Section
// ============================================================

export interface InstagramImage {
  id: number;
  image: string;
  likes: number;
}

export interface InstagramGalleryConfig {
  handle: string;
  handleUrl: string;
  description: string;
  followText: string;
  likesSuffix: string;
  images: InstagramImage[];
}

export const instagramGalleryConfig: InstagramGalleryConfig = {
  handle: "",
  handleUrl: "",
  description: "",
  followText: "",
  likesSuffix: "",
  images: [],
};

// ============================================================
// Footer
// ============================================================

export interface FooterConfig {
  brandWatermark: string;
  newsletterTitle: string;
  newsletterDescription: string;
  emailPlaceholder: string;
  subscribeText: string;
  subscribeSuccessMessage: string;
  categoriesLabel: string;
  categories: string[];
  pagesLabel: string;
  pages: string[];
  legalLabel: string;
  legalLinks: string[];
  socialLabel: string;
  socialLinks: {
    instagram: string;
    twitter: string;
    youtube: string;
  };
  backToTopText: string;
  copyright: string;
  credit: string;
}

export const footerConfig: FooterConfig = {
  brandWatermark: "",
  newsletterTitle: "",
  newsletterDescription: "",
  emailPlaceholder: "",
  subscribeText: "",
  subscribeSuccessMessage: "",
  categoriesLabel: "",
  categories: [],
  pagesLabel: "",
  pages: [],
  legalLabel: "",
  legalLinks: [],
  socialLabel: "",
  socialLinks: {
    instagram: "",
    twitter: "",
    youtube: "",
  },
  backToTopText: "",
  copyright: "",
  credit: "",
};
