import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useContent } from '../context/ContentContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type Category = 'all' | 'common' | 'suites' | 'experiences';

interface GalleryImage {
    id: string;
    src: string;
    alt: string;
    category: 'common' | 'suites' | 'experiences';
}

const defaultGalleryImages: GalleryImage[] = [
    { id: '1', src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80', alt: 'Área da Piscina', category: 'common' },
    { id: '2', src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80', alt: 'Lobby', category: 'common' },
    { id: '3', src: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80', alt: 'Restaurante', category: 'common' },
    { id: '4', src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', alt: 'Jardim', category: 'common' },
    { id: '5', src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', alt: 'Lounge', category: 'common' },
    { id: '6', src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80', alt: 'Suíte Standard', category: 'suites' },
    { id: '7', src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80', alt: 'Suíte Deluxe', category: 'suites' },
    { id: '8', src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80', alt: 'Master Suite', category: 'suites' },
    { id: '9', src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', alt: 'Praia', category: 'experiences' },
    { id: '10', src: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80', alt: 'Duna do Pôr do Sol', category: 'experiences' },
];

const GalleryPage: React.FC = () => {
    const { t, language } = useLanguage();
    const { suites } = useContent();
    const [activeCategory, setActiveCategory] = useState<Category>('all');
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    // Load gallery images from localStorage
    const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(() => {
        const saved = localStorage.getItem('jeri_gallery_images');
        return saved ? JSON.parse(saved) : defaultGalleryImages;
    });

    // Listen for storage changes (when admin updates gallery)
    useEffect(() => {
        const handleStorageChange = () => {
            const saved = localStorage.getItem('jeri_gallery_images');
            if (saved) {
                setGalleryImages(JSON.parse(saved));
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Also check periodically for same-tab updates
        const interval = setInterval(() => {
            const saved = localStorage.getItem('jeri_gallery_images');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (JSON.stringify(parsed) !== JSON.stringify(galleryImages)) {
                    setGalleryImages(parsed);
                }
            }
        }, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, [galleryImages]);

    // Dinamicamente puxa imagens de todas as suítes castradas
    const suiteDynamicImages: GalleryImage[] = suites.flatMap(suite => {
        const imgs: GalleryImage[] = [
            { id: `suite-${suite.id}-main`, src: suite.image, alt: suite.title, category: 'suites' }
        ];
        if (suite.gallery && suite.gallery.length > 0) {
            suite.gallery.forEach((url, i) => {
                imgs.push({ id: `suite-${suite.id}-gal-${i}`, src: url, alt: `${suite.title} - Foto ${i + 1}`, category: 'suites' });
            });
        }
        return imgs;
    });

    const combinedImages = [
        ...galleryImages.filter(img => img.category !== 'suites'),
        ...suiteDynamicImages
    ];

    const filteredImages = activeCategory === 'all'
        ? combinedImages
        : combinedImages.filter(img => img.category === activeCategory);

    const categories: { key: Category; label: string }[] = [
        { key: 'all', label: t.gallery.filterAll },
        { key: 'common', label: t.gallery.filterCommonAreas },
        { key: 'suites', label: t.gallery.filterSuites },
        { key: 'experiences', label: t.gallery.filterExperiences },
    ];

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const goNext = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
        }
    };

    const goPrev = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
        }
    };

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, filteredImages.length]);

    const viewLabel = language === 'pt' ? 'Ver' : language === 'en' ? 'View' : 'Ver';
    const noImagesLabel = language === 'pt'
        ? 'Nenhuma imagem encontrada nesta categoria.'
        : language === 'en'
            ? 'No images found in this category.'
            : 'No se encontraron imágenes en esta categoría.';

    return (
        <div className="pt-24 pb-20 bg-sand-50 min-h-screen">
            {/* Header */}
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-900 mb-6">{t.gallery.title}</h1>
                    <p className="max-w-2xl mx-auto text-slate-600 text-lg">{t.gallery.subtitle}</p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => setActiveCategory(cat.key)}
                            className={`px-6 py-3 rounded-full font-medium transition-all ${activeCategory === cat.key
                                    ? 'bg-brand-900 text-white shadow-lg'
                                    : 'bg-white text-slate-600 hover:bg-brand-50 border border-slate-200'
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredImages.map((img, idx) => (
                        <div
                            key={img.id}
                            className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
                            onClick={() => openLightbox(idx)}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/40 transition-colors duration-300 flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                                    {viewLabel}
                                </span>
                            </div>
                            {/* Image title on hover */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-white text-sm">{img.alt}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredImages.length === 0 && (
                    <div className="text-center py-20 text-slate-500">
                        {noImagesLabel}
                    </div>
                )}
            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && filteredImages[lightboxIndex] && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in">
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 text-white/80 hover:text-white p-2 z-50"
                        aria-label={t.common.close}
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {/* Navigation Arrows */}
                    <button
                        onClick={goPrev}
                        className="absolute left-4 md:left-8 text-white/80 hover:text-white p-2 z-50"
                        aria-label={t.common.previous}
                    >
                        <ChevronLeft className="w-10 h-10" />
                    </button>
                    <button
                        onClick={goNext}
                        className="absolute right-4 md:right-8 text-white/80 hover:text-white p-2 z-50"
                        aria-label={t.common.next}
                    >
                        <ChevronRight className="w-10 h-10" />
                    </button>

                    {/* Image */}
                    <div className="max-w-[90vw] max-h-[85vh] flex flex-col items-center justify-center">
                        <img
                            src={filteredImages[lightboxIndex].src}
                            alt={filteredImages[lightboxIndex].alt}
                            className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
                        />
                        <p className="text-white mt-4 text-lg">{filteredImages[lightboxIndex].alt}</p>
                    </div>

                    {/* Counter */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-medium">
                        {lightboxIndex + 1} / {filteredImages.length}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryPage;
