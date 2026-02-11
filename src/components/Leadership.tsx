'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaRocket, FaHandshake, FaCalendarAlt } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const LEADERS = [
    {
        name: "Anubhav Singh Shanu",
        role: "Founder & Strategist",
        meta: "21 Years · Varanasi",
        image: "/assets/founder_shanu_v2.jpg",
        type: "image",
        borderColor: "border-cyan-500/50",
        shadowColor: "shadow-[0_0_40px_-10px_rgba(6,182,212,0.2)]",
        points: [
            "Worked with more than 10+ brands",
            "Managed 2000+ creators",
            "Leading from 2+ years"
        ]
    },
    {
        name: "Vishal Singh",
        role: "Strategic Partner",
        meta: "21 Years · Lucknow",
        image: "/assets/partner_vishal.jpg",
        type: "image",
        borderColor: "border-purple-500/50",
        shadowColor: "shadow-[0_0_40px_-10px_rgba(168,85,247,0.2)]",
        points: [
            "Strategy expert",
            "Managed 30+ campaigns",
            "Boosted performance across multiple launches"
        ]
    }
];

export default function Leadership() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <section className="relative py-24 bg-[#050505] overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wide font-[family-name:var(--font-poppins)]">
                        The <span className="text-cyan-400">Architects</span> of EZY Media
                    </h2>
                </div>

                {/* Square Boxes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto">
                    {LEADERS.map((leader, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            className={`group md:aspect-square relative bg-[#0A0A0A] rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center text-center border-2 ${leader.borderColor} ${leader.shadowColor} hover:scale-[1.02] transition-transform duration-500`}
                        >
                            {/* Profile Visual */}
                            <div className="mb-6 shrink-0 relative">
                                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden shadow-2xl border-2 border-white/5 relative bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                                    <Image
                                        src={leader.image || ''}
                                        alt={leader.name}
                                        width={144}
                                        height={144}
                                        className="w-full h-full object-cover filter contrast-[1.05]"
                                    />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 flex flex-col items-center w-full">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 tracking-tight">{leader.name}</h3>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{leader.role}</p>
                                <p className="text-[10px] text-gray-600 font-medium uppercase tracking-wider mb-8">{leader.meta}</p>

                                {/* Points List */}
                                <ul className="space-y-3 w-full max-w-[280px] text-left mx-auto">
                                    {leader.points.map((point, p) => (
                                        <li key={p} className="flex items-start gap-3 text-sm text-gray-400 font-medium">
                                            <FaCheckCircle className={`mt-1 shrink-0 text-xs ${i === 0 ? 'text-cyan-500' : 'text-purple-500'}`} />
                                            <span className="leading-snug">{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* 3D Bubble CTA with Options */}
                <div className="mt-20 flex flex-col items-center relative">
                    <AnimatePresence>
                        {showMenu && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute bottom-full mb-4 w-64 bg-[#0A0A0A] border border-white/10 rounded-xl p-2 shadow-2xl z-20 overflow-hidden"
                            >
                                <div className="space-y-1">
                                    <Link href="/book?type=growth" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                                        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                                            <FaRocket className="text-sm" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white">Growth Strategy</div>
                                            <div className="text-[10px] text-gray-500">For Brands</div>
                                        </div>
                                    </Link>
                                    <Link href="/book?type=creator" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                                        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                                            <FaHandshake className="text-sm" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white">Creator Partnership</div>
                                            <div className="text-[10px] text-gray-500">For Talent</div>
                                        </div>
                                    </Link>
                                    <Link href="/book?type=general" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                            <FaCalendarAlt className="text-sm" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-white">General Inquiry</div>
                                            <div className="text-[10px] text-gray-500">Support</div>
                                        </div>
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.button
                        onClick={() => setShowMenu(!showMenu)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative px-12 py-5 bg-gradient-to-b from-white to-gray-200 text-black font-extrabold uppercase tracking-widest text-sm rounded-full shadow-[0_10px_30px_-10px_rgba(255,255,255,0.3),inset_0_-4px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_40px_-10px_rgba(255,255,255,0.4),inset_0_-4px_4px_rgba(0,0,0,0.1)] transition-all duration-300 group z-10"
                    >
                        <span className="relative z-10">{showMenu ? 'Close Options' : 'Book a Growth Call'}</span>
                        {/* Bubble Shine */}
                        <div className="absolute top-2 left-6 right-6 h-[40%] bg-gradient-to-b from-white/80 to-transparent rounded-full opacity-60 pointer-events-none" />
                    </motion.button>
                </div>

            </div>
        </section>
    );
}
