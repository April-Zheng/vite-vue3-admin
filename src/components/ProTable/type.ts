import { Component } from 'vue'
import type { IField } from '../ProForm/type'
import { FormRules } from 'element-plus'

export const defaultPageConfig = {
  background: true,
  pageSizes: [10, 20, 50, 100],
  layout: 'total, sizes, prev, pager, next, jumper',
}

export interface ITableColumn extends Partial<IField> {
  label: string
  prop?: string
  hideInSearch?: boolean
  // 不在table列中显示
  hideInTable?: boolean
  // 是否可以被编辑表格编辑
  editable?: boolean
  children?: ITableColumn[]
  formItemComponent?: Component
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
  rules?: FormRules
  data?: T[]
}
