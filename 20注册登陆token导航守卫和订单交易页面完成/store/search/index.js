import {reqSearchList} from '@/api'

export default {
    namespaced:true,
    state:{
        // 搜索模块数据
        searchList:{}
    },
    actions:{
        // post请求参数如果为空，默认赋为空对象
        async getSearchList({commit},params={}){
            const {data} = await reqSearchList(params)
            if(data.code == 200)[
                commit('GETSEARCHLIST',data.data)
            ]
        }
    },
    // 数据加工（简化数据）
    getters:{
        attrsList(state){
            return state.searchList.attrsList || []
        },
        goodsList(state){
            return state.searchList.goodsList || []
        },
        trademarkList(state){
            return state.searchList.trademarkList || []
        }
    },
    mutations:{
        GETSEARCHLIST(state,val){
            state.searchList = val
        }
    }
}