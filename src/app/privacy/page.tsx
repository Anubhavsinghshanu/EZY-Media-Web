"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black mb-10 tracking-tighter uppercase italic"
                    >
                        Privacy <span className="text-cyan-400">Policy</span>
                    </motion.h1>
                    <div className="space-y-8 text-gray-400 leading-relaxed text-lg">
                        <section>
                            <h2 className="text-white font-bold text-2xl mb-4 uppercase">1. Information We Collect</h2>
                            <p>We collect information you provide directly to us, such as when you create an account, fill out a form, or communicate with us. This may include your name, email address, company name, and campaign details.</p>
                        </section>
                        <section>
                            <h2 className="text-white font-bold text-2xl mb-4 uppercase">2. How We Use Information</h2>
                            <p>We use the information we collect to provide, maintain, and improve our services, develop new ones, and protect EZY Media and our users. We also use the information to communicate with you about your projects and campaign strategies.</p>
                        </section>
                        <section>
                            <h2 className="text-white font-bold text-2xl mb-4 uppercase">3. Data Sharing</h2>
                            <p>We do not share your personal information with companies, organizations, or individuals outside of EZY Media except in specific cases like your consent or for legal reasons.</p>
                        </section>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
