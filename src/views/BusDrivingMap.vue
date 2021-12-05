<template>
  <div class="bus-driving-map">
    <BreadcrumbBar
      :navbar-style="navbarStyle"
      :routeData="routeData"
    ></BreadcrumbBar>
    <div class="bus-title bg-primary">
      <div class="container d-flex justify-content-between px-3 px-sm-5">
        <div class="d-flex flex-column justify-content-end">
          <button
            class="btn icon-btn"
            @click="this.$refs.timetableModal.show()"
          >
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
          <h1 class="mb-1">{{ routeName }}</h1>
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
                  <button
                    v-if="hasBothDirection"
                    class="btn icon-btn"
                    @click="busDirectionHandler"
                  >
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
                    v-for="stop in tempRealtimeData"
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
          <button
            v-if="hasBothDirection"
            class="btn icon-btn"
            @click="busDirectionHandler"
          >
            <div class="rounded-pill bg-info">
              <i class="fas fas fa-exchange-alt"></i>
            </div>
          </button>
        </div>
        <div class="stop-container mt-3 pe-3">
          <div
            v-for="stop in tempRealtimeData"
            :key="stop.StopID"
            class="stop-item d-flex justify-content-between mb-3"
          >
            <span>{{ stop.stopName }}</span>
            <span>{{ stop.estimateTime }}</span>
          </div>
        </div>
      </div>
    </div>
    <TimetableModal :bus="routeData" ref="timetableModal"></TimetableModal>
  </div>
</template>

<script>
import BreadcrumbBar from '@/components/BreadcrumbBar.vue'
import TimetableModal from '@/components/TimetableModal.vue'
import L from 'leaflet'
import Wkt from 'wicket'
import getAuthorizationHeader from '@/methods/getAuthorizationHeader'

