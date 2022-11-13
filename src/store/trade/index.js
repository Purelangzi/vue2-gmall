import {reqAddressInfo,reqOrderInfo,reqSubmitOrder} from '@/api'
export default{
    namespaced:true,
    state:{
        addressInfo:[],
        orderInfo:{},
        /* payId:'' */
    },
    actions:{
        // 获取用户地址信息
        async getAddressInfo({commit}){
            const {data} = await reqAddressInfo()
            if(data.code !== 200){
               return Promise.reject(new Error(data.message))
            }
            commit('GETADDRESS',data.data)
        },
        // 获取订单交易页信息
        async getOrderInfo({commit}){
            const {data} = await reqOrderInfo()
            if(data.code !== 200){
                return Promise.reject(new Error(data.message))
               
            }
            commit('GETORDER',data.data)
        },
        // 提交订单
        /* async getSubmitOrder({commit},{tradeNo,pay}){
            const {data} = await reqSubmitOrder(tradeNo,pay)
            if(data.code !== 200){
                return Promise.reject(new Error(data.message))      
            }
            commit('GETPAYID',data.data)
        } */
    },
    mutations:{
        GETADDRESS(state,val){
            state.addressInfo = val
        },
        GETORDER(state,val){
            state.orderInfo = val
        },
       /*  GETPAYID(state,val){
            state.payId = val
        }, */
    }
}