'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import {
    FaUsers,
    FaYoutube,
    FaChartLine,
    FaVideo,
    FaChess,
    FaBullhorn,
    FaInstagram
} from 'react-icons/fa6';

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const services = [
        {
            title: "Influencer Nexus",
            description: "We don't just find creators; we deploy armies. Our network activates 400+ verified influencers instantly to flood the feed.",
            icon: <FaUsers className="w-8 h-8" />,
            accent: "from-[#FF0080] via-[#FF6600] to-[#FF0080]", // Instagram Vibrant
            popup: {
                bullets: [
                    "⚡ 400+ Active Creator Network",
                    "🎯 92% Audience Match Rate",
                    "🚀 120% Engagement Uplift",
                    "🔥 15M+ Instant Reach Capacity",
                    "💎 Zero-Friction Campaign Mgmt"
                ],
                logo: "instagram",
                animation: "up"
            }
        },
        {
            title: "Viral Engineering",
            description: "YouTube Shorts & Reels domination. We use retention-optimized editing and mass-repost strategies to force algorithms to pay attention.",
            icon: <FaYoutube className="w-8 h-8" />,
            accent: "from-[#FF0000] via-[#FF4D4D] to-[#990000]", // YouTube Red
            popup: {
                bullets: [
                    "📈 12/12 Videos Hit 20M+ Views",
                    "🏆 3 Videos Crossed 100M+ Mark",
                    "⚡ 70%+ Average Retention Rate",
                    "🌊 Mass-Scale Repost Infrastructure",
                    "🚀 Guaranteed Trending Velocity"
                ],
                logo: "youtube",
                animation: "right"
            }
        },
        {
            title: "Growth Ecosystem",
            description: "Complete social media takeover. From content calendars to community pipelines, we build systems that compound growth daily.",
            icon: <FaChartLine className="w-8 h-8" />,
            accent: "from-[#00F260] via-[#0575E6] to-[#00F260]", // Growth Green/Blue
            popup: {
                bullets: [
                    "📅 365-Day Strategic Calendar",
                    "💬 24/7 Community Engagement",
                    "📊 Real-Time Growth Analytics",
                    "🎨 Studio-Grade Visual Identity",
                    "🔄 Automated Lead Pipelines"
                ],
                logo: "instagram",
                animation: "left"
            }
        },
        {
            title: "Visual Alchemy",
            description: "Content that stops the scroll. High-octane motion graphics, 3D visuals, and trend-jacking edits designed for maximum retention.",
            subServices: [
                "Hyper-Visual Reels",
                "3D Motion Graphics",
                "Trend-Jacking Edits",
                "Sonic Branding"
            ],
            icon: <FaVideo className="w-8 h-8" />,
            accent: "from-[#833ab4] via-[#fd1d1d] to-[#fcb045]", // Creative Sunset
            popup: {
                bullets: [
                    "✨ Cinema-Grade Color Grading",
                    "🎵 Neuro-Audio Sound Design",
                    "⚡ Sub-Second Cut Pacing",
                    "🔥 4K/60fps Optimized Output",
                    "🧠 Psychology-Based Hooks"
                ],
                logo: "both",
                animation: "up"
            }
        },
        {
            title: "Strategic Warfare",
            description: "Campaign architecture that wins. We map user psychology to platform algorithms to create multi-touchpoint brand dominance.",
            icon: <FaChess className="w-8 h-8" />,
            accent: "from-[#00c6ff] via-[#0072ff] to-[#00c6ff]", // Strategy Blue
            popup: {
                bullets: [
                    "🗺️ Multi-Platform Roadmap",
                    "🎯 Psychographic Audience Targeting",
                    "🔄 A/B/C Variant Testing",
                    "💰 High-ROAS Ad Frameworks",
                    "🔗 Cross-Channel Synergy"
                ],
                logo: "instagram",
                animation: "right"
            }
        },
        {
            title: "Brand Legacy",
            description: "Perception is reality. We craft high-authority digital PR and brand narratives that position you as the undisputed market leader.",
            icon: <FaBullhorn className="w-8 h-8" />,
            accent: "from-[#F2994A] via-[#F2C94C] to-[#F2994A]", // Gold/Luxury
            popup: {
                bullets: [
                    "👑 Authority Positioning",
                    "📰 Tier-1 Digital PR Placements",
                    "🗣️ Crisis & Reputation Mgmt",
                    "💎 Premium Brand Voice Setup",
                    "🌟 Long-Term Equity Building"
                ],
                logo: "none",
                animation: "left"
            }
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const cardVariants = {
        hidden: (i: number) => ({
            opacity: 0,
            x: i % 2 === 0 ? -50 : 50,
            y: 20
        }),
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 50,
                damping: 20
            }
        },
        hover: {
            y: -10,
            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
            transition: { duration: 0.3 }
        }
    };

    const getPopupVariants = (direction: string) => {
        const hiddenState = { opacity: 0, scale: 0.92, pointerEvents: "none" as const };
        const visibleState = { opacity: 1, scale: 1, x: 0, y: 0, pointerEvents: "auto" as const };

        const directionOffset = {
            up: { y: 20 },
            right: { x: -20 },
            left: { x: 20 },
            none: {}
        };

        const offset = directionOffset[direction as keyof typeof directionOffset] || {};
        const hiddenWithOffset = { ...hiddenState, ...offset };

        return {
            hidden: hiddenWithOffset,
            visible: hiddenWithOffset, // Stays hidden when parent is visible (default state)
            hover: visibleState // Only shows on hover
        };
    };

    return (
        <section
            ref={sectionRef}
            className="relative py-32 px-6 overflow-hidden bg-[#050505]"
        >
            {/* Background Ambient Glows */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] opacity-40" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] opacity-30" />
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-24 relative">
                    {/* Glow behind heading */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-[60px] -z-10" />

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white leading-none"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                        DOMINATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">THE ALGORITHM</span>
                        <br />
                        <span className="text-4xl md:text-6xl text-gray-500 font-bold tracking-widest opacity-50">WITH REAL-TIME PRECISION</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-300 font-medium tracking-wide max-w-3xl mx-auto"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                        We don't just post. We engineer <span className="text-neon-blue font-bold">viral velocity</span> using live data, creator networks, and algorithmic mastery.
                    </motion.p>
                </div>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
                >
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={cardVariants}
                            whileHover="hover"
                            initial="hidden"
                            animate={isInView ? "visible" : "hidden"}
                            className="group relative flex flex-col h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]"
                        >
                            {/* Hover Glow Effect */}
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${service.accent}`} />

                            {/* Neon Perimeter Glow */}
                            <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-white/20 transition-colors duration-300 pointer-events-none" />

                            {/* Icon */}
                            <div className={`relative mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${service.accent} p-[1px] group-hover:scale-110 transition-transform duration-300`}>
                                <div className="w-full h-full bg-black/90 rounded-2xl flex items-center justify-center text-white">
                                    {service.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 flex-grow flex flex-col">
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed mb-6 text-sm">
                                    {service.description}
                                </p>

                                {/* Visible Data Points */}
                                <div className="mt-auto space-y-3 bg-black/20 rounded-xl p-4 border border-white/5">
                                    {service.popup.bullets.map((bullet, idx) => (
                                        <div key={idx} className="flex items-start space-x-3">
                                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gradient-to-r ${service.accent}`} />
                                            <span className="text-sm text-gray-300 font-medium leading-relaxed">{bullet}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Sub-services for Content Creation (if any) */}
                                {service.subServices && (
                                    <ul className="space-y-2 mt-4 pt-4 border-t border-white/10">
                                        {service.subServices.map((sub, idx) => (
                                            <li key={idx} className="flex items-center text-xs text-gray-500 uppercase tracking-wider font-semibold">
                                                <span className={`w-1 h-1 rounded-full mr-2 bg-gradient-to-r ${service.accent}`} />
                                                {sub}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Bottom Decoration */}
                            <div className={`mt-6 h-1 w-12 rounded-full bg-gradient-to-r ${service.accent} opacity-50 group-hover:w-full transition-all duration-500`} />

                            {/* Logos (Visible) */}
                            <div className="absolute top-8 right-8 flex space-x-2 opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                                {(service.popup.logo === 'instagram' || service.popup.logo === 'both') && (
                                    <FaInstagram className="w-5 h-5 text-[#E1306C]" />
                                )}
                                {(service.popup.logo === 'youtube' || service.popup.logo === 'both') && (
                                    <FaYoutube className="w-5 h-5 text-[#FF0000]" />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
