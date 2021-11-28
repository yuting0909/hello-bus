<template>
  <div class="home">
    <header class="text-center">
      <h1>
        <img src="@/assets/images/HelloBus_light.png" alt="" />
      </h1>
      <span class="subtitle">全台公車動態時刻查詢網</span>
    </header>
    <ul class="nav-button-group">
      <li class="nav-item mx-2 mx-md-4">
        <a class="d-flex flex-column align-items-center" href="#/driving-map">
          <div class="rounded-pill bg-info text-white">
            <i
              class="
                fas
                fa-bus
                position-absolute
                top-50
                start-50
                translate-middle
              "
            ></i>
          </div>
          <span class="mt-3 fs-6 fs-sm-3 ls-2">公車動態</span>
        </a>
      </li>
      <li class="nav-item mx-2 mx-md-4">
        <a class="d-flex flex-column align-items-center" href="#/station">
          <div class="rounded-pill bg-info text-white">
            <i
              class="
                fas
                fa-map-marker-alt
                position-absolute
                top-50
                start-50
                translate-middle
              "
            ></i>
          </div>
          <span class="mt-3 fs-6 fs-sm-3 ls-2">附近站點</span>
        </a>
      </li>
      <li class="nav-item mx-2 mx-md-4">
        <a class="d-flex flex-column align-items-center" href="#/timetable">
          <div class="rounded-pill bg-info text-white">
            <i
              class="
                fas
                fa-clock
                position-absolute
                top-50
                start-50
                translate-middle
              "
            ></i>
          </div>
          <span class="mt-3 fs-6 fs-sm-3 ls-2">班表查詢</span>
        </a>
      </li>
      <li class="nav-item mx-2 mx-md-4">
        <a class="d-flex flex-column align-items-center" href="#/favorite">
          <div class="rounded-pill bg-info text-white">
            <i
              class="
                fas
                fa-heart
                position-absolute
                top-50
                start-50
                translate-middle
              "
            ></i>
          </div>
          <span class="mt-3 fs-6 fs-sm-3 ls-2">我的收藏</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  inject: ['emitter'],
  methods: {
    scrollHandler () {
      const pcNavbar = document.querySelector('#pc-navbar')
      const pcNavbarHide = window.scrollY > pcNavbar.offsetHeight
      this.emitter.emit('hide-pcNavbar', pcNavbarHide)
    }
  },
  created () {
    this.emitter.emit('change-navbar-style', 'dark')
  },
  mounted () {
    window.addEventListener('scroll', this.scrollHandler)
  },
  unmounted () {
    window.removeEventListener('scroll', this.scrollHandler)
  }
}
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '../assets/style/custom/_variables.scss';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/mixins';
@import '~bootstrap/scss/utilities';

.home {
  background-image: url('../assets/images/picBg.png');
  background-size: cover;
  background-position: center 40%;
  position: relative;
  min-height: 900px;
  @include media-breakpoint-down(sm) {
    background-image: url('../assets/images/picBgMobile.png');
    background-position: center 80%;
    min-height: 800px;
  }
  header {
    position: absolute;
    width: 100%;
    top: 220px;
    @include media-breakpoint-down(sm) {
      top: 140px;
    }
  }
  h1 img {
    width: 420px;
    @include media-breakpoint-down(sm) {
      width: 300px;
    }
  }
  .subtitle {
    color: #ffffff;
    font-size: 26px;
    font-weight: 300;
    letter-spacing: 3px;
    @include media-breakpoint-down(sm) {
      font-size: 20px;
    }
  }
  .nav-button-group {
    position: absolute;
    width: 100%;
    top: 640px;
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 0;
    @include media-breakpoint-down(xxl) {
      top: 620px;
    }
    @include media-breakpoint-down(md) {
      top: 660px;
    }
    @include media-breakpoint-down(sm) {
      top: 625px;
    }
    .rounded-pill {
      width: 100px;
      height: 100px;
      position: relative;
      font-size: 54px;
      @include media-breakpoint-down(md) {
        width: 60px;
        height: 60px;
        font-size: 32px;
      }
      @include media-breakpoint-down(sm) {
        width: 40px;
        height: 40px;
        font-size: 20px;
      }
    }
  }
}
</style>
