<template>
  <el-container>
    <el-header height="56px">
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Sidebar></Sidebar>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ElContainer, ElHeader, ElAside, ElMain } from 'element-plus';
import { Header, Sidebar } from '@/layout/components/index.ts'

</script>
<style scoped></style>