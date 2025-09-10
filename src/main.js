// import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import { ukrLang, enLang } from './languages'

const i18n = createI18n({
    locale: 'ukr',
    fallbackLocale: 'en',
    messages: {
        ukr: ukrLang,
        en: enLang
    }
})

createApp(App).use(i18n).mount('#app')