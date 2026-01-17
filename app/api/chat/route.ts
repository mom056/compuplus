import { GoogleGenAI } from "@google/genai";
import { NextRequest } from "next/server";
import { SYSTEM_PROMPT } from "@/constants/chatbot";

// Rate limiting: Simple in-memory store (for production, use Redis)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute in ms

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = requestCounts.get(ip);

    if (!record || now > record.resetTime) {
        requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
        return false;
    }

    if (record.count >= RATE_LIMIT) {
        return true;
    }

    record.count++;
    return false;
}

export async function POST(request: NextRequest) {
    try {
        // Get client IP for rate limiting
        const ip = request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            "unknown";

        // Check rate limit
        if (isRateLimited(ip)) {
            return new Response(
                JSON.stringify({ error: "Rate limit exceeded. Please wait a moment." }),
                { status: 429, headers: { "Content-Type": "application/json" } }
            );
        }

        const body = await request.json();
        const { message, history = [] } = body;

        if (!message || typeof message !== "string") {
            return new Response(
                JSON.stringify({ error: "Message is required" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Initialize Gemini AI (API key is server-side only - SECURE!)
        const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_API_KEY;

        if (!apiKey) {
            console.error("Missing API key");
            return new Response(
                JSON.stringify({ error: "Service temporarily unavailable" }),
                { status: 503, headers: { "Content-Type": "application/json" } }
            );
        }

        const ai = new GoogleGenAI({ apiKey });

        // Create chat with history
        const chat = ai.chats.create({
            model: "gemini-2.0-flash-exp",
            config: {
                systemInstruction: SYSTEM_PROMPT,
                temperature: 0.6, // Slightly lower for more consistent answers
            },
            history: history.map((msg: { role: string; text: string }) => ({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.text }],
            })),
        });

        // Get streaming response
        const stream = await chat.sendMessageStream({ message });

        // Create a readable stream for the response
        const encoder = new TextEncoder();
        const readable = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of stream) {
                        if (chunk.text) {
                            controller.enqueue(
                                encoder.encode(`data: ${JSON.stringify({ text: chunk.text })}\n\n`)
                            );
                        }
                    }
                    controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                    controller.close();
                } catch (error) {
                    console.error("Stream error:", error);
                    controller.error(error);
                }
            },
        });

        return new Response(readable, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        });

    } catch (error) {
        console.error("Chat API error:", error);
        return new Response(
            JSON.stringify({ error: "Failed to process request" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
