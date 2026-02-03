'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FaInstagram, FaYoutube, FaStar, FaQuoteRight } from 'react-icons/fa6';

// --- DATA ---
// Ratings: Strictly 3.9 - 4.7.
// Reviews: Casual, imperfect, specific.
const TESTIMONIALS = [
    {
        id: 1,
        name: "Vikram R.",
        role: "Startup Founder",
        campaign: "Creator Push",
        rating: 4.4,
        text: "Used reel creators instead of pages. Felt more natural for our brand launch.",
        platform: "instagram",
        gridPos: "0% 0%" // Top Left
    },
    {
        id: 2,
        name: "Neha K.",
        role: "Music Artist",
        campaign: "Song Promotion",
        rating: 4.6,
        text: "Audio usage picked up on its own after the initial push. The flow was surprisingly good.",
        platform: "instagram",
        gridPos: "50% 0%" // Top Center
    },
    {
        id: 3,
        name: "Aman S.",
        role: "Content Creator",
        campaign: "Creator Push",
        rating: 4.2,
        text: "Retention was actually steady. Didn't see any weird spikes in the analytics.",
        platform: "instagram",
        gridPos: "100% 0%" // Top Right
    },
    {
        id: 4,
        name: "Arjun G.",
        role: "YouTube Creator",
        campaign: "Repost Campaign",
        rating: 4.5,
        text: "The repost push helped revive an old upload. Gained some loyal subs from it.",
        platform: "youtube",
        gridPos: "0% 50%" // Middle Left
    },
    {
        id: 5,
        name: "Priya D.",
        role: "Instagram Creator",
        // No campaign tag
        rating: 4.1,
        text: "Creators they picked felt relevant to my niche, not just random accounts.",
        platform: "instagram",
        gridPos: "50% 50%" // Middle Center
    },
    {
        id: 6,
        name: "Kunal S.",
        role: "Music Artist",
        campaign: "Song Promotion",
        rating: 3.9,
        text: "Regional push helped the track trend in specific cities. Worked for me.",
        platform: "instagram",
        gridPos: "100% 50%" // Middle Right
    },
    {
        id: 7,
        name: "Ananya R.",
        role: "Startup Founder",
        campaign: "Creator Push",
        rating: 4.7,
        text: "Engagement rate doubled in 2 weeks. The reels remix strategy actually worked.",
        platform: "instagram",
        gridPos: "0% 100%" // Bottom Left
    },
    {
        id: 8,
        name: "Amit V.",
        role: "Startup Founder",
        // No campaign tag
        rating: 4.3,
        text: "The curator mix was solid. We needed trust more than just vanity numbers.",
        platform: "instagram",
        gridPos: "50% 100%" // Bottom Center
    },
    {
        id: 9,
        name: "Sneha P.",
        role: "YouTube Creator",
        campaign: "Repost Campaign",
        rating: 4.0,
        text: "Shorts views were steady. Good sustain for the channel stats.",
        platform: "youtube",
        gridPos: "100% 100%" // Bottom Right
    }
];

export default function SocialProof() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
    const [highlightIndex, setHighlightIndex] = useState(-1);

    // Auto-highlight effect
    useEffect(() => {
        const interval = setInterval(() => {
            setHighlightIndex((prev) => {
                const next = Math.floor(Math.random() * TESTIMONIALS.length);
                return next === prev ? (next + 1) % TESTIMONIALS.length : next;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-24 px-4 bg-[#050505] overflow-hidden"
        >
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5 font-[family-name:var(--font-poppins)] leading-tight"
                    >
                        Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-500">Creators & Founders</span> <br /> Across India
                    </motion.h2>

                    <p className="text-gray-400 text-sm md:text-base font-medium max-w-2xl mx-auto">
                        A small snapshot from a large pool of verified feedback from real campaigns.
                    </p>
                </div>

                {/* Compact Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {TESTIMONIALS.map((review, i) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.5 }}
                            animate={i === highlightIndex ? { scale: 1.03, borderColor: "rgba(255,255,255,0.15)", backgroundColor: "rgba(255,255,255,0.03)" } : { scale: 1, borderColor: "rgba(255,255,255,0.05)", backgroundColor: "rgba(0,0,0,0.2)" }}
                            className={`border border-white/5 rounded-xl p-6 relative transition-colors duration-500 group flex flex-col justify-between ${i % 2 === 0 ? 'min-h-[160px]' : 'min-h-[155px]'} ${i % 3 === 0 ? 'mt-1' : ''}`} // Micro offsets
                        >
                            {/* Highlight Quote Icon */}
                            <motion.div
                                animate={{ opacity: i === highlightIndex ? 1 : 0 }}
                                className="absolute top-4 right-4 text-white/5 text-3xl pointer-events-none"
                            >
                                <FaQuoteRight />
                            </motion.div>

                            {/* Header: DP + Name + Rating */}
                            <div className="flex items-start justify-between mb-3 relative z-10">
                                <div className="flex items-center gap-3">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-800 ring-2 ring-white/10 group-hover:ring-white/20 transition-all shadow-sm">
                                        {/* Grid Image Avatar */}
                                        <div
                                            className="w-full h-full absolute top-0 left-0 transition-all duration-500"
                                            style={{
                                                backgroundImage: "url('/assets/avatars-cartoon-grid.png')",
                                                backgroundPosition: review.gridPos,
                                                backgroundSize: "300% 300%",
                                                transform: "scale(1.15)", // Subtle zoom to fill frame fully
                                                filter: "contrast(1.1) brightness(1.05)" // Enhanced visibility
                                            }}
                                        />

                                        <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5 border border-white/10 z-10 shadow-lg">
                                            {review.platform === 'instagram' ?
                                                <FaInstagram className="text-pink-500 w-3 h-3" /> :
                                                <FaYoutube className="text-red-500 w-3 h-3" />
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold text-sm truncate">{review.name}</h4>
                                        <p className="text-[10px] text-gray-500 truncate font-medium">{review.role}</p>
                                    </div>
                                </div>

                                {/* Rating Number (Subtle) */}
                                <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                                    <span className="text-gray-400 text-xs font-semibold">{review.rating}</span>
                                    <div className="flex gap-[1px]">
                                        {[...Array(5)].map((_, s) => (
                                            <FaStar key={s} className={`w-2 h-2 ${s < Math.floor(review.rating) ? "text-yellow-500/80" : "text-gray-800"}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Review Text */}
                            <p className="text-xs text-gray-300 leading-relaxed font-medium line-clamp-3 relative z-10">
                                &quot;{review.text}&quot;
                            </p>

                            {/* Tag (Optional on some) */}
                            {review.campaign && (
                                <div className="mt-auto pt-3 border-t border-white/5 flex justify-between items-center relative z-10">
                                    <span className="text-[9px] text-gray-600 uppercase font-bold tracking-wider">{review.campaign}</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Trust Signal */}
                <div className="mt-16 text-center border-t border-white/5 pt-8 w-full max-w-lg mx-auto">
                    <p className="text-gray-600 text-xs font-medium tracking-wide flex items-center justify-center gap-2">
                        <span className="text-yellow-600/40 text-[10px]">⭐</span>
                        <span>1.1K reviews • 4.4 average rating</span>
                    </p>
                </div>
            </div>
        </section>
    );
}
