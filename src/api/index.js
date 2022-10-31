//统一管理项目前台的接口
import request from "./request";
import mockRequest from "./mockRequest";

//封装函数:复用
//将来这个函数可以在别的地方使用,需要对外暴露【分别暴露】
//获取商品分类（三级联动）的数据
export const reqCategoryList =()=>{
    return request({method:'get',url:'/product/getBaseCategoryList'})
}

// 获取模拟的首页轮播图接口
export const mockGetBanner = ()=>{
    return mockRequest.get('/banner')
}
export const mockGetfloor = ()=>{
    return mockRequest.get('/floor')
}