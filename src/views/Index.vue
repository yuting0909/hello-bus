<template>
  <div class="home">
    <div class="home-bg">
      <img class="bg-img d-none d-md-block" src="../assets/images/picBg.png" alt="" />
      <img class="bg-img d-md-none" src="../assets/images/picBgMobile.png" alt="" />
      <header class="text-center">
        <h1>
          <img src="@/assets/images/HelloBus_light.png" alt="" />
        </h1>
        <span class="subtitle">全台公車動態時刻查詢網</span>
      </header>
      <ul class="nav-button-group">
        <li class="nav-item">
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
        <li class="nav-item">
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
        <li class="nav-item">
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
        <li class="nav-item">
          <a class="d-flex flex-column align-items-center" href="#">
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

.home-bg {
  position: relative;
  .bg-img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
  header {
    position: absolute;
    width: 100%;
    top: 200px;
    @include media-breakpoint-down(lg) {
      top: 120px;
    }
    @include media-breakpoint-down(md) {
      top: 160px;
    }
    @include media-breakpoint-down(sm) {
      top: 180px;
    }
  }
  h1 img {
    width: 420px;
    @include media-breakpoint-down(sm) {
      width: 280px;
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
}
.nav-button-group {
  position: absolute;
  bottom: 8%;
  width: 100%;
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  @include media-breakpoint-down(lg) {
    bottom: -10%;
  }
  @include media-breakpoint-down(md) {
    bottom: 13%;
  }
  @include media-breakpoint-down(sm) {
    bottom: 10%;
  }
  .nav-item {
    padding: 0 3rem;
    @include media-breakpoint-down(md) {
      padding: 0 1rem;
    }
    @include media-breakpoint-down(sm) {
      padding: 0 0.5rem;
    }
  }
  .rounded-pill {
    width: 100px;
    height: 100px;
    position: relative;
    font-size: 54px;
    @include media-breakpoint-down(lg) {
      width: 80px;
      height: 80px;
      font-size: 45px;
    }
    @include media-breakpoint-down(md) {
      width: 60px;
      height: 60px;
      font-size: 32px;
    }
    @include media-breakpoint-down(sm) {
      width: 45px;
      height: 45px;
      font-size: 25px;
    }
  }
}
</style>
