import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Github, Twitter, ArrowUp, Heart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { personalInfo, sectionLabels } from '@/data/personal';

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

  return (
    <footer ref={footerRef} className="bg-ink text-paper py-16 px-4 md:px-8">
      <div ref={contentRef} className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="font-mono text-2xl font-bold tracking-tight mb-4 block">
              <span className="text-accent-red">&lt;</span>
              {personalInfo.nickName.toUpperCase()}
              <span className="text-accent-red">/&gt;</span>
            </Link>
            <p className="text-paper/70 mb-6">
              {t('Flutter Engineer crafting beautiful mobile experiences.', 
                 'Engineer Flutter yang menciptakan pengalaman mobile yang indah.')}
            </p>
            <div className="flex gap-3">
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-paper/30 flex items-center justify-center hover:bg-paper hover:text-ink transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-paper/30 flex items-center justify-center hover:bg-paper hover:text-ink transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-paper/30 flex items-center justify-center hover:bg-paper hover:text-ink transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-10 h-10 border-2 border-paper/30 flex items-center justify-center hover:bg-paper hover:text-ink transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono font-bold uppercase mb-4 text-sm tracking-wider">
              {t('Quick Links', 'Tautan Cepat')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-paper/70 hover:text-paper transition-colors">
                  {t('Home', 'Beranda')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-paper/70 hover:text-paper transition-colors">
                  {t('Blog', 'Blog')}
                </Link>
              </li>
              <li>
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/70 hover:text-paper transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/70 hover:text-paper transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono font-bold uppercase mb-4 text-sm tracking-wider">
              {t(sectionLabels.getInTouch.en, sectionLabels.getInTouch.id)}
            </h4>
            <p className="text-paper/70 mb-4">
              {t('Open for collaborations and opportunities.', 
                 'Terbuka untuk kolaborasi dan kesempatan.')}
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 border-2 border-paper/30 px-4 py-2 hover:bg-paper hover:text-ink transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="font-mono text-sm">{personalInfo.email}</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-2 border-paper/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-paper/50 text-sm font-mono flex items-center gap-1">
            © {currentYear} {personalInfo.name.split(' ').slice(0, 2).join(' ')} •
            <span className="flex items-center gap-1">
              {t('Made with', 'Dibuat dengan')} <Heart className="w-3 h-3 text-accent-red" /> {t('in', 'di')} Makassar
            </span>
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-paper/50 hover:text-paper transition-colors font-mono text-sm"
          >
            <span>{t('Back to Top', 'Kembali ke Atas')}</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Palestine Support */}
        <div className="mt-8 text-center">
          <p className="text-paper/30 text-xs font-mono">
            #SafePalestine 🇵🇸 🍉
          </p>
        </div>
      </div>
    </footer>
  );
}
