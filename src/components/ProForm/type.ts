import {
  ButtonProps,
  ColProps,
  FormInstance,
  FormItemProps,
  FormProps,
} from 'element-plus'
import { CSSProperties, VueElement } from 'vue'

export interface IField extends FormItemProps {
  component?: VueElement
  type: keyof typeof FieldType | string
  fieldProps?: Record<string, any>
  prop: string
  colSize?: ColProps
  // 给查询表单的折叠展开用
  hidden?: boolean
}

export interface IFormSubmitter {
  okText?: string
  cancelText?: string
  actions?: Array<'ok' | 'cancel'>
  okProps?: Omit<ButtonProps, 'type'>
  cancelProps?: Omit<ButtonProps, 'type'>
}

export interface IFormProps<T = Record<string, any>> {
  fields: IField[]
  model?: T
  config?: Omit<FormProps, 'model'>
  // submitter 传入false时 不渲染表单底部按钮
  submitter?: IFormSubmitter | false
  colSize?: ColProps
  submitterColSize?: ColProps
  submitterStyle?: CSSProperties
}

export interface IFormEmits {
  (e: 'submit', params: any): void
  (e: 'reset'): void
  // 获取表单初始值
  (e: 'request', cb: (resp: any) => any): void
}

export interface IFormExpose<T> extends FormInstance {
  onSubmit: () => void
  onReset: () => void
  formValues: T
}

export interface ICustomComponentBaseProps<T = Record<string, any>> {
  formRef: FormInstance | undefined
  formValues: T
}

export const enum FieldType {
  input,
  select,
  radio,
  checkbox,
  datePicker,
  inputNumber,
}
