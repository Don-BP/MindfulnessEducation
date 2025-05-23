// --- sw.js ---
const CACHE_NAME = 'brainpower-mw-app-v18'; // Incremented version
const URLS_TO_CACHE = [
    '/',
    'index.html',
    'style.css',
    'language_strings.js',
    'page_content.js',
    'app.js',
    'manifest.json',
    'offline.html',
    'images/logo.png',
    'images/icon-192x192.png',
    'images/icon-512x512.png',
    'images/icon-students.png',
    'images/icon-teachers.png',
    'images/icon-resources.png',
    'images/hero-background.jpg',
    'images/mind_puppy_icon.png',
    'images/shake_freeze_icon.png',
    'images/amazing_brain_icon.png',
    'images/coloring_mandala.png',
    'images/coloring_nature.png',
    // Add paths to any new icons for Student Zone if created, e.g.:
    // 'images/finger_breathing_icon.png',
    // 'images/thought_watching_icon.png',
    // 'images/kindness_wish_icon.png',

    // Audio files
    'audio/quick_calm_1min.mp3',
    'audio/mindful_breathing_3min.mp3',
    'audio/mindful_breathing_5min.mp3',
    'audio/body_scan_10min.mp3',
    'audio/mindful_listening_sounds_3min.mp3',
    'audio/thoughts_as_clouds_5min.mp3',
    'audio/stop_practice_2min.mp3',
    'audio/loving_kindness_5min.mp3',
    'audio/gratitude_reflection_4min.mp3',
    'audio/rain_practice_reflection_7min.mp3',
    'audio/mindful_movement_5min.mp3',
    'audio/3step_breathing_space_3min.mp3',

    // PDF Resources
    'pdfs/What_Is_Mindfulness_BrainPower.pdf',
    'pdfs/MiSP_MfCP_Overview_BrainPower.pdf',
    'pdfs/BrainPower_MW_Vision.pdf',
    'pdfs/Mindful_Minutes_Guide_ES.pdf',
    'pdfs/Mindful_Minutes_Guide_JHS.pdf',
    'pdfs/Adult_MW_Foundations_Overview.pdf',
    'pdfs/Tips_for_Teaching_Mindfulness.pdf',
    'pdfs/coloring_mandala_printable.pdf',
    'pdfs/coloring_nature_printable.pdf',
    'pdfs/Mindful_Me_Curriculum_Overview_BrainPower.pdf',

    // External libraries (if any, ensure full path if hosted locally)
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;700&display=swap'
];

self.addEventListener('install', event => {
    console.log('[Service Worker] Install event in progress.');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Opened cache: ', CACHE_NAME);
                // Use {cache: 'reload'} for resources that might change frequently, or to ensure freshness
                // For core assets, default caching is usually fine.
                // For external resources like Google Fonts or FontAwesome, it's good to cache them.
                const cachePromises = URLS_TO_CACHE.map(urlToCache => {
                    // For external resources, create a Request object with 'no-cors' if needed,
                    // but be aware of opaque responses. Better if they support CORS.
                    // Google Fonts and FontAwesome CDN should support CORS.
                    return cache.add(urlToCache).catch(err => {
                        console.warn(`[Service Worker] Failed to cache ${urlToCache} during install:`, err);
                    });
                });
                return Promise.all(cachePromises)
                    .then(() => console.log('[Service Worker] Core assets caching attempt finished.'));
            })
            .catch(err => {
                console.error('[Service Worker] Failed to open cache during install:', err);
            })
    );
});


self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') {
        return;
    }

    // Strategy: Cache First, then Network, with Offline Fallback for navigation
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    // If resource is in cache, return it
                    return cachedResponse;
                }

                // If not in cache, try to fetch from network
                return fetch(event.request).then(
                    networkResponse => {
                        // Check if we received a valid response
                        if (!networkResponse || networkResponse.status !== 200 ||
                            (networkResponse.type !== 'basic' && networkResponse.type !== 'cors' && networkResponse.type !== 'opaque')) {
                            // 'opaque' is for no-cors requests which we can't inspect but can cache.
                            // For fonts, opaque responses might not work as expected if not handled correctly by the browser.
                            // However, Google Fonts and FontAwesome CDN usually provide CORS headers.
                            return networkResponse;
                        }

                        const responseToCache = networkResponse.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return networkResponse;
                    }
                ).catch(error => {
                    // Network request failed
                    console.warn('[Service Worker] Fetch failed for:', event.request.url, error);
                    // For page navigations, serve the offline page
                    if (event.request.mode === 'navigate') {
                        return caches.match('offline.html');
                    }
                    // For other assets (images, css, js), the browser will show its default error.
                    // You could return a placeholder image/style if needed, but it adds complexity.
                });
            })
    );
});

self.addEventListener('activate', event => {
    console.log('[Service Worker] Activate event in progress.');
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('[Service Worker] Activated and old caches cleaned.');
            return self.clients.claim();
        })
    );
});