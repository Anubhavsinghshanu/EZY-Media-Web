"use client";

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector, Tooltip as RechartsTooltip } from "recharts";
import { motion, useInView } from "framer-motion";
import { FaInstagram, FaFacebookF, FaYoutube, FaFutbol, FaPray, FaTv, FaStar, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

// --- Data & Config ---

// Chart 1: Platform Split
const platformData = [
    {
        name: "Instagram",
        value: 65,
        color: "url(#instaGradient)",
        legendColor: "#E1306C",
        desc: "Actively Running Campaigns",
        icon: <FaInstagram />
    },
    {
        name: "Facebook",
        value: 20,
        color: "url(#fbGradient)",
        legendColor: "#1877F2",
        desc: "Community Engagement",
        icon: <FaFacebookF />
    },
    {
        name: "YouTube",
        value: 15,
        color: "url(#ytGradient)",
        legendColor: "#FF0000",
        desc: "Video Reach",
        icon: <FaYoutube />
    },
];

// Chart 2: Audience Split
const audienceData = [
    {
        name: "Indian Pages",
        value: 80,
        color: "#4169E1",
        legendColor: "#4169E1",
        desc: "Indian Page Network",
        icon: <FaMapMarkerAlt />
    },
    {
        name: "Foreign Pages",
        value: 20,
        color: "#008080",
        legendColor: "#008080",
        desc: "English / Foreign Network",
        icon: <FaGlobe />
    },
];

// Chart 3: Indian Content Split
const contentData = [
    {
        name: "Sports Pages",
        value: 35,
        color: "#00BFFF",
        legendColor: "#00BFFF",
        desc: "High Engagement",
        icon: <FaFutbol />
    },
    {
        name: "Serial Pages",
        value: 25,
        color: "#EE82EE",
        legendColor: "#EE82EE",
        desc: "Mass Reach",
        icon: <FaTv />
    },
    {
        name: "God Pages",
        value: 20,
        color: "#FFD700",
        legendColor: "#FFD700",
        desc: "Loyal Following",
        icon: <FaPray />
    },
    {
        name: "Misc Pages",
        value: 20,
        color: "#008080",
        legendColor: "#008080",
        desc: "Niche Targeting",
        icon: <FaStar />
    },
];

// --- Components ---



const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 8}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
                className="drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-500"
            />
            <motion.g
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {/* Bold Dot on Slice */}
                {/* <circle cx={cx} cy={cy} r={4} fill={fill} stroke="#fff" strokeWidth={2} className="drop-shadow-md" /> */}
            </motion.g>
        </g>
    );
};

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;

        // Determine icon style based on platform
        const getIconStyle = (name: string) => {
            if (name === "Instagram") return "text-pink-500"; // Fallback if gradient doesn't work on icon directly
            if (name === "YouTube") return "text-red-600";
            if (name === "Facebook") return "text-blue-600";
            return "text-white";
        };

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 5 }}
                animate={{ opacity: 1, scale: 1.02, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 5 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="glass-card px-5 py-4 rounded-xl border border-white/20 bg-black/60 backdrop-blur-xl backdrop-brightness-75 shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-50 min-w-[160px] ring-1 ring-white/10"
            >
                <div className="flex items-center gap-3 mb-2">
                    {/* Icon Container */}
                    <div className={`text-xl ${getIconStyle(data.name)} drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]`}>
                        {data.name === "Instagram" ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                <defs>
                                    <linearGradient id="instaIconGradTooltip" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#833AB4" />
                                        <stop offset="50%" stopColor="#FD1D1D" />
                                        <stop offset="100%" stopColor="#FCAF45" />
                                    </linearGradient>
                                </defs>
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="url(#instaIconGradTooltip)" />
                            </svg>
                        ) : (
                            data.icon ? React.cloneElement(data.icon, { style: { color: data.legendColor } }) : <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.legendColor }} />
                        )}
                    </div>
                    <p
                        className="text-base font-extrabold text-white tracking-wide"
                        style={{ textShadow: "0 0 10px rgba(255,255,255,0.3), 1px 1px 2px rgba(0,0,0,0.8)" }}
                    >
                        {data.name}
                    </p>
                </div>
                <div className="pl-8">
                    <p
                        className="text-2xl font-black text-white leading-none"
                        style={{ textShadow: "0 0 15px rgba(255,255,255,0.4), 2px 2px 4px rgba(0,0,0,0.9)" }}
                    >
                        {data.value}%
                    </p>
                    <p
                        className="text-xs font-bold text-gray-100 tracking-wider uppercase mt-1"
                        style={{ textShadow: "0 0 5px rgba(0,0,0,0.8)" }}
                    >
                        {data.desc}
                    </p>
                </div>
            </motion.div>
        );
    }
    return null;
};



