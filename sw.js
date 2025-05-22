// --- sw.js ---
const CACHE_NAME = 'brainpower-mw-app-v16'; // <-- Incremented version
const URLS_TO_CACHE = [
    '/',
    'index.html',
    'style.css',
    'language_strings.js', // ADDED
    'page_content.js',     // ADDED
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
    // Placeholders for new page icons (if you create them, uncomment and add actual paths)
    /*
    'images/icon_parents.png', 
    'images/icon_school_pathways.png', 
    'images/icon_research.png', 
    */

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
    'pdfs/Mindful_Me_Curriculum_Overview_BrainPower.pdf' // Added as per Teacher Resources page
];

self.addEventListener('install', event => {
    console.log('[Service Worker] Install event in progress.');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Opened cache: ', CACHE_NAME);
                return cache.addAll(URLS_TO_CACHE)
                    .then(() => console.log('[Service Worker] All core assets cached successfully.'))
                    .catch(err => {
                        console.error('[Service Worker] Failed to cache one or more resources during install:', err);
                        // Optional: Attempt to fetch and log problematic URLs
                        URLS_TO_CACHE.forEach(url => {
                            if (!cache.match(url)) { // Check if already cached successfully
                                fetch(url, { method: 'HEAD', cache: 'no-store' }) 
                                    .then(res => { if (!res.ok) console.error(`[SW Install] Problem with URL: ${url}, Status: ${res.status}`); })
                                    .catch(e => console.error(`[SW Install] Network error for URL: ${url}`, e));
                            }
                        });
                    });
            })
            .catch(err => {
                console.error('[Service Worker] Failed to open cache during install:', err);
            })
    );
});

self.addEventListener('fetch', event => {
    // We only want to handle GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                // If we found a match in the cache, return it
                if (cachedResponse) {
                    // console.log('[Service Worker] Serving from cache:', event.request.url);
                    return cachedResponse;
                }

                // If no match in cache, try to fetch from the network
                // console.log('[Service Worker] Fetching from network:', event.request.url);
                return fetch(event.request).then(
                    networkResponse => {
                        // Check if we received a valid response
                        if (!networkResponse || networkResponse.status !== 200 || 
                            (networkResponse.type !== 'basic' && networkResponse.type !== 'cors')) { // 'cors' for CDN resources
                            return networkResponse;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        const responseToCache = networkResponse.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                // console.log('[Service Worker] Caching new resource:', event.request.url);
                                cache.put(event.request, responseToCache);
                            });

                        return networkResponse;
                    }
                ).catch(error => {
                    // Network request failed, try to serve offline page for navigation requests
                    console.warn('[Service Worker] Fetch failed; returning offline page instead.', event.request.url, error);
                    if (event.request.mode === 'navigate') { // Only for page navigations
                        return caches.match('offline.html');
                    }
                    // For other types of requests (images, scripts, etc.), just let the error propagate
                    // or return a specific placeholder if appropriate (e.g., placeholder image)
                });
            })
    );
});

self.addEventListener('activate', event => {
    console.log('[Service Worker] Activate event in progress.');
    const cacheWhitelist = [CACHE_NAME]; // Only the current cache version
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        // If this cache name is not in our whitelist, delete it
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('[Service Worker] Activated and old caches cleaned.');
            // Tell the active service worker to take control of the page immediately.
            return self.clients.claim(); 
        })
    );
});