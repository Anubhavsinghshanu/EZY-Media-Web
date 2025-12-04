'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaCheckDouble, FaCircleCheck } from 'react-icons/fa6';

import PhoneDemo from './PhoneDemo';

export default function TrustProof() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [selectedChat, setSelectedChat] = useState<number | null>(null);

    // WhatsApp & Instagram Chat Data
    const chats = [
        {
            id: 1,
            platform: 'whatsapp',
            type: 'creator_inquiry',
            name: 'Rahul Mehta',
            time: '2:34 PM',
            messages: [
                { from: 'them', text: 'Hello sir, I saw your story regarding campaign', time: '2:30 PM' },
                { from: 'them', text: 'I have 2.5M followers. Comedy niche.', time: '2:31 PM' },
                { from: 'us', text: 'Hi Rahul. Yes, we have a betting app campaign live.', time: '2:32 PM' },
                { from: 'us', text: 'Commercial is 65k for 3 reels. Interested?', time: '2:33 PM' },
                { from: 'them', text: 'Yes sir interested. Payment terms kya hai sir?', time: '2:34 PM' },
                { from: 'us', text: '50% advance right now. 50% after posting.', time: '2:35 PM' },
                { from: 'them', text: 'Okay done. Sending my UPI id.', time: '2:36 PM' },
                { from: 'them', text: 'rahul.mehta@oksbi', time: '2:37 PM' }
            ]
        },
        {
            id: 2,
            platform: 'whatsapp',
            type: 'manager_sheet',
            name: 'Priya Sharma',
            time: '11:30 AM',
            messages: [
                { from: 'them', text: 'Hi, I am Priya. Managing 15+ pages.', time: '11:15 AM' },
                { from: 'them', text: 'Fashion & Lifestyle category.', time: '11:16 AM' },
                { from: 'them', text: 'Sharing sheet with commercials.', time: '11:17 AM' },
                { from: 'them', type: 'file', fileName: '📊 My_Pages_Details.xlsx', time: '11:18 AM' },
                { from: 'us', text: 'Thanks Priya. Checked the sheet. Rates look good.', time: '11:20 AM' },
                { from: 'us', text: 'We have a bulk requirement for a new song launch.', time: '11:22 AM' },
                { from: 'us', text: 'Total budget 2L+. Can we close this?', time: '11:24 AM' },
                { from: 'them', text: 'Sure sir. Please share brand details.', time: '11:25 AM' },
                { from: 'us', text: 'Sharing brief. Please send Bank Details for vendor registration.', time: '11:26 AM' },
                { from: 'them', text: 'Sending bank details in 2 mins.', time: '11:27 AM' }
            ]
        },
        {
            id: 3,
            platform: 'instagram',
            type: 'campaign_details',
            name: 'Arjun Verma',
            time: '4:50 PM',
            messages: [
                { from: 'them', text: 'Bro any new song campaign?', time: '4:40 PM' },
                { from: 'us', text: 'Yes Arjun. T-Series new track. 2 reels required.', time: '4:41 PM' },
                { from: 'them', text: 'Sahi hai. Same rate na? 55k?', time: '4:42 PM' },
                { from: 'us', text: 'Yes same. 55k package. 50% advance.', time: '4:43 PM' },
                { from: 'them', text: 'Done bro. Link bhej do.', time: '4:44 PM' },
                { from: 'us', text: 'Sending link and brief.', time: '4:45 PM' },
                { from: 'them', text: 'UPI bhej raha hu.', time: '4:46 PM' }
            ]
        },
        {
            id: 4,
            platform: 'whatsapp',
            type: 'payment_with_screenshot',
            name: 'Sneha Kapoor',
            time: '6:15 PM',
            paymentScreenshot: {
                platform: 'phonepe',
                amount: '₹51,500',
                date: '1 Dec 2024, 6:05 PM',
                status: 'Success'
            },
            messages: [
                { from: 'us', text: 'Hi Sneha, campaign report received. Good views.', time: '6:05 PM' },
                { from: 'us', text: 'Processing balance payment.', time: '6:06 PM' },
                { from: 'us', type: 'payment', platform: 'phonepe', amount: '₹51,500', time: '6:07 PM' },
                { from: 'them', text: 'Received sir! Thank you.', time: '6:10 PM' },
                { from: 'them', text: 'First time kisi agency ne itna fast payment kiya hai.', time: '6:11 PM' },
                { from: 'them', text: 'Next campaign kab aayega?', time: '6:12 PM' },
                { from: 'us', text: 'Next week. Will let you know.', time: '6:14 PM' }
            ]
        },
        {
            id: 5,
            platform: 'whatsapp',
            type: 'manager_campaign',
            name: 'Vikram Patel',
            time: '1:45 PM',
            paymentScreenshot: {
                platform: 'paytm',
                amount: '₹69,000',
                date: '1 Dec 2024, 1:35 PM',
                status: 'Success'
            },
            messages: [
                { from: 'them', text: 'Sir 20 pages pe post live hai.', time: '1:10 PM' },
                { from: 'them', text: 'Sheet update kar di hai.', time: '1:11 PM' },
                { from: 'them', type: 'file', fileName: '📊 Meme_Pages_Analytics.xlsx', time: '1:12 PM' },
                { from: 'us', text: 'Great work Vikram. Reach is touching 5M+.', time: '1:15 PM' },
                { from: 'us', text: 'Clearing your invoice now.', time: '1:30 PM' },
                { from: 'us', type: 'payment', platform: 'paytm', amount: '₹69,000', time: '1:32 PM' },
                { from: 'them', text: 'Payment aa gaya sir. Thanks for the quick settlement.', time: '1:36 PM' },
                { from: 'them', text: 'Market mein payment ke liye bohot chase karna padta hai, but aapka system smooth hai.', time: '1:37 PM' },
                { from: 'us', text: 'We value our partners Vikram.', time: '1:39 PM' }
            ]
        },
        {
            id: 6,
            platform: 'whatsapp',
            type: 'payment_with_screenshot',
            name: 'Rohit Sharma',
            time: '3:50 PM',
            paymentScreenshot: {
                platform: 'phonepe',
                amount: '₹74,200',
                date: '2 Dec 2024, 3:40 PM',
                status: 'Success'
            },
            messages: [
                { from: 'them', text: 'Bhai reels viral ja rahi hai! Check kiya?', time: '3:30 PM' },
                { from: 'us', text: 'Yes Rohit! 500K+ views already. Client is super happy.', time: '3:35 PM' },
                { from: 'us', text: 'Sending full payment as discussed.', time: '3:38 PM' },
                { from: 'us', type: 'payment', platform: 'phonepe', amount: '₹74,200', time: '3:40 PM' },
                { from: 'them', text: 'Arre bhai sahab! Full payment ek saath? 😱', time: '3:42 PM' },
                { from: 'them', text: 'Maza aa gaya kaam karke. Genuine agency ho aap log.', time: '3:43 PM' },
                { from: 'them', text: 'Aur kaam dena bhai.', time: '3:45 PM' }
            ]
        }
    ];

    // Payment Screenshots Data
    const payments = [
        {
            id: 1,
            platform: 'paytm',
            amount: '₹65,000',
            to: 'Rahul Kumar',
            date: '28 Nov 2024, 2:45 PM',
            status: 'Success',
            txnId: 'T2024112865432'
        },
        {
            id: 2,
            platform: 'phonepe',
            amount: '₹72,500',
            to: 'Priya Sharma',
            date: '29 Nov 2024, 11:30 AM',
            status: 'Success',
            txnId: 'PP20241129XYZ789'
        },
        {
            id: 3,
            platform: 'paytm',
            amount: '₹58,000',
            to: 'Arjun Verma',
            date: '30 Nov 2024, 4:50 PM',
            status: 'Success',
            txnId: 'T2024113098765'
        },
        {
            id: 4,
            platform: 'phonepe',
            amount: '₹51,500',
            to: 'Sneha Kapoor',
            date: '1 Dec 2024, 6:05 PM',
            status: 'Success',
            txnId: 'PP20241201ABC123'
        },
        {
            id: 5,
            platform: 'paytm',
            amount: '₹69,000',
            to: 'Vikram Patel',
            date: '1 Dec 2024, 1:35 PM',
            status: 'Success',
            txnId: 'T2024120154321'
        },
        {
            id: 6,
            platform: 'phonepe',
            amount: '₹74,200',
            to: 'Rohit Sharma',
            date: '2 Dec 2024, 3:40 PM',
            status: 'Success',
            txnId: 'PP20241202DEF456'
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="relative py-20 px-6 overflow-hidden"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                {/* Header Split Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    {/* Left: Text Content */}
                    <div className="text-left">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-8"
                        >
                            <FaCircleCheck className="text-green-400" />
                            <span className="text-green-200 text-xs font-bold tracking-widest uppercase">100% Verified & Trusted</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight leading-tight"
                            style={{ fontFamily: 'Montserrat, sans-serif' }}
                        >
                            Real Conversations.{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
                                Real Trust.
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg text-gray-400 max-w-xl leading-relaxed mb-8"
                        >
                            See how creators and managers trust us with their work. Authentic chats, timely payments, zero scams.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex items-center gap-4"
                        >
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-gray-800" />
                                ))}
                            </div>
                            <div>
                                <p className="text-white font-bold">500+ Active Creators</p>
                                <p className="text-xs text-green-400">Join the network today</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Phone Demo Animation */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        {/* Glow Effect behind phone */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[600px] bg-gradient-to-tr from-green-500/20 to-blue-500/20 blur-[60px] rounded-full pointer-events-none" />

                        <PhoneDemo />
                    </motion.div>
                </div>

                {/* Marquee Section */}
                <div className="relative py-20 overflow-hidden">
                    {/* Skewed Container */}
                    <div className="transform -skew-y-3 scale-110">

                        {/* Row 1: Chats Marquee (Left Scroll) */}
                        <div className="relative w-full mb-16">
                            <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#050505] to-transparent z-10" />
                            <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#050505] to-transparent z-10" />

                            <motion.div
                                className="flex gap-8 w-max px-10"
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{
                                    repeat: Infinity,
                                    ease: "linear",
                                    duration: 50,
                                }}
                                whileHover={{ animationPlayState: "paused" }}
                            >
                                {[...chats, ...chats].map((chat, index) => (
                                    <motion.div
                                        key={`${chat.id}-${index}`}
                                        className="w-[380px] flex-shrink-0 group relative bg-[#111] rounded-3xl border border-white/5 overflow-hidden hover:border-green-500/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(34,197,94,0.15)] cursor-pointer"
                                        whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                                        initial={{ y: index % 2 === 0 ? 0 : 20 }}
                                        animate={{ y: index % 2 === 0 ? [0, -10, 0] : [20, 10, 20] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        onClick={() => setSelectedChat(chat.id)}
                                    >
                                        {/* Glass Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* Chat Header */}
                                        <div className={`p-5 ${chat.platform === 'whatsapp' ? 'bg-[#075E54]/90' : 'bg-gradient-to-r from-purple-600/90 to-pink-600/90'} backdrop-blur-md flex items-center justify-between`}>
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
                                                    {chat.platform === 'whatsapp' ? (
                                                        <FaWhatsapp className="text-white text-2xl" />
                                                    ) : (
                                                        <FaInstagram className="text-white text-2xl" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-base tracking-wide">{chat.name}</h4>
                                                    <div className="flex items-center gap-1.5">
                                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                                        <p className="text-white/80 text-xs font-medium">Online Now</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-white/80 text-xs font-mono bg-black/20 px-2 py-1 rounded-lg">{chat.time}</span>
                                        </div>

                                        {/* Chat Messages (Compact View) */}
                                        <div className="p-5 space-y-4 h-[340px] overflow-hidden relative bg-[#0A0A0A]">
                                            {chat.messages.slice(0, 4).map((msg: any, idx) => {
                                                // Render file attachment
                                                if (msg.type === 'file') {
                                                    return (
                                                        <div key={idx} className="flex justify-start">
                                                            <div className="max-w-[85%] bg-[#1A1A1A] rounded-2xl p-3 border border-white/10 shadow-lg">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400">
                                                                        <span className="text-xl">📊</span>
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-[11px] font-bold text-gray-200 truncate">{msg.fileName}</p>
                                                                        <p className="text-[9px] text-gray-500 uppercase tracking-wider">Spreadsheet</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                // Render payment screenshot
                                                if (msg.type === 'payment') {
                                                    return (
                                                        <div key={idx} className="flex justify-end">
                                                            <div className="max-w-[90%] bg-white rounded-2xl overflow-hidden shadow-xl scale-95 origin-right transform transition-transform hover:scale-100">
                                                                <div className={`p-2.5 ${msg.platform === 'paytm' ? 'bg-[#00BAF2]' : 'bg-[#5F259F]'} flex justify-between items-center`}>
                                                                    <span className="text-white font-bold text-[10px] uppercase tracking-widest">{msg.platform === 'paytm' ? 'Paytm' : 'PhonePe'}</span>
                                                                    <FaCircleCheck className="text-white text-xs" />
                                                                </div>
                                                                <div className="p-3 text-center bg-white">
                                                                    <p className="text-xl font-black text-gray-900 tracking-tight">{msg.amount}</p>
                                                                    <p className="text-[9px] text-green-600 font-bold mt-1 uppercase tracking-wider">Paid Successfully</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                // Render regular text message
                                                return (
                                                    <div
                                                        key={idx}
                                                        className={`flex ${msg.from === 'us' ? 'justify-end' : 'justify-start'}`}
                                                    >
                                                        <div
                                                            className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm ${msg.from === 'us'
                                                                ? chat.platform === 'whatsapp'
                                                                    ? 'bg-[#005C4B] text-white'
                                                                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                                                                : 'bg-[#202020] text-gray-200 border border-white/5'
                                                                }`}
                                                        >
                                                            <p className="text-[13px] leading-relaxed font-medium">
                                                                {msg.text}
                                                            </p>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            {/* Gradient Fade Overlay */}
                                            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/90 to-transparent pointer-events-none" />
                                        </div>

                                        {/* View More Badge */}
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                                            <div className="px-6 py-2.5 bg-white text-black rounded-full text-xs font-black shadow-[0_0_20px_rgba(255,255,255,0.3)] whitespace-nowrap tracking-wide uppercase flex items-center gap-2">
                                                View Chat <span className="text-lg">👀</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Row 2: Payments Marquee (Right Scroll) */}
                        <div className="relative w-full">
                            <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-[#050505] to-transparent z-10" />
                            <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-[#050505] to-transparent z-10" />

                            <motion.div
                                className="flex gap-8 w-max px-10"
                                animate={{ x: ["-50%", "0%"] }}
                                transition={{
                                    repeat: Infinity,
                                    ease: "linear",
                                    duration: 50,
                                }}
                                whileHover={{ animationPlayState: "paused" }}
                            >
                                {[...payments, ...payments].map((payment, index) => (
                                    <motion.div
                                        key={`${payment.id}-${index}`}
                                        className="w-[320px] flex-shrink-0 bg-[#111] rounded-3xl overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
                                        whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                                        initial={{ y: index % 2 === 0 ? 20 : 0 }}
                                        animate={{ y: index % 2 === 0 ? [20, 10, 20] : [0, -10, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        {/* Payment Header */}
                                        <div className={`p-4 ${payment.platform === 'paytm' ? 'bg-gradient-to-r from-[#00BAF2] to-[#002E6E]' : 'bg-gradient-to-r from-[#5F259F] to-[#3E106E]'}`}>
                                            <div className="flex items-center justify-between">
                                                <div className="text-white font-black text-lg tracking-tight">
                                                    {payment.platform === 'paytm' ? 'PAYTM' : 'PHONEPE'}
                                                </div>
                                                <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                                    <span className="text-white text-[10px] font-bold uppercase tracking-wider">{payment.status}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Payment Details */}
                                        <div className="p-6 relative">
                                            <div className="text-center mb-6">
                                                <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-2">Total Amount</p>
                                                <p className="text-4xl font-black text-white tracking-tight drop-shadow-lg">{payment.amount}</p>
                                            </div>

                                            <div className="space-y-3 bg-[#1A1A1A] p-4 rounded-2xl border border-white/5">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500 text-xs font-medium">To</span>
                                                    <span className="text-gray-200 font-bold text-xs">{payment.to}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500 text-xs font-medium">Date</span>
                                                    <span className="text-gray-400 text-[10px] font-mono">{payment.date.split(',')[0]}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500 text-xs font-medium">Txn ID</span>
                                                    <span className="text-gray-500 text-[10px] font-mono blur-[2px] select-none">{payment.txnId}</span>
                                                </div>
                                            </div>

                                            {/* Success Icon */}
                                            <div className="mt-5 flex items-center justify-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                                                    <FaCircleCheck className="text-green-500 text-xs" />
                                                </div>
                                                <span className="text-green-500 font-bold text-xs uppercase tracking-wider">Verified Payment</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                    </div>
                </div>

                {/* Trust Badge Removed */}
            </div>

            {/* Full Chat Modal */}
            <AnimatePresence>
                {selectedChat && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                        onClick={() => setSelectedChat(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-[#1A1A1A] rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {(() => {
                                const chat = chats.find(c => c.id === selectedChat);
                                if (!chat) return null;

                                return (
                                    <>
                                        {/* Header */}
                                        <div className={`p-4 ${chat.platform === 'whatsapp' ? 'bg-[#075E54]' : 'bg-gradient-to-r from-purple-600 to-pink-600'} flex items-center justify-between`}>
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                                    {chat.platform === 'whatsapp' ? (
                                                        <FaWhatsapp className="text-white text-xl" />
                                                    ) : (
                                                        <FaInstagram className="text-white text-xl" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-sm">{chat.name}</h4>
                                                    <p className="text-white/70 text-xs">Online</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setSelectedChat(null)}
                                                className="text-white hover:bg-white/10 rounded-full p-2 transition-colors"
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        {/* Full Messages */}
                                        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto bg-[#0F0F0F]">
                                            {chat.messages.map((msg: any, idx) => {
                                                // Render file attachment
                                                if (msg.type === 'file') {
                                                    return (
                                                        <div key={idx} className="flex justify-start">
                                                            <div className="max-w-[70%] bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
                                                                        <span className="text-xl">📄</span>
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <p className="text-xs font-bold text-gray-800">{msg.fileName}</p>
                                                                        <p className="text-[10px] text-gray-500">Google Sheets</p>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-2 text-right">
                                                                    <span className="text-[10px] text-gray-500">{msg.time}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                // Render payment screenshot
                                                if (msg.type === 'payment') {
                                                    return (
                                                        <div key={idx} className="flex justify-end">
                                                            <div className="max-w-[85%] bg-white rounded-xl overflow-hidden shadow-lg">
                                                                {/* Payment Header */}
                                                                <div className={`p-3 ${msg.platform === 'paytm' ? 'bg-gradient-to-r from-blue-600 to-cyan-500' : 'bg-gradient-to-r from-purple-600 to-indigo-600'}`}>
                                                                    <div className="flex items-center justify-between">
                                                                        <span className="text-white font-bold text-sm">
                                                                            {msg.platform === 'paytm' ? 'Paytm' : 'PhonePe'}
                                                                        </span>
                                                                        <span className="bg-white/20 px-2 py-0.5 rounded-full text-white text-[10px] font-bold">
                                                                            Success
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                {/* Payment Amount */}
                                                                <div className="p-4 text-center">
                                                                    <p className="text-gray-500 text-[10px] mb-1">Amount Paid</p>
                                                                    <p className="text-2xl font-black text-green-600">{msg.amount}</p>
                                                                    <div className="mt-3 flex items-center justify-center gap-1 bg-green-50 py-2 rounded-lg">
                                                                        <FaCircleCheck className="text-green-600 text-sm" />
                                                                        <span className="text-green-700 font-bold text-[10px]">Payment Successful</span>
                                                                    </div>
                                                                </div>
                                                                <div className="px-3 pb-2 text-right">
                                                                    <span className="text-[10px] text-gray-500">{msg.time}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                                // Render regular text message
                                                return (
                                                    <div
                                                        key={idx}
                                                        className={`flex ${msg.from === 'us' ? 'justify-end' : 'justify-start'}`}
                                                    >
                                                        <div
                                                            className={`max-w-[80%] rounded-lg p-3 ${msg.from === 'us'
                                                                ? chat.platform === 'whatsapp'
                                                                    ? 'bg-[#DCF8C6]'
                                                                    : 'bg-purple-500'
                                                                : 'bg-white'
                                                                }`}
                                                        >
                                                            <p className={`text-sm ${msg.from === 'us' && chat.platform === 'instagram' ? 'text-white' : 'text-gray-800'}`}>
                                                                {msg.text}
                                                            </p>
                                                            <div className="flex items-center justify-end gap-1 mt-1">
                                                                <span className={`text-[10px] ${msg.from === 'us' && chat.platform === 'instagram' ? 'text-white/70' : 'text-gray-500'}`}>
                                                                    {msg.time}
                                                                </span>
                                                                {msg.from === 'us' && chat.platform === 'whatsapp' && (
                                                                    <FaCheckDouble className="text-blue-500 text-xs" />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                );
                            })()}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
