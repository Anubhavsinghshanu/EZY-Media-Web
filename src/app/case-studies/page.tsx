"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FaArrowRight, FaTrophy } from "react-icons/fa";

const CASE_STUDIES = [
    {
        brand: "Winadda",
        metric: "15M+ Impressions",
        result: "300% ROAS",
        description: "A full-scale influencer campaign that dominated the gaming niche for 3 consecutive months.",
        color: "from-blue-600 to-cyan-500",
        tags: ["Gaming", "Influencer Marketing"]
    },
    {
        brand: "Fun88",
        metric: "5M+ Reach",
        result: "Viral Trend",
        description: "Created a signature dance challenge that went viral on Instagram Reels with over 50k user submissions.",
        color: "from-purple-600 to-pink-500",
        tags: ["Sports", "Social Media Virality"]
    },
    {
        brand: "Mostbet",
        metric: "2M+ App Installs",
        result: "High Intent Ops",
        description: "Leveraged premium tech influencers to drive massive app downloads and registered user base.",
        color: "from-green-600 to-emerald-500",
        tags: ["Gambling", "Performance Ads"]
    },
    {
        brand: "Zomato (Regional)",
        metric: "1M+ Interactions",
        result: "Local Hype",
        description: "Micro-influencer campaign targeting tier-2 cities to boost platform adoption and order volume.",
        color: "from-red-600 to-orange-500",
        tags: ["FoodTech", "Micro-Influencers"]
    }
];

export default function CaseStudiesPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-20"
                    >
                        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase text-white">
                            Case <span className="text-cyan-400">Studies</span>
                        </h1>
                        <p className="text-gray-400 text-xl max-w-2xl mx-auto font-medium">
                            Real results for real brands. We deliver impact that you can measure.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {CASE_STUDIES.map((study, index) => (
                            <motion.div
                                key={study.brand}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative bg-[#0F0F0F] rounded-[2rem] border border-white/5 p-10 overflow-hidden hover:border-white/10 transition-all duration-500"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${study.color} blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity`} />

                                <div className="relative z-10">
                                    <div className="flex gap-2 mb-6">
                                        {study.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-white/5 rounded-full text-[10px] uppercase font-bold tracking-widest text-gray-400 border border-white/5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="text-3xl md:text-5xl font-black italic mb-2 tracking-tighter group-hover:text-cyan-400 transition-colors uppercase">{study.brand}</h3>
                                    <p className="text-gray-400 mb-10 text-lg leading-relaxed max-w-md">
                                        {study.description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-6 mb-10 pt-6 border-t border-white/5">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Impact</p>
                                            <p className="text-2xl font-black text-white">{study.metric}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Success</p>
                                            <p className="text-2xl font-black text-cyan-400">{study.result}</p>
                                        </div>
                                    </div>

                                    <button className="flex items-center gap-3 text-white font-black uppercase text-xs tracking-[0.2em] group-hover:gap-5 transition-all">
                                        Read Full Success Story <FaArrowRight className="text-cyan-400" />
                                    </button>
                                </div>

                                <div className="absolute bottom-[-20%] right-[-10%] opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none">
                                    <FaTrophy size={300} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
