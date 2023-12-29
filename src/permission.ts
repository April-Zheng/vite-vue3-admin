import router from '@/router'
import { useUser } from '@/pinia/modules'

/**
 * @see https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
 * 路由守卫
 * 1、若没有登录则跳转登录
 */
router.beforeEach((to, from) => {
  const token = useUser().token

  if (!token && to.name !== 'login') {
    return { name: 'login' }
  } else {
    return true
  }
})
