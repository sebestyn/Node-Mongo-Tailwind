/*
    IMPORTANT: file location must be in the main scope (/public) folder
*/

const CACHE_NAME = "site-static";
const ASSETS = [
    "/",

    "/img/nothing_found.png",

    "/css/loader.css",
    "/css/all.css",
    "/css/home.css",

    "/js/loader.js",
    "/js/hasznos.js",
    "/js/cookie.js",

    "/cdn/tailwind.css",
];

// install service-worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ASSETS);
            })
            .then(self.skipWaiting())
            .catch((err) => {
                console.log(err);
            })
    );
});

// activate event
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keyList) => {
                return Promise.all(
                    keyList.map((key) => {
                        if (key !== CACHE_NAME) {
                            console.log("[ServiceWorker] Removing old cache", key);
                            return caches.delete(key);
                        }
                    })
                );
            })
            .then(() => self.clients.claim())
            .catch((err) => {
                console.log(err);
            })
    );
});

// fetch event
self.addEventListener("fetch", (event) => {
    if (event.request.method == "GET") {
        if (navigator.onLine) {
            event.respondWith(
                fetch(event.request).then((response) => {
                    let responseToCache = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                    return response;
                })
            );
        } else {
            event.respondWith(
                caches.match(event.request).then(function (cachedResponse) {
                    return cachedResponse || fetch(event.request);
                })
            );
        }
    }
});
