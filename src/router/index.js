import { createRouter, createWebHistory } from 'vue-router'
import AddCity from '../views/AddCity.vue'
import Weather from '../views/Weather.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AddCity',
      component: AddCity
    },
    {
      path: '/weather/:city',
      name: 'Weather',
      component: Weather
    }
  ]
})

export default router
