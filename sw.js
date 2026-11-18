const V='fit30-v9',A=['./','index.html','manifest.json','apple-touch-icon.png','icon-180.png','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(A)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;
 if(q.mode==='navigate'){e.respondWith(fetch(q).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put('index.html',c));return n}).catch(()=>caches.match('index.html')));return}
 e.respondWith(caches.match(q,{ignoreSearch:true}).then(r=>r||fetch(q).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put(q,c));return n}).catch(()=>caches.match('index.html'))))});
