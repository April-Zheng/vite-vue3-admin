<template>
  <el-tabs v-model="activeTab" @tab-change="onChangeTab">
    <el-tab-pane label="可编辑表格" name="1">
      <editable-pro-table
        ref="tableRef"
        :columns="columns"
        :stripe="true"
        :operation="{
          actions: ['ok', 'edit', 'cancel', 'delete'],
        }"
        :creatorProps="false"
        :searchable="false"
        :rules="rules"
        @request="request"
      >
      </editable-pro-table>
    </el-tab-pane>
    <el-tab-pane label="嵌套表单的可编辑表格" name="2">
      <el-form :model="formValues" ref="formRef" :rules="formRules">
        <el-form-item label="名称">
          <el-input v-model="formValues.name" />
        </el-form-item>
        <el-form-item prop="list" label="列表数据">
          <field-editable-pro-table
            ref="editableTableRef"
            :columns="columns"
            :stripe="true"
            :operation="{
              actions: ['ok', 'edit', 'cancel', 'delete'],
            }"
            :page-config="false"
            :creatorProps="{ defaultRecord } as any"
            :searchable="false"
            :rules="rules"
            v-model="formValues.list"
          >
          </field-editable-pro-table>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit(formRef)">提交</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import type { ITableColumn } from '@/components/ProTable/type'
import { EditableProTable, FieldEditableProTable } from '@/components'
import { ref } from 'vue'
import { getTableList } from '@/api/components'

const tableRef = ref()
const formRef = ref()
const editableTableRef = ref()

let activeTab = ref('1')
const onChangeTab = (tab: string) => (activeTab.value = tab)

const rules = ref({
  userName: [
    { required: true, message: '请输入工单客户名称', trigger: 'blur' },
  ],
})

const formRules = {
  list: [{ required: true, message: '列表数据不能为空', trigger: 'blur' }],
}

const columns = ref<ITableColumn[]>([
  {
    prop: 'inspectionId',
    label: '工单ID',
    hideInSearch: true,
    type: 'input',
  },
  {
    prop: 'eleContractNo',
    label: '产品合同号',
    type: 'input',
  },
  {
    prop: 'mntContractNo',
    label: '保养合同号',
    type: 'input',
  },
  {
    prop: 'customerName',
    label: '客户名称',
    type: 'input',
  },
  {
    prop: 'inspectionType',
    label: '作业类型',
    type: 'select',
    fieldProps: {
      options: [
        { label: '升降梯', value: 'ELEVATOR' },
        { label: '扶梯', value: 'ESCALATOR' },
      ],
    },
  },
  {
    prop: 'userName',
    label: '保养巡视人员',
    type: 'input',
  },
  {
    prop: 'inspectionDate',
    label: '巡视时间',
    type: 'datePicker',
  },
  {
    prop: 'orderCode',
    label: '订单状态',
    type: 'select',
    fieldProps: {
      options: [
        'INITIATED',
        'CHANGE_REQUEST',
        'INSPECTION_AUDIT',
        'COMPLETE',
      ].map((item) => ({ label: item, value: item })),
    },
  },
])

const formValues = ref({ list: [], name: '' })

const submit = (formRef) => {
  formRef.validate((isValid) => {
    console.log('submit===>', formValues.value, isValid)
  })
}

const defaultRecord = {
  inspectionType: 'ELEVATOR',
  orderCode: 'INITIATED',
  inspectionDate: new Date().toLocaleDateString(),
}

const request = async (params: any, cb: (v: any) => void) => {
  const resp = await getTableList(params)
  cb?.(resp)
}
</script>
<style scoped></style>
