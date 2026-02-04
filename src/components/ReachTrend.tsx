"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMusic, FaVideo, FaStar, FaChartLine } from "react-icons/fa";

// Campaign Data Types
type Campaign = {
    id: string;
    name: string;
    reach: string;
    date: string;
    type: "music" | "video" | "star" | "chart";
    x: number;
    y: number;
    platform: "instagram" | "youtube" | "facebook";
};

const ReachTrend = () => {
    const [mounted, setMounted] = useState(false);
    const [hoveredCampaign, setHoveredCampaign] = useState<Campaign | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [particles, setParticles] = useState<Array<{ id: number; left: string; top: string; duration: number }>>([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        // Generate particles only once on mount to avoid "impure" render issues
        const newParticles = [...Array(15)].map((_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            duration: 5 + Math.random() * 5,
        }));
        setParticles(newParticles);
    }, []);

    // SVG Paths
    const instagramPath = "M0 450 C 200 440, 300 400, 400 350 C 450 200, 500 150, 600 100 C 800 50, 900 20, 1000 10";
    const youtubePath = "M0 400 C 150 380, 250 350, 350 300 C 400 200, 450 280, 550 220 C 650 180, 750 200, 850 150 C 950 100, 980 80, 1000 60";
    const facebookPath = "M0 420 C 200 400, 400 350, 600 280 C 800 200, 900 150, 1000 120";

    // "Joined EZY MEDIA" X-coordinate
    const joinedX = 350;

    // Campaign Points (Approximated on the curves)
    const campaigns: Campaign[] = [
        // Instagram
        { id: "i1", name: "Song Campaign", reach: "12M+", date: "Feb 2021", type: "music", x: 150, y: 440, platform: "instagram" },
        { id: "i2", name: "Reels Viral Push", reach: "45M+", date: "Aug 2022", type: "video", x: 500, y: 150, platform: "instagram" },
        { id: "i3", name: "Influencer Burst", reach: "89M+", date: "Dec 2023", type: "star", x: 800, y: 50, platform: "instagram" },

        // YouTube
        { id: "y1", name: "Logo Drop", reach: "5M+", date: "Mar 2021", type: "chart", x: 200, y: 360, platform: "youtube" },
        { id: "y2", name: "Shorts Campaign", reach: "28M+", date: "Jul 2022", type: "video", x: 550, y: 220, platform: "youtube" },
        { id: "y3", name: "Viral Boost", reach: "60M+", date: "Nov 2024", type: "star", x: 900, y: 120, platform: "youtube" },

        // Facebook
        { id: "f1", name: "Community Ad", reach: "8M+", date: "Jun 2021", type: "chart", x: 250, y: 390, platform: "facebook" },
        { id: "f2", name: "Group Surge", reach: "30M+", date: "Sep 2023", type: "star", x: 600, y: 280, platform: "facebook" },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case "music": return <FaMusic />;
            case "video": return <FaVideo />;
            case "star": return <FaStar />;
            default: return <FaChartLine />;
        }
    };

    if (!mounted) return null;

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        style={{
                            left: p.left,
                            top: p.top,
                        }}
                        animate={{
                            y: [0, -100],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Explosive <span className="text-neon-purple">Growth</span>
                    </h2>
                    <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
                        Witness how our creator network has scaled dramatically across all platforms year after year.
                    </p>
                </div>

                {/* Chart Container */}
                <div className="relative w-full max-w-6xl mx-auto glass-card rounded-3xl p-4 md:p-8 border border-white/10 bg-black/40 backdrop-blur-xl">

                    {/* Chart Header / Legend */}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                        <div className="flex items-center gap-2 text-[#00f3ff]">
                            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#00f3ff] shadow-[0_0_10px_#00f3ff]" />
                            Instagram Growth
                        </div>
                        <div className="flex items-center gap-2 text-[#FF0000]">
                            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#FF0000] shadow-[0_0_10px_#FF0000]" />
                            YouTube Growth
                        </div>
                        <div className="flex items-center gap-2 text-[#1877F2]">
                            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#1877F2] shadow-[0_0_10px_#1877F2]" />
                            Facebook Growth
                        </div>
                    </div>

                    {/* Dashboard Grid */}
                    <div className="absolute inset-x-8 md:inset-x-12 inset-y-20 flex flex-col justify-between pointer-events-none opacity-10">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-full h-px bg-white" />
                        ))}
                    </div>

                    {/* Y-Axis Label */}
                    <div className="absolute -left-3 md:-left-8 top-1/2 -rotate-90 text-[8px] md:text-xs text-gray-500 font-mono tracking-widest whitespace-nowrap hidden md:block">
                        Creator Reach / Engagement / Influence Score
                    </div>

                    {/* Y-Axis Values */}
                    <div className="absolute left-2 md:left-4 top-20 bottom-20 flex flex-col justify-between text-[8px] md:text-[10px] text-gray-500 font-mono">
                        {["1B", "750M", "500M", "250M", "0"].map((val, i) => (
                            <motion.span
                                key={val}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                {val}
                            </motion.span>
                        ))}
                    </div>

                    {/* Chart Area */}
                    <div className="relative h-[300px] md:h-[400px] w-full ml-6 md:ml-8 mr-2 md:mr-4" ref={containerRef}>
                        <svg viewBox="0 0 1000 500" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                            <defs>
                                <filter id="glow-aqua" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                                <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                                <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            {/* "Joined EZY MEDIA" Vertical Line */}
                            <motion.line
                                x1={joinedX} y1="500" x2={joinedX} y2="0"
                                stroke="white" strokeWidth="1" strokeDasharray="5,5" strokeOpacity="0.3"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                            <foreignObject x={joinedX - 60} y="460" width="120" height="40">
                                <div className="text-center">
                                    <div className="text-[8px] md:text-[10px] text-white font-bold bg-black/50 px-2 py-1 rounded border border-white/20 backdrop-blur-sm inline-block whitespace-nowrap">
                                        Joined EZY MEDIA
                                    </div>
                                </div>
                            </foreignObject>

                            {/* Intersection Markers */}
                            {[
                                { y: 375, color: "#00f3ff" }, // Approx intersection on Insta
                                { y: 300, color: "#FF0000" }, // Approx intersection on YT
                                { y: 360, color: "#1877F2" }  // Approx intersection on FB
                            ].map((marker, i) => (
                                <motion.g key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.5 + i * 0.2 }}>
                                    <circle cx={joinedX} cy={marker.y} r="3" fill={marker.color} />
                                    <text x={joinedX + 10} y={marker.y + 3} fill="white" fontSize="12" opacity="0.7">Growth+</text>
                                </motion.g>
                            ))}

                            {/* Instagram Line */}
                            <motion.path d={instagramPath} fill="none" stroke="#00f3ff" strokeWidth="3" filter="url(#glow-aqua)"
                                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.5, ease: "easeInOut" }}
                            />
                            {/* Mid-Chart Annotation Insta */}
                            <motion.foreignObject x="380" y="190" width="120" height="40" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2 }}>
                                <div className="text-[8px] md:text-[9px] text-[#00f3ff] font-bold bg-black/60 px-2 py-1 rounded border border-[#00f3ff]/30 text-center">Reels Spike</div>
                            </motion.foreignObject>

                            {/* YouTube Line */}
                            <motion.path d={youtubePath} fill="none" stroke="#FF0000" strokeWidth="3" filter="url(#glow-red)"
                                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.5, delay: 0.3, ease: "easeInOut" }}
                            />
                            {/* Mid-Chart Annotation YT */}
                            <motion.foreignObject x="500" y="230" width="130" height="40" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2.3 }}>
                                <div className="text-[8px] md:text-[9px] text-[#FF0000] font-bold bg-black/60 px-2 py-1 rounded border border-[#FF0000]/30 text-center">Shorts Boost</div>
                            </motion.foreignObject>

                            {/* Facebook Line */}
                            <motion.path d={facebookPath} fill="none" stroke="#1877F2" strokeWidth="3" filter="url(#glow-blue)"
                                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2.5, delay: 0.6, ease: "easeInOut" }}
                            />

                            {/* Campaign Points */}
                            {campaigns.map((camp) => (
                                <motion.g
                                    key={camp.id}
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ delay: 2 }}
                                    onMouseEnter={() => setHoveredCampaign(camp)}
                                    onClick={() => setHoveredCampaign(camp)} // Mobile support
                                    onMouseLeave={() => setHoveredCampaign(null)}
                                    className="cursor-pointer"
                                >
                                    <circle
                                        cx={camp.x} cy={camp.y} r="8"
                                        fill={camp.platform === "instagram" ? "#00f3ff" : camp.platform === "youtube" ? "#FF0000" : "#1877F2"}
                                        className="transition-all duration-300 hover:r-12"
                                    />
                                    <circle
                                        cx={camp.x} cy={camp.y} r="16"
                                        fill="none"
                                        stroke={camp.platform === "instagram" ? "#00f3ff" : camp.platform === "youtube" ? "#FF0000" : "#1877F2"}
                                        strokeOpacity="0.3"
                                        className="animate-pulse"
                                    />
                                </motion.g>
                            ))}
                        </svg>

                        {/* Advanced Tooltip */}
                        <AnimatePresence>
                            {hoveredCampaign && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        left: `${(hoveredCampaign.x / 1000) * 100}%`,
                                        top: `${(hoveredCampaign.y / 500) * 100}%`,
                                    }}
                                    className="absolute z-50 transform -translate-x-1/2 -translate-y-[130%] pointer-events-none w-max"
                                >
                                    <div className={`
                            glass-card p-3 md:p-4 rounded-xl border border-white/20 backdrop-blur-xl shadow-2xl min-w-[160px] md:min-w-[200px]
                            ${hoveredCampaign.platform === "instagram" ? "shadow-[0_0_20px_rgba(0,243,255,0.2)]" :
                                            hoveredCampaign.platform === "youtube" ? "shadow-[0_0_20px_rgba(255,0,0,0.2)]" :
                                                "shadow-[0_0_20px_rgba(24,119,242,0.2)]"}
                        `}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`text-base md:text-lg ${hoveredCampaign.platform === "instagram" ? "text-[#00f3ff]" :
                                                hoveredCampaign.platform === "youtube" ? "text-[#FF0000]" :
                                                    "text-[#1877F2]"
                                                }`}>
                                                {getIcon(hoveredCampaign.type)}
                                            </span>
                                            <span className="font-bold text-white text-xs md:text-sm">{hoveredCampaign.name}</span>
                                        </div>
                                        <div className="flex justify-between items-end border-t border-white/10 pt-2">
                                            <div>
                                                <p className="text-[8px] md:text-[10px] text-gray-400 uppercase tracking-wider">Reach</p>
                                                <p className="text-sm md:text-lg font-black text-white">{hoveredCampaign.reach}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[8px] md:text-[10px] text-gray-400">{hoveredCampaign.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Tooltip Arrow */}
                                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white/10 mx-auto" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* X-Axis Label */}
                    <div className="text-center mt-6 md:mt-8 text-[10px] md:text-xs text-gray-500 font-mono uppercase tracking-widest leading-relaxed">
                        Time (Campaign Cycles / Years From 2020–2025)
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReachTrend;
