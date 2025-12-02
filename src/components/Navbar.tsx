"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }

        if (latest > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || mobileMenuOpen ? "py-4 bg-black/80 backdrop-blur-md border-b border-white/10" : "py-6 bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold tracking-tighter z-50 relative">
                    EZY <span className="text-neon-blue">MEDIA</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 items-center">
                    {["Services", "Case Studies", "Creators", "About"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase().replace(" ", "-")}`}
                            className="text-sm font-medium hover:text-neon-blue transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                    <button className="px-6 py-2 bg-neon-blue text-black font-bold rounded-full hover:bg-neon-purple hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,243,255,0.5)] hover:shadow-[0_0_20px_rgba(189,0,255,0.5)]">
                        Let's Talk
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden z-50 relative w-10 h-10 flex flex-col justify-center items-center focus:outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out my-0.5 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-out ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
                </button>

                {/* Mobile Menu Overlay */}
                <motion.div
                    initial={{ opacity: 0, x: "100%" }}
                    animate={mobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center md:hidden"
                >
                    <div className="flex flex-col space-y-8 text-center">
                        {["Services", "Case Studies", "Creators", "About"].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase().replace(" ", "-")}`}
                                className="text-2xl font-bold text-white hover:text-neon-blue transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        <button className="px-8 py-3 bg-neon-blue text-black font-bold rounded-full hover:bg-neon-purple hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                            Let's Talk
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
