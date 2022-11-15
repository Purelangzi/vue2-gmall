import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// 引入清除默认的样式
import '@/assets/styles/reset.css'

// 商品分类三级联动全局组件
import TypeNav from '@/components/TypeNav'
// 轮播图全局组件
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import store from '@/store'
import '@/mocks'
// 引入swiper样式
import 'swiper/css/swiper.min.css'

// 引入图标样式
import '@/assets/font/iconfont.css'
// 统一导入接口对象
import * as API from '@/api'
import ic from '@/assets/images/icons.png'

import { Button, MessageBox,Message,Form,Input,FormItem,Checkbox} from 'element-ui';
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: ic,
})
Vue.config.productionTip = false

// 注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)



Vue.use(Button)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Checkbox)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    // 全局事件总线
    Vue.prototype.$bus = this
    // 接口对象挂载到原型上
    Vue.prototype.$API = API
  }
}).$mount('#app')
