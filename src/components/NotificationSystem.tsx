'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ==================== CONFIGURATION ====================

const NOTIFICATIONS_DATA = [
    { icon: '🎵', title: 'Campaign Success', text: '412+ creators worked in MUSIC CAMPAIGN of song KYA BATAUN TUJHE' },
    { icon: '🚀', title: 'Trending Campaign', text: '304+ creators worked in MUSIC CAMPAIGN of song NIKKI NIKKI GAL' },
    { icon: '📈', title: 'Massive Reach', text: '289+ creators worked in MUSIC CAMPAIGN of song GHAR KAB AAOGE' },
    { icon: '🔥', title: 'Viral Hit', text: '436+ creators worked in MUSIC CAMPAIGN of song ISHQ DA CHEHRA' },
    { icon: '🌟', title: 'Creator Collaboration', text: '375+ creators worked in MUSIC CAMPAIGN of song JATEY HUE LAMHON' },
    { icon: '💎', title: 'Growth Milestone', text: '261+ creators worked in MUSIC CAMPAIGN of song BAS EK DHADAK' },
    { icon: '🎉', title: 'Chart Topper', text: '445+ creators worked in MUSIC CAMPAIGN of song ARZ KIYA HAI' },
    { icon: '🏆', title: 'Achievement Unlocked', text: 'EZY MEDIA IS NOW #1 MUSIC PROMOTION AGENCY' },
    { icon: '👑', title: 'Industry Leaders', text: 'EZY MEDIA IS NOW #1 MUSIC PROMOTION AGENCY' },
];

// ==================== TYPES ====================

type NotificationType = 'creator-join' | 'trending-campaign' | 'celebration';

interface Notification {
    id: string;
    type: NotificationType;
    data?: any;
}

// ==================== CONFETTI COMPONENT ====================

const Confetti = () => {
    const particles = React.useMemo(() => Array.from({ length: 30 }, (_, i) => ({
        id: i,
        color: ['#8B5CF6', '#3B82F6', '#F59E0B', '#EC4899'][i % 4],
        delay: Math.random() * 0.3,
        x: Math.random() * 100,
        rotation: Math.random() * 360,
    })), []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute w-2 h-2 rounded-sm"
                    style={{
                        backgroundColor: p.color,
                        left: `${p.x}%`,
                        top: '-5%',
                    }}
                    initial={{ y: 0, opacity: 1, rotate: 0 }}
                    animate={{
                        y: window.innerHeight * 1.1,
                        opacity: 0,
                        rotate: p.rotation,
                    }}
                    transition={{
                        duration: 6 + Math.random() * 2,
                        delay: p.delay,
                        ease: 'easeIn',
                    }}
                />
            ))}
        </div>
    );
};

// ==================== SPARKLE COMPONENT ====================

const Sparkles = () => {
    const sparkles = React.useMemo(() => Array.from({ length: 12 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.5,
    })), []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {sparkles.map((s) => (
                <motion.div
                    key={s.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        width: s.size,
                        height: s.size,
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                    }}
                    transition={{
                        duration: 2,
                        delay: s.delay,
                        repeat: Infinity,
                        repeatDelay: 2,
                    }}
                />
            ))}
        </div>
    );
};

// ==================== TYPE 1: DATA POPUP ====================

