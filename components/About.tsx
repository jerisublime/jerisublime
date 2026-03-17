import React from 'react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
  const { content } = useContent();
  const { language } = useLanguage();

  // Default translated content
  const defaultContent = {
    pt: {
      title: 'Relaxe no Coração das Dunas',
      text1: 'O Jeri Sublime nasceu do desejo de integrar conforto absoluto com a energia vibrante de Jericoacoara. Nossa arquitetura respeita o meio ambiente, utilizando materiais locais e aproveitando a brisa constante do mar.',
      text2: 'A poucos passos da água, oferecemos um refúgio de tranquilidade, gastronomia de alto nível e serviço personalizado para que cada momento seja memorável.',
    },
    en: {
      title: 'Relax in the Heart of the Dunes',
      text1: 'Jeri Sublime was born from the desire to integrate absolute comfort with the vibrant energy of Jericoacoara. Our architecture respects the environment, using local materials and taking advantage of the constant sea breeze.',
      text2: 'Steps away from the water, we offer a refuge of tranquility, fine dining, and personalized service to make every moment memorable.',
    },
    es: {
      title: 'Relájate en el Corazón de las Dunas',
      text1: 'Jeri Sublime nació del deseo de integrar el confort absoluto con la energía vibrante de Jericoacoara. Nuestra arquitectura respeta el medio ambiente, utilizando materiales locales y aprovechando la brisa constante del mar.',
      text2: 'A pocos pasos del agua, ofrecemos un refugio de tranquilidad, gastronomía de alto nivel y servicio personalizado para que cada momento sea memorable.',
    },
  };

  const translatedContent = defaultContent[language];

  return (
    <section id="about" className="py-20 md:py-32 bg-sand-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-900 leading-tight">
              {translatedContent.title}
            </h2>
            <div className="w-20 h-1 bg-brand-500"></div>
            <p className="text-slate-600 leading-relaxed text-lg">
              {translatedContent.text1}
            </p>
            <p className="text-slate-600 leading-relaxed text-lg">
              {translatedContent.text2}
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80"
              alt="Interior do Hotel"
              className="w-full h-[600px] object-cover rounded-sm shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-100 -z-10 hidden md:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;