<template>
  <query-filter
    v-if="searchable"
    :fields="fields"
    @submit="onSearch"
    @reset="onReset"
  ></query-filter>
  <div class="toolbar" v-if="toolbar || headerTitle">
    <div class="toolbar__left">
      <slot name="title">
        <div class="toolbar__title">
          {{ headerTitle }}
          <el-tooltip :content="tooltip">
            <Icon
              v-if="tooltip"
              color="#999"
              :style="{ marginLeft: '5px' }"
              icon="QuestionFilled"
            />
          </el-tooltip>
        </div>
      </slot>
    </div>
    <el-space class="toolbar__right" alignment="center" :size="12">
      <slot name="actions"></slot>
      <el-tooltip content="刷新">
        <Icon
          v-if="toolbar?.refresh"
          class="pointer refresh"
          icon="RefreshRight"
          @click="fetchList"
        />
      </el-tooltip>
      <column-setting
        v-if="toolbar?.setting"
        :columns="columns"
        @change="onColumnsChange"
      ></column-setting>
    </el-space>
  </div>
  <div v-if="rowSelection?.alwaysShowAlert" class="alert">
    <div class="alert__content">
      {{
        rowSelection?.infoRender
          ? rowSelection?.infoRender?.(selectedRows)
          : `已选择${selectedRows?.length}项目`
      }}
    </div>
    <el-space class="alert__actions">
      <slot name="alertActions"></slot>
      <el-button class="clear" link @click="clearSelections">清空</el-button>
    </el-space>
  </div>
  <el-table
    ref="tableRef"
    v-loading="loading"
    :data="tableData"
    :row-key="rowKey"
    :current-row-key="rowKey"
    @selection-change="onSelectionChange"
    v-bind="$attrs"
  >
    <pro-table-column
      v-for="column in computedColumns"
      :key="column.prop"
      :column="column"
      :rules="rules"
    >
      <template v-for="(_, slot) in $slots" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </pro-table-column>
  </el-table>
  <el-pagination
    v-if="pageConfig"
    class="mt20 flexEnd"
    v-bind="pageConfig"
    :current-page="params.page"
    :page-size="params.pageSize"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts" generic="T">
import { IResponse } from '@/api/type'
import {
  watch,
  ref,
  onMounted,
  computed,
  nextTick,
  defineExpose,
  defineAsyncComponent,
} from 'vue'
import type { ElTable } from 'element-plus'
import ProTableColumn from './ProTableColumn.vue'
import { getShowColumns } from './helper'
import type { ITableColumn, IProTableProps } from './type'
import type { IField } from '../ProForm/type.ts'

const ColumnSetting = defineAsyncComponent(() => import('./ColumnSetting.vue'))
const QueryFilter = defineAsyncComponent(
  () => import('../QueryFilter/index.vue')
)

const props = withDefaults(defineProps<IProTableProps<T>>(), {
  searchable: true,
  pageConfig: {
    // @ts-ignore
    background: true,
    pageSizes: [10, 20, 50, 100],
    layout: 'total, sizes, prev, pager, next, jumper',
  },
})

const emit = defineEmits([
  'request',
  'columnSettingChange',
  'selectionChange',
  'dataChange',
])

const tableRef = ref<InstanceType<typeof ElTable>>()
const tableData = ref<T[]>(props.data || [])
const loading = ref(false)
const total = ref(0)

watch(
  () => props.data,
  (values) => {
    // @ts-ignore
    tableData.value = values
  }
)

const computedColumns = ref<ITableColumn[]>(getShowColumns(props.columns))

const onColumnsChange = (columnKeys: string[], rows: ITableColumn[]) => {
  computedColumns.value = getShowColumns(rows)
  emit('columnSettingChange', columnKeys, rows)
}

const selectedRows = ref([])

const onSelectionChange = (rows: T[]) => {
  // @ts-ignore
  selectedRows.value = rows
  emit('selectionChange', rows)
}

const clearSelections = () => {
  tableRef.value?.clearSelection?.()
}

const initialParams = props.pageConfig
  ? {
      pageSize: 10,
      page: 1,
    }
  : {}

let params = ref<Record<string, any>>(initialParams)

const fields = computed(() => {
  return [...props.columns]
    .filter((item) => !item.hideInSearch && item.prop)
    .map((item) => {
      item.component = item.formItemComponent
      return item
    }) as IField[]
})

const fetchList = async () => {
  try {
    loading.value = true
    emit(
      'request',
      params.value,
      (resp: IResponse<{ list: T[]; total: number }>) => {
        if (resp.code === 200) {
          // @ts-ignore
          tableData.value = resp.data?.list || []
          total.value = resp?.data?.total
          loading.value = false
          emit('dataChange', tableData.value)
        } else {
          loading.value = false
        }
      }
    )
  } finally {
    loading.value = false
  }
}

const handleSizeChange = (pageSize: number) => {
  params.value = {
    pageSize,
    page: 1,
  }
}

const handleCurrentChange = (page: number) => {
  params.value.page = page
}

const onSearch = (values = {}) => {
  params.value = {
    ...params.value,
    ...values,
    page: initialParams?.page,
  }
}

const onReset = () => {
  params.value = {
    page: initialParams?.page,
    pageSize: params.value.pageSize,
  }
}

watch(
  params,
  () => {
    fetchList()
  },
  {
    deep: true,
  }
)

onMounted(() => {
  fetchList()
})

const dispatchElTableEvent = (key: string, ...args: any) => {
  if (!tableRef.value) {
    console.warn(`没有tableRef实例`)
    return
  }
  if (Reflect.has(tableRef.value, key)) {
    const fn = Reflect.get(tableRef.value, key)
    nextTick(() => {
      fn(...args)
    })?.catch?.((e) => {
      console.log(e)
    })
  } else {
    console.warn(`el-table 没有${key}事件，请检查是否拼写错误`)
  }
}

/**
 * TODO: tableRef.value exponse的时候一直是undefined，tableData也是空
 */
defineExpose({
  ...(tableRef.value || {}),
  dispatchElTableEvent,
  tableData: tableData.value,
  getTableData: () => tableData.value,
  getSelectionRows: () => tableRef?.value?.getSelectionRows?.(),
})
</script>
<style scoped lang="scss">
.flexEnd {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 10px 0;
  &__right {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  &__title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: rgba(42, 46, 54, 0.88);
    font-weight: 500;
    font-size: 16px;
  }
}

.alert {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  background-color: rgba(42, 46, 54, 0.02);
  padding: 8px 16px;
  &__content {
    flex: 1;
    color: rgba(42, 46, 54, 0.75);
    font-size: 13px;
  }
  &__actions {
    .clear {
      color: var(--el-color-primary);
    }
  }
}
</style>
