const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: '808 Educational and Engineering institute',
    titleTemplate: '%s | 808 Educational and Engineering institute',
    meta: [
      { charset: 'utf-8' },
      {'http-equiv': 'Content-Type', content: 'text/html; charset=utf-8'},
      { name: 'viewport', content: 'width=device-width, initi al-scale=1' },
      { hid: 'description', name: 'description', content: 'A civil engineering social media, providing online training courses in all different fields of civil engineering and architecture focusing on Performance-based design of Structures (PBD) and Building Information Modeling (BIM) and other new trendes in the form of articles, videos, podcasts, ebooks and so on.', vmid: 'description' },

      // OpenGraph data (Most widely used)
      {property: 'og:title', content: this.title, vmid: 'og:title'},
      {property: 'og:type', content: 'website', vmid: 'og:type'},
      {property: 'og:url', content: 'http://ed808.com', vmid: 'og:url'},
      {property: 'og:image', content: "http://ed808.com/staticfile/top-banner.jpg", vmid: 'og:image'},
      {property: 'og:description', content: this.description, vmid: 'og:description'},
      {property: 'og:site_name', content: '808 Educational and Engineering institute'},

      // Twitter card
      {name: 'twitter:card', content:'summary'},
      {name: 'twitter:title', content: this.title, vmid: 'twitter:title'},        
      {name: 'twitter:description', content: this.description, vmid: 'twitter:description'},
      {name: 'twitter:image:src', content: 'http://ed808.com/staticfile/top-banner.jpg', vmid: 'twitter:image:src'},
      {name: 'twitter:site', content: 'http://ed808.com'},

      // Your twitter handle, if you have one.
      {name: 'twitter:creator', content: ''},

      // Google / Schema.org markup:
      {itemprop: 'name', content: this.title, vmid: 'name'},
      {itemprop: 'description', content: this.description, vmid: 'description'},
      {itemprop: 'image', content: 'http://ed808.com/staticfile/top-banner.jpg', vmid: 'image'},
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favlogo.png' },
      { rel: 'alternate', href: 'http://ed808.com', hreflang:'en'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/app.scss',
    '@/assets/scss/vars.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    'nuxt-vue-material',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true
  },

  proxy: [
    'http://api.ed808.com/latin/tag/*/contents',
    'http://api.ed808.com/latin/*/**',
    'http://api.ed808.com/latin/user/*/**',
    'http://api.ed808.com/latin/user/login/nav_bar_info',
    'http://api.ed808.com/latin/user/login',
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      /*if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }*/
    }
  }
}
