'use client';

/**
 * NOTIFICATION SYSTEM DEMO PANEL
 * 
 * This is a development-only component to test all notification types instantly.
 * Remove this component in production or hide it behind a feature flag.
 * 
 * Usage: Import and add to any page to test notifications
 * import NotificationDemo from '@/components/NotificationDemo';
 * <NotificationDemo />
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationDemo() {
    const [isOpen, setIsOpen] = useState(false);

    // Note: These are demo triggers - you'll need to implement actual notification triggers
    // in your NotificationSystem component or create a global notification context

    const triggerDataPopup = () => {
        console.log('🎯 Triggering Data Notification');
        // Dispatch custom event that NotificationSystem listens to
        window.dispatchEvent(new CustomEvent('trigger-notification', {
            detail: { type: 'creator-join' }
        }));
    };

    const triggerTrendingCampaign = () => {
        console.log('🔥 Triggering Trending Campaign Notification');
        window.dispatchEvent(new CustomEvent('trigger-notification', {
            detail: { type: 'trending-campaign' }
        }));
    };

    const triggerCelebration = () => {
        console.log('🎉 Triggering Celebration Notification');
        window.dispatchEvent(new CustomEvent('trigger-notification', {
            detail: { type: 'celebration' }
        }));
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-[10000] w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl flex items-center justify-center font-bold text-xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title="Toggle Notification Demo Panel"
            >
                🔔
            </motion.button>

            {/* Demo Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 400 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 400 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="fixed bottom-24 right-6 z-[10000] w-80 bg-gradient-to-br from-[#1a1a2e] to-[#0f1624] rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
                            <h3 className="text-white font-bold text-lg">
                                🔔 Notification Demo
                            </h3>
                            <p className="text-white/80 text-xs mt-1">
                                Test all notification types instantly
                            </p>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-3">
                            {/* Type 1: Creator Join */}
                            <div>
                                <button
                                    onClick={triggerDataPopup}
                                    className="w-full px-4 py-3 rounded-lg bg-purple-600/20 border border-purple-500/30 text-white hover:bg-purple-600/30 transition-all text-left"
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-lg">✨</span>
                                        <span className="font-semibold text-sm">Data Popup</span>
                                    </div>
                                    <p className="text-xs text-white/60">
                                        Bottom-left popup • 10s auto-dismiss
                                    </p>
                                </button>
                            </div>

                            {/* Type 2: Trending Campaign */}
                            <div>
                                <button
                                    onClick={triggerTrendingCampaign}
                                    className="w-full px-4 py-3 rounded-lg bg-orange-600/20 border border-orange-500/30 text-white hover:bg-orange-600/30 transition-all text-left"
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-lg">🔥</span>
                                        <span className="font-semibold text-sm">Trending Campaign</span>
                                    </div>
                                    <p className="text-xs text-white/60">
                                        Center modal • High priority
                                    </p>
                                </button>
                            </div>

                            {/* Type 3: Celebration */}
                            <div>
                                <button
                                    onClick={triggerCelebration}
                                    className="w-full px-4 py-3 rounded-lg bg-amber-600/20 border border-amber-500/30 text-white hover:bg-amber-600/30 transition-all text-left"
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-lg">🎉</span>
                                        <span className="font-semibold text-sm">Celebration</span>
                                    </div>
                                    <p className="text-xs text-white/60">
                                        Center modal • Confetti • 8s duration
                                    </p>
                                </button>
                            </div>

                            {/* Info */}
                            <div className="mt-4 pt-4 border-t border-white/10">
                                <p className="text-xs text-white/50 leading-relaxed">
                                    <strong className="text-white/70">Note:</strong> Only one notification shows at a time.
                                    Others wait in queue.
                                </p>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-full px-4 py-2 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all text-sm"
                            >
                                Close Panel
                            </button>
                        </div>

                        {/* Dev Warning */}
                        <div className="bg-red-500/10 border-t border-red-500/20 p-3">
                            <p className="text-red-400 text-xs font-medium">
                                ⚠️ Remove in production
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
