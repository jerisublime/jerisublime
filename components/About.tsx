import React from 'react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
  const { content: siteContent } = useContent();
  const { language } = useLanguage();

  // Default translated content (fallbacks)
  const defaultContent = {
    pt: {
      title: 'Relaxe no Coração das Dunas',
      text1: 'Jeri Sublime nasceu do desejo de integrar conforto com a energia vibrante de Jericoacoara. Nossa arquitetura respeita o clima e a essência local, aproveitando a brisa constante do mar e os materiais da região.',
      text2: 'A poucos passos da água, dos principais restaurantes e da vida noturna, oferecemos uma hospedagem leve, e bem localizada para quem deseja aproveitar Jeri com conforto e liberdade.',
    },
    en: {
      title: 'Relax in the Heart of the Dunes',
      text1: 'Jeri Sublime was born from the desire to integrate comfort with the vibrant energy of Jericoacoara. Our architecture respects the climate and local essence, taking advantage of the constant sea breeze and local materials.',
      text2: 'Steps away from the water, main restaurants, and nightlife, we offer a light and well-located lodging for those who want to enjoy Jeri with comfort and freedom.',
    },
    es: {
      title: 'Relájate en el Corazón de las Dunas',
      text1: 'Jeri Sublime nació del deseo de integrar confort con la energía vibrante de Jericoacoara. Nuestra arquitectura respeta el clima y la esencia local, aprovechando la brisa constante del mar y los materiales de la región.',
      text2: 'A pocos pasos del agua, de los principales restaurantes y de la vida nocturna, ofrecemos un alojamiento ligero y bien ubicado para quienes desean disfrutar de Jeri con comodidad y libertad.',
    },
  };

  const defaults = defaultContent[language];

  // Use content from admin (ContentContext) if available, otherwise use translated defaults
  const translatedContent = {
    title: siteContent.aboutTitle || defaults.title,
    text1: siteContent.aboutText1 || defaults.text1,
    text2: siteContent.aboutText2 || defaults.text2,
  };

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
              src="/images/piscina1.jpg"
              alt="Interior do Hotel"
              className="w-full h-[600px] object-cover rounded-sm shadow-2xl hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-100 -z-10 hidden md:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;