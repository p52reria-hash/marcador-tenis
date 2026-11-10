// Cache solo de recursos propios, sin interceptar solicitudes externas.
const CACHE='marcador-tenis-pwa-segura-v1-1';
const FILES=['./','./index.html','./style.css','./app.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('marcador-tenis-pwa-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET'||new URL(request.url).origin!==self.location.origin)return;
 const url=new URL(request.url);
 if(!FILES.some(path=>new URL(path,self.registration.scope).pathname===url.pathname))return;
 event.respondWith(caches.match(request).then(cached=>cached||fetch(request)));
});
