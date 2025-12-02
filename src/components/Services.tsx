'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import {
    FaUsers,
    FaYoutube,
    FaChartLine,
    FaVideo,
    FaChess,
    FaBullhorn,
    FaInstagram,
    FaStar,
    FaCircleCheck
} from 'react-icons/fa6';

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [showProofPopup, setShowProofPopup] = useState(false);

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
                animation: "up",
                visualType: "barChart", // Bar chart showing creator categories
                chartData: {
                    categories: [
                        { name: "Fashion", count: 120, color: "#FF0080" },
                        { name: "Music", count: 95, color: "#FF6600" },
                        { name: "Tech", count: 85, color: "#9D4EDD" },
                        { name: "Lifestyle", count: 100, color: "#06FFA5" }
                    ]
                }
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
                animation: "right",
                visualType: "trendLine", // Trend line showing viral growth
                chartData: {
                    viewsOverTime: [
                        { day: "Day 1", views: 2.5 },
                        { day: "Day 2", views: 8.2 },
                        { day: "Day 3", views: 25.6 },
                        { day: "Day 4", views: 67.3 },
                        { day: "Day 5", views: 120.5 }
                    ]
                }
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
                animation: "left",
                visualType: "pieChart", // Pie chart showing service distribution
                chartData: {
                    services: [
                        { name: "Content", percentage: 35, color: "#00F260" },
                        { name: "Engagement", percentage: 30, color: "#0575E6" },
                        { name: "Analytics", percentage: 20, color: "#06FFA5" },
                        { name: "Strategy", percentage: 15, color: "#00D9FF" }
                    ]
                }
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
                animation: "up",
                visualType: "comparison", // Before/After comparison
                chartData: {
                    metrics: [
                        { label: "Avg Watch Time", before: "3.2s", after: "12.8s", improvement: "+300%" },
                        { label: "Retention Rate", before: "28%", after: "74%", improvement: "+164%" },
                        { label: "Shares", before: "120", after: "2.4K", improvement: "+1900%" }
                    ]
                }
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
                animation: "right",
                visualType: "funnel", // Conversion funnel
                chartData: {
                    stages: [
                        { name: "Impressions", value: 100, color: "#00c6ff" },
                        { name: "Engagement", value: 68, color: "#0095ff" },
                        { name: "Clicks", value: 42, color: "#0072ff" },
                        { name: "Conversions", value: 28, color: "#0050cc" }
                    ]
                }
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
                animation: "left",
                visualType: "instaDM", // Instagram DM mockup
                chartData: {
                    messages: [
                        { from: "creator", text: "Need help with brand positioning 🎯", time: "2m ago" },
                        { from: "creator", text: "Heard EZY Media is the best!", time: "1m ago" },
                        { from: "ezy", text: "Let's build your legacy 👑", time: "Just now" }
                    ]
                }
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
        }
    };

    // Chart Rendering Helper
    const renderChartVisualization = (service: typeof services[0]) => {
        const { visualType, chartData } = service.popup;

        switch (visualType) {
            case 'barChart':
                return (
                    <div className="space-y-3">
                        <h5 className="text-sm font-bold text-white mb-3">Creator Network Distribution</h5>
                        {chartData.categories.map((cat: any, idx: number) => (
                            <motion.div
                                key={cat.name}
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs text-gray-400 w-20">{cat.name}</span>
                                    <div className="flex-1 h-6 bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: cat.color }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(cat.count / 120) * 100}%` }}
                                            transition={{ duration: 0.8, delay: idx * 0.15 }}
                                        />
                                    </div>
                                    <span className="text-xs font-bold text-white w-8">{cat.count}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                );

            case 'trendLine':
                return (
                    <div>
                        <h5 className="text-sm font-bold text-white mb-3">Viral Growth Trajectory</h5>
                        <div className="relative h-32">
                            <svg className="w-full h-full" viewBox="0 0 200 80">
                                {/* Grid lines */}
                                {[0, 25, 50, 75].map((y) => (
                                    <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#333" strokeWidth="0.5" />
                                ))}

                                {/* Trend line */}
                                <motion.polyline
                                    points={chartData.viewsOverTime.map((point: any, idx: number) =>
                                        `${idx * 50},${80 - (point.views / 120.5) * 70}`
                                    ).join(' ')}
                                    fill="none"
                                    stroke="url(#trendGradient)"
                                    strokeWidth="3"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />

                                {/* Data points */}
                                {chartData.viewsOverTime.map((point: any, idx: number) => (
                                    <motion.circle
                                        key={idx}
                                        cx={idx * 50}
                                        cy={80 - (point.views / 120.5) * 70}
                                        r="4"
                                        fill="#FF0000"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.3, delay: idx * 0.2 }}
                                    />
                                ))}

                                <defs>
                                    <linearGradient id="trendGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#FF0000" />
                                        <stop offset="100%" stopColor="#FF4D4D" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] text-gray-500">
                            {chartData.viewsOverTime.map((point: any) => (
                                <span key={point.day}>{point.day}</span>
                            ))}
                        </div>
                        <p className="text-center text-xs text-green-400 font-bold mt-2">+120M views in 5 days</p>
                    </div>
                );

            case 'pieChart':
                return (
                    <div>
                        <h5 className="text-sm font-bold text-white mb-3">Service Distribution</h5>
                        <div className="relative w-32 h-32 mx-auto mb-4">
                            <svg viewBox="0 0 100 100" className="transform -rotate-90">
                                {chartData.services.map((service: any, idx: number) => {
                                    const prevPercentages = chartData.services
                                        .slice(0, idx)
                                        .reduce((sum: number, s: any) => sum + s.percentage, 0);
                                    const circumference = 2 * Math.PI * 40;
                                    const offset = (prevPercentages / 100) * circumference;
                                    const dashArray = `${(service.percentage / 100) * circumference} ${circumference}`;

                                    return (
                                        <motion.circle
                                            key={service.name}
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            fill="none"
                                            stroke={service.color}
                                            strokeWidth="20"
                                            strokeDasharray={dashArray}
                                            strokeDashoffset={-offset}
                                            initial={{ strokeDasharray: `0 ${circumference}` }}
                                            animate={{ strokeDasharray: dashArray }}
                                            transition={{ duration: 1, delay: idx * 0.2 }}
                                        />
                                    );
                                })}
                            </svg>
                        </div>
                        <div className="space-y-1">
                            {chartData.services.map((service: any) => (
                                <div key={service.name} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: service.color }} />
                                        <span className="text-gray-300">{service.name}</span>
                                    </div>
                                    <span className="text-white font-bold">{service.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'comparison':
                return (
                    <div>
                        <h5 className="text-sm font-bold text-white mb-3">Before vs After EZY Media</h5>
                        <div className="space-y-3">
                            {chartData.metrics.map((metric: any, idx: number) => (
                                <motion.div
                                    key={metric.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.15 }}
                                    className="bg-black/30 rounded-lg p-3"
                                >
                                    <p className="text-xs text-gray-400 mb-2">{metric.label}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="text-center">
                                            <p className="text-xs text-red-400">Before</p>
                                            <p className="text-sm font-bold text-white">{metric.before}</p>
                                        </div>
                                        <div className="text-green-400 text-xs font-bold">{metric.improvement}</div>
                                        <div className="text-center">
                                            <p className="text-xs text-green-400">After</p>
                                            <p className="text-sm font-bold text-white">{metric.after}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );

            case 'funnel':
                return (
                    <div>
                        <h5 className="text-sm font-bold text-white mb-3">Conversion Funnel</h5>
                        <div className="space-y-2">
                            {chartData.stages.map((stage: any, idx: number) => (
                                <motion.div
                                    key={stage.name}
                                    initial={{ width: 0 }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                                    className="relative"
                                >
                                    <div
                                        className="h-12 rounded-lg flex items-center justify-between px-4 relative overflow-hidden"
                                        style={{
                                            width: `${stage.value}%`,
                                            backgroundColor: stage.color,
                                            marginLeft: `${(100 - stage.value) / 2}%`
                                        }}
                                    >
                                        <span className="text-white text-xs font-bold relative z-10">{stage.name}</span>
                                        <span className="text-white text-xs font-bold relative z-10">{stage.value}%</span>
                                        <motion.div
                                            className="absolute inset-0 bg-white/10"
                                            animate={{ x: ['-100%', '100%'] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <p className="text-center text-xs text-green-400 font-bold mt-3">28% conversion rate</p>
                    </div>
                );

            case 'instaDM':
                return (
                    <div>
                        <h5 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                            <FaInstagram className="text-pink-400" />
                            Live Creator Inbox
                        </h5>
                        <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-3 space-y-2">
                            {chartData.messages.map((msg: any, idx: number) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: msg.from === 'creator' ? -20 : 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.3 }}
                                    className={`${msg.from === 'creator'
                                        ? 'bg-gray-800 rounded-2xl rounded-tl-sm'
                                        : 'bg-gradient-to-r from-pink-500 to-orange-500 rounded-2xl rounded-tr-sm ml-auto'
                                        } p-3 max-w-[85%]`}
                                >
                                    <p className="text-white text-xs">{msg.text}</p>
                                    <p className="text-gray-400 text-[10px] mt-1">{msg.time}</p>
                                </motion.div>
                            ))}
                        </div>
                        <p className="text-center text-xs text-pink-400 font-bold mt-2">400+ monthly inquiries</p>
                    </div>
                );

            default:
                return null;
        }
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
                <div
                    className="text-center mb-24 relative"
                    onMouseEnter={() => setShowProofPopup(true)}
                    onMouseLeave={() => setShowProofPopup(false)}
                >
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
                    <AnimatePresence>
                        {showProofPopup && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="absolute top-full mt-8 left-1/2 -translate-x-1/2 w-[95vw] max-w-[1200px] bg-black/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl z-50"
                                style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)' }}
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
                                    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20">
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
                                    </div>

                                    {/* CENTER: Mobile Screen + Testimonials */}
                                    <div className="space-y-4">
                                        {/* Mobile Screen Mockup */}
                                        <div className="bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-2xl p-6 border border-pink-500/20">
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
                                        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
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
                        )}
                    </AnimatePresence>
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

                            {/* CHART VISUALIZATION POPUP */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                whileHover={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 bg-black/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 opacity-0 group-hover:opacity-100 pointer-events-none z-30"
                                style={{ boxShadow: `0 20px 50px -12px rgba(0, 0, 0, 0.8)` }}
                            >
                                <div className="h-full flex flex-col justify-center">
                                    {renderChartVisualization(service)}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
