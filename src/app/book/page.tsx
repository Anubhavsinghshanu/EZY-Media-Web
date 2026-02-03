"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { InlineWidget } from "react-calendly";

export default function BookPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />

            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-10"
                    >
                        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase italic">
                            Book Your <span className="text-cyan-400">Strategy</span> Call
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto uppercase tracking-widest text-xs font-bold">
                            Free 30-minute strategy call · No sales pitch
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-[#0F0F0F] border border-white/10 rounded-[2.5rem] overflow-hidden min-h-[700px] shadow-2xl relative"
                    >
                        {/* Custom Loading State for iframe */}
                        <div className="absolute inset-0 flex items-center justify-center z-0">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Loading Calendar...</p>
                            </div>
                        </div>

                        <div className="relative z-10 w-full h-full">
                            <InlineWidget
                                url="https://calendly.com/ezymedia/30min"
                                styles={{ height: "700px" }}
                                prefill={{
                                    name: "",
                                    email: "",
                                    customAnswers: {
                                        a1: ""
                                    }
                                }}
                            />
                        </div>
                    </motion.div>

                    <div className="mt-12 text-center text-gray-500 text-sm italic">
                        * Timezone auto-detected. Meeting links will be sent via email.
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
