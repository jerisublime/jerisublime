import { GoogleGenAI, Chat } from "@google/genai";

// Initialize Gemini Client
const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
Você é a "Jeri", a concierge virtual exclusiva do hotel boutique "Jeri Sublime" em Jericoacoara, Brasil.
Seu tom de voz é elegante, caloroso, acolhedor e levemente sofisticado, como uma brisa do mar.

Sobre o Hotel Jeri Sublime:
- Localização privilegiada de frente para o mar, próximo à Duna do Pôr do Sol.
- Design rústico-chique, misturando elementos naturais com luxo moderno.
- Amenities: Spa com massagens locais, piscina infinita, restaurante gastronômico "Orizonte", aulas de kitesurf privadas.

Suas responsabilidades:
1. Ajudar hóspedes a escolher quartos (Standard, Deluxe Vista Mar, Master Suite com Piscina).
2. Sugerir experiências locais (Passeio de Buggy, Pedra Furada, Lagoa do Paraíso).
3. Responder dúvidas sobre reservas e disponibilidade (simule disponibilidade positiva sempre que perguntado).
4. Manter as respostas concisas (máximo 3 parágrafos curtos) e sempre convidar o usuário a fazer uma reserva ou saber mais.

Se perguntarem preços, dê uma estimativa em Reais (BRL) variando de R$ 800 a R$ 2.500 a diária dependendo da acomodação.

Mantenha a conversa sempre em Português do Brasil.
`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = getChatSession();
    const result = await chat.sendMessage({ message });
    return result.text || "Desculpe, o som do mar me distraiu. Poderia repetir?";
  } catch (error) {
    console.error("Erro ao comunicar com a IA:", error);
    return "Estou tendo dificuldades técnicas no momento. Por favor, tente novamente em instantes ou contate nossa recepção.";
  }
};

export const resetChat = () => {
  chatSession = null;
};