/**
 * @see https://cn.vitejs.dev/guide/features.html#glob-import
 * 匹配到的文件默认是懒加载的，通过动态加载实现，构建时分离为独立的chunk
 */

const components = import.meta.glob('../views/*/*.vue')

const lazyComponent = (path: string) => components[`../views/${path}`]

export default lazyComponent