const DataPopup = ({ data, onClose }: { data: { icon: string; title: string; text: string }; onClose: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed z-[9999] bottom-6 left-6 md:bottom-8 md:left-8 max-md:left-1/2 max-md:-translate-x-1/2 pointer-events-auto"
            style={{
                maxWidth: '420px',
                width: 'calc(100vw - 3rem)',
            }}
        >
            <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f1624] rounded-[20px] border border-purple-500/20 shadow-2xl overflow-hidden backdrop-blur-sm">
                {/* Breathing glow border */}
                <motion.div
                    className="absolute inset-0 rounded-[20px] opacity-40"
                    animate={{
                        boxShadow: [
                            '0 0 20px rgba(139, 92, 246, 0.3)',
                            '0 0 30px rgba(139, 92, 246, 0.5)',
                            '0 0 20px rgba(139, 92, 246, 0.3)',
                        ],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />

                {/* Content */}
                <div className="relative p-5 pr-12">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
                        aria-label="Close notification"
                    >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>

                    {/* Icon */}
                    <div className="flex items-start gap-4 mb-3">
                        <div className="relative flex-shrink-0 mt-1">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-md opacity-60 animate-pulse" />
                            <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                                <span className="text-xl">{data.icon}</span>
                            </div>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-white font-bold text-base mb-1.5 tracking-tight flex items-center gap-1.5">
                                {data.icon} {data.title}
                            </h3>
                            <p className="text-white/80 text-sm leading-relaxed">
                                {data.text}
                            </p>
                        </div>
                    </div>

                    {/* Micro CTA */}
                    <div className="mt-4 pt-3 border-t border-white/10">
                        <p className="text-purple-400 text-xs font-semibold tracking-wide hover:text-purple-300 transition-colors cursor-pointer w-max">
                            Promote Your Brand →
                        </p>
                    </div>

                    {/* Progress bar */}
                    <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
                        initial={{ width: '100%' }}
                        animate={{ width: '0%' }}
                        transition={{ duration: 10, ease: 'linear' }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

// ==================== TYPE 2: TRENDING CAMPAIGN POPUP ====================

const TrendingCampaignPopup = ({ onClose, onCTAClick }: { onClose: () => void; onCTAClick: (type: 'creator' | 'manager') => void }) => {
    const [ripple, setRipple] = useState(false);

    const handleCTAClick = (type: 'creator' | 'manager') => {
        setRipple(true);
        setTimeout(() => {
            onCTAClick(type);
        }, 300);
    };

    return (
        <>
            {/* Subtle backdrop blur */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
                onClick={onClose}
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{
                    duration: 0.4,
                    ease: [0.34, 1.56, 0.64, 1], // Elastic easing
                }}
                className="fixed z-[9999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{
                    maxWidth: '460px',
                    width: 'calc(100vw - 2rem)',
                }}
            >
                <div className="relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-[24px] border border-amber-500/30 shadow-2xl overflow-hidden">
                    {/* Ripple effect on CTA click */}
                    {ripple && (
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-[24px]"
                            initial={{ scale: 0.5, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            transition={{ duration: 0.6 }}
                        />
                    )}

                    {/* Content */}
                    <div className="relative p-8">
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 mb-5"
                            animate={{
                                boxShadow: [
                                    '0 0 15px rgba(249, 115, 22, 0.5)',
                                    '0 0 25px rgba(249, 115, 22, 0.7)',
                                    '0 0 15px rgba(249, 115, 22, 0.5)',
                                ],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="text-base">🔥</span>
                            <span className="text-white text-xs font-bold uppercase tracking-wider">
                                TRENDING NOW
                            </span>
                        </motion.div>

                        {/* Title */}
                        <h2 className="text-white text-2xl md:text-3xl font-bold mb-3 leading-tight">
                            Trending Song Campaign is LIVE
                        </h2>

                        {/* Description */}
                        <p className="text-gray-400 text-sm md:text-base mb-6 leading-relaxed">
                            Creators & Managers are joining fast. Limited slots available.
                        </p>

                        {/* Buttons */}
                        <div className="space-y-3">
                            {/* Primary CTA - Creator */}
                            <motion.button
                                onClick={() => handleCTAClick('creator')}
                                className="relative w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-sm overflow-hidden group"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* Shimmer effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    animate={{ x: ['-200%', '200%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                />
                                <span className="relative z-10">Join as a Creator</span>
                            </motion.button>

                            {/* Secondary CTA - Manager */}
                            <motion.button
                                onClick={() => handleCTAClick('manager')}
                                className="w-full px-6 py-3.5 rounded-xl border-2 border-purple-500/50 text-white font-semibold text-sm hover:bg-purple-500/10 transition-all"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 0.2 }}
                            >
                                Join as a Manager
                            </motion.button>

                            {/* Cancel */}
                            <button
                                onClick={onClose}
                                className="w-full text-gray-400 text-sm font-medium hover:text-white transition-colors py-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                    {/* Decorative gradient orbs */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
                </div>
            </motion.div>
        </>
    );
};

// ==================== TYPE 3: CELEBRATION POPUP ====================

const CelebrationPopup = ({ onClose, onCTA }: { onClose: () => void; onCTA: () => void }) => {
    return (
        <>
            {/* Confetti */}
            <Confetti />

            {/* Sparkles */}
            <Sparkles />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                    duration: 0.5,
                    ease: [0.34, 1.56, 0.64, 1],
                }}
                className="fixed z-[9999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                style={{
                    maxWidth: '500px',
                    width: 'calc(100vw - 2rem)',
                }}
            >
                <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f1624] rounded-[24px] border-2 border-amber-500/40 shadow-2xl overflow-hidden">
                    {/* Radial glow behind text */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                            className="w-64 h-64 rounded-full bg-amber-500/20 blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                    </div>

                    {/* Content */}
                    <div className="relative p-8 text-center">
                        {/* Emoji */}
                        <motion.div
                            className="text-6xl mb-4"
                            animate={{
                                rotate: [0, 10, -10, 0],
                            }}
                            transition={{ duration: 0.6, repeat: 3 }}
                        >
                            🎉
                        </motion.div>

                        {/* Headline */}
                        <h2 className="text-white text-3xl md:text-4xl font-bold mb-3 leading-tight">
                            <motion.span
                                className="inline-block"
                                animate={{
                                    textShadow: [
                                        '0 0 10px rgba(251, 191, 36, 0.3)',
                                        '0 0 20px rgba(251, 191, 36, 0.6)',
                                        '0 0 10px rgba(251, 191, 36, 0.3)',
                                    ],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                3,500+ Creators Joined!
                            </motion.span>
                        </h2>

                        {/* Subtext */}
                        <p className="text-gray-300 text-base mb-6 leading-relaxed max-w-md mx-auto">
                            You're witnessing one of our fastest-growing campaigns ever.
                        </p>

                        {/* CTA */}
                        <motion.button
                            onClick={onCTA}
                            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-base shadow-lg"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            Be Part of the Campaign
                        </motion.button>
                    </div>
                </div>

                {/* Auto-dismiss after 8 seconds */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 8, ease: 'linear' }}
                    onAnimationComplete={onClose}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 origin-left"
                />
            </motion.div>
        </>
    );
};

// ==================== MAIN NOTIFICATION SYSTEM ====================

export default function NotificationSystem() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
    const [creatorIndex, setCreatorIndex] = useState(0);
    const [hasShownCelebration, setHasShownCelebration] = useState(false);
    const [hasShownTrending, setHasShownTrending] = useState(false);
    const sessionDismissed = useRef<Set<NotificationType>>(new Set());

    // Queue management - only show one notification at a time
    useEffect(() => {
        if (currentNotification === null && notifications.length > 0) {
            setCurrentNotification(notifications[0]);
            setNotifications((prev) => prev.slice(1));
        }
    }, [currentNotification, notifications]);

    // Add notification to queue
    const addNotification = useCallback((type: NotificationType, data?: any) => {
        // Don't show if user dismissed this type
        if (sessionDismissed.current.has(type)) return;

        const notification: Notification = {
            id: `${type}-${Date.now()}`,
            type,
            data,
        };
        setNotifications((prev) => [...prev, notification]);
    }, []);

    // Close current notification
    const closeNotification = useCallback((dismissType?: boolean) => {
        if (currentNotification && dismissType) {
            sessionDismissed.current.add(currentNotification.type);
        }
        setCurrentNotification(null);
    }, [currentNotification]);

    // TYPE 1: Data Popup - Every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            const dataItem = NOTIFICATIONS_DATA[creatorIndex % NOTIFICATIONS_DATA.length];
            addNotification('creator-join', { popupData: dataItem });
            setCreatorIndex((prev) => prev + 1);
        }, 30000);

        return () => clearInterval(interval);
    }, [creatorIndex, addNotification]);

    // TYPE 2: Trending Campaign - After engagement or session start
    useEffect(() => {
        if (hasShownTrending) return;

        // Show after 15 seconds of page load or after scroll
        const showTimer = setTimeout(() => {
            addNotification('trending-campaign');
            setHasShownTrending(true);
        }, 15000);

        const handleScroll = () => {
            if (window.scrollY > 500) {
                addNotification('trending-campaign');
                setHasShownTrending(true);
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(showTimer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasShownTrending, addNotification]);

    // TYPE 3: Celebration - After 2 minutes
    useEffect(() => {
        if (hasShownCelebration) return;

        const timer = setTimeout(() => {
            addNotification('celebration');
            setHasShownCelebration(true);
        }, 120000); // 2 minutes

        return () => clearTimeout(timer);
    }, [hasShownCelebration, addNotification]);

    // Auto-dismiss for TYPE 1
    useEffect(() => {
        if (currentNotification?.type === 'creator-join') {
            const timer = setTimeout(() => {
                closeNotification();
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [currentNotification, closeNotification]);

    // Manual trigger via custom events (for testing/demo)
    useEffect(() => {
        const handleManualTrigger = (event: CustomEvent) => {
            const { type } = event.detail;

            if (type === 'creator-join') {
                const dataItem = NOTIFICATIONS_DATA[Math.floor(Math.random() * NOTIFICATIONS_DATA.length)];
                addNotification('creator-join', { popupData: dataItem });
            } else if (type === 'trending-campaign') {
                addNotification('trending-campaign');
            } else if (type === 'celebration') {
                addNotification('celebration');
            }
        };

        window.addEventListener('trigger-notification', handleManualTrigger as EventListener);

        return () => {
            window.removeEventListener('trigger-notification', handleManualTrigger as EventListener);
        };
    }, [addNotification]);


    return (
        <AnimatePresence mode="wait">
            {currentNotification && (
                <>
                    {currentNotification.type === 'creator-join' && (
                        <DataPopup
                            key={currentNotification.id}
                            data={currentNotification.data.popupData}
                            onClose={() => closeNotification(true)}
                        />
                    )}

                    {currentNotification.type === 'trending-campaign' && (
                        <TrendingCampaignPopup
                            key={currentNotification.id}
                            onClose={() => closeNotification(true)}
                            onCTAClick={(type) => {
                                console.log(`User clicked: Join as ${type}`);
                                closeNotification();
                                // Add your navigation logic here
                            }}
                        />
                    )}

                    {currentNotification.type === 'celebration' && (
                        <CelebrationPopup
                            key={currentNotification.id}
                            onClose={() => closeNotification(true)}
                            onCTA={() => {
                                console.log('User clicked: Be Part of the Campaign');
                                closeNotification();
                                // Add your navigation logic here
                            }}
                        />
                    )}
                </>
            )}
        </AnimatePresence>
    );
}
