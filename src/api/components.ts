import httpRequest from '@/request'
import { IPromiseResp } from './type'

export const getTableList = (data: Record<string, any>): IPromiseResp<any> => {
  return httpRequest({
    url: '/api/components/pro-table',
    method: 'post',
    data,
  })
}

export const getFormDetail = (): IPromiseResp<any> => {
  return httpRequest({
    url: '/api/components/pro-form',
    method: 'get',
  })
}
