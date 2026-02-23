const CACHE_NAME = 'hydrotrack-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './report.html',
  './global.css',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/chart.js', // Cache the library too!
  './icon-192.png',
  './icon-512.png'
];

// 1. Install Event - Caches the files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Fetch Event - Serves cached files if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return the cached version if found, otherwise fetch from the network
      return response || fetch(event.request);
    })
  );
});

// 3. Activate Event - Cleans up old caches if you update CACHE_NAME
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
});