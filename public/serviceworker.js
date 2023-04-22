const CACHE_NAME = "version1";
// cache: browser storage
const urlsToCache = ["index.html", "offline.html"];
// html to show when offline

const self = this;
// equals service worker

// install service worker
self.addEventListener("install", (e) => {
  // callback function executed after event call
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      // returns a promise
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
    // open cache and add files
    // you can check app - cache storage for cached data
  );
});
// service worker itself

// listen for requests
self.addEventListener("fetch", (e) => {
  // callback function executed after event call
  e.respondWith(
    //respond when we notice a fetch req
    caches.match(e.request).then(() => {
      // match all requests
      return (
        fetch(e.request)
          // fetch the requests
          .catch(() => {
            // if we can't fetch data, no internet, return offline
            return caches.match("offline.html");
          })
      );
    })
  );
});

// activate service worker
self.addEventListener("activate", (e) => {
  // callback function executed after event call
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);
  // keep only version1 & WhiteList version

  e.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            // if cacheWhiteList does not include cacheName, then we want to delete specific cacheName
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
