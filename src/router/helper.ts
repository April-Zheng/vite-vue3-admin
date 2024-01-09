/**
 * @see https://cn.vitejs.dev/guide/features.html#glob-import
 * 匹配到的文件默认是懒加载的，通过动态加载实现，构建时分离为独立的chunk
 *
 * BUG: 动态导入的原因？？
 * 导致部署到github page 总是报错【Failed to fetch dynamically imported module】
 *
 * 加上async await之后前两个路由可以，后续路由还是不行
 */

import { AsyncComponentLoader, defineAsyncComponent } from 'vue'
import ErrorPage from '../components/ErrorPage/index.vue'

const components: Record<string, () => Promise<AsyncComponentLoader>> =
  import.meta.glob(['../views/*/*.vue', '../views/*/**/*.vue'])

const lazyComponent = (path: string) => {
  const curPath = path?.startsWith('/') ? path.slice(1) : path
  return defineAsyncComponent({
    loader: components[`../views/${curPath}`],
    errorComponent: ErrorPage,
  })
}

export default lazyComponent
