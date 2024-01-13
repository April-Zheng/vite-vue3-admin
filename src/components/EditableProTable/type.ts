import { IProTableProps, ITableColumn } from '../ProTable/type'
import { ButtonProps, FormInstance } from 'element-plus'

export type IActionProps = ButtonProps & { btnText: string }

export type ICreatorProps<T> = IActionProps & { defaultRecord: T }

export interface IEditableProTableProps<T> {
  columns: ITableColumn[]
  rules?: IProTableProps<T>['rules']
  operation?: {
    actions?: ['ok', 'edit', 'cancel', 'delete']
    okProps?: IActionProps
    cancelProps?: IActionProps
    editProps?: IActionProps
    deleteProps?: IActionProps
  }
  creatorProps?: ICreatorProps<T> | false
  data?: T[]
  modelValue?: T[]
  formRef?: FormInstance
}

export interface IEditableProTableEmits<T> {
  (e: 'save', row: T): void
  (e: 'delete', row: T): void
  (e: 'update:modelValue', rows: T[]): void
}
