<template>
  <Navbar></Navbar>
  <router-view class="flex-grow-1" />
  <Footer></Footer>
</template>

<style lang="scss">
#app {
  min-height: 100vh;
  letter-spacing: 1px;
}
</style>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import emitter from '@/methods/emitter'

export default {
  components: { Navbar, Footer },
  provide () {
    return {
      emitter
    }
  }
}
</script>
