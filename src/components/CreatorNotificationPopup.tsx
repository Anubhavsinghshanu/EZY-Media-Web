'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Expanded Indian creator names pool (40+ names)
const CREATOR_NAMES = [
    'Rahul Verma',
    'Priya Sharma',
    'Arjun Patel',
    'Ananya Singh',
    'Rohan Gupta',
    'Diya Kapoor',
    'Vikram Reddy',
    'Neha Malhotra',
    'Kabir Khan',
    'Ishita Mehta',
    'Aditya Joshi',
    'Sanya Rao',
    'Varun Desai',
    'Kiara Bhatia',
    'Aarav Chawla',
    'Sneha Iyer',
    'Karan Saxena',
    'Pooja Nair',
    'Siddharth Kulkarni',
    'Riya Das',
    'Ayush Agarwal',
    'Tanvi Menon',
    'Harsh Pandey',
    'Navya Khanna',
    'Shaurya Chopra',
    'Aditi Bansal',
    'Nikhil Thakur',
    'Shreya Ghosh',
    'Vivek Bose',
    'Meera Pillai',
    'Yash Shetty',
    'Simran Ahuja',
    'Dhruv Mishra',
    'Kavya Rane',
    'Aryan Bajaj',
    'Nidhi Sinha',
    'Akash Chauhan',
    'Tanya Dubey',
    'Arnav Varma',
    'Ishaan Rana',
    'Ritu Kaur',
    'Mohit Bhargava',
    'Sakshi Jain'
];

// Fixed campaign - Music Promotion only
const MUSIC_CAMPAIGN = { name: 'Music Promotion', emoji: '🎵', color: 'from-purple-500 to-pink-500' };

interface PopupData {
    id: number;
    creatorName: string;
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
    const [usedNames, setUsedNames] = useState<string[]>([]);
    const [availableNames, setAvailableNames] = useState<string[]>([...CREATOR_NAMES]);

    // Show next popup with no name repetition
    const showNextPopup = useCallback(() => {
        // If all names have been used, reset the pool
        let namesToUse = availableNames.length > 0 ? availableNames : [...CREATOR_NAMES];

        // Pick a random name from available names
        const randomIndex = Math.floor(Math.random() * namesToUse.length);
        const selectedName = namesToUse[randomIndex];

        // Remove selected name from available names
        const newAvailableNames = namesToUse.filter((_, index) => index !== randomIndex);
        setAvailableNames(newAvailableNames);
        setUsedNames((prev) => [...prev, selectedName]);

        setCurrentPopup({
            id: Date.now(),
            creatorName: selectedName
        });
        setIsVisible(true);

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            setIsVisible(false);
        }, 5000);
    }, [availableNames]);

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

        // Calculate delay: 5s for first, random 10-20s for authentic gap
        const delay = hasShownFirst.current
            ? Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000 // Random 10s-20s gap
            : 5000; // First popup after 5s

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

                            {/* Top accent line - Purple/Pink gradient for music */}
                            <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${MUSIC_CAMPAIGN.color}`} />

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

                                {/* Concise message - "Creator Name joined current music campaign" */}
                                <motion.div
                                    className="pr-6 mb-2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.4 }}
                                >
                                    <p className="text-sm text-gray-300 leading-relaxed">
                                        <span className="font-bold text-white">{currentPopup.creatorName}</span>
                                        {' '}joined current{' '}
                                        <span className={`font-semibold bg-gradient-to-r ${MUSIC_CAMPAIGN.color} bg-clip-text text-transparent`}>
                                            music campaign
                                        </span>
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
                                    <span>Join as Creator</span>
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

                            {/* Progress bar - Purple/Pink gradient - 5 seconds */}
                            <motion.div
                                className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r ${MUSIC_CAMPAIGN.color}`}
                                initial={{ width: '100%' }}
                                animate={{ width: '0%' }}
                                transition={{ duration: 5, ease: 'linear' }}
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
