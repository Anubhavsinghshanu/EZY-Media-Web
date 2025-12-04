'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaInstagram, FaSearch, FaArrowLeft, FaPaperPlane, FaWifi, FaBatteryFull } from 'react-icons/fa';
import { FaSignal } from 'react-icons/fa6';

export default function PhoneDemo() {
    const [step, setStep] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [messageSent, setMessageSent] = useState(false);

    // Animation Sequence Controller
    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const runSequence = async () => {
            // Step 0: Home Screen (Wait 1s)
            if (step === 0) {
                setTypedText('');
                setMessageSent(false);
                timeout = setTimeout(() => setStep(1), 1500);
            }

            // Step 1: Search Typing (Type "Ezy Media")
            else if (step === 1) {
                const text = "Ezy Media";
                let currentText = "";
                for (let i = 0; i < text.length; i++) {
                    await new Promise(r => setTimeout(r, 100));
                    currentText += text[i];
                    setTypedText(currentText);
                }
                await new Promise(r => setTimeout(r, 600)); // Wait after typing
                setStep(2); // Go to Profile
            }

            // Step 2: Profile (Wait then click Message)
            else if (step === 2) {
                timeout = setTimeout(() => setStep(3), 1500);
            }

            // Step 3: Chat (Type Message)
            else if (step === 3) {
                setTypedText('');
                await new Promise(r => setTimeout(r, 500));
                const msg = "I need promotion sir";
                let currentMsg = "";
                for (let i = 0; i < msg.length; i++) {
                    await new Promise(r => setTimeout(r, 80));
                    currentMsg += msg[i];
                    setTypedText(currentMsg);
                }
                await new Promise(r => setTimeout(r, 400));
                setMessageSent(true); // Send Message
                await new Promise(r => setTimeout(r, 2000)); // Show sent state
                setStep(0); // Restart
            }
        };

        runSequence();

        return () => clearTimeout(timeout);
    }, [step]);

    return (
        <div className="relative w-[280px] h-[550px] bg-black rounded-[40px] border-[8px] border-[#1a1a1a] shadow-2xl overflow-hidden mx-auto">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-50" />

            {/* Status Bar */}
            <div className="absolute top-2 left-6 right-6 flex justify-between items-center z-40 text-white text-[10px]">
                <span>9:41</span>
                <div className="flex gap-1">
                    <FaSignal />
                    <FaWifi />
                    <FaBatteryFull />
                </div>
            </div>

            {/* Content Container */}
            <div className="relative w-full h-full bg-black text-white pt-8">
                <AnimatePresence mode="wait">

                    {/* STEP 0: HOME SCREEN */}
                    {step === 0 && (
                        <motion.div
                            key="home"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="w-full h-full flex flex-col items-center justify-center gap-8"
                        >
                            <div className="grid grid-cols-4 gap-4 px-4">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="w-12 h-12 bg-gray-800 rounded-xl" />
                                ))}
                                {/* Instagram Icon */}
                                <motion.div
                                    className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-xl flex items-center justify-center relative z-10"
                                    animate={{ scale: [1, 0.9, 1] }}
                                    transition={{ delay: 1, duration: 0.3 }}
                                >
                                    <FaInstagram className="text-2xl text-white" />
                                    {/* Finger Tap Simulation */}
                                    <motion.div
                                        className="absolute w-8 h-8 bg-white/30 rounded-full"
                                        initial={{ opacity: 0, scale: 2 }}
                                        animate={{ opacity: [0, 1, 0], scale: [2, 1, 2] }}
                                        transition={{ delay: 1, duration: 0.4 }}
                                    />
                                </motion.div>
                                {[...Array(3)].map((_, i) => (
                                    <div key={i + 20} className="w-12 h-12 bg-gray-800 rounded-xl" />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 1: SEARCH SCREEN */}
                    {step === 1 && (
                        <motion.div
                            key="search"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="w-full h-full px-4 pt-4"
                        >
                            {/* Search Bar */}
                            <div className="w-full h-10 bg-[#262626] rounded-lg flex items-center px-3 gap-2 mb-4">
                                <FaSearch className="text-gray-400 text-sm" />
                                <span className="text-sm text-white">{typedText}<span className="animate-pulse">|</span></span>
                            </div>

                            {/* Search Results */}
                            <div className="space-y-4">
                                {typedText.length > 3 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-3 p-2 bg-[#1a1a1a] rounded-lg border border-white/10"
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center font-bold text-xs">EM</div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold flex items-center gap-1">Ezy Media <span className="text-blue-400 text-[10px]">✅</span></p>
                                            <p className="text-xs text-gray-400">Marketing Agency</p>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Keyboard Placeholder */}
                            <motion.div
                                initial={{ y: 200 }}
                                animate={{ y: 0 }}
                                className="absolute bottom-0 left-0 right-0 h-[220px] bg-[#1c1c1e] rounded-t-2xl p-2 grid grid-cols-10 gap-1 content-start"
                            >
                                {[...Array(26)].map((_, i) => (
                                    <div key={i} className="h-10 bg-[#454545] rounded flex items-center justify-center text-white text-sm">
                                        {String.fromCharCode(65 + i)}
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}

                    {/* STEP 2: PROFILE SCREEN */}
                    {step === 2 && (
                        <motion.div
                            key="profile"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="w-full h-full bg-black"
                        >
                            {/* Header */}
                            <div className="flex items-center gap-4 p-4 border-b border-white/10">
                                <FaArrowLeft className="text-white" />
                                <span className="font-bold">ezy_media_official</span>
                            </div>

                            {/* Profile Info */}
                            <div className="p-4 flex gap-6 items-center">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full p-0.5">
                                    <div className="w-full h-full bg-black rounded-full border-2 border-transparent flex items-center justify-center font-bold text-xl">EM</div>
                                </div>
                                <div className="flex gap-4 text-center">
                                    <div><p className="font-bold">3,500</p><p className="text-xs text-gray-400">Followers</p></div>
                                    <div><p className="font-bold">50</p><p className="text-xs text-gray-400">Following</p></div>
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="px-4 mb-4">
                                <p className="font-bold text-sm">EZY MEDIA | Marketing Agency</p>
                                <p className="text-xs text-gray-300">🚀 India's #1 Creator Agency</p>
                                <p className="text-xs text-gray-300">📈 200M+ Reach Delivered</p>
                            </div>

                            {/* Buttons */}
                            <div className="px-4 flex gap-2">
                                <div className="flex-1 bg-[#262626] py-1.5 rounded-lg text-center text-sm font-bold">Follow</div>
                                <motion.div
                                    className="flex-1 bg-blue-500 py-1.5 rounded-lg text-center text-sm font-bold relative overflow-hidden"
                                    animate={{ scale: [1, 0.95, 1] }}
                                    transition={{ delay: 1, duration: 0.2 }}
                                >
                                    Message
                                    {/* Tap Effect */}
                                    <motion.div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/30"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ delay: 1, duration: 0.3 }}
                                    />
                                </motion.div>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: CHAT SCREEN */}
                    {step === 3 && (
                        <motion.div
                            key="chat"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="w-full h-full bg-black flex flex-col"
                        >
                            {/* Chat Header */}
                            <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-[#121212]">
                                <FaArrowLeft className="text-white" />
                                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-[10px] font-bold">EM</div>
                                <span className="font-bold text-sm">Ezy Media</span>
                            </div>

                            {/* Chat Area */}
                            <div className="flex-1 p-4 flex flex-col justify-end gap-2">
                                {messageSent && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        className="self-end bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-[80%]"
                                    >
                                        <p className="text-sm">I need promotion sir</p>
                                    </motion.div>
                                )}
                            </div>

                            {/* Input Area */}
                            <div className="p-3 bg-[#121212] flex items-center gap-3">
                                <div className="flex-1 bg-[#262626] h-9 rounded-full px-4 flex items-center text-sm text-white">
                                    {typedText}<span className="animate-pulse">|</span>
                                </div>
                                <motion.div
                                    animate={messageSent ? { scale: [1, 1.2, 1], color: "#3b82f6" } : {}}
                                >
                                    <FaPaperPlane className={`${typedText ? 'text-blue-500' : 'text-gray-500'}`} />
                                </motion.div>
                            </div>

                            {/* Keyboard Placeholder */}
                            <motion.div
                                initial={{ y: 200 }}
                                animate={{ y: 0 }}
                                className="h-[220px] bg-[#1c1c1e] p-2 grid grid-cols-10 gap-1 content-start"
                            >
                                {[...Array(26)].map((_, i) => (
                                    <div key={i} className="h-10 bg-[#454545] rounded flex items-center justify-center text-white text-sm">
                                        {String.fromCharCode(65 + i)}
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
