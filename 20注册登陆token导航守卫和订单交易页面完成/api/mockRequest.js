import axios from "axios";
import nProgress from "nprogress";
const mockRequest = axios.create({
    baseURL:'/mock',
    timeout:1000
})

mockRequest.interceptors.request.use(config=>{
    nProgress.start()
    return config
},error=>{
    return Promise.reject(error)
})

mockRequest.interceptors.response.use(config=>{
    nProgress.done()
    return config
},error=>{
    return Promise.reject(error)

})

export default mockRequest