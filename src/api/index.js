//统一管理项目前台的接口
import request from "./request";
import mockRequest from "./mockRequest";

//封装函数:复用
//将来这个函数可以在别的地方使用,需要对外暴露【分别暴露】
//获取商品分类（三级联动）的数据
export const reqCategoryList =()=>{
    return request({method:'get',url:'/product/getBaseCategoryList'})
}
// 请求搜索的数据
export const reqSearchList = (searchParams) => {
    return request({method:'post',url:'/list',data:searchParams})
}

// 请求商品详情的数据
export const reqProductDetail = (productId)=>{
    return request({method:'get',url:'/item',params:productId})
}

// 获取模拟的首页banner和floor接口实现轮播图
export const mockGetBanner = ()=> mockRequest.get('/banner')
export const mockGetFloor = ()=> mockRequest.get('/floor')





// export const mockCategoryList = ()=> mockRequest.get('/categoryList')
