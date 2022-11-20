const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:'/vue2-gmall',
  // assetsDir:'vue2-gmall',
  outputDir:'dist',
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
