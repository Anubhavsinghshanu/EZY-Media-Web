'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Expanded Indian creator names pool (40+ names)
const POPUP_MESSAGES = [
    { text: "400+ creators worked in MUSIC CAMPAIGN of song KYA BATAUN TUJHE", emoji: "🎵", color: "from-purple-500 to-pink-500" },
    { text: "300+ creators worked in MUSIC CAMPAIGN of song NIKKI NIKKI GAL", emoji: "🚀", color: "from-blue-500 to-cyan-500" },
    { text: "385+ creators worked in MUSIC CAMPAIGN of song GHAR KAB AAOGE", emoji: "📈", color: "from-emerald-500 to-teal-500" },
    { text: "420+ creators worked in MUSIC CAMPAIGN of song ISHQ DA CHEHRA", emoji: "🔥", color: "from-orange-500 to-red-500" },
    { text: "275+ creators worked in MUSIC CAMPAIGN of song JATEY HUE LAMHON", emoji: "🌟", color: "from-indigo-500 to-purple-500" },
    { text: "310+ creators worked in MUSIC CAMPAIGN of song BAS EK DHADAK", emoji: "💎", color: "from-pink-500 to-rose-500" },
    { text: "440+ creators worked in MUSIC CAMPAIGN of song ARZ KIYA HAI", emoji: "🎉", color: "from-yellow-400 to-orange-500" },
    { text: "EZY MEDIA IS NOW #1 MUSIC PROMOTION AGENCY", emoji: "🏆", color: "from-amber-400 to-yellow-600" },
    { text: "EZY MEDIA IS NOW #1 MUSIC PROMOTION AGENCY", emoji: "👑", color: "from-amber-400 to-yellow-600" }
];

interface PopupData {
    id: number;
    messageData: { text: string; emoji: string; color: string };
}

