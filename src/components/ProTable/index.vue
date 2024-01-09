<template>
  <query-filter
    v-if="searchable"
    :fields="fields"
    @submit="onSearch"
    @reset="onReset"
  ></query-filter>
  <el-table v-loading="loading" :data="tableData">
    <template v-for="column in columns">
      <el-table-column v-bind="column" v-if="column.slot">
        <template #default="scope">
          <slot :name="column.slot" :row="scope.row" :column="column"></slot>
        </template>
      </el-table-column>
      <component
        v-else-if="column.component"
        :is="column.component"
        :config="column"
      ></component>
      <el-table-column
        v-else
        v-bind="column"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
    </template>
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
import { watch, ref, onMounted, computed } from 'vue'
import QueryFilter from '../QueryFilter/index.vue'
import { IField } from '../ProForm/type'

export interface ITableColumn extends Partial<IField> {
  prop: string
  label: string
  hideInSearch?: boolean
  [x: string]: any
}

export interface IPageConfig {
  background: boolean
  pageSizes: number[]
  layout: string
}

const props = withDefaults(
  defineProps<{
    columns: ITableColumn[]
    pageConfig?: IPageConfig | false
    searchable?: boolean
  }>(),
  {
    searchable: true,
    pageConfig: {
      // @ts-ignore
      background: true,
      pageSizes: [10, 20, 50, 100],
      layout: 'total, sizes, prev, pager, next, jumper',
    },
  }
)

const emit = defineEmits(['request'])

const tableData = ref<T[]>([])
const loading = ref(false)
const total = ref(0)

const initialParams = props.pageConfig
  ? {
      pageSize: 10,
      page: 1,
    }
  : {}

let params = ref<Record<string, any>>(initialParams)

const fields = computed(() => {
  return props.columns.filter(
    (item) => !item.hideInSearch && item.prop
  ) as IField[]
})

const fetchList = async () => {
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
      } else {
        loading.value = false
      }
    }
  )
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
</script>
<style scoped lang="scss">
.flexEnd {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
