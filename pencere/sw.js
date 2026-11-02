// =====================================================================
//  SERVICE WORKER  (sw.js) — делает сайт «приложением»
//  Сохраняет файлы в телефоне: второй запуск быстрый, работает без интернета.
//  Конструктор при каждом экспорте ставит новую VERSION, поэтому
//  телефоны клиентов сами подхватят обновления.
// =====================================================================

const VERSION = "pencere-202611021926";
const FILES = ["./","config.js","manifest.json","images/icon-192.png","images/icon-512.png","index.html","style.css","app.js","core.js","core.css","images/logo.png","images/rafaello.jpg","images/cobanyastigi.jpg","images/agsokolad.jpg","images/qarasokolad.jpg","images/adgunu.jpg","images/orxideya.jpg"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))));
  self.clients.claim();
});

// Сначала из интернета (свежие цены), без сети — из сохранённого
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
