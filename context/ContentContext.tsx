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
        title: "Suíte Dupla",
        price: "",
        image: "/suites/suite1/1.jpeg",
        desc: "Perfeita para casais que desejam relaxar e aproveitar a energia única de Jericoacoara. A Suíte Dupla oferece um ambiente aconchegante com cama de casal, ar-condicionado, Wi-Fi, e frigobar para tornar sua estadia ainda mais confortável e prática em cada detalhe.",
        features: [
          'Wi-Fi',
          'Ar Condicionado',
          'Frigobar'
        ],
        gallery: [
          '/suites/suite1/2.jpeg',
          '/suites/suite1/3.jpeg'
        ]
      },
      {
        id: '2',
        title: "Suíte Tripla",
        price: "",
        image: "/suites/suite3/1.jpeg",
        desc: "Ideal para pequenas famílias ou grupos de amigos, a Suíte Tripla conta com 1 cama de casal e 1 cama de solteiro, unindo conforto e funcionalidade em um ambiente agradável e acolhedor. A acomodação dispõe de ar-condicionado, Wi-Fi e frigobar para garantir dias tranquilos e especiais em Jericoacoara.",
        features: [
          'Wi-Fi',
          'Ar Condicionado',
          'Frigobar',
        ],
        gallery: [
          '/suites/suite3/2.jpeg',
          '/suites/suite3/3.jpeg',
          '/suites/suite3/4.jpeg'
        ]
      },
      {
        id: '3',
        title: "Suíte Quadrupla",
        price: "",
        image: "/suites/suite2/1.jpeg",
        desc: "Espaçosa e confortável, a Suíte Quádrupla é perfeita para famílias ou grupos que desejam aproveitar Jericoacoara com comodidade. Com 1 cama de casal e 2 camas de solteiro, oferece um ambiente ideal para descanso após um dia de praia e passeios. A suíte conta com ar-condicionado, Wi-Fi e frigobar para uma experiência completa durante sua estadia.",
        features: [
          'Wi-Fi',
          'Ar Condicionado',
          'Frigobar',
        ],
        gallery: [
          '/suites/suite2/2.jpeg'
        ]
      }
    ],
    en: [
      {
        "id": "1",
        "title": "Double Suite",
        "price": "",
        "image": "/suites/suite1/1.jpeg",
        "desc": "Perfect for couples looking to relax and enjoy the unique atmosphere of Jericoacoara. The Double Suite offers a cozy environment with a double bed, air conditioning, Wi-Fi, and minibar to make your stay even more comfortable and convenient in every detail.",
        "features": [
          "Wi-Fi",
          "Air Conditioning",
          "Minibar"
        ],
        "gallery": [
          "/suites/suite1/2.jpeg",
          "/suites/suite1/3.jpeg"
        ]
      },
      {
        "id": "2",
        "title": "Triple Suite",
        "price": "",
        "image": "/suites/suite3/1.jpeg",
        "desc": "Ideal for small families or groups of friends, the Triple Suite features 1 double bed and 1 single bed, combining comfort and functionality in a pleasant and welcoming atmosphere. The accommodation includes air conditioning, Wi-Fi and minibar, to ensure peaceful and memorable days in Jericoacoara.",
        "features": [
          "Wi-Fi",
          "Air Conditioning",
          "Minibar",
        ],
        "gallery": [
          "/suites/suite3/2.jpeg",
          "/suites/suite3/3.jpeg",
          "/suites/suite3/4.jpeg"
        ]
      },
      {
        "id": "3",
        "title": "Quadruple Suite",
        "price": "",
        "image": "/suites/suite2/1.jpeg",
        "desc": "Spacious and comfortable, the Quadruple Suite is perfect for families or groups who want to enjoy Jericoacoara with complete comfort. Featuring 1 double bed and 2 single beds, it provides the ideal setting to relax after a day at the beach and sightseeing. The suite includes air conditioning, Wi-Fi and minibar,  for a complete and enjoyable stay.",
        "features": [
          "Wi-Fi",
          "Air Conditioning",
          "Minibar",
        ],
        "gallery": [
          "/suites/suite2/2.jpeg"
        ]
      }
    ],
    es: [
      {
        "id": "1",
        "title": "Suite Doble",
        "price": "",
        "image": "/suites/suite1/1.jpeg",
        "desc": "Perfecta para parejas que desean relajarse y disfrutar de la energía única de Jericoacoara. La Suite Doble ofrece un ambiente acogedor con cama matrimonial, aire acondicionado, Wi-Fi y minibar para hacer su estadía aún más cómoda y práctica en cada detalle.",
        "features": [
          "Wi-Fi",
          "Aire Acondicionado",
          "Minibar"
        ],
        "gallery": [
          "/suites/suite1/2.jpeg",
          "/suites/suite1/3.jpeg"
        ]
      },
      {
        "id": "2",
        "title": "Suite Triple",
        "price": "",
        "image": "/suites/suite3/1.jpeg",
        "desc": "Ideal para pequeñas familias o grupos de amigos, la Suite Triple cuenta con 1 cama matrimonial y 1 cama individual, combinando comodidad y funcionalidad en un ambiente agradable y acogedor. El alojamiento dispone de aire acondicionado, Wi-Fi y minibar para garantizar días tranquilos y especiales en Jericoacoara.",
        "features": [
          "Wi-Fi",
          "Aire Acondicionado",
          "Minibar",
        ],
        "gallery": [
          "/suites/suite3/2.jpeg",
          "/suites/suite3/3.jpeg",
          "/suites/suite3/4.jpeg"
        ]
      },
      {
        "id": "3",
        "title": "Suite Cuádruple",
        "price": "",
        "image": "/suites/suite2/1.jpeg",
        "desc": "Amplia y confortable, la Suite Cuádruple es perfecta para familias o grupos que desean disfrutar de Jericoacoara con total comodidad. Con 1 cama matrimonial y 2 camas individuales, ofrece el ambiente ideal para descansar después de un día de playa y paseos. La suite cuenta con aire acondicionado, Wi-Fi y minibar para una experiencia completa durante su estadía.",
        "features": [
          "Wi-Fi",
          "Aire Acondicionado",
          "Minibar",
        ],
        "gallery": [
          "/suites/suite2/2.jpeg"
        ]
      }
    ]
  };

  return suites[language as keyof typeof suites] || suites.pt;
};

