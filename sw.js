```javascript
const CACHE_NAME = 'playstore-v1';
const ASSETS = [
  './index.html',
  './manifest.json',
  './play.jpg'
];

// Service Worker Kurulumu ve Dosyaların Önbelleğe Alınması
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Eski Önbelleklerin Temizlenmesi
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Çevrimdışı Çalışabilme Desteği
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

```
