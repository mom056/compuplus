"use client";

import { useEffect } from 'react';

// IMPORTANT: Increment this when you make breaking changes to sw.js
const CURRENT_SW_VERSION = 'v6';

export function ServiceWorkerRegistration() {
    useEffect(() => {
        if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
            const storedVersion = localStorage.getItem('sw-version');

            // Force refresh if version mismatch OR if no version stored (legacy users)
            const needsRefresh = storedVersion !== CURRENT_SW_VERSION;

            if (needsRefresh) {
                // Unregister all service workers
                navigator.serviceWorker.getRegistrations().then((registrations) => {
                    registrations.forEach((registration) => {
                        registration.unregister();
                    });
                });

                // Clear all caches
                caches.keys().then((names) => {
                    names.forEach((name) => {
                        caches.delete(name);
                    });
                });

                // Update stored version
                localStorage.setItem('sw-version', CURRENT_SW_VERSION);

                // Reload to get fresh content
                window.location.reload();
                return;
            }

            // Register new SW
            navigator.serviceWorker
                .register('/sw.js')
                .then((registration) => {
                    // Store current version
                    localStorage.setItem('sw-version', CURRENT_SW_VERSION);

                    // Listen for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    // New SW available, auto-reload
                                    window.location.reload();
                                }
                            });
                        }
                    });
                })
                .catch(() => {
                    // Silent fail in production
                });

            // Handle SW controller change (when new SW takes over)
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                window.location.reload();
            });
        }
    }, []);

    return null;
}
