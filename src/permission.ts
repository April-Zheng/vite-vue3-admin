import router from '@/router'
import { useUser } from '@/pinia/modules'
import { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
/**
 * @see https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
 * @see https://router.vuejs.org/zh/guide/advanced/dynamic-routing.html
 * 路由守卫
 * 1、若没有登录则跳转登录
 * 2、在路由守卫中动态添加路由
 */

const WhiteList = ['login']

router.beforeEach(async (to) => {
  const userStore = useUser()
  NProgress.start()
  if (WhiteList.includes(to?.name as string)) {
    return true
  }
  if (!userStore.token) {
    return { name: 'login', query: { redirect: to.fullPath } }
  } else {
    if (!userStore.userInfo) {
      const { accessRoutes } = await userStore.fetchUserInfo()
      if (accessRoutes?.length) {
        accessRoutes.forEach((route: RouteRecordRaw) => router.addRoute(route))
      }
      // 解决页面刷新404问题
      return to.fullPath
    }
    return true
  }
})

router.afterEach((to) => {
  NProgress?.done()
  if (to?.meta?.title) {
    document.title = to?.meta?.title as string
  }
})
