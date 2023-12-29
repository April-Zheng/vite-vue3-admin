export interface IResponse<T> {
  code: number
  message: string
  data: T
}

export type IPromiseResp<T> = Promise<IResponse<T>>
