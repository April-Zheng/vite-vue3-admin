import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUser } from '@/pinia/modules'
import router from '@/router'

const instance = axios.create({
  baseURL: '/',
  timeout: 10000,
  withCredentials: true,
})

instance.interceptors.request.use((config) => {
  const token = useUser().token
  if (token) {
    config.headers.Authorization = token
  }
  // 获取token加入到请求头
  return config
})

instance.interceptors.response.use(
  (resp) => {
    if (resp?.data?.code !== 200) {
      ElMessage.error(resp?.data?.message || '请求失败')
    }
    return resp.data
  },
  (error) => {
    // 错误处理
    // 401 跳转登录
    if (error.response?.status === 401) {
      useUser().clearToken()
      router.push(`/login?redirect=${encodeURIComponent(location.href)}`)
    } else {
      ElMessage.error(
        error?.response?.data?.message || error?.message || '请求失败'
      )
    }
    return Promise.reject(error)
  }
)

export default instance