export default {
  components: { BreadcrumbBar, TimetableModal },
  data () {
    return {
      navbarStyle: 'light',
      collapseShow: false,
      city: '',
      routeName: '',
      routeData: {},
      busTimetables: [],
      busRoute: [],
      busLocation: [],
      busStop: [],
      tempStops: [],
      realtimeData: [],
      hasBothDirection: '',
      busDirection: 0,
      map: {},
      routeLayer: null,
      stopLayer: null,
      busLayer: null
    }
  },
  computed: {
    tempRealtimeData () {
      const realtimeData = this.realtimeData.filter(
        (item) => item.Direction === this.busDirection
      )
      const newData = this.tempStops.map((item) => ({
        stopName: item.StopName.Zh_tw,
        stopUID: item.StopUID,
        stopSequence: item.StopSequence,
        plateNumb: '--',
        estimateTime: '--'
      }))
      realtimeData.forEach((data) => {
        newData.forEach((newData) => {
          if (data.StopUID === newData.stopUID) {
            newData.plateNumb = data.PlateNumb
            if (data.StopStatus === 0) {
              const time = Math.floor(data.EstimateTime / 60)
              if (time === 0) {
                newData.estimateTime = '進站中'
              } else if (time <= 1 && time > 0) {
                newData.estimateTime = '即將到站'
              } else if (!time) {
                newData.estimateTime = '--'
              } else {
                newData.estimateTime = `${time}分鐘`
              }
            } else if (data.StopStatus === 1) {
              newData.estimateTime = data.NextBusTime || '尚未發車'
            } else if (data.StopStatus === 2) {
              newData.estimateTime = '交管不停靠'
            } else if (data.StopStatus === 3) {
              newData.estimateTime = data.NextBusTime || '末班車已過'
            } else if (data.StopStatus === 4) {
              newData.estimateTime = '今日未營運'
            } else {
              newData.estimateTime = '--'
            }
          }
        })
      })
      return newData
    }
  },
  watch: {
    busDirection () {
      this.drawRoute()
      this.drawStop()
      this.drawBus()
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
      this.getBusTimetable()
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
        this.realtimeData = res.data.filter(
          (item) => item.RouteName.Zh_tw === this.routeName
        )
        const go = this.realtimeData.filter((item) => item.Direction === 0)
        const back = this.realtimeData.filter((item) => item.Direction === 1)
        if (go.length && back.length) {
          this.hasBothDirection = true
        } else {
          this.hasBothDirection = false
        }
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
          (item) => item.RouteName.Zh_tw === this.routeName
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
      this.tempStops = this.busStop.find(
        (item) => item.Direction === this.busDirection
      ).Stops
      this.stopLayer = L.layerGroup().addTo(this.map)
      this.tempStops.forEach((item) => {
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
    },
    getBusTimetable () {
      this.axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Schedule/City/${this.city}/${this.routeName}?$format=JSON`,
        headers: getAuthorizationHeader()
      }).then((res) => {
        this.busTimetables = res.data.filter(
          (item) => item.RouteName.Zh_tw === this.routeName
        )
        // 整理 timetable
        this.routeData.Timetables = {}
        const newTimetables = []
        this.busTimetables.forEach((item) => {
          if (item.Timetables) {
            const data = {
              subRouteName: item.SubRouteName.Zh_tw,
              direction: item.Direction,
              timetable: []
            }
            item.Timetables.forEach((timetable) => {
              const time = timetable.StopTimes.find(
                (item) => item.StopSequence === 1
              ).DepartureTime
              const index = data.timetable
                .map((item) => item.departureTime)
                .indexOf(time)
              if (index === -1) {
                data.timetable.push({
                  departureTime: time,
                  serviceDay: { ...timetable.ServiceDay }
                })
              } else {
                const days = Object.keys(timetable.ServiceDay).filter(
                  (day) => timetable.ServiceDay[day] === 1
                )
                days.forEach((day) => {
                  data.timetable[index].serviceDay[day] = 1
                })
              }
            })
            // 依照時間排序
            data.timetable.sort((a, b) => {
              return (
                a.departureTime.split(':').join('') -
                b.departureTime.split(':').join('')
              )
            })
            newTimetables.push(data)
          }
        })
        // 拆分平日與假日 timetable
        const holidayTimetable = newTimetables.map((item) => ({
          ...item,
          serviceDay: 'holiday',
          timetable: item.timetable.filter(
            (item) =>
              item.serviceDay.Saturday === 1 && item.serviceDay.Sunday === 1
          )
        }))
        this.routeData.Timetables.holiday = holidayTimetable
        const commonTimetable = newTimetables.map((item) => ({
          ...item,
          serviceDay: 'common',
          timetable: item.timetable.filter(
            (item) =>
              item.serviceDay.Monday === 1 &&
              item.serviceDay.Tuesday === 1 &&
              item.serviceDay.Wednesday === 1 &&
              item.serviceDay.Thursday === 1 &&
              item.serviceDay.Friday === 1
          )
        }))
        this.routeData.Timetables.common = commonTimetable
        // 整理 frequency (含去回程、子路線、不同站發車)
        this.routeData.Frequencys = {}
        const newFrequencys = []
        this.busTimetables.forEach((item) => {
          if (item.Frequencys) {
            const data = {
              subRouteName: item.SubRouteName.Zh_tw,
              direction: item.Direction,
              frequency: []
            }
            item.Frequencys.forEach((frequency) => {
              const timePeriod = `${frequency.StartTime} - ${frequency.EndTime}`
              const index = data.frequency
                .map((item) => item.timePeriod)
                .indexOf(timePeriod)
              if (index === -1) {
                data.frequency.push({
                  timePeriod: timePeriod,
                  startTime: frequency.StartTime,
                  endTime: frequency.EndTime,
                  minHeadwayMins: frequency.MinHeadwayMins,
                  maxHeadwayMins: frequency.MaxHeadwayMins,
                  serviceDay: { ...frequency.ServiceDay }
                })
              } else {
                const days = Object.keys(frequency.ServiceDay).filter(
                  (day) => frequency.ServiceDay[day] === 1
                )
                days.forEach((day) => {
                  data.frequency[index].serviceDay[day] = 1
                })
              }
            })
            newFrequencys.push(data)
          }
        })
        // 拆分平日與假日 frequency
        const holidayFrequency = newFrequencys.map((item) => ({
          ...item,
          serviceDay: 'holiday',
          frequency: item.frequency.filter(
            (item) =>
              item.serviceDay.Saturday === 1 && item.serviceDay.Sunday === 1
          )
        }))
        this.routeData.Frequencys.holiday = holidayFrequency
        const commonFrequency = newFrequencys.map((item) => ({
          ...item,
          serviceDay: 'common',
          frequency: item.frequency.filter(
            (item) =>
              item.serviceDay.Monday === 1 &&
              item.serviceDay.Tuesday === 1 &&
              item.serviceDay.Wednesday === 1 &&
              item.serviceDay.Thursday === 1 &&
              item.serviceDay.Friday === 1
          )
        }))
        this.routeData.Frequencys.common = commonFrequency
      })
    }
  },
  created () {
    this.emitter.emit('change-navbar-style', this.navbarStyle)
    this.city = this.$route.query.city
    this.routeName = this.$route.query.routeName
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
    height: calc(100vh - 192px);
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
