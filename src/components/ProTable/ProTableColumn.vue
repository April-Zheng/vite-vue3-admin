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
        >
          <template v-for="(_, slot) in $slots" :key="slot" #[slot]="slotScope">
            <slot :name="slot" v-bind="slotScope" />
          </template>
        </pro-table-column>
      </template>
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
import { defineProps } from 'vue'

defineProps(['column'])
</script>
<style scoped></style>
