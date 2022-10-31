import Mock from 'mockjs'
//引入数据：JSON数据格式数据,图片、JSON默认对外暴露
import banner from './banner.json'
import floor from './floor.json'

//第一个参数：接口的地址 第二个参数:获取到的数据 
Mock.mock('/mock/banner', {
    code: 200, data: banner
})
Mock.mock('/mock/floor', {
    code: 200, data: floor
})