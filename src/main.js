import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// 三级联动全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import store from '@/store'
import '@/mocks'
// 引入swiper样式
import 'swiper/css/swiper.min.css'

Vue.config.productionTip = false

// 注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)



new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate(){
   Vue.prototype.$bus = this 
  }
}).$mount('#app')
