export default {
  head: {
    title: 'web_app_keycloak',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
  ],

  plugins: [
  ],

  components: true,

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/vuetify',
    '@nuxtjs/eslint-module',
    '@nuxtjs/toast'
  ],

  toast: {
    position: 'top-center',
    duration: 1000,
    keepOnHover: false,
    register: [
      {
        name: 'success',
        message: message => message,
        options: {
          type: 'success',
          icon: 'mdi-check-circle'
        }
      },
      {
        name: 'error',
        message: message => message,
        options: {
          type: 'error',
          icon: 'mdi-alert-circle'
        }
      }
    ]
  },

  axios: {
    baseURL: 'http://localhost:5239/api/'
  },

  build: {
  },
  router: {
    middleware: ['auth', 'role']
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/'
    },
    strategies: {
      local: {
        token: {
          property: 'accessToken',
          global: true
        },
        user: {
          property: false
        },
        endpoints: {
          login: { url: 'Auth/Login', method: 'post' },
          logout: false,
          user: { url: 'Auth/User', method: 'get' }
        }
      }
    }
  }
}
