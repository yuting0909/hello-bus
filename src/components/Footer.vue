<template>
  <footer
    v-if="this.$route.path === '/'"
    class="bg-primary fw-light fs-6 fs-sm-3"
  >
    HelloBus © 2021 Designer Vum. Engineer Browny. All rights reserved.
  </footer>
  <footer v-else class="bg-primary fw-light d-none d-md-block">
    HelloBus © 2021 Designer Vum. Engineer Browny. All rights reserved.
  </footer>
</template>

<style lang="scss" scoped>
footer {
  color: white;
  text-align: center;
  font-family: 'Crimson Pro', serif;
  font-size: 20px;
  padding: 20px 5px;
}
</style>
