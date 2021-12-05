import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/Index.vue')
  },
  {
    path: '/driving-map',
    component: () => import('../views/DrivingMap.vue')
  },
  {
    path: '/driving-map/:busId',
    component: () => import('../views/BusDrivingMap.vue')
  },
  {
    path: '/station',
    component: () => import('../views/Station.vue')
  },
  {
    path: '/timetable',
    component: () => import('../views/Timetable.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
