// 封装本地存储
// 用class类 特性: 封装 多态 继承

class Storage {
  get(key) {
    const value = localStorage.getItem(key)
    try {
      // JSON.parse() 只能转化json格式的字符串
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  set(key, value) {
    if (typeof value === 'object' && value !== null) {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}

export default new Storage()
