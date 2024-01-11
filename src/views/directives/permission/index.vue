<template>
  <div>当前角色:{{ userInfo?.roles?.join('，') }}</div>
  <el-button type="primary" class="mt20" @click="changeRoles">
    切换角色
  </el-button>
  <div class="mt20" :key="forceUpdateKey">
    <el-alert :closable="false">
      这是一个只有<el-tag type="success">admin</el-tag>能见的按钮
      <el-button v-permission="['admin']">admin权限按钮</el-button>
    </el-alert>
    <div class="mt20"></div>
    <el-alert :closable="false">
      这是一个只有<el-tag type="success">visitor</el-tag>能见的按钮
      <el-button v-permission="['visitor']">visitor权限按钮</el-button>
    </el-alert>
    <div class="mt20"></div>
    <el-alert :closable="false">
      这是一个只有
      <el-tag type="success">admin</el-tag>
      <el-tag type="success">visitor</el-tag>
      能见的按钮
      <el-button v-permission="['admin', 'visitor']"
        >admin和visitor权限按钮</el-button
      >
    </el-alert>
    <div class="mt20">
      <el-alert :closable="false">
        对于el-tabs等动态渲染的dom，不适合使用<el-tag>v-permission</el-tag>，会出现以下情况，只能通过<el-tag>v-if</el-tag>判断
      </el-alert>
      <el-tabs>
        <el-tab-pane label="admin" v-permission="['admin']">admin</el-tab-pane>
        <el-tab-pane label="visitor" v-permission="['visitor']"
          >visitor</el-tab-pane
        >
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUser } from '@/pinia/modules'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const userStore = useUser()
const { userInfo } = storeToRefs(userStore)

let forceUpdateKey = ref(0)

const changeRoles = async () => {
  await userStore.changeUserRoles()
  forceUpdateKey.value = forceUpdateKey.value + 1
}
</script>
<style scoped></style>
