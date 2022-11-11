// axios二次封装
import axios from "axios";
// 引入进度条插件（对应的js和css)
import nProgress from "nprogress";
import 'nprogress/nprogress.css'
// 引入store仓库
import store from '@/store'


// 使用自定义配置创建axios实例
const request = axios.create({
    // 基础地址
    baseURL: '/api',
    timeout:10000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // config配置对象，配置请求头，请求头添加一个字段(userTempId)是和后端商量好的
    if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 携带token带给服务器
    /* if(localStorage.getItem('userToken')){
        config.headers.token = JSON.parse(localStorage.getItem('userToken'))
    } */
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }

    // 进度条开始
    nProgress.start()
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // 进度条结束
    nProgress.done()
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default request