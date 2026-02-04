'use client';

import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';

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
        role: "Managing Partner",
        meta: "21 Years · Lucknow",
        initials: "VS",
        type: "initials",
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
                                    {leader.type === 'image' ? (
                                        <Image
                                            src={leader.image || ''}
                                            alt={leader.name}
                                            width={144}
                                            height={144}
                                            className="w-full h-full object-cover filter contrast-[1.05]"
                                        />
                                    ) : (
                                        <span className="text-3xl font-bold text-gray-500">{leader.initials}</span>
                                    )}
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

                {/* 3D Bubble CTA */}
                <div className="mt-20 flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative px-12 py-5 bg-gradient-to-b from-white to-gray-200 text-black font-extrabold uppercase tracking-widest text-sm rounded-full shadow-[0_10px_30px_-10px_rgba(255,255,255,0.3),inset_0_-4px_4px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_40px_-10px_rgba(255,255,255,0.4),inset_0_-4px_4px_rgba(0,0,0,0.1)] transition-all duration-300 group"
                    >
                        <span className="relative z-10">Book a Growth Call</span>
                        {/* Bubble Shine */}
                        <div className="absolute top-2 left-6 right-6 h-[40%] bg-gradient-to-b from-white/80 to-transparent rounded-full opacity-60 pointer-events-none" />
                    </motion.button>
                </div>

            </div>
        </section>
    );
}
