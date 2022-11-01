import { createRouter, createWebHistory } from 'vue-router'
import WifiDetailsView from '@/views/WifiDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'WiFiDetails',
      path: '/',
      component: WifiDetailsView
    },
    {
      name: 'WiFiList',
      path: '/list',
      component: () => import('@/views/WifiListView.vue')
    }
  ]
})

export default router