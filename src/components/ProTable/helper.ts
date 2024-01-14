import { ITableColumn } from './type'

const simpleCopy = (values: ITableColumn[]): ITableColumn[] =>
  JSON.parse(JSON.stringify(values))

// 有hidden字段，说明是被column-setting控制的，没有则是默认的hideInTable
// 没有label的是认为是selection等其他操作列
export const getShowColumns = (columns: ITableColumn[]): ITableColumn[] => {
  return simpleCopy(columns)
    .map((item, index) => ({ ...item, order: index + 1 }))
    ?.sort((a, b) => a.order - b.order)
    .filter((item) => {
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
    if (item.label) {
      map.set(item, item)
    }
    if (item.children && item.children.length > 0) {
      return getAllCanCheckColumns(item.children, map)?.columns
    }
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
        if (item.children.every((child) => childKeys.includes(child.label))) {
          checkedKeys.push(item.label)
        } else if (
          item.children.some((child) => childKeys.includes(child.label))
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

const getNode = (columns: ITableColumn[], key: string) => {
  let result: any = []
  for (let i = 0; i < columns.length; i++) {
    const element = columns[i]
    if (element.label === key) {
      result = [element, i]
      return result
    }
  }
}

export const getSortableColumns = (
  oldColumns: ITableColumn[],
  dragKey: string,
  dropKey: string,
  parentKey
) => {
  const [data] = getNode(oldColumns, dragKey) || []
  if (!parentKey) {
    let columns = oldColumns.filter((item) => item.label !== dragKey)
    const [_dropData, dropIndex] = getNode(oldColumns, dropKey) || []
    columns.splice(dropIndex as number, 0, data as ITableColumn)
    return columns
  } else {
    const newColumns = oldColumns.map((item) => {
      if (item.children && item.children?.length > 0) {
        item.children = getSortableColumns(
          item.children,
          dragKey,
          dropKey,
          item.label !== parentKey ? parentKey : ''
        )
      }
      return item
    })
    return newColumns
  }
}
