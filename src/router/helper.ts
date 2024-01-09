/**
 * @see https://cn.vitejs.dev/guide/features.html#glob-import
 * 匹配到的文件默认是懒加载的，通过动态加载实现，构建时分离为独立的chunk
 *
 * BUG: 动态导入的原因？？
 * 导致部署到github page 总是报错【Failed to fetch dynamically imported module】
 *
 * 加上async await之后前两个路由可以，后续路由还是不行
 * 换成defineAsyncComponent 还是没解决问题 同上👆 且本地开发控制台提示
 * Component "default" in record with path "/system/permission" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".
 *
 * 看到有人说是setup语法糖引起的问题，试试修改为选项式API 也是不行
 */

import { AsyncComponentLoader, defineAsyncComponent } from 'vue'
import { ElLoading } from 'element-plus'
import ErrorBoundary from '../components/ErrorBoundary/index.vue'

const staticComponents: Record<string, () => Promise<any>> = {
  '/components/proForm': () => import('../views/components/proForm/index.vue'),
  '/components/proTable': () =>
    import('../views/components/proTable/index.vue'),
  '/components/queryFilter': () =>
    import('../views/components/queryFilter/index.vue'),
}

const components: Record<string, () => Promise<AsyncComponentLoader>> =
  import.meta.glob(['../views/*/*.vue', '../views/*/**/*.vue'])

const getComponentPath = (path: string) =>
  path?.startsWith('/') ? path.slice(1) : path

export const isRouteComponent = (path: string) =>
  !!components[`../views/${getComponentPath(path)}`]

const lazyComponent = (path: string): AsyncComponentLoader => {
  if (staticComponents[path]) {
    return staticComponents[path]
  }
  const curPath = getComponentPath(path)

  return defineAsyncComponent({
    loader: components[`../views/${curPath}`],
    errorComponent: ErrorBoundary,
    loadingComponent: ElLoading,
  })

  // return components[`../views/${curPath}`]
}

export default lazyComponent
