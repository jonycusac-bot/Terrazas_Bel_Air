// Service Worker para PWA - Terrazas de Bel Air
const CACHE_NAME = 'terrazas-bel-air-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/translations.js',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Instalar Service Worker
self.addEventListener('install', function(event) {
  console.log('🔧 Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('📦 Service Worker: Archivos en caché');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activar Service Worker
self.addEventListener('activate', function(event) {
  console.log('✅ Service Worker: Activado');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Service Worker: Eliminando caché antigua', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar peticiones de red
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Si está en caché, devolverlo
        if (response) {
          return response;
        }
        
        // Si no, hacer petición de red
        return fetch(event.request).then(function(response) {
          // Verificar si es una respuesta válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clonar la respuesta
          var responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      }
    )
  );
});

// Manejar notificaciones push (opcional)
self.addEventListener('push', function(event) {
  console.log('📢 Notificación push recibida');
  
  const options = {
    body: event.data ? event.data.text() : 'Nueva actualización disponible',
    icon: 'https://via.placeholder.com/192x192/667eea/ffffff?text=TBA',
    badge: 'https://via.placeholder.com/72x72/667eea/ffffff?text=!',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver más',
        icon: 'https://via.placeholder.com/24x24/667eea/ffffff?text=>'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: 'https://via.placeholder.com/24x24/dc3545/ffffff?text=X'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Terrazas de Bel Air', options)
  );
});

// Manejar clics en notificaciones
self.addEventListener('notificationclick', function(event) {
  console.log('🔔 Clic en notificación');
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});