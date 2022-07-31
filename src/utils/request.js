import store from '@/store'
import axios from 'axios'
// const requset = axios.create({
//   baseURL: 'http://ttapi.research.itcast.cn/',
//   timeout: 3000
// })

const requset = axios.create()
requset.defaults.baseURL = 'http://toutiao.itheima.net'
requset.defaults.timeout = 3000

// 添加请求拦截器
requset.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = store.state.tokenObj.token
    if (token) {
      config.headers.Authorization = 'Bearer' + token
    }

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
export default requset
