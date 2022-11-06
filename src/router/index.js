import { createRouter, createWebHistory } from 'vue-router'
import WifiDetailsView from '@/views/WifiDetailsView.vue'
import WifiListView from '@/views/WifiListView.vue'

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
      props: true,
      meta: {
        transition: 'push-left'
      }
    },
    {
      name: 'WiFiList',
      path: '/credentials',
      component: WifiListView,
      meta: {
        transition: 'push-right'
      }
    }
  ]
})

export default router