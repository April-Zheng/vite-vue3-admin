import { defineAsyncComponent } from 'vue'

const ProTable = defineAsyncComponent(() => import('./ProTable/index.vue'))
const ProForm = defineAsyncComponent(() => import('./ProForm/index.vue'))
const QueryFilter = defineAsyncComponent(
  () => import('./QueryFilter/index.vue')
)
const ProFormSubmitter = defineAsyncComponent(
  () => import('./ProForm/Submitter.vue')
)
const Icon = defineAsyncComponent(() => import('./Icon/index.vue'))
const EditableProTable = defineAsyncComponent(
  () => import('./EditableProTable/index.vue')
)
const FieldEditableProTable = defineAsyncComponent(
  () => import('./EditableProTable/FieldEditableProTable.vue')
)

export {
  ProTable,
  ProForm,
  QueryFilter,
  ProFormSubmitter,
  Icon,
  EditableProTable,
  FieldEditableProTable,
}

export type { ITableColumn, IPageConfig } from './ProTable/type'
export type {
  IField,
  IFormEmits,
  IFormProps,
  IFormSubmitter,
  ICustomComponentBaseProps,
  IFormExpose,
  IFormAction,
} from './ProForm/type'
