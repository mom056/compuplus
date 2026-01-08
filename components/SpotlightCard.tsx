"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

export const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        x.set(clientX - left);
        y.set(clientY - top);
    }

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            className={`group relative border border-slate-200/50 dark:border-white/10 bg-white/40 dark:bg-navy-900/40 overflow-hidden ${className}`}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
                }}
            />
            {children}
        </div>
    );
};
