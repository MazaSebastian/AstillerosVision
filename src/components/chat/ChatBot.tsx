"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

const BOT_RESPONSES = [
  "¡Hola! Soy el asistente virtual de Astillero Visión. ¿En qué puedo ayudarte hoy?",
  "Tenemos una amplia línea de modelos desde 15 hasta 21 pies. ¿Qué tipo de navegación te interesa?",
  "Podés configurar tu embarcación ideal en nuestro configurador 3D. ¡Elegí colores, accesorios y más!",
  "Para cotizaciones personalizadas, te recomiendo usar el botón 'Solicitar Cotización' en el configurador.",
  "¿Necesitás repuestos? Visitá nuestra tienda online con piezas originales certificadas.",
  "Nuestro equipo de atención está disponible de lunes a viernes de 9 a 18hs. ¿Puedo ayudarte en algo más?",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "bot",
      content: "¡Bienvenido a Astillero Visión! 🚢 Soy tu asistente virtual. ¿En qué puedo ayudarte?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => { scrollToBottom(); }, [messages]);
  useEffect(() => { if (isOpen) setTimeout(() => inputRef.current?.focus(), 300); }, [isOpen]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: ChatMessage = { id: `user-${Date.now()}`, role: "user", content: text, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "bot",
        content: BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full gradient-red text-white shadow-xl shadow-brand-500/20 transition-all hover:scale-105 active:scale-95"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 flex h-[480px] w-[380px] max-w-[calc(100vw-3rem)] flex-col rounded-2xl glass shadow-2xl shadow-black/40 overflow-hidden border border-white/[0.08]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06] bg-dark-900/50">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10">
                  <Bot className="h-5 w-5 text-brand-400" />
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-dark-900" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Asistente AV</p>
                <p className="text-xs text-green-400">En línea</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg) => (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "bot" && (
                    <div className="flex h-7 w-7 min-w-7 items-center justify-center rounded-full bg-brand-500/10 mt-1">
                      <Bot className="h-3.5 w-3.5 text-brand-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "gradient-red text-white rounded-br-md"
                        : "bg-white/5 text-dark-200 rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="flex h-7 w-7 min-w-7 items-center justify-center rounded-full bg-dark-700/50 mt-1">
                      <User className="h-3.5 w-3.5 text-dark-400" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2">
                  <div className="flex h-7 w-7 min-w-7 items-center justify-center rounded-full bg-brand-500/10 mt-1">
                    <Bot className="h-3.5 w-3.5 text-brand-400" />
                  </div>
                  <div className="bg-white/5 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-dark-400 animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-dark-400 animate-bounce" style={{ animationDelay: "0.15s" }} />
                    <span className="h-2 w-2 rounded-full bg-dark-400 animate-bounce" style={{ animationDelay: "0.3s" }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/[0.06] bg-dark-900/30">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribí tu mensaje..."
                  className="flex-1 rounded-xl bg-white/5 border border-white/5 px-4 py-2.5 text-sm text-white placeholder:text-dark-500 outline-none focus:border-brand-500/30 focus:ring-1 focus:ring-brand-500/20 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="flex h-10 w-10 items-center justify-center rounded-xl gradient-red text-white transition-all hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
