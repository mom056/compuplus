import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
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
            return NextResponse.json(
                { error: "Rate limit exceeded. Please wait a moment." },
                { status: 429 }
            );
        }

        let body;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { error: "Invalid JSON body" },
                { status: 400 }
            );
        }

        const { message, history = [] } = body;

        if (!message || typeof message !== "string") {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        // Initialize Gemini AI (API key is server-side only - SECURE!)
        const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_API_KEY;

        if (!apiKey) {
            console.error("[Chat API] Missing API key - GEMINI_API_KEY or NEXT_PUBLIC_API_KEY not set");
            return NextResponse.json(
                { error: "Service configuration error" },
                { status: 503 }
            );
        }

        console.log("[Chat API] Initializing with key:", apiKey.substring(0, 10) + "...");

        const ai = new GoogleGenAI({ apiKey });

        // Format history for Gemini
        const formattedHistory = history
            .filter((msg: { role: string; text: string }) => msg.text && msg.text.length > 0)
            .map((msg: { role: string; text: string }) => ({
                role: msg.role === "user" ? "user" : "model",
                parts: [{ text: msg.text }],
            }));

        console.log("[Chat API] Creating chat with", formattedHistory.length, "history messages");

        // Create chat with history
        const chat = ai.chats.create({
            model: "gemini-2.0-flash-exp",
            config: {
                systemInstruction: SYSTEM_PROMPT,
                temperature: 0.6,
            },
            history: formattedHistory,
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
                } catch (streamError) {
                    console.error("[Chat API] Stream error:", streamError);
                    controller.enqueue(
                        encoder.encode(`data: ${JSON.stringify({ error: "Stream interrupted" })}\n\n`)
                    );
                    controller.close();
                }
            },
        });

        return new Response(readable, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache, no-transform",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no",
            },
        });

    } catch (error) {
        console.error("[Chat API] Fatal error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(
            { error: "Failed to process request", details: errorMessage },
            { status: 500 }
        );
    }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}
