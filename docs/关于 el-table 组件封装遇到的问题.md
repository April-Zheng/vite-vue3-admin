# 关于 el-table 组件封装遇到的问题

## 透传 el-table 事件

使用[$attrs](https://cn.vuejs.org/api/component-instance.html#attrs)由父组件传入，且没有被子组件声明为 props 或是组件自定义事件的 attributes 和事件处理函数。

## defineExpose undefined 问题

封装一个 table 组件，想把 el-table 的 ref 事件一起暴露出去使用

但是在组件 onMounted 中 log，ref 始终为 undefined，甚至组件内部的 ref 响应式数据也是空的

```vue
<script setup lang="ts" generic="T">
const tableRef = ref()
const tableData = ref<T[]>([])

defineExpose({
  ...(tableRef.value || {}),
  tableData: tableData.value,
})
</script>
```

```vue
<pro-table
  ref="tableRef"
  row-key="inspectionId"
  :columns="columns"
  @request="request"
  @selection-change="handleTableEvent"
  @sort-change="handleTableEvent"
>
</pro-table>
<script setup lang="ts">
const tableRef = ref()

onMounted(() => {
  // 打印出来只有tableData 是个空数组
  console.log(tableRef.value)
})
</script>
```

### 尝试另外封装事件暴露出去 将 dispatchElTableEvent 暴露出去调用

```ts
const dispatchElTableEvent = (key: string, ...args: any) => {
  if (Reflect.has(tableRef.value, key)) {
    const fn = Reflect.get(tableRef.value, key)
    nextTick(() => {
      fn(...args)
    }).catch((e) => {
      console.log(e)
    })
  } else {
    console.warn(`el-table 没有${key}事件，请检查是否拼写错误`)
  }
}
```

### 出现问题：

- 在 onMounted 调用且不用 nextTick
  - toggleAllSelection 成功
  - sort/toggleRowSelection 失败
- 在 onMounted 调用且使用 nextTick
  - sort/toggleAllSelection 成功
  - toggleRowSelection 不论是静态数据还是动态数据都失败
    控制台报错
    TypeError: Cannot read properties of undefined (reading 'children')
    at toggleStatus (chunk-ZYPT3ADG.js?v=9e31dd1f:44417:21)
    at toggleRowStatus (chunk-ZYPT3ADG.js?v=9e31dd1f:44425:7)
    at Object.toggleRowSelection (chunk-ZYPT3ADG.js?v=9e31dd1f:45110:21)
    at toggleRowSelection (chunk-ZYPT3ADG.js?v=9e31dd1f:47314:11)
    at index.vue:178:7
- 跟在 request 的 cb 后面就可以正确执行

## table 渲染 数据乱序问题

由上面的问题发现 table 的渲染顺序是乱的，加上了 row-key 和 current-row-key 都没有按照 mock 接口返回的数据顺序渲染

_这是第二天_

突然发现数据顺序正常了

## 用 el-tree 封装动态列设置

设置了 check-on-click-node 点击文本也能选中，但是此时触发了折叠展开，

看文档设置 expand-on-click-node 为 false 没生效

加上拖拽功能后，拖拽也会触发折叠展开

只能通过控制 default-expanded-keys 来解决，需要额外的添加事件控制

```vue
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
```
