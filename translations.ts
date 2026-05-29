export type Language = 'pt' | 'en' | 'es';

export interface Translations {
  nav: {
    home: string;
    suites: string;
    about: string;
    gallery: string;
    experiences: string;
    book: string;
    admin: string;
    restrictedArea: string;
  };
  hero: {
    welcome: string;
  };
  about: {
    sectionTitle: string;
    pageTitle: string;
    pageSubtitle: string;
    historyTitle: string;
    locationTitle: string;
    locationDesc: string;
    differentialsTitle: string;
  };
  suites: {
    title: string;
    subtitle: string;
    sectionTitle: string;
    viewDetails: string;
    viewAll: string;
    bookThis: string;
    priceFrom: string;
    amenities: {
      wifi: string;
      airConditioning: string;
      amenities: string;
    };
  };
  gallery: {
    title: string;
    subtitle: string;
    filterAll: string;
    filterCommonAreas: string;
    filterSuites: string;
    filterExperiences: string;
  };
  experiences: {
    title: string;
    sectionTitle: string;
    subtitle: string;
    discoverMore: string;
    items: {
      sunset: { title: string; desc: string };
      kitesurf: { title: string; desc: string };
      tours: { title: string; desc: string };
    };
  };
  chatbot: {
    greeting: string;
    placeholder: string;
    typing: string;
    title: string;
    online: string;
    errorMessage: string;
  };
  footer: {
    description: string;
    contact: string;
    quickLinks: string;
    rights: string;
  };
  admin: {
    title: string;
    login: string;
    password: string;
    passwordHint: string;
    enter: string;
    logout: string;
    suites: string;
    siteTexts: string;
    manageAccommodations: string;
    addNewSuite: string;
    suiteName: string;
    price: string;
    imageUrl: string;
    description: string;
    add: string;
    heroTitle: string;
    heroSubtitle: string;
    aboutTitle: string;
    paragraph1: string;
    paragraph2: string;
  };
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    close: string;
    next: string;
    previous: string;
  };
}