const PieChartCard = ({ title, data, bgType, centerContent }: any) => {
    const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
    const [hoveredLegend, setHoveredLegend] = useState<number | undefined>(undefined);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    };

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    const onPieLeave = () => {
        setActiveIndex(undefined);
    };

    const onLegendEnter = (index: number) => {
        setHoveredLegend(index);
        setActiveIndex(index);
    };

    const onLegendLeave = () => {
        setHoveredLegend(undefined);
        setActiveIndex(undefined);
    };

    // Determine the glow color based on the active index
    const activeItem = activeIndex !== undefined ? data[activeIndex] : (hoveredLegend !== undefined ? data[hoveredLegend] : null);

    const getGlowColor = (item: any) => {
        if (!item) return "transparent";
        if (item.name === "Instagram") return "linear-gradient(135deg, #833AB4, #FD1D1D, #FCAF45)";
        if (item.name === "YouTube") return "#FF0000";
        if (item.name === "Facebook") return "#1877F2";
        return item.legendColor || item.color;
    };

    const glowBackground = getGlowColor(activeItem);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            className="glass-card p-8 rounded-3xl border border-white/10 bg-black/30 backdrop-blur-xl hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-700 relative overflow-hidden group"
        >
            <h3 className="text-lg font-bold mb-6 text-center text-gray-200 group-hover:text-white transition-colors relative z-20">
                {title}
            </h3>

            <div className="relative w-full h-[400px] flex items-center justify-center overflow-visible">

                {/* Dynamic Contextual Glow Effect */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{
                        opacity: activeItem ? 0.6 : 0,
                        scale: activeItem ? 1.02 : 0.98
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <div
                        className="w-[280px] h-[280px] rounded-full blur-[80px] transition-all duration-500"
                        style={{ background: glowBackground }}
                    />
                </motion.div>

                {/* Center Content */}
                {centerContent && (
                    <div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity duration-300"
                        style={{ opacity: activeIndex !== undefined || hoveredLegend !== undefined ? 0.85 : 1 }}
                    >
                        {centerContent}
                    </div>
                )}

                <div className="relative z-10 w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <defs>
                                {/* Instagram Gradient */}
                                <linearGradient id="instaGradient" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#833AB4" />
                                    <stop offset="50%" stopColor="#FD1D1D" />
                                    <stop offset="100%" stopColor="#FCAF45" />
                                </linearGradient>
                                {/* YouTube Gradient */}
                                <linearGradient id="ytGradient" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#FF0000" />
                                    <stop offset="100%" stopColor="#CC0000" />
                                </linearGradient>
                                {/* Facebook Gradient */}
                                <linearGradient id="fbGradient" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#1877F2" />
                                    <stop offset="100%" stopColor="#0D4A9F" />
                                </linearGradient>
                            </defs>
                            <Pie
                                {...{
                                    activeIndex: activeIndex !== undefined ? activeIndex : hoveredLegend,
                                    activeShape: renderActiveShape,
                                    data,
                                    cx: "50%",
                                    cy: "50%",
                                    innerRadius: 70,
                                    outerRadius: 100,
                                    paddingAngle: 3,
                                    dataKey: "value",
                                    onMouseEnter: onPieEnter,
                                    onMouseLeave: onPieLeave,
                                    animationBegin: 200,
                                    animationDuration: 1800,
                                    animationEasing: "ease-out",
                                    stroke: "none",
                                } as any}
                            >
                                {data.map((entry: any, index: number) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        stroke="rgba(255,255,255,0.15)"
                                        strokeWidth={2}
                                        className="transition-all duration-500 cursor-pointer hover:brightness-110"
                                        style={{
                                            opacity: (activeIndex !== undefined || hoveredLegend !== undefined) &&
                                                activeIndex !== index && hoveredLegend !== index ? 0.25 : 1,
                                            filter: (activeIndex === index || hoveredLegend === index)
                                                ? "drop-shadow(0 0 12px rgba(255,255,255,0.6))"
                                                : "none"
                                        }}
                                    />
                                ))}
                            </Pie>
                            <RechartsTooltip
                                content={<CustomTooltip />}
                                cursor={false}
                                wrapperStyle={{ outline: 'none' }}
                            />

                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Motion-based Legend */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 px-4 relative z-20">
                {data.map((entry: any, index: number) => (
                    <motion.div
                        key={index}
                        className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer group/legend"
                        onMouseEnter={() => onLegendEnter(index)}
                        onMouseLeave={onLegendLeave}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.legendColor }}
                            animate={{
                                boxShadow: hoveredLegend === index
                                    ? `0 0 12px ${entry.legendColor}`
                                    : "0 0 0px transparent"
                            }}
                            transition={{ duration: 0.3 }}
                        />
                        <span className="font-semibold text-gray-300 group-hover/legend:text-white transition-colors">
                            {entry.name}
                        </span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const DistributionCharts = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <section className="py-20 relative overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid lg:grid-cols-3 gap-12"
                >
                    {/* Chart 1: Platform Split */}
                    <PieChartCard
                        title="Platform-Wise Active Campaign Distribution"
                        data={platformData}
                        bgType="platforms"
                        centerContent={
                            <div className="flex flex-col items-center justify-center text-center">
                                <motion.span
                                    className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(236,72,153,0.3)]"
                                    animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    3000+
                                </motion.span>
                                <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mt-0.5 drop-shadow-md">
                                    Total Creators
                                </span>
                            </div>
                        }
                    />

                    {/* Chart 2: Audience Split */}
                    <PieChartCard
                        title="Audience Base Distribution (India vs Overseas)"
                        data={audienceData}
                        bgType="instagram"
                        centerContent={
                            <motion.div
                                className="text-center flex flex-col items-center justify-center"
                                animate={{
                                    scale: [1, 1.05, 1],
                                    opacity: [0.8, 1, 0.8]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <span className="text-xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                                    100%
                                </span>
                                <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mt-0.5 drop-shadow-md">
                                    Total Audience
                                </span>
                            </motion.div>
                        }
                    />

                    {/* Chart 3: Content Split */}
                    <PieChartCard
                        title="Content Category Split Within Indian Pages"
                        data={contentData}
                        bgType="categories"
                        centerContent={
                            <div className="flex flex-col items-center justify-center text-center">
                                <motion.span
                                    className="text-xl font-bold bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                                    animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    1000+
                                </motion.span>
                                <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mt-0.5 drop-shadow-md">
                                    Active Creators
                                </span>
                            </div>
                        }
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default DistributionCharts;
