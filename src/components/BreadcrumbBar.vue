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
            <a
              v-if="this.$route.path.includes('/driving-map')"
              href="#/driving-map"
              >公車動態</a
            >
            <a v-if="this.$route.path.includes('/station')" href="#/station"
              >附近站點</a
            >
            <a v-if="this.$route.path.includes('/timetable')" href="#/timetable"
              >班表查詢</a
            >
            <a v-if="this.$route.path.includes('/favorite')" href="#/favorite"
              >我的收藏</a
            >
          </li>
          <li class="breadcrumb-item" v-if="routeData && Object.keys(routeData).length">
            <a
              :href="`#/driving-map/${routeData.RouteUID}?city=${routeData.City}&routeName=${routeData.RouteName.Zh_tw}`"
              >{{ routeData.RouteName.Zh_tw }}</a
            >
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
      default: undefined
    },
    routeData: {
      type: Object,
      default: undefined
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
  @include media-breakpoint-down(md) {
    border-radius: 0;
  }
}
</style>
