import { reqProductDetail } from '@/api'
export default {
    namespaced: true,
    state: {
        productDetailList: {}
    },
    actions: {
        async getProductDetail({ commit },params) {
            const { data } = await reqProductDetail(params)
            if (data.code == 200) {
                commit('GETPRODUCTDETAIL', data.data)
            }
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
        }
    }
}