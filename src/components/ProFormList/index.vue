<template>
  <el-form-item ref="formItem" :prop="prop" :label="label" v-bind="$attrs">
    <template #label>
      <form-item-label :label="label" :tooltip="tooltip"></form-item-label>
    </template>
    <template #default>
      <div class="pro-form-list__content">
        <el-space
          v-for="(value, index) in values"
          class="pro-form-list__item"
          :key="index"
          :size="12"
          wrap
        >
          <pro-form-item
            v-for="field in fields"
            :key="field.prop"
            :rules="rules?.[field.prop] || [] as any"
            :field="field"
            :prop="`${prop}.${index}.${field.prop}`"
            v-model="value[field.prop]"
          >
          </pro-form-item>
          <slot name="actions" v-bind="{ index, value }">
            <div class="pro-form-list__item--right">
              <el-button
                :loading="copyLoading"
                v-if="copyProps"
                v-bind="copyProps"
                @click="onCopy(index)"
              >
                {{ copyProps?.btnText || '复制' }}
              </el-button>
              <el-button
                :loading="deleteLoading"
                v-if="deleteProps"
                v-bind="deleteProps"
                @click="onDelete(index)"
              >
                {{ deleteProps?.btnText || '删除' }}
              </el-button>
            </div>
          </slot>
        </el-space>
      </div>
      <slot name="creator" v-if="creatorProps">
        <el-button
          :loading="addLoading"
          class="pro-form-list__creator"
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
  </el-form-item>
</template>

<script setup lang="ts" generic="T extends Record<string,any>">
import { defineProps, ref, defineEmits, watch, unref } from 'vue'
import ProFormItem from '../ProForm/FormItem.vue'
import FormItemLabel from '../ProForm/FormItemLabel.vue'
import type { IProFromListProps, IProFormListEmit } from './type'

//TODO: 没有支持嵌套
const props = withDefaults(defineProps<IProFromListProps<T>>(), {
  creatorProps: {
    // @ts-ignore
    btnText: '添加一行数据',
  },
  // @ts-ignore
  copyProps: { link: true },
  deleteProps: {
    // @ts-ignore
    type: 'danger',
    link: true,
  },
})

const emit = defineEmits<IProFormListEmit<T>>()

const values = ref<T[]>(props.modelValue || [])

const formItem = ref()
const copyLoading = ref(false)
const deleteLoading = ref(false)
const addLoading = ref(false)

watch(values.value, () => {
  unref(formItem)?.validate('change')
  emit('update:modelValue', values.value as T[])
})

const addRecord = async (record, index, type, preventDefault) => {
  if (props.max && values.value?.length >= props.max) return
  if (props.actionGuard?.beforeAddRow) {
    type === 'copy' ? (copyLoading.value = true) : (addLoading.value = true)
    const success = await props.actionGuard?.beforeAddRow?.(record, index)
    type === 'copy' ? (copyLoading.value = false) : (addLoading.value = false)
    if (!success) return
  }
  emit(type, record, index)
  if (preventDefault) return
  if (type === 'copy') {
    values.value!.splice(index, 0, record)
  } else {
    values.value.push(record)
  }
}

const onCopy = (index: number) => {
  const copyRecord = values.value?.[index]
  addRecord(copyRecord, index, 'copy', props.copyProps?.preventDefault)
}

const onDelete = async (index) => {
  if (props.min && values.value?.length <= props.min) return

  const deleteRow = values.value?.[index] as T

  if (props.actionGuard?.beforeDeleteRow) {
    deleteLoading.value = true
    const success = await props.actionGuard?.beforeDeleteRow?.(deleteRow, index)
    deleteLoading.value = false
    if (!success) return
  }

  emit('delete', deleteRow, index)
  if (props.deleteProps?.preventDefault) return
  values.value!.splice(index, 1)
}

const onAdd = async () => {
  const newRecord = props.fields?.reduce((pre, cur) => {
    if (!cur.prop) {
      return pre
    }
    return {
      ...pre,
      // @ts-ignore
      [cur.prop]: props.creatorProps?.defaultRecord?.[cur.prop] || '',
    }
  }, {})

  addRecord(
    newRecord,
    values.value.length,
    'add',
    props.creatorProps?.preventDefault
  )
}
</script>
<style scoped lang="scss">
.pro-form-list__content {
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.pro-form-list__creator {
  margin-top: 16px;
  background: #ffffff;
  border-color: #d9d9d9;
  color: rgba(42, 46, 54, 0.88);
  box-shadow: 0 2px 0 rgba(42, 46, 54, 0.02);
  border-style: dashed;
  width: 100%;
}
</style>
