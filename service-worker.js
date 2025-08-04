5. service-worker.js

```js
const cacheName = 'aviator-bot-cache-v1';
const assetsToCache = [
  '.',
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(assetsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(res => res || fetch(event.request))
  );
});