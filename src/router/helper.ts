/**
 * @see https://cn.vitejs.dev/guide/features.html#glob-import
 * 匹配到的文件默认是懒加载的，通过动态加载实现，构建时分离为独立的chunk
 *
 * BUG: 动态导入的原因？？
 * 导致部署到github page 总是报错【Failed to fetch dynamically imported module】
 */

const components = import.meta.glob(['../views/*/*.vue', '../views/*/**/*.vue'])

const lazyComponent = async (path: string) => {
  const curPath = path?.startsWith('/') ? path.slice(1) : path
  return await components[`../views/${curPath}`]
}

export default lazyComponent
