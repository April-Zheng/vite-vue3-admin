<template>
  <el-alert title="录入结构化的数组数据"></el-alert>
  <el-form :model="formValues" :rules="rules" ref="formRef">
    <pro-form-list
      prop="labels"
      label="字段信息"
      :fields="fields"
      :rules="listRules"
      v-model="formValues.labels"
    >
    </pro-form-list>
    <pro-form-list
      prop="guards"
      label="行为守卫"
      :fields="fields"
      :actionGuard="actionGuard"
      v-model="formValues.guards"
      tooltip="通过传入的actionGuard行为守卫拦截新增删除操作"
    >
    </pro-form-list>
    <pro-form-list
      prop="users"
      label="阻止默认事件"
      :fields="fields"
      :copyProps="{
        preventDefault: true,
      }"
      :deleteProps="{
        preventDefault: true,
      }"
      @copy="onCopy"
      @delete="onDelete"
      v-model="formValues.users"
      tooltip="通过对应按钮的props.preventDefault阻止组件内部事件，由外部使用组件时处理"
    >
    </pro-form-list>
    <el-button @click="onSubmit">获取表单数据</el-button>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ProFormList } from '@/components'

const formValues = ref({ labels: [], users: [], guards: [] })
const formRef = ref()
const fields = [
  {
    label: '键名',
    prop: 'key',
    type: 'input',
  },
  {
    label: '值',
    prop: 'value',
    type: 'input',
  },
]

const rules = {
  labels: [{ required: true, message: '请输入字段信息' }],
}
const listRules = { key: [{ required: true, message: '请输入键名' }] }

const actionGuard = {
  beforeAddRow: (record: any, insertIndex: number): Promise<boolean> => {
    return new Promise((resolve) => {
      console.log('beforeAddRow==>', record, insertIndex)
      setTimeout(() => resolve(true), 1000)
    })
  },
  beforeDeleteRow: (_record, deleteIndex: number): Promise<boolean> => {
    return new Promise((resolve) => {
      console.log('beforeRemove==>', _record, deleteIndex)
      if (deleteIndex === 0) {
        ElMessage.error('这行不能删')
        resolve(false)
        return
      }
      setTimeout(() => resolve(true), 1000)
    })
  },
}

const onSubmit = () => {
  console.log(formValues.value)
  formRef.value!.validate((isValid, errors) => {
    console.log(isValid, errors)
  })
}

const onCopy = (index, record) => {
  console.log('onCopy====>', index, record)
  ElMessage.warning('外部组件自己实现')
}

const onDelete = (index, record) => {
  console.log('onDelete====>', index, record)
  ElMessage.warning('外部组件自己实现')
}
</script>
<style scoped></style>
