import React from 'react';
import { Sun, Waves, Wine, Camera } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Experience: React.FC = () => {
  const { t } = useLanguage();

  const experiences = [
    {
      icon: <Sun className="w-8 h-8" />,
      title: t.experiences.items.sunset.title,
      desc: t.experiences.items.sunset.desc,
    },
    {
      icon: <Waves className="w-8 h-8" />,
      title: t.experiences.items.kitesurf.title,
      desc: t.experiences.items.kitesurf.desc,
    },
    {
      icon: <Wine className="w-8 h-8" />,
      title: t.experiences.items.gastronomy.title,
      desc: t.experiences.items.gastronomy.desc,
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: t.experiences.items.tours.title,
      desc: t.experiences.items.tours.desc,
    },
  ];

  return (
    <section id="experience" className="py-20 bg-brand-900 text-white relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-brand-300 font-bold tracking-widest uppercase text-sm">{t.experiences.sectionTitle}</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-4 mb-8 leading-tight">
              {t.experiences.title}
            </h2>
            <p className="text-brand-100 text-lg opacity-80 mb-12">
              {t.experiences.subtitle}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                <div className="text-brand-300 mb-4">{exp.icon}</div>
                <h4 className="text-xl font-serif font-bold mb-3">{exp.title}</h4>
                <p className="text-sm text-brand-100 opacity-70 leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;