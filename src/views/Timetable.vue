<template>
  <div class="timetable mb-5">
    <BreadcrumbBar :navbar-style="navbarStyle">
      <template v-slot:searchBar>
        <form class="w-lg-75 mx-auto">
          <div class="container-fluid">
            <p class="fs-6 text-info fw-light mb-2 d-none d-md-block">
              *選擇縣市有助於您更快找到路線
            </p>
            <div class="row">
              <div class="col-md-6 mb-3">
                <div class="form-floating">
                  <select
                    class="form-select h-100"
                    id="citySelect"
                    aria-label="citySelect"
                    :class="{ 'text-muted': !city }"
                    v-model="city"
                  >
                    <option
                      v-for="city in cityData"
                      :key="city.CityCode"
                      :value="city.City"
                      class="text-dark"
                    >
                      {{ city.CityName }}
                    </option>
                  </select>
                  <label class="text-muted" for="citySelect">請選擇縣市</label>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <div class="form-floating">
                  <input
                    type="email"
                    class="form-control"
                    id="routeInput"
                    placeholder="例：紅35"
                    v-model="routeName"
                  />
                  <label class="text-muted" for="routeInput"
                    >請選擇路線或手動輸入關鍵字</label
                  >
                </div>
              </div>
            </div>
          </div>
        </form>
      </template>
    </BreadcrumbBar>
    <div class="data-panel">
      <div class="w-lg-75 mx-auto">
        <div class="container-fluid pt-5">
          <div class="row">
            <div class="col-md-6">
              <div class="search-result rounded-2">
                <div class="card-title mb-0 py-2 bg-primary d-none d-md-block">
                  <h1 class="fs-3 text-center text-white mb-0">搜尋結果</h1>
                </div>
                <div
                  class="
                    card-body
                    d-flex
                    flex-column
                    justify-content-center
                    overflow-auto
                  "
                >
                  <div
                    v-if="!routeName"
                    class="
                      default-img
                      d-flex
                      flex-column
                      justify-content-center
                      align-items-center
                    "
                  >
                    <img
                      src="@/assets/images/signPic_default.png"
                      alt="尋找您的公車路線"
                    />
                    <span class="mt-2 text-secondary">尋找您的公車路線</span>
                  </div>
                  <div v-if="routeName && tempBusRoutes.length" class="h-100">
                    <div
                      v-for="bus in tempBusRoutes"
                      :key="bus.RouteUID"
                      class="route-item"
                    >
                      <h2 class="fs-3 text-danger mb-1">
                        <a
                          href="#"
                          class="stretched-link"
                          @click.prevent="openTimetable(bus.RouteName.Zh_tw)"
                          >{{ bus.RouteName.Zh_tw }}</a
                        >
                      </h2>
                      <span class="fs-7 text-muted"
                        >{{ bus.DepartureStopNameZh
                        }}<i class="fas fa-arrows-alt-h mx-1"></i
                        >{{ bus.DestinationStopNameZh }}</span
                      >
                    </div>
                  </div>
                  <div
                    v-if="!tempBusRoutes.length"
                    class="
                      default-img
                      d-flex
                      flex-column
                      justify-content-center
                      align-items-center
                    "
                  >
                    <img
                      src="../assets/images/signPic_wrong.png"
                      alt="很抱歉，找不到符合的路線"
                    />
                    <span class="mt-2 text-secondary"
                      >很抱歉，找不到符合的路線</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 d-none d-md-block">
              <div class="keyboard rounded-2" @click="keyboardHandler">
                <div class="row g-2">
                  <div class="col mb-2">
                    <button
                      class="btn btn-red w-100"
                      data-action="add"
                      data-value="紅"
                    >
                      紅
                    </button>
                  </div>
                  <div class="col mb-2">
                    <button
                      class="btn btn-blue w-100"
                      data-action="add"
                      data-value="藍"
                    >
                      藍
                    </button>
                  </div>
                  <div class="col mb-2">
                    <button
                      class="btn btn-light w-100"
                      data-action="add"
                      data-value="1"
                    >
                      1
                    </button>
                  </div>
                  <div class="col mb-2">
                    <button
                      class="btn btn-light w-100"
                      data-action="add"
                      data-value="2"
                    >
                      2
                    </button>
                  </div>
                  <div class="col mb-2">
                    <button
                      class="btn btn-light w-100"
                      data-action="add"
                      data-value="3"
                    >
                      3
                    </button>
                  </div>
                </div>
                <div class="row g-2">
                  <div class="col mb-2">
                    <button
                      class="btn btn-brown w-100"
                      data-action="add"
                      data-value="棕"
                    >
                      棕
                    </button>
                  </div>
                  <div class="col mb-2">
                    <button
                      class="btn btn-green w-100"
                      data-action="add"
                      data-value="綠"
                    >
                      綠
                    </button>
                  </div>
                  <div class="col mb-2">
                    <button
                      class="btn btn-light w-100"
                      data-action="add"
                      data-value="4"
                    >
                      4
                    </button>
                  </div>
                  <div class="col mb-2">
                    <button
                      class="btn btn-light w-100"
                      data-action="add"
                      data-value="5"
                    >
                      5
                    </button>
                  </div>
                  <div class="col mb-2">
                    <button
                      class="btn btn-light w-100"
                      data-action="add"
                      data-value="6"
                    >
                      6
                    </button>
                  </div>
                </div>
                <div class="row g-2">
                  <div class="col mb-2">
                    <button
                      class="btn btn-yellow w-100"
                      data-action="add"
                      data-value="黃"
                    >
                      黃
                    </button>
                  </div>
                  <div class="col mb-2">
                    <button
                      class="btn btn-orange w-100"
                      data-action="add"
                      data-value="橘"
                    >
                      橘
                    </button>
                  </div>
                  <div class="col mb-2">
                    <button
                      class="btn btn-light w-100"
                      data-action="add"
                      data-value="7"
                    >
                      7
                    </button>
                  </div>
                  <div class="col mb-2">
                    <button
                      class="btn btn-light w-100"
                      data-action="add"
                      data-value="8"
                    >
                      8
                    </button>
                  </div>
                  <div class="col mb-2">
                    <button
                      class="btn btn-light w-100"
                      data-action="add"
                      data-value="9"
                    >
                      9
                    </button>
                  </div>
                </div>
                <div class="row g-2">
                  <div class="col">
                    <button
                      class="btn btn-outline-primary w-100"
                      data-action="add"
                      data-value="F"
                    >
                      F
                    </button>
                  </div>
                  <div class="col">
                    <button
                      class="btn btn-grey w-100"
                      data-action="add"
                      data-value="幹線"
                    >
                      幹線
                    </button>
                  </div>
                  <div class="col">
                    <button
                      class="btn btn-light w-100"
                      data-action="delete-all"
                    >
                      C
                    </button>
                  </div>
                  <div class="col">
                    <button
                      class="btn btn-light w-100"
                      data-action="add"
                      data-value="0"
                    >
                      0
                    </button>
                  </div>
                  <div class="col">
                    <button
                      class="btn btn-light w-100"
                      data-action="delete-one"
                    >
                      <i class="fas fa-backspace" data-action="delete-one"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="collapse-keyboard d-md-none">
      <button
        class="btn w-100"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#keyboard"
        aria-expanded="false"
        aria-controls="keyboard"
        @click="collapseShow = !collapseShow"
      >
        <i v-if="collapseShow" class="fas fa-caret-down"></i>
        <i v-else class="fas fa-caret-up"></i>
      </button>
      <div
        class="keyboard collapse rounded-2"
        id="keyboard"
        @click="keyboardHandler"
      >
        <div class="row g-2">
          <div class="col mb-2">
            <button class="btn btn-red w-100" data-action="add" data-value="紅">
              紅
            </button>
          </div>
          <div class="col mb-2">
            <button
              class="btn btn-blue w-100"
              data-action="add"
              data-value="藍"
            >
              藍
            </button>
          </div>
          <div class="col mb-2">
            <button
              class="btn btn-light w-100"
              data-action="add"
              data-value="1"
            >
              1
            </button>
          </div>
          <div class="col mb-2">
            <button
              class="btn btn-light w-100"
              data-action="add"
              data-value="2"
            >
              2
            </button>
          </div>
          <div class="col mb-2">
            <button
              class="btn btn-light w-100"
              data-action="add"
              data-value="3"
            >
              3
            </button>
          </div>
        </div>
        <div class="row g-2">
          <div class="col mb-2">
            <button
              class="btn btn-brown w-100"
              data-action="add"
              data-value="棕"
            >
              棕
            </button>
          </div>
          <div class="col mb-2">
            <button
              class="btn btn-green w-100"
              data-action="add"
              data-value="綠"
            >
              綠
            </button>
          </div>
          <div class="col mb-2">
            <button
              class="btn btn-light w-100"
              data-action="add"
              data-value="4"
            >
              4
            </button>
          </div>
          <div class="col mb-2">
            <button
              class="btn btn-light w-100"
              data-action="add"
              data-value="5"
            >
              5
            </button>
          </div>
          <div class="col mb-2">
            <button
              class="btn btn-light w-100"
              data-action="add"
              data-value="6"
            >
              6
            </button>
          </div>
        </div>
        <div class="row g-2">
          <div class="col mb-2">
            <button
              class="btn btn-yellow w-100"
              data-action="add"
              data-value="黃"
            >
              黃
            </button>
          </div>
          <div class="col mb-2">
            <button
              class="btn btn-orange w-100"
              data-action="add"
              data-value="橘"
            >
              橘
            </button>
          </div>
          <div class="col mb-2">
            <button
              class="btn btn-light w-100"
              data-action="add"
              data-value="7"
            >
              7
            </button>
          </div>
          <div class="col mb-2">
            <button
              class="btn btn-light w-100"
              data-action="add"
              data-value="8"
            >
              8
            </button>
          </div>
          <div class="col mb-2">
            <button
              class="btn btn-light w-100"
              data-action="add"
              data-value="9"
            >
              9
            </button>
          </div>
        </div>
        <div class="row g-2">
          <div class="col">
            <button
              class="btn btn-outline-primary w-100"
              data-action="add"
              data-value="F"
            >
              F
            </button>
          </div>
          <div class="col">
            <button
              class="btn btn-grey w-100"
              data-action="add"
              data-value="幹線"
            >
              幹線
            </button>
          </div>
          <div class="col">
            <button class="btn btn-light w-100" data-action="delete-all">
              C
            </button>
          </div>
          <div class="col">
            <button
              class="btn btn-light w-100"
              data-action="add"
              data-value="0"
            >
              0
            </button>
          </div>
          <div class="col">
            <button class="btn btn-light w-100" data-action="delete-one">
              <i class="fas fa-backspace" data-action="delete-one"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <TimetableModal :bus="selectedBus" ref="timetableModal"></TimetableModal>
  </div>
