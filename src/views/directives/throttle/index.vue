<template>
  <div>当前count：{{ count }}</div>

  <el-button class="mt20" v-throttle:click="{ fn: onClick, delay: 1000 }">
    throttle
  </el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let count = ref(0)

const onClick = () => {
  count.value++
}
</script>
<style scoped></style>
