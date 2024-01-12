<template>
  <el-icon
    v-if="globalProperties?.$Icons?.[icon]"
    v-bind="$attrs"
    :size="size"
    :color="color"
  >
    <component :is="globalProperties?.$Icons?.[icon]"></component
  ></el-icon>
  <slot v-else>
    <img v-bind="$attrs" :src="icon" />
  </slot>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'

defineProps<{
  icon: string
  size?: number | string
  color?: string
}>()
const {
  appContext: {
    config: { globalProperties },
  },
} = getCurrentInstance() || { appContext: { config: {} } }
</script>
<style scoped></style>
