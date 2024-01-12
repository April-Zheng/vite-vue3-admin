import { ITableColumn } from './type'

const simpleCopy = (values: ITableColumn[]): ITableColumn[] =>
  JSON.parse(JSON.stringify(values))

// 有hidden字段，说明是被column-setting控制的，没有则是默认的hideInTable
// 没有label的是认为是selection等其他操作列
export const getShowColumns = (columns: ITableColumn[]): ITableColumn[] => {
  return simpleCopy(columns).filter((item) => {
    if (item.children && item.children.length > 0) {
      item.children = getShowColumns(item.children)
    }
    if ('hidden' in item) {
      return !item.hidden || !item.label
    }
    return !('hideInTable' in item && item.hideInTable)
  })
}

export const getAllCanCheckColumns = (
  columns: ITableColumn[],
  map = new Map()
): { columns: ITableColumn[]; count: number } => {
  const result = simpleCopy(columns).filter((item) => {
    if (item.children && item.children.length > 0) {
      return getAllCanCheckColumns(item.children, map)?.columns
    }
    map.set(item, item)
    return !!item.label
  })
  return { columns: result, count: map.size }
}

export interface IDefaultCheckedKeys {
  checkedKeys: string[]
  halfCheckedKeys: string[]
}

export const getCheckedColumnKeys = (
  columns: ITableColumn[],
  // 传false代表不过滤
  filterable = true
): IDefaultCheckedKeys => {
  let checkedKeys: string[] = []
  let halfCheckedKeys: string[] = []

  simpleCopy(columns)
    .filter((item) =>
      filterable ? !('hideInTable' in item && item.hideInTable) : true
    )
    .forEach((item) => {
      if (item.children && item.children.length > 0) {
        const { checkedKeys: childKeys } = getCheckedColumnKeys(
          item.children,
          filterable
        )
        checkedKeys.push(...childKeys)
        if (childKeys.length === item.children.length) {
          checkedKeys.push(item.label)
        } else if (
          childKeys.length > 0 &&
          childKeys.length !== item.children.length
        ) {
          halfCheckedKeys.push(item.label)
        }
      } else {
        checkedKeys.push(item.label)
      }
    })
  return { checkedKeys, halfCheckedKeys }
}

export const getCheckedColumns = (
  columns: ITableColumn[],
  checkedValues: string[]
) => {
  return columns.map((item) => {
    if (item.children && item.children.length > 0) {
      item.children = getCheckedColumns(item.children, checkedValues)
    }
    if (item.label) {
      item.hidden = !checkedValues.includes(item.label)
    }
    return item
  })
}
