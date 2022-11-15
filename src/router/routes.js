import Vue from "vue";
export default [
    // 重定向到首页
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: ()=>import('@/views/Home'),
        //路由元信息,控制当前路由是否需要Footer组件以及是否需要token才能访问
        meta: { show: true,isToken:false }

    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: ()=> import('@/views/Search'),
        meta: { show: true },
        props({ params, query }) {
            return {
                keyword: params.keyword,
                id: query.id
            }
        },
    },
    {
        name:'detail',
        path:'/detail/:skuId',
        component:()=>import('@/views/Detail'),
        meta: { show: true,isToken:false },

    },
    {
        name:'addcartsuccess',
        path:'/addcartsuccess',
        component:()=>import('@/views/AddCartSuccess'),
        meta: { show: true,isToken:false },

    },
    {
        name:'shopcart',
        path:'/shopcart',
        component:()=>import('@/views/ShopCart'),
        meta: { show: true,isToken:false },
    },
    {
        path: '/login',
        component:()=>import('@/views/Login'),
        meta: { show: false,isToken:false }
    },
    
    {
        path: '/register',
        component:()=>import('@/views/Register'),
        meta: { show: false,isToken:false }

    },
    {
        path: '/trade',
        component:()=>import('@/views/Trade'),
        meta: { show: true,isToken:true },
        // 路由独享的守卫，只有从购物车页面才能跳到交易页面
        beforeEnter: (to, from, next) => {
            // 因为一刷新就是从/跳转到shopcart，
            if(from.path == '/shopcart' || from.path =='/'){
                next()
            }else{
                Vue.prototype.$message({
                  message:'请从购物车页面进入交易页面',
                  type:'warning',
                  duration:2000
                })
                next(false)
            }
        }
    },
    {
        path: '/pay',
        component:()=>import('@/views/Pay'),
        meta: { show: true,isToken:true },
        beforeEnter: (to, from, next) => {
            // 没有订单号不能去支付页面
            if(from.path == '/trade'&&to.query.orderId || from.path =='/'&&to.query.orderId){
                next()
            }else{
                Vue.prototype.$message({
                  message:'请从交易页面进入订单支付页面',
                  type:'warning',
                  duration:2000
                })
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        component:()=>import('@/views/PaySuccess'),
        meta: { show: true,isToken:true },
        beforeEnter: (to, from, next) => {
            // 没有订单号不能去支付页面
            if(from.path == '/pay' || from.path =='/'){
                Vue.prototype.$message({
                  message:'支付成功',
                  type:'success',
                  duration:2000
                })
                next()
            }else{
                Vue.prototype.$message({
                  message:'请从支付页面进入支付成功页面',
                  type:'warning',
                  duration:2000
                })
                next(false)
            }
        }
    },
    {
        path: '/center',
        component:()=>import('@/views/Center'),
        meta: { show: true,isToken:true },
        children:[
            {
                path:'/',
                redirect:'myorder'
            },
            {
                path:'myorder',
                component:()=>import('@/views/Center/myOrder'),
                meta: { show: true,isToken:true },
            },
            {
                path:'grouporder',
                component:()=>import('@/views/Center/groupOrder'),
                meta: { show: true,isToken:true },
            }
        ]
    },
]


