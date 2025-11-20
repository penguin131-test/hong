// Service Worker for offline support

const CACHE_NAME = "hong-tet-v1"
const urlsToCache = ["/", "/offline", "/app/globals.css"]

// Install event - cache essential files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching essential files")
      return cache.addAll(urlsToCache).catch((err) => {
        console.log("[Service Worker] Cache addAll error:", err)
      })
    }),
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[Service Worker] Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  const { request } = event

  // Skip non-GET requests
  if (request.method !== "GET") {
    return
  }

  event.respondWith(
    caches.match(request).then((response) => {
      // Serve from cache if available
      if (response) {
        return response
      }

      // Try network
      return fetch(request)
        .then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type === "error") {
            return response
          }

          // Clone the response for caching
          const responseToCache = response.clone()

          // Cache GET requests to HTML pages, CSS, JS, and images
          const contentType = response.headers.get("content-type")
          const isHTML = contentType && contentType.includes("text/html")
          const isAsset = request.url.match(/\.(js|css|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf)$/i)

          if (isHTML || isAsset) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache)
            })
          }

          return response
        })
        .catch(() => {
          // Network failed, check for offline page
          if (request.destination === "document") {
            return caches.match("/offline").catch(() => {
              return new Response("Không thể kết nối. Vui lòng kiểm tra kết nối internet.", {
                status: 503,
                statusText: "Service Unavailable",
                headers: new Headers({
                  "Content-Type": "text/plain; charset=utf-8",
                }),
              })
            })
          }
        })
    }),
  )
})
