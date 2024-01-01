<template>
  <pro-table :columns="columns" @request="request">
    <template #inspectionType="{ row }">
      {{ row?.inspectionType === 'ELEVATOR' ? '升降梯' : '扶梯' }}
    </template>
  </pro-table>
</template>

<script setup lang="ts">
import { ProTable } from '@/components'
import { getTableList } from '@/api/components'
import { readonly } from 'vue'

const columns = readonly([
  { type: 'selection' },
  {
    prop: 'inspectionId',
    label: '工单ID',
  },
  {
    prop: 'eleContractNo',
    label: '产品合同号',
  },
  {
    prop: 'mntContractNo',
    label: '保养合同号',
  },
  {
    prop: 'customerName',
    label: '客户名称',
  },
  {
    prop: 'inspectionType',
    label: '作业类型',
    slot: 'inspectionType',
  },
  {
    prop: 'userName',
    label: '保养巡视人员',
  },
  {
    prop: 'inspectionDate',
    label: '巡视时间',
  },
  {
    prop: 'orderCode',
    label: '订单状态',
  },
])

const request = async (params, cb) => {
  const resp = await getTableList(params)
  cb?.(resp)
}
</script>
<style scoped></style>
