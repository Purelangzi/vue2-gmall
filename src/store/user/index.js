// 登陆和注册
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserLogout,reqUserInfo} from '@/api';
export default {
    namespaced:true,
    state:{
        code:'',
        token:'',
        userInfo:{}
    },
    actions:{
        // 获取验证码
        async getCode({commit},phone){
            const {data} = await reqGetCode(phone)
            if(data.code !== 200){
                return Promise.reject(new Error('fail'))
            }
            commit('GETCODE',data.data)
        },
        // 注册用户
        async userRegister({commit},user){
            const {data} = await reqUserRegister(user)
            if(data.code !== 200){
                return Promise.reject(new Error(data.message))
            }
            return Promise.resolve(data.message)
        },
        // 用户登陆
        async userLogin({commit},user){
            const {data} = await reqUserLogin(user)
            if(data.code !== 200){
                return Promise.reject(new Error(data.message))
            }
            commit('GETUSERTOKEN',data.data.token)
            return Promise.resolve(data.data.token)
        },
        // 用户登出
        async userLogout(){
            const {data} = await reqUserLogout()
            if(data.code !== 200){
                return Promise.reject(new Error(data.message))
            }
            return Promise.resolve(data.message)
        },
        // 获取用户信息
        async userInfo({commit}){
            const {data} = await reqUserInfo()
            if(data.code !== 200){
                return Promise.reject(new Error(data.message))
            }
            localStorage.setItem('userInfo',JSON.stringify(data.data))
            commit('GETUSERINFO',data.data)
            return Promise.resolve(data.message)

        }
    },
    mutations:{
        GETCODE(state,val){
            state.code = val
        },
        GETUSERTOKEN(state,val){
            state.token = val
        },
        GETUSERINFO(state,val){
            state.userInfo = val
        }
    }
}