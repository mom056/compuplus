"use client";

import { useEffect } from 'react';

// IMPORTANT: Increment this when you make breaking changes to sw.js
const CURRENT_SW_VERSION = 'v5';

export function ServiceWorkerRegistration() {
    useEffect(() => {
        if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
            const storedVersion = localStorage.getItem('sw-version');

            // If version mismatch, force unregister all SWs and clear caches
            if (storedVersion && storedVersion !== CURRENT_SW_VERSION) {
                console.log(`SW version mismatch: ${storedVersion} → ${CURRENT_SW_VERSION}. Forcing refresh...`);

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
                    console.log('SW registered:', registration.scope);

                    // Store current version
                    localStorage.setItem('sw-version', CURRENT_SW_VERSION);

                    // Listen for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    // New SW available, notify or auto-reload
                                    console.log('New SW version available. Refreshing...');
                                    window.location.reload();
                                }
                            });
                        }
                    });
                })
                .catch((error) => {
                    console.log('SW registration failed:', error);
                });

            // Handle SW controller change (when new SW takes over)
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.log('SW controller changed. Reloading...');
                window.location.reload();
            });
        }
    }, []);

    return null;
}