</template>

<script>
import BreadcrumbBar from '@/components/BreadcrumbBar.vue'
import { city } from '@/methods/city'
import getAuthorizationHeader from '@/methods/getAuthorizationHeader'
import TimetableModal from '@/components/TimetableModal.vue'

export default {
  components: { BreadcrumbBar, TimetableModal },
  data () {
    return {
      navbarStyle: 'dark',
      cityData: city,
      city: 'Taipei',
      routeName: '',
      busRoutes: [],
      busTimetables: [],
      selectedBus: {},
      collapseShow: false
    }
  },
  inject: ['emitter'],
  computed: {
    tempBusRoutes () {
      return this.busRoutes.filter((item) =>
        item.RouteName.Zh_tw.includes(this.routeName)
      )
    }
  },
  watch: {
    city () {
      this.getCityBus()
      this.getBusTimetable()
    }
  },
  methods: {
    keyboardHandler (event) {
      if (event.target.dataset.action) {
        switch (event.target.dataset.action) {
          case 'add':
            this.routeName += event.target.dataset.value
            break
          case 'delete-one':
            this.routeName = this.routeName.slice(0, -1)
            break
          case 'delete-all':
            this.routeName = ''
            break
        }
      }
    },
    getCityBus () {
      this.axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/${this.city}?$format=JSON`,
        headers: getAuthorizationHeader()
      }).then((res) => {
        this.busRoutes = res.data
      })
    },
    getBusTimetable () {
      this.axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Bus/Schedule/City/${this.city}?$format=JSON`,
        headers: getAuthorizationHeader()
      }).then((res) => {
        this.busTimetables = res.data
      })
    },
    openTimetable (routeName) {
      this.selectedBus = this.busRoutes.find(
        (item) => item.RouteName.Zh_tw === routeName
      )
      // 整理 timetable (含去回程、子路線、不同站發車)
      this.selectedBus.Timetables = {}
      const timetables = this.busTimetables.filter(
        (item) => item.RouteName.Zh_tw === routeName
      )
      const newTimetables = []
      timetables.forEach((item) => {
        if (item.Timetables) {
          const data = {
            subRouteName: item.SubRouteName.Zh_tw,
            direction: item.Direction,
            timetable: []
          }
          item.Timetables.forEach((timetable) => {
            if (timetable.ServiceDay && timetable.StopTimes) {
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
      // 拆分平日與假日
      const holidayTimetable = newTimetables.map((item) => ({
        ...item,
        serviceDay: 'holiday',
        timetable: item.timetable.filter(
          (item) =>
            item.serviceDay.Saturday === 1 && item.serviceDay.Sunday === 1
        )
      })).filter(item => item.timetable.length)
      this.selectedBus.Timetables.holiday = holidayTimetable
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
      })).filter(item => item.timetable.length)
      this.selectedBus.Timetables.common = commonTimetable
      // 整理 frequency (含去回程、子路線、不同站發車)
      this.selectedBus.Frequencys = {}
      const newFrequencys = []
      timetables.forEach((item) => {
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
      this.selectedBus.Frequencys.holiday = holidayFrequency
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
      this.selectedBus.Frequencys.common = commonFrequency
      this.$refs.timetableModal.show()
    }
  },
  created () {
    this.emitter.emit('change-navbar-style', this.navbarStyle)
    this.getCityBus()
    this.getBusTimetable()
  }
}
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '../assets/style/custom/_variables.scss';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/mixins';
@import '~bootstrap/scss/utilities';

.data-panel {
  margin-top: 220px;
  padding: 0 36px;
  @include media-breakpoint-down(md) {
    padding: 0;
  }
}
.search-result {
  overflow: hidden;
  height: 500px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.15);
  @include media-breakpoint-down(md) {
    box-shadow: none;
    height: calc(100vh - 300px);
  }
}
.route-item {
  border: 1px solid rgba(238, 238, 238, 0.5);
  box-shadow: 0px 4px 10px -1px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  padding: 8px 12px;
  margin-bottom: 16px;
  position: relative;
}
.keyboard {
  padding: 36px 24px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.15);
  @include media-breakpoint-down(md) {
    box-shadow: none;
    padding: 8px 16px;
  }
}
.collapse-keyboard {
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
