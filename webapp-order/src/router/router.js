import VueRouter from 'vue-router'
import routes from '../routes/routes'
import Vue from 'vue'
Vue.use(VueRouter)

export default new VueRouter({
  routes,
  mode: 'history'
})



