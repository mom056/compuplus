"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    duration?: number;
}

export const Reveal = ({
    children,
    width = "fit-content",
    className,
    delay = 0.25,
    direction = "up",
    duration = 0.5,
}: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(element);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    // Calculate initial transform based on direction
    const getInitialTransform = () => {
        switch (direction) {
            case "up": return "translateY(40px)";
            case "down": return "translateY(-40px)";
            case "left": return "translateX(40px)";
            case "right": return "translateX(-40px)";
            default: return "translateY(40px)";
        }
    };

    return (
        <div
            ref={ref}
            style={{
                position: "relative",
                width,
                overflow: "visible",
            }}
            className={className}
        >
            <div
                style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translate(0)" : getInitialTransform(),
                    transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
                }}
            >
                {children}
            </div>
        </div>
    );
};
