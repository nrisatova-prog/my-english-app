const CACHE_PREFIX = "my-english-offline-";
const CACHE_NAME = `${CACHE_PREFIX}v5`;
const PUBLIC_ASSETS = ["/manifest.json", "/icon-192.png", "/icon-512.png"];
const OFFLINE_MESSAGE = "Эта страница недоступна без интернета. Открой My English онлайн и попробуй снова.";

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.allSettled(["/", ...PUBLIC_ASSETS].map((url) => cache.add(url)));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(
      names
        .filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
        .map((name) => caches.delete(name)),
    );
    await self.clients.claim();
  })());
});

async function fetchPage(request, cacheKey) {
  const cache = cacheKey ? await caches.open(CACHE_NAME) : null;
  let response;
  try {
    response = await fetch(request);
  } catch {
    const saved = cache && await cache.match(cacheKey);
    return saved ?? new Response(OFFLINE_MESSAGE, {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  if (cache && response.ok && !response.redirected) {
    await cache.put(cacheKey, response.clone()).catch(() => {});
  }
  return response;
}

async function fetchAsset(request) {
  const cache = await caches.open(CACHE_NAME);
  const saved = await cache.match(request);
  if (saved) return saved;

  const response = await fetch(request);
  if (response.ok) await cache.put(request, response.clone()).catch(() => {});
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    const isStudyPage = url.pathname === "/" ||
      url.pathname === "/courses" ||
      /^\/courses\/(a1|a2|b1|b2|c1|c2)\/?$/i.test(url.pathname);
    event.respondWith(fetchPage(request, isStudyPage && !url.search ? url.pathname : null));
    return;
  }

  if (url.pathname.startsWith("/_next/static/") || PUBLIC_ASSETS.includes(url.pathname)) {
    event.respondWith(fetchAsset(request));
  }
});
