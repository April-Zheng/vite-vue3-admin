<template>
  <pro-table
    ref="tableRef"
    :columns="computedColumns"
    v-bind="$attrs"
    :rules="rules"
    :data="tableData"
    @data-change="onTableDataChange"
  >
    <template v-for="(_, slot) in $slots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
    <template #editable_operation="{ $index, row }">
      <slot name="operaions">
        <el-space>
          <template v-if="!row.isEdit">
            <el-button
              link
              v-if="operation?.actions?.includes('edit')"
              v-bind="operation?.editProps || {}"
              @click="onEdit($index, row)"
            >
              {{ operation.editProps?.btnText || '编辑' }}
            </el-button>
            <el-button
              link
              type="danger"
              v-if="operation?.actions?.includes('delete')"
              v-bind="operation?.deleteProps || {}"
              @click="onDelete($index, row)"
            >
              {{ operation.deleteProps?.btnText || '删除' }}
            </el-button>
          </template>
          <template v-else>
            <el-button
              link
              v-if="operation?.actions?.includes('ok')"
              v-bind="operation?.okProps || {}"
              @click="onSave($index, row)"
            >
              {{ operation.okProps?.btnText || '保存' }}
            </el-button>
            <el-button
              link
              v-if="operation?.actions?.includes('cancel')"
              v-bind="operation?.cancelProps || {}"
              @click="onCancel($index, row)"
            >
              {{ operation.cancelProps?.btnText || '取消' }}
            </el-button>
          </template>
        </el-space>
      </slot>
    </template>
  </pro-table>
  <slot name="creator" v-if="creatorProps">
    <el-button
      class="editable__creator"
      size="large"
      v-bind="creatorProps"
      @click="onAdd"
    >
      <template #icon>
        <Icon icon="Plus" />
      </template>
      {{ creatorProps?.btnText || '添加一行数据' }}
    </el-button>
  </slot>
</template>

<script
  setup
  lang="ts"
  generic="T extends Record<string,any>"
  name="FieldEditableProTable"
>
import Icon from '@/components/Icon/index.vue'
import ProTable from '@/components/ProTable/index.vue'
import { IEditableProTableEmits, IEditableProTableProps } from './type'
import { computed, defineProps, ref, unref } from 'vue'
import { omit } from '@/utils/helper'
import { useFormItem } from 'element-plus'

const { formItem, form } = useFormItem()

const props = defineProps<IEditableProTableProps<T>>()
const emit = defineEmits<IEditableProTableEmits<T>>()

const tableRef = ref()

const computedColumns = computed(() => [
  ...props.columns,
  {
    label: '操作',
    slot: 'editable_operation',
    hideInTable:
      !props.operation?.actions || props.operation?.actions?.length <= 0,
  },
])

const tableData = ref<T[]>(props.modelValue || [])

const onTableDataChange = (values) => {
  // @ts-ignore
  tableData.value = values as T[]
  emit('update:modelValue', unref(tableData) as T[])
}

const getRowFieldKeys = (index: number, row: T) => {
  return Object.keys(omit(row, ['isEdit', 'isAdd'])).map(
    (key) => `${formItem?.prop || 'tableData'}.${index}.${key}`
  )
}

const dispatchModelValueChange = () => {
  emit('update:modelValue', unref(tableData) as T[])
  // TODO: 校验的好时机是？？
  formItem?.validate('blur')
}

const onAdd = () => {
  const newRecord = props.columns?.reduce((pre, cur) => {
    if (!cur.prop) {
      return pre
    }
    return {
      ...pre,
      // @ts-ignore
      [cur.prop]: props.creatorProps?.defaultRecord?.[cur.prop] || '',
    }
  }, {})
  // @ts-ignore
  tableData.value.push({ isEdit: true, isAdd: true, ...newRecord })
  dispatchModelValueChange()
}

const onDelete = (index: number, row: T, captureDelete?: boolean) => {
  tableData.value = tableData?.value?.filter((_, idx) => index !== idx)
  !captureDelete && emit('delete', omit(row, ['isEdit', 'isAdd']))
  dispatchModelValueChange()
}

const onCancel = (index: number, row: any) => {
  form?.resetFields(getRowFieldKeys(index, row))
  // 如果是新增的数据，点击取消就删除数据
  if (row.isAdd) {
    onDelete(index, row, true)
    return
  }
  row.isEdit = false
  dispatchModelValueChange()
}

const onSave = (index: number, row: any) => {
  const currentFields = getRowFieldKeys(index, row)
  form?.validateField(currentFields, (isVaild) => {
    if (isVaild) {
      row.isEdit = false
      row.isAdd = false
      emit('save', omit(row, ['isEdit', 'isAdd']))
      dispatchModelValueChange()
    }
  })
}

const onEdit = (_: number, row: any) => {
  row.isEdit = true
}

defineExpose({
  save: onSave,
  edit: onEdit,
  cancel: onCancel,
  add: onAdd,
})
</script>
<style scoped lang="scss">
.editable__form {
  flex: 1;
}
.editable__creator {
  margin-top: 16px;
  background: #ffffff;
  border-color: #d9d9d9;
  color: rgba(42, 46, 54, 0.88);
  box-shadow: 0 2px 0 rgba(42, 46, 54, 0.02);
  border-style: dashed;
  width: 100%;
}
</style>
