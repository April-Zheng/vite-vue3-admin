import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import lazyComponent from './helper'
import Layout from '@/layout/index.vue'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      icon: 'House',
      title: '工作台',
    },
    children: [
      {
        path: '/dashboard',
        component: lazyComponent('dashboard/index.vue'),
        meta: { hidden: true },
      },
    ],
  },
]

export const routes: RouteRecordRaw[] = [
  ...constantRoutes,
  {
    path: '/login',
    name: 'login',
    component: lazyComponent('login/index.vue'),
    meta: { hidden: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: lazyComponent('404/index.vue'),
    meta: { hidden: true },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

export default router
