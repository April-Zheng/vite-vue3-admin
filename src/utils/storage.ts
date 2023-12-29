const Cookie = {
  /**
   * 设置cookie
   * @param name cookie的名称
   * @param value cookie的值
   * @param day cookie的过期时间
   */
  setItem: (name: string, value: string, day?: number) => {
    if (day && day !== 0) {
      //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
      var expires = day * 24 * 60 * 60 * 1000
      var date = new Date(+new Date() + expires)
      document.cookie =
        name + '=' + escape(value) + ';expires=' + date.toUTCString()
    } else {
      document.cookie = name + '=' + escape(value)
    }
  },

  /**
   * 获取对应名称的cookie
   * @param name cookie的名称
   * @returns {null} 不存在时，返回null
   */
  getItem: (name: string) => {
    var arr
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if ((arr = document.cookie.match(reg))) return unescape(arr[2])
    else return null
  },

  // 将cookie的过期时间设置为过去或者将值设为空
  removeItem: (name: string) => {
    Cookie.setItem(name, '')
  },
}

const Storage = {
  setItem: (name: string, value: any) => {
    const storageValue =
      typeof value === 'object' ? JSON.stringify(value) : value
    localStorage.setItem(name, storageValue)
  },
  getItem: (name: string) => {
    const storageValue = localStorage.getItem(name)
    if (!storageValue) return null
    let value
    try {
      value = JSON.parse(storageValue)
    } catch (error) {
      value = storageValue
    }
    return value
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name)
  },
}

export { Cookie, Storage }
