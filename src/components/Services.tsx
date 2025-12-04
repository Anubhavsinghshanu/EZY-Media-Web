'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import {
    FaYoutube,
    FaChartLine,
    FaInstagram,
    FaStar,
    FaCircleCheck
} from 'react-icons/fa6';

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [showProofPopup, setShowProofPopup] = useState(false);

    // Individual hover states for each stat box
    const [hoveredStatBox, setHoveredStatBox] = useState<string | null>(null);

    // Real-time proof data
    const proofData = {
        testimonials: [
            { name: "Arjun Mehta", role: "Music Artist", text: "300M views in 5 days. EZY Media is unmatched!", rating: 5 },
            { name: "Priya Sharma", role: "Fashion Influencer", text: "Doubled my followers in 2 weeks. Best decision ever.", rating: 5 },
            { name: "Rohan Kapoor", role: "Tech Reviewer", text: "Professional, fast, and results-driven. Highly recommend!", rating: 5 }
        ],
        chartData: {
            monthlyGrowth: [45, 67, 89, 120, 156, 198], // % growth
            platformDistribution: [
                { platform: 'Instagram', percentage: 45, color: '#E1306C' },
                { platform: 'YouTube', percentage: 35, color: '#FF0000' },
                { platform: 'Facebook', percentage: 20, color: '#1877F2' }
            ],
            campaignSuccess: 94 // % success rate
        }
    };

    // Individual stat box popup data
    const statBoxPopups = {
        growth: {
            title: "6-Month Growth Trajectory",
            bullets: [
                "📊 Delivered 2.8B+ Total Impressions",
                "🎯 Average CTR: 8.7% (Industry: 2.1%)",
                "💰 Conversion Rate: 12.4% Across Campaigns",
                "📱 Instagram: 1.6B | YouTube: 1.2B Impressions",
                "📈 Month-over-Month Growth: +112% Average"
            ]
        },
        creator: {
            title: "Creator's First Choice",
            bullets: [
                "🚀 450+ Monthly Campaign Requests",
                "⚡ 94% Client Retention Rate (2024)",
                "🎬 Average Engagement Rate: 18.6%",
                "📲 Instagram Reels: 22.3M | YT Shorts: 18.7M Avg Views",
                "🔥 Response Time: Under 2 Hours"
            ]
        },
        platform: {
            title: "Platform Mastery",
            bullets: [
                "📸 Instagram Dominance: 45% Share, 12.8M Avg Reach",
                "🎥 YouTube Shorts: 35% Share, 9.2M Avg Views",
                "👥 Facebook Viral: 20% Share, 5.1M Avg Impressions",
                "💎 Cross-Platform CTR: 9.2% Combined",
                "🏆 94% Campaign Success Rate (Industry: 67%)"
            ]
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative py-20 px-6 overflow-hidden"
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
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white leading-none cursor-pointer relative group"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                        DOMINATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-blue-500 transition-all duration-500">THE ALGORITHM</span>
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

                    {/* PROOF POPUP - Multi-Panel Data Visualization */}
                    {/* Updated: Individual hover popups for each stat box */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative mt-16 w-full max-w-[1200px] mx-auto bg-black/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                LIVE PROOF OF DOMINANCE
                            </h3>
                            <p className="text-sm text-gray-400 uppercase tracking-widest">Real Data • Real Results • Real Authority</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* LEFT: Growth Trend Chart */}
                            <div
                                className="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                                onMouseEnter={() => setHoveredStatBox('growth')}
                                onMouseLeave={() => setHoveredStatBox(null)}
                            >
                                <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <FaChartLine className="text-blue-400" />
                                    6-Month Growth Trajectory
                                </h4>
                                <div className="space-y-3">
                                    {proofData.chartData.monthlyGrowth.map((value, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(value / 200) * 100}%` }}
                                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                                            className="relative"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-gray-500 w-12">M{idx + 1}</span>
                                                <div className="flex-1 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg relative overflow-hidden">
                                                    <motion.div
                                                        className="absolute inset-0 bg-white/20"
                                                        animate={{ x: ['-100%', '100%'] }}
                                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                    />
                                                </div>
                                                <span className="text-sm font-bold text-white w-16">+{value}%</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <p className="text-xs text-gray-400">Average Monthly Growth: <span className="text-green-400 font-bold">+112%</span></p>
                                </div>

                                {/* Individual Popup for Growth */}
                                <AnimatePresence>
                                    {hoveredStatBox === 'growth' && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1.04,
                                                y: -20
                                            }}
                                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                            className="absolute -top-6 left-0 right-0 md:left-0 md:right-0 bg-[#0F0F0F]/88 backdrop-blur-xl rounded-xl p-5 border shadow-2xl z-50
                                                       md:static md:transform-none
                                                       max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:top-auto max-md:rounded-t-3xl max-md:rounded-b-none max-md:p-6"
                                            style={{
                                                background: 'rgba(15, 15, 15, 0.88)',
                                                backdropFilter: 'blur(12px)',
                                                borderImage: 'linear-gradient(135deg, #FF0080, #9D4EDD) 1',
                                                borderWidth: '1px',
                                                borderStyle: 'solid'
                                            }}
                                        >
                                            <h5 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 }}
                                                >
                                                    <FaInstagram className="text-pink-400 w-4 h-4" />
                                                </motion.div>
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.15 }}
                                                >
                                                    <FaYoutube className="text-red-500 w-4 h-4" />
                                                </motion.div>
                                                <span className="ml-1">{statBoxPopups.growth.title}</span>
                                            </h5>
                                            <div className="space-y-2">
                                                {statBoxPopups.growth.bullets.map((bullet, idx) => (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.1 + idx * 0.05 }}
                                                        className="text-xs text-gray-200 font-semibold leading-relaxed"
                                                    >
                                                        {bullet}
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* CENTER: Mobile Screen + Testimonials */}
                            <div className="space-y-4">
                                {/* Mobile Screen Mockup */}
                                <div
                                    className="relative bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-2xl p-6 border border-pink-500/20 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                                    onMouseEnter={() => setHoveredStatBox('creator')}
                                    onMouseLeave={() => setHoveredStatBox(null)}
                                >
                                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <FaInstagram className="text-pink-400" />
                                        Creator's First Choice
                                    </h4>
                                    <div className="bg-black rounded-3xl p-4 border-4 border-gray-800 shadow-xl">
                                        {/* Instagram DM Interface */}
                                        <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-3 space-y-3">
                                            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-500" />
                                                <div>
                                                    <p className="text-white text-xs font-bold">@creator_name</p>
                                                    <p className="text-gray-500 text-[10px]">Active now</p>
                                                </div>
                                            </div>

                                            {/* Messages */}
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[85%]"
                                            >
                                                <p className="text-white text-xs">Hey! I need promotion for my new track 🎵</p>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.5 }}
                                                className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 max-w-[85%]"
                                            >
                                                <p className="text-white text-xs">Can EZY Media help? Everyone says you're the best! 🔥</p>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.7 }}
                                                className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl rounded-tr-sm p-3 max-w-[85%] ml-auto"
                                            >
                                                <p className="text-white text-xs font-medium">Absolutely! Let's make it viral 🚀</p>
                                            </motion.div>
                                        </div>
                                    </div>
                                    <p className="text-center text-xs text-gray-400 mt-3">
                                        <span className="text-pink-400 font-bold">400+</span> creators reach out monthly
                                    </p>

                                    {/* Individual Popup for Creator */}
                                    <AnimatePresence>
                                        {hoveredStatBox === 'creator' && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1.04,
                                                    y: -20
                                                }}
                                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                                transition={{ duration: 0.3, ease: "easeOut" }}
                                                className="absolute -top-6 left-0 right-0 md:left-0 md:right-0 bg-[#0F0F0F]/88 backdrop-blur-xl rounded-xl p-5 border shadow-2xl z-50
                                                           md:static md:transform-none
                                                           max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:top-auto max-md:rounded-t-3xl max-md:rounded-b-none max-md:p-6"
                                                style={{
                                                    background: 'rgba(15, 15, 15, 0.88)',
                                                    backdropFilter: 'blur(12px)',
                                                    borderImage: 'linear-gradient(135deg, #FF0080, #9D4EDD) 1',
                                                    borderWidth: '1px',
                                                    borderStyle: 'solid'
                                                }}
                                            >
                                                <h5 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.1 }}
                                                    >
                                                        <FaInstagram className="text-pink-400 w-4 h-4" />
                                                    </motion.div>
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.15 }}
                                                    >
                                                        <FaYoutube className="text-red-500 w-4 h-4" />
                                                    </motion.div>
                                                    <span className="ml-1">{statBoxPopups.creator.title}</span>
                                                </h5>
                                                <div className="space-y-2">
                                                    {statBoxPopups.creator.bullets.map((bullet, idx) => (
                                                        <motion.div
                                                            key={idx}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.1 + idx * 0.05 }}
                                                            className="text-xs text-gray-200 font-semibold leading-relaxed"
                                                        >
                                                            {bullet}
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Quick Testimonial */}
                                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-4 border border-green-500/20">
                                    <div className="flex gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className="text-yellow-400 w-3 h-3" />
                                        ))}
                                    </div>
                                    <p className="text-white text-sm italic mb-2">"{proofData.testimonials[0].text}"</p>
                                    <p className="text-gray-400 text-xs">— {proofData.testimonials[0].name}, <span className="text-green-400">{proofData.testimonials[0].role}</span></p>
                                </div>
                            </div>

                            {/* RIGHT: Platform Distribution + Success Rate */}
                            <div className="space-y-4">
                                {/* Pie Chart */}
                                <div
                                    className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                                    onMouseEnter={() => setHoveredStatBox('platform')}
                                    onMouseLeave={() => setHoveredStatBox(null)}
                                >
                                    <h4 className="text-lg font-bold text-white mb-4">Platform Mastery</h4>
                                    <div className="relative w-40 h-40 mx-auto mb-4">
                                        {/* Simple Pie Chart Visualization */}
                                        <svg viewBox="0 0 100 100" className="transform -rotate-90">
                                            {proofData.chartData.platformDistribution.map((platform, idx) => {
                                                const prevPercentages = proofData.chartData.platformDistribution
                                                    .slice(0, idx)
                                                    .reduce((sum, p) => sum + p.percentage, 0);
                                                const circumference = 2 * Math.PI * 40;
                                                const offset = (prevPercentages / 100) * circumference;
                                                const dashArray = `${(platform.percentage / 100) * circumference} ${circumference}`;

                                                return (
                                                    <motion.circle
                                                        key={platform.platform}
                                                        cx="50"
                                                        cy="50"
                                                        r="40"
                                                        fill="none"
                                                        stroke={platform.color}
                                                        strokeWidth="20"
                                                        strokeDasharray={dashArray}
                                                        strokeDashoffset={-offset}
                                                        initial={{ strokeDasharray: `0 ${circumference}` }}
                                                        animate={{ strokeDasharray: dashArray }}
                                                        transition={{ duration: 1, delay: idx * 0.2 }}
                                                        style={{ filter: `drop-shadow(0 0 8px ${platform.color}80)` }}
                                                    />
                                                );
                                            })}
                                        </svg>
                                    </div>
                                    <div className="space-y-2">
                                        {proofData.chartData.platformDistribution.map((platform) => (
                                            <div key={platform.platform} className="flex items-center justify-between text-xs">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }} />
                                                    <span className="text-gray-300">{platform.platform}</span>
                                                </div>
                                                <span className="text-white font-bold">{platform.percentage}%</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Individual Popup for Platform */}
                                    <AnimatePresence>
                                        {hoveredStatBox === 'platform' && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1.04,
                                                    y: -20
                                                }}
                                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                                transition={{ duration: 0.3, ease: "easeOut" }}
                                                className="absolute -top-6 left-0 right-0 md:left-0 md:right-0 bg-[#0F0F0F]/88 backdrop-blur-xl rounded-xl p-5 border shadow-2xl z-50
                                                           md:static md:transform-none
                                                           max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:top-auto max-md:rounded-t-3xl max-md:rounded-b-none max-md:p-6"
                                                style={{
                                                    background: 'rgba(15, 15, 15, 0.88)',
                                                    backdropFilter: 'blur(12px)',
                                                    borderImage: 'linear-gradient(135deg, #FF0080, #9D4EDD) 1',
                                                    borderWidth: '1px',
                                                    borderStyle: 'solid'
                                                }}
                                            >
                                                <h5 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.1 }}
                                                    >
                                                        <FaInstagram className="text-pink-400 w-4 h-4" />
                                                    </motion.div>
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.15 }}
                                                    >
                                                        <FaYoutube className="text-red-500 w-4 h-4" />
                                                    </motion.div>
                                                    <span className="ml-1">{statBoxPopups.platform.title}</span>
                                                </h5>
                                                <div className="space-y-2">
                                                    {statBoxPopups.platform.bullets.map((bullet, idx) => (
                                                        <motion.div
                                                            key={idx}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.1 + idx * 0.05 }}
                                                            className="text-xs text-gray-200 font-semibold leading-relaxed"
                                                        >
                                                            {bullet}
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Success Rate */}
                                <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-2xl p-6 border border-green-500/20">
                                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <FaCircleCheck className="text-green-400" />
                                        Campaign Success
                                    </h4>
                                    <div className="relative">
                                        <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 text-center mb-2">
                                            {proofData.chartData.campaignSuccess}%
                                        </div>
                                        <p className="text-center text-xs text-gray-400">Success Rate (2024)</p>
                                        <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-green-400 to-emerald-400"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${proofData.chartData.campaignSuccess}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Badge */}
                        <div className="mt-6 pt-6 border-t border-white/10 text-center">
                            <p className="text-sm text-gray-400">
                                <span className="text-white font-bold">Real-time data</span> • Updated every 24 hours • <span className="text-green-400">100% Authentic</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
