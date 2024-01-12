<template>
  <el-menu-item
    v-if="!childMenus?.length"
    :index="menu.redirect || menu.path"
    @click="navigateTo(menu)"
  >
    <Icon v-if="menu.icon" :icon="menu.icon"></Icon>
    <span>{{ menu.name }}</span>
  </el-menu-item>
  <el-sub-menu v-else-if="childMenus?.length > 0" :index="menu.path">
    <template #title>
      <Icon v-if="menu.icon" :icon="menu.icon"></Icon>
      <span>{{ menu.name }}</span>
    </template>
    <sidebar-item
      v-for="child in childMenus"
      :menu="child"
      :key="child.path"
    ></sidebar-item>
  </el-sub-menu>
</template>

<script setup lang="ts" name="SidebarItem">
import { IMenuItem } from '@/api/type'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '@/components/Icon/index.vue'

const props = defineProps<{ menu: IMenuItem }>()

const childMenus = computed<IMenuItem[]>(
  () =>
    props.menu?.children?.filter((item: IMenuItem) => !item?.meta?.hidden) || []
)

const router = useRouter()

const navigateTo = (v: IMenuItem) => router.push(v.path)
</script>
<style scoped></style>
