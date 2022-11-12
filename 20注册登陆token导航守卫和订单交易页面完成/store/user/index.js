// 登陆和注册
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserLogout,reqUserInfo} from '@/api';
// 模块化封装本地存储
import {setToken,setUserInfo,getToken,getUserInfo,removeToken,removeUserInfo} from '@/utils/token'
export default {
    namespaced:true,
    state:{
        code:'',
        token:getToken(),
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
            // 存储到仓库
            commit('GETUSERTOKEN',data.data.token)
            // 持久化存储token
            setToken(data.data.token)
            return Promise.resolve(data.message)
        },
        // 用户登出
        async userLogout({commit}){
            const {data} = await reqUserLogout()
            if(data.code !== 200){
                return Promise.reject(new Error(data.message))
            }
            // 清除仓库和本地存储的数据
            commit('CLEAR')
            
            return Promise.resolve(data.message)
        },
        // 获取用户信息
        async getUserInfo({commit}){
            const {data} = await reqUserInfo()
            if(data.code !== 200){
                return Promise.reject(new Error(data.message))
            }
            // 持久化存储用户数据
            setUserInfo(data.data)
            // 存储到仓库
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
        },
        // 清除本地数据
        CLEAR(state){
            state.token = null
            state.userInfo = {}
            removeToken()
            removeUserInfo()
        }
    }
}