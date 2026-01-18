"use client";

import React, { useEffect, useRef } from "react";
import { m, LazyMotion, domAnimation, useInView, useAnimation } from "framer-motion";
import { cn } from "@/utils/cn"; // We will create this utility

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
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
        }
    }, [isInView, mainControls]);

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 75 : direction === "down" ? -75 : 0,
            x: direction === "left" ? 75 : direction === "right" ? -75 : 0,
        },
        visible: { opacity: 1, y: 0, x: 0 },
    };

    return (
        <div ref={ref} style={{ position: "relative", width, overflow: "visible" }} className={className}>
            <LazyMotion features={domAnimation}>
                <m.div
                    variants={variants}
                    initial="hidden"
                    animate={mainControls}
                    transition={{ duration, delay, type: "spring", stiffness: 50 }}
                >
                    {children}
                </m.div>
            </LazyMotion>
        </div>
    );
};
