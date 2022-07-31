import axios from 'axios'
// const requset = axios.create({
//   baseURL: 'http://ttapi.research.itcast.cn/',
//   timeout: 3000
// })

const requset = axios.create()
requset.defaults.baseURL = 'http://toutiao.itheima.net'
requset.defaults.timeout = 3000

export default requset
