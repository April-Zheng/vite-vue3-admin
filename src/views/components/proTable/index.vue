<template>
  <pro-table
    ref="tableRef"
    row-key="inspectionId"
    header-title="表格标题"
    tooltip="这是表格描述信息这是表格描述信息这是表格描述信息"
    :columns="columns"
    :stripe="true"
    :toolbar="{
      refresh: true,
      setting: true,
    }"
    :rowSelection="{
      alwaysShowAlert: true,
    }"
    @request="request"
    @selection-change="handleTableEvent"
    @sort-change="handleTableEvent"
  >
    <template #actions>
      <el-button type="primary">新建</el-button>
    </template>
    <template #alertActions>
      <el-button type="primary" @click="batchDelete">批量删除</el-button>
      <el-button type="primary">导出</el-button>
    </template>
    <template #inspectionType="{ row }">
      {{ row?.inspectionType === 'ELEVATOR' ? '升降梯' : '扶梯' }}
    </template>
    <template #inspectionType2="{ row }">
      {{ row?.inspectionType === 'ELEVATOR' ? '升降梯' : '扶梯' }}
    </template>
    <template #opreation>
      <el-button>编辑</el-button>
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
  // @ts-ignore
  {
    label: '产品合同',
    children: [
      {
        prop: 'eleContractNo',
        label: '产品合同号2',
        type: 'input',
      },
      {
        prop: 'mntContractNo',
        label: '保养合同号2',
        type: 'input',
        hideInTable: true,
      },
      {
        prop: 'customerName',
        label: '客户名称2',
        type: 'input',
      },
      {
        prop: 'inspectionType',
        label: '作业类型2',
        slot: 'inspectionType2',
        type: 'select',
      },
    ],
  } as ITableColumn,
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
    hideInTable: true,
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
  {
    label: '操作',
    slot: 'opreation',
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
  console.log(val, '=========')
}

const batchDelete = () => {
  console.log('batchDelete===>', tableRef.value?.getSelectionRows())
}

const handleRefEvent = (data: any[]) => {
  console.log(data, tableRef.value)
  // tableRef.value?.dispatchElTableEvent('toggleAllSelection')
  // tableRef.value?.dispatchElTableEvent('sort', 'inspectionId', 'ascending')
  tableRef.value?.dispatchElTableEvent('toggleRowSelection', data?.[0], true)
  tableRef.value?.dispatchElTableEvent('toggleRowSelection', staticRow, true)
}

onMounted(() => {
  nextTick(() => {
    // handleRefEvent(tableData.value)
    console.log(tableRef.value)
  })
})
</script>
<style scoped></style>
