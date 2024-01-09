<template>
  <error-page :type="ErrorType.PageError" :desc="(errMsg as string)">
    <template #actions>
      <el-space>
        <el-button type="primary" @click="onBack">返回首页</el-button>
        <el-button type="primary" @click="onReload">重新加载</el-button>
      </el-space>
    </template>
  </error-page>
</template>

<script setup lang="ts">
import ErrorPage from '../ErrorPage/index.vue'
import { ErrorType } from '../ErrorPage/type'
import { useRouter } from 'vue-router'
import { onErrorCaptured, ref } from 'vue'

const router = useRouter()

let errMsg = ref('')

const setErrorMsg = (error: Error) => {
  if (error.message) {
    errMsg.value = error.message
  }
}

onErrorCaptured((error, instance, info) => {
  console.error('onErrorCaptured==>', error, instance, info)
  setErrorMsg(error)
  return false
})

const onBack = () => {
  router.push('/')
}

const onReload = () => {
  router.replace(router.currentRoute.value.fullPath)
}
</script>
<style scoped></style>
