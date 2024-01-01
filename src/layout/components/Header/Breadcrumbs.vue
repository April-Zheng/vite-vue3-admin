<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      v-for="item in breadcrumbs"
      :key="item.path"
      :to="{ path: item.path }"
    >
      {{ item.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { onBeforeMount, ref } from 'vue'
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
const route = useRoute()
const breadcrumbs = ref<{ title: string; path: string }[]>([])

const getBreadcrumbs = (curRoute: RouteLocationNormalizedLoaded) => {
  return curRoute.matched
    ?.map((item: any) => ({
      title: item?.meta?.title,
      path: item?.path,
    }))
    ?.filter((item: { title: string }) => item.title)
}

onBeforeMount(() => {
  breadcrumbs.value = getBreadcrumbs(route)
})

watch(route, (val) => {
  breadcrumbs.value = getBreadcrumbs(val)
})
</script>
<style scoped></style>
