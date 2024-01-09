<template>
  <el-config-provider :locale="locale">
    <el-container>
      <el-aside width="max-content">
        <Sidebar :menus="menus" :isCollapse="isCollapse"></Sidebar>
      </el-aside>
      <el-container>
        <el-header height="48px" style="padding: 0">
          <Header :userInfo="userInfo"></Header>
        </el-header>
        <el-main>
          <router-view :key="$route.path" v-slot="{ Component, route }">
            <transition mode="out-in" name="fade-transform">
              <el-scrollbar>
                <error-boundary>
                  <component :is="Component" :key="route.path" />
                </error-boundary>
              </el-scrollbar>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script setup lang="ts">
import { Header, Sidebar } from '@/layout/components/index.ts'
import { useUser } from '@/pinia/modules'
import { storeToRefs } from 'pinia'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { ref, computed } from 'vue'
import ErrorBoundary from '../components/ErrorBoundary/index.vue'

const language = ref('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))

const { userInfo, menus, isCollapse } = storeToRefs(useUser())
</script>
<style scoped lang="scss">
.el-container {
  height: 100%;
}
</style>
