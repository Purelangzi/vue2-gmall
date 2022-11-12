import { reqProductDetail,reqAddOrUpdateShopCart } from '@/api'
// 封装游客身份模块uuid，生成一个随机字符串（不会变）
import {getUUID} from '@/utils/uuid_token'
export default {
    namespaced: true,
    state: {
        productDetailList: {},
        uuid_token :getUUID()
    },
    actions: {
        // 获取产品详情
        async getProductDetail({ commit },params) {
            const { data } = await reqProductDetail(params)
            if (data.code == 200) {
                commit('GETPRODUCTDETAIL', data.data)
            }
        },
        // 将产品添加到购物车
        async addOrUpdateShopCart({ commit },{skuId,skuNum}) {
            const {data} = await reqAddOrUpdateShopCart(skuId,skuNum)
            if (data.code !== 200) {
                return Promise.reject(new Error('faile'))
            }
            return Promise.resolve(data.message)
        }
    },
    // 数据加工（简化数据）
    getters:{
        categoryView(state){
            return state.productDetailList.categoryView || {}
        },
        skuInfo(state){
            return state.productDetailList.skuInfo || {}
        },
        spuSaleAttrList(state){
            return state.productDetailList.spuSaleAttrList || []
        }
    },
    mutations: {
        GETPRODUCTDETAIL(state, val) {
            state.productDetailList = val
        },

    }
}