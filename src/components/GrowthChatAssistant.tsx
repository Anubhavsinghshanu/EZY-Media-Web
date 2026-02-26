'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AGENCY } from './chatbot/chatLogic';

// ─── Types ───────────────────────────────────────────────────────────────────
interface Message {
    id: string;
    role: 'bot' | 'user';
    text: string;
    timestamp: Date;
    options?: string[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`;
const formatTime = (d: Date) => d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

// ─── Typing Indicator ─────────────────────────────────────────────────────────
function TypingDots() {
    return (
        <div className="flex items-center gap-1 px-4 py-3">
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="w-2 h-2 rounded-full bg-cyan-400 block"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.14 }}
                />
            ))}
        </div>
    );
}

// ─── Markdown-style bold renderer ────────────────────────────────────────────
function RichText({ text }: { text: string }) {
    return (
        <div className="space-y-2">
            {text.split('\n\n').map((block, i) => (
                <div key={i} className="space-y-1">
                    {block.split('\n').map((line, j) => (
                        <p key={j} className="text-sm leading-relaxed last:mb-0">
                            {line.split(/\*\*(.*?)\*\*/g).map((part, k) =>
                                k % 2 === 1 ? <strong key={k} className="text-white font-semibold">{part}</strong> : <span key={k}>{part}</span>
                            )}
                        </p>
                    ))}
                </div>
            ))}
        </div>
    );
}

// ─── Suggestion chips shown when no messages yet ──────────────────────────────
const SUGGESTIONS = [
    { emoji: '📣', label: 'How to promote my Instagram?' },
    { emoji: '💰', label: 'What are your latest prices?' },
    { emoji: '🎵', label: 'Viral music marketing trends?' },
    { emoji: '📅', label: 'Book a free strategy session' },
];

export default function GrowthChatAssistant() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const [unread, setUnread] = useState(0);
    const [pulsed, setPulsed] = useState(false);
    const [greeted, setGreeted] = useState(false);

    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Scroll to bottom on new messages
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typing]);

    // Focus input on open
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 300);
            setUnread(0);
        }
    }, [open]);

    // Pulse button after 5s
    useEffect(() => {
        const t = setTimeout(() => setPulsed(true), 5000);
        return () => clearTimeout(t);
    }, []);

    // Auto-greet on first open
    useEffect(() => {
        if (open && !greeted) {
            setGreeted(true);
            setTyping(true);
            setTimeout(() => {
                setTyping(false);
                const welcomeMsg: Message = {
                    id: uid(),
                    role: 'bot',
                    text: `Hey there! 👋 I'm your **MediaPro AI Assistant** powered by EZY MEDIA.\n\nI have real-time access to the internet to give you the freshest strategies on marketing, social media growth, and branding. What can I analyze for you today?`,
                    timestamp: new Date(),
                    options: ['💼 Services', '💰 Pricing', '📅 Book Free Call']
                };
                setMessages([welcomeMsg]);
            }, 1000);
        }
    }, [open, greeted]);

    const pushMessage = useCallback((role: 'bot' | 'user', text: string, options?: string[]) => {
        const newMessage: Message = { id: uid(), role, text, timestamp: new Date(), options };
        setMessages((prev) => [...prev, newMessage]);
        return newMessage;
    }, []);

    const callChatAPI = async (userText: string, chatHistory: Message[]) => {
        try {
            setTyping(true);

            // Format history for Gemini API - API requires history to start with 'user'
            const formattedHistory = chatHistory
                .filter((m, i) => !(i === 0 && m.role === 'bot')) // Skip static welcome message
                .map(m => ({
                    role: m.role === 'user' ? 'user' : 'model',
                    parts: [{ text: m.text }]
                }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: userText,
                    history: formattedHistory
                })
            });

            const data = await response.json();

            setTyping(false);
            if (data.error) {
                pushMessage('bot', `⚠️ **Error:** ${data.error}`);
            } else {
                pushMessage('bot', data.text);
            }
        } catch (error) {
            setTyping(false);
            pushMessage('bot', "Sorry, I'm having trouble connecting to the internet right now. Please try again in a bit!");
        }
    };

    const handleSend = useCallback((rawText: string) => {
        const text = rawText.trim();
        if (!text || typing) return;

        setInput('');
        const updatedMessages = [...messages, pushMessage('user', text)];
        callChatAPI(text, updatedMessages);
    }, [messages, typing, pushMessage]);

    const handleSuggestion = (label: string) => {
        if (!open) setOpen(true);
        setTimeout(() => handleSend(label), open ? 0 : 1300);
    };

    const handleOption = (opt: string) => {
        if (opt.includes('WhatsApp')) { window.open(AGENCY.whatsappLink, '_blank'); return; }
        if (opt.includes('Call') || opt.includes('📅')) { handleSend("I want to book a free strategy call"); return; }
        handleSend(opt);
    };

    return (
        <>
            {/* ── Floating Button ── */}
            <div className="fixed bottom-6 left-6 z-[9998] flex flex-col items-start gap-2">
                <AnimatePresence>
                    {!open && !greeted && pulsed && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                            className="bg-[#111] border border-white/10 rounded-2xl rounded-bl-none px-4 py-2.5 shadow-xl mb-1 max-w-[200px]"
                        >
                            <p className="text-[11px] text-gray-300 leading-snug">
                                👋 Need <strong className="text-white">real-time marketing help?</strong>
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setOpen((o) => !o)}
                    className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg,#06b6d4,#7c3aed)' }}
                    whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
                    animate={pulsed && !open
                        ? { boxShadow: ['0 0 0 0 rgba(6,182,212,0.5)', '0 0 0 16px rgba(6,182,212,0)', '0 0 0 0 rgba(6,182,212,0)'] }
                        : {}}
                    transition={{ repeat: Infinity, duration: 2.2 }}
                    aria-label="Open chat"
                >
                    <AnimatePresence mode="wait">
                        {open ? (
                            <motion.svg key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }} width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <path d="M17 5L5 17M5 5L17 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </motion.svg>
                        ) : (
                            <motion.svg key="chat" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.18 }} width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M8 10h8M8 14h5M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.6.376 3.112 1.043 4.453L2 22l5.547-1.043A9.959 9.959 0 0012 22z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </motion.svg>
                        )}
                    </AnimatePresence>
                    {unread > 0 && !open && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] text-white font-bold flex items-center justify-center">
                            {unread}
                        </motion.span>
                    )}
                </motion.button>
            </div>

            {/* ── Chat Window ── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                        className="fixed bottom-24 left-6 z-[9999] w-[380px] max-w-[calc(100vw-3rem)] flex flex-col"
                        style={{ height: 'min(650px, calc(100vh - 130px))' }}
                    >
                        <div className="flex flex-col h-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.85)]">

                            {/* Header */}
                            <div className="relative flex-shrink-0 px-4 py-3 flex items-center gap-3" style={{ background: 'linear-gradient(135deg,#0e7490,#5b21b6)' }}>
                                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-none" />
                                <div className="relative w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-xl flex-shrink-0">
                                    🚀
                                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0e7490]" />
                                </div>
                                <div className="relative flex-1 min-w-0">
                                    <p className="text-white font-bold text-sm">MediaPro AI</p>
                                    <p className="text-white/60 text-[11px]">Real-time Insights • Online</p>
                                </div>
                                <a href={AGENCY.whatsappLink} target="_blank" rel="noopener noreferrer"
                                    className="relative w-8 h-8 rounded-full bg-white/10 hover:bg-green-500 transition-colors flex items-center justify-center flex-shrink-0">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </a>
                                <button onClick={() => setOpen(false)}
                                    className="relative w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center flex-shrink-0">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M9 3L3 9M3 3L9 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>

                            {/* Messages */}
                            <div
                                className="flex-1 overflow-y-auto bg-[#080808] px-3 py-4 space-y-4 touch-pan-y overscroll-contain [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/30"
                                data-lenis-prevent="true"
                            >
                                {messages.length === 0 && !typing && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full gap-5 py-6">
                                        <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ background: 'linear-gradient(135deg,#06b6d4,#7c3aed)' }}>✨</div>
                                        <div className="text-center">
                                            <p className="text-white font-semibold text-sm">MediaPro AI Expert</p>
                                            <p className="text-gray-500 text-xs">Real-time web-connected growth assistant</p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 w-full">
                                            {SUGGESTIONS.map((s, idx) => (
                                                <button key={idx} onClick={() => handleSuggestion(s.label)}
                                                    className="text-left px-3 py-2.5 rounded-xl bg-[#161616] border border-white/8 text-gray-400 text-[11px] hover:border-cyan-500/50 transition-all">
                                                    <span className="mr-1">{s.emoji}</span> {s.label}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {messages.map((msg) => (
                                    <motion.div key={msg.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                                        className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        {msg.role === 'bot' && (
                                            <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-sm mt-auto"
                                                style={{ background: 'linear-gradient(135deg,#06b6d4,#7c3aed)' }}>🚀</div>
                                        )}
                                        <div className={`flex flex-col gap-1.5 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                            <div className={`px-3 py-2.5 rounded-2xl ${msg.role === 'user'
                                                ? 'bg-cyan-600 text-white rounded-br-sm'
                                                : 'bg-[#161616] border border-white/8 text-gray-300 rounded-bl-sm'}`}>
                                                <RichText text={msg.text} />
                                            </div>
                                            {msg.role === 'bot' && msg.options && (
                                                <div className="flex flex-wrap gap-1.5 mt-1">
                                                    {msg.options.map((opt) => (
                                                        <button key={opt} onClick={() => handleOption(opt)}
                                                            className="text-[10px] px-3 py-1.5 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all">
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                                {typing && (
                                    <div className="flex items-end gap-2">
                                        <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-sm" style={{ background: 'linear-gradient(135deg,#06b6d4,#7c3aed)' }}>🚀</div>
                                        <div className="bg-[#161616] border border-white/8 rounded-2xl rounded-bl-sm"><TypingDots /></div>
                                    </div>
                                )}
                                <div ref={bottomRef} />
                            </div>

                            {/* Input */}
                            <div className="flex-shrink-0 bg-[#0d0d0d] border-t border-white/8 px-3 py-3">
                                <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="flex items-center gap-2 bg-[#1a1a1a] rounded-xl border border-white/10 px-3 py-2 focus-within:border-cyan-500/40 transition-colors">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask about real-time marketing trends..."
                                        className="flex-1 bg-transparent text-sm text-white outline-none"
                                        disabled={typing}
                                    />
                                    <button type="submit" disabled={!input.trim() || typing}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-30"
                                        style={{ background: input.trim() ? 'linear-gradient(135deg,#06b6d4,#7c3aed)' : '#2a2a2a' }}>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path d="M12 7L2 2L4.5 7L2 12L12 7Z" fill="white" />
                                        </svg>
                                    </button>
                                </form>
                                <p className="text-center text-[9px] text-gray-700 mt-2 uppercase tracking-widest">
                                    Powered by Gemini 1.5 · Real-time Data
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
