"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function TermsPage() {
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
                        Terms of <span className="text-cyan-400">Service</span>
                    </motion.h1>
                    <div className="space-y-8 text-gray-400 leading-relaxed text-lg">
                        <section>
                            <h2 className="text-white font-bold text-2xl mb-4 uppercase">1. Acceptance of Terms</h2>
                            <p>By accessing or using EZY Media's services, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services.</p>
                        </section>
                        <section>
                            <h2 className="text-white font-bold text-2xl mb-4 uppercase">2. Services Description</h2>
                            <p>EZY Media provides influencer marketing, campaign strategy, and content creation services. We reserve the right to modify or discontinue any service at any time.</p>
                        </section>
                        <section>
                            <h2 className="text-white font-bold text-2xl mb-4 uppercase">3. User Responsibilities</h2>
                            <p>You are responsible for providing accurate information for campaigns and ensuring that your content complies with all applicable laws and regulations.</p>
                        </section>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