export default function CreatorNotificationPopup() {
    const [currentPopup, setCurrentPopup] = useState<PopupData | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        profileLink: '',
        niche: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [usedMessages, setUsedMessages] = useState<number[]>([]);
    const [availableMessages, setAvailableMessages] = useState<number[]>(POPUP_MESSAGES.map((_, i) => i));

    // Show next popup with no repetition until all are shown
    const showNextPopup = useCallback(() => {
        // If all messages have been used, reset the pool
        let itemsToUse = availableMessages.length > 0 ? availableMessages : POPUP_MESSAGES.map((_, i) => i);

        // Pick a random message index from available items
        const randomQueueIndex = Math.floor(Math.random() * itemsToUse.length);
        const selectedMessageIndex = itemsToUse[randomQueueIndex];

        // Remove selected message from available ones
        const newAvailableMessages = itemsToUse.filter((_, index) => index !== randomQueueIndex);
        setAvailableMessages(newAvailableMessages);
        setUsedMessages((prev) => [...prev, selectedMessageIndex]);

        setCurrentPopup({
            id: Date.now(),
            messageData: POPUP_MESSAGES[selectedMessageIndex]
        });
        setIsVisible(true);

        // Auto-dismiss after 7 seconds
        setTimeout(() => {
            setIsVisible(false);
        }, 7000);
    }, [availableMessages]);

    // Manual close
    const handleClose = () => {
        setIsVisible(false);
    };

    // Open modal
    const handleJoinClick = () => {
        setIsModalOpen(true);
        setIsVisible(false);
    };

    // Close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsSubmitted(false);
        setFormData({ profileLink: '', niche: '' });
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);

        setTimeout(() => {
            handleCloseModal();
        }, 3000);
    };

    // Track if it's the first load
    const hasShownFirst = useRef(false);

    // Smart scheduling for authentic feel
    useEffect(() => {
        // If modal is open or popup is currently showing, don't schedule new one
        if (isModalOpen || isVisible) return;

        // Calculate delay: 8s for first, random 18-35s for natural, human-like gap
        const delay = hasShownFirst.current
            ? Math.floor(Math.random() * (35000 - 18000 + 1)) + 18000 // Random 18s-35s gap for natural feel
            : 8000; // First popup after 8s

        const timer = setTimeout(() => {
            showNextPopup();
            hasShownFirst.current = true;
        }, delay);

        return () => clearTimeout(timer);
    }, [isVisible, isModalOpen, showNextPopup]);

    return (
        <>
            {/* Compact Popup Notification with Celebration Animation */}
            <AnimatePresence mode="wait">
                {isVisible && currentPopup && !isModalOpen && (
                    <motion.div
                        key={currentPopup.id}
                        initial={{ opacity: 0, x: 100, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, x: 50, scale: 0.95 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            duration: 0.6
                        }}
                        className="fixed z-[9999] bottom-6 right-6 max-w-[280px] pointer-events-auto"
                    >
                        <div className="relative bg-[#0a0a0a]/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                            {/* Soft glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />

                            {/* Top accent line - Dynamic color */}
                            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${currentPopup.messageData.color}`} />

                            {/* Celebration Confetti Particles */}
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
                                    style={{
                                        background: ['#8B5CF6', '#EC4899', '#F59E0B', '#3B82F6'][i % 4],
                                        left: `${20 + (i * 10)}%`,
                                        top: `${10 + (i % 3) * 20}%`,
                                    }}
                                    initial={{ opacity: 0, scale: 0, y: 0 }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        scale: [0, 1.5, 0],
                                        y: [0, -30 - (i * 5), -50 - (i * 8)],
                                        x: [0, (i % 2 ? 15 : -15), (i % 2 ? 25 : -25)],
                                        rotate: [0, 360 * (i % 2 ? 1 : -1)]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        delay: i * 0.1,
                                        ease: "easeOut"
                                    }}
                                />
                            ))}

                            {/* Sparkle effect */}
                            {[...Array(4)].map((_, i) => (
                                <motion.div
                                    key={`spark-${i}`}
                                    className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
                                    style={{
                                        left: `${30 + (i * 15)}%`,
                                        top: `${20 + (i * 20)}%`,
                                    }}
                                    animate={{
                                        opacity: [0, 1, 0],
                                        scale: [0, 2, 0],
                                    }}
                                    transition={{
                                        duration: 1,
                                        delay: 0.2 + (i * 0.15),
                                        repeat: 1,
                                    }}
                                />
                            ))}

                            {/* Content */}
                            <div className="relative p-3">
                                {/* Close button */}
                                <button
                                    onClick={handleClose}
                                    className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-gray-500 hover:text-white transition-colors rounded-full hover:bg-white/5"
                                    aria-label="Close"
                                >
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                        <path d="M9 1L1 9M1 1L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </button>

                                {/* Concise message - "Data point" */}
                                <motion.div
                                    className="pr-6 mb-2 flex items-start gap-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.4 }}
                                >
                                    <span className="text-xl mt-0.5">{currentPopup.messageData.emoji}</span>
                                    <p className="text-sm text-gray-300 leading-relaxed font-medium">
                                        {currentPopup.messageData.text}
                                    </p>
                                </motion.div>

                                {/* Minimal CTA link */}
                                <motion.button
                                    onClick={handleJoinClick}
                                    className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1 group"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <span>Promote Your Brand</span>
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        className="transform group-hover:translate-x-0.5 transition-transform"
                                    >
                                        <path
                                            d="M4 9L7 6L4 3"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </motion.button>
                            </div>

                            {/* Progress bar - Dynamic gradient - 7 seconds */}
                            <motion.div
                                className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r ${currentPopup.messageData.color}`}
                                initial={{ width: '100%' }}
                                animate={{ width: '0%' }}
                                transition={{ duration: 7, ease: 'linear' }}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal Form */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[10000]"
                            onClick={handleCloseModal}
                        />

                        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.98, y: 10 }}
                                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                                className="relative w-full max-w-md bg-[#0f0f0f] rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none" />

                                <div className="relative p-8">
                                    <button
                                        onClick={handleCloseModal}
                                        className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors rounded-full hover:bg-white/5"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </button>

                                    {!isSubmitted ? (
                                        <>
                                            <h2 className="text-2xl font-bold text-white mb-2">
                                                Join as a Creator
                                            </h2>
                                            <p className="text-sm text-gray-400 mb-8">
                                                Share your details and we'll get you onboarded
                                            </p>

                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                        Paste your Creator Profile Link
                                                    </label>
                                                    <input
                                                        type="url"
                                                        required
                                                        value={formData.profileLink}
                                                        onChange={(e) => setFormData({ ...formData, profileLink: e.target.value })}
                                                        placeholder="https://instagram.com/yourusername"
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                                                    />
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        Instagram / YouTube / Spotify
                                                    </p>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-gray-300 mb-2">
                                                        Select Your Niche
                                                    </label>
                                                    <select
                                                        required
                                                        value={formData.niche}
                                                        onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors appearance-none cursor-pointer"
                                                    >
                                                        <option value="" className="bg-[#1a1a1a]">Choose a category...</option>
                                                        <option value="music" className="bg-[#1a1a1a]">🎵 Music Promotion</option>
                                                        <option value="gaming" className="bg-[#1a1a1a]">🎮 Gaming</option>
                                                        <option value="betting" className="bg-[#1a1a1a]">🎰 Betting & Fantasy</option>
                                                        <option value="lifestyle" className="bg-[#1a1a1a]">✨ Lifestyle</option>
                                                        <option value="finance" className="bg-[#1a1a1a]">💰 Finance</option>
                                                        <option value="other" className="bg-[#1a1a1a]">📌 Other</option>
                                                    </select>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                                                >
                                                    Request Campaign Access
                                                </button>
                                            </form>
                                        </>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-8"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                                                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center"
                                            >
                                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                                    <path
                                                        d="M12 20L18 26L28 14"
                                                        stroke="white"
                                                        strokeWidth="3"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </motion.div>

                                            <h3 className="text-2xl font-bold text-white mb-3">
                                                Request Submitted!
                                            </h3>
                                            <p className="text-gray-400 text-sm max-w-xs mx-auto">
                                                Thanks! Our team will review and contact you shortly.
                                            </p>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
