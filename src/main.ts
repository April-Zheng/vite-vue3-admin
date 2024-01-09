import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import pinia from './pinia'
import './permission'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.config.globalProperties.$Icons = ElementPlusIconsVue

// for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
//   app.component(key, component)
// }

app.use(pinia).use(router)

app.config.errorHandler = (err, instance) => {
  console.error(err, instance)
}

app.mount('#app')
