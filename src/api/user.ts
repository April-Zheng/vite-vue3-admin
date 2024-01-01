import httpRequest from '@/request'
import type { IPromiseResp, IUserInfo } from './type'
interface ILoginData {
  name: string
  password: string
}

export const login = (data: ILoginData): IPromiseResp<{ token: string }> =>
  httpRequest({
    url: '/api/login',
    method: 'post',
    data,
  })

export const getUserInfo = (): IPromiseResp<IUserInfo> => {
  return httpRequest({
    url: '/api/userinfo',
    method: 'get',
  })
}

export const getUserList = (data) => {
  return httpRequest({
    url: '/api/user/list',
    method: 'post',
    data,
  })
}
