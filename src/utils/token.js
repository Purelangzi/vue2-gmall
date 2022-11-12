// 存储token
export const setToken = (token) =>{
    localStorage.setItem('userToken',token)
}
// 存储用户信息
export const setUserInfo = (data) =>{
    localStorage.setItem('userInfo',JSON.stringify(data))
}
// 获取用户信息
export const getUserInfo = () =>{
    return JSON.parse(localStorage.getItem('userInfo'))
}
//获取token
export const getToken = () =>{
    return localStorage.getItem('userToken')
}
// 清除本地存储的token
export const removeToken = ()=>{
    return localStorage.removeItem('userToken')
}
// 清除本地存储的用户信息
export const removeUserInfo = ()=>{
    return localStorage.removeItem('userInfo')
}
