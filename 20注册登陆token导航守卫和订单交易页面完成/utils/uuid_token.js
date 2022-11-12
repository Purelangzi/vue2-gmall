import { v4 as uuidv4 } from 'uuid';
// 生成随机字符串，且每次执行不能发生变化，游客身份永久存储
export const getUUID = ()=>{
    // 先判断本地存储是否有uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 没有就生成游客临时身份,存进本地存储里
    if(!uuid_token){
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN',uuid_token)
    } 
    return uuid_token
}