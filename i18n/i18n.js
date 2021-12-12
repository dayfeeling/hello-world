import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale'
import zh from './langs/zh'
import en from './langs/en'
import zhLocale from 'element/lib/locale/lang/zh-CN'
import enLocale from 'element/lib/locale/lang/en'

Vue.use(VueI18n)

const i18n = new VueI18n({
    // set locale
    locale: localStorage.getItem('locale') || 'zh',
    // set locale messages
    message: {
        zh: Object.assign(zh, zhLocale),
        en: Object.assign(en, enLocale)
    }
})

// 为了实现element插件的多语言切换
locale.i18n((key, value) => i18n.t(key, value))

// import i18n from './i18n/i18n'
// 引入main.js挂载
// new Vue({
//     i18n
// }).$mount('#app')

/**
 * index.vue
 */
// <p>{{ $t('login') }}</p>
// changeLang(lang){
//     localStorage.setItem('lang', lang);
//     this.$i18n.locale = lang
// }

export default i18n