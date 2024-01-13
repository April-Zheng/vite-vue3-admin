<template>
  <el-table-column
    v-bind="omit(column, ['children'])"
    align="center"
    :show-overflow-tooltip="true"
  >
    <template #default="scope">
      <template v-if="column.children && column.children.length > 0">
        <pro-table-column
          v-for="(child, index) in column.children"
          :key="`pro-table-column__${child.prop || child.label || index}`"
          :column="child"
          :rules="rules"
        >
          <template v-for="(_, slot) in $slots" :key="slot" #[slot]="slotScope">
            <slot :name="slot" v-bind="slotScope" />
          </template>
        </pro-table-column>
      </template>
      <pro-form-item
        v-if="
          scope.row.isEdit &&
          ('editable' in column ? column?.editable : true) &&
          column.prop
        "
        :field="omit(column, ['prop', 'label'])"
        label=""
        :rules="rules?.[column.prop]"
        :prop="`${formItem?.prop || 'tableData'}.${scope.$index}.${
          column.prop
        }`"
        :component="column.formItemComponent || column.component"
        v-model="scope.row[column.prop]"
      ></pro-form-item>
      <component
        v-else-if="column.component"
        :is="column.component"
        :config="column"
        v-bind="scope"
      ></component>
      <slot
        v-else-if="column.slot"
        :name="column.slot"
        v-bind="scope"
        :column="column"
      ></slot>
    </template>
  </el-table-column>
</template>

<script setup lang="ts" name="ProTableColumn">
import { omit } from '@/utils/helper'
import { defineAsyncComponent, defineProps } from 'vue'
import { useFormItem } from 'element-plus'

const ProFormItem = defineAsyncComponent(
  () => import('../ProForm/FormItem.vue')
)
defineProps(['column', 'formValues', 'rules'])
const { formItem } = useFormItem()
</script>
<style scoped></style>
