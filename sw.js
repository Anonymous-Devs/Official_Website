self.addEventListener('install', (event) => {
    if ('caches' in self) {
        caches.open('cache')
              .then((cache) => {
                  return cache.addAll([
                      'index.html',
                      'sw-register.js',
                      'css/desktop.css',
                      'css/font-awesome/css/font-awesome.css',
                      'css/fonts/Roboto/Roboto-Regular.ttf',
                      'css/fonts/Marmelad/Marmelad-Regular.ttf'
                  ]);
              })
              .catch((err) => {
                  console.log(err);
              });
    }
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
              .then((response) => {
                  return response || fetch(event.request).then((response) => {
                      return caches.open('cache')
                                   .then((cache) => {
                                       cache.put(event.request, response.clone());
                                       return response;
                                   })
                                   .catch((err) => {
                                       console.log(err);
                                   });
                  })
                  .catch((err) => {
                      console.log(err);
                  });
              })
              .catch((err) => {
                  console.log(err);
              })
    )
});