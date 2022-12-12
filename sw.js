//Asignar nombre y versin de la cache

const CACHE_NAME = 'v1_cache-eli_pwa';

//Ficheros chache app

var urlsToCache = [
    './',
    './css/styles.css',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/AR.jpg',
    './img/AR.mp4',
    './img/AR2.mp4',
    './img/caricatura.jpg',
    './img/estelar.jpg',
    './img/img5.jpg',
    './img/logo.jpg',
    './img/lunar.jpg',
    './img/spo.jpg',
    './img/YT.jpg',
];

//Eventos
//Install serviceworker y guardar cache de recursos estaticos

self.addEventListener('install', e =>{
    e.waitUntil(
        caches.open(CACHE_NAME)
                .then(cache => {
                    return cache.addAll(urlsToCache)
                                .then(()=>{
                                    self.skipWaiting();
                                })
                                
                })
                .catch(err => console.log('No se ha registrado la cache', err))
    );
});

//Activate
//App funcione sin conexión
self.addEventListener('activate', e=>{
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
                .then(cacheNames =>{
                    return Promise.all(
                        cacheNames.map(cacheName =>{
                            if(cacheWhiteList.indexOf(cacheName) === -1){
                                //Eliminar elementos que no se necesitan
                                return caches.delete(cacheName);
                            }
                        })
                    );
                })
                .then(()=>{
                    //Activar cache
                    self.clients.claim();
                })
    );
});

//Fetch
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
                .then(res => {
                    if (res) {
                        //devolver datos cache
                        return res;
                    }
                    return fetch(e.request);
                    
                })
    );
});