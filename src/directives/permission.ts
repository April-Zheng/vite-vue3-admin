import { useUser } from '@/pinia/modules'

export default {
  mounted(
    el: {
      parentNode: any
    },
    binding: { value: any }
  ) {
    const userStore = useUser()
    const { value } = binding

    if (!value) {
      console.warn(
        `v-permission使用错误，请使用 v-permission="['admin']"的形式`
      )
      return
    }
    const hasPermission = userStore?.userInfo?.roles?.some((role) =>
      value?.includes(role)
    )

    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el) // 不显示按钮
    }
  },
  beforeUpdate() {},
  updated() {},
}
