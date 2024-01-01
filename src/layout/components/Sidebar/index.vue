<template>
  <el-scrollbar view-style="height:100%" height="100%">
    <el-menu
      :default-active="activeMenu"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      class="side-menus"
      :collapse="isCollapse"
    >
      <sidebar-item
        v-for="menu in menus"
        :key="menu.path"
        :menu="menu"
      ></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { IMenuItem } from '@/api/type'
import SidebarItem from './SidebarItem.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

defineProps<{ menus: IMenuItem[]; isCollapse: boolean }>()

const route = useRoute()

const activeMenu = computed(() => {
  const defaultActive = route?.redirect || route?.path

  const res = route.matched?.find((item) =>
    item.meta?.activeKeys?.includes(route.path)
  )
  return res?.redirect || res?.path || defaultActive
})
</script>
<style scoped lang="scss">
.side-menus-wrap {
  height: 100%;
}
.side-menus {
  height: 100%;
}
</style>
