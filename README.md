# my-app
尚品汇前台，包括首页, 搜索列表, 商品详情, 购物车, 订单, 支付, 用户登陆/注册，个人中心订单  
使用vue-cli5.x脚手架创建项目  
技术栈 vue2.6 + vue-router + +vuex+  axios + ES6 + less  
vue路由采用默认的hash模式和懒加载的方式  
对axios简单二次封装，统一管理了前台接口  
使用mockjs模拟接口数据，nprogress进度条、swiper实现轮播图、qrcode生成二维码、vue-lazyload懒加载、Lodash实现节流等插件  
简单封装了分页器组件  
使用elementUI的表单组件进行注册和登陆的规则校验  
用watch+$nextTick解决swiper轮播图bug  
用本地存储localStorage解决vuex不能持久化存储数据的问题  
使用路由元信息+路由全局前置守卫配合路由独享守卫控制页面访问权限    

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
