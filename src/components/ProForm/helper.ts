export const transform2ElCompName = (name: string) => {
  let result = name.replace(/[A-Z]/g, function (i) {
    return '-' + i.toLowerCase()
  })
  //如果首字母是大写，执行replace时会多一个_，需要去掉
  if (result.slice(0, 1) === '-') {
    result = result.slice(1)
  }
  return `el-${result}`
}

export const omitUndefined = (obj: Record<string, any>) => {
  const newObj: Record<string, any> = {}
  Object.keys(obj || {}).forEach((key: string) => {
    if (obj[key] !== undefined) {
      newObj[key] = obj[key]
    }
  })
  if (Object.keys(newObj).length < 1) {
    return undefined as any
  }
  return newObj
}
