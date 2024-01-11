// 节流自定义指令
/**
 * @see https://cn.vuejs.org/guide/reusability/custom-directives.html
 * el 指令绑定的对象，可以操作dom
 * binding binding.value 传递给指令的值
 * binding.arg v-throttle:arg 指令参数
 */

const throttle = (fn: Function, delay: number) => {
  let timerId: any = null

  const handler = (...params: any) => {
    if (timerId) return

    timerId = setTimeout(() => {
      fn?.(...params)
      clearTimeout(timerId)
      timerId = null
    }, delay)
  }

  return [handler, timerId]
}

/**
 * TODO: 组件的emit事件怎么处理？
 */
export default {
  beforeMount(
    el: any,
    binding: {
      instance: any
      arg: any
      modifiers: any
      value: { fn: any; delay?: 300 | undefined; arg: any }
    }
  ) {
    const { fn, delay = 300 } = binding.value
    if (!binding.arg || typeof fn !== 'function') {
      console.warn(
        `v-throttle使用错误，请使用 v-throttle:event='{fn: fnName,delay: 300}'的形式`
      )
      return
    }
    const [handler, timer] = throttle(fn, delay)
    el._handle = handler
    el._timer = timer
    el.addEventListener(binding.arg, el._handle)
  },

  beforeUnmount(
    el: any,
    binding: {
      arg: any
    }
  ) {
    el.removeEventListener(binding.arg, el._handle)
    clearTimeout(el._timer)
    el._timer = null
  },
}
