<template>
  <div
    class="modal fade"
    id="timetableModal"
    tabindex="-1"
    aria-labelledby="timetableModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h1
            v-if="bus.RouteName"
            class="fs-3 modal-title text-white"
            id="timetableModalLabel"
          >
            {{ bus.RouteName.Zh_tw }} - 公車路線資訊
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-5">
            <h2 class="fs-4 text-danger">起訖站</h2>
            <span
              >起點：{{ bus.DepartureStopNameZh }} ({{
                bus.DepartureStopNameEn
              }})</span
            >
            <br />
            <span
              >終點：{{ bus.DestinationStopNameZh }} ({{
                bus.DestinationStopNameEn
              }})</span
            >
            <br />
            <a
              v-if="bus.RouteMapImageUrl"
              :href="bus.RouteMapImageUrl"
              class="text-decoration-underline text-primary"
              target="_blank"
              >開啟路線圖</a
            >
          </div>
          <div
            v-if="bus.Frequencys && bus.Frequencys.common.length"
            class="mb-5"
          >
            <h2 class="fs-4 text-danger">平日發車間距</h2>
            <div
              v-for="(frequency, i) in bus.Frequencys.common"
              :key="frequency.subRouteName + i"
              class="mb-2"
            >
              <template
                v-if="
                  bus.Frequencys.common.length > 1 && frequency.frequency.length
                "
              >
                <span>{{ frequency.subRouteName }}：</span>
                <br />
              </template>
              <template v-for="(frequency, i) in frequency.frequency" :key="i">
                <span
                  >{{ frequency.timePeriod }}， 每
                  {{ frequency.minHeadwayMins }} -
                  {{ frequency.maxHeadwayMins }} 分一班車</span
                >
                <br />
              </template>
            </div>
          </div>
          <div
            v-if="bus.Frequencys && bus.Frequencys.common.length"
            class="mb-5"
          >
            <h2 class="fs-4 text-danger">假日發車間距</h2>
            <div
              v-for="(frequency, i) in bus.Frequencys.holiday"
              :key="frequency.subRouteName + i"
              class="mb-2"
            >
              <template
                v-if="
                  bus.Frequencys.holiday.length > 1 &&
                  frequency.frequency.length
                "
              >
                <span>{{ frequency.subRouteName }}：</span>
                <br />
              </template>
              <template v-for="(frequency, i) in frequency.frequency" :key="i">
                <span
                  >{{ frequency.timePeriod }}，每
                  {{ frequency.minHeadwayMins }} -
                  {{ frequency.maxHeadwayMins }} 分一班車</span
                >
                <br />
              </template>
            </div>
          </div>
          <div
            v-if="bus.Timetables && bus.Timetables.common.length"
            class="mb-5"
          >
            <h2 class="fs-4 text-danger">平日時刻表</h2>
            <div
              v-for="(timetable, i) in bus.Timetables.common"
              :key="timetable.subRouteName + i"
              class="mb-2"
            >
              <span v-if="timetable.timetable.length"
                >{{ timetable.subRouteName }}
                <span v-if="directionTransform(timetable.direction)">
                  - {{ directionTransform(timetable.direction) }}</span
                >：
              </span>
              <template v-if="timetable.timetable.length">
                <br />
                <span v-for="(timetable, i) in timetable.timetable" :key="i"
                  ><span v-if="i !== 0"> | </span>{{ timetable.departureTime }}
                </span>
              </template>
            </div>
          </div>
          <div
            v-if="bus.Timetables && bus.Timetables.holiday.length"
            class="mb-5"
          >
            <h2 class="fs-4 text-danger">假日時刻表</h2>
            <div
              v-for="(timetable, i) in bus.Timetables.holiday"
              :key="timetable.subRouteName + i"
              class="mb-2"
            >
              <span v-if="bus.Timetables.holiday.length"
                >{{ timetable.subRouteName }}
                <span v-if="directionTransform(timetable.direction)">
                  - {{ directionTransform(timetable.direction) }}</span
                >
                ：
              </span>
              <template v-if="timetable.timetable.length">
                <br />
                <span v-for="(timetable, i) in timetable.timetable" :key="i"
                  ><span v-if="i !== 0"> | </span>{{ timetable.departureTime }}
                </span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: {
    bus: {
      type: Object,
      default: undefined
    }
  },
  data () {
    return {
      modal: {}
    }
  },
  methods: {
    show () {
      this.modal.show()
    },
    hide () {
      this.modal.hide()
    },
    directionTransform (num) {
      if (num === 0) {
        return `${this.bus.DepartureStopNameZh}發車`
      } else if (num === 1) {
        return `${this.bus.DestinationStopNameZh}發車`
      } else if (num === 2) {
        return '迴圈'
      } else {
        return ''
      }
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.modal)
  }
}
</script>
