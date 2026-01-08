/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                },
                cyan: {
                    400: '#00E5FF',
                    500: '#06b6d4',
                    600: '#0891b2',
                    900: '#164e63',
                },
                violet: {
                    500: '#8b5cf6',
                    600: '#7c3aed',
                    900: '#4c1d95',
                },
            },
            fontFamily: {
                sans: ['Inter', 'Cairo', 'sans-serif'],
                mono: ['Fira Code', 'monospace'],
                cairo: ['Cairo', 'sans-serif'],
            },
            transitionTimingFunction: {
                'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
            },
            animation: {
                'spin-slow': 'spin 20s linear infinite',
                'spin-reverse-slow': 'spin-reverse 25s linear infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 8s ease-in-out infinite',
                'marquee': 'marquee 40s linear infinite',
                'marquee-reverse': 'marquee-reverse 40s linear infinite',
                'blob': 'blob 10s infinite',
                'scanner': 'scanner 3s linear infinite',
                'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                'ping-slower': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
            },
            keyframes: {
                'spin-reverse': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(-360deg)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'marquee-reverse': {
                    '0%': { transform: 'translateX(-50%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
                draw: {
                    '0%': { strokeDashoffset: '1000' },
                    '100%': { strokeDashoffset: '0' },
                },
                blob: {
                    '0%': { transform: 'translate(0px, 0px) scale(1)' },
                    '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '100%': { transform: 'translate(0px, 0px) scale(1)' },
                },
                scanner: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' },
                }
            },
        },
    },
    plugins: [],
};
