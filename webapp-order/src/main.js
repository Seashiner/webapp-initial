import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
import store from '@/store/store.js'
import '@/common/stylus/iconmoon.styl'
import '@/common/stylus/transition.styl'
import icon from 'components/icon/icon'

Vue.config.productionTip = false
Vue.component('v-icon',icon)

Vue.prototype.$Bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
