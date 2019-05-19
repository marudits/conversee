
<template lang="pug">
  el-container#app
    el-header
      Header
    el-main
      HomePage
    el-footer
      Footer
</template>

<script>
// components
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

// pages
import HomePage from './pages/HomePage.vue';

export default {
  name: 'app',
  components: {
    HomePage,
    Header,
    Footer
  }
}
</script>

<style lang="stylus">
  #app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
</style>