import Home from '@/views/Home'
import Search from '@/views/Search'
import Detail from '@/views/Detail'
import Login from '@/views/Login'
import Register from '@/views/Register'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'

export default [
    // 重定向到首页
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        //路由元信息,控制当前路由是否需要Footer组件以及是否需要token才能访问
        meta: { show: true,isToken:false }

    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
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
        component:Detail,
        meta: { show: true,isToken:false },

    },
    {
        name:'addcartsuccess',
        path:'/addcartsuccess',
        component:AddCartSuccess,
        meta: { show: true,isToken:false },

    },
    {
        name:'shopcart',
        path:'/shopcart',
        component:ShopCart,
        
        meta: { show: true,isToken:true },
    },
    {
        path: '/login',
        component: Login,
        
        meta: { show: false,isToken:false }
    },
    
    {
        path: '/register',
        component: Register,
        meta: { show: false,isToken:false }

    },
    {
        path: '/trade',
        component: Trade,
        meta: { show: true,isToken:true }
    },
]


