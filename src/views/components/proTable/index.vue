<template>
  <pro-table :columns="columns" @request="request">
    <template #inspectionType="{ row }">
      {{ row?.inspectionType === 'ELEVATOR' ? '升降梯' : '扶梯' }}
    </template>
  </pro-table>
</template>

<script setup lang="ts">
import { ITableColumn, ProTable } from '@/components'
import { getTableList } from '@/api/components'
import { ref } from 'vue'

const columns = ref<ITableColumn[]>([
  { type: 'selection' } as ITableColumn,
  {
    prop: 'inspectionId',
    label: '工单ID',
    hideInSearch: true,
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
    slot: 'inspectionType',
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

const request = async (params: any, cb: (v: any) => void) => {
  const resp = await getTableList(params)
  cb?.(resp)
}
</script>
<style scoped></style>
