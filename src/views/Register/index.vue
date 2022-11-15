<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <router-link  to="/login">登陆</router-link>
        </span>
      </h3>
      <!-- <div class="content">
        <label>手机号:</label>
        <input type="text" v-model="phone" placeholder="请输入你的手机号" />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" v-model="code" placeholder="请输入验证码" />
        <button style="width: 100px; height: 38px" @click="getCode">
          获取验证码
        </button>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
          type="password"
          v-model="password"
          placeholder="请输入你的登录密码"
        />
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
          type="password"
          v-model="password1"
          placeholder="请输入确认密码"
        />

        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" @change="agree = !agree" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div> -->
    
      <el-form :model="form" ref="form" :rules="rules" label-width="100px" class="elForm"  size="medium ">
        <el-form-item label="手机号:" prop="phone">
          <el-input v-model="form.phone" autocomplete="on" maxlength="11" placeholder="请输入你的手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码:" prop="code">
          <el-input type="primary " v-model="form.code"  placeholder="输入手机号才能获取验证码"></el-input>
          <el-button type="info " size="default" :disabled="disabled" round @click="getCode"  style="margin-left:15px;">{{buttonName}}</el-button>
        </el-form-item>
        <el-form-item label="登录密码:" prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入你的登录密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="password1">
          <el-input type="password" v-model="form.password1" placeholder="请输入确认密码"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="form.agree" :indeterminate="false" @change="form.agree = !form.agree">同意协议并注册《尚品汇用户协议》</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" @click="userRegister">完成注册</el-button>
        </el-form-item>
      </el-form>
    
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
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    // 自定义手机号的验证规则
    const validatePhone = (rule, value, callback) => {
      const reg = /^[1]([3-9])[0-9]{9}$/
      if (!reg.test(value)) {
        callback(new Error('手机格式不正确!请输入11位手机号'));
      } else {
        callback();
      }
    };
    // 自定义确认密码的验证规则
    const validatePassWord1 = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      disabled:false,
      buttonName:'获取验证码',
      form:{
        phone: undefined,
        code: undefined,
        password: undefined,
        password1: undefined,
        agree: false,
      },
      rules:{
        phone:[
          {required:true, message: '请输入手机号',trigger: 'blur'},
          { validator: validatePhone, trigger: 'blur' }
        ],
        code:[
          {required:true, message: '请输入验证码',trigger: 'blur'}
          
        ],
        password:[
          {required:true, message: '请输入密码',trigger: 'blur'},
          {min:6,max:12,message:'密码长度6-12位'}
        ],
        password1:[
          {required:true, message: '请输入确认密码',trigger: 'blur'},
          { validator:validatePassWord1,trigger: 'blur'}
        ],
        agree:[
          {required:true, message: '请点击同意',trigger: 'blur'}
        ],
      }
      
    };
  },
  methods: {
    // 获取验证码
    async getCode() {
      const reg = /^[1]([3-9])[0-9]{9}$/
      if(!reg.test(this.form.phone)){
        this.$message.warning('输入正确的手机号')
        return
      }
      try {
        await this.$store.dispatch("user/getCode", this.form.phone);
        this.form.code = this.$store.state.user.code;
        // 发送完验证码倒计时
        let count = 59
        let timer = setInterval(() => {
          if(count<1){
            this.disabled = false
            this.buttonName = '获取验证码'
            count = 59
            clearInterval(timer)
          }else{
            this.disabled = true
            this.buttonName = `${count--}s后重发`
          }
        }, 1000);
        
      } catch (error) {
        alert(error.message);
      }
    },
    // 用户注册
    userRegister() {
       this.$refs.form.validate(async(valid) => {
          if (valid) {
            const { phone, password, code } = this.form;
            try {
              await this.$store.dispatch("user/userRegister", {phone,password,code,});
              this.$router.push("/login");
            } catch (error) {
              alert(error.message);
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      
    }
  }
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;
    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;
      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }
    .elForm{
      padding-left: 340px;
      .el-input:nth-of-type(1){
        margin-top:0;
        width:230px;
      }
    }
    

    div:nth-of-type(1) {
      margin-top: 40px;
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto  ;
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