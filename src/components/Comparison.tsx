"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaArrowUp, FaChartLine, FaRegSadTear, FaRegSmileBeam } from "react-icons/fa";

const Comparison = () => {
    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
                        The <span className="text-neon-blue">EZY MEDIA</span> Effect
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                        We transform your digital presence with creator-powered, data-driven campaigns.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
                    {/* Before */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-card p-6 md:p-8 rounded-3xl border-l-4 border-gray-600 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <FaRegSadTear className="text-7xl md:text-9xl" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-gray-400">Before EZY MEDIA</h3>

                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between mb-2 text-sm text-gray-500">
                                    <span>Reach</span>
                                    <span>Low</span>
                                </div>
                                <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "20%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                        className="h-full bg-gray-600 rounded-full"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2 text-sm text-gray-500">
                                    <span>Engagement</span>
                                    <span>Stagnant</span>
                                </div>
                                <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "15%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: 0.3 }}
                                        className="h-full bg-gray-600 rounded-full"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-800">
                                <div className="flex items-center text-gray-500 gap-2">
                                    <FaChartLine className="rotate-180 text-red-500" />
                                    <span>Dull Analytics</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* After */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-card p-6 md:p-8 rounded-3xl border-l-4 border-neon-green relative overflow-hidden group will-change-transform"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <FaRegSmileBeam className="text-7xl md:text-9xl text-neon-green" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-white">After <span className="text-neon-green">EZY MEDIA</span></h3>

                        <div className="space-y-6 relative z-10">
                            <div>
                                <div className="flex justify-between mb-2 text-sm text-neon-green">
                                    <span>Reach</span>
                                    <span>Explosive</span>
                                </div>
                                <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "95%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-neon-green to-neon-blue rounded-full relative"
                                    >
                                        <div className="absolute top-0 right-0 bottom-0 w-full animate-pulse bg-white/30" />
                                    </motion.div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2 text-sm text-neon-green">
                                    <span>Engagement</span>
                                    <span>Viral</span>
                                </div>
                                <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "88%" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                                        className="h-full bg-gradient-to-r from-neon-green to-neon-blue rounded-full relative"
                                    >
                                        <div className="absolute top-0 right-0 bottom-0 w-full animate-pulse bg-white/30" />
                                    </motion.div>
                                </div>
                            </div>

                            {/* Glowing Graph Line Overlay */}
                            <div className="absolute bottom-20 left-0 right-0 h-24 pointer-events-none opacity-30">
                                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                                    <motion.path
                                        d="M0 50 C 20 40, 40 45, 50 25 S 80 10, 100 5"
                                        fill="none"
                                        stroke="url(#gradient)"
                                        strokeWidth="2"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#00ff9d" />
                                            <stop offset="100%" stopColor="#00f3ff" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>

                            <div className="pt-4 border-t border-gray-800">
                                <div className="flex items-center text-neon-green gap-2 font-bold">
                                    <FaArrowUp className="animate-bounce" />
                                    <span>Boosted Reach & ROI</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Comparison;
