import { reqCategoryList, mockGetBanner, mockGetFloor } from '@/api'
export default {
    namespaced: true,// 开启命名空间
    state: {
        // 三级分类商品数据
        categoryList: [],
        // 轮播图数据
        bannerList: [],
        // floor数据
        floorList:[]
    },
    actions: {
        // 通过api里的接口函数调用，向服务器发请求获取数据
        // await会等待Promise完成之后直接返回最终的结果
        // 请求获取接口中三级分类商品的数据
        async categoryList({ commit }) {
            const {data}  = await reqCategoryList()
            if (data.code === 200) {
                commit('CATEGORYLIST', data.data)
            }
        },
        // 请求获取接口中轮播图的数据
        async getBannerList({ commit }) {
            const { data } = await mockGetBanner()
            if (data.code == 200) {
                commit('GETBANNERLIST', data.data)
            }
        },
        // 请求获取接口中轮播图的数据
        async getFloorList({ commit }) {
            const { data } = await mockGetFloor()
            if (data.code == 200) {
                commit('GETFLOORLIST', data.data)
            }
        }
    },
    mutations: {
        // 存储三级分类商品数据
        CATEGORYLIST(state, val) {
            state.categoryList = val
        },
        // 存储轮播图数据
        GETBANNERLIST(state, val) {
            state.bannerList = val
        },
        // 存储floor数据
        GETFLOORLIST(state, val) {
            state.floorList = val
        },
    }
}