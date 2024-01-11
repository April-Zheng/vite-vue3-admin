<template>
  <pro-table
    ref="tableRef"
    row-key="inspectionId"
    :columns="columns"
    :stripe="true"
    @request="request"
    @selection-change="handleTableEvent"
    @sort-change="handleTableEvent"
  >
    <template #inspectionType="{ row }">
      {{ row?.inspectionType === 'ELEVATOR' ? '升降梯' : '扶梯' }}
    </template>
  </pro-table>
</template>

<script setup lang="ts">
import { ITableColumn, ProTable } from '@/components'
import { getTableList } from '@/api/components'
import { ref, onMounted, nextTick } from 'vue'
import { TableColumnCtx } from 'element-plus'

const types = [
  { label: '升降梯', value: 'ELEVATOR' },
  { label: '扶梯', value: 'ESCALATOR' },
]

const filterHandler = (
  value: string,
  row: any,
  column: TableColumnCtx<any>
) => {
  const property = column['property']
  return row[property] === value
}

const tableRef = ref()

const columns = ref<ITableColumn[]>([
  { type: 'selection' } as ITableColumn,
  {
    prop: 'inspectionId',
    label: '工单ID',
    hideInSearch: true,
    sortable: true,
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
    filters: types.map((item) => ({ ...item, text: item.label })),
    filterMethod: filterHandler,
    fieldProps: {
      options: types,
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

let tableData = ref([])

const staticRow = {
  inspectionId: 574,
  eleContractNo: 'TUJYHBHZ',
  mntContractNo: 'FCZEIUPM',
  customerName: '易艳',
  onsiteEleName: 'OYXW',
  inspectionType: 'ESCALATOR',
  userName: '董芳',
  inspectionDate: '1995-01-12',
  h: '22:22-00:04',
  orderCode: 'INITIATED',
}

const request = async (params: any, cb: (v: any) => void) => {
  const resp = await getTableList(params)
  tableData.value = resp.data?.list
  cb?.({
    ...resp,
    data: {
      ...resp?.data,
      list: [...resp.data.list, staticRow],
    },
  })
  handleRefEvent(resp.data?.list)
}

const handleTableEvent = (val: any[]) => {
  console.log(val)
}

const handleRefEvent = (data: any[]) => {
  console.log(data)
  // tableRef.value?.dispatchElTableEvent('toggleAllSelection')
  tableRef.value?.dispatchElTableEvent('sort', 'inspectionId', 'ascending')
  tableRef.value?.dispatchElTableEvent('toggleRowSelection', data?.[0], true)
  tableRef.value?.dispatchElTableEvent('toggleRowSelection', staticRow, true)
}

onMounted(() => {
  // handleRefEvent(tableData.value)
  nextTick(() => {
    console.log(tableRef.value)
  })
})
</script>
<style scoped></style>
