const appName = 'graphql-pwa'

this.addEventListener('install',(event) => {
  event.waitUntil(
    caches.open(appName).then((cache) => {
      cache.addAll([
        '/static/js/main.chunk.js',
        '/static/js/0.chunk.js',
        '/static/js/bundle.js',
        '/static/css/main.chunk.css',
        '/bootstrap.min.css',
        '/index.html',
        '/',
        '/login',
        '/sign-in',
        '/profile',
        '/home'
      ])
    })
  )
})

this.addEventListener('fetch',(event) => {
  if (!navigator.onLine) {
    if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
      event.waitUntil(
        this.registration.showNotification("Internet", {
          body: "internet not working",
        })
      )
    }
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp
        }
        let requestUrl = event.request.clone();
        fetch(requestUrl)
      })
    )
  }
})