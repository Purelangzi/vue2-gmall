import {reqCartList } from '@/api'

export default{
    namespaced:true,
    state:{
        // 购物车数据
        cartList:[],
        
    },
    actions:{
        async getCartList({commit}){
            const {data} = await reqCartList()
            if (data.code === 200) {
                commit('CATECARTLIST', data.data)
            }
        }
    },
    getters:{
        cartList(state){
            return state.cartList[0] || {}
        },
    },
    mutations:{
        CATECARTLIST(state,val){
            state.cartList = val
        }
    }
}