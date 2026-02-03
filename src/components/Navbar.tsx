"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaChevronDown, FaWhatsapp, FaEnvelope, FaCalendarAlt, FaCheck, FaArrowRight } from "react-icons/fa";

// --- Data & Content ---

const NAV_ITEMS = [
    { label: "Services", href: "/services" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Creators", href: "/creators" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
];

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    // Scroll Logic
    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
            setActiveMenu(null);
        } else {
            setHidden(false);
        }

        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    const handleMouseEnter = (id: string) => {
        setActiveMenu(id);
    };

    const handleMouseLeave = () => {
        setActiveMenu(null);
    };

    return (
        <>
            <motion.nav
                variants={{
                    visible: { y: 0 },
                    hidden: { y: "-100%" },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled || mobileMenuOpen ? "py-4 bg-[#0A0A0A]/95 backdrop-blur-md border-white/5" : "py-6 bg-transparent border-transparent"
                    }`}
                onMouseLeave={handleMouseLeave}
            >
                <div className="container mx-auto px-6 flex justify-between items-center relative">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold tracking-tighter z-50 relative group">
                        EZY <span className="text-cyan-400 group-hover:text-cyan-300 transition-colors">MEDIA</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-1">
                        {NAV_ITEMS.map((item) => (
                            <div
                                key={item.href}
                                className="relative"
                                onMouseEnter={() => handleMouseEnter(item.href)}
                            >
                                <Link
                                    href={item.href}
                                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center gap-1 ${activeMenu === item.href ? "text-white opacity-100" : "text-gray-400 hover:text-white"}`}
                                >
                                    {item.label}
                                    <FaChevronDown className={`text-[10px] transition-transform duration-300 ${activeMenu === item.href ? "rotate-180 text-cyan-400" : ""}`} />
                                </Link>

                                {/* Dropdown Content */}
                                <AnimatePresence>
                                    {activeMenu === item.href && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max bg-[#0F0F0F] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/50 z-50"
                                        >
                                            {/* Mega Menu Content Logic */}
                                            {item.href === "/services" && <ServicesMenu />}
                                            {item.href === "/case-studies" && <CaseStudiesMenu />}
                                            {item.href === "/creators" && <CreatorsMenu />}
                                            {item.href === "/about" && <AboutMenu />}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setModalOpen(true)}
                            className="hidden md:block px-6 py-2.5 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Let's Talk
                        </button>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden z-50 relative w-10 h-10 flex flex-col justify-center items-center focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
                            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out my-0.5 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="fixed inset-0 bg-[#0A0A0A] z-40 flex flex-col pt-24 px-8 md:hidden overflow-y-auto"
                        >
                            <div className="flex flex-col space-y-6">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="border-b border-white/5 pb-4"
                                    >
                                        <div className="text-xl font-bold text-white mb-1">{item.label}</div>
                                        <div className="text-xs text-gray-500">Go to {item.label}</div>
                                    </Link>
                                ))}
                                <button
                                    onClick={() => { setModalOpen(true); setMobileMenuOpen(false); }}
                                    className="w-full py-4 bg-white text-black font-bold uppercase tracking-wider rounded-lg mt-8"
                                >
                                    Let's Talk
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                        onClick={() => setModalOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[#0F0F0F] w-full max-w-sm rounded-2xl border border-white/10 p-6 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500" />

                            <h3 className="text-2xl font-bold text-white mb-2">Let's Connect</h3>
                            <p className="text-gray-400 text-sm mb-6">Choose how you'd like to reach us.</p>

                            <div className="space-y-3 mb-6">
                                <Link
                                    href="/book"
                                    onClick={() => setModalOpen(false)}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyan-500/30 transition-all group shadow-sm hover:shadow-cyan-900/10"
                                >
                                    <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                                        <FaCalendarAlt />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-bold text-white">Book a Strategy Call</div>
                                        <div className="text-xs text-gray-500">Free 30-min strategy call · No sales pitch</div>
                                    </div>
                                    <FaArrowRight className="text-gray-600 group-hover:text-white transition-colors text-xs" />
                                </Link>

                                <a href="https://wa.me/919919119691" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-green-500/30 transition-all group shadow-sm hover:shadow-green-900/10">
                                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 group-hover:scale-105 transition-transform">
                                        <FaWhatsapp />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-bold text-white">WhatsApp</div>
                                        <div className="text-xs text-gray-500">Fastest response</div>
                                    </div>
                                    <FaArrowRight className="text-gray-600 group-hover:text-white transition-colors text-xs" />
                                </a>

                                <a href="mailto:contact@ezymedia.in?subject=Inquiry – EZY Media Collaboration" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/30 transition-all group shadow-sm hover:shadow-blue-900/10">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                                        <FaEnvelope />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-bold text-white">Email Us</div>
                                        <div className="text-xs text-gray-500">contact@ezymedia.in</div>
                                    </div>
                                    <FaArrowRight className="text-gray-600 group-hover:text-white transition-colors text-xs" />
                                </a>
                            </div>

                            {/* Direct Contact Strip */}
                            <div className="pt-4 border-t border-white/10">
                                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3 text-center">Prefer direct contact?</p>
                                <div className="flex justify-between text-xs text-gray-400 font-medium px-2">
                                    <a href="mailto:hello@ezymedia.com" className="hover:text-white transition-colors">hello@ezymedia.com</a>
                                    <a href="tel:+919919119691" className="hover:text-white transition-colors">+91 99191 19691</a>
                                </div>
                            </div>

                            <button
                                onClick={() => setModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors text-xl font-bold"
                            >
                                &times;
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// --- Dynamic Mega Menus ---

function ServicesMenu() {
    return (
        <div className="flex w-[600px] p-6 gap-8">
            <div className="flex-1 grid grid-cols-2 gap-y-6 gap-x-8">
                <div>
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2"><span className="w-1 h-4 bg-cyan-500 rounded-full"></span>Music</h4>
                    <ul className="space-y-2">
                        <Link href="/services" className="block text-sm text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors">Spotify Growth</Link>
                        <Link href="/services" className="block text-sm text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors">YouTube Marketing</Link>
                        <Link href="/services" className="block text-sm text-gray-400 hover:text-cyan-400 cursor-pointer transition-colors">Reels Virality</Link>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2"><span className="w-1 h-4 bg-purple-500 rounded-full"></span>Creators</h4>
                    <ul className="space-y-2">
                        <Link href="/services" className="block text-sm text-gray-400 hover:text-purple-400 cursor-pointer transition-colors">Content Strategy</Link>
                        <Link href="/services" className="block text-sm text-gray-400 hover:text-purple-400 cursor-pointer transition-colors">Audience Growth</Link>
                        <Link href="/services" className="block text-sm text-gray-400 hover:text-purple-400 cursor-pointer transition-colors">Monetization</Link>
                    </ul>
                </div>
            </div>

            {/* Right Panel - Trust */}
            <div className="w-[180px] bg-white/5 rounded-lg p-4 flex flex-col justify-center border border-white/5">
                <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2">
                        <FaCheck className="text-cyan-500 text-xs" />
                        <span className="text-[10px] text-gray-300 font-medium">15+ Brands</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaCheck className="text-cyan-500 text-xs" />
                        <span className="text-[10px] text-gray-300 font-medium">3000+ Creators</span>
                    </div>
                </div>
                <Link href="/book" className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-[10px] font-bold uppercase rounded hover:opacity-90 transition-opacity text-center">
                    Book Call
                </Link>
            </div>
        </div>
    );
}

function CaseStudiesMenu() {
    return (
        <div className="flex w-[700px] p-6 gap-4">
            {[
                { title: "Music Launch", metric: "15M+ Impressions", result: "Viral on Reels", brand: "Winadda" },
                { title: "Brand Campaign", metric: "300% ROAS", result: "Lead Gen", brand: "Fun88" },
                { title: "Creator Growth", metric: "500M+ Reach", result: "Global Impact", brand: "Mostbet" }
            ].map((card, i) => (
                <Link href="/case-studies" key={i} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 p-4 rounded-xl transition-all cursor-pointer group">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">{card.brand}</div>
                    <div className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{card.metric}</div>
                    <div className="text-sm text-gray-400">{card.result}</div>
                </Link>
            ))}
        </div>
    );
}

function CreatorsMenu() {
    return (
        <div className="w-[200px] py-2">
            {[
                { label: "Top Creators", desc: "Our managed talent" },
                { label: "Success Stories", desc: "Creator ROI" },
                { label: "Join Network", desc: "Become a partner" }
            ].map((item, i) => (
                <Link href="/creators" key={i} className="px-6 py-3 hover:bg-white/5 cursor-pointer flex flex-col">
                    <span className="text-sm font-bold text-white mb-0.5">{item.label}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">{item.desc}</span>
                </Link>
            ))}
        </div>
    );
}

function AboutMenu() {
    return (
        <div className="w-[240px] p-4">
            <div className="space-y-1 mb-4">
                {["Our Vision", "Leadership", "Contact"].map((link) => (
                    <Link
                        key={link}
                        href={link === "Contact" ? "/contact" : "/about"}
                        className="block px-4 py-2 hover:bg-white/5 rounded-lg text-sm text-gray-300 hover:text-white cursor-pointer transition-colors font-medium"
                    >
                        {link}
                    </Link>
                ))}
            </div>
            <div className="pt-3 border-t border-white/10 px-4">
                <p className="text-[10px] text-gray-600 font-medium uppercase tracking-widest">Built in India.<br />Working globally.</p>
            </div>
        </div>
    );
}
