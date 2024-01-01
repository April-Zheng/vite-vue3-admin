import httpRequest from '@/request'

export const getTableList = (data) => {
  return httpRequest({
    url: '/api/components/pro-table',
    method: 'post',
    data,
  })
}

export const getFormDetail = () => {
  return httpRequest({
    url: '/api/components/pro-form',
    method: 'get',
  })
}
