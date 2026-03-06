import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Github, Twitter, ArrowUp, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { personalInfo } from '@/data/personal';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: personalInfo.social.linkedin, icon: Linkedin },
    { href: personalInfo.social.github, icon: Github },
    { href: personalInfo.social.twitter, icon: Twitter },
    { href: `mailto:${personalInfo.email}`, icon: Mail },
  ];

  return (
    <footer ref={footerRef} className="border-t border-white/10 py-12 px-4 md:px-8">
      <div ref={contentRef} className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand & Social */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link to="/" className="text-lg font-bold tracking-tight">
              <span className="text-muted-foreground">&lt;</span>
              <span className="gradient-text">{personalInfo.nickName}</span>
              <span className="text-muted-foreground">/&gt;</span>
            </Link>
            <div className="flex gap-2">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <link.icon className="w-4 h-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              {t('Home', 'Beranda')}
            </Link>
            <Link to="/blog" className="hover:text-foreground transition-colors">
              {t('Blog', 'Blog')}
            </Link>
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-muted-foreground text-xs flex items-center gap-1">
            &copy; {currentYear} {personalInfo.name.split(' ').slice(0, 2).join(' ')} ·
            <span className="flex items-center gap-1">
              {t('Made with', 'Dibuat dengan')} <Heart className="w-3 h-3 text-rose-400" /> {t('in', 'di')} Makassar
            </span>
          </p>
          <p className="text-muted-foreground/50 text-xs">
            #FreePalestine
          </p>
        </div>
      </div>
    </footer>
  );
}
