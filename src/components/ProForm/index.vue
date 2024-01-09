<template>
  <el-form
    v-loading="loading"
    :model="formValues"
    ref="formRef"
    v-bind="config"
  >
    <template v-if="config?.inline">
      <el-form-item
        v-for="field in fields"
        v-bind="field"
        :key="field.prop"
        :name="field.prop"
      >
        <form-item
          :field="field"
          :formValues="formValues"
          :formRef="formRef"
          v-model="formValues[field.prop]"
        >
        </form-item>
      </el-form-item>
      <el-form-item v-if="submitter || $slots.submitter">
        <slot name="submitter" :formValues="formValues" :formRef="formRef">
          <form-submitter
            v-bind="submitter"
            @submit="onSubmit"
            @reset="onReset"
          ></form-submitter>
        </slot>
      </el-form-item>
    </template>
    <template v-else>
      <el-row>
        <el-col
          v-for="field in fields"
          :key="field.prop"
          v-bind="field.colSize || colSize"
          :hidden="field.hidden"
        >
          <el-form-item v-bind="field" :name="field.prop">
            <form-item
              :field="field"
              :formValues="formValues"
              :formRef="formRef"
              v-model="formValues[field.prop]"
            >
            </form-item>
          </el-form-item>
        </el-col>
        <el-col
          v-if="submitter || $slots.submitter"
          v-bind="submitterColSize || colSize"
          :style="submitterStyle"
        >
          <el-form-item>
            <slot name="submitter" :formValues="formValues" :formRef="formRef">
              <form-submitter
                v-bind="submitter"
                @submit="onSubmit"
                @reset="onReset"
              ></form-submitter>
            </slot>
          </el-form-item>
        </el-col>
      </el-row>
    </template>
  </el-form>
</template>

<script setup lang="ts" generic="T extends Record<string,any>">
import { defineProps, ref, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import FormItem from './FormItem.vue'
import FormSubmitter from './Submitter.vue'
import { IFormProps, IFormEmits, IFormExpose } from './type'

//TODO: row的gutter和col的hidden属性冲突了，设置gutter，hidden就不生效

const props = withDefaults(defineProps<IFormProps<T>>(), {
  // @ts-ignore
  colSize: { span: 24 },
})

const emit = defineEmits<IFormEmits>()

const formRef = ref<FormInstance>()

let formValues = ref<T>((props.model || {}) as T)

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

const onSubmit = () => {
  if (!formRef.value) return
  formRef.value.validate((valid) => {
    if (valid) {
      emit('submit', formValues.value)
    } else {
      return false
    }
  })
}

const onReset = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
  emit('reset')
}

onMounted(() => {
  request?.()
})

defineExpose<IFormExpose<T>>({
  onSubmit,
  onReset,
  // @ts-ignore
  formValues: formValues.value,
  ...(formRef.value || {}),
})
</script>
<style scoped lang="scss"></style>
