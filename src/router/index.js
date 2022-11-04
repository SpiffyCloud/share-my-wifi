import { createRouter, createWebHistory } from 'vue-router'
import WifiDetailsView from '@/views/WifiDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'WiFiDetails',
        params: { index: 0 }
      }
    },
    {
      name: 'WiFiDetails',
      path: '/credentials/:index',
      component: WifiDetailsView,
      props: true
    },
    {
      name: 'WiFiList',
      path: '/credentials',
      component: () => import('@/views/WifiListView.vue')
    }
  ]
})

export default router