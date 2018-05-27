importScripts('/plainbudget/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "plainbudget",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/plainbudget/_nuxt/app.8e269510d86a572a6f91.js",
    "revision": "268cffb91b0bd8a809f5bede1d25e0aa"
  },
  {
    "url": "/plainbudget/_nuxt/layouts/default.87e9fabbba86ede17ca9.js",
    "revision": "348b51450d49003d6d89a53f237d3701"
  },
  {
    "url": "/plainbudget/_nuxt/manifest.107ff68aeae70f663ab8.js",
    "revision": "51fd8be28589a6e090dd5f55d1692b75"
  },
  {
    "url": "/plainbudget/_nuxt/pages/index.05b3b27a3db96446b9ed.js",
    "revision": "3fefc3cda9ba51e11277e78248afab3b"
  },
  {
    "url": "/plainbudget/_nuxt/vendor.a6e76812813970cf0d37.js",
    "revision": "02ce12295800910025fda7f2f1030795"
  }
])


workboxSW.router.registerRoute(new RegExp('/plainbudget/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/plainbudget/.*'), workboxSW.strategies.networkFirst({}), 'GET')

