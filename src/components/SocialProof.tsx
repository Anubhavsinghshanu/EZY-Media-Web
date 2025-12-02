'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue, animate, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaInstagram, FaYoutube, FaTrophy, FaBolt, FaCircleCheck, FaMicrochip, FaCrown, FaDumbbell, FaFaceSmile, FaChartLine, FaArrowUp, FaUsers, FaGlobe } from 'react-icons/fa6';

// --- DATA ---

const METRICS = [
    { label: "Creators Satisfaction in All Campaigns", value: "92%", icon: <FaCircleCheck /> },
    { label: "Delivered in 8 Days for Betting Brands", value: "1200M+", icon: <FaBolt /> },
    { label: "Active Verified Creators", value: "400+", icon: <FaTrophy /> },
    { label: "Successful Campaigns (Song & Logo)", value: "50+", icon: <FaTrophy /> }
];

const TAG_OPTIONS = [
    { label: 'Tech', icon: <FaMicrochip />, color: 'from-blue-500/10 to-cyan-500/10', border: 'border-blue-500/20', text: 'text-blue-200' },
    { label: 'GOD', icon: <FaCrown />, color: 'from-yellow-500/10 to-amber-500/10', border: 'border-yellow-500/20', text: 'text-yellow-200' },
    { label: 'Sports', icon: <FaDumbbell />, color: 'from-emerald-500/10 to-green-500/10', border: 'border-emerald-500/20', text: 'text-emerald-200' },
    { label: 'Comedy', icon: <FaFaceSmile />, color: 'from-pink-500/10 to-rose-500/10', border: 'border-pink-500/20', text: 'text-pink-200' }
];

const CREATORS = Array.from({ length: 5 }).map((_, i) => {
    // Randomly select 1-3 tags
    const shuffledTags = [...TAG_OPTIONS].sort(() => 0.5 - Math.random());
    const selectedTags = shuffledTags.slice(0, Math.floor(Math.random() * 2) + 1); // 1-2 tags

    return {
        id: i,
        name: `Creator ${i + 1}`,
        category: selectedTags[0].label,
        avgReach: `${(Math.random() * 30 + 15).toFixed(1)}M`,
        er: `${(Math.random() * 5 + 3).toFixed(1)}%`,
        image: `/assets/creator-${(i % 5) + 1}.jpg`,
        tags: selectedTags,
        verified: true,
        thumbnail: `/assets/reel-${(i % 3) + 1}.jpg`, // Placeholder
        demographics: {
            age: "18-34",
            gender: Math.random() > 0.5 ? "Male Dominant" : "Balanced"
        },
        platformSplit: {
            ig: Math.floor(Math.random() * 40) + 40,
            yt: Math.floor(Math.random() * 20) + 10
        },
        recentCampaign: {
            brand: ["Winadda", "Fun88", "Mostbet", "1xBet"][i % 4],
            reach: `${(Math.random() * 5 + 5).toFixed(1)}M`
        },
        rank: `#${Math.floor(Math.random() * 10) + 1} in ${selectedTags[0].label}`
    };
});

const CATEGORIES = [
    "Fashion", "Tech", "Travel", "Fitness", "Comedy", "Beauty", "Music", "Lifestyle",
    "Fashion", "Tech", "Travel", "Fitness", "Comedy", "Beauty", "Music", "Lifestyle"
];

// --- COMPONENTS ---

const FlipCard = ({ value, label }: { value: string, label: string }) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 bg-[#0A0A12] border border-white/10 rounded-xl relative overflow-hidden group hover:border-[#D4AF37]/50 transition-colors duration-500">
            {/* Neon Bottom Border */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10 text-center">
                <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 font-[family-name:var(--font-playfair)] mb-2">
                    {value}
                </h3>
                <p className="text-sm text-gray-400 font-[family-name:var(--font-poppins)] uppercase tracking-widest">
                    {label}
                </p>
            </div>

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none" />
        </div>
    );
};

