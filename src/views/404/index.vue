<template>
  <error-page :type="ErrorType.NotFound"></error-page>
</template>

<script setup lang="ts">
import ErrorPage from '@/components/ErrorPage/index.vue'
import { ErrorType } from '@/components/ErrorPage/type'
</script>
<style scoped></style>
