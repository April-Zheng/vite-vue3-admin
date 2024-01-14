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
              :checked="isCheckedAll"
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
            :check-on-click-node="true"
            draggable
            :allow-drop="allowDrop"
            :expand-on-click-node="false"
            :default-checked-keys="checkedValues"
            :default-expanded-keys="expandedKeys"
            @node-expand="(val) => onNodeExpandChange(val, true)"
            @node-collapse="(val) => onNodeExpandChange(val, false)"
            @check="onChange"
            @node-drop="onDrop"
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
  getSortableColumns,
} from './helper'
import { NodeDropType } from 'element-plus/es/components/tree/src/tree.type.mjs'
import Node from 'element-plus/es/components/tree/src/model/node.mjs'

const props = defineProps<{
  columns: ITableColumn[]
}>()

const emit = defineEmits(['change'])

const newColumns = ref<ITableColumn[]>(props.columns)

const computedColumns = computed<{ columns: ITableColumn[]; count: number }>({
  get: () => {
    return getAllCanCheckColumns(newColumns.value)
  },
  set: (val) => val,
})

const getDefaultValues = (): IDefaultCheckedKeys => {
  return getCheckedColumnKeys(computedColumns.value?.columns)
}

const treeRef = ref()
const checkedValues = ref<string[]>(getDefaultValues()?.checkedKeys)
const _halfCheckedKeys = ref<string[]>(getDefaultValues()?.halfCheckedKeys)

const expandedKeys = ref<string[]>([])

const checkedColumns = computed<ITableColumn[]>(() => {
  return getCheckedColumns(newColumns.value, [
    ...unref(checkedValues),
    ...unref(_halfCheckedKeys),
  ])
})
const isCheckedAll = computed<boolean>(() => {
  const allKeys = checkedValues.value.length + _halfCheckedKeys.value.length
  return allKeys === computedColumns?.value?.count
})

// TODO: 触发了折叠展开
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
    _halfCheckedKeys.value = []
    emit('change', [], unref(checkedColumns))
  }
}

const onReset = () => {
  checkedValues.value = getDefaultValues()?.checkedKeys
  _halfCheckedKeys.value = getDefaultValues()?.halfCheckedKeys

  emit('change', checkedValues.value, unref(checkedColumns))
}

const allowDrop = (draggingNode: Node, dropNode: Node, type: NodeDropType) => {
  if (type === 'inner') return false
  // 如果不是子节点，层级相同就可以拖拽，如果不是，则判断是在同一个父亲下
  if (!draggingNode?.isLeaf) return dropNode.level === dropNode.level
  if (draggingNode.isLeaf) {
    return (
      dropNode.level === dropNode.level &&
      draggingNode?.parent?.id === dropNode.parent.id
    )
  }
}

const onDrop = (
  draggingNode: Node,
  dropNode: Node,
  _dropType: NodeDropType,
  ev: DragEvent
) => {
  ev.stopPropagation()
  // FIXME: 解决拖拽触发取消选中问题
  treeRef.value!.setCheckedKeys(checkedValues.value)
  const parentKey =
    draggingNode.level !== 1
      ? draggingNode.store?.nodesMap?.[draggingNode.data.label]?.parent?.data
          ?.label
      : ''
  // TODO: 数据处理 columns 排序
  // @ts-ignore
  newColumns.value = getSortableColumns(
    newColumns.value,
    draggingNode.label,
    dropNode.label,
    parentKey
  )
  emit('change', checkedValues.value, newColumns.value)
}

const onNodeExpandChange = (node: Node, isExpand: boolean) => {
  if (isExpand) {
    expandedKeys.value = [...expandedKeys.value, node.label]
  } else {
    expandedKeys.value = expandedKeys.value.filter((v) => v === node.label)
  }
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
