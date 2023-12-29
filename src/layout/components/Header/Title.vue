<template>
  <div class="title-wrap">
    <img class="logo" :src="logo" />
    <div class="title">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
import LogoSVG from '/vite.svg'
import { withDefaults } from 'vue'

interface Props {
  logo?: string,
  title?: string
}

withDefaults(defineProps<Props>(), {
  logo: LogoSVG,
  title: "vue3-element-admin"
})

</script>
<style scoped lang="scss">
.title-wrap {
  display: flex;
  width: 100%;
  align-items: center;
  height: 56px;

  .logo {
    width: 36px;
    height: 36px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    margin-left: 20px;
  }
}
</style>