import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Rooms from './components/Rooms';
import Experience from './components/Experience';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import SuitesPage from './pages/SuitesPage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import SuiteDetailPage from './pages/SuiteDetailPage';
import { Phone } from 'lucide-react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const WhatsAppButton = () => {
  const whatsappNumber = (import.meta as any).env?.VITE_WHATSAPP_NUMBER || '5588988788779';

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 left-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 flex items-center gap-2 group"
      aria-label="Contact via WhatsApp"
    >
      <Phone className="w-6 h-6 fill-current" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-medium">
        WhatsApp
      </span>
    </a>
  );
};

function Home() {
  return (
    <>
      <Hero />
      <div id="about"><About /></div>
      <Rooms />
      <div id="experience"><Experience /></div>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ContentProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col font-sans relative">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/suites" element={<SuitesPage />} />
                <Route path="/suites/:id" element={<SuiteDetailPage />} />
                <Route path="/sobre" element={<AboutPage />} />
                <Route path="/galeria" element={<GalleryPage />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <Footer />

            {/* Floating Widgets */}
            <Chatbot />
            <WhatsAppButton />
          </div>
        </Router>
      </ContentProvider>
    </LanguageProvider>
  );
}

export default App;