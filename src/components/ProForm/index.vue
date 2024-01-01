<template>
  <el-form
    v-loading="loading"
    :model="formValues"
    ref="formRef"
    v-bind="config"
  >
    <el-form-item
      v-for="field in fields"
      v-bind="field"
      :key="field.prop"
      :name="field.prop"
    >
      <component
        v-if="field.component"
        :is="field.component"
        :formValues="formValues"
        :formRef="formRef"
        v-model="formValues[field.prop]"
      />

      <Field
        v-else
        :type="field.type"
        :fieldProps="field?.fieldProps || {}"
        v-model="formValues[field.prop]"
      ></Field>
    </el-form-item>
    <el-form-item v-if="mergeSubmitter || $slots.submitter">
      <slot name="submitter" :formValues="formValues" :formRef="formRef">
        <el-button
          v-if="(mergeSubmitter  as IFormSubmitter)?.actions.includes('ok')"
          type="primary"
          v-bind="(mergeSubmitter  as IFormSubmitter)?.okProps"
          @click="onSubmit(formRef)"
        >
          {{ (mergeSubmitter as IFormSubmitter)?.okText }}
        </el-button>
        <el-button
          v-if="(mergeSubmitter  as IFormSubmitter)?.actions.includes('cancel')"
          type="info"
          v-bind="(mergeSubmitter  as IFormSubmitter)?.cancelProps"
          @click="onReset(formRef)"
        >
          {{ (mergeSubmitter as IFormSubmitter)?.cancelText }}
        </el-button>
      </slot>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" generic="T=Record<string,any>">
import { defineProps, ref, onMounted, readonly, computed } from 'vue'
import type { FormInstance } from 'element-plus'
import Field from './Field.vue'
import { IProps, IFormSubmitter } from './type'

const defaultSumitter = readonly({
  actions: ['ok', 'cancel'],
  okText: '提交',
  cancelText: '取消',
  okProps: {},
  cancelProps: {},
})

const props = defineProps<IProps<T>>()

const emit = defineEmits<{
  (e: 'submit', params: any): void
  (e: 'reset'): void
  // 获取表单初始值
  (e: 'request', cb: (resp: any) => any): void
}>()

const mergeSubmitter = computed(() =>
  typeof props.submitter === 'boolean'
    ? props.submitter
    : {
        ...defaultSumitter,
        ...props.submitter,
      }
)

const formRef = ref<FormInstance>()

let formValues = ref<Record<string, any>>(props.model || {})

const loading = ref(false)

const request = () => {
  loading.value = true
  try {
    emit('request', (values) => {
      formValues.value = values
      loading.value = false
    })
  } finally {
    loading.value = false
  }
}

const onSubmit = (el: FormInstance | undefined) => {
  if (!el) return
  el.validate((valid) => {
    if (valid) {
      emit('submit', formValues.value)
    } else {
      return false
    }
  })
}

const onReset = (el: FormInstance | undefined) => {
  if (!el) return
  el.resetFields()
  emit('reset')
}

onMounted(() => {
  request?.()
})
</script>
<style scoped></style>
