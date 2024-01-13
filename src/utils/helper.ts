export const omit = (obj: Record<string, any>, paths: string[]): any => {
  const copyValue = Object.assign({}, obj)

  paths.forEach((path: string) => {
    delete copyValue[path]
  })
  return copyValue
}

export const get = (
  obj: Record<string, any>,
  path: string,
  defaultValue?: any
) => {
  const paths = path.split('.')

  const res = paths.reduce((pre, cur) => {
    return pre?.[cur]
  }, obj)

  return res || defaultValue
}
