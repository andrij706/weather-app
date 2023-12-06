import { createRouter, createWebHistory } from 'vue-router'
import AddCity from '../views/AddCity.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AddCity',
      component: AddCity
    }
  ]
})

export default router
