<template>
  <div
    class="breadcrumb-bar"
    :class="{
      'breadcrumb-bar-light': navbarStyle === 'light',
      'breadcrumb-bar-dark': navbarStyle === 'dark'
    }"
  >
    <nav aria-label="breadcrumb">
      <div class="container-fluid">
        <ol class="breadcrumb fs-6 fw-light mb-2">
          <li class="breadcrumb-item"><a href="#">首頁</a></li>
          <li class="breadcrumb-item">
            <a href="#/driving-map">公車動態</a>
          </li>
        </ol>
      </div>
    </nav>
    <slot name="searchBar"></slot>
  </div>
</template>

<script>
export default {
  props: {
    navbarStyle: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '../assets/style/custom/_variables.scss';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/mixins';
@import '~bootstrap/scss/utilities';

.breadcrumb-bar {
  position: fixed;
  width: 100%;
  z-index: 500;
  padding: 80px 36px 0 36px;
  @include media-breakpoint-down(md) {
    padding: 60px 0 0 0;
  }
  nav {
    --bs-breadcrumb-divider: '>';
    .breadcrumb-item::before {
      color: inherit;
    }
  }
}
.breadcrumb-bar-light {
  background-color: #ffffff;
  color: inherit;
  box-shadow: none;
}
.breadcrumb-bar-dark {
  background-color: $primary;
  color: #ffffff;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.15);
  border-radius: 0px 0px 20px 20px;
}
</style>
