import { reqCategoryList } from '@/api'
export default {
    namespaced: true,// 开启命名空间
    state: {
        categoryList: []
    },
    actions: {
        // 通过api里的接口函数调用，向服务器发请求获取数据
        // await会等待Promise完成之后直接返回最终的结果
        async categoryList({ commit }) {
            let { data } = await reqCategoryList()
            if (data.code === 200) {
                commit('CATEGORYLIST', data.data)
            }
        }
    },
    mutations: {
        CATEGORYLIST(state, val) {

            state.categoryList = val
        }
    }
}