import Home from '@/views/Home'
import Search from '@/views/Search'
import Login from '@/views/Login'
import Register from '@/views/Register'

export default [
    // 重定向到首页
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        component:Home,
        meta:{show:true}

    },
    {  
        path:'/search/:keyword',
        component:Search,
        meta:{show:true}

    },
    {
        path:'/login',
        component:Login,
        //路由元信息,控制当前路由是否需要Footer组件
        meta:{show:false}
    },
    {
        path:'/register',
        component:Register,
        //路由元信息,控制当前路由是否需要Footer组件
        meta:{show:false}

    },
]


