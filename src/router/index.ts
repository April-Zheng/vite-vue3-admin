import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import lazyComponent from './helper'
import Layout from '@/layout/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: lazyComponent('HelloWorld/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: lazyComponent('Login/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

export default router
