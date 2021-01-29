'use strict';

// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v9';

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
    './index.html',

    './css/style.css',

    './js/conmon.js',
    // '/js/gsap.min.js',
    // '/js/jquery.min.js',
    // '/js/modernizr-custom.js',
    // '/js/particles.min.js',
    // '/js/particlesJsConfig.js',
    // '/js/ScrollToPlugin.min.js',
    // '/js/ScrollTrigger.min.js',

    // '/img/jobs/dental_1.mp4',
    // '/img/jobs/dental_2.mp4',
    // '/img/jobs/dental_3.mp4',
    // '/img/jobs/dock_1.mp4',
    // '/img/jobs/dock_2.mp4',
];

self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    // CODELAB: Precache static resources here.
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    // CODELAB: Remove previous cached data from disk.
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
    // CODELAB: Add fetch event handler here.
    // if (evt.request.mode !== 'navigate') {
    //   // Not a page navigation, bail.
    //   console.log("Fetch no navigate");
    //   return;
    // }
    console.log('[ServiceWorker] Fetch', evt.request.url);
    evt.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(evt.request)
                .then((response) => {
                    console.log("RESP", response);
                    return response || fetch(evt.request);
                });
        })
    );
});