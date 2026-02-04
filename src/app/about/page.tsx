"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FaUsers, FaGlobe, FaAward, FaEye } from "react-icons/fa";
import Image from "next/image";

const STATS = [
    { label: "Active Creators", value: "3000+", icon: FaUsers },
    { label: "Brands Partnered", value: "15+", icon: FaAward },
    { label: "Total Reach", value: "500M+", icon: FaEye },
    { label: "Campaigns Executed", value: "100+", icon: FaGlobe },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-24"
                    >
                        <h1 className="text-4xl md:text-8xl font-black mb-6 tracking-tighter uppercase">
                            Who is <span className="text-cyan-400">EZY MEDIA?</span>
                        </h1>
                        <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
                            We are a premium social media agency dedicated to bridging the gap between innovative brands and visionary creators.
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-32">
                        {STATS.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-[#0F0F0F] border border-white/5 p-8 rounded-[2rem] text-center"
                            >
                                <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-cyan-400">
                                    <stat.icon size={24} />
                                </div>
                                <h3 className="text-4xl font-black mb-1">{stat.value}</h3>
                                <p className="text-gray-500 text-xs uppercase font-bold tracking-widest">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                        >
                            <h2 className="text-4xl md:text-6xl font-black mb-8 italic uppercase tracking-tighter">Our Vision</h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                In a world drowned in noise, we help you sing. EZY Media was founded on a simple principle: ROI-driven creativity. We don&apos;t just chase likes; we chase impact.
                            </p>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Our network of creators spans across Entertainment, Gaming, Finance, and Lifestyle, ensuring that no matter your niche, we have the voice to tell your story.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="aspect-square relative rounded-[3rem] overflow-hidden border border-white/10"
                        >
                            <Image
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop"
                                alt="Team Ezy Media"
                                width={800}
                                height={800}
                                className="w-full h-full object-cover grayscale"
                            />
                            <div className="absolute inset-0 bg-cyan-400/10 mix-blend-overlay" />
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
