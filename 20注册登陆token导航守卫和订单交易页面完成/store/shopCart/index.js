import {reqCartList,reqDeleteCartById,reqUpdateCheckedById } from '@/api'

export default{
    namespaced:true,
    state:{
        // 购物车数据
        cartList:[],
        
    },
    actions:{
        // 获取购物车产品列表数据
        async getCartList({commit}){
            const {data} = await reqCartList()
            if (data.code == 200) {
                commit('CATECARTLIST', data.data)
            }
        },
        // 删除购物车某一个产品
        async DeleteCartById({commit},skuId){
            const {data} = await reqDeleteCartById(skuId)
            if (data.code !== 200) {
                return Promise.reject(new Error('faile'))
            }
            return Promise.resolve(data.message)
        },
        // 修改购物车某一个产品的选中状态
        async UpdateCheckedById({commit},{skuId,isChecked}){
            const {data} = await reqUpdateCheckedById(skuId,isChecked)
            if (data.code !== 200) {
                return Promise.reject(new Error('faile'))
            }
            return Promise.resolve(data.message)
        },
        // 删除全部选中的产品
        deleteAllCheckedCart({dispatch,getters}){
            let promiseAll = []
            let promise
            getters.cartList.cartInfoList.forEach(el=>{
                if(el.isChecked ==1){
                    promise = dispatch('DeleteCartById',el.skuId)
                    // 每一次的Promise实例追加到数组中
                    promiseAll.push(promise)
                }
            })
            // Promise.all()该方法接受一个数组作为参数,用于将多个Promise实例，包装成一个新的Promise实例。
            // 如果全部Promise实例都成功，回调(返回)所有成功的结果，只要有一个失败就返回失败的结果
            return Promise.all(promiseAll)
        },
        // 修改全部产品的选中状态
        updateAllCartIsChecked({dispatch,getters},isChecked){
            let promiseAll = []
            let promise
            getters.cartList.cartInfoList.forEach(el=>{
                if(isChecked=='1'){
                    if(el.isChecked=='1') return
                    promise = dispatch('UpdateCheckedById',{skuId:el.skuId,isChecked})
                    // 每一次的Promise实例追加到数组中
                    promiseAll.push(promise)
                }else{
                    if(el.isChecked=='0') return
                    promise = dispatch('UpdateCheckedById',{skuId:el.skuId,isChecked})
                    // 每一次的Promise实例追加到数组中
                    promiseAll.push(promise)
                } 
            })
            return Promise.all(promiseAll)
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