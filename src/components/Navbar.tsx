"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "py-4 bg-black/50 backdrop-blur-md border-b border-white/10" : "py-6 bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold tracking-tighter">
                    EZY <span className="text-neon-blue">MEDIA</span>
                </Link>

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
            </div>
        </motion.nav>
    );
};

export default Navbar;
