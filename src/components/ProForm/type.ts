import {
  ButtonProps,
  ColProps,
  FormInstance,
  FormItemProps,
  FormProps,
} from 'element-plus'
import { CSSProperties } from 'vue'

export type ColSizeProps = { span: ColProps['span'] } & Partial<
  Omit<ColProps, 'span'>
>

export interface IField extends Partial<Omit<FormItemProps, 'prop'>> {
  component?: any
  type?: keyof typeof FieldType | string
  fieldProps?: Record<string, any>
  prop: string
  colSize?: ColSizeProps
  // 给查询表单的折叠展开用
  hidden?: boolean
  [x: string]: any
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
  colSize?: ColSizeProps
  submitterColSize?: ColSizeProps
  submitterStyle?: CSSProperties
}

export interface IFormAction {
  (e: 'submit', params: any): void
  (e: 'reset'): void
}

export interface IFormEmits extends IFormAction {
  // 获取表单初始值
  (e: 'request', cb: (resp: any) => any): void
}

export interface IFormExpose<T extends Record<string, any>>
  extends FormInstance {
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
