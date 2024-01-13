<template>
  <el-form-item v-bind="field" :name="field.prop" :rules="rules">
    <component v-if="field.component" :is="field.component" v-bind="$attrs" />
    <Field
      v-else
      :type="field.type"
      :fieldProps="field?.fieldProps || {}"
      v-bind="$attrs"
    ></Field>
  </el-form-item>
</template>

<script setup lang="ts">
import Field from './Field.vue'
import { defineProps } from 'vue'
import type { IField } from './type'
import type { FormRules } from 'element-plus'
defineProps<{ field: IField; rules?: FormRules }>()
</script>
<style scoped></style>
