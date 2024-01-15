import { FormRules } from 'element-plus'
import { IEditableProTableProps, IActionProps } from '../EditableProTable/type'
import { IField } from '../ProForm/type'

export interface IProFormListActionProps extends Omit<IActionProps, 'loading'> {
  preventDefault?: boolean
}

export interface IProFromListProps<T> {
  label: string
  prop: string
  fields: IField[]
  tooltip?: string
  creatorProps?: IProFormListActionProps & {
    defaultRecord: T
  }
  copyProps?: IProFormListActionProps
  deleteProps?: IProFormListActionProps
  modelValue?: T[]
  rules?: FormRules
  min?: number
  max?: number
  actionGuard?: {
    beforeAddRow: (record: T, index: number) => Promise<boolean>
    beforeDeleteRow: (record: T, index: number) => Promise<boolean>
  }
}

export interface IProFormListEmit<T> {
  (e: 'update:modelValue', values: T[]): void
  (e: 'add', defaultRecord: T): void
  (e: 'delete', record: T, index: number): void
  (e: 'copy', record: T, index: number): void
}
