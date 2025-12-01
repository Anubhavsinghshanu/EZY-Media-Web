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
            title: "Influencer Marketing",
            description: "End-to-end influencer collaborations engineered for maximum reach, brand alignment, and measurable conversions.",
            icon: <FaUsers className="w-8 h-8" />,
            accent: "from-purple-500 to-indigo-500",
            popup: {
                bullets: [
                    "400+ verified creators onboard",
                    "Industry-best 92% fulfilment accuracy",
                    "Niche-wise targeted campaign mapping",
                    "Real-time performance tracking",
                    "+120% avg engagement uplift"
                ],
                logo: "instagram",
                animation: "up"
            }
        },
        {
            title: "YouTube Shorts & Repost Campaigns",
            description: "Guaranteed virality via mass-scale repost infrastructure, 100% optimized for retention, engagement, and trending velocity.",
            icon: <FaYoutube className="w-8 h-8" />,
            accent: "from-red-500 to-orange-500",
            popup: {
                bullets: [
                    "12/12 videos crossed 20M+",
                    "3 videos hit 100M+",
                    "Premium repost network with 400 creators",
                    "Guaranteed trending velocity",
                    "Optimized retention strategy"
                ],
                logo: "youtube",
                animation: "right"
            }
        },
        {
            title: "Social Media Management",
            description: "Complete management: content calendars, growth strategy, engagement pipeline, analytics, and performance tracking.",
            icon: <FaChartLine className="w-8 h-8" />,
            accent: "from-blue-500 to-cyan-500",
            popup: {
                bullets: [
                    "Monthly content calendar & posting",
                    "Community engagement pipeline",
                    "Data-driven growth frameworks",
                    "Studio-quality visuals & graphics",
                    "Weekly analytics breakdown"
                ],
                logo: "instagram",
                animation: "left"
            }
        },
        {
            title: "Content Creation",
            description: "Visually powerful, trend-driven content crafted to outperform algorithms.",
            subServices: [
                "Reels & Shorts Production",
                "High-end Graphics",
                "Motion Visuals",
                "Trend-Engineered Video Concepts"
            ],
            icon: <FaVideo className="w-8 h-8" />,
            accent: "from-pink-500 to-rose-500",
            popup: {
                bullets: [
                    "Reels, Shorts, Motion Graphics",
                    "Trend-engineered video ideas",
                    "Fast production cycle",
                    "Algorithm-optimized edits",
                    "Premium color-grade + sound design"
                ],
                logo: "both",
                animation: "up"
            }
        },
        {
            title: "Brand Campaign Strategy",
            description: "Strategic multi-platform campaign architecture built to deliver measurable brand lift and customer impact.",
            icon: <FaChess className="w-8 h-8" />,
            accent: "from-emerald-500 to-teal-500",
            popup: {
                bullets: [
                    "Multi-platform scaling roadmap",
                    "Target audience behaviour mapping",
                    "Creative + distribution synergy",
                    "High-performance CTAs",
                    "Multi-variant testing system"
                ],
                logo: "instagram",
                animation: "right"
            }
        },
        {
            title: "PR & Branding",
            description: "Digital PR, brand storytelling, perception management, and identity design for long-term brand equity.",
            icon: <FaBullhorn className="w-8 h-8" />,
            accent: "from-amber-500 to-yellow-500",
            popup: {
                bullets: [
                    "Storytelling + brand language setup",
                    "Digital PR outreach & publications",
                    "Brand identity optimization",
                    "Market positioning framework",
                    "Reputation management"
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
                        className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-white"
                    >
                        OUR HIGH-PERFORMANCE
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 animate-gradient-x">
                            DIGITAL SERVICES
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-400 font-medium tracking-wide uppercase"
                    >
                        Engineered for Growth • Optimized for Scale • Designed for Results
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
                            <div className="relative z-10 flex-grow">
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed mb-6">
                                    {service.description}
                                </p>

                                {/* Sub-services for Content Creation */}
                                {service.subServices && (
                                    <ul className="space-y-2 mt-4">
                                        {service.subServices.map((sub, idx) => (
                                            <li key={idx} className="flex items-center text-sm text-gray-500">
                                                <span className={`w-1.5 h-1.5 rounded-full mr-2 bg-gradient-to-r ${service.accent}`} />
                                                {sub}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Bottom Decoration */}
                            <div className={`mt-6 h-1 w-12 rounded-full bg-gradient-to-r ${service.accent} opacity-50 group-hover:w-full transition-all duration-500`} />

                            {/* PREMIUM POPUP */}
                            <motion.div
                                variants={getPopupVariants(service.popup.animation)}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="absolute inset-4 z-20 rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-center"
                            >
                                <div className="space-y-3">
                                    {service.popup.bullets.map((bullet, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            variants={{
                                                hover: { opacity: 1, x: 0, transition: { delay: 0.1 + (idx * 0.05) } }
                                            }}
                                            className="flex items-start space-x-3"
                                        >
                                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gradient-to-r ${service.accent}`} />
                                            <span className="text-sm text-gray-200 font-medium leading-relaxed">{bullet}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Popup Logos */}
                                <div className="absolute bottom-4 right-4 flex space-x-2">
                                    {(service.popup.logo === 'instagram' || service.popup.logo === 'both') && (
                                        <motion.div
                                            variants={{
                                                hover: {
                                                    scale: [1, 1.2, 1],
                                                    filter: "drop-shadow(0 0 8px rgba(225, 48, 108, 0.5))",
                                                    transition: { duration: 0.8, repeat: Infinity, repeatDelay: 1 }
                                                }
                                            }}
                                        >
                                            <FaInstagram className="w-6 h-6 text-[#E1306C]" />
                                        </motion.div>
                                    )}
                                    {(service.popup.logo === 'youtube' || service.popup.logo === 'both') && (
                                        <motion.div
                                            variants={{
                                                hover: {
                                                    x: [-10, 0],
                                                    opacity: [0, 1],
                                                    transition: { duration: 0.3 }
                                                }
                                            }}
                                        >
                                            <FaYoutube className="w-6 h-6 text-[#FF0000]" />
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
