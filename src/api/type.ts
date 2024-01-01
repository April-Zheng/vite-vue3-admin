export interface IResponse<T> {
  code: number
  message: string
  data: T
}

export type IPromiseResp<T> = Promise<IResponse<T>>

interface IMeta {
  // 是否在菜单中隐藏
  hidden?: boolean
  [x: string]: any
}

export interface IMenuItem {
  name: string
  path: string
  icon: string
  redirect?: string
  level: number
  meta?: IMeta
  children?: IMenuItem[]
}

export interface IUserInfo {
  name: string
  avatar: string
  menus: IMenuItem[]
}
