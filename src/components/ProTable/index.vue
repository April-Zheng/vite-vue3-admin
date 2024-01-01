<template>
  <el-table v-loading="loading" :data="tableData">
    <template v-for="column in columns">
      <el-table-column v-bind="column" v-if="column.slot">
        <slot :name="column.slot" :column="column"></slot>
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
    class="mt20 flexEnd"
    :current-page="params.page"
    :page-size="params.pageSize"
    v-bind="pageConfig"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { ref, reactive, onMounted } from 'vue'

interface ITableColumn {
  prop: string
  label: string
  [x: string]: any
}

interface IPageConfig {
  background: boolean
  pageSizes: number[]
  layout: string
}

withDefaults(
  defineProps<{
    columns: ITableColumn[]
    pageConfig?: IPageConfig
  }>(),
  {
    pageConfig: {
      background: true,
      pageSizes: [10, 20, 50, 100],
      layout: 'total, sizes, prev, pager, next, jumper',
    },
  }
)

const emit = defineEmits(['request'])

const tableData = ref([])
const loading = ref(false)
const total = ref(0)

let params = reactive({
  pageSize: 10,
  page: 1,
})

const fetchList = async () => {
  loading.value = true
  emit('request', params, (resp) => {
    if (resp.code === 200) {
      tableData.value = resp.data?.list || []
      total.value = resp?.data?.total
      loading.value = false
    } else {
      loading.value = false
    }
  })
}

const handleSizeChange = (pageSize) => {
  params.pageSize = pageSize
  params.page = 1
}

const handleCurrentChange = (page) => {
  params.page = page
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
