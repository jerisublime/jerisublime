import React from 'react';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface RoomsProps {
  limit?: number;
}

const Rooms: React.FC<RoomsProps> = ({ limit }) => {
  const { suites } = useContent();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const displaySuites = limit ? suites.slice(0, limit) : suites;

  return (
    <section id="rooms" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-500 font-bold tracking-widest uppercase text-sm">{t.suites.sectionTitle}</span>
          <h2 className="text-4xl font-serif font-bold text-brand-900 mt-4">{t.suites.title}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {displaySuites.map((room) => (
            <div
              key={room.id}
              className="group cursor-pointer"
              onClick={() => navigate(`/suites/${room.id}`)}
            >
              <div className="overflow-hidden mb-6 relative h-80 bg-slate-100">
                <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/10 transition-colors z-10 duration-500"></div>
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <h3 className="text-2xl font-serif text-brand-900 mb-2 group-hover:text-brand-500 transition-colors">{room.title}</h3>
              <p className="text-slate-500 mb-4 line-clamp-2">{room.desc}</p>
              <div className="flex justify-end items-center border-t border-slate-100 pt-4">
                <span className="text-brand-500 text-sm font-bold uppercase tracking-wide group-hover:translate-x-1 transition-transform">{t.suites.viewDetails} &rarr;</span>
              </div>
            </div>
          ))}
        </div>

        {limit && suites.length > limit && (
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/suites')}
              className="inline-block border-b border-brand-900 text-brand-900 pb-1 hover:text-brand-500 hover:border-brand-500 transition-colors"
            >
              {t.suites.viewAll}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Rooms;