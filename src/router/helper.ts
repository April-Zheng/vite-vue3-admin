/**
 * @see https://cn.vitejs.dev/guide/features.html#glob-import
 * 匹配到的文件默认是懒加载的，通过动态加载实现，构建时分离为独立的chunk
 */
import { AsyncComponentLoader } from 'vue'

const components: Record<string, () => Promise<AsyncComponentLoader>> =
  import.meta.glob(['../views/*/*.vue', '../views/*/**/*.vue'])

const getComponentPath = (path: string) => {
  const pt = path?.startsWith('/') ? path.slice(1) : path
  return `../views/${pt}/index.vue`
}

// 是否是路由组件
export const isValidRouteComponent = (path: string) => {
  return !!components[`${getComponentPath(path)}`]
}

const lazyComponent = (path: string) => {
  const curPath = getComponentPath(path)
  return components[`${curPath}`]
}

export default lazyComponent
