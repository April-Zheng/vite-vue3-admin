<template>
  <div v-if="hasError">
    <error-page :type="ErrorType.PageError" :desc="errMsg"></error-page>
  </div>
  <slot v-else></slot>
</template>

<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'
import ErrorPage from '../ErrorPage/index.vue'
import { ErrorType } from '../ErrorPage/type'

const hasError = ref(false)
const errMsg = ref('')

onErrorCaptured((error: Error) => {
  hasError.value = true
  errMsg.value = error.message
  console.error('onErrorCaptured==>', error)
  return false
})
</script>
<style scoped></style>
