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
    "url": "/plainbudget/_nuxt/manifest.ed593db2968c4659cf98.js",
    "revision": "dea805abcce64b69553df4e8f3f1c300"
  },
  {
    "url": "/plainbudget/_nuxt/pages/index.362a15906b6fab61d8c1.js",
    "revision": "23204007d6ce3004f08fedec67dbdea7"
  },
  {
    "url": "/plainbudget/_nuxt/vendor.a6e76812813970cf0d37.js",
    "revision": "02ce12295800910025fda7f2f1030795"
  }
])


workboxSW.router.registerRoute(new RegExp('/plainbudget/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/plainbudget/.*'), workboxSW.strategies.networkFirst({}), 'GET')

