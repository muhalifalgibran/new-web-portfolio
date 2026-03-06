import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { useLenis } from '@/hooks/useLenis';
import NoiseOverlay from '@/components/NoiseOverlay';
import Navigation from '@/sections/Navigation';
import HomePage from '@/pages/HomePage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import NewBlogPostPage from '@/pages/NewBlogPostPage';
import LoginPage from '@/pages/LoginPage';
import Footer from '@/sections/Footer';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();

  if (loading) return null;
  if (!session) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function App() {
  // Initialize Lenis smooth scroll
  useLenis();

  useEffect(() => {
    // Set document title
    document.title = 'Muh Alif Al Gibran | Flutter Engineer';
    document.documentElement.lang = 'en';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Personal portfolio of Muh Alif Al Gibran - Flutter Engineer based in Indonesia');
    }
  }, []);

  useEffect(() => {
    // Refresh ScrollTrigger on load
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);

    // Handle resize
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="relative min-h-screen bg-paper">
            {/* Noise texture overlay */}
            <NoiseOverlay />

            {/* Grid pattern background */}
            <div className="fixed inset-0 grid-pattern pointer-events-none" />

            {/* Navigation */}
            <Navigation />

            {/* Main content */}
            <main className="relative z-10">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/blog/new" element={
                  <RequireAuth>
                    <NewBlogPostPage />
                  </RequireAuth>
                } />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
