## 安装

```bash
npm install element-plus --save
```

## 按需引入

安装插件后，在 vite.config.ts 中加入配置

```bash
npm install -D unplugin-vue-components unplugin-auto-import
```

```ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

## 使用

使用的时候就不需要再 import 组件了，直接使用即可，再次 import 反而出现了样式错误问题
