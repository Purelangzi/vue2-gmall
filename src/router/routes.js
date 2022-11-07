import Home from '@/views/Home'
import Search from '@/views/Search'
import Detail from '@/views/Detail'
import Login from '@/views/Login'
import Register from '@/views/Register'
import AddCartSuccess from '@/views/AddCartSuccess'


export default [
    // 重定向到首页
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        meta: { show: true }

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
        meta: { show: true },

    },
    {
        name:'addcartsuccess',
        path:'/addcartsuccess',
        component:AddCartSuccess,
        meta: { show: true },

    },
    {
        path: '/login',
        component: Login,
        //路由元信息,控制当前路由是否需要Footer组件
        meta: { show: false }
    },
    {
        path: '/register',
        component: Register,
        //路由元信息,控制当前路由是否需要Footer组件
        meta: { show: false }

    },
]


