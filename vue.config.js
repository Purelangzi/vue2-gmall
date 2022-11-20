const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap:false,
  transpileDependencies: true,
  lintOnSave:false, //关闭Eslint
  // 代理跨域
  devServer:{
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',//后台接口域名
        // target:'http://47.93.148.192/' // 备用
        
      }
    }
  }
})
