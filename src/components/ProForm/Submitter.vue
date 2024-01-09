<template>
  <el-button
    v-if="mergeProps?.actions?.includes('ok')"
    type="primary"
    v-bind="mergeProps?.okProps"
    @click="$emit('submit')"
  >
    {{ mergeProps?.okText }}
  </el-button>
  <el-button
    v-if="mergeProps?.actions?.includes('cancel')"
    type="info"
    v-bind="mergeProps?.cancelProps"
    @click="$emit('reset')"
  >
    {{ mergeProps?.cancelText }}
  </el-button>
</template>

<script setup lang="ts">
import { defineProps, readonly, computed } from 'vue'
import { IFormSubmitter } from './type'
import { omitUndefined } from './helper'

const defaultSumitter = readonly({
  actions: ['ok', 'cancel'],
  okText: '提交',
  cancelText: '取消',
  okProps: {},
  cancelProps: {},
})

const props = defineProps<IFormSubmitter>()

defineEmits(['submit', 'reset'])

const mergeProps = computed(() => ({
  ...defaultSumitter,
  ...(omitUndefined(props) || {}),
}))
</script>
