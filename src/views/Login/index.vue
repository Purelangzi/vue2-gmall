<template>
  <div class="login-container">
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a href="##" style="border-right: 0;">扫描登录</a>
            </li>
            <li>
              <a href="##" class="current">账户登录</a>
            </li>
          </ul>

          <div class="content">
            <el-form :model="form" ref="form" :rules="rules" class="elForm" size="normal">    
              <el-form-item  prop="phone" >
                <span></span>
                <el-input v-model="form.phone" placeholder="手机号"></el-input>
              </el-form-item>
              <el-form-item  prop="password">
                <span class="pwd"></span>
                <el-input v-model="form.password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <div class="setting clearFix">
                <label class="checkbox inline">
                  <input name="m1" type="checkbox" value="2" checked="">
                  自动登录
                </label>
                <span class="forget">忘记密码？</span>
              </div>
              <el-form-item>
                <el-button class="btn" type="primary" @click="userLogin">登&nbsp;&nbsp;录</el-button>
              </el-form-item>
            </el-form>
            
            <div class="call clearFix">
              <ul>
                <li><img src="./images/qq.png" alt=""></li>
                <li><img src="./images/sina.png" alt=""></li>
                <li><img src="./images/ali.png" alt=""></li>
                <li><img src="./images/weixin.png" alt=""></li>
              </ul>
              <router-link class="register" to="/register">立即注册</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      // 自定义手机号的验证规则
      const validatePhone = (rule, value, callback) => {
        if(!value) callback(new Error('请输入手机号'))
        const reg = /^[1]([3-9])[0-9]{9}$/
        if (!reg.test(value)) {
          callback(new Error('手机格式不正确!请输入11位手机号'));
        } else {
          callback();
        }
      };
      return {
        form:{
          phone:'13700032456',
          password:'111111'
        },
        rules:{
          phone:[
            { validator: validatePhone, trigger: 'blur' }
          ],
          password:[
            {required:true, message: '请输入密码',trigger: 'blur'},
            {min:6,max:12,message:'密码长度6-12位'}
        ],
        }
        
      }
    },
    methods:{
      // 用户登陆
      userLogin(){
        this.$refs.form.validate(async(valid) => {
          if (valid) {
            const {phone,password} = this.form
            try {
              await this.$store.dispatch('user/userLogin',{phone,password})
              // 登陆后立即跳转到登陆前没去成的页面
              const toPath = this.$route.query.redirect||"/"
              this.$router.push(toPath)
            } catch (error) {
              alert(error.message)
            }
          } else {
            this.$message.error('请输入用户名和密码')
            return false;
          }
        });

        
      }
    }
  }
</script>

<style lang="less" scoped>
  .login-container {
    .login-wrap {
      height: 487px;
      background-color: #e93854;

      .login {
        width: 1200px;
        height: 487px;
        margin: 0 auto;
        background: url(./images/loginbg.png) no-repeat;
      }

      .loginform {
        width: 420px;
        height: 406px;
        box-sizing: border-box;
        background: #fff;
        float: right;
        top: 45px;
        position: relative;
        padding: 20px;

        .tab {

          li {
            width: 50%;
            float: left;
            text-align: center;

            a {
              width: 100%;
              display: block;
              height: 50px;
              line-height: 50px;
              font-size: 20px;
              font-weight: 700;
              color: #333;
              border: 1px solid #ddd;
              box-sizing: border-box;
              text-decoration: none;

            }

            .current {
              border-bottom: none;
              border-top-color: #28a3ef;
              color: #e1251b;
            }
          }
        }

        .content {
          width: 380px;
          height: 316px;
          box-sizing: border-box;
          border: 1px solid #ddd;
          border-top: none;
          padding: 18px;
          .elForm{
            margin-top: 10px;
            .el-form-item {
              /deep/.el-form-item__content{
                margin-left: 0 !important;
                .el-input{
                width: 85%;
                }
              }
              span {
                float: left;
                width: 37px;
                height: 39px;
                border: 1px solid #ccc;
                background: url(../../assets/images/icons.png) no-repeat -10px -197px;
                box-sizing: border-box;
                border-radius: 2px 0 0 2px;
              }
              .pwd {
                background-position: -72px -197px;
              }
            }
            .setting {
              label {
                float: left;
              }

              .forget {
                float: right;
              }
            }
            .btn {
              background-color: #e1251b;
              padding: 6px;
              border-radius: 0;
              font-size: 16px;
              font-family: 微软雅黑;
              word-spacing: 4px;
              border: 1px solid #e1251b;
              color: #fff;
              width: 100%;
              height: 36px;
              margin-top: 25px;
              outline: none;
            }
          }
          .call {
            margin-top: 30px;

            ul {
              float: left;

              li {
                float: left;
                margin-right: 5px;
              }
            }

            .register {
              float: right;
              font-size: 15px;
              line-height: 38px;
            }

            .register:hover {
              color: #4cb9fc;
              text-decoration: underline;
            }
          }

        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }

  }
</style>