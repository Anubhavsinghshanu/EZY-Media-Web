"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaSpinner } from "react-icons/fa";

// --- Schema Definitions ---

const step1Schema = z.object({
    fullName: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    brandName: z.string().min(2, "Brand name is required"),
    website: z.string().optional(),
});

const step2Schema = z.object({
    campaignGoal: z.string().min(1, "Please select a goal"),
    budget: z.string().min(1, "Please select a budget"),
    timeline: z.string().min(1, "Timeline is required"),
});

const step3Schema = z.object({
    message: z.string().min(10, "Please describe your goals in at least 10 characters"),
});

const combinedSchema = step1Schema.merge(step2Schema).merge(step3Schema);
type FormData = z.infer<typeof combinedSchema>;

// --- Components ---

export default function MultiStepForm() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Initialize form with combined schema mode, but we will validate manually per step
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
        watch,
    } = useForm<FormData>({
        resolver: zodResolver(combinedSchema),
        mode: "onChange",
    });

    const nextStep = async () => {
        let isValid = false;
        if (step === 1) {
            isValid = await trigger(["fullName", "email", "brandName", "website"]);
        } else if (step === 2) {
            isValid = await trigger(["campaignGoal", "budget", "timeline"]);
        }

        if (isValid) setStep((s) => s + 1);
    };

    const prevStep = () => setStep((s) => s - 1);

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        // Simulate API call
        try {
            const response = await fetch("/api/campaign", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to submit");

            setIsSuccess(true);
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Render Steps
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-bold text-white mb-2">Basic Info</h3>
                        <p className="text-gray-400 text-sm mb-6">Let's get to know you.</p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                                <input
                                    {...register("fullName")}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none"
                                    placeholder="John Doe"
                                />
                                {errors.fullName && <span className="text-red-400 text-xs mt-1">{errors.fullName.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                <input
                                    {...register("email")}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none"
                                    placeholder="john@company.com"
                                />
                                {errors.email && <span className="text-red-400 text-xs mt-1">{errors.email.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Brand Name</label>
                                <input
                                    {...register("brandName")}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none"
                                    placeholder="Brand / Company"
                                />
                                {errors.brandName && <span className="text-red-400 text-xs mt-1">{errors.brandName.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Website / Social Link (Optional)</label>
                                <input
                                    {...register("website")}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </motion.div>
                );
            case 2:
                return (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-bold text-white mb-2">Campaign Details</h3>
                        <p className="text-gray-400 text-sm mb-6">Tell us about your needs.</p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Campaign Goal</label>
                                <select
                                    {...register("campaignGoal")}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none appearance-none"
                                >
                                    <option value="" className="bg-black text-gray-500">Select Goal</option>
                                    <option value="awareness" className="bg-black">Brand Awareness</option>
                                    <option value="influencer" className="bg-black">Influencer Marketing</option>
                                    <option value="music" className="bg-black">Music Promotion</option>
                                    <option value="performance" className="bg-black">Performance Marketing</option>
                                </select>
                                {errors.campaignGoal && <span className="text-red-400 text-xs mt-1">{errors.campaignGoal.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Budget Range (₹)</label>
                                <select
                                    {...register("budget")}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none appearance-none"
                                >
                                    <option value="" className="bg-black text-gray-500">Select Budget</option>
                                    <option value="25k-50k" className="bg-black">₹25K – ₹50K</option>
                                    <option value="50k-1l" className="bg-black">₹50K – ₹1L</option>
                                    <option value="1l+" className="bg-black">₹1L+</option>
                                </select>
                                {errors.budget && <span className="text-red-400 text-xs mt-1">{errors.budget.message}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Timeline</label>
                                <input
                                    {...register("timeline")}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none"
                                    placeholder="e.g. Next 30 days"
                                />
                                {errors.timeline && <span className="text-red-400 text-xs mt-1">{errors.timeline.message}</span>}
                            </div>
                        </div>
                    </motion.div>
                );
            case 3:
                return (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-bold text-white mb-2">Final Details</h3>
                        <p className="text-gray-400 text-sm mb-6">Anything else we should know?</p>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                            <textarea
                                {...register("message")}
                                rows={4}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none"
                                placeholder="Describe your campaign goals..."
                            />
                            {errors.message && <span className="text-red-400 text-xs mt-1">{errors.message.message}</span>}
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full mx-auto p-10 bg-[#0F0F0F] border border-white/10 rounded-2xl shadow-2xl text-center"
            >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheck className="text-4xl text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Request Received!</h2>
                <p className="text-gray-400 mb-6">We've received your campaign details. Our team will review them and get back to you within 24 hours.</p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Back to Home
                </button>
            </motion.div>
        );
    }

    return (
        <div className="max-w-xl w-full mx-auto">
            {/* Progress Bar */}
            <div className="flex gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="h-1 flex-1 rounded-full overflow-hidden bg-white/10">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: step >= s ? "100%" : "0%" }}
                            transition={{ duration: 0.3 }}
                            className="h-full bg-cyan-500"
                        />
                    </div>
                ))}
            </div>

            <div className="bg-[#0F0F0F] border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500" />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <AnimatePresence mode="wait">
                        {renderStep()}
                    </AnimatePresence>

                    <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                        {step > 1 ? (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-6 py-2.5 text-gray-400 hover:text-white font-medium transition-colors"
                            >
                                Back
                            </button>
                        ) : <div />}

                        {step < 3 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="px-8 py-2.5 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
                            >
                                Next Step
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <FaSpinner className="animate-spin" /> Sending...
                                    </>
                                ) : "Submit Campaign"}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
