'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaMapMarkerAlt, FaInstagram, FaLinkedin, FaFingerprint } from 'react-icons/fa';
import React, { useRef } from 'react';

const leaders = [
    {
        name: "Vishal Singh",
        role: "Managing Partner",
        location: "Lucknow, IN",
        initials: "VS",
        gradient: "from-emerald-900 via-emerald-600 to-amber-400",
        shadowColor: "shadow-emerald-500/20",
        bio: "Driving the strategic vision. Orchestrating massive campaigns with precision and building the network that powers our reach.",
        tag: "Strategy"
    },
    {
        name: "Anubhav Singh Shanu",
        role: "Managing Partner",
        location: "Varanasi, IN",
        initials: "AS",
        gradient: "from-indigo-900 via-violet-600 to-fuchsia-400",
        shadowColor: "shadow-violet-500/20",
        bio: "Engineering the digital future. Building scalable tech ecosystems that redefine how brands connect with creators.",
        tag: "Innovation"
    }
];

function TiltCard({ leader, index }: { leader: any, index: number }) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`relative h-[550px] w-full rounded-[30px] bg-[#050505] border border-white/5 group perspective-1000 cursor-pointer hover:shadow-2xl ${leader.shadowColor} transition-shadow duration-500`}
        >
            {/* Inner Content with Depth */}
            <div
                style={{ transform: "translateZ(50px)" }}
                className="absolute inset-0 p-8 flex flex-col justify-between h-full z-20"
            >
                {/* Top Section */}
                <div className="flex justify-between items-start">
                    <div className={`w-24 h-24 rounded-2xl border border-white/10 flex items-center justify-center bg-gradient-to-br ${leader.gradient} text-white text-3xl font-black tracking-tighter shadow-lg`}>
                        {leader.initials}
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5 backdrop-blur-md">
                        <FaMapMarkerAlt className="text-gray-500 text-xs" />
                        <span className="text-gray-300 text-[10px] font-bold tracking-widest uppercase">{leader.location}</span>
                    </div>
                </div>

                {/* Middle Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`h-[2px] w-12 bg-gradient-to-r ${leader.gradient}`} />
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-[0.3em]">
                            {leader.role}
                        </span>
                    </div>
                    <h3 className="text-5xl font-black text-white leading-[0.9] tracking-tight">
                        {leader.name.split(' ').map((n: string, i: number) => (
                            <span key={i} className="block">{n}</span>
                        ))}
                    </h3>
                </div>

                {/* Bottom Section */}
                <div className="space-y-8">
                    <p className="text-gray-400 text-sm leading-relaxed max-w-sm border-l-2 border-white/10 pl-4">
                        {leader.bio}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                        <div className="flex items-center gap-2 text-white/20 group-hover:text-white/60 transition-colors">
                            <FaFingerprint className="text-2xl" />
                            <span className="text-[10px] font-mono uppercase tracking-widest">{leader.tag}_ID_00{index + 1}</span>
                        </div>

                        <div className="flex gap-4">
                            <motion.a
                                whileHover={{ scale: 1.1, color: "#fff" }}
                                href="#"
                                className="text-gray-500 transition-colors"
                            >
                                <FaInstagram className="text-xl" />
                            </motion.a>
                            <motion.a
                                whileHover={{ scale: 1.1, color: "#fff" }}
                                href="#"
                                className="text-gray-500 transition-colors"
                            >
                                <FaLinkedin className="text-xl" />
                            </motion.a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Gradient Glow */}
            <div
                style={{ transform: "translateZ(-20px)" }}
                className={`absolute inset-0 bg-gradient-to-br ${leader.gradient} opacity-5 group-hover:opacity-20 transition-opacity duration-500 rounded-[30px] blur-2xl`}
            />

            {/* Glass Reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[30px] pointer-events-none z-30" />
        </motion.div>
    );
}

export default function Leadership() {
    return (
        <section className="relative py-20 overflow-hidden">
            {/* Subtle Background Texture */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Elegant Header */}
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block mb-4"
                    >
                        <span className="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase border-b border-gray-800 pb-2">
                            Executive Leadership
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-black text-white tracking-tighter"
                    >
                        THE <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">ARCHITECTS</span>
                    </motion.h2>
                </div>

                {/* 3D Tilt Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 max-w-5xl mx-auto">
                    {leaders.map((leader, index) => (
                        <TiltCard key={index} leader={leader} index={index} />
                    ))}
                </div>

                {/* Central Connection Element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[400px] bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block pointer-events-none" />
            </div>
        </section>
    );
}