const defaultContent: SiteContent = {
  heroTitle: "A Essência de Jericoacoara",
  heroSubtitle: "Conforto e ótima localização em Jericoacoara.",
  aboutTitle: "Relaxe em Jericoacoara",
  aboutText1: "Jeri Sublime nasceu do desejo de integrar conforto com a energia vibrante de Jericoacoara. Nossa arquitetura respeita o clima e a essência local, aproveitando a brisa constante do mar e os materiais da região.",
  aboutText2: "A poucos passos da água, dos principais restaurantes e da vida noturna, oferecemos uma hospedagem leve, e bem localizada para quem deseja aproveitar Jeri com conforto e liberdade.",
  amenitiesTitle: "Comodidades",
  globalAmenities: [
    "Wi-Fi",
    "Ar Condicionado",
    "Frigobar",
  ],
  heroImages: [
    '/images/piscina1.jpeg',
    '/images/quarto2.jpeg',
    '/images/kite3.jpeg',
    '/images/kite4.jpeg',
    '/images/kite5.jpeg',
    '/images/pescadores.jpg',
    '/images/sunset-palms.jpg',
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
    return defaultContent;
  };

  const [language, setLanguageState] = useState(getLanguage);
  const [suites, setSuites] = useState<Suite[]>(getDefaultSuites(language));
  const [content, setContent] = useState<SiteContent>(getSavedContent());
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(true); // Setup is always complete now



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