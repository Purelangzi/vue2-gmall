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

}
</script>

<style>

</style>
