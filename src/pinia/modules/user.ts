import { Cookie } from '@/utils/storage'
import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/user'
import lazyComponent from '@/router/helper'
import Layout from '@/layout/index.vue'
import { RouteRecordRaw } from 'vue-router'
import type { IMenuItem, IUserInfo } from '@/api/type'
import { shallowRef } from 'vue'
import { constantRoutes } from '@/router'

const generateRoutes = (menus: IMenuItem[]) => {
  const routes: RouteRecordRaw[] = []
  menus.forEach((menu) => {
    const component =
      menu?.level === 1
        ? shallowRef(Layout)
        : lazyComponent(`${menu.path}/index.vue`)
    const route: RouteRecordRaw = {
      path: menu.path,
      component,
      meta: {
        title: menu.name,
        icon: menu.icon,
        ...(menu?.meta || {}),
        activeKeys:
          menu?.children && menu?.children?.length > 0
            ? menu?.children?.map((item) => item.path)
            : [],
      },
      sensitive: true,
      strict: true,
      children:
        menu?.children && menu?.children?.length > 0
          ? generateRoutes(menu.children)
          : [],
    }
    if (menu.redirect) {
      route.redirect = menu.redirect
    }
    routes.push(route)
  })
  return routes
}

const generateMenus = (routes: any[], level = 1) => {
  const menus: IMenuItem[] = []
  routes.forEach((route) => {
    const menu: IMenuItem = {
      path: route.path,
      name: route?.meta?.title,
      icon: route?.meta?.icon,
      meta: route.meta,
      level,
      children:
        route?.children && route?.children?.length > 0
          ? generateMenus(route.children, level + 1)
          : [],
    }
    if (route.redirect) {
      menu.redirect = route.redirect
    }
    menus.push(menu)
  })
  return menus
}

export interface IUserStoreState {
  token: string | null
  menus: IMenuItem[]
  accessRoutes: RouteRecordRaw[]
  userInfo: Omit<IUserInfo, 'menus'> | null
  isCollapse: boolean
}

export const useUser = defineStore<string, IUserStoreState>('user', {
  state: () => {
    return {
      token: Cookie.getItem('token'),
      menus: [],
      accessRoutes: [],
      userInfo: null,
      isCollapse: false,
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
      Cookie.setItem('token', token)
    },

    clearToken() {
      this.token = ''
      Cookie.removeItem('token')
    },

    async fetchUserInfo(): Promise<
      Pick<IUserStoreState, 'userInfo' | 'accessRoutes'>
    > {
      const resp = await getUserInfo()
      if (resp?.code === 200) {
        const { menus, ...rest } = resp?.data || {}
        this.userInfo = rest
        // this.menus = menus
        this.menus = [...generateMenus(constantRoutes), ...menus]
        this.accessRoutes = generateRoutes(menus)
        return { userInfo: rest, accessRoutes: this.accessRoutes }
      }
      return { userInfo: null, accessRoutes: [] }
    },

    changeCollapse(v: boolean) {
      this.isCollapse = v
    },
  },
})

export default useUser
