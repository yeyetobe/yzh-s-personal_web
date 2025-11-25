import React, { useState, useRef, useEffect } from 'react';
import { X, ArrowUp, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { PROFILE } from '../data';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: `Hello. I am an AI assistant trained on ${PROFILE.name}'s work. How can I help?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await sendMessageToGemini(userMsg, messages);
      setMessages(prev => [...prev, { role: 'model', text: response || "I could not generate a response." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Connection error." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end pointer-events-none font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white pointer-events-auto border border-stone-200 w-80 sm:w-96 mb-6 flex flex-col shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-[#fafaf9]">
            <div className="flex items-center gap-2 text-stone-900">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wide uppercase">AI Context</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-stone-900 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 bg-white space-y-6 scroll-smooth">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'text-stone-900 bg-stone-100 px-4 py-3' 
                    : 'text-stone-600'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start text-stone-400 text-xs animate-pulse">
                 Thinking...
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-stone-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a question..."
              className="flex-1 bg-transparent text-sm outline-none text-stone-900 placeholder:text-stone-300"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="text-stone-900 hover:text-stone-600 disabled:opacity-30 transition-colors"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Minimal Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto flex items-center justify-center w-12 h-12 bg-stone-900 text-white shadow-lg hover:bg-stone-800 transition-all duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
      >
        {isOpen ? <X className="w-5 h-5" /> : <span className="font-serif italic font-bold text-lg">Ai</span>}
      </button>
    </div>
  );
};

export default AIChat;