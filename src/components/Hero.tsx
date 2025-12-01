"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaInstagram, FaTiktok, FaYoutube, FaTwitter, FaTwitch } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { label: "Working With Creators", value: 3000, suffix: "+" },
    { label: "Active Creators", value: 1000, suffix: "+" },
    { label: "Expert Managers", value: 50, suffix: "+" },
    { label: "Worked With Brands", value: 15, suffix: "+" },
    { label: "Campaign Success Rate", value: 97, suffix: "%" },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView && ref.current) {
            const obj = { count: 0 };
            gsap.to(obj, {
                count: value,
                duration: 2,
                ease: "power2.out",
                onUpdate: () => {
                    if (ref.current) {
                        ref.current.innerText = Math.floor(obj.count) + suffix;
                    }
                },
            });
        }
    }, [isInView, value, suffix]);

    return <span ref={ref} className="text-4xl md:text-5xl font-bold text-neon-blue block mb-2">0{suffix}</span>;
};

const FloatingIcons = () => {
    const icons = [
        { Icon: FaInstagram, color: "#E1306C", x: "10%", y: "20%", delay: 0 },
        { Icon: FaTiktok, color: "#00f2ea", x: "80%", y: "15%", delay: 1 },
        { Icon: FaYoutube, color: "#FF0000", x: "15%", y: "70%", delay: 2 },
        { Icon: FaTwitter, color: "#1DA1F2", x: "85%", y: "60%", delay: 3 },
        { Icon: FaTwitch, color: "#9146FF", x: "50%", y: "85%", delay: 4 },
    ];

    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            {icons.map(({ Icon, color, x, y, delay }, index) => (
                <motion.div
                    key={index}
                    className="absolute text-4xl md:text-6xl opacity-20 blur-[1px]"
                    style={{ left: x, top: y, color }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        delay: delay,
                        ease: "easeInOut",
                    }}
                >
                    <Icon />
                </motion.div>
            ))}
        </div>
    );
};

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);

    return (
        <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-blue/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-purple/20 rounded-full blur-[120px]" />
                <FloatingIcons />
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 z-10 text-center relative">
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-tight"
                >
                    WELCOME <span className="ml-3">TO</span> <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                        EZY MEDIA
                    </span>
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-xl md:text-3xl font-bold mb-12 text-gray-300"
                >
                    LET’S MAKE IT <span className="text-neon-green">TRENDING.</span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <button className="px-8 py-4 bg-transparent border-2 border-neon-blue text-neon-blue font-bold text-lg rounded-full hover:bg-neon-blue hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_40px_rgba(0,243,255,0.6)]">
                        Start Your Campaign
                    </button>
                </motion.div>
            </div>

            {/* Stats Section */}
            <motion.div
                style={{ y: y1 }}
                className="container mx-auto px-6 mt-24 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 z-10 will-change-transform"
            >
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="glass-card p-6 rounded-2xl text-center hover:border-neon-purple transition-colors duration-300"
                    >
                        <Counter value={stat.value} suffix={stat.suffix} />
                        <p className="text-sm text-gray-400 font-medium uppercase tracking-wider">{stat.label}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
            >
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-white rounded-full" />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
