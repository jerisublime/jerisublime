import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Suite, SiteContent, ContentContextType, AdminCredentials } from '../types';

// Simple hash function for password (not cryptographically secure, but better than plaintext)
const hashPassword = (password: string): string => {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36) + password.length.toString(36);
};

// Suites with translated content
const getDefaultSuites = (language: string): Suite[] => {
  const suites = {
    pt: [
      {
        id: '1',
        title: "Suíte Standard",
        price: "",
        image: "/suites/suite1/1.jpeg",
        desc: "Conforto e charme com varanda privativa voltada para o jardim tropical.",
        features: [
          'Wi-Fi Alta Velocidade',
          'Café da manhã incluso',
          'Ar Condicionado',
          'Amenities Granado',
          'Varanda Privativa',
          'Frigobar',
          'Cofre Digital',
          'TV Smart 55"'
        ],
        gallery: [
          '/suites/suite1/2.jpeg',
          '/suites/suite1/3.jpeg'
        ]
      },
      {
        id: '2',
        title: "Deluxe Vista Mar",
        price: "",
        image: "/suites/suite2/1.jpeg",
        desc: "Acorde com a brisa do oceano e uma vista panorâmica inesquecível.",
        features: [
          'Wi-Fi Alta Velocidade',
          'Café da manhã incluso',
          'Ar Condicionado',
          'Amenities Granado',
          'Varanda Privativa',
          'Frigobar',
          'Cofre Digital'
        ],
        gallery: [
          '/suites/suite2/2.jpeg'
        ]
      },
      {
        id: '3',
        title: "Master Pool Villa",
        price: "",
        image: "/suites/suite3/1.jpeg",
        desc: "Privacidade total com piscina exclusiva e deck ao ar livre.",
        features: [
          'Wi-Fi Alta Velocidade',
          'Café da manhã incluso',
          'Ar Condicionado',
          'Amenities Granado',
          'Frigobar',
          'Cofre Digital'
        ],
        gallery: [
          '/suites/suite3/2.jpeg',
          '/suites/suite3/3.jpeg',
          '/suites/suite3/4.jpeg'
        ]
      }
    ],
    en: [
      {
        id: '1',
        title: "Standard Suite",
        price: "",
        image: "/suites/suite1/1.jpeg",
        desc: "Comfort and charm with a private balcony facing the tropical garden.",
        gallery: [
          '/suites/suite1/2.jpeg',
          '/suites/suite1/3.jpeg'
        ]
      },
      {
        id: '2',
        title: "Deluxe Sea View",
        price: "",
        image: "/suites/suite2/1.jpeg",
        desc: "Wake up to the ocean breeze and an unforgettable panoramic view.",
        gallery: [
          '/suites/suite2/2.jpeg'
        ]
      },
      {
        id: '3',
        title: "Master Pool Villa",
        price: "",
        image: "/suites/suite3/1.jpeg",
        desc: "Complete privacy with an exclusive pool and outdoor deck.",
        gallery: [
          '/suites/suite3/2.jpeg',
          '/suites/suite3/3.jpeg',
          '/suites/suite3/4.jpeg'
        ]
      }
    ],
    es: [
      {
        id: '1',
        title: "Suite Standard",
        price: "",
        image: "/suites/suite1/1.jpeg",
        desc: "Confort y encanto con balcón privado con vista al jardín tropical.",
        gallery: [
          '/suites/suite1/2.jpeg',
          '/suites/suite1/3.jpeg'
        ]
      },
      {
        id: '2',
        title: "Deluxe Vista al Mar",
        price: "",
        image: "/suites/suite2/1.jpeg",
        desc: "Despierta con la brisa del océano y una vista panorámica inolvidable.",
        gallery: [
          '/suites/suite2/2.jpeg'
        ]
      },
      {
        id: '3',
        title: "Master Pool Villa",
        price: "",
        image: "/suites/suite3/1.jpeg",
        desc: "Privacidad total con piscina exclusiva y terraza al aire libre.",
        gallery: [
          '/suites/suite3/2.jpeg',
          '/suites/suite3/3.jpeg',
          '/suites/suite3/4.jpeg'
        ]
      }
    ]
  };

  const savedSuites = localStorage.getItem('jeri_suites');
  if (savedSuites) {
    try {
      const parsed = JSON.parse(savedSuites);
      if (parsed[language]) {
        return parsed[language];
      }
    } catch (e) {
      console.error('Error parsing saved suites:', e);
    }
  }

  return suites[language as keyof typeof suites] || suites.pt;
};

