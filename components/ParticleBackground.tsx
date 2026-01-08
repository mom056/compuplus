"use client";

import React, { useEffect, useRef } from 'react';
import { useApp } from '@/app/providers';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useApp(); // Get theme from context

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- CONFIGURATION ---
    let width = 0, height = 0;
    let particles: Particle[] = [];
    let pulses: Pulse[] = [];
    let shootingStars: ShootingStar[] = [];
    let animationFrameId: number;
    let isPaused = false;

    // Interaction
    const mouse = { x: -1000, y: -1000, radius: 250 };

    // Colors determine based on React State theme
    const isDark = theme === 'dark';
    // Cyan & Violet palette
    const colors = isDark
      ? ['0, 229, 255', '139, 92, 246', '255, 255, 255']
      : ['15, 23, 42', '124, 58, 237', '56, 189, 248'];

    // --- CLASSES ---

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      layer: number; // 0: Back (slow), 1: Mid, 2: Front (fast)

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.layer = Math.floor(Math.random() * 3);

        // Speed depends on layer (Parallax Effect)
        const speedMult = (this.layer + 1) * 0.15;
        this.vx = (Math.random() - 0.5) * speedMult;
        this.vy = (Math.random() - 0.5) * speedMult;

        // Size depends on layer
        this.size = Math.random() * (this.layer + 1) + 0.5;

        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = width;
        else if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        else if (this.y > height) this.y = 0;

        // Mouse Repulsion (Force Field) - Only applies to Mid & Front layers
        if (this.layer > 0) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const forceDirectionX = dx / dist;
            const forceDirectionY = dy / dist;
            const force = (mouse.radius - dist) / mouse.radius;
            // Stronger force for front layer
            const strength = force * (this.layer === 2 ? 2 : 1);

            this.x -= forceDirectionX * strength;
            this.y -= forceDirectionY * strength;
          }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${0.5 + (this.layer * 0.2)})`; // Brighter front layers
        ctx.fill();
      }
    }

    class Pulse {
      p1: Particle;
      p2: Particle;
      progress: number;
      speed: number;
      constructor(p1: Particle, p2: Particle) {
        this.p1 = p1;
        this.p2 = p2;
        this.progress = 0;
        this.speed = 0.02 + Math.random() * 0.03;
      }

      update() {
        this.progress += this.speed;
        return this.progress >= 1;
      }

      draw() {
        if (!ctx) return;
        const curX = this.p1.x + (this.p2.x - this.p1.x) * this.progress;
        const curY = this.p1.y + (this.p2.y - this.p1.y) * this.progress;

        ctx.beginPath();
        ctx.arc(curX, curY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#fff' : '#0ea5e9';
        ctx.shadowBlur = 5;
        ctx.shadowColor = isDark ? '#fff' : '#0ea5e9';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    class ShootingStar {
      x: number;
      y: number;
      len: number;
      speed: number;
      angle: number;
      life: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height * 0.5; // Start in top half
        this.len = Math.random() * 80 + 20;
        this.speed = Math.random() * 10 + 5;
        this.angle = Math.PI / 4; // 45 degrees
        this.life = 1.0;
      }

      update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life -= 0.02;
        return this.life <= 0 || this.x > width || this.y > height;
      }

      draw() {
        if (!ctx) return;
        const endX = this.x - Math.cos(this.angle) * this.len;
        const endY = this.y - Math.sin(this.angle) * this.len;

        const grad = ctx.createLinearGradient(this.x, this.y, endX, endY);
        const starColor = isDark ? '255, 255, 255' : '15, 23, 42';
        grad.addColorStop(0, `rgba(${starColor}, ${this.life})`);
        grad.addColorStop(1, `rgba(${starColor}, 0)`);

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }

    // --- LIFECYCLE ---

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      // Responsive count
      const count = width < 768 ? 40 : width < 1280 ? 80 : 120;

      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx || isPaused) return;

      // Clear with slight trail for motion blur feel (optional, but clean clear is better for sharp UI)
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Nebulas (Gradient blobs)
      // Just simulated with static gradients for performance
      /* Ambient handling is done via CSS in the parent div for better performance */

      // 2. Update & Draw Particles
      particles.forEach((p, i) => {
        p.update();
        p.draw(); // Draw dot

        // Connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const connectionDist = 120;

          if (dist < connectionDist) {
            ctx.beginPath();
            const alpha = (1 - dist / connectionDist) * 0.3;
            ctx.strokeStyle = `rgba(${p.color}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            // Chance to spawn a data pulse
            if (Math.random() < 0.001) {
              pulses.push(new Pulse(p, p2));
            }
          }
        }
      });

      // 3. Update & Draw Pulses
      pulses = pulses.filter(pulse => {
        pulse.draw();
        return !pulse.update();
      });

      // 4. Update & Draw Shooting Stars
      if (Math.random() < 0.005) { // roughly 1 every 3-4 seconds (at 60fps)
        shootingStars.push(new ShootingStar());
      }
      shootingStars = shootingStars.filter(star => {
        star.draw();
        return !star.update();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isPaused = true;
        cancelAnimationFrame(animationFrameId);
      } else {
        isPaused = false;
        animate();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-run when theme changes

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 bg-slate-50 dark:bg-navy-950 transition-colors duration-500 overflow-hidden">
      {/* CSS-based Nebulas for performance */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-20 animate-pulse-slow">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/20 blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-500/20 blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-blue-500/20 blur-[100px] animate-blob animation-delay-4000" />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-50/80 via-transparent to-slate-50/80 dark:from-navy-950/80 dark:via-transparent dark:to-navy-950/80" />
    </div>
  );
};

export default ParticleBackground;