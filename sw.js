// 캐시 버전 올리면 자동으로 새 파일 로드
const CACHE = 'koinonia-v3';

self.addEventListener('install', e => {
  self.skipWaiting(); // 즉시 활성화
});

self.addEventListener('activate', e => {
  // 구버전 캐시 전부 삭제
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // 항상 네트워크 우선, 실패 시만 캐시
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
