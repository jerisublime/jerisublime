import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { MapPin, Wifi, Coffee, Wind, Star, Waves, UtensilsCrossed, Flower2 } from 'lucide-react';

const differentials = [
    { icon: <MapPin className="w-6 h-6" />, key: 'location' },
    { icon: <Wifi className="w-6 h-6" />, key: 'wifi' },
    { icon: <Coffee className="w-6 h-6" />, key: 'breakfast' },
    { icon: <Wind className="w-6 h-6" />, key: 'ac' },
    { icon: <Waves className="w-6 h-6" />, key: 'pool' },
    { icon: <UtensilsCrossed className="w-6 h-6" />, key: 'restaurant' },
    { icon: <Flower2 className="w-6 h-6" />, key: 'spa' },
    { icon: <Star className="w-6 h-6" />, key: 'concierge' },
];

const differentialTexts: Record<string, Record<string, { title: string; desc: string }>> = {
    pt: {
        location: { title: 'Localização Premium', desc: 'A poucos passos da praia e da Duna do Pôr do Sol' },
        wifi: { title: 'Wi-Fi de Alta Velocidade', desc: 'Conexão rápida em todas as áreas' },
        breakfast: { title: 'Café da Manhã Gourmet', desc: 'Buffet completo com produtos regionais' },
        ac: { title: 'Climatização', desc: 'Ar condicionado em todas as suítes' },
        pool: { title: 'Piscina Infinita', desc: 'Vista panorâmica para o mar' },
        restaurant: { title: 'Restaurante Orizonte', desc: 'Alta gastronomia cearense' },
        spa: { title: 'Spa & Bem-estar', desc: 'Massagens e tratamentos relaxantes' },
        concierge: { title: 'Concierge 24h', desc: 'Atendimento personalizado a qualquer hora' },
    },
    en: {
        location: { title: 'Premium Location', desc: 'Steps away from the beach and Sunset Dune' },
        wifi: { title: 'High-Speed Wi-Fi', desc: 'Fast connection in all areas' },
        breakfast: { title: 'Gourmet Breakfast', desc: 'Full buffet with regional products' },
        ac: { title: 'Air Conditioning', desc: 'Climate control in all suites' },
        pool: { title: 'Infinity Pool', desc: 'Panoramic ocean views' },
        restaurant: { title: 'Orizonte Restaurant', desc: 'Fine Ceará cuisine' },
        spa: { title: 'Spa & Wellness', desc: 'Massages and relaxing treatments' },
        concierge: { title: '24h Concierge', desc: 'Personalized service anytime' },
    },
    es: {
        location: { title: 'Ubicación Premium', desc: 'A pocos pasos de la playa y la Duna del Atardecer' },
        wifi: { title: 'Wi-Fi de Alta Velocidad', desc: 'Conexión rápida en todas las áreas' },
        breakfast: { title: 'Desayuno Gourmet', desc: 'Buffet completo con productos regionales' },
        ac: { title: 'Aire Acondicionado', desc: 'Climatización en todas las suites' },
        pool: { title: 'Piscina Infinita', desc: 'Vista panorámica al mar' },
        restaurant: { title: 'Restaurante Orizonte', desc: 'Alta gastronomía cearense' },
        spa: { title: 'Spa & Bienestar', desc: 'Masajes y tratamientos relajantes' },
        concierge: { title: 'Conserje 24h', desc: 'Atención personalizada a cualquier hora' },
    },
};

const pageContent: Record<string, any> = {
    pt: {
        sectionTitle: 'Sobre Nós',
        pageTitle: 'Conheça o Jeri Sublime',
        pageSubtitle: 'Uma experiência única de hospedagem em Jericoacoara',
        historyTitle: 'Nossa História',
        aboutTitle: 'Relaxe no Coração das Dunas',
        aboutText1: 'O Jeri Sublime nasceu do desejo de integrar conforto absoluto com a energia vibrante de Jericoacoara. Nossa arquitetura respeita o meio ambiente, utilizando materiais locais e aproveitando a brisa constante do mar.',
        aboutText2: 'A poucos passos da água, oferecemos um refúgio de tranquilidade, gastronomia de alto nível e serviço personalizado para que cada momento seja memorável.',
        locationTitle: 'Localização Privilegiada',
        locationDesc: 'Situado no coração de Jericoacoara, a poucos passos da praia e da famosa Duna do Pôr do Sol.',
        locationText: 'Jericoacoara é um dos destinos mais desejados do Brasil, conhecido por suas dunas douradas, lagoas cristalinas e ventos perfeitos para esportes náuticos. Nossa pousada está estrategicamente localizada para que você aproveite o melhor da vila.',
        differentialsTitle: 'Nossos Diferenciais',
        differentialsSubtitle: 'O Que Nos Torna Únicos',
        galleryTitle: 'Galeria de Fotos',
        gallerySubtitle: 'Nossos Espaços',
    },
    en: {
        sectionTitle: 'About Us',
        pageTitle: 'Discover Jeri Sublime',
        pageSubtitle: 'A unique lodging experience in Jericoacoara',
        historyTitle: 'Our Story',
        aboutTitle: 'Relax in the Heart of the Dunes',
        aboutText1: 'Jeri Sublime was born from the desire to integrate absolute comfort with the vibrant energy of Jericoacoara. Our architecture respects the environment, using local materials and taking advantage of the constant sea breeze.',
        aboutText2: 'Steps away from the water, we offer a refuge of tranquility, fine dining, and personalized service to make every moment memorable.',
        locationTitle: 'Prime Location',
        locationDesc: 'Located in the heart of Jericoacoara, steps away from the beach and the famous Sunset Dune.',
        locationText: 'Jericoacoara is one of Brazil\'s most desired destinations, known for its golden dunes, crystal-clear lagoons, and perfect winds for water sports. Our inn is strategically located so you can enjoy the best of the village.',
        differentialsTitle: 'Our Differentials',
        differentialsSubtitle: 'What Makes Us Unique',
        galleryTitle: 'Photo Gallery',
        gallerySubtitle: 'Our Spaces',
    },
    es: {
        sectionTitle: 'Sobre Nosotros',
        pageTitle: 'Conoce Jeri Sublime',
        pageSubtitle: 'Una experiencia única de hospedaje en Jericoacoara',
        historyTitle: 'Nuestra Historia',
        aboutTitle: 'Relájate en el Corazón de las Dunas',
        aboutText1: 'Jeri Sublime nació del deseo de integrar el confort absoluto con la energía vibrante de Jericoacoara. Nuestra arquitectura respeta el medio ambiente, utilizando materiales locales y aprovechando la brisa constante del mar.',
        aboutText2: 'A pocos pasos del agua, ofrecemos un refugio de tranquilidad, gastronomía de alto nivel y servicio personalizado para que cada momento sea memorable.',
        locationTitle: 'Ubicación Privilegiada',
        locationDesc: 'Ubicado en el corazón de Jericoacoara, a pocos pasos de la playa y la famosa Duna del Atardecer.',
        locationText: 'Jericoacoara es uno de los destinos más deseados de Brasil, conocido por sus dunas doradas, lagunas cristalinas y vientos perfectos para deportes náuticos. Nuestra posada está estratégicamente ubicada para que disfrutes lo mejor del pueblo.',
        differentialsTitle: 'Nuestros Diferenciales',
        differentialsSubtitle: 'Lo Que Nos Hace Únicos',
        galleryTitle: 'Galería de Fotos',
        gallerySubtitle: 'Nuestros Espacios',
    },
};

