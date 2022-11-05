import Vue from "vue";
import VueRouter from "vue-router";
import routes from '@/router/routes'


// 解决vue-router在3.0版本以上重复点菜单报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalPeplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalPeplace.call(this, location).catch(err => err)

}

Vue.use(VueRouter)


export default new VueRouter({
    routes,
    scrollBehavior (to) {
      if(to.name == 'detail'){
        return { x: 0, y: 0 }
      }
      // return 期望滚动到哪个的位置
    }
})