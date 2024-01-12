<template>
  <el-tooltip content="列设置">
    <span class="column-setting">
      <el-popover
        placement="bottom-start"
        trigger="click"
        width="200px"
        :offset="10"
      >
        <template #default>
          <div class="column-setting__buttons">
            <el-checkbox
              :indeterminate="!isCheckedAll"
              v-model="isCheckedAll"
              @change="toggleSelectAll"
              >全选</el-checkbox
            >
            <el-button text @click="onReset">重置</el-button>
          </div>
          <el-tree
            ref="treeRef"
            :data="computedColumns?.columns"
            node-key="label"
            show-checkbox
            check-on-click-node
            :expand-on-click-node="false"
            :default-checked-keys="checkedValues"
            @check.capture="onChange"
          ></el-tree>
        </template>
        <template #reference>
          <Icon class="pointer" icon="Setting"></Icon>
        </template>
      </el-popover>
    </span>
  </el-tooltip>
</template>

<script setup lang="ts" name="ColumnSetting">
import { Icon } from '@/components'
import { computed, defineProps, ref, unref } from 'vue'
import { ITableColumn } from './type'
import {
  getCheckedColumnKeys,
  getAllCanCheckColumns,
  getCheckedColumns,
  IDefaultCheckedKeys,
} from './helper'

const props = defineProps<{
  columns: ITableColumn[]
}>()

const emit = defineEmits(['change'])

const computedColumns = computed<{ columns: ITableColumn[]; count: number }>(
  () => {
    return getAllCanCheckColumns(props.columns)
  }
)

const getDefaultValues = (): IDefaultCheckedKeys => {
  return getCheckedColumnKeys(computedColumns.value?.columns)
}

const treeRef = ref()
const checkedValues = ref<string[]>(getDefaultValues()?.checkedKeys)
const _halfCheckedKeys = ref<string[]>(getDefaultValues()?.halfCheckedKeys)

const checkedColumns = computed<ITableColumn[]>(() => {
  return getCheckedColumns(props.columns, [
    ...unref(checkedValues),
    ...unref(_halfCheckedKeys),
  ])
})
const isCheckedAll = computed<boolean>(() => {
  const allKeys = checkedValues.value.length + _halfCheckedKeys.value.length
  return allKeys === computedColumns?.value?.count
})

const onChange = (
  _: any,
  {
    checkedKeys,
    halfCheckedKeys,
  }: { checkedKeys: string[]; halfCheckedKeys: string[] }
) => {
  checkedValues.value = checkedKeys
  _halfCheckedKeys.value = halfCheckedKeys
  emit('change', { halfCheckedKeys, checkedKeys }, unref(checkedColumns))
}

const toggleSelectAll = (isCheckAll: boolean) => {
  const { checkedKeys, halfCheckedKeys } = getCheckedColumnKeys(
    computedColumns.value?.columns,
    false
  )
  checkedValues.value = checkedKeys
  _halfCheckedKeys.value = halfCheckedKeys
  if (isCheckAll) {
    emit('change', checkedValues.value, unref(checkedColumns))
  } else {
    checkedValues.value = []
    emit('change', [], unref(checkedColumns))
  }
}

const onReset = () => {
  checkedValues.value = getDefaultValues()?.checkedKeys
  _halfCheckedKeys.value = getDefaultValues()?.halfCheckedKeys

  emit('change', checkedValues.value, unref(checkedColumns))
}
</script>
<style scoped lang="scss">
.column-setting {
  display: inline-flex;
  align-items: center;
}
.column-setting__buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
