<template>
  <header class="header" id="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>尚品汇欢迎您！</p>
                        <p v-if="userName">
                            <span>{{userName}}</span>
                            <button @click="logOut">退出登陆</button> 
                        </p>
                        <p v-else>
                            <span>请</span>
                            <router-link to="/login">登陆</router-link>
                            <router-link to="/register" class="register">免费注册</router-link>
                        </p>
                    </div>
                    <div class="typeList">
                        <router-link to="/center">我的订单</router-link>
                        <router-link to="/shopcart">我的购物车</router-link>
                        <a href="###">我的尚品汇</a>
                        <a href="###">尚品汇会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <router-link to="/home" class="logo" >
                        <img src="./images/logo.png" alt="">
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input v-model.trim="keyword" type="text" id="autocomplete" class="input-error input-xxlarge" />
                        <button @click="goSearch" class="sui-btn btn-xlarge btn-danger" type="button">搜索</button>
                    </form>
                </div>
            </div>
        </header>
</template>

<script>
export default {
    name:'Header',
    data(){
        return{
            keyword:''
        }
    },
    methods: {
        // 关键字搜索
        goSearch(){
            this.$router.push({
                name:'search',
                params:{
                    keyword:this.keyword||undefined
                },
                query:this.$route.query
            })
        },
        // 用户登出
        logOut(){
            try {
                this.$store.dispatch('user/userLogout')
                this.$router.push('/login')
            } catch (error) {
                alert(error.message)
            }
        }
    },
    computed:{
        userName(){
            return  this.$store.state.user.userInfo.nickName
        }
    },
    /* watch:{
        '$store.state.user.token':{
            // 初始化就监听,一上来就获取本地存储里的用户信息，
            // 解决已登陆后关闭页面再打开一个新页面用户信息不获取的问题
            immediate:true,
            handler(){
                // 退出后或者本地存储存在用户信息就不再派发请求获取用户信息
                if(!this.$store.state.user.token||getUserInfo() ) return
                this.$store.dispatch("user/userInfo");
            }
        }
    }, */
    mounted() {
        // 事件总线接收清除关键字的通知
        this.$bus.$on('clear',()=>{
            this.keyword = undefined
        });
    },
}
</script>

<style lang="less" scoped>
 .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
}
</style>