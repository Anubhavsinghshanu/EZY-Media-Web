'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, AnimatePresence, Variants } from 'framer-motion';

// --- Assets & Data ---

const LOGOS = [
    "Winadda", "Fun88", "Betway", "1xBet", "Parimatch", "Fairplay", "Lotus365", "Mahadev", "Reddy Anna"
];

const CREATORS = [
    { id: 0, name: "Creator 1", followers: "4.2M", color: "hsl(320, 70%, 60%)" },
    { id: 1, name: "Creator 2", followers: "2.8M", color: "hsl(180, 70%, 60%)" },
    { id: 2, name: "Creator 3", followers: "5.1M", color: "hsl(240, 70%, 60%)" },
    { id: 3, name: "Creator 4", followers: "1.9M", color: "hsl(40, 70%, 60%)" },
    { id: 4, name: "Creator 5", followers: "3.5M", color: "hsl(280, 70%, 60%)" },
    { id: 5, name: "Creator 6", followers: "6.0M", color: "hsl(10, 70%, 60%)" },
    { id: 6, name: "Creator 7", followers: "2.2M", color: "hsl(200, 70%, 60%)" },
    { id: 7, name: "Creator 8", followers: "4.8M", color: "hsl(150, 70%, 60%)" },
    { id: 8, name: "Creator 9", followers: "3.1M", color: "hsl(300, 70%, 60%)" },
    { id: 9, name: "Creator 10", followers: "5.5M", color: "hsl(50, 70%, 60%)" },
    { id: 10, name: "Creator 11", followers: "1.5M", color: "hsl(220, 70%, 60%)" },
    { id: 11, name: "Creator 12", followers: "3.9M", color: "hsl(340, 70%, 60%)" }
];

// --- Components ---

