// =====================================================================
//  SERVICE WORKER  (sw.js) — делает сайт «приложением»
//  Сохраняет файлы страницы в телефоне: второй запуск мгновенный,
//  страница открывается даже без интернета.
//  Меняете файлы сайта — увеличьте номер версии, чтобы телефоны обновились.
// =====================================================================

const VERSION = "torte-v1";

const FILES = [
  "./", "index.html", "style.css", "app.js", "config.js", "manifest.json",
  "images/logo.png", "images/icon-192.png", "images/icon-512.png",
  "images/balli.jpg", "images/napaleon.jpg", "images/praqa.jpg", "images/lavanda.jpg",
  "images/tortasty.jpg", "images/snickers.jpg", "images/redvelvet.jpg", "images/ideal.jpg",
  "images/aleksandr.jpg", "images/qussudu.jpg",
];

// Установка: скачать и сохранить все файлы
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)));
  self.skipWaiting();
});

// Активация: удалить старые версии
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))));
  self.clients.claim();
});

// Запросы: сначала из интернета (свежие цены), без сети — из сохранённого
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
