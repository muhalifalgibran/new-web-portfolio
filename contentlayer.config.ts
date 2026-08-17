import { defineDocumentType, makeSource } from "contentlayer2/source-files";

// Helper to calculate reading time
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `**/*.md`,
  fields: {
    // English content in frontmatter for separate control
    title_en: { type: "string", required: false },
    
    // Indonesian content (required)
    title_id: { type: "string", required: true },
    
    // Metadata
    date: { type: "date", required: true },
    slug: { type: "string", required: true },
    category: { 
      type: "enum", 
      options: ["Engineering", "Religion", "Social"],
      required: true 
    },
    image: { type: "string", required: false },
    
    // Draft status - unpublished posts won't show in production
    draft: { type: "boolean", required: false, default: false },
    
    // Reading time - auto-calculated if not provided
    reading_time: { type: "string", required: false },
  },
  computedFields: {
    url: { 
      type: "string", 
      resolve: (doc) => `/blog/${doc.slug}` 
    },
    readingTime: {
      type: "string",
      resolve: (doc) => {
        // Use reading_time field if provided, otherwise calculate
        const manualTime = (doc as unknown as { reading_time?: string }).reading_time;
        if (manualTime) return manualTime;
        // Calculate based on body content
        const content = doc.body?.raw || "";
        return calculateReadingTime(content);
      },
    },
    wordCount: {
      type: "number",
      resolve: (doc) => {
        const content = doc.body?.raw || "";
        return content.trim().split(/\s+/).length;
      },
    },
    hasEnglish: {
      type: "boolean",
      resolve: (doc) => {
        const content = doc.body?.raw || "";
        return content.includes("---") && content.includes("English Version");
      },
    },
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [Blog],
  disableImportAliasWarning: true,
});
