require('dotenv').config()

module.exports = {
  env: {
    port: 4333,
    baseUrl: process.env.BASE_URL || 'http://localhost:4333'
  },
  router: {
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  srcDir: 'src/',
  head: {
    title: 'Plainbudget',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Sales CMS.' }
    ]
  },
  plugins: [
    { src: '~/plugins/elementui', ssr: true }
  ],
  css: [
    'font-awesome/css/font-awesome.min.css',
    'element-theme-default/lib/index.css'
  ],
  build: {
    vendor: ['element-ui'],
    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1KO
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 1000, // 1 KO
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ],
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          exclude: /(node_modules)/
        })
      }
    }
  }
}
