
<template lang="pug">
  el-container#app
    el-header
      h1 Conversee
    el-main
      HomePage
    el-footer
      p Copyright &copy; 2019 by
        a(href="mailto:marudits@gmail.com") marudits
</template>

<script>
import HomePage from './pages/HomePage.vue'

export default {
  name: 'app',
  components: {
    HomePage
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