import httpRequest from '@/request'
import { IPromiseResp } from './type'

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
