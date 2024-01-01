<template>
  <div class="login-form-wrap">
    <div class="login-form">
      <Title></Title>
      <el-form
        label-position="top"
        ref="loginFormRef"
        :rules="loginFormRules"
        :model="loginForm"
      >
        <el-form-item label="账号名" prop="name" size="large">
          <el-input
            v-model="loginForm.name"
            placeholder="请输入账号名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" size="large">
          <el-input
            v-model="loginForm.password"
            show-password
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="large"
            type="primary"
            :loading="loading"
            @click="submit(loginFormRef)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from './Title.vue'
import type { FormInstance } from 'element-plus'
import { ref, reactive } from 'vue'
import { login } from '@/api/user.ts'
import { useUser } from '@/pinia/modules/index.ts'
import { useRoute, useRouter } from 'vue-router'

const loginForm = reactive({
  name: 'admin',
  password: '123456',
})

const loginFormRules = reactive({
  name: [{ required: true, message: '请输入账号名' }],
  password: [{ required: true, message: '请输入账号名' }],
})

const loginFormRef = ref<FormInstance | null>(null)
const loading = ref<boolean>(false)

const userStore = useUser()

const $router = useRouter()
const $route = useRoute()

const submit = (formEl: FormInstance | null) => {
  if (!formEl) return
  formEl?.validate().then(async (valid) => {
    if (valid) {
      // submit
      loading.value = true
      try {
        const resp = await login(loginForm)
        loading.value = false
        if (resp?.code === 200) {
          userStore.setToken(resp?.data.token)
          if (!$route.query?.redirect) {
            $router.push('/')
          } else {
            const redirect = decodeURIComponent(
              $route.query?.redirect as string
            )
            if (redirect?.startsWith('http')) {
              location.href = redirect
            } else {
              $router.push(redirect)
            }
          }
        }
      } catch (error) {
        loading.value = false
        console.log('submit error', error)
      }
    }
  })
}
</script>
<style scoped lang="scss">
.login-form-wrap {
  background: #0e87f7;
  height: 100%;
  position: relative;

  .title-wrap {
    padding: 30px 0;
    justify-content: center;
  }

  .login-form {
    width: 20%;
    height: 400px;
    padding: 0 30px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    vertical-align: top;
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 50%;
    right: 10%;
    transform: translate(-10%, -50%);

    .el-button--large {
      width: 100%;
      height: 42px;
      font-size: 16px;
      border-radius: 26px;
    }
  }
}
</style>
@/api/user