const galleryImages = [
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
];

const AboutPage: React.FC = () => {
    const { language } = useLanguage();
    const { content: siteContent } = useContent();
    const content = pageContent[language] || pageContent.pt;
    const diffTexts = differentialTexts[language] || differentialTexts.pt;

    return (
        <div className="pt-24 pb-20">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=1920&q=80')` }}
                >
                    <div className="absolute inset-0 bg-brand-900/60"></div>
                </div>
                <div className="relative z-10 text-center text-white px-6">
                    <span className="text-brand-300 font-medium tracking-widest uppercase text-sm">{content.sectionTitle}</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mt-4 mb-6">{content.pageTitle}</h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">{content.pageSubtitle}</p>
                </div>
            </section>

            {/* History Section */}
            <section className="py-20 bg-sand-50">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <span className="text-brand-500 font-bold tracking-widest uppercase text-sm">{content.historyTitle}</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-900 leading-tight">
                                {siteContent.aboutTitle || content.aboutTitle}
                            </h2>
                            <div className="w-20 h-1 bg-brand-500"></div>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                {siteContent.aboutText1 || content.aboutText1}
                            </p>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                {siteContent.aboutText2 || content.aboutText2}
                            </p>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80"
                                alt="Interior do Hotel"
                                className="w-full h-[500px] object-cover rounded-sm shadow-2xl"
                            />
                            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-brand-100 -z-10 hidden md:block"></div>
                            <div className="absolute -top-8 -right-8 w-32 h-32 bg-brand-500/20 -z-10 hidden md:block"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="order-2 md:order-1">
                            <div className="relative rounded-sm overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
                                    alt="Jericoacoara Beach"
                                    className="w-full h-[400px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/50 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MapPin className="w-5 h-5 text-brand-300" />
                                        <span className="font-medium">Jericoacoara, Ceará</span>
                                    </div>
                                    <p className="text-sm text-white/80">Brasil</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 md:order-2 space-y-8">
                            <span className="text-brand-500 font-bold tracking-widest uppercase text-sm">{content.locationTitle}</span>
                            <h2 className="text-4xl font-serif font-bold text-brand-900">
                                {content.locationDesc}
                            </h2>
                            <div className="w-20 h-1 bg-brand-500"></div>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                {content.locationText}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Differentials Section */}
            <section className="py-20 bg-brand-900 text-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-brand-300 font-bold tracking-widest uppercase text-sm">{content.differentialsTitle}</span>
                        <h2 className="text-4xl font-serif font-bold mt-4">{content.differentialsSubtitle}</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {differentials.map((diff, idx) => (
                            <div key={idx} className="bg-white/5 backdrop-blur-sm p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300 text-center">
                                <div className="text-brand-300 mb-4 flex justify-center">{diff.icon}</div>
                                <h4 className="text-xl font-serif font-bold mb-3">{diffTexts[diff.key].title}</h4>
                                <p className="text-sm text-brand-100 opacity-70">{diffTexts[diff.key].desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Preview */}
            <section className="py-20 bg-sand-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="text-brand-500 font-bold tracking-widest uppercase text-sm">{content.galleryTitle}</span>
                        <h2 className="text-4xl font-serif font-bold text-brand-900 mt-4">{content.gallerySubtitle}</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {galleryImages.map((img, idx) => (
                            <div key={idx} className="relative group overflow-hidden rounded-sm">
                                <img
                                    src={img}
                                    alt={`Gallery ${idx + 1}`}
                                    className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/30 transition-colors duration-300"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
