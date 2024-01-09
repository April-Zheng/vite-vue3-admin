<template>
  <el-tabs v-model="activeTab" @tab-change="onChangeTab">
    <el-tab-pane label="ProForm基础表单" name="1">
      <pro-form
        :submitter="{ actions: ['ok'] }"
        label-width="150px"
        :rules="rules"
        :fields="fields"
        @request="fetchFormDetail"
        @submit="onSubmit"
      >
      </pro-form>
    </el-tab-pane>
    <el-tab-pane label="ProForm自定义表单按钮" name="2">
      <pro-form label-width="150px" :rules="rules" :fields="fields">
        <template #submitter="{ formValues, formRef }">
          <el-button type="primary" @click="formBtnAction(formValues, formRef)"
            >自定义按钮</el-button
          >
        </template>
      </pro-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ProForm } from '@/components'
import CustomComponet from './customComponet.vue'
import { getTableList, getFormDetail } from '@/api/components'
import { ref, reactive, onMounted, readonly, shallowRef } from 'vue'

let activeTab = ref('1')

let fields = reactive([
  {
    label: 'Activity name',
    prop: 'name',
    type: 'input',
    required: true,
    span: 8,
  },
  {
    label: 'InspectionId',
    prop: 'inspectionId',
    type: 'select',
    fieldProps: {
      options: [],
    },
    span: 8,
  },
  {
    label: 'Activity type',
    prop: 'type',
    type: 'checkbox',
    fieldProps: {
      options: [
        {
          label: 'Online activities',
          value: '1',
        },
        {
          label: 'Promotion activities',
          value: '2',
        },
        {
          label: 'Offline activities',
          value: '3',
        },
        {
          label: 'Simple brand exposure',
          value: '4',
        },
      ],
    },
  },
  {
    label: 'Resources',
    prop: 'resource',
    type: 'radio',
    fieldProps: {
      options: [
        {
          label: 'Sponsor',
          value: '1',
        },
        {
          label: 'Venue',
          value: '2',
        },
      ],
    },
  },
  {
    label: 'Date',
    prop: 'date',
    type: 'datePicker',
    fieldProps: {
      type: 'date',
      clearable: true,
    },
  },
  {
    label: 'Date Time',
    prop: 'dateTime',
    type: 'datePicker',
    fieldProps: {
      type: 'datetime',
      clearable: true,
      format: 'YYYY-MM-DD HH:mm:ss',
    },
  },
  {
    label: 'Desc',
    prop: 'desc',
    type: 'input',
    fieldProps: {
      type: 'textarea',
    },
  },
  {
    label: 'custom component',
    prop: 'custom',
    component: shallowRef(CustomComponet),
  },
])

const rules = readonly({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  count: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  dateTime: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  resource: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  desc: [
    { required: true, message: 'Please input activity form', trigger: 'blur' },
  ],
})

const onChangeTab = (tab) => (activeTab.value = tab)

const formBtnAction = (values, instance) => {
  console.log(values, instance)
}

const onSubmit = (values) => {
  console.log('onSubmit===>', values)
}

// 动态请求select数据
const fetchList = async () => {
  const resp = await getTableList({})
  if (resp.code === 200) {
    fields = fields.map((item) => {
      if (item.prop === 'inspectionId') {
        item.fieldProps.options = resp?.data?.list?.map((item) => ({
          label: item.customerName,
          value: item.inspectionId,
        }))
      }
      return item
    })
  }
}

const fetchFormDetail = async (cb) => {
  const resp = await getFormDetail()
  if (resp.code === 200) {
    cb(resp.data)
  }
}

onMounted(() => {
  fetchList()
})
</script>
<style scoped></style>
