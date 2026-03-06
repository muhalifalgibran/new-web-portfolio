import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { navigationLabels, personalInfo } from '@/data/personal';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t(navigationLabels.home.en, navigationLabels.home.id) },
    { href: '/blog', label: t(navigationLabels.blog.en, navigationLabels.blog.id) },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-paper/95 backdrop-blur-sm border-b-3 border-ink'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="font-mono text-lg md:text-xl font-bold tracking-tight hover:opacity-70 transition-opacity"
            >
              <span className="text-accent-red">&lt;</span>
              {personalInfo.nickName.toUpperCase()}
              <span className="text-accent-red">/&gt;</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-mono text-sm uppercase tracking-wider relative group ${
                    isActive(link.href)
                      ? 'text-ink'
                      : 'text-ink-light hover:text-ink'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-ink transition-all duration-300 ${
                      isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 font-mono text-sm border-2 border-ink px-3 py-1.5 hover:bg-ink hover:text-paper transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{language}</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 border-2 border-ink hover:bg-ink hover:text-paper transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-paper transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-mono text-2xl uppercase tracking-wider ${
                isActive(link.href) ? 'text-ink' : 'text-ink-light'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Language Toggle */}
          <button
            onClick={() => {
              toggleLanguage();
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 font-mono text-lg border-2 border-ink px-4 py-2 mt-4"
          >
            <Globe className="w-5 h-5" />
            <span className="uppercase">{language === 'en' ? 'English' : 'Bahasa Indonesia'}</span>
          </button>
        </div>
      </div>
    </>
  );
}
