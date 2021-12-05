<template>
  <div class="station">
    <BreadcrumbBar :navbar-style="navbarStyle"></BreadcrumbBar>
    <div class="container-sm px-0 pt-sm-5">
      <div class="row">
        <div class="col-lg-6 mt-0 px-3 d-none d-sm-block">
          <div v-if="!tempStation" class="station-container rounded-2 mb-sm-3">
            <div class="card-title mb-0 py-2 bg-primary d-none d-sm-block">
              <h1 class="fs-3 text-center text-white mb-0">附近站點</h1>
            </div>
            <div class="card-body d-flex flex-column overflow-auto">
              <div
                v-for="station in stations"
                :key="station.stationID"
                class="station-item"
              >
                <h2 class="fs-3 text-danger mb-1">
                  <a
                    href="#"
                    class="stretched-link"
                    @click.prevent="tempStation = station"
                    >{{ station.stationName }}</a
                  >
                </h2>
                <span class="fs-7 text-muted">{{
                  station.stationAddress
                }}</span>
              </div>
            </div>
          </div>
          <div v-if="tempStation" class="station-container rounded-2 mb-sm-3">
            <div class="d-flex justify-content-between p-3">
              <button class="btn icon-btn" @click="tempStation = null">
                <div class="rounded-pill bg-info">
                  <i class="fas fas fas fa-long-arrow-alt-left"></i>
                </div>
              </button>
              <div class="text-end ms-3">
                <h1 class="fs-2 mb-1">{{ tempStation.stationName }}</h1>
                <span class="fs-6 text-muted">{{
                  tempStation.stationAddress
                }}</span>
              </div>
            </div>
            <div class="card-body d-flex flex-column overflow-auto">
              <div
                v-for="bus in tempBusRoutes"
                :key="bus.RouteUID"
                class="route-item"
              >
                <div class="row g-0">
                  <div class="col-9">
                    <h2 class="fs-3 text-danger mb-1">
                      <a
                        :href="`#/driving-map/${bus.RouteUID}?city=${bus.City}&routeName=${bus.RouteName.Zh_tw}`"
                        class="stretched-link"
                        >{{ bus.RouteName.Zh_tw }}</a
                      >
                    </h2>
                    <span class="fs-7 text-muted"
                      >{{ bus.DepartureStopNameZh
                      }}<i class="fas fa-arrows-alt-h mx-1"></i
                      >{{ bus.DestinationStopNameZh }}</span
                    >
                  </div>
                  <div class="col-3 text-end">
                    <span class="fs-7 px-2 py-1 border rounded-pill">{{
                      bus.CityName
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 mt-0">
          <div id="map" class="bus-station-map mb-sm-3"></div>
        </div>
      </div>
    </div>
    <div class="collapse-station-data d-sm-none">
      <button
        class="btn w-100"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#station-data"
        aria-expanded="false"
        aria-controls="station-data"
        @click="collapseShow = !collapseShow"
      >
        <i v-if="collapseShow" class="fas fa-caret-down"></i>
        <i v-else class="fas fa-caret-up"></i>
      </button>
      <div id="station-data" class="collapse">
        <div v-if="!tempStation" class="station-container">
          <div class="card-title mb-0 py-2 bg-primary d-none d-md-block">
            <h1 class="fs-3 text-center text-white mb-0">附近站點</h1>
          </div>
          <div class="card-body d-flex flex-column overflow-auto">
            <div
              v-for="station in stations"
              :key="station.stationID"
              class="station-item"
            >
              <h2 class="fs-3 text-danger mb-1">
                <a
                  href="#"
                  class="stretched-link"
                  @click.prevent="tempStation = station"
                  >{{ station.stationName }}</a
                >
              </h2>
              <span class="fs-7 text-muted">{{ station.stationAddress }}</span>
            </div>
          </div>
        </div>
        <div v-if="tempStation" class="station-container">
          <div class="d-flex justify-content-between p-3">
            <button class="btn icon-btn" @click="tempStation = null">
              <div class="rounded-pill bg-info">
                <i class="fas fas fas fa-long-arrow-alt-left"></i>
              </div>
            </button>
            <div class="text-end ms-3">
              <h1 class="fs-2 mb-1">{{ tempStation.stationName }}</h1>
              <span class="fs-6 text-muted">{{
                tempStation.stationAddress
              }}</span>
            </div>
          </div>
          <div class="card-body d-flex flex-column overflow-auto">
            <div
              v-for="bus in tempBusRoutes"
              :key="bus.RouteUID"
              class="route-item"
            >
              <div class="row g-0">
                <div class="col-9">
                  <h2 class="fs-3 text-danger mb-1">
                    <a
                      :href="`#/driving-map/${bus.RouteUID}?city=${bus.City}&routeName=${bus.RouteName.Zh_tw}`"
                      class="stretched-link"
                      >{{ bus.RouteName.Zh_tw }}</a
                    >
                  </h2>
                  <span class="fs-7 text-muted"
                    >{{ bus.DepartureStopNameZh
                    }}<i class="fas fa-arrows-alt-h mx-1"></i
                    >{{ bus.DestinationStopNameZh }}</span
                  >
                </div>
                <div class="col-3 text-end">
                  <span class="fs-7 px-2 py-1 border rounded-pill">{{
                    bus.CityName
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadcrumbBar from '@/components/BreadcrumbBar.vue'
import L from 'leaflet'
import getAuthorizationHeader from '@/methods/getAuthorizationHeader'
import { city, codeToCity, cityToCityName } from '@/methods/city'

export default {
  components: { BreadcrumbBar },
  data () {
    return {
      navbarStyle: 'dark',
      collapseShow: false,
      map: {},
      stations: [],
      tempStation: null,
      tempBusRoutes: [],
      stationLayer: {}
    }
  },
  inject: ['emitter'],
  watch: {
    tempStation () {
      this.drawStation()
      this.getRouteData()
    }
  },
  methods: {
    initialMap () {
      this.map = L.map('map', { zoomControl: false }).setView([0, 0], 0)
      L.tileLayer(
        `https://{s}.tile.jawg.io/jawg-light/{z}/{x}/{y}{r}.png?access-token=${process.env.VUE_APP_JAWG_ACCESSTOKEN}`,
        {
          attribution:
            '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          minZoom: 0,
          maxZoom: 22,
          subdomains: 'abcd',
          accessToken: process.env.VUE_APP_JAWG_ACCESSTOKEN
        }
      ).addTo(this.map)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const longitude = position.coords.longitude
            const latitude = position.coords.latitude
            this.map.setView([latitude, longitude], 16)
            this.getNearbyStation(latitude, longitude)
          },
          // 錯誤訊息
          function (e) {
            const msg = e.code
            const dd = e.message
            console.error('msg', msg)
            console.error('dd', dd)
          }
        )
      }
    },
    getNearbyStation (lat, lon) {
      this.axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Station/NearBy?$spatialFilter=nearby(${lat},${lon},300)
&$format=JSON`,
        headers: getAuthorizationHeader()
      }).then((res) => {
        const cityStations = []
        res.data.forEach((item) => {
          const code = item.StationUID.substring(0, 3)
          const isCity = city.map((city) => city.CityCode).indexOf(code)
          if (isCity !== -1) {
            cityStations.push(item)
          }
        })
        cityStations.forEach((item) => {
          const index = this.stations
            .map((item) => item.stationID)
            .indexOf(item.StationID)
          if (index === -1) {
            this.stations.push({
              stationID: item.StationID || '--',
              stationName: item.StationName.Zh_tw || '--',
              stationAddress: item.StationAddress || '--',
              stationPosition: item.StationPosition || {},
              stops: item.Stops
            })
          } else {
            this.stations[index].stops = this.stations[index].stops.concat(
              item.Stops
            )
          }
        })
        this.drawStation()
      })
    },
    drawStation () {
      const icon = L.icon({
        iconUrl: require('@/assets/images/station.png'),
        iconSize: [30, 30]
      })
      if (this.stationLayer) {
        this.map.removeLayer(this.stationLayer)
      }
      if (this.tempStation) {
        this.stationLayer = L.layerGroup().addTo(this.map)
        const lat = this.tempStation.stationPosition.PositionLat
        const lon = this.tempStation.stationPosition.PositionLon
        L.marker([lat, lon], {
          icon: icon,
          title: this.tempStation.stationName,
          opacity: 1.0
        }).addTo(this.stationLayer)
      } else {
        this.stationLayer = L.layerGroup().addTo(this.map)
        this.stations.forEach((station) => {
          const lat = station.stationPosition.PositionLat
          const lon = station.stationPosition.PositionLon
          L.marker([lat, lon], {
            icon: icon,
            title: station.stationName,
            opacity: 1.0
          }).addTo(this.stationLayer)
        })
      }
    },
    getRouteData () {
      if (this.tempStation) {
        this.tempStation.stops.forEach((stop) => {
          const routeName = stop.RouteName.Zh_tw
          const city = codeToCity(stop.RouteUID.substring(0, 3))
          this.axios({
            method: 'get',
            url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${city}/${routeName}?$format=JSON`,
            headers: getAuthorizationHeader()
          }).then((res) => {
            const route = res.data.find(
              (item) => item.RouteName.Zh_tw === routeName
            )
            route.CityName = cityToCityName(route.City)
            this.tempBusRoutes.push(route)
          })
        })
      }
    }
  },
  created () {
    this.emitter.emit('change-navbar-style', this.navbarStyle)
  },
  mounted () {
    this.initialMap()
  }
}
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '../assets/style/custom/_variables.scss';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/mixins';
@import '~bootstrap/scss/utilities';

.station {
  .container-sm {
    overflow: hidden;
    margin-top: 110px;
    @include media-breakpoint-down(md) {
      margin-top: 90px;
    }
  }
}
.station-container {
  overflow: hidden;
  height: 500px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.15);
  @include media-breakpoint-down(md) {
    box-shadow: none;
  }
}
.station-item,
.route-item {
  border: 1px solid rgba(238, 238, 238, 0.5);
  box-shadow: 0px 4px 10px -1px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  padding: 8px 12px;
  margin-bottom: 16px;
  position: relative;
}
#map {
  height: 500px;
  @include media-breakpoint-down(md) {
    height: calc(100vh - 100px);
  }
}
.collapse-station-data {
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 500;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.15);
}
</style>
