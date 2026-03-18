import React from 'react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Check, MessageCircle } from 'lucide-react';
import Carousel from '../components/Carousel';

const SuitesPage: React.FC = () => {
  const { suites } = useContent();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const whatsappText = language === 'pt'
    ? 'Olá! Gostaria de mais informações sobre as suítes.'
    : language === 'en'
      ? 'Hello! I would like more information about the suites.'
      : '¡Hola! Me gustaría más información sobre las suites.';

  return (
    <div className="pt-24 pb-20 bg-sand-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-900 mb-6">{t.suites.title}</h1>
          <p className="max-w-2xl mx-auto text-slate-600 text-lg">
            {t.suites.subtitle}
          </p>
        </div>

        <div className="space-y-24">
          {suites.map((suite, idx) => (
            <div key={suite.id} className={`flex flex-col md:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>

              <div className="w-full md:w-1/2">
                <div
                  className="relative group overflow-hidden rounded-sm shadow-xl cursor-pointer h-[400px]"
                  onClick={() => navigate(`/suites/${suite.id}`)}
                >
                  <Carousel 
                    images={[suite.image, ...(suite.gallery || [])]} 
                    className="w-full h-full"
                    imageClassName="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/10 transition-colors duration-300 pointer-events-none"></div>
                </div>
              </div>

              <div className="w-full md:w-1/2 space-y-6">
                <h2 className="text-3xl font-serif font-bold text-brand-900">{suite.title}</h2>
                <div className="w-16 h-1 bg-brand-300"></div>
                <p className="text-lg text-slate-600 leading-relaxed">
                  {suite.desc}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Check className="w-4 h-4 text-brand-500" /> {t.suites.amenities.wifi}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Check className="w-4 h-4 text-brand-500" /> {t.suites.amenities.breakfast}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Check className="w-4 h-4 text-brand-500" /> {t.suites.amenities.airConditioning}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Check className="w-4 h-4 text-brand-500" /> {t.suites.amenities.amenities}
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate(`/suites/${suite.id}`)}
                    className="bg-brand-900 text-white px-8 py-3 hover:bg-brand-700 transition-colors"
                  >
                    {t.suites.viewDetails} →
                  </button>
                  <a
                    href={`https://wa.me/5588999999999?text=${encodeURIComponent(whatsappText + ' - ' + suite.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="border-2 border-green-500 text-green-600 px-8 py-3 hover:bg-green-500 hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuitesPage;