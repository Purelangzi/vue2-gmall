import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// 三级联动全局组件
import TypeNav from '@/views/Home/TypeNav'
Vue.config.productionTip = false

Vue.component(TypeNav.name, TypeNav)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
