import HeroSection from '@/sections/HeroSection';
import SkillsSection from '@/sections/SkillsSection';
import GitHubContributions from '@/sections/GitHubContributions';
import BlogPreview from '@/sections/BlogPreview';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SkillsSection />
      <GitHubContributions />
      <BlogPreview />
    </>
  );
}
