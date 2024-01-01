import { getUserList } from '@/api/user'
import { defineStore } from 'pinia'

export const useUserManage = defineStore('userManage', {
  state: () => {
    return {
      list: [],
      total: 0,
      params: {
        pageSize: 10,
        page: 1,
      },
    }
  },

  actions: {
    async fetchUserList(params) {
      console.log('params===>', params)
      const resp = await getUserList(params)
      if (resp.code === 200) {
        this.list = resp.data.list
        this.total = resp.data.total
      }
    },

    setParams(params) {
      this.params = params
      this.fetchUserList(params)
    },
  },
})

export default useUserManage
