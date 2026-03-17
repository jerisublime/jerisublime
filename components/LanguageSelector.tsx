import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../translations';

interface LanguageOption {
    code: Language;
    name: string;
    flag: string;
}

const languages: LanguageOption[] = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
];

interface LanguageSelectorProps {
    variant?: 'light' | 'dark';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = 'dark' }) => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentLang = languages.find(l => l.code === language) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (lang: Language) => {
        setLanguage(lang);
        setIsOpen(false);
    };

    const textColor = variant === 'light' ? 'text-white' : 'text-brand-900';
    const hoverBg = variant === 'light' ? 'hover:bg-white/10' : 'hover:bg-slate-100';
    const dropdownBg = 'bg-white';

    return (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg ${hoverBg} transition-colors ${textColor}`}
                aria-label="Select language"
            >
                <span className="text-lg">{currentLang.flag}</span>
                <span className="hidden sm:inline text-sm font-medium">{currentLang.code.toUpperCase()}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className={`absolute right-0 top-full mt-2 ${dropdownBg} rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 min-w-[160px] animate-fade-in`}>
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleSelect(lang.code)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-brand-50 transition-colors ${lang.code === language ? 'bg-brand-50 text-brand-700' : 'text-slate-700'
                                }`}
                        >
                            <span className="text-xl">{lang.flag}</span>
                            <span className="font-medium">{lang.name}</span>
                            {lang.code === language && (
                                <span className="ml-auto w-2 h-2 bg-brand-500 rounded-full"></span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
