<template>
  <div class="bus-driving-map">
    <BreadcrumbBar :navbar-style="navbarStyle"></BreadcrumbBar>
    <div class="bus-title bg-primary">
      <div class="container d-flex justify-content-between px-3 px-sm-5">
        <div class="d-flex flex-column justify-content-end">
          <button class="btn icon-btn">
            <div class="rounded-pill bg-info">
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
            <span class="ms-2 d-none d-sm-block">公車時刻表</span>
          </button>
        </div>
        <div class="text-end">
          <h1 class="mb-0">{{ routeName }}</h1>
          <span
            >{{ routeData.DepartureStopNameZh
            }}<i class="fas fa-arrows-alt-h mx-1"></i
            >{{ routeData.DestinationStopNameZh }}</span
          >
        </div>
      </div>
    </div>
    <div class="bg-primary">
      <div class="bus-information bg-white">
        <div class="container">
          <div class="row gx-0 gy-2">
            <div class="col-lg-6 d-none d-sm-block">
              <div class="realtime-data px-3 px-sm-5">
                <div class="d-flex justify-content-between py-3 border-bottom">
                  <div class="text-dark">
                    <span class="text-muted fs-7">行駛方向</span> <br />
                    <span class="text-info me-2">往</span>
                    <span v-if="!busDirection">{{
                      routeData.DestinationStopNameZh
                    }}</span>
                    <span v-else>{{ routeData.DepartureStopNameZh }}</span>
                  </div>
                  <button class="btn icon-btn" @click="busDirectionHandler">
                    <div class="rounded-pill bg-info">
                      <i
                        class="
                          fas fas
                          fa-exchange-alt
                          position-absolute
                          top-50
                          start-50
                          translate-middle
                        "
                      ></i>
                    </div>
                  </button>
                </div>
                <div class="stop-container mt-3 pe-3">
                  <div
                    v-for="stop in stopRealtimeData"
                    :key="stop.StopID"
                    class="stop-item d-flex justify-content-between mb-3"
                  >
                    <span>{{ stop.stopName }}</span>
                    <span>{{ stop.estimateTime }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div id="map"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="collapse-realtime-data d-sm-none">
      <button
        class="btn w-100"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#realtime-data"
        aria-expanded="false"
        aria-controls="realtime-data"
        @click="collapseShow = !collapseShow"
      >
        <span v-if="collapseShow"
          ><i class="fas fa-chevron-left me-1"></i> 查看地圖</span
        >
        <i v-else class="fas fa-caret-up"></i>
      </button>
      <div
        id="realtime-data"
        class="realtime-data collapse px-3 px-sm-5"
        :class="{ 'd-none': !collapseShow }"
      >
        <div class="d-flex justify-content-between py-3 border-bottom">
          <div class="text-dark">
            <span class="text-muted fs-7">行駛方向</span> <br />
            <span class="text-info me-2">往</span>
            <span v-if="!busDirection">{{
              routeData.DestinationStopNameZh
            }}</span>
            <span v-else>{{ routeData.DepartureStopNameZh }}</span>
          </div>
          <button class="btn icon-btn" @click="busDirectionHandler">
            <div class="rounded-pill bg-info">
              <i
                class="
                  fas fas
                  fa-exchange-alt
                  position-absolute
                  top-50
                  start-50
                  translate-middle
                "
              ></i>
            </div>
          </button>
        </div>
        <div class="stop-container mt-3 pe-3">
          <div
            v-for="stop in stopRealtimeData"
            :key="stop.StopID"
            class="stop-item d-flex justify-content-between mb-3"
          >
            <span>{{ stop.stopName }}</span>
            <span>{{ stop.estimateTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadcrumbBar from '@/components/BreadcrumbBar.vue'
import L from 'leaflet'
import Wkt from 'wicket'
import getAuthorizationHeader from '@/methods/getAuthorizationHeader'

export default {
  components: { BreadcrumbBar },
  data () {
    return {
      navbarStyle: 'light',
      collapseShow: false,
      city: 'Taichung',
      routeName: '300',
      routeData: {},
      busRoute: [],
      busLocation: [],
      busStop: [],
      stopRealtimeData: [],
      busDirection: 0,
      map: {},
      routeLayer: null,
      stopLayer: null,
      busLayer: null
    }
  },
  inject: ['emitter'],
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
      this.getRouteData()
      this.getShapeData()
      this.getStop()
      this.getRealtimeData()
      this.getBusLocation()
    },
    location () {
      const map = this.map
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const longitude = position.coords.longitude // 經度
            const latitude = position.coords.latitude // 緯度
            // console.log(longitude)
            // console.log(latitude)

            // 重新設定 view 的位置
            map.setView([latitude, longitude], 13)
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
    getRouteData () {
      this.axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${this.city}/${this.routeName}?$format=JSON`,
        headers: getAuthorizationHeader()
      }).then((res) => {
        this.routeData = res.data.find(
          (item) => item.RouteName.Zh_tw === this.routeName
        )
      })
    },
    getRealtimeData () {
      this.axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/EstimatedTimeOfArrival/City/${this.city}/${this.routeName}?$format=JSON`,
        headers: getAuthorizationHeader()
      }).then((res) => {
        const data = res.data
          .filter((item) => item.RouteName.Zh_tw === this.routeName)
          .filter((item) => item.Direction === this.busDirection)
          .sort((a, b) => a.StopSequence - b.StopSequence)
        // console.log(data)
        this.stopRealtimeData = []
        data.forEach((item) => {
          const stopData = {}
          stopData.stopName = item.StopName.Zh_tw
          stopData.stopUID = item.StopUID
          stopData.PlateNumb = item.PlateNumb
          if (item.StopStatus === 0) {
            const time = Math.floor(item.EstimateTime / 60)
            if (time === 0) {
              stopData.estimateTime = '進站中'
            } else if (time <= 1 && time > 0) {
              stopData.estimateTime = '即將到站'
            } else if (!time) {
              stopData.estimateTime = '--'
            } else {
              stopData.estimateTime = `${time}分鐘`
            }
          } else if (item.StopStatus === 1) {
            stopData.estimateTime = '尚未發車'
          } else if (item.StopStatus === 2) {
            stopData.estimateTime = '交管不停靠'
          } else if (item.StopStatus === 3) {
            stopData.estimateTime = '末班車已過'
          } else if (item.StopStatus === 4) {
            stopData.estimateTime = '今日未營運'
          } else {
            stopData.estimateTime = '--'
          }
          this.stopRealtimeData.push(stopData)
        })
        // console.log(this.stopRealtimeData)
      })
    },
    getShapeData () {
      this.axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Shape/City/${this.city}/${this.routeName}?$format=JSON`,
        headers: getAuthorizationHeader()
      }).then((res) => {
        this.busRoute = res.data.filter(
          (item) => item.RouteName.Zh_tw === this.routeName
        )
        this.drawRoute()
      })
    },
    drawRoute () {
      if (this.routeLayer) {
        this.map.removeLayer(this.routeLayer)
      }
      const line = this.busRoute.find(
        (item) => item.Direction === this.busDirection
      )
      const geo = line ? line.Geometry : this.busRoute[0].Geometry
      const wicket = new Wkt.Wkt()
      const geojsonFeature = wicket.read(geo).toJson()
      this.routeLayer = L.geoJSON(geojsonFeature, {
        style: {
          color: '#5CBCDB',
          weight: 4
        }
      }).addTo(this.map)
      this.map.fitBounds(this.routeLayer.getBounds())
    },
    getBusLocation () {
      this.axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/RealTimeByFrequency/City/${this.city}/${this.routeName}?$format=JSON`,
        headers: getAuthorizationHeader()
      }).then((res) => {
        this.busLocation = res.data.filter(
          (item) =>
            item.RouteName.Zh_tw === this.routeName && item.DutyStatus === 0
        )
        this.drawBus()
      })
    },
    drawBus () {
      const icon = L.icon({
        iconUrl: require('@/assets/images/bus.png'),
        iconSize: [30, 30]
      })
      if (this.busLayer) {
        this.map.removeLayer(this.busLayer)
      }
      const bus = this.busLocation.filter(
        (item) => item.Direction === this.busDirection
      )
      // console.log(bus)
      this.busLayer = L.layerGroup().addTo(this.map)
      bus.forEach((item) => {
        const lat = item.BusPosition.PositionLat
        const lon = item.BusPosition.PositionLon
        L.marker([lat, lon], {
          icon: icon,
          title: item.PlateNumb,
          opacity: 1.0
        })
          .setZIndexOffset(100)
          .addTo(this.busLayer)
      })
    },
    getStop () {
      this.axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/${this.city}/${this.routeName}?$format=JSON`,
        headers: getAuthorizationHeader()
      }).then((res) => {
        this.busStop = res.data.filter(
          (item) => item.RouteName.Zh_tw === this.routeName
        )
        this.drawStop()
      })
    },
    drawStop () {
      const icon = L.icon({
        iconUrl: require('@/assets/images/stop.png'),
        iconSize: [10, 10]
      })
      if (this.stopLayer) {
        this.map.removeLayer(this.stopLayer)
      }
      const stops = this.busStop.find(
        (item) => item.Direction === this.busDirection
      ).Stops
      this.stopLayer = L.layerGroup().addTo(this.map)
      stops.forEach((item) => {
        const lat = item.StopPosition.PositionLat
        const lon = item.StopPosition.PositionLon
        L.marker([lat, lon], {
          icon: icon,
          title: item.StopName.Zh_tw,
          opacity: 1.0
        }).addTo(this.stopLayer)
      })
    },
    busDirectionHandler () {
      if (this.busDirection) {
        this.busDirection = 0
      } else {
        this.busDirection = 1
      }
    }
  },
  watch: {
    busDirection () {
      this.drawRoute()
      this.drawStop()
      this.drawBus()
      this.getRealtimeData()
    }
  },
  created () {
    this.emitter.emit('change-navbar-style', this.navbarStyle)
  },
  mounted () {
    this.initialMap()
    // this.location()
  }
}
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '../assets/style/custom/_variables.scss';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/mixins';
@import '~bootstrap/scss/utilities';

.bus-driving-map {
  .container {
    padding: 0;
  }
}
.bus-title {
  margin-top: 110px;
  border-radius: 20px 20px 0 0;
  padding: 20px 0 12px 0;
  color: #ffffff;
  text-align: center;
  @include media-breakpoint-down(md) {
    margin-top: 90px;
  }
}
.bus-information {
  border-radius: 20px 20px 0 0;
  height: 100%;
  overflow: hidden;
  @include media-breakpoint-down(sm) {
    border-radius: 0;
  }
}
#map {
  height: 500px;
  @include media-breakpoint-down(sm) {
    height: calc(100vh - 190px);
  }
}
.icon-btn {
  padding: 0;
  color: #ffffff;
  display: flex;
  align-items: center;
  .rounded-pill {
    position: relative;
    width: 40px;
    height: 40px;
    font-size: 25px;
  }
}
.realtime-data {
  height: 500px;
  display: flex;
  flex-direction: column;
  @include media-breakpoint-down(sm) {
    height: calc(100vh - 100px);
  }
}
.collapse-realtime-data {
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 500;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.15);
}
.stop-container {
  overflow: auto;
}
</style>
