export const enum ErrorType {
  NoPermission = 403,
  NotFound = 404,
  ServiceError = 500,
  PageError = 'error',
}

export interface IErrorInfo {
  img: string
  title: string
  desc: string
}

export const types: Record<ErrorType, IErrorInfo> = {
  [ErrorType.NoPermission]: {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg',
    title: '403',
    desc: '抱歉，你无权访问该页面',
  },
  [ErrorType.NotFound]: {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg',
    title: '404',
    desc: '抱歉，你访问的页面不存在或仍在开发中',
  },
  [ErrorType.ServiceError]: {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg',
    title: '500',
    desc: '抱歉，服务器出错了',
  },
  [ErrorType.PageError]: {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg',
    title: 'Error',
    desc: '抱歉，页面出错了',
  },
}

export default types
