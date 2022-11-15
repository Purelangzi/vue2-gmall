import Vue from "vue";
import VueRouter from "vue-router";
import routes from '@/router/routes'
import store from '@/store'

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


const router = new VueRouter({
  routes,
  scrollBehavior(to) {
    if (to.name == 'detail'||to.path == '/pay') {
      return { x: 0, y: 0 }
    }
    // return 期望滚动到哪个的位置
  },
})
router.beforeEach(async(to, from, next) => {
  let token = store.state.user.token
  let name = store.state.user.userInfo.nickName
  let isToken = to.meta.isToken
  // 用户已登陆不能回到登陆页和注册页
  if (token) {
    if (to.path == '/login'|| to.path == '/register') next('/')
    
    // 如果用户名存在
    if(name){
      next()
    }else{
      // 没有用户信息，派发action让仓库存储用户信息
      try {
        await store.dispatch('user/getUserInfo')
        next()
      } catch (error) {
        Vue.prototype.$message({
          message:'token已过期，请重新登陆',
          type:'warning',
          duration:2000
        })
        // token失效(后端设置token失效时间),清除仓库和本地存储的token,重新登陆
        await store.dispatch('user/userLogout')
        next('/login')
      }
    }
    
  } else {
    // 未登陆则不能去需要token的页面（订单交易页,支付页,支付成功页和个人中心页）
    if (isToken){
      Vue.prototype.$message({
        message:'请登陆',
        type:'warning',
        duration:2000
      })
      // 未登陆想去的页面存放在地址栏中(路由中)
      next(`/login?redirect=${to.path}`)
    }else{
      // 不需要token的页面，放行
      next()
    }
    
    
  }
  
})
export default router