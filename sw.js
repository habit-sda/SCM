// ══════════════════════════════════════════════════════
// SCM System — Service Worker
// Menangani: offline cache + deteksi versi baru otomatis
// ══════════════════════════════════════════════════════
const APP_VERSION = '1.9.1';
const CACHE_NAME  = 'scm-cache-v' + APP_VERSION;

const CORE_ASSETS = [
  './index.html',
  './manifest.json',
  './version.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

// ── INSTALL: cache semua asset inti ──────────────────
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  // Jangan langsung skipWaiting di sini — biarkan user yang memutuskan
  // via tombol "Update Sekarang" di popup, supaya tidak reload paksa
  // saat sedang mengisi data.
});

// ── ACTIVATE: bersihkan cache versi lama ─────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: cache-first, fallback ke network ──────────
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => cached || caches.match('./index.html'));
      // Cache-first untuk kecepatan, tapi tetap update cache di background
      return cached || networkFetch;
    })
  );
});

// ── MESSAGE: terima perintah skipWaiting dari halaman ──
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
