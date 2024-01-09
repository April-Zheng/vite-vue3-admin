<template>
  <div class="mb20">
    <query-filter
      label-width="150px"
      :fields="fields.slice(0, 5)"
      @submit="onSubmit"
    >
    </query-filter>
  </div>
  <div class="mb20">
    <query-filter
      label-width="150px"
      :fields="fields"
      :default-cols-number="6"
      @submit="onSubmit"
    >
    </query-filter>
  </div>
  <div>
    <query-filter
      :defalut-collapsed="false"
      :submitter-col-size="{ span: 12 }"
      label-width="150px"
      :fields="fields"
      @submit="onSubmit"
      @onCollapseChange="onCollapseChange"
    >
    </query-filter>
  </div>
</template>

<script setup lang="ts">
import { QueryFilter } from '@/components'
import { reactive } from 'vue'

let fields = reactive([
  {
    label: '姓名',
    prop: 'name',
    type: 'input',
  },
  {
    label: '地址',
    prop: 'address',
    type: 'input',
  },
  {
    label: '工作',
    prop: 'job',
    type: 'input',
  },
  {
    label: '性别',
    prop: 'gender',
    type: 'select',
    fieldProps: {
      options: [
        { label: '男', value: 0 },
        { label: '女', value: 1 },
      ],
    },
  },
  {
    label: '出生日期',
    prop: 'date',
    type: 'datePicker',
    fieldProps: {
      type: 'date',
      clearable: true,
    },
  },
  {
    label: '日期时间',
    prop: 'dateTime',
    type: 'datePicker',
    fieldProps: {
      type: 'datetime',
      clearable: true,
      format: 'YYYY-MM-DD HH:mm:ss',
    },
  },
])

const onSubmit = (values) => {
  console.log('QueryFilter=====onSubmit===>', values)
}
const onCollapseChange = (v) => {
  console.log('onCollapseChange==>', v)
}
</script>
<style scoped>
.mb20 {
  margin-bottom: 20px;
}
</style>
