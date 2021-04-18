import { createRouter, createWebHistory } from 'vue-router'
import Backpacks from '@/views/Backpacks'
import MessengerBags from '@/views/MessengerBags'
import BusinessBags from '@/views/BusinessBags'

const routes = [
  {
    path: '/backpacks',
    name: 'Backpacks',
    component: Backpacks,
    alias: '/'
  },
  {
    path: '/messengerBags',
    name: 'MessengerBags',
    component: MessengerBags
  },
  {
    path: '/businessBags',
    name: 'BusinessBags',
    component: BusinessBags
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'active-link',
  linkActiveClass: 'active-link'
})

export default router
