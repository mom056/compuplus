const CACHE_NAME = 'compuplus-v5';
const urlsToCache = [
    '/',
    '/logo-sm.png',
    '/manifest.json',
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - ONLY handle same-origin requests, skip all third-party
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // CRITICAL: Skip ALL third-party requests - let them go directly to the network
    // This prevents CSP issues with Cloudinary, TransparentTextures, Google Fonts, etc.
    if (url.origin !== self.location.origin) {
        return; // Do nothing, browser will fetch normally
    }

    // Only handle same-origin requests below
    if (event.request.mode === 'navigate') {
        // Network First for HTML navigation
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
    } else {
        // Cache First for same-origin assets
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    if (response) return response;

                    return fetch(event.request.clone()).then((response) => {
                        if (!response || response.status !== 200) return response;

                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                        return response;
                    });
                })
        );
    }
});
