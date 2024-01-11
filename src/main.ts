import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './permission'
import router from './router'
import pinia from './pinia'
import { registerDirectives } from '@/directives'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.config.globalProperties.$Icons = ElementPlusIconsVue

// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }

app.use(pinia).use(router)

registerDirectives(app)

app.config.errorHandler = (err) => {
  console.error(err)
}

app.mount('#app')
