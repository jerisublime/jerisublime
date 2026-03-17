import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, Loader2, X } from 'lucide-react';
import { sendMessageToGemini, resetChat } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useLanguage } from '../context/LanguageContext';

const Chatbot: React.FC = () => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevLanguageRef = useRef(language);

  // Initialize with greeting message
  useEffect(() => {
    setMessages([
      {
        role: 'model',
        text: t.chatbot.greeting,
        timestamp: new Date()
      }
    ]);
    resetChat();
  }, []);

  // Reset chat when language changes
  useEffect(() => {
    if (prevLanguageRef.current !== language) {
      setMessages([
        {
          role: 'model',
          text: t.chatbot.greeting,
          timestamp: new Date()
        }
      ]);
      resetChat();
      prevLanguageRef.current = language;
    }
  }, [language, t.chatbot.greeting]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(input);

    const modelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  // Trigger Button
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[60] w-16 h-16 bg-brand-900 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group"
        aria-label="Open chat"
      >
        <div className="absolute inset-0 bg-brand-500 rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
        <Sparkles className="w-8 h-8 text-brand-300" />
      </button>
    );
  }

  // Expanded Window
  return (
    <div className="fixed bottom-6 right-6 z-[60] w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-fade-in-up">
      {/* Header */}
      <div className="bg-brand-900 p-4 text-white flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(false)}>
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-full">
            <Sparkles className="w-5 h-5 text-brand-300" />
          </div>
          <div>
            <h3 className="font-serif font-bold">{t.chatbot.title}</h3>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-xs text-brand-100 opacity-80">{t.chatbot.online}</span>
            </div>
          </div>
        </div>
        <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="p-1 hover:bg-white/10 rounded" aria-label={t.common.close}>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-4 bg-sand-50 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-300' : 'bg-brand-500'}`}>
                {msg.role === 'user' ? <User size={16} className="text-slate-600" /> : <Sparkles size={16} className="text-white" />}
              </div>

              <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                ? 'bg-brand-700 text-white rounded-tr-none'
                : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm'
                }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex max-w-[80%] gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0">
                <Sparkles size={16} className="text-white" />
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 flex items-center gap-2 shadow-sm">
                <Loader2 className="w-3 h-3 animate-spin text-brand-500" />
                <span className="text-slate-400 text-xs italic">{t.chatbot.typing}</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-slate-100">
        <form onSubmit={handleSend} className="relative flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.chatbot.placeholder}
            autoFocus
            className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-1 p-2 bg-brand-900 text-white rounded-full hover:bg-brand-700 disabled:opacity-50 transition-colors"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;