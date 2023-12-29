import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import pinia from './pinia'

import './permission'

const app = createApp(App)

app.use(router).use(pinia)

app.config.errorHandler = (err) => {
  console.error(err)
}

app.mount('#app')
