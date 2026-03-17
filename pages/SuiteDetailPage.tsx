import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useLanguage } from '../context/LanguageContext';
import { Check, ChevronLeft, ChevronRight, ArrowLeft, X, MessageCircle } from 'lucide-react';


const SuiteDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { suites, content } = useContent();
    const { t, language } = useLanguage();

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const suite = suites.find(s => s.id === id);

    // Get gallery images (main image + additional)
    const galleryImages = suite
        ? [suite.image, ...(suite.gallery || [])]
        : [];

    useEffect(() => {
        if (!suite) {
            navigate('/suites');
        }
    }, [suite, navigate]);

    if (!suite) {
        return (
            <div className="pt-24 pb-20 flex items-center justify-center min-h-screen">
                <p className="text-slate-500">{t.common.loading}</p>
            </div>
        );
    }

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    const defaultAmenitiesList = [
        t.suites.amenities.wifi,
        t.suites.amenities.breakfast,
        t.suites.amenities.airConditioning,
        t.suites.amenities.amenities,
        language === 'pt' ? 'Varanda Privativa' : language === 'en' ? 'Private Balcony' : 'Balcón Privado',
        language === 'pt' ? 'Frigobar' : language === 'en' ? 'Minibar' : 'Minibar',
        language === 'pt' ? 'Cofre Digital' : language === 'en' ? 'Digital Safe' : 'Caja Fuerte Digital',
        language === 'pt' ? 'TV Smart 55"' : language === 'en' ? '55" Smart TV' : 'TV Smart 55"',
    ];

    const displayAmenities = suite.features && suite.features.length > 0
      ? suite.features
      : defaultAmenitiesList;

    const whatsappText = language === 'pt'
        ? `Olá! Gostaria de mais informações sobre a ${suite.title}.`
        : language === 'en'
            ? `Hello! I would like more information about the ${suite.title}.`
            : `¡Hola! Me gustaría más información sobre la ${suite.title}.`;

    const whatsappLabel = language === 'pt'
        ? 'Consultar via WhatsApp'
        : language === 'en'
            ? 'Inquire via WhatsApp'
            : 'Consultar por WhatsApp';

    return (
        <div className="pt-24 pb-20 bg-sand-50">
            {/* Back Button */}
            <div className="container mx-auto px-6 mb-8">
                <button
                    onClick={() => navigate('/suites')}
                    className="flex items-center gap-2 text-slate-600 hover:text-brand-500 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>{t.suites.viewAll}</span>
                </button>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12">

                    {/* Image Gallery */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div
                            className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl cursor-pointer group"
                            onClick={() => setLightboxOpen(true)}
                        >
                            <img
                                src={galleryImages[currentImageIndex]}
                                alt={suite.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />



                            {/* Navigation Arrows */}
                            {galleryImages.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                                    >
                                        <ChevronLeft className="w-6 h-6 text-brand-900" />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                                    >
                                        <ChevronRight className="w-6 h-6 text-brand-900" />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnail Grid */}
                        {galleryImages.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {galleryImages.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImageIndex(idx)}
                                        className={`aspect-square rounded overflow-hidden border-2 transition-all ${idx === currentImageIndex ? 'border-brand-500 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                                            }`}
                                    >
                                        <img src={img} alt={`${suite.title} ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Suite Details */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-900 mb-4">{suite.title}</h1>
                            <div className="w-20 h-1 bg-brand-500"></div>
                        </div>

                        <p className="text-lg text-slate-600 leading-relaxed">
                            {suite.desc}
                        </p>

                        {/* Extended Description */}
                        <div className="text-slate-600 leading-relaxed space-y-4">
                            <p className="whitespace-pre-line">
                                {suite.fullDesc || (
                                    language === 'pt' ? 'Esta suíte foi cuidadosamente projetada para proporcionar o máximo conforto e relaxamento. Com decoração que harmoniza elementos rústicos e modernos, você se sentirá em casa enquanto desfruta do luxo que merece.' :
                                    language === 'en' ? 'This suite has been carefully designed to provide maximum comfort and relaxation. With decor that harmonizes rustic and modern elements, you will feel at home while enjoying the luxury you deserve.' :
                                    'Esta suite ha sido cuidadosamente diseñada para proporcionar el máximo confort y relajación. Con una decoración que armoniza elementos rústicos y modernos, te sentirás como en casa mientras disfrutas del lujo que mereces.'
                                )}
                            </p>
                        </div>

                        {/* Amenities */}
                        <div>
                            <h3 className="text-xl font-serif font-bold text-brand-900 mb-4">
                                {content.amenitiesTitle || (language === 'pt' ? 'Comodidades' : language === 'en' ? 'Amenities' : 'Comodidades')}
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {displayAmenities.map((amenity, idx) => (
                                    <div key={idx} className="flex items-center gap-2 text-slate-600">
                                        <Check className="w-5 h-5 text-brand-500 flex-shrink-0" />
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA - Only WhatsApp */}
                        <div className="pt-6">
                            <a
                                href={`https://wa.me/5588988788779?text=${encodeURIComponent(whatsappText)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full bg-green-500 text-white py-4 text-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-3"
                            >
                                <MessageCircle className="w-6 h-6" />
                                {whatsappLabel}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in">
                    <button
                        onClick={() => setLightboxOpen(false)}
                        className="absolute top-6 right-6 text-white/80 hover:text-white p-2"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <button
                        onClick={prevImage}
                        className="absolute left-4 md:left-8 text-white/80 hover:text-white p-2"
                    >
                        <ChevronLeft className="w-10 h-10" />
                    </button>

                    <button
                        onClick={nextImage}
                        className="absolute right-4 md:right-8 text-white/80 hover:text-white p-2"
                    >
                        <ChevronRight className="w-10 h-10" />
                    </button>

                    <img
                        src={galleryImages[currentImageIndex]}
                        alt={suite.title}
                        className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                    />

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-medium">
                        {currentImageIndex + 1} / {galleryImages.length}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuiteDetailPage;
