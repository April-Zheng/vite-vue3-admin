import { App } from 'vue'
import throttle from './ throttle'
import permission from './permission'

const directives: Record<string, any> = {
  throttle,
  permission,
}

export const registerDirectives = (app: App) => {
  Object.keys(directives).forEach((key) => {
    app.directive(key, directives[key])
  })
}

export default directives
