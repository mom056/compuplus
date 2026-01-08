"use client";

import React from 'react';
import Navbar from './Navbar';
import { useApp } from '@/app/providers';

export default function GlobalNavbar() {
    const { theme, toggleTheme } = useApp();

    return <Navbar theme={theme} toggleTheme={toggleTheme} />;
}
