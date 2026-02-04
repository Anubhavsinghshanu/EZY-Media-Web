"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaTwitter, FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

const CREATORS = [
    { name: "Aman Kalra", category: "Entertainment", reach: "5M+", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop", platform: "Instagram" },
    { name: "Rishabh Chawla", category: "Lifestyle", reach: "2M+", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", platform: "YouTube" },
    { name: "Sana Khan", category: "Fashion", reach: "3.5M+", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop", platform: "Instagram" },
    { name: "Vikram Singh", category: "Tech", reach: "1.2M+", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", platform: "Twitter" },
    { name: "Nisha Gupta", category: "Comedy", reach: "4M+", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop", platform: "Instagram" },
    { name: "Arjun Reddy", category: "Gaming", reach: "8M+", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop", platform: "YouTube" },
];

export default function CreatorsPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
                            Our <span className="text-cyan-400">Creators</span>
                        </h1>
                        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                            The most influential voices in the digital space, managed by EZY Media.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {CREATORS.map((creator, index) => (
                            <motion.div
                                key={creator.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative bg-[#0F0F0F] rounded-3xl border border-white/5 overflow-hidden hover:border-cyan-500/30 transition-all duration-500 shadow-2xl shadow-black/50"
                            >
                                <div className="aspect-square relative overflow-hidden">
                                    <Image
                                        src={creator.image}
                                        alt={creator.name}
                                        width={400}
                                        height={400}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                    <div className="absolute bottom-6 left-6 right-6">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-2xl font-bold">{creator.name}</h3>
                                            <FaCheckCircle className="text-cyan-400 text-sm" />
                                        </div>
                                        <p className="text-gray-400 text-sm font-medium mb-4">{creator.category} • {creator.reach} Reach</p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-3 text-gray-400">
                                                {creator.platform === "Instagram" && <FaInstagram className="hover:text-pink-500 transition-colors cursor-pointer" />}
                                                {creator.platform === "YouTube" && <FaYoutube className="hover:text-red-500 transition-colors cursor-pointer" />}
                                                {creator.platform === "Twitter" && <FaTwitter className="hover:text-blue-400 transition-colors cursor-pointer" />}
                                            </div>
                                            <button className="px-5 py-2 bg-white/10 hover:bg-cyan-500 text-white text-xs font-bold uppercase rounded-full transition-all duration-300 backdrop-blur-md">
                                                Collaborate
                                            </button>
                                        </div>
                                    </div>
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
