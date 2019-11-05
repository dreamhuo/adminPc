// 引入 axios
import axios from 'axios'
// 引入 store
import store from '@/store'
// import { Spin } from 'iview'

// 错误收集方法
const addErrorLog = errorInfo => {
  const { statusText, status, request: { responseURL } } = errorInfo
  let info = {
    type: 'ajax', // 错误类型，是ajax错误
    code: status, // 错误状态码
    mes: statusText, // 错误信息
    url: responseURL // 错误url地址
  }
  // includes() 方法用来判断一个数组是否包含一个指定的值
  // 若当前 url 中包含 save_error_logger ， 则调用 store.dispatch 异步存到 vuex 里
  // 存到 vuex 里只是为了在错误面板页可以看到错误
  if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
}

// 为 ajax 请求定义一个 HttpRequest 类
// 参数： baseURL
class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  destroy (url) {
    // 删除当前队列
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      // 当前队列中没有，则显示 正在加载动画，有队列说明已经正在显示加载动画
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true // 将当前请求 url 缓存进队列
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      // 响应回来了，删除URL; 关闭正在加载效果
      this.destroy(url)
      const { data, status } = res
      return { data, status }
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      addErrorLog(errorInfo)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
