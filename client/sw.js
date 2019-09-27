self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('first-app').then(function(cache) {
      cache.addAll(['/', '/index.html', '/style.css', '/client/app.js'])
    })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(res) {
      return res
    })
  )
})
