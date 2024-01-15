<template>
  <el-form
    class="editable__form"
    :model="formData"
    :rules="rules"
    ref="editableFormRef"
    v-bind="$attrs"
  >
    <field-editable-pro-table
      v-model="formData.tableData"
      v-bind="omit({ ...$attrs, ...$props }, ['modelValue'])"
    >
      <template v-for="(_, slot) in $slots" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </field-editable-pro-table>
  </el-form>
</template>

<script
  setup
  lang="ts"
  generic="T extends Record<string,any>"
  name="EditableProTable"
>
import FieldEditableProTable from '@/components/EditableProTable/FieldEditableProTable.vue'
import { IEditableProTableEmits, IEditableProTableProps } from './type'
import { defineProps, ref } from 'vue'
import { omit } from '@/utils/helper'

defineProps<IEditableProTableProps<T>>()
const emit = defineEmits<IEditableProTableEmits<T>>()

const editableFormRef = ref()

const formData = ref<{ tableData: T[] }>({
  tableData: [],
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
