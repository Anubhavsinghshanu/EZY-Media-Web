"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaPaperPlane, FaSpinner } from "react-icons/fa";
import { useState } from "react";

export default function ContactPage() {
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        // Simulate form submission
        await new Promise(r => setTimeout(r, 2000));
        setSubmitting(false);
        setSuccess(true);
    };

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
                        <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter uppercase">
                            Connect <span className="text-cyan-400">With Us</span>
                        </h1>
                        <p className="text-gray-400 text-xl max-w-2xl mx-auto font-medium">
                            Have a question? We respond within 24 hours.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
                        {/* Details */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl font-bold mb-10 italic uppercase tracking-tighter">Get in touch</h2>

                            <div className="space-y-8">
                                <a href="mailto:contact@ezymedia.in" className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                                        <FaEnvelope size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase font-bold tracking-widest text-gray-500 mb-1">Email Us</p>
                                        <p className="text-xl font-bold group-hover:text-cyan-400 transition-colors">contact@ezymedia.in</p>
                                    </div>
                                </a>

                                <a href="https://wa.me/919919119691" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-black transition-all">
                                        <FaWhatsapp size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase font-bold tracking-widest text-gray-500 mb-1">Text Us</p>
                                        <p className="text-xl font-bold group-hover:text-green-500 transition-colors">+91 99191 19691</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-purple-500">
                                        <FaMapMarkerAlt size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase font-bold tracking-widest text-gray-500 mb-1">Our Base</p>
                                        <p className="text-xl font-bold">New Delhi, India</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 p-8 rounded-3xl bg-white/5 border border-white/5">
                                <p className="text-gray-400 leading-relaxed italic">
                                    "EZY Media transformed our influencer strategy from a side-project to our main growth engine. Their turnaround time is incredible."
                                </p>
                                <div className="mt-4 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-cyan-400/20" />
                                    <span className="text-xs font-bold uppercase tracking-wider">— CEO, Winadda</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-[#0F0F0F] p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative overflow-hidden"
                        >
                            {success ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                                        <FaPaperPlane className="text-3xl text-green-500" />
                                    </div>
                                    <h3 className="text-3xl font-bold italic uppercase tracking-tighter">Message Sent!</h3>
                                    <p className="text-gray-400">Thanks for contacting EZY Media. We respond within 24 hours.</p>
                                    <button onClick={() => setSuccess(false)} className="text-cyan-400 font-bold uppercase tracking-widest text-xs hover:underline">Send another message</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase font-bold tracking-widest text-gray-500 ml-1">Name</label>
                                            <input required type="text" placeholder="John Doe" className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-colors" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs uppercase font-bold tracking-widest text-gray-500 ml-1">Email</label>
                                            <input required type="email" placeholder="john@company.com" className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-colors" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs uppercase font-bold tracking-widest text-gray-500 ml-1">Brand / Company</label>
                                        <input required type="text" placeholder="Your Brand Name" className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-colors" />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs uppercase font-bold tracking-widest text-gray-500 ml-1">Message</label>
                                        <textarea required rows={4} placeholder="Tell us how we can help..." className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-cyan-500/50 transition-colors resize-none" />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-cyan-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
                                    >
                                        {submitting ? <><FaSpinner className="animate-spin" /> Sending...</> : "Submit Inquiry"}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
