
<template lang="pug">
  el-container#app
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
  @import './assets/styles/variable'

  body
    margin 0

    #app
      font-family 'Avenir', Helvetica, Arial, sans-serif
      -webkit-font-smoothing antialiased
      -moz-osx-font-smoothing grayscale
      text-align center
      color #2c3e50

      .el-main
        padding-bottom 5rem

      .el-footer
        background-color teal-darken-2
        border-top 0.25rem solid teal-lighten-1
        bottom 0
        color teal-lighten-2
        position fixed
        width 100%

        a
          color teal-lighten-2
</style>