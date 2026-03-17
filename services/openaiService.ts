import { Language } from '../translations';

// OpenAI API Configuration
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Get API key from localStorage or environment
const getApiKey = (): string => {
    // First check localStorage (set in admin panel)
    const localKey = localStorage.getItem('jeri_openai_key');
    if (localKey) return localKey;

    // Then check window object (for immediate use after saving)
    if ((window as any).OPENAI_API_KEY) return (window as any).OPENAI_API_KEY;

    // Finally check environment variables
    const envKey = (import.meta as any).env?.VITE_OPENAI_API_KEY ||
        (import.meta as any).env?.OPENAI_API_KEY ||
        '';
    return envKey;
};

// System prompts for each language
const SYSTEM_PROMPTS: Record<Language, string> = {
    pt: `Você é a "Jeri", a concierge virtual exclusiva do hotel boutique "Jeri Sublime" em Jericoacoara, Brasil.
Seu tom de voz é elegante, caloroso, acolhedor e levemente sofisticado, como uma brisa do mar.

Sobre o Hotel Jeri Sublime:
- Localização privilegiada de frente para o mar, próximo à Duna do Pôr do Sol.
- Design rústico-chique, misturando elementos naturais com luxo moderno.
- Amenities: Spa com massagens locais, piscina infinita, restaurante gastronômico "Orizonte", aulas de kitesurf privadas.

Suas responsabilidades:
1. Ajudar hóspedes a escolher quartos (Standard a partir de R$ 800, Deluxe Vista Mar a partir de R$ 1.200, Master Suite com Piscina a partir de R$ 2.500).
2. Sugerir experiências locais (Passeio de Buggy, Pedra Furada, Lagoa do Paraíso).
3. Responder dúvidas sobre reservas e disponibilidade (simule disponibilidade positiva sempre que perguntado).
4. Manter as respostas concisas (máximo 3 parágrafos curtos) e sempre convidar o usuário a entrar em contato via WhatsApp.

Mantenha a conversa sempre em Português do Brasil.`,

    en: `You are "Jeri", the exclusive virtual concierge of the boutique hotel "Jeri Sublime" in Jericoacoara, Brazil.
Your tone of voice is elegant, warm, welcoming, and slightly sophisticated, like a sea breeze.

About Jeri Sublime Hotel:
- Prime beachfront location, near the famous Sunset Dune.
- Rustic-chic design, blending natural elements with modern luxury.
- Amenities: Spa with local massages, infinity pool, "Orizonte" gourmet restaurant, private kitesurf lessons.

Your responsibilities:
1. Help guests choose rooms (Standard from $160, Deluxe Sea View from $240, Master Suite with Pool from $500).
2. Suggest local experiences (Buggy Tour, Pedra Furada, Lagoa do Paraíso).
3. Answer questions about reservations and availability (always simulate positive availability when asked).
4. Keep responses concise (maximum 3 short paragraphs) and always invite the user to contact via WhatsApp.

Always keep the conversation in English.`,

    es: `Eres "Jeri", la conserje virtual exclusiva del hotel boutique "Jeri Sublime" en Jericoacoara, Brasil.
Tu tono de voz es elegante, cálido, acogedor y ligeramente sofisticado, como una brisa marina.

Sobre el Hotel Jeri Sublime:
- Ubicación privilegiada frente al mar, cerca de la famosa Duna del Atardecer.
- Diseño rústico-chic, mezclando elementos naturales con lujo moderno.
- Comodidades: Spa con masajes locales, piscina infinita, restaurante gastronómico "Orizonte", clases privadas de kitesurf.

Tus responsabilidades:
1. Ayudar a los huéspedes a elegir habitaciones (Standard desde $160, Deluxe Vista al Mar desde $240, Master Suite con Piscina desde $500).
2. Sugerir experiencias locales (Paseo en Buggy, Pedra Furada, Lagoa do Paraíso).
3. Responder preguntas sobre reservas y disponibilidad (siempre simula disponibilidad positiva cuando te pregunten).
4. Mantener las respuestas concisas (máximo 3 párrafos cortos) y siempre invitar al usuario a contactar por WhatsApp.

Mantén siempre la conversación en Español.`
};

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

// Store conversation history
let conversationHistory: Message[] = [];

export const initChat = (language: Language): void => {
    conversationHistory = [
        { role: 'system', content: SYSTEM_PROMPTS[language] }
    ];
};

export const resetChat = (language: Language): void => {
    initChat(language);
};

