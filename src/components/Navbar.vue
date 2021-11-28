<template>
  <nav
    id="pc-navbar"
    class="navbar d-none"
    :class="{
      'd-md-block': !pcNavbarHide,
      'text-dark': navbarStyle === 'light',
      'text-white': navbarStyle === 'dark',
      'bg-white': navbarStyle === 'light'
    }"
  >
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          v-if="navbarStyle === 'dark'"
          src="@/assets/images/HelloBus_light.png"
          alt="logo"
        />
        <img v-else src="@/assets/images/HelloBus_dark.png" alt="logo" />
      </a>
      <ul class="navbar-nav flex-grow-1 justify-content-center">
        <li class="nav-item">
          <router-link class="nav-link" to="/driving-map">公車動態</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/station">附近站點</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/timetable">班表查詢</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/favorite">我的收藏</router-link>
        </li>
      </ul>
    </div>
  </nav>
  <nav
    v-if="this.$route.path !== '/'"
    id="mobile-navbar"
    class="navbar flex-column d-md-none"
  >
    <div class="container-fluid py-2">
      <button
        class="navbar-toggler border-0 p-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="mobileNavbarOpen = !mobileNavbarOpen"
      >
        <svg
          v-if="mobileNavbarOpen"
          width="25"
          height="25"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 12.8787L27.4393 0.43934C28.0251 -0.146447 28.9749 -0.146447 29.5607 0.43934C30.1464 1.02513 30.1464 1.97487 29.5607 2.56066L17.1213 15L29.5607 27.4393C30.1464 28.0251 30.1464 28.9749 29.5607 29.5607C28.9749 30.1464 28.0251 30.1464 27.4393 29.5607L15 17.1213L2.56066 29.5607C1.97487 30.1464 1.02513 30.1464 0.43934 29.5607C-0.146447 28.9749 -0.146447 28.0251 0.43934 27.4393L12.8787 15L0.43934 2.56066C-0.146447 1.97487 -0.146447 1.02513 0.43934 0.43934C1.02513 -0.146447 1.97487 -0.146447 2.56066 0.43934L15 12.8787Z"
            fill="#ffffff"
          />
        </svg>
        <template v-else>
          <svg
            v-if="navbarStyle === 'dark'"
            width="25"
            height="20"
            viewBox="0 0 30 27"
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1.5"
              y1="1.5"
              x2="28.5"
              y2="1.5"
              stroke="#ffffff"
              stroke-width="3"
              stroke-linecap="round"
            />
            <line
              x1="1.5"
              y1="13.5"
              x2="13.5"
              y2="13.5"
              stroke="#ffffff"
              stroke-width="3"
              stroke-linecap="round"
            />
            <line
              x1="1.5"
              y1="25.5"
              x2="28.5"
              y2="25.5"
              stroke="#ffffff"
              stroke-width="3"
              stroke-linecap="round"
            />
          </svg>
          <svg
            v-else
            width="25"
            height="20"
            viewBox="0 0 30 27"
            fill="#4c546a"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="1.5"
              y1="1.5"
              x2="28.5"
              y2="1.5"
              stroke="#4c546a"
              stroke-width="3"
              stroke-linecap="round"
            />
            <line
              x1="1.5"
              y1="13.5"
              x2="13.5"
              y2="13.5"
              stroke="#4c546a"
              stroke-width="3"
              stroke-linecap="round"
            />
            <line
              x1="1.5"
              y1="25.5"
              x2="28.5"
              y2="25.5"
              stroke="#4c546a"
              stroke-width="3"
              stroke-linecap="round"
            />
          </svg>
        </template>
      </button>
      <a class="navbar-brand" href="#">
        <img
          v-if="mobileNavbarOpen || navbarStyle === 'dark'"
          src="@/assets/images/HelloBus_light.png"
          alt="logo"
        />
        <img v-else src="@/assets/images/HelloBus_dark.png" alt="logo" />
      </a>
    </div>
    <div class="collapse navbar-collapse bg-primary" id="navbarCollapse">
      <ul class="navbar-nav mx-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/driving-map" active-class="active"
            >公車動態</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/station" active-class="active"
            >附近站點</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/timetable" active-class="active"
            >班表查詢</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/favorite" active-class="active"
            >我的收藏</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      navbarStyle: '',
      pcNavbarHide: false,
      mobileNavbarOpen: false
    }
  },
  inject: ['emitter'],
  mounted () {
    this.emitter.on('hide-pcNavbar', (val) => {
      this.pcNavbarHide = val
    })
    this.emitter.on('change-navbar-style', (val) => {
      this.navbarStyle = val
    })
  },
  updated () {
    if (this.$route.path !== '/') {
      this.pcNavbarHide = false
    }
  }
}
</script>

<style lang="scss" scoped>
#pc-navbar {
  position: fixed;
  padding: 24px 36px;
  width: 100%;
  z-index: 800;
  .navbar-brand {
    padding: 0;
    margin-right: 0;
  }
  .navbar-brand img {
    width: 160px;
  }
  .navbar-nav {
    flex-direction: row;
  }
  .nav-link {
    padding: 0 16px;
    font-size: 20px;
    color: inherit;
    letter-spacing: 2px;
  }
}
#mobile-navbar {
  position: fixed;
  width: 100%;
  z-index: 800;
  padding: 0;
  .navbar-brand img {
    width: 125px;
  }
  .navbar-collapse {
    width: 100%;
    height: 100vh;
    position: fixed;
    z-index: -1;
    padding-top: 40%;
  }
  .nav-item {
    text-align: center;
  }
  .nav-link {
    width: fit-content;
    display: inline-block;
    color: #ffffff;
    border-radius: 100px;
    padding: 0.5rem 2rem;
    margin: 1rem 0;
    letter-spacing: 2px;
    &.active {
      border: 1px solid #ffffff;
    }
  }
}
</style>
