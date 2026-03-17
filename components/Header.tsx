import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wind, UserCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useContent();
  const { t } = useLanguage();

  // Lê o número do WhatsApp das variáveis de ambiente
  const whatsappNumber = (import.meta as any).env?.VITE_WHATSAPP_NUMBER || '5588988788779';

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Header style - solid when scrolled, mobile menu open, or not on home
  const shouldBeSolid = !isHome || isScrolled || mobileMenuOpen;

  const headerStyle = shouldBeSolid
    ? 'bg-white shadow-sm py-4 text-brand-900'
    : 'bg-transparent py-6 text-white';

  const navClasses = `fixed w-full z-[70] transition-all duration-300 ${headerStyle}`;

  const linkClass = shouldBeSolid
    ? "hover:text-brand-500 transition-colors"
    : "hover:text-brand-300 transition-colors";

  const selectorVariant = shouldBeSolid ? 'dark' : 'light';

  return (
    <>
      <header className={navClasses}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <Wind className={`w-8 h-8 ${shouldBeSolid ? 'text-brand-500' : 'text-white'} transition-colors duration-300 group-hover:rotate-12`} />
            <h1 className="text-xl md:text-2xl font-serif font-bold tracking-widest uppercase">
              Jeri Sublime
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium tracking-wide uppercase">
            <Link to="/" className={linkClass}>{t.nav.home}</Link>
            <Link to="/suites" className={linkClass}>{t.nav.suites}</Link>
            <Link to="/sobre" className={linkClass}>{t.nav.about}</Link>
            <Link to="/galeria" className={linkClass}>{t.nav.gallery}</Link>

            {/* Anchor links only work if on home, otherwise redirect home */}
            {isHome ? (
              <a href="#experience" className={linkClass}>{t.nav.experiences}</a>
            ) : (
              <Link to="/#experience" className={linkClass}>{t.nav.experiences}</Link>
            )}

            {isAuthenticated && (
              <Link to="/admin" className="text-brand-500 flex items-center gap-1 font-bold">
                <UserCircle className="w-4 h-4" /> {t.nav.admin}
              </Link>
            )}

            {/* Language Selector */}
            <LanguageSelector variant={selectorVariant} />
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSelector variant={selectorVariant} />
            <button
              className="p-2 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen
                ? <X className="w-6 h-6 text-brand-900" />
                : <Menu className={`w-6 h-6 ${shouldBeSolid ? 'text-brand-900' : 'text-white'}`} />
              }
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Separate from header for proper layering */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[65] bg-white pt-24 flex flex-col items-center justify-start gap-6 overflow-y-auto animate-fade-in">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-serif text-brand-900 hover:text-brand-500 transition-colors"
          >
            {t.nav.home}
          </Link>
          <Link
            to="/suites"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-serif text-brand-900 hover:text-brand-500 transition-colors"
          >
            {t.nav.suites}
          </Link>
          <Link
            to="/sobre"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-serif text-brand-900 hover:text-brand-500 transition-colors"
          >
            {t.nav.about}
          </Link>
          <Link
            to="/galeria"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-serif text-brand-900 hover:text-brand-500 transition-colors"
          >
            {t.nav.gallery}
          </Link>
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl font-serif text-brand-900 hover:text-brand-500 transition-colors"
          >
            {t.nav.experiences}
          </a>

          <div className="w-full px-8 mt-4">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 bg-green-500 text-white font-medium rounded-lg text-center flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
            >
              WhatsApp
            </a>
          </div>

          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm text-slate-400 mt-4 hover:text-brand-500 transition-colors"
          >
            {t.nav.restrictedArea}
          </Link>
        </div>
      )}
    </>
  );
};

export default Header;