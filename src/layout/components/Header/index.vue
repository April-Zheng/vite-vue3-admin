<template>
  <div class="header">
    <div class="menuinfo">
      <div class="collapse-icon" @click="changeCollapse">
        <Icon :size="20" :icon="icon" />
      </div>
      <Breadcrumbs></Breadcrumbs>
    </div>
    <el-dropdown trigger="click" @command="handleCommand">
      <div class="userinfo">
        <img
          class="userinfo-avatar"
          v-if="userInfo?.avatar"
          :src="userInfo?.avatar"
        />
        <span class="userinfo-name">{{ userInfo?.name }}</span>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="gotoUsercenter">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useUser } from '@/pinia/modules'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Icon } from '@/components'
import Breadcrumbs from './Breadcrumbs.vue'

const router = useRouter()

const userStore = useUser()
const { userInfo, isCollapse } = storeToRefs(userStore)

const icon = computed(() => (!isCollapse.value ? 'Fold' : 'Expand'))

const fns: Record<string, () => void> = {
  gotoUsercenter: () => {},
  logout: () => {
    userStore.clearToken()
    userStore.$reset()
    router.push('/login')
  },
}

const handleCommand = (command: string) => {
  fns?.[command]?.()
}

const changeCollapse = () => {
  userStore.changeCollapse(!isCollapse.value)
}
</script>
<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  border-bottom: 1px solid #ddd;
  padding: 0 20px;

  .menuinfo {
    display: flex;
    align-items: center;
    .collapse-icon {
      cursor: pointer;
      display: flex;
      align-items: center;
      margin-right: 10px;
    }
  }

  .userinfo {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 20px;
    &-avatar {
      width: 28px;
      height: 28px;
      margin-right: 8px;
    }
    &-name {
      font-size: 16px;
    }
  }
}
</style>
