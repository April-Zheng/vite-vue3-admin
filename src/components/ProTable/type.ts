import type { IField } from '../ProForm/type'

export interface ITableColumn extends Partial<IField> {
  label: string
  prop?: string
  hideInSearch?: boolean
  // 不在table列中显示
  hideInTable?: boolean
  children?: ITableColumn[]
  [x: string]: any
}

export interface IPageConfig {
  background: boolean
  pageSizes: number[]
  layout: string
}

export interface IProTableProps<T> {
  columns: ITableColumn[]
  pageConfig?: IPageConfig | false
  searchable?: boolean
  rowKey?: string
  headerTitle?: string
  tooltip?: string
  toolbar?: {
    refresh?: boolean
    setting?: boolean
  }
  rowSelection?: {
    alwaysShowAlert?: boolean
    infoRender?: (rows: T[]) => string
  }
}
