import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import { createHtmlPlugin } from 'vite-plugin-html'
import path from 'path'
const pkg = require('./package.json')

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? `/${pkg.name}` : './',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    viteMockServe({
      mockPath: 'mock', // mock文件存放的位置
      logger: true,
      prodEnabled: true,
      injectCode: ` 
          import { setupProdMockServer } from './mock-prod-server';
          setupProdMockServer();
        `,
    }),
    createHtmlPlugin({
      inject: {
        data: {
          name: pkg.name,
          version: pkg.version,
          buildTime: new Date().toLocaleString(),
        },
      },
    }),
  ],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
})
