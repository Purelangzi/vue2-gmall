<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Footer from './components/Footer'
import Header from './components/Header'
export default {
  components: { Header, Footer },
  name: 'App',
  created() {
    // 只需要发一次请求,请求获取三级联动的数据
    this.$store.dispatch("home/categoryList");
    
  },
  mounted() {
    // this.$store.dispatch("user/userInfo");
  },

}
</script>

<style>

</style>
