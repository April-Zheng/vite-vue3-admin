<template>
  <el-row :gutter="4">
    <el-col :span="12">
      <el-input
        placeholder="firstName"
        v-model="value.firstName"
        @change="(val) => onChange(val, 'firstName')"
      ></el-input>
    </el-col>
    <el-col :span="12">
      <el-input
        placeholder="secondName"
        v-model="value.secondName"
        @change="(val) => onChange(val, 'secondName')"
      ></el-input>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import type { ICustomComponentBaseProps } from '@/components/ProForm/type'
import { ref } from 'vue'
interface IProps extends ICustomComponentBaseProps {
  modelValue: { firstName: string; secondName: string }
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: {
    firstName: '',
    secondName: '',
  },
})
const emit = defineEmits(['update:modelValue'])

const value = ref(props.modelValue)

const onChange = (val, key) => {
  value.value = {
    ...(props.modelValue || {}),
    [key]: val,
  }
  emit('update:modelValue', value.value)
}
</script>
<style scoped></style>
