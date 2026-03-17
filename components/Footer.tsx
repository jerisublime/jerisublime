import React from 'react';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  // Lê as configurações das variáveis de ambiente
  const contactEmail = (import.meta as any).env?.VITE_CONTACT_EMAIL || 'jerisublime@outlook.com';
  const whatsappNumber = (import.meta as any).env?.VITE_WHATSAPP_NUMBER || '5588988788779';
  const formattedPhone = whatsappNumber.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 ($2) $3-$4');

  const handleDevelopmentLink = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Área em desenvolvimento');
  };

  return (
    <footer id="contact" className="bg-brand-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">

          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-serif font-bold mb-6">Jeri Sublime</h2>
            <p className="text-brand-100 opacity-80 max-w-sm mb-6">
              {t.footer.description}
            </p>
            <div className="flex gap-4">
              <a href="#" onClick={handleDevelopmentLink} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-500 hover:border-brand-500 transition-all" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" onClick={handleDevelopmentLink} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-brand-500 hover:border-brand-500 transition-all" aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif font-bold text-xl mb-6">{t.footer.contact}</h3>
            <ul className="space-y-4 text-brand-100 opacity-80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 text-brand-500" />
                <span>Beco Caminho da malhada, s/n<br />Vila de Jericoacoara, CE<br />CEP: 62598-000</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-500" />
                <span>{formattedPhone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-500" />
                <span>{contactEmail}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-xl mb-6">{t.footer.quickLinks}</h3>
            <ul className="space-y-3 text-brand-100 opacity-80">
              <li><Link to="/sobre" className="hover:text-brand-500 transition-colors">{t.nav.about}</Link></li>
              <li><Link to="/suites" className="hover:text-brand-500 transition-colors">{t.nav.suites}</Link></li>
              <li><Link to="/galeria" className="hover:text-brand-500 transition-colors">{t.nav.gallery}</Link></li>
              <li><a href="#experience" className="hover:text-brand-500 transition-colors">{t.nav.experiences}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 text-center text-sm text-brand-100 opacity-60">
          <p>&copy; {new Date().getFullYear()} Jeri Sublime Hotel. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;