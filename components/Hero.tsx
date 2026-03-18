import React, { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const { language, t } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Translated hero content
  const heroContent = {
    pt: {
      title: 'A Essência de Jericoacoara',
      subtitle: 'Onde o luxo rústico encontra a natureza intocada.',
    },
    en: {
      title: 'The Essence of Jericoacoara',
      subtitle: 'Where rustic luxury meets untouched nature.',
    },
    es: {
      title: 'La Esencia de Jericoacoara',
      subtitle: 'Donde el lujo rústico encuentra la naturaleza intacta.',
    },
  };

  const content = heroContent[language];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image Overlay Carousel */}
      {heroImages.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${
            idx === currentImage ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{ backgroundImage: `url('${img}')` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative h-full container mx-auto px-6 flex flex-col justify-center items-center text-center text-white">
        <span className="text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-4 animate-fade-in-up">
          {t.hero.welcome}
        </span>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight animate-fade-in-up delay-100">
          {content.title}
        </h1>
        <p className="max-w-xl text-lg md:text-xl font-light mb-10 opacity-90 animate-fade-in-up delay-200">
          {content.subtitle}
        </p>

        <button
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          className="animate-bounce mt-12 p-3 border rounded-full hover:bg-white hover:text-brand-900 transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default Hero;