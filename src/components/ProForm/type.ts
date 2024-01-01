import {
  ButtonProps,
  FormInstance,
  FormItemProps,
  FormProps,
} from 'element-plus'
import { VueElement } from 'vue'

export interface IField extends FormItemProps {
  component?: VueElement
  type: keyof typeof FieldType | string
  fieldProps?: Record<string, any>
  prop: string
}

export interface IFormSubmitter {
  okText?: string
  cancelText?: string
  actions: Array<'ok' | 'cancel'>
  okProps?: Omit<ButtonProps, 'type'>
  cancelProps?: Omit<ButtonProps, 'type'>
}

export interface IProps<T = Record<string, any>> {
  fields: IField[]
  model?: T
  config?: FormProps
  // submitter 传入false时 不渲染表单底部按钮
  submitter?: IFormSubmitter | false
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