const defaultContent: SiteContent = {
  heroTitle: "A Essência de Jericoacoara",
  heroSubtitle: "Onde o luxo rústico encontra a natureza intocada.",
  aboutTitle: "Relaxe no Coração das Dunas",
  aboutText1: "O Jeri Sublime nasceu do desejo de integrar conforto absoluto com a energia vibrante de Jericoacoara. Nossa arquitetura respeita o meio ambiente, utilizando materiais locais e aproveitando a brisa constante do mar.",
  aboutText2: "A poucos passos da água, oferecemos um refúgio de tranquilidade, gastronomia de alto nível e serviço personalizado para que cada momento seja memorável.",
  amenitiesTitle: "Comodidades",
  globalAmenities: [
    "Wi-Fi Alta Velocidade",
    "Café da manhã incluso",
    "Ar Condicionado",
    "Amenities Granado",
    "Varanda Privativa",
    "Frigobar",
    "Cofre Digital",
    "TV Smart 55\""
  ],
  heroImages: [
    '/images/sunset-palms.jpg',
    '/images/lagoa-praia.jpg',
    '/images/pescadores.jpg',
    '/images/sunset-kite.jpg',
  ]
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  // Get language from localStorage or default to 'pt'
  const getLanguage = () => {
    return localStorage.getItem('jeri_language') || 'pt';
  };

  const getSavedContent = (): SiteContent => {
    try {
      const savedContent = localStorage.getItem('jeri_content');
      if (savedContent) {
        return JSON.parse(savedContent) as SiteContent;
      }
    } catch (e) {
      console.error('Failed to parse saved content', e);
    }
    return defaultContent;
  };

  const [language, setLanguageState] = useState(getLanguage);
  const [suites, setSuites] = useState<Suite[]>(getDefaultSuites(language));
  const [content, setContent] = useState<SiteContent>(getSavedContent());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(true); // Setup is always complete now

  // Save suites to localStorage whenever they change
  useEffect(() => {
    try {
      const savedSuites = localStorage.getItem('jeri_suites');
      const allSuites = savedSuites ? JSON.parse(savedSuites) : {};
      allSuites[language] = suites;
      localStorage.setItem('jeri_suites', JSON.stringify(allSuites));
    } catch (e) {
      console.error('Failed to save suites to localStorage', e);
    }
  }, [suites, language]);

  // Save content to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('jeri_content', JSON.stringify(content));
    } catch (e) {
      console.error('Failed to save content to localStorage', e);
    }
  }, [content]);

  // Listen for language changes
  useEffect(() => {
    const checkLanguage = () => {
      const currentLang = localStorage.getItem('jeri_language') || 'pt';
      if (currentLang !== language) {
        setLanguageState(currentLang);
        setSuites(getDefaultSuites(currentLang));
      }
    };

    // Check periodically for language changes
    const interval = setInterval(checkLanguage, 100);

    // Also listen for storage events
    window.addEventListener('storage', checkLanguage);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkLanguage);
    };
  }, [language]);

  const updateSuite = (updatedSuite: Suite) => {
    setSuites(prev => prev.map(s => s.id === updatedSuite.id ? updatedSuite : s));
  };

  const addSuite = (newSuite: Suite) => {
    setSuites(prev => [...prev, newSuite]);
  };

  const deleteSuite = (id: string) => {
    setSuites(prev => prev.filter(s => s.id !== id));
  };

  const updateContent = (newContent: SiteContent) => {
    setContent(newContent);
  };

  // Setup initial credentials (no longer used, kept for context signature compatibility)
  const setupCredentials = (email: string, password: string) => {
    setIsAuthenticated(true);
  };

  // Login with email and password from .env
  const login = (email: string, password: string): boolean => {
    const envEmail = (import.meta as any).env?.VITE_ADMIN_EMAIL || 'jerisublime@outlook.com';
    const envPassword = (import.meta as any).env?.VITE_ADMIN_PASSWORD || 'jeri2026';

    if (email.toLowerCase().trim() === envEmail.toLowerCase().trim() && password === envPassword) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // Update credentials (no longer supported dynamically)
  const updateCredentials = (email: string, newPassword: string): boolean => {
    return false;
  };

  const logout = () => setIsAuthenticated(false);

  return (
    <ContentContext.Provider value={{
      suites,
      content,
      updateSuite,
      addSuite,
      deleteSuite,
      updateContent,
      isAuthenticated,
      isSetupComplete,
      login,
      logout,
      setupCredentials,
      updateCredentials
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
};