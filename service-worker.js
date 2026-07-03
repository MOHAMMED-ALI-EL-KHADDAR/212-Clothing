const CACHE_NAME = '212-clothing-v1';
const OFFLINE_URL = '/offline.html';

// Files to cache on install (critical paths + branding)
const CRITICAL_URLS = [
  '/',
  '/index.html',
  '/offline.html',
  '/Logo/Logo.png',
  '/CSS/styles.css',
  '/JS/cart.js',
  '/JS/currency.js',
  '/JS/i18n.js',
  '/JS/analytics.js'
];

// Install event: cache critical resources
self.addEventListener('install', event => {
  console.log('[SW] Install event');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching critical resources');
      return cache.addAll(CRITICAL_URLS).catch(err => {
        console.warn('[SW] Some resources failed to cache:', err);
        // Non-critical: don't block install if some files fail
      });
    }).then(() => {
      // Activate immediately (skip waiting)
      return self.skipWaiting();
    })
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
  console.log('[SW] Activate event');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});

// Fetch event: Network-first for API, Cache-first for assets
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // API/external calls: Network-first with offline fallback
  if (url.pathname.includes('/script.google.com') || 
      url.pathname.includes('api') ||
      request.method !== 'GET') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache successful responses
          if (response && response.status === 200 && response.type !== 'error') {
            const clonedResponse = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(request, clonedResponse);
            });
          }
          return response;
        })
        .catch(() => {
          // Offline: return offline page for navigation, cached response for assets
          if (request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
          return caches.match(request);
        })
    );
  } else {
    // Static assets: Cache-first (fast load, update in background)
    event.respondWith(
      caches.match(request).then(response => {
        if (response) {
          return response;
        }
        return fetch(request)
          .then(response => {
            // Cache successful responses
            if (response && response.status === 200) {
              const clonedResponse = response.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(request, clonedResponse);
              });
            }
            return response;
          })
          .catch(() => {
            // Last resort: offline page for navigation
            if (request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
          });
      })
    );
  }
});

// Background sync (future: order notifications when back online)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-orders') {
    event.waitUntil(
      // Sync order status if previously offline
      fetch('/order-status.html')
        .catch(() => console.log('[SW] Order sync failed (offline)'))
    );
  }
});

// Push notifications (future: order updates)
self.addEventListener('push', event => {
  if (!event.data) return;
  const data = event.data.json();
  const options = {
    body: data.body || 'Your 212 Clothing order has an update',
    icon: '/Logo/Logo.png',
    badge: '/Logo/Logo.png',
    tag: 'order-notification',
    requireInteraction: false,
    vibrate: [200, 100, 200]
  };
  event.waitUntil(
    self.registration.showNotification(data.title || '212 Clothing', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      // Check if app is already open
      for (let i = 0; i < clientList.length; i++) {
        if (clientList[i].url === '/' && 'focus' in clientList[i]) {
          return clientList[i].focus();
        }
      }
      // Open app if not running
      if (clients.openWindow) {
        return clients.openWindow('/order-status.html');
      }
    })
  );
});
