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

// 请求商品详情的数据 /api/item/{ skuId }
export const reqProductDetail = (skuId)=>{
    return request({method:'get',url:`/item/${ skuId }`})
}
// /api/cart/addToCart/{ skuId }/{ skuNum }
// 将产品添加到购物车（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>{
    return request({method:'post',url:`/cart/addToCart/${skuId}/${skuNum}`})
}

// 获取购物车列表 /api/cart/cartList
export const reqCartList = ()=>{
    return request.get('/cart/cartList')
}

// 获取模拟的首页banner和floor接口实现轮播图
export const mockGetBanner = ()=> mockRequest.get('/banner')
export const mockGetFloor = ()=> mockRequest.get('/floor')





// export const mockCategoryList = ()=> mockRequest.get('/categoryList')
