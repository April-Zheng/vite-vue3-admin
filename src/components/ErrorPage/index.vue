<template>
  <div class="error-page">
    <div class="error-page-img">
      <img :src="types[type].img" />
    </div>
    <div class="error-page-content">
      <div class="title">{{ types[type].title }}</div>
      <div class="desc">{{ types[type].desc }}</div>
      <div class="actions">
        <el-button size="large" type="primary" @click="backToHome"
          >返回首页</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ErrorType, types } from './type'

defineProps<{ type: keyof ErrorType }>()

const router = useRouter()

const backToHome = () => {
  router.push('/')
}
</script>
<style scoped lang="scss">
.error-page {
  display: flex;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  padding-top: 10%;
  box-sizing: border-box;
  &-img {
    max-width: 430px;
    height: 360px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
  }
  &-content {
    text-align: center;
    .title {
      margin-bottom: 24px;
      color: #434e59;
      font-weight: 600;
      font-size: 72px;
      line-height: 72px;
      text-align: center;
    }
    .desc {
      margin-bottom: 16px;
      color: #666;
      font-size: 20px;
      line-height: 28px;
    }
  }
}
</style>
