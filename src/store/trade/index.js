import {reqAddressInfo,reqOrderInfo} from '@/api'
export default{
    namespaced:true,
    state:{
        addressInfo:[],
        orderInfo:{}
    },
    actions:{
        // 获取用户地址信息
        async getAddressInfo({commit}){
            const {data} = await reqAddressInfo()
            if(data.code == 200){
               commit('GETADDRESS',data.data)
            }
        },
        // 获取订单交易页信息
        async getOrderInfo({commit}){
            const {data} = await reqOrderInfo()
            if(data.code == 200){
               commit('GETORDER',data.data)
            }
        }
    },
    mutations:{
        GETADDRESS(state,val){
            state.addressInfo = val
        },
        GETORDER(state,val){
            state.orderInfo = val
        },
    }
}