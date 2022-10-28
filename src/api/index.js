//统一管理项目前部的接口
import request from "./request";

//封装函数:复用
//将来这个函数可以在别的地方使用,需要对外暴露【分别暴露】
//获取商品分类的数据
export const reqCategoryList =()=>{
    return request({method:'get',url:'/product/getBaseCategoryList'})
}