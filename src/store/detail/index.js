import { reqProductDetail } from '@/api'
export default {
    namespaced: true,
    state: {
        productDetailList: {}
    },
    actions: {
        async getProductDetail({ commit }) {
            const { data } = await reqProductDetail()
            if (data.code == 200) {
                commit('GETPRODUCTDETAIL', data.data)
            }
        }
    },
    mutations: {
        GETPRODUCTDETAIL(state, val) {
            state.productDetailList = val
        }
    }
}