const Counter = ({ from, to, duration = 2, suffix = "" }: { from: number; to: number; duration?: number; suffix?: string }) => {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(nodeRef, { once: true });

    useEffect(() => {
        if (!inView) return;

        const node = nodeRef.current;
        const controls = { value: from };

        let startTime: number;

        const animate = (time: number) => {
            if (!startTime) startTime = time;
            const progress = Math.min((time - startTime) / (duration * 1000), 1);
            const ease = 1 - Math.pow(1 - progress, 3); // Cubic out

            const current = Math.floor(controls.value + (to - from) * ease);
            if (node) node.textContent = `${current}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [from, to, duration, inView, suffix]);

    return <span ref={nodeRef} />;
};

// Data removed as per request

const Card3D = ({ children, className, glowColor }: { children: React.ReactNode; className?: string; glowColor: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXRel = e.clientX - rect.left - width / 2;
        const mouseYRel = e.clientY - rect.top - height / 2;
        x.set(mouseXRel / 10);
        y.set(mouseYRel / 10);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={`relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 group ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: useTransform(mouseY, (value) => value * -1),
                rotateY: useTransform(mouseX, (value) => value),
                perspective: 1000,
                transformStyle: "preserve-3d"
            }}
            whileHover={{
                scale: 1.02,
                boxShadow: `0 0 30px ${glowColor}40`
            }}
        >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${glowColor}`} style={{ mixBlendMode: 'overlay' }} />
            <div className="relative z-10 h-full flex flex-col">
                {children}
            </div>
        </motion.div>
    );
};





const SongPromotionBook = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [direction, setDirection] = useState(0);

    const pages = [
        { title: "Arz Kiya H", artist: "Coke Studio", duration: "5 Days", delivered: "300M+", score: "9.5/10", rank: "#1 on Instagram", color: "from-pink-500 to-rose-500" },
        { title: "Ni Tu Bar Bar", artist: "Sony Music", duration: "6 Days", delivered: "210M+", score: "9.4/10", rank: "#1 on Instagram", color: "from-purple-500 to-indigo-500" },
        { title: "Good For Nothing", artist: "T-Series", duration: "5 Days", delivered: "180M+", score: "9.3/10", rank: "#2 on Instagram", color: "from-blue-500 to-cyan-500" },
        { title: "Bas Ek Dhadak", artist: "Zee Music", duration: "5 Days", delivered: "255M+", score: "9.7/10", rank: "#1 on Instagram", color: "from-red-500 to-orange-500" },
        { title: "Alvida", artist: "Tips Official", duration: "6 Days", delivered: "250M+", score: "9.5/10", rank: "#1 on Instagram", color: "from-emerald-500 to-teal-500" },
        { title: "Title Track", artist: "Rito Riba", duration: "6 Days", delivered: "220M+", score: "9.4/10", rank: "Top 5 on Instagram", color: "from-amber-500 to-yellow-500" },
        { title: "Bas Tera", artist: "Rito Riba", duration: "5 Days", delivered: "180M+", score: "9.3/10", rank: "Top 10 on Instagram", color: "from-violet-500 to-fuchsia-500" },
        { title: "Sailor", artist: "Badshah", duration: "7 Days", delivered: "250M+", score: "9.6/10", rank: "#2 on Instagram", color: "from-sky-500 to-blue-500" },
        { title: "Subh Manglam", artist: "Armaan Malik", duration: "6 Days", delivered: "195M+", score: "9.4/10", rank: "Top 3 on Instagram", color: "from-lime-500 to-green-500" }
    ];

    const nextPage = () => {
        setDirection(1);
        setCurrentPage((prev) => (prev + 1) % pages.length);
    };

    const prevPage = () => {
        setDirection(-1);
        setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
    };

    const variants: Variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            rotateY: direction > 0 ? 45 : -45,
            scale: 0.8,
            zIndex: 0
        }),
        center: {
            x: 0,
            opacity: 1,
            rotateY: 0,
            scale: 1,
            zIndex: 1,
            transition: {
                duration: 0.6,
                ease: "easeInOut"
            }
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            rotateY: direction < 0 ? 45 : -45,
            scale: 0.8,
            zIndex: 0,
            transition: {
                duration: 0.6,
                ease: "easeInOut"
            }
        })
    };

    return (
        <div className="relative w-full h-full flex flex-col bg-[#0a0a0a] overflow-hidden perspective-[1000px]">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-black" />

            {/* Dynamic Background: Floating Spotify & Instagram Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                {[
                    { t: 's', l: '10%', top: '20%', d: 0 }, { t: 'i', l: '85%', top: '15%', d: 1.5 },
                    { t: 's', l: '20%', top: '80%', d: 3 }, { t: 'i', l: '75%', top: '75%', d: 0.5 },
                    { t: 's', l: '50%', top: '50%', d: 2 }, { t: 'i', l: '15%', top: '45%', d: 4 },
                    { t: 's', l: '90%', top: '40%', d: 1 }, { t: 'i', l: '35%', top: '10%', d: 2.5 },
                    { t: 's', l: '60%', top: '90%', d: 3.5 }, { t: 'i', l: '80%', top: '60%', d: 1.2 },
                ].map((icon, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 0.3, 0],
                            scale: [0.5, 1.2, 0.5],
                            y: [0, -15, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: icon.d,
                            ease: "easeInOut"
                        }}
                        style={{ left: icon.l, top: icon.top }}
                    >
                        {icon.t === 's' ? (
                            <svg viewBox="0 0 24 24" fill="#1DB954" className="w-4 md:w-6 h-4 md:h-6 opacity-50 drop-shadow-[0_0_10px_rgba(29,185,84,0.3)]">
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.32-1.38 9.841-.719 13.44 1.5.42.3.6.84.3 1.32zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 14.82 1.08.54.3.72.96.42 1.5-.3.54-.96.72-1.5.42z" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="url(#ig-gradient-mini)" className="w-4 md:w-6 h-4 md:h-6 opacity-50 drop-shadow-[0_0_10px_rgba(220,39,67,0.3)]">
                                <defs>
                                    <linearGradient id="ig-gradient-mini" x1="0%" y1="100%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#f09433" />
                                        <stop offset="50%" stopColor="#dc2743" />
                                        <stop offset="100%" stopColor="#bc1888" />
                                    </linearGradient>
                                </defs>
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Header Section */}
            <div className="relative z-20 pt-4 md:pt-8 px-4 md:px-8 mb-2 md:mb-4">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight mb-2 md:mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Record-Breaking <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Song Promotions</span>
                </h3>

                {/* Trending Badge */}
                <div className="inline-flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-600/10 border border-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.15)] backdrop-blur-md">
                    <svg viewBox="0 0 24 24" fill="none" className="w-3 md:w-4 h-3 md:h-4 text-pink-500">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor" />
                    </svg>
                    <span className="text-pink-100 text-[8px] md:text-[10px] font-bold tracking-wider uppercase">Viral Campaigns on Instagram</span>
                </div>
            </div>

            {/* 3D Page Container */}
            <div className="relative flex-1 flex items-center justify-center w-full px-3 md:px-6 pb-8 md:pb-12">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={currentPage}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute w-[90%] md:w-[85%] aspect-[4/5] bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col shadow-2xl overflow-hidden"
                        style={{
                            boxShadow: `0 20px 50px -12px rgba(0, 0, 0, 0.5)`
                        }}
                    >
                        {/* Page Content */}
                        <div className="relative z-10 h-full flex flex-col">

                            {/* Page Indicator */}
                            <div className="flex justify-between items-center mb-4 md:mb-6">
                                <span className="text-white/30 font-mono text-[8px] md:text-[10px] tracking-widest">PAGE {currentPage + 1}</span>
                                <div className={`h-1 w-8 md:w-12 rounded-full bg-gradient-to-r ${pages[currentPage].color}`} />
                            </div>

                            {/* Song Title & Artist */}
                            <div className="mb-6 md:mb-8">
                                <h2 className="text-2xl md:text-3xl font-black text-white leading-none tracking-tight mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                    {pages[currentPage].title}
                                </h2>
                                <p className="text-xs md:text-sm text-gray-400 font-medium">by {pages[currentPage].artist}</p>
                            </div>

                            {/* Stats List */}
                            <div className="space-y-3 md:space-y-4 mt-auto">
                                {/* Duration */}
                                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                    <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider font-semibold">Duration</span>
                                    <span className="text-xs md:text-sm font-bold text-white font-mono">{pages[currentPage].duration}</span>
                                </div>

                                {/* Delivered */}
                                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                    <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider font-semibold">Delivered</span>
                                    <span className="text-base md:text-lg font-bold text-white font-mono text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                                        {pages[currentPage].delivered}
                                    </span>
                                </div>

                                {/* Quality Score */}
                                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                                    <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider font-semibold">Quality Score</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs md:text-sm font-bold text-white font-mono">{pages[currentPage].score}</span>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className={`w-1 h-1 rounded-full ${i < 4 ? 'bg-green-400' : 'bg-green-400/30'}`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Trend Rank */}
                                <div className="flex items-center justify-between pt-1">
                                    <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider font-semibold">Trend Rank</span>
                                    <span className={`text-[10px] md:text-xs font-bold px-2 py-1 rounded bg-gradient-to-r ${pages[currentPage].color} bg-opacity-20 text-white`}>
                                        {pages[currentPage].rank}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Background Gradient Blob */}
                        <div className={`absolute -top-20 -right-20 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-br ${pages[currentPage].color} opacity-10 blur-[80px] rounded-full pointer-events-none`} />
                        <div className={`absolute -bottom-20 -left-20 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-tr ${pages[currentPage].color} opacity-10 blur-[80px] rounded-full pointer-events-none`} />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-4 md:bottom-6 left-0 right-0 flex justify-center gap-3 md:gap-4 z-20">
                <button
                    onClick={prevPage}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white hover:scale-110 transition-all active:scale-95 touch-manipulation"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
                <div className="flex gap-1.5 items-center">
                    {pages.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === currentPage ? 'w-6 bg-white' : 'w-1.5 bg-white/20'}`}
                        />
                    ))}
                </div>
                <button
                    onClick={nextPage}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white hover:scale-110 transition-all active:scale-95 touch-manipulation"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default function MajorAchievements() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [hoveredStat, setHoveredStat] = useState<string | null>(null);

    return (
        <section ref={sectionRef} className="relative py-16 md:py-32 px-4 md:px-6 bg-black overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-900/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-900/20 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="mb-12 md:mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                        Major Achievements
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex items-center gap-4"
                    >
                        <div className="h-px w-8 md:w-12 bg-white/30" />
                        <p className="text-sm md:text-xl text-gray-400 font-semibold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Selected wins that show our creator-driven impact.
                        </p>
                    </motion.div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

                    {/* CARD 1: INSTAGRAM SERVICES - ULTRA PREMIUM REDESIGN */}
                    <Card3D glowColor="from-pink-600/30 via-purple-600/30 to-orange-600/30" className="border-pink-500/20 hover:border-pink-400/50 transition-all duration-500 ease-out group/card h-[600px]">
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl z-0" />

                        <div className="p-4 md:p-8 flex-1 flex flex-col relative overflow-hidden z-10 h-full">

                            {/* BACKGROUND DESIGN (OFFICIAL INSTAGRAM LOGO) */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                                <motion.div
                                    className="w-[120%] h-[120%] opacity-[0.14] blur-[10px]"
                                    animate={{
                                        rotate: [0, 5, 0],
                                        scale: [1, 1.05, 1],
                                    }}
                                    transition={{
                                        duration: 15,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    {/* Using SVG for crisp "Official" look at any size */}
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                        <defs>
                                            <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#f09433" />
                                                <stop offset="25%" stopColor="#e6683c" />
                                                <stop offset="50%" stopColor="#dc2743" />
                                                <stop offset="75%" stopColor="#cc2366" />
                                                <stop offset="100%" stopColor="#bc1888" />
                                            </linearGradient>
                                        </defs>
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="url(#ig-gradient)" />
                                    </svg>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                </motion.div>
                            </div>

                            {/* CONTENT CONTAINER */}
                            <div className="relative z-20 flex flex-col h-full">

                                {/* BADGE */}
                                <div className="mb-4 md:mb-8 self-start">
                                    <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 backdrop-blur-md border border-pink-500/20 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                                        <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                                        <span className="text-pink-200 text-xs font-bold tracking-wider">CASE STUDY</span>
                                    </div>
                                </div>

                                {/* MAIN FRONT TEXT (3D PROFESSIONAL FONT) */}
                                <div className="space-y-10 mb-auto">

                                    {/* STAT 1: WINADDA */}
                                    <div
                                        className="group/stat relative cursor-pointer min-h-[120px] flex items-center"
                                        onMouseEnter={() => setHoveredStat('winadda')}
                                        onMouseLeave={() => setHoveredStat(null)}
                                    >
                                        <AnimatePresence mode="wait">
                                            {hoveredStat !== 'winadda' ? (
                                                <motion.h3
                                                    key="text"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                                                    className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight"
                                                    style={{
                                                        fontFamily: 'Montserrat, sans-serif',
                                                        textShadow: '0 4px 10px rgba(0,0,0,0.5)',
                                                    }}
                                                >
                                                    <span className="bg-gradient-to-br from-white via-pink-100 to-pink-200 bg-clip-text text-transparent filter drop-shadow-sm">
                                                        1200M+ Delivered
                                                    </span>
                                                    <br />
                                                    <span className="text-lg md:text-2xl lg:text-3xl font-bold text-white/90 mt-1 block" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                                                        in 8 Days for <span className="text-pink-400 inline-block transform group-hover/stat:scale-105 transition-transform duration-300">WINADDA</span>
                                                    </span>
                                                </motion.h3>
                                            ) : (
                                                <motion.div
                                                    key="popup"
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
                                                    transition={{ duration: 0.14, ease: "easeOut" }}
                                                    className="w-full bg-black/60 backdrop-blur-xl border border-pink-500/30 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(236,72,153,0.2)]"
                                                >
                                                    <div className="p-5">
                                                        <div className="text-pink-300 text-xs font-bold mb-3 tracking-widest uppercase border-b border-pink-500/20 pb-2 flex justify-between items-center">
                                                            <span>WINADDA – Campaign History</span>
                                                            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse shadow-[0_0_10px_rgba(236,72,153,1)]"></span>
                                                        </div>
                                                        <ul className="space-y-2">
                                                            {[
                                                                "99% Customer Satisfaction",
                                                                "6 Weeks of Seamless Work",
                                                                "Smooth Execution",
                                                                "4.8 Creators Rating"
                                                            ].map((item, i) => (
                                                                <motion.li
                                                                    key={i}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: i * 0.05 }}
                                                                    className="flex items-center gap-2 text-sm text-white/90 font-medium"
                                                                >
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_5px_rgba(236,72,153,0.8)]" />
                                                                    {item}
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* STAT 2: FUN88 */}
                                    <div
                                        className="group/stat relative cursor-pointer min-h-[120px] flex items-center"
                                        onMouseEnter={() => setHoveredStat('fun88')}
                                        onMouseLeave={() => setHoveredStat(null)}
                                    >
                                        <AnimatePresence mode="wait">
                                            {hoveredStat !== 'fun88' ? (
                                                <motion.h3
                                                    key="text"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                                                    className="text-2xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight"
                                                    style={{
                                                        fontFamily: 'Montserrat, sans-serif',
                                                        textShadow: '0 4px 10px rgba(0,0,0,0.5)',
                                                    }}
                                                >
                                                    <span className="bg-gradient-to-br from-white via-purple-100 to-purple-200 bg-clip-text text-transparent filter drop-shadow-sm">
                                                        700M+ Delivered
                                                    </span>
                                                    <br />
                                                    <span className="text-lg md:text-2xl lg:text-3xl font-bold text-white/90 mt-1 block" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                                                        in 7 Days for <span className="text-purple-400 inline-block transform group-hover/stat:scale-105 transition-transform duration-300">FUN88</span>
                                                    </span>
                                                </motion.h3>
                                            ) : (
                                                <motion.div
                                                    key="popup"
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.1 } }}
                                                    transition={{ duration: 0.14, ease: "easeOut" }}
                                                    className="w-full bg-black/60 backdrop-blur-xl border border-purple-500/30 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                                                >
                                                    <div className="p-5">
                                                        <div className="text-purple-300 text-xs font-bold mb-3 tracking-widest uppercase border-b border-purple-500/20 pb-2 flex justify-between items-center">
                                                            <span>FUN88 – Campaign History</span>
                                                            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_rgba(168,85,247,1)]"></span>
                                                        </div>
                                                        <ul className="space-y-2">
                                                            {[
                                                                "98% Customer Satisfaction",
                                                                "5 Weeks Execution",
                                                                "Hyper-Optimized Delivery",
                                                                "4.7 Creators Rating"
                                                            ].map((item, i) => (
                                                                <motion.li
                                                                    key={i}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: i * 0.05 }}
                                                                    className="flex items-center gap-2 text-sm text-white/90 font-medium"
                                                                >
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_5px_rgba(168,85,247,0.8)]" />
                                                                    {item}
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* BRAND LOGO MARQUEE (OFFICIAL LOGOS) */}
                                <div className="mt-8 relative">
                                    {/* Premium Glassmorphism Strip */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 backdrop-blur-xl rounded-[22px] border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05),0_0_20px_rgba(0,0,0,0.2)] z-0" />

                                    {/* CSS Animation Definition */}
                                    <style>
                                        {`
                                            @keyframes marquee {
                                                0% { transform: translateX(0%); }
                                                100% { transform: translateX(-50%); }
                                            }
                                        `}
                                    </style>

                                    <div className="relative z-10 overflow-hidden py-4 mask-linear-fade group/marquee">
                                        <div
                                            className="flex gap-12 items-center whitespace-nowrap hover:[animation-play-state:paused]"
                                            style={{
                                                animation: 'marquee 28s linear infinite',
                                                width: 'max-content'
                                            }}
                                        >
                                            {[...Array(2)].map((_, setIndex) => (
                                                <React.Fragment key={setIndex}>
                                                    {[
                                                        { name: "MOSTBET", stat: "97% Success" },
                                                        { name: "LOTUS365", stat: "250M in 5 Days" },
                                                        { name: "MELBET", stat: "180M in 5 Days" },
                                                        { name: "BE8FAIR", stat: "98% Creators Satisfied" },
                                                        { name: "1XBET", stat: "92% Retention Rating" },
                                                        { name: "ODDS96", stat: "250M in 6 days" },
                                                        { name: "PARIMATCH", stat: "95% Performance Score" }
                                                    ].map((brand, i) => (
                                                        <div key={i} className="flex flex-col items-center justify-center cursor-default min-w-[120px]">
                                                            <span
                                                                className="text-white font-black text-xl tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                                                                style={{ fontFamily: 'Montserrat, sans-serif' }}
                                                            >
                                                                {brand.name}
                                                            </span>
                                                            <span
                                                                className="text-[9px] font-semibold text-white mt-1 block drop-shadow-md tracking-wide uppercase text-center opacity-90"
                                                                style={{ fontFamily: 'Poppins, sans-serif' }}
                                                            >
                                                                {brand.stat}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Card3D>

                    {/* CARD 2: SONG PROMOTION - 3D INTERACTIVE BOOK */}
                    <Card3D glowColor="from-red-600/20 to-orange-900/20" className="h-[600px] group/book-card">
                        <SongPromotionBook />
                    </Card3D>

                    {/* CARD 3: REPOST CAMPAIGN MASTERY */}
                    <Card3D glowColor="from-blue-600/30 via-purple-600/30 to-pink-600/30" className="h-[600px] relative overflow-hidden group/repost">
                        {/* Background - Obsidian Black with Parallax */}
                        <div className="absolute inset-0 bg-[#0A0A0A] z-0" />
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10 z-0" />

                        {/* Background Design (Official YT Shorts Logo) */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-0">
                            <motion.div
                                className="w-[120%] h-[120%] opacity-[0.4] blur-[10px]"
                                animate={{
                                    rotate: [0, -5, 0],
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 15,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <svg viewBox="0 0 24 24" fill="red" className="w-full h-full drop-shadow-[0_0_50px_rgba(255,0,0,0.3)]">
                                    <path d="M17.77 10.32l-1.2-.5L18 9.06a3.18 3.18 0 0 0-3.33-5.25L5.9 8.65a3.18 3.18 0 0 0 1.13 5.82l1.2.5-1.43.76a3.18 3.18 0 0 0 3.33 5.25l8.77-4.84a3.18 3.18 0 0 0-1.13-5.82zM7.03 13.44l-1.2-.5a1.59 1.59 0 0 1-.56-2.91l8.77-4.84a1.59 1.59 0 0 1 1.66 2.62l-1.2.5 1.43-.76a1.59 1.59 0 0 1 .56 2.91l-8.77 4.84a1.59 1.59 0 0 1-1.66-2.62l1.2-.5-1.43.76z" />
                                    <polygon points="10,15 15,12 10,9" fill="white" />
                                </svg>
                            </motion.div>
                        </div>

                        {/* Content Container - Responsive Padding */}
                        <div className="relative z-10 h-full flex flex-col px-4 md:px-8 pb-4 md:pb-8 pt-6 md:pt-10">

                            {/* 1. CARD TITLE SECTION */}
                            <div className="text-center mb-3 md:mb-4">
                                <h3 className="text-lg md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 tracking-tight uppercase" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                    Repost Campaign Mastery
                                </h3>
                                <p className="text-[8px] md:text-[10px] font-bold text-gray-400 tracking-widest mt-1 uppercase">
                                    Advanced Repost Engineering • Guaranteed Viral Distribution
                                </p>
                            </div>

                            {/* 2. TOP BRAND STRIP */}
                            <div className="relative w-full bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 mb-3 md:mb-4 overflow-hidden group/strip">
                                {/* Light Streak Animation */}
                                <motion.div
                                    className="absolute top-0 bottom-0 left-[-100%] w-[50%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                                    animate={{ left: ["-100%", "200%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                />

                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover/strip:via-purple-500/10 transition-all duration-500" />

                                <div className="flex flex-col items-center justify-center relative z-10 w-full">
                                    <h4 className="text-base md:text-xl font-black text-white tracking-wider uppercase flex items-center gap-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                        SAMSUNG <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 text-lg md:text-2xl">×</span> YT SHORTS
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
                                        <span className="text-[8px] md:text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase">
                                            Verified Repost Campaign
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* 3. MAIN CONTENT AREA */}
                            <div className="flex-1 flex flex-col gap-3 md:gap-4 overflow-hidden">

                                {/* SECTION B - KPI GRID */}
                                <div className="grid grid-cols-2 gap-2 flex-grow">
                                    {[
                                        { val: "2,500+", label: "Verified Reposts" },
                                        { val: "400+", label: "Active Creators" },
                                        { val: "7 Days", label: "Avg Duration" },
                                        { val: "500K", label: "Avg Reach" },
                                        { val: "12/12", label: "Videos 20M+" },
                                        { val: "Live", label: "Optimization" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/5 rounded-lg p-2 flex flex-col items-center justify-center text-center hover:bg-white/10 transition-colors h-full border border-white/5">
                                            <span className="text-sm md:text-lg font-bold text-white mb-0.5">{stat.val}</span>
                                            <span className="text-[8px] md:text-[9px] font-bold text-gray-500 uppercase tracking-wider">{stat.label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* SECTION C - ACHIEVEMENT BADGES */}
                                <div className="grid grid-cols-3 gap-2 flex-shrink-0">
                                    {[
                                        { title: "Retention", val: "+62%" },
                                        { title: "Viral Hit", val: "12/12" },
                                        { title: "Execution", val: "250 Shorts/Day" }
                                    ].map((badge, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ y: -2 }}
                                            className="bg-gradient-to-b from-white/10 to-transparent border border-white/10 rounded-lg p-2 flex flex-col items-center justify-center text-center shadow-lg"
                                        >
                                            <span className="text-[7px] md:text-[8px] text-gray-400 uppercase mb-0.5 leading-tight tracking-wide">{badge.title}</span>
                                            <span className="text-[10px] md:text-xs font-bold text-white">{badge.val}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </Card3D>

                </div>

                {/* Section Footer */}
                <div className="mt-20 relative">
                    <motion.div
                        className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    <div className="text-center mt-8">
                        <p className="text-gray-400 text-sm">
                            Want a case like this? <button className="text-white font-bold border-b border-white/30 hover:border-white transition-colors">Book a strategy call</button> — limited slots.
                        </p>
                    </div>
                </div>
            </div >
        </section >
    );
}
