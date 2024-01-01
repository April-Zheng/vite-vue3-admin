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
