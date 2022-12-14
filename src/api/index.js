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
// 删除购物车产品  /api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId)=>{
    return request.delete(`/cart/deleteCart/${skuId}`)
}
// 修改商品的选中状态 /api/cart/checkCart/{skuId}/{isChecked}
export const reqUpdateCheckedById = (skuId,isChecked)=>{
    return request.get(`/cart/checkCart/${skuId}/${isChecked}`)
}
// 获取验证码 /api/user/passport/sendCode/{phone} 
export const reqGetCode = (phone)=>{
    return request.get(`/user/passport/sendCode/${phone}`)
}
// 注册用户 /api/user/passport/register
export const reqUserRegister = (data) =>{
    return request({method:'post',url:'/user/passport/register',data})
}
// 用户登陆 /api/user/passport/login
export const reqUserLogin = (data) =>{
    return request({method:'post',url:'/user/passport/login',data})
}

// 用户登出 /api/user/passport/logout
export const reqUserLogout = () =>{
    return request({method:'get',url:'/user/passport/logout'})
}

// 获取用户登陆信息 /api/user/passport/auth/getUserInfo
export const reqUserInfo = () =>{
    return request({method:'get',url:'/user/passport/auth/getUserInfo'})
}

// 获取用户地址信息 /api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () =>{
    return request({method:'get',url:'/user/userAddress/auth/findUserAddressList'})
}

// 获取订单交易页信息 /api/order/auth/trade
export const reqOrderInfo = () =>{
    return request.get('/order/auth/trade')
}
// 提交订单 /api/order/auth/submitOrder?tradeNo={tradeNo}
export const reqSubmitOrder = (tradeNo,data) =>{
    return request({method:'post',url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data})
}


// 获取订单支付信息  /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) =>{
    return request({method:'get',url:`/payment/weixin/createNative/${orderId}`})
}

// 查询支付订单状态/api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId) =>{
    return request({method:'get',url:`/payment/weixin/queryPayStatus/${orderId}`})
}

// 获取个人中心的数据 /api/order/auth/{page}/{limit}
export const reqMyOrder = (page,limit) =>{
    return request({method:'get',url:`/order/auth/${page}/${limit}`})
}




// 获取模拟的首页banner和floor接口实现轮播图
export const mockGetBanner = ()=> mockRequest.get('/banner')
export const mockGetFloor = ()=> mockRequest.get('/floor')





// export const mockCategoryList = ()=> mockRequest.get('/categoryList')
