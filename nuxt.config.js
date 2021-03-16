export default {
  loading: '~/components/loading.vue',
  router: {
    extendRoutes(routes) {
      routes.push({
        path: '/',
        component: '~/pages/dashboard/index.vue'
      });
    }
  },
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://widgets.coingecko.com/coingecko-coin-ticker-widget.js'
      }
    ]
  },
  /*
   ** Global CSS
   */
  css: [
    '~/assets/scss/app.scss',
    '~/assets/custom.scss',
    'quill/dist/quill.core.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css'
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/fireauth.js',
    '~/plugins/fakeauth.js',
    '~/plugins/simplebar.js',
    '~/plugins/vue-click-outside.js',
    '~/plugins/vuelidate.js',
    '~/plugins/draggable.js',
    '~/plugins/vue-slidebar.js',
    '~/plugins/tour.js',
    '~/plugins/vue-lightbox.js',
    '~/plugins/mask.js',
    '~/plugins/quill-editor.js',
    '~/plugins/chartist.js',
    '~/plugins/vue-googlemap.js',
    '~/plugins/string-filter',
    { src: '~plugins/axios.js' }
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
    // Doc: https://github.com/nuxt-community/stylelint-module
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    'nuxt-i18n'
  ],

  axios: {
    baseURL: process.env.BASE_URL,
    // proxy: true,
    // prefix: process.env.API_PREFIX,
    credentials: false
  },
  // proxy: {
  //   '/api/': 'https://godmode.ngrok.io',
  // },

  i18n: {
    locales: ['en', 'fr', 'es', 'ar'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: require('./locales/en.json'),
        fr: require('./locales/fr.json'),
        es: require('./locales/es.json'),
        ar: require('./locales/ar.json'),
        zh: require('./locales/zh.json')
      }
    }
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  env: {
    auth: process.env.VUE_APP_DEFAULT_AUTH,
    apikey: process.env.VUE_APP_APIKEY,
    authdomain: process.env.VUE_APP_AUTHDOMAIN,
    databaseurl: process.env.VUE_APP_DATABASEURL,
    projectid: process.env.VUE_APP_PROJECTId,
    storgebucket: process.env.VUE_APP_STORAGEBUCKET,
    message: process.env.VUE_APP_MESSAGINGSENDERID,
    appid: process.env.VUE_APP_APPId,
    measurement: process.env.VUE_APP_MEASUREMENTID,
    pubNubSubKey: process.env.PUBNUB_SUBSCRIBE_KEY || '',
    pubNubPubKey: process.env.PUBNUB_PUBLISH_KEY || '',
    pubNubChannel: process.env.PUBNUB_CHANNEL || ''
  }
};
