<template>
  <img v-if="icon.startsWith('http')" :src="currentIcon" />
  <el-icon :size="size" :color="color" v-else>
    <component :is="currentIcon"></component
  ></el-icon>
</template>

<script setup lang="ts">
import { watch, getCurrentInstance, computed } from 'vue'

const props = defineProps<{
  icon: string
  size?: number | string
  color?: string
}>()
const {
  appContext: {
    config: { globalProperties },
  },
} = getCurrentInstance()

const transformIcon = (value: string) => {
  if (value.startsWith('http')) {
    return value
  } else {
    return globalProperties?.$Icons?.[value]
  }
}

const currentIcon = computed({
  get: () => transformIcon(props.icon),
  set: (value) => transformIcon(value as string),
})

watch(
  () => props.icon,
  (value) => {
    currentIcon.value = value
  }
)
</script>
<style scoped></style>