const VideoWheel = () => {
    const [rotation, setRotation] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(null);

    useEffect(() => {
        let lastTime = performance.now();
        const speed = 0.05; // Rotation speed

        const animate = (time: number) => {
            if (!isHovered) {
                const delta = time - lastTime;
                setRotation(prev => (prev + speed * delta) % 360);
            }
            lastTime = time;
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationRef.current!);
    }, [isHovered]);

    const radius = 300; // Distance from center
    const count = 5;
    const angleStep = 360 / count;

    return (
        <div
            className="relative h-[500px] w-full perspective-[1200px] flex items-center justify-center overflow-visible"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="relative w-[200px] h-[300px] preserve-3d"
                style={{
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${rotation}deg)`
                }}
            >
                {Array.from({ length: count }).map((_, i) => {
                    const angle = i * angleStep;
                    return (
                        <div
                            key={i}
                            className="absolute inset-0 backface-visible"
                            style={{
                                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                            }}
                        >
                            <div className="w-full h-full bg-black/80 backdrop-blur-md border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.1)] group hover:shadow-[0_0_50px_rgba(212,175,55,0.3)] transition-all duration-500">
                                {/* Mock Video Content */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                                    </div>
                                </div>

                                {/* Overlay Info */}
                                <div className="absolute bottom-0 inset-x-0 p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex space-x-2">
                                            <FaInstagram className="text-white/80 w-3 h-3" />
                                            <FaYoutube className="text-white/80 w-3 h-3" />
                                        </div>
                                    </div>
                                    <h4 className="text-white font-bold text-sm font-[family-name:var(--font-playfair)]">Client Story {i + 1}</h4>
                                    <p className="text-[#D4AF37] text-xs">CEO, Brand {i + 1}</p>
                                </div>

                                {/* Gold Glow Frame */}
                                <div className="absolute inset-0 border border-[#D4AF37]/20 rounded-2xl group-hover:border-[#D4AF37]/60 transition-colors duration-500" />
                            </div>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default function SocialProof() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // --- PARTICLES ---
    const particles = Array.from({ length: 30 }).map((_, i) => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 5
    }));

    return (
        <section
            ref={sectionRef}
            className="relative bg-[#000000] overflow-hidden"
        >
            {/* --- SECTION 1: CLIENT LOVE ENGINE --- */}
            <div className="relative py-32 px-6 bg-gradient-to-b from-black to-[#0A0A12]">

                {/* Golden Sparks / Particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {particles.map((p, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-[#D4AF37] rounded-full opacity-20"
                            style={{ top: p.top, left: p.left }}
                            animate={{
                                y: [0, -100],
                                opacity: [0, 0.4, 0]
                            }}
                            transition={{
                                duration: p.duration,
                                repeat: Infinity,
                                delay: p.delay,
                                ease: "linear"
                            }}
                        />
                    ))}
                    {/* Center Spotlight */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[150px]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Heading */}
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#F5F8FF] to-[#999] font-[family-name:var(--font-playfair)] mb-4"
                            style={{ textShadow: '0 0 30px rgba(212,175,55,0.2)' }}
                        >
                            Backed by Results. <br />
                            <span className="bg-gradient-to-r from-[#D4AF37] via-[#FCEEAC] to-[#D4AF37] bg-clip-text text-transparent">
                                Loved by Brands.
                            </span>
                        </motion.h2>
                    </div>

                    {/* Part A: Video Wheel */}
                    <div className="mb-32">
                        <VideoWheel />
                    </div>

                    {/* Part B: Punchline Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {METRICS.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <FlipCard value={m.value} label={m.label} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- SECTION 2: INFLUENCER PERFORMANCE ANALYTICS SUITE --- */}
            <div className="relative py-32 px-6 bg-[#050507] border-t border-white/5">
                <div className="max-w-[1400px] mx-auto">

                    {/* Heading */}
                    <div className="text-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
                        >
                            <FaChartLine className="text-blue-400" />
                            <span className="text-blue-200 text-xs font-bold tracking-widest uppercase">Live Data Dashboard</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="text-4xl md:text-6xl font-bold text-white font-[family-name:var(--font-poppins)] tracking-tight"
                        >
                            Influencer Performance <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                                Analytics Suite
                            </span>
                        </motion.h2>
                    </div>

                    {/* Analytics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CREATORS.map((creator, i) => (
                            <AnalyticsCard key={i} creator={creator} index={i} />
                        ))}
                        <ComparisonGraphCard index={CREATORS.length} />
                    </div>
                </div>
            </div>
        </section>
    );
}

// Comparison Graph Card Component
function ComparisonGraphCard({ index }: { index: number }) {
    const beforeReach = 2;
    const afterReach = 15;
    const beforeHeight = (beforeReach / afterReach) * 100;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className="group relative h-[320px] bg-gradient-to-b from-[#0F1115] to-[#050507] rounded-2xl border border-white/5 hover:border-blue-500/30 overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] p-6"
        >
            {/* Main Content - Flex with Growth on Left */}
            <div className="flex gap-4 h-full">
                {/* Left Side - Growth Stats */}
                <div className="flex flex-col justify-center items-center w-20">
                    <div className="flex items-center gap-1 mb-2">
                        <FaArrowUp className="text-green-400 text-xs" />
                        <span className="text-2xl font-bold text-green-400 font-mono">+{((afterReach - beforeReach) / beforeReach * 100).toFixed(0)}%</span>
                    </div>
                    <p className="text-[9px] text-gray-500 text-center leading-tight">Growth</p>
                </div>

                {/* Right Side - Bar Graph */}
                <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="text-center mb-4">
                        <h4 className="text-white font-bold text-sm">Impact</h4>
                    </div>

                    {/* Bar Graph */}
                    <div className="flex items-end justify-center gap-6 flex-1 pb-12">
                        {/* Before Bar */}
                        <div className="flex flex-col items-center gap-2 flex-1">
                            <div className="relative w-full flex items-end justify-center h-32">
                                <div
                                    className="w-12 bg-gradient-to-t from-red-600 to-red-400 rounded-t-lg relative transition-all duration-300 hover:scale-105"
                                    style={{ height: `${beforeHeight}%` }}
                                >
                                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-white font-bold text-xs whitespace-nowrap">
                                        {beforeReach}M
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-[9px] text-gray-400 uppercase font-semibold">Before</p>
                            </div>
                        </div>

                        {/* After Bar */}
                        <div className="flex flex-col items-center gap-2 flex-1">
                            <div className="relative w-full flex items-end justify-center h-32">
                                <div
                                    className="w-12 bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg relative transition-all duration-300 hover:scale-105"
                                    style={{ height: '100%' }}
                                >
                                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-white font-bold text-xs whitespace-nowrap">
                                        {afterReach}M
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-[9px] text-gray-400 uppercase font-semibold">After</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Label */}
                    <div className="text-center pt-3 border-t border-white/5">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Monthly Reach Comparison</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// New Analytics Card Component
function AnalyticsCard({ creator, index }: { creator: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className="group relative h-[320px] bg-gradient-to-b from-[#0F1115] to-[#050507] rounded-2xl border border-white/5 hover:border-blue-500/30 overflow-visible transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
        >
            {/* Card Header: Profile & Tag */}
            <div className="p-5 flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-800 border border-white/10 overflow-hidden relative">
                        {/* Placeholder for Profile Pic */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm flex items-center gap-1">
                            {creator.name}
                            {creator.verified && <FaCircleCheck className="text-blue-500 text-[10px]" />}
                        </h4>
                        {/* Niche Tags */}
                        <div className="mt-1 flex flex-wrap gap-1.5">
                            {creator.tags.slice(0, 2).map((tag: any, i: number) => (
                                <div key={i} className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gradient-to-r ${tag.color} border ${tag.border} hover:scale-105 hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-300`}>
                                    <span className={`text-[8px] ${tag.text}`}>{tag.icon}</span>
                                    <span className={`text-[8px] font-bold tracking-wide ${tag.text} uppercase`}>{tag.label}</span>
                                </div>
                            ))}
                            {creator.tags.length > 2 && (
                                <div className="px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                                    <span className="text-[8px] text-gray-400 font-medium">+{creator.tags.length - 2}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Platform Icons */}
                <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <FaInstagram className="text-white w-3 h-3" />
                    <FaYoutube className="text-white w-3 h-3" />
                </div>
            </div>

            {/* Key Metrics */}
            <div className="px-5 mt-2 grid grid-cols-2 gap-4 relative z-10">
                <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">All Time Highest Reach</p>
                    <p className="text-lg font-bold text-white font-mono">{creator.avgReach}</p>
                </div>
                <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Eng. Rate</p>
                    <p className="text-lg font-bold text-green-400 font-mono">{creator.er}</p>
                </div>
            </div>

            {/* Top Performing Thumbnail (Bottom Section) */}
            <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden rounded-b-2xl mask-gradient-b">
                <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent z-10" />
                {/* Placeholder Thumbnail */}
                <div className="w-full h-full bg-gray-800 opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="absolute bottom-4 left-5 z-20">
                    <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1">Top Performer</p>
                    <div className="flex items-center gap-1 text-xs font-bold text-white">
                        <FaArrowUp className="text-green-500" />
                        High Retention
                    </div>
                </div>
            </div>

            {/* HOVER ANALYTICS PANEL (Slide Up) */}
            <div className="absolute inset-x-0 bottom-0 h-[240px] bg-[#0F1115]/95 backdrop-blur-xl border-t border-blue-500/30 rounded-b-2xl translate-y-[10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-30 pointer-events-none group-hover:pointer-events-auto p-5 flex flex-col justify-between shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">

                {/* Header */}
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Analytics View</span>
                    <span className="text-[10px] text-gray-500">Live Data</span>
                </div>

                {/* Data Rows */}
                <div className="space-y-3 mt-2">
                    {/* Demographics */}
                    <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-gray-400">
                            <FaUsers className="text-blue-500/70" />
                            <span>Audience</span>
                        </div>
                        <span className="text-white font-mono">{creator.demographics.age}</span>
                    </div>

                    {/* Platform Split */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-[10px] text-gray-400 uppercase">
                            <span>Platform Split</span>
                            <span>IG {creator.platformSplit.ig}% / YT {creator.platformSplit.yt}%</span>
                        </div>
                        <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden flex">
                            <div style={{ width: `${creator.platformSplit.ig}%` }} className="h-full bg-gradient-to-r from-purple-500 to-pink-500" />
                            <div style={{ width: `${creator.platformSplit.yt}%` }} className="h-full bg-red-600" />
                        </div>
                    </div>

                    {/* Recent Campaign */}
                    <div className="bg-white/5 rounded-lg p-2 border border-white/5">
                        <p className="text-[9px] text-gray-500 uppercase mb-1">Recent Campaign</p>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-white">{creator.recentCampaign.brand}</span>
                            <span className="text-xs font-mono text-green-400">{creator.recentCampaign.reach} Reach</span>
                        </div>
                    </div>
                </div>

                {/* Footer Rank */}
                <div className="mt-auto pt-3 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[10px] text-gray-500">Category Rank</span>
                    <span className="text-xs font-bold text-yellow-400">{creator.rank}</span>
                </div>
            </div>
        </motion.div>
    );
}
