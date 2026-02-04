"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FaRocket, FaShieldAlt, FaChartLine, FaUsers, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const SERVICES = [
    {
        title: "Influencer Marketing",
        description: "Connect with 3000+ handpicked creators to reach millions of potential customers globally.",
        icon: FaUsers,
        color: "from-cyan-500 to-blue-500",
        features: ["Creator Selection", "Campaign Management", "Real-time Tracking"]
    },
    {
        title: "Campaign Strategy",
        description: "Data-driven strategies designed to make your brand viral and trend across all social platforms.",
        icon: FaRocket,
        color: "from-purple-500 to-pink-500",
        features: ["Market Research", "Content Planning", "Performance Audit"]
    },
    {
        title: "Music Promotion",
        description: "Get your tracks heard by the right audience. We specialize in making songs go viral on Reels & Shorts.",
        icon: FaChartLine,
        color: "from-green-500 to-emerald-500",
        features: ["Viral Trends", "Radio & Playlist", "Artist Branding"]
    },
    {
        title: "Performance Marketing",
        description: "Optimized ad campaigns that deliver measurable ROI and high-quality leads for your brand.",
        icon: FaShieldAlt,
        color: "from-orange-500 to-red-500",
        features: ["ROAS Optimization", "A/B Testing", "Scalable Growth"]
    }
];

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-20"
                    >
                        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
                            Our <span className="text-cyan-400">Services</span>
                        </h1>
                        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                            Comprehensive digital solutions to scale your brand to new heights.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {SERVICES.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="group relative bg-[#0F0F0F] rounded-3xl border border-white/5 p-8 text-left hover:border-white/10 transition-all duration-500"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    <service.icon className="text-3xl text-white" />
                                </div>
                                <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                                <p className="text-gray-400 mb-8 leading-relaxed italic">
                                    {service.description}
                                </p>

                                <ul className="space-y-3 mb-10">
                                    {service.features.map(feature => (
                                        <li key={feature} className="flex items-center gap-3 text-sm text-gray-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/start-campaign"
                                    className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-xs group-hover:gap-4 transition-all"
                                >
                                    Get Started <FaArrowRight />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="mt-24 p-12 rounded-3xl bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/20 text-center"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to make it trending?</h2>
                        <Link
                            href="/start-campaign"
                            className="inline-block px-10 py-5 bg-white text-black font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform"
                        >
                            Start Your Campaign Now
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
