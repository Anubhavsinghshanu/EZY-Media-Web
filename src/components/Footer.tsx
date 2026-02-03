import Link from "next/link";
import { FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="text-2xl font-bold tracking-tighter block mb-4">
                            EZY <span className="text-cyan-400">MEDIA</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Premium Social Media Agency.<br />
                            Making brands trending globally.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Company</h4>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">About Us</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Services</Link></li>
                            <li><Link href="/case-studies" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Case Studies</Link></li>
                            <li><Link href="/creators" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Creators</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Contact</Link></li>
                            <li><Link href="/start-campaign" className="text-cyan-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest text-[10px] block pt-2 underline underline-offset-4">Start Campaign</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Legal</h4>
                        <ul className="space-y-2">
                            <li><Link href="/privacy" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Connect</h4>
                        <div className="flex gap-4">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-neon-purple hover:text-white transition-all duration-300">
                                <FaInstagram size={20} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-neon-blue hover:text-white transition-all duration-300">
                                <FaLinkedin size={20} />
                            </a>
                            <a href="mailto:contact@ezymedia.in" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-green-500 hover:text-white transition-all duration-300">
                                <FaEnvelope size={20} />
                            </a>
                        </div>
                        <div className="mt-4 flex flex-col gap-1">
                            <a href="mailto:contact@ezymedia.in" className="text-gray-400 hover:text-white text-sm transition-colors">
                                contact@ezymedia.in
                            </a>
                            <a href="tel:+919919119691" className="text-gray-400 hover:text-white text-sm transition-colors">
                                +91 99191 19691
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        &copy; {currentYear} EZY MEDIA. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-gray-400 uppercase tracking-widest">Operational globally</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
