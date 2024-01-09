<template>
  <component v-if="field.component" :is="field.component" v-bind="$attrs" />

  <Field
    v-else
    :type="field.type"
    :fieldProps="field?.fieldProps || {}"
    v-bind="$attrs"
  ></Field>
</template>

<script setup lang="ts">
import Field from './Field.vue'
import { defineProps } from 'vue'
import type { IField } from './type'
defineProps<{ field: IField }>()
</script>
<style scoped></style>
