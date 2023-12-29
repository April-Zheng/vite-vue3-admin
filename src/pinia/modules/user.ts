import { Cookie } from '@/utils/storage'
import { defineStore } from 'pinia'

export const useUser = defineStore('user', {
  state: () => {
    return {
      token: Cookie.getItem('token'),
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
      Cookie.setItem('token', token)
    },

    clearToken() {
      this.token = ''
      Cookie.removeItem('token')
    },
  },
})