export const sendMessageToOpenAI = async (message: string, language: Language): Promise<string> => {
    const apiKey = getApiKey();

    // If no API key, return a demo response
    if (!apiKey) {
        console.warn('OpenAI API key not configured. Using demo mode.');
        return getDemoResponse(message, language);
    }

    try {
        // Initialize conversation if empty
        if (conversationHistory.length === 0) {
            initChat(language);
        }

        // Add user message to history
        conversationHistory.push({ role: 'user', content: message });

        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: conversationHistory,
                max_tokens: 500,
                temperature: 0.7,
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('OpenAI API Error:', errorData);
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        const assistantMessage = data.choices?.[0]?.message?.content || '';

        // Add assistant response to history
        conversationHistory.push({ role: 'assistant', content: assistantMessage });

        // Keep history manageable (last 20 messages + system)
        if (conversationHistory.length > 21) {
            conversationHistory = [
                conversationHistory[0], // Keep system message
                ...conversationHistory.slice(-20)
            ];
        }

        return assistantMessage;
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        return getDemoResponse(message, language);
    }
};

// Demo responses when API key is not set
const getDemoResponse = (message: string, language: Language): string => {
    const lowerMessage = message.toLowerCase();

    const responses: Record<Language, Record<string, string>> = {
        pt: {
            preco: 'Nossas suítes variam de R$ 800 (Standard) a R$ 2.500 (Master Pool Villa) por noite. Inclui café da manhã gourmet e acesso a todas as áreas comuns. Para consultas e reservas, entre em contato pelo WhatsApp!',
            suite: 'Temos 3 categorias: Standard (aconchegante com varanda), Deluxe Vista Mar (acordar com o oceano) e Master Pool Villa (piscina privativa). Qual você gostaria de conhecer melhor?',
            localizacao: 'Estamos no coração de Jericoacoara, a poucos passos da praia e da famosa Duna do Pôr do Sol. A localização perfeita para explorar a vila!',
            default: 'Olá! Ficamos felizes com seu interesse no Jeri Sublime. Oferecemos suítes a partir de R$ 800 por noite com café da manhã incluso. Para mais informações e reservas, entre em contato pelo WhatsApp!',
        },
        en: {
            price: 'Our suites range from $160 (Standard) to $500 (Master Pool Villa) per night. Includes gourmet breakfast and access to all common areas. For inquiries and reservations, contact us via WhatsApp!',
            suite: 'We have 3 categories: Standard (cozy with balcony), Deluxe Sea View (wake up to the ocean) and Master Pool Villa (private pool). Which would you like to learn more about?',
            location: 'We are in the heart of Jericoacoara, steps away from the beach and the famous Sunset Dune. The perfect location to explore the village!',
            default: 'Hello! We are delighted by your interest in Jeri Sublime. We offer suites from $160 per night with breakfast included. For more information and reservations, contact us via WhatsApp!',
        },
        es: {
            precio: 'Nuestras suites van desde $160 (Standard) hasta $500 (Master Pool Villa) por noche. Incluye desayuno gourmet y acceso a todas las áreas comunes. ¡Para consultas y reservas, contáctenos por WhatsApp!',
            suite: 'Tenemos 3 categorías: Standard (acogedora con balcón), Deluxe Vista al Mar (despertar con el océano) y Master Pool Villa (piscina privada). ¿Cuál te gustaría conocer mejor?',
            ubicacion: 'Estamos en el corazón de Jericoacoara, a pocos pasos de la playa y la famosa Duna del Atardecer. ¡La ubicación perfecta para explorar el pueblo!',
            default: '¡Hola! Nos alegra tu interés en Jeri Sublime. Ofrecemos suites desde $160 por noche con desayuno incluido. ¡Para más información y reservas, contáctenos por WhatsApp!',
        },
    };

    const langResponses = responses[language];

    // Check for keywords
    if (language === 'pt') {
        if (lowerMessage.includes('preço') || lowerMessage.includes('valor') || lowerMessage.includes('quanto')) {
            return langResponses.preco;
        }
        if (lowerMessage.includes('suite') || lowerMessage.includes('quarto') || lowerMessage.includes('acomod')) {
            return langResponses.suite;
        }
        if (lowerMessage.includes('onde') || lowerMessage.includes('local') || lowerMessage.includes('endereço')) {
            return langResponses.localizacao;
        }
    } else if (language === 'en') {
        if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
            return langResponses.price;
        }
        if (lowerMessage.includes('suite') || lowerMessage.includes('room') || lowerMessage.includes('accommodation')) {
            return langResponses.suite;
        }
        if (lowerMessage.includes('where') || lowerMessage.includes('location') || lowerMessage.includes('address')) {
            return langResponses.location;
        }
    } else {
        if (lowerMessage.includes('precio') || lowerMessage.includes('cuanto') || lowerMessage.includes('costo')) {
            return langResponses.precio;
        }
        if (lowerMessage.includes('suite') || lowerMessage.includes('habitacion') || lowerMessage.includes('cuarto')) {
            return langResponses.suite;
        }
        if (lowerMessage.includes('donde') || lowerMessage.includes('ubicacion') || lowerMessage.includes('direccion')) {
            return langResponses.ubicacion;
        }
    }

    return langResponses.default;
};
