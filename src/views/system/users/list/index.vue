<template>
  <div>
    <el-button type="primary" @click="addUser">新增用户</el-button>
    <el-table :data="list" style="width: 100%">
      <el-table-column fixed prop="date" label="Date" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="age" label="Age" />
      <el-table-column prop="city" label="City" />
      <el-table-column prop="address" label="Address" />
      <el-table-column prop="zip" label="Zip" />
      <el-table-column fixed="right" label="Operations">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick"
            >Detail</el-button
          >
          <el-button link type="primary" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="mt20"
      :background="true"
      v-model:current-page="params.page"
      v-model:page-size="params.pageSize"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { useUserManage } from '@/pinia/modules/index.ts'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const handleClick = () => {
  console.log('click')
}
const userManage = useUserManage()
const router = useRouter()

const { list, total, params } = storeToRefs(userManage)

const fetchList = () => userManage.fetchUserList(params.value)

const addUser = () => router.push('/system/users/add')

const handleSizeChange = (pageSize: number) => {
  userManage.setParams({ ...params.value, pageSize })
}
const handleCurrentChange = (page: number) => {
  userManage.setParams({ ...params.value, page })
}

onMounted(() => {
  fetchList()
})
</script>
<style scoped></style>
