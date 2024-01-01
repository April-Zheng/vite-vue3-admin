<template>
  <el-input v-if="type === 'input'" v-bind="fieldProps"></el-input>
  <el-input-number
    v-else-if="type === 'inputNumber'"
    v-bind="fieldProps"
  ></el-input-number>
  <el-select v-else-if="type === 'select'" v-bind="fieldProps">
    <el-option
      v-for="opt in fieldProps?.options"
      :key="opt.value"
      :label="opt.label"
      :value="opt.value"
    />
  </el-select>
  <el-radio-group v-else-if="type === 'radio'" v-bind="fieldProps">
    <el-radio
      v-for="opt in fieldProps?.options"
      :key="opt.value"
      :label="opt.value"
    >
      {{ opt.label }}
    </el-radio>
  </el-radio-group>
  <el-checkbox-group v-else-if="type === 'checkbox'" v-bind="fieldProps">
    <el-checkbox
      v-for="opt in fieldProps?.options"
      :key="opt.value"
      :label="opt.value"
    >
      {{ opt.label }}
    </el-checkbox>
  </el-checkbox-group>
  <el-date-picker v-else-if="type === 'datePicker'" v-bind="fieldProps">
  </el-date-picker>
  <el-switch v-else-if="type === 'switch'" v-bind="fieldProps"></el-switch>
</template>

<script setup lang="ts">
import type { IField } from './type'

defineProps<{
  type: IField['type']
  fieldProps?: IField['fieldProps']
}>()
</script>
<style scoped></style>
