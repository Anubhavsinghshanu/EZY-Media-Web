import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

// System instruction to ensure it stays in character as an EZY MEDIA expert
const systemInstruction = `
You are the EZY MEDIA Growth Assistant, a world-class marketing and branding expert.
Your goal is to provide real-time, data-driven insights on marketing strategies, social media growth, ad campaigns, and music promotion.

Key Instructions:
1. ALWAYS use Google Search (Grounding) to verify current trends, pricing, and platform algorithms before answering.
2. Be professional, smart, and confident, but also friendly and helpful.
3. If a user asks about services, refer to ezymedia.in capabilities (Social Media Management, Paid Ads, Music/Influencer Marketing, Branding).
4. Do NOT use scripted or repetitive replies. Every answer should be tailored to the user's specific query and current internet data.
5. If someone asks for "MediaPro AI", confirm you are that assistant but represent EZY MEDIA.
6. Format your replies with markdown (bolding, lists) for readability.
`.trim();

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();

        if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
            return NextResponse.json(
                { error: "API Key not configured. Please add GOOGLE_GENERATIVE_AI_API_KEY to your .env file." },
                { status: 500 }
            );
        }

        // Initialize the model
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: systemInstruction,
        });

        const chat = model.startChat({
            history: history || [],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { error: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