export const translations: Record<Language, Translations> = {
  pt: {
    nav: {
      home: 'Início',
      suites: 'Suítes',
      about: 'Jeri Sublime',
      gallery: 'Galeria',
      experiences: 'Experiências',
      book: 'Reservar',
      admin: 'Admin',
      restrictedArea: 'Área Restrita',
    },
    hero: {
      welcome: 'Bem-vindo ao Paraíso',
    },
    about: {
      sectionTitle: 'Sobre Nós',
      pageTitle: 'Conheça o Jeri Sublime',
      pageSubtitle: 'Uma experiência única de hospedagem em Jericoacoara',
      historyTitle: 'Nossa História',
      locationTitle: 'Localização Privilegiada',
      locationDesc: 'Excelente localização, próximo à Praia da Malhada, conhecida pela prática de surf e windsurf, além dos principais restaurantes, cafés e da vida noturna de Jericoacoara.',
      differentialsTitle: 'Nossos Diferenciais',
    },
    suites: {
      title: 'Nossas Acomodações',
      subtitle: 'Cada suíte no Jeri Sublime foi desenhada para integrar a natureza exuberante de Jericoacoara com o conforto que você merece.',
      sectionTitle: 'Acomodações',
      viewDetails: 'Ver Detalhes',
      viewAll: 'Ver todas as acomodações',
      bookThis: 'Reservar esta Suíte',
      priceFrom: 'A partir de',
      amenities: {
        wifi: 'Wi-Fi',
        airConditioning: 'Ar Condicionado',
        amenities: '',
      },
    },
    gallery: {
      title: 'Galeria de Fotos',
      subtitle: 'Explore os espaços encantadores do Jeri Sublime',
      filterAll: 'Todas',
      filterCommonAreas: 'Áreas Comuns',
      filterSuites: 'Suítes',
      filterExperiences: 'Experiências',
    },
    experiences: {
      title: 'Vivencie Jeri de Forma Única',
      sectionTitle: 'Experiências',
      subtitle: 'Hospede-se perto da praia e dos principais pontos da vila. Ambientes acolhedores, piscina, Wi-Fi e praticidade para você aproveitar Jeri no seu próprio ritmo.',
      discoverMore: 'Descubra Mais',
      items: {
        sunset: {
          title: 'Pôr do Sol',
          desc: 'Acompanhe o espetáculo diário na duna mais famosa do Brasil, a poucos passos do Jeri Sublime.',
        },
        kitesurf: {
          title: 'Kitesurf',
          desc: 'Aulas particulares e aluguel de equipamentos para aproveitar os melhores ventos do mundo.',
        },
        tours: {
          title: 'Passeios',
          desc: 'Explore a Lagoa do Paraíso e a Pedra Furada com nossos bugueiros parceiros de confiança.',
        },
      },
    },
    chatbot: {
      greeting: 'Olá! Eu sou a Jeri, sua concierge virtual. Estou aqui para ajudar você a escolher a suíte perfeita ou planejar seu passeio.',
      placeholder: 'Digite sua dúvida...',
      typing: 'Digitando...',
      title: 'Concierge Jeri',
      online: 'Online agora',
      errorMessage: 'Estou tendo dificuldades técnicas no momento. Por favor, tente novamente em instantes ou contate nossa recepção.',
    },
    footer: {
      description: 'Um oásis de tranquilidade na vila mais charmosa do Brasil. Conecte-se com a natureza sem abrir mão do conforto.',
      contact: 'Contato',
      quickLinks: 'Links Rápidos',
      rights: 'Todos os direitos reservados.',
    },
    admin: {
      title: 'Área Administrativa',
      login: 'Painel de Controle',
      password: 'Senha',
      passwordHint: 'Digite a senha para gerenciar o site.',
      enter: 'Entrar',
      logout: 'Sair',
      suites: 'Suítes',
      siteTexts: 'Textos do Site',
      manageAccommodations: 'Gerenciar Acomodações',
      addNewSuite: 'Adicionar Nova Suíte',
      suiteName: 'Nome da Suíte',
      price: 'Preço (ex: R$ 500)',
      imageUrl: 'URL da Imagem',
      description: 'Descrição',
      add: 'Adicionar',
      heroTitle: 'Título da Hero (Capa)',
      heroSubtitle: 'Subtítulo da Hero',
      aboutTitle: 'Título Sobre',
      paragraph1: 'Parágrafo 1',
      paragraph2: 'Parágrafo 2',
    },
    common: {
      loading: 'Carregando...',
      error: 'Erro',
      success: 'Sucesso',
      cancel: 'Cancelar',
      save: 'Salvar',
      delete: 'Excluir',
      edit: 'Editar',
      close: 'Fechar',
      next: 'Próximo',
      previous: 'Anterior',
    },
  },
  en: {
    nav: {
      home: 'Home',
      suites: 'Suites',
      about: 'The Jeri Sublime',
      gallery: 'Gallery',
      experiences: 'Experiences',
      book: 'Book Now',
      admin: 'Admin',
      restrictedArea: 'Restricted Area',
    },
    hero: {
      welcome: 'Welcome to Paradise',
    },
    about: {
      sectionTitle: 'About Us',
      pageTitle: 'Discover Jeri Sublime',
      pageSubtitle: 'A unique lodging experience in Jericoacoara',
      historyTitle: 'Our Story',
      locationTitle: 'Prime Location',
      locationDesc: 'Excellent location, close to Malhada Beach, known for surfing and windsurfing, as well as the main restaurants, cafes and nightlife of Jericoacoara.',
      differentialsTitle: 'Our Differentials',
    },
    suites: {
      title: 'Our Accommodations',
      subtitle: 'Each suite at Jeri Sublime was designed to blend the lush nature of Jericoacoara with the comfort you deserve.',
      sectionTitle: 'Accommodations',
      viewDetails: 'View Details',
      viewAll: 'View all accommodations',
      bookThis: 'Book this Suite',
      priceFrom: 'Starting at',
      amenities: {
        wifi: 'Wi-Fi',
        airConditioning: 'Air Conditioning',
        amenities: '',
      },
    },
    gallery: {
      title: 'Photo Gallery',
      subtitle: 'Explore the enchanting spaces of Jeri Sublime',
      filterAll: 'All',
      filterCommonAreas: 'Common Areas',
      filterSuites: 'Suites',
      filterExperiences: 'Experiences',
    },
    experiences: {
      title: 'Experience Jeri Like Never Before',
      sectionTitle: 'Experiences',
      subtitle: 'Stay near the beach and the main attractions of the village. Welcoming spaces, swimming pool, Wi-Fi and convenience for you to enjoy Jeri at your own pace.',
      discoverMore: 'Discover More',
      items: {
        sunset: {
          title: 'Sunset',
          desc: 'Witness the daily spectacle at Brazil\'s most famous dune, just steps from the Jeri Sublime.',
        },
        kitesurf: {
          title: 'Kitesurfing',
          desc: 'Private lessons and equipment rental to enjoy some of the best winds in the world.',
        },
        tours: {
          title: 'Tours',
          desc: 'Explore Lagoa do Paraíso and Pedra Furada with our trusted buggy partners.',
        },
      },
    },
    chatbot: {
      greeting: 'Hello! I\'m Jeri, your virtual concierge. I\'m here to help you choose the perfect suite or plan your adventure.',
      placeholder: 'Type your question...',
      typing: 'Typing...',
      title: 'Concierge Jeri',
      online: 'Online now',
      errorMessage: 'I\'m having technical difficulties at the moment. Please try again shortly or contact our reception.',
    },
    footer: {
      description: 'An oasis of luxury and tranquility in Brazil\'s most charming village. Connect with nature without giving up comfort.',
      contact: 'Contact',
      quickLinks: 'Quick Links',
      rights: 'All rights reserved.',
    },
    admin: {
      title: 'Admin Area',
      login: 'Control Panel',
      password: 'Password',
      passwordHint: 'Enter the password to manage the site.',
      enter: 'Enter',
      logout: 'Logout',
      suites: 'Suites',
      siteTexts: 'Site Texts',
      manageAccommodations: 'Manage Accommodations',
      addNewSuite: 'Add New Suite',
      suiteName: 'Suite Name',
      price: 'Price (e.g. $500)',
      imageUrl: 'Image URL',
      description: 'Description',
      add: 'Add',
      heroTitle: 'Hero Title (Cover)',
      heroSubtitle: 'Hero Subtitle',
      aboutTitle: 'About Title',
      paragraph1: 'Paragraph 1',
      paragraph2: 'Paragraph 2',
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      close: 'Close',
      next: 'Next',
      previous: 'Previous',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      suites: 'Suites',
      about: 'El Jeri Sublime',
      gallery: 'Galería',
      experiences: 'Experiencias',
      book: 'Reservar',
      admin: 'Admin',
      restrictedArea: 'Área Restringida',
    },
    hero: {
      welcome: 'Bienvenido al Paraíso',
    },
    about: {
      sectionTitle: 'Sobre Nosotros',
      pageTitle: 'Conoce Jeri Sublime',
      pageSubtitle: 'Una experiencia única de hospedaje en Jericoacoara',
      historyTitle: 'Nuestra Historia',
      locationTitle: 'Ubicación Privilegiada',
      locationDesc: 'Excelente localización, próximo a la playa de Malhada, conocida por la práctica de surf y windsurf, además de los principales restaurantes, cafés y la vida nocturna de Jericoacoara.',
      differentialsTitle: 'Nuestros Diferenciales',
    },
    suites: {
      title: 'Nuestras Acomodaciones',
      subtitle: 'Cada suite en Jeri Sublime fue diseñada para integrar la naturaleza exuberante de Jericoacoara con el confort que mereces.',
      sectionTitle: 'Acomodaciones',
      viewDetails: 'Ver Detalles',
      viewAll: 'Ver todas las acomodaciones',
      bookThis: 'Reservar esta Suite',
      priceFrom: 'Desde',
      amenities: {
        wifi: 'Wi-Fi',
        airConditioning: 'Aire Acondicionado',
        amenities: '',
      },
    },
    gallery: {
      title: 'Galería de Fotos',
      subtitle: 'Explora los espacios encantadores de Jeri Sublime',
      filterAll: 'Todas',
      filterCommonAreas: 'Áreas Comunes',
      filterSuites: 'Suites',
      filterExperiences: 'Experiencias',
    },
    experiences: {
      title: 'Vive Jeri de Forma Única',
      sectionTitle: 'Experiencias',
      subtitle: 'Alojáte cerca de la playa y los puntos principales del pueblo. Espacios acogedores, piscina, Wi-Fi y practicidad para que disfrutes Jeri a tu propio ritmo.',
      discoverMore: 'Descubre Más',
      items: {
        sunset: {
          title: 'Atardecer',
          desc: 'Acompaña el espectáculo diario en la duna más famosa de Brasil, a pocos pasos del Jeri Sublime.',
        },
        kitesurf: {
          title: 'Kitesurf',
          desc: 'Clases privadas y alquiler de equipos para disfrutar de los mejores vientos del mundo.',
        },
        tours: {
          title: 'Paseos',
          desc: 'Explora la Lagoa do Paraíso y la Pedra Furada con nuestros socios de buggy de confianza.',
        },
      },
    },
    chatbot: {
      greeting: '¡Hola! Soy Jeri, tu conserje virtual. Estoy aquí para ayudarte a elegir la suite perfecta o planificar tu aventura.',
      placeholder: 'Escribe tu pregunta...',
      typing: 'Escribiendo...',
      title: 'Conserje Jeri',
      online: 'En línea ahora',
      errorMessage: 'Estoy teniendo dificultades técnicas en este momento. Por favor, inténtalo de nuevo en unos instantes o contacta con nuestra recepción.',
    },
    footer: {
      description: 'Un oasis de lujo y tranquilidad en el pueblo más encantador de Brasil. Conéctate con la naturaleza sin renunciar al confort.',
      contact: 'Contacto',
      quickLinks: 'Enlaces Rápidos',
      rights: 'Todos los derechos reservados.',
    },
    admin: {
      title: 'Área Administrativa',
      login: 'Panel de Control',
      password: 'Contraseña',
      passwordHint: 'Ingresa la contraseña para administrar el sitio.',
      enter: 'Entrar',
      logout: 'Salir',
      suites: 'Suites',
      siteTexts: 'Textos del Sitio',
      manageAccommodations: 'Gestionar Acomodaciones',
      addNewSuite: 'Agregar Nueva Suite',
      suiteName: 'Nombre de la Suite',
      price: 'Precio (ej: $500)',
      imageUrl: 'URL de la Imagen',
      description: 'Descripción',
      add: 'Agregar',
      heroTitle: 'Título del Hero (Portada)',
      heroSubtitle: 'Subtítulo del Hero',
      aboutTitle: 'Título Sobre',
      paragraph1: 'Párrafo 1',
      paragraph2: 'Párrafo 2',
    },
    common: {
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      cancel: 'Cancelar',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      close: 'Cerrar',
      next: 'Siguiente',
      previous: 'Anterior',
    },
  },
};

export const getTranslation = (lang: Language): Translations => {
  return translations[lang];
};
