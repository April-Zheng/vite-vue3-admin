export const omit = (obj: Record<string, any>, paths: string[]) => {
  const copyValue = Object.assign({}, obj)

  paths.forEach((path: string) => {
    delete copyValue[path]
  })
  return copyValue
}
