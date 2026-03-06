 Personal Portfolio Planning
 1. Personal Information
**Full Name:**  
Muh Alif Al Gibran Arif
**Professional Title:**  
Flutter Engineer
**Short Bio/About Me:**  
Hi, I'm Muh Alif Al Gibran, a passionate Flutter Engineer with almost 5 years of experience, currently working at an crypto exchange company in Indonesia. I've also had the privilege of contributing to projects with foreign companies. My days are fueled by faith, innovation, and perseverance—praying, working, learning, and grinding LeetCode are my daily rituals. When I’m not coding, you’ll find me playing football or running. Let's connect and create something amazing together! #SafePalestine 🇵🇸 🍉
**Profile Photo:**  
"To be Added"
**Location:**  
Makassar, Indonesia
**Contact Information:**  
- Email: muhalifalgibran@gmail.com
- Contact Form: "To be Added"
- LinkedIn: https://www.linkedin.com/in/muh-alif-al-gibran-64a60112a/
- GitHub: https://github.com/muhalifalgibran
- Twitter (Professional, optional): https://x.com/khalif0898
- Other relevant profiles: [List others, if any]
**Skills Summary:**  
- Flutter Engineer
- Python
- Go
- JavaScript

**Awards, Certifications, or Press Mentions (Optional):**  
- Kotlin Android Developer Expert, 2019. Dicoding Indonesia
- AWS Hackaton Finalist top 5 apps, link -> https://www.linkedin.com/posts/adinugrhoo_we-build-ollo-personal-healthcare-companion-activity-6513396244143017984-FgCM?utm_source=share&utm_medium=member_desktop&rcm=ACoAAB_E8loBsnE1iRs1XENFpe4Eqh7AUe9SMRI

---
 2. Blog Section Plan
**Blog Purpose & Tone:**  
personal thoughts, research, tutorials.
**Content Types:**  
- AI
- Flutter Engineering
- Religion
- Social Issue
- Engineering Stuffs

**Desired Features:**  
- [y] Markdown-based posts in repo
- [y] Tags/categories
- [y] Post publish date & reading time (optional)
- [y] Code highlighting
- [y] Featured images (Y/N)
- [y] Search/filtering (by tags, keywords)
- [y] Draft/publish workflow (Y/N)
- [y] Localization or languange settings (users can choose english or indonesia)

**Post Metadata Example:**  
- Title: Vibe code is a new programming languange 
- Date: 20, Aug 2026
- Tags/Categories: Programming
- Summary/Excerpt: Like it or not, vibe code now is a new programming language that is probably a must in nowadays
- Reading Time: 3 minutes
- Image (if wanted): "To be Added"
**Preferred Workflow for Posting:**  
[x] Write markdown files and commit  
[x] Write posts through a web admin/editor  
**Other Notes/Ideas:**  
---
3. Web styling
- pixel art, brutalism styling, papers color for easy to read
- make it simple as possible so the web not demaging the user's eyes
- use tailwind
- use next.js
---
Questions & Suggestions Before Implementation
1. Profile Photo  
   - I can add it later, just make a place holder for this part
2. Contact Form  
   - No need to add it for now
3. Featured Images  
   - just generic pixel image
4. Draft/Publish Workflow  
   - give a draft feature so I can update and post it for later
5. Localization/Language Choice  
   - At launch, do you want language toggling for all static texts, AND for blog posts? Will you write every post in both languages, or only some?
   - yes, give the user toggle for all static text, also for blog I need to have mandatory Bahasa Indonesia and optionally English text area input for the blog post in markdown
6. Search & Filter  
   - no need to add search for now, just add filter by engineering, religion, and social (can add the option for this filter when I input/edit the post)
7. Web Editor  
   - just planning on solo, so no need to add Web Editor.
8. Styling  
   - yes paper beige is better for reading I think

---
Refined Implementation Plan (added from assistant recommendations)

## 4. Implementation-Ready Checklist

### A. Home Page
- Language selector (EN/ID).
- Profile section (with placeholder photo).
- Concise bio, skills, certs, and social/contact links.

### B. Blog Page
- List of posts; filterable by category (Engineering, Religion, Social).
- Each post: title, date, excerpt, pixel-art featured image, language availability.
- Filter buttons for category.

### C. Individual Blog Post Page
- Content in Bahasa Indonesia by default; toggle to English if available.
- Metadata: title, date, reading time, tags, featured image.
- Markdown formatting & code highlighting.
- "Draft" badge if unpublished (visible to author).

### D. Authoring Workflow
- All posts as markdown files in repo.
- Frontmatter includes:
  - title
  - date
  - draft (true/false)
  - tags (Engineering, Religion, Social)
  - reading_time
  - featured_image (generic pixel)
- Content fields for ID (required) and EN (optional).

### E. Directory Structure Example
/blog/
  /first-post/
    index.id.md
    index.en.md (optional)
    featured.png (generic pixel art image)

### F. Technical Recommendations
- Use a static site generator with i18n and markdown support (Next.js, Astro, etc.).
- Use paper beige for background, pixel art for blog images.
- No contact form and web editor for now.

---

## 5. Next Steps
- Review and adjust as needed.
- Confirm framework choice and any additional preferred features.
- Begin implementation with this structure when ready!
