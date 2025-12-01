"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaFacebookF, FaFire, FaRocket, FaChartLine, FaHeart, FaThumbsUp } from "react-icons/fa";

const PlatformStats = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-black">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Dominating <span className="text-neon-blue">Every Platform</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Our multi-platform strategy ensures your brand is seen everywhere.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Instagram */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-[#E1306C]/50 transition-colors duration-500"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <FaInstagram className="text-9xl text-[#E1306C]" />
                        </div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(225,48,108,0.4)]">
                                <FaInstagram className="text-3xl text-white" />
                            </div>

                            <h3 className="text-3xl font-bold mb-2">750M+</h3>
                            <p className="text-gray-400 mb-8">Average Campaign Reach</p>

                            {/* Animated Bar */}
                            <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-8">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, ease: "circOut" }}
                                    className="h-full bg-gradient-to-r from-[#833AB4] to-[#FCAF45]"
                                />
                            </div>

                            {/* Floating Emojis */}
                            <div className="absolute top-1/2 right-4 flex flex-col gap-4 pointer-events-none">
                                {[FaFire, FaRocket, FaChartLine].map((Icon, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                                    >
                                        <Icon className="text-[#E1306C] text-xl" />
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {["Reels Boost", "Influencer Collabs", "Trending Campaigns"].map((tag) => (
                                    <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium border border-white/10 text-gray-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* YouTube */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-[#FF0000]/50 transition-colors duration-500"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <FaYoutube className="text-9xl text-[#FF0000]" />
                        </div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-full bg-[#FF0000] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(255,0,0,0.4)]">
                                <FaYoutube className="text-3xl text-white" />
                            </div>

                            <h3 className="text-3xl font-bold mb-2">250M+</h3>
                            <p className="text-gray-400 mb-8">Average Campaign Reach</p>

                            {/* Animated Line Chart */}
                            <div className="h-16 mb-8 relative flex items-end">
                                <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                                    <motion.path
                                        d="M0 40 Q 25 40, 35 20 T 70 10 T 100 0"
                                        fill="none"
                                        stroke="#FF0000"
                                        strokeWidth="3"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5 }}
                                    />
                                    <motion.circle
                                        cx="100" cy="0" r="3" fill="#fff"
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ delay: 1.5 }}
                                    />
                                </svg>
                            </div>

                            {/* Video Frame Mockup */}
                            <div className="absolute bottom-20 right-4 w-24 h-16 border-2 border-[#FF0000]/30 rounded-lg bg-black/50 backdrop-blur-sm flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center">
                                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[8px] border-l-white border-b-[4px] border-b-transparent ml-1" />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {["Organic Growth", "Creator Shorts", "Viral Boost"].map((tag) => (
                                    <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium border border-white/10 text-gray-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Facebook */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:border-[#1877F2]/50 transition-colors duration-500"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <FaFacebookF className="text-9xl text-[#1877F2]" />
                        </div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 rounded-full bg-[#1877F2] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(24,119,242,0.4)]">
                                <FaFacebookF className="text-3xl text-white" />
                            </div>

                            <h3 className="text-3xl font-bold mb-2">300M+</h3>
                            <p className="text-gray-400 mb-8">Average Campaign Reach</p>

                            {/* Animated Donut Chart */}
                            <div className="relative w-24 h-24 mb-6 mx-auto">
                                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                    <circle cx="50" cy="50" r="40" stroke="#333" strokeWidth="8" fill="none" />
                                    <motion.circle
                                        cx="50" cy="50" r="40"
                                        stroke="#1877F2" strokeWidth="8" fill="none"
                                        strokeDasharray="251.2"
                                        strokeDashoffset="251.2"
                                        initial={{ strokeDashoffset: 251.2 }}
                                        whileInView={{ strokeDashoffset: 50 }} // ~80%
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center font-bold text-sm">80%</div>
                            </div>

                            {/* Popping Reactions */}
                            <div className="absolute top-1/2 left-4 flex flex-col gap-2 pointer-events-none">
                                {[FaHeart, FaThumbsUp, FaFire].map((Icon, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: [0, 1.2, 1] }}
                                        transition={{ delay: 0.5 + i * 0.2, ease: "easeInOut", duration: 0.5 }}
                                        className="text-[#1877F2]"
                                    >
                                        <Icon />
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {["Ad Conversions", "Community Boost", "Targeted Reach"].map((tag) => (
                                    <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs font-medium border border-white/10 text-gray-300">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PlatformStats;
