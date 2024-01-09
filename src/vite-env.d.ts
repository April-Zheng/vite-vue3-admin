/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<typeof DefineComponent>
  export default component

  interface ComponentCustomProperties {
    $Icons: any
  }
}

declare module '*.svg'
declare module 'element-plus/dist/locale/zh-cn.mjs'
declare module 'element-plus/dist/locale/en.mjs'
