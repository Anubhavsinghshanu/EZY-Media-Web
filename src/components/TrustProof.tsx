'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaCheckDouble, FaCircleCheck } from 'react-icons/fa6';

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
                { from: 'them', text: 'Hi, I saw your work with other creators on Instagram', time: '2:30 PM' },
                { from: 'them', text: 'I create comedy content, have around 2.5M followers', time: '2:31 PM' },
                { from: 'us', text: 'Hey Rahul! Great to connect. We specialize in creator collaborations', time: '2:32 PM' },
                { from: 'us', text: 'We have some betting brand campaigns running. Would you be interested?', time: '2:33 PM' },
                { from: 'them', text: 'Yes definitely! My engagement is pretty good, avg 800K reach per reel', time: '2:34 PM' },
                { from: 'us', text: 'Perfect fit! Let me send you the campaign brief on email', time: '2:35 PM' },
                { from: 'them', text: 'Sounds good! One question - how do payments work?', time: '2:36 PM' },
                { from: 'us', text: 'We do advance payment before you post, balance after delivery. All within 24-48 hours', time: '2:37 PM' },
                { from: 'them', text: 'That works! Looking forward to it 🙌', time: '2:38 PM' }
            ]
        },
        {
            id: 2,
            platform: 'whatsapp',
            type: 'manager_sheet',
            name: 'Priya Sharma',
            time: '11:30 AM',
            messages: [
                { from: 'them', text: 'Hi, I manage multiple pages - fashion and lifestyle niche', time: '11:15 AM' },
                { from: 'them', text: 'Total reach is around 8M+ across all pages', time: '11:16 AM' },
                { from: 'them', text: 'Sharing my Google Sheet with all page details', time: '11:17 AM' },
                { from: 'them', type: 'file', fileName: '📊 My_Pages_Details.xlsx', time: '11:18 AM' },
                { from: 'us', text: 'Thanks Priya! Checking the sheet now', time: '11:20 AM' },
                { from: 'us', text: 'Great pages! We have a new song campaign. Let me share details', time: '11:22 AM' },
                { from: 'us', text: '🎵 Campaign: New Song Launch\n⏱ Duration: 5 Days\n🎯 Target: 200M Reach\n💰 Advance: 50% upfront', time: '11:24 AM' },
                { from: 'them', text: 'Perfect! When do we start?', time: '11:25 AM' },
                { from: 'us', text: 'I\'ll send the contract and advance today. Campaign starts tomorrow', time: '11:26 AM' },
                { from: 'them', text: 'Awesome! Ready to go 🚀', time: '11:27 AM' }
            ]
        },
        {
            id: 3,
            platform: 'instagram',
            type: 'campaign_details',
            name: 'Arjun Verma',
            time: '4:50 PM',
            messages: [
                { from: 'them', text: 'Hey! Do you guys handle song promotions?', time: '4:40 PM' },
                { from: 'us', text: 'Yes! We\'re currently running campaigns for Coke Studio and T-Series', time: '4:41 PM' },
                { from: 'them', text: 'Nice! I\'m interested. What kind of content do you need?', time: '4:42 PM' },
                { from: 'us', text: 'Usually 2-3 reels with the song. We provide the brief and creative direction', time: '4:43 PM' },
                { from: 'us', text: '📋 Campaign Brief:\n🎵 Song: Arz Kiya Hai\n⏱ Duration: 6 Days\n🎯 Target: 200M+ Views\n💰 Payment: 50% advance, 50% on completion', time: '4:45 PM' },
                { from: 'them', text: 'Perfect! I can deliver that. Send me the song link 🔥', time: '4:47 PM' },
                { from: 'us', text: 'Great! Sending contract, song link, and advance payment details on email now', time: '4:48 PM' },
                { from: 'them', text: 'Checking email. Excited to start!', time: '4:50 PM' }
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
                { from: 'us', text: 'Hi Sneha! Campaign completed successfully. Sending the final payment now', time: '6:05 PM' },
                { from: 'us', type: 'payment', platform: 'phonepe', amount: '₹51,500', time: '6:06 PM' },
                { from: 'them', text: 'Received! 🙏', time: '6:10 PM' },
                { from: 'them', text: 'Thank you so much! This was the smoothest campaign I\'ve ever done', time: '6:11 PM' },
                { from: 'them', text: 'Payment was so quick! Other agencies take weeks', time: '6:12 PM' },
                { from: 'them', text: 'Really enjoyed working with you guys. Very professional 💯', time: '6:13 PM' },
                { from: 'us', text: 'Thank you Sneha! We loved your content. Looking forward to more collaborations 😊', time: '6:14 PM' },
                { from: 'them', text: 'Definitely! I\'m telling all my creator friends about you', time: '6:15 PM' }
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
                { from: 'them', text: 'Sir, I have 20 meme pages. Sending Google Sheet', time: '1:10 PM' },
                { from: 'them', type: 'file', fileName: '📊 Meme_Pages_Analytics.xlsx', time: '1:11 PM' },
                { from: 'us', text: 'Thanks Vikram! Excellent pages. We have a betting campaign', time: '1:15 PM' },
                { from: 'us', text: '🎲 Campaign: Betting Brand\n⏱ Duration: 7 Days\n🎯 Target: 200M Reach\n💰 Advance: 50% today, 50% after completion', time: '1:17 PM' },
                { from: 'them', text: 'Perfect! I can deliver 200M+ easily with these pages', time: '1:20 PM' },
                { from: 'us', text: 'Great! Sending advance payment now', time: '1:30 PM' },
                { from: 'us', type: 'payment', platform: 'paytm', amount: '₹69,000', time: '1:32 PM' },
                { from: 'them', text: 'Payment received sir! 🙏', time: '1:36 PM' },
                { from: 'them', text: 'Thank you! This campaign was very smooth', time: '1:37 PM' },
                { from: 'them', text: 'Timely payment as always. I really appreciate working with you', time: '1:38 PM' },
                { from: 'us', text: 'Thank you Vikram! You\'re one of our most reliable managers 💪', time: '1:39 PM' },
                { from: 'them', text: 'Ready for the next campaign whenever you have one!', time: '1:45 PM' }
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
                { from: 'them', text: 'Bro, campaign is live! All 3 reels posted', time: '3:30 PM' },
                { from: 'them', text: 'Engagement is crazy! Already 500K views in 2 hours', time: '3:32 PM' },
                { from: 'us', text: 'Amazing work Rohit! The client loved your content', time: '3:35 PM' },
                { from: 'us', text: 'Processing your final payment right now', time: '3:38 PM' },
                { from: 'us', type: 'payment', platform: 'phonepe', amount: '₹74,200', time: '3:40 PM' },
                { from: 'them', text: 'Received! 😱', time: '3:42 PM' },
                { from: 'them', text: 'Bro this is insane! You paid in like 2 hours', time: '3:43 PM' },
                { from: 'them', text: 'Other agencies I worked with took 2-3 weeks minimum', time: '3:44 PM' },
                { from: 'them', text: 'Really enjoyed this campaign. Super smooth process 🔥', time: '3:45 PM' },
                { from: 'us', text: 'We value our creators! Quick payments = happy creators = better work 💪', time: '3:48 PM' },
                { from: 'them', text: 'Count me in for all future campaigns! You guys are the best 🙌', time: '3:50 PM' }
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
            className="relative py-32 px-6 bg-gradient-to-b from-[#050505] to-[#0A0A0A] overflow-hidden"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6"
                    >
                        <FaCircleCheck className="text-green-400" />
                        <span className="text-green-200 text-xs font-bold tracking-widest uppercase">100% Verified & Trusted</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
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
                        className="text-lg text-gray-400 max-w-3xl mx-auto"
                    >
                        See how creators and managers trust us with their work. Authentic chats, timely payments, zero scams.
                    </motion.p>
                </div>

                {/* Chat Screenshots Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                    {chats.map((chat, index) => (
                        <motion.div
                            key={chat.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F] rounded-2xl border border-white/10 overflow-hidden hover:border-green-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] cursor-pointer"
                            onClick={() => setSelectedChat(chat.id)}
                        >
                            {/* Chat Header */}
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
                                <span className="text-white/70 text-xs">{chat.time}</span>
                            </div>

                            {/* Chat Messages */}
                            <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
                                {chat.messages.slice(0, 5).map((msg: any, idx) => {
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
                                                <p className={`text-sm whitespace-pre-line ${msg.from === 'us' && chat.platform === 'instagram' ? 'text-white' : 'text-gray-800'}`}>
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

                            {/* View More Badge */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="px-4 py-2 bg-green-500 rounded-full text-white text-xs font-bold">
                                    Click to view full chat
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Payment Proof Section */}
                <div className="mt-32">
                    <div className="text-center mb-12">
                        <h3 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                            Payment Proof
                        </h3>
                        <p className="text-gray-400">Real transactions. Real trust. Every payment on time.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {payments.map((payment, index) => (
                            <motion.div
                                key={payment.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300"
                            >
                                {/* Payment Header */}
                                <div className={`p-4 ${payment.platform === 'paytm' ? 'bg-gradient-to-r from-blue-600 to-cyan-500' : 'bg-gradient-to-r from-purple-600 to-indigo-600'}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="text-white font-bold text-lg">
                                            {payment.platform === 'paytm' ? 'Paytm' : 'PhonePe'}
                                        </div>
                                        <div className="bg-white/20 px-3 py-1 rounded-full">
                                            <span className="text-white text-xs font-bold">{payment.status}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Details */}
                                <div className="p-6">
                                    <div className="text-center mb-6">
                                        <p className="text-gray-500 text-sm mb-2">Amount Paid</p>
                                        <p className="text-4xl font-black text-green-600">{payment.amount}</p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                            <span className="text-gray-600 text-sm">To</span>
                                            <span className="text-gray-900 font-bold text-sm">{payment.to}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                                            <span className="text-gray-600 text-sm">Date & Time</span>
                                            <span className="text-gray-900 text-xs">{payment.date}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 text-sm">Transaction ID</span>
                                            <span className="text-gray-900 text-xs font-mono blur-[3px] select-none">{payment.txnId}</span>
                                        </div>
                                    </div>

                                    {/* Success Icon */}
                                    <div className="mt-6 flex items-center justify-center gap-2 bg-green-50 py-3 rounded-lg">
                                        <FaCircleCheck className="text-green-600 text-xl" />
                                        <span className="text-green-700 font-bold text-sm">Payment Successful</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
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
