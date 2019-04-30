/* eslint-disable space-before-function-paren */
/* eslint-disable no-undef */
import axios from 'axios'
import { getToken, isTokenExpired } from '@/libs/util'
import router from '@/router'
import vm from '../main'
import store from '@/store'
import qs from 'qs'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.timeout = 30000

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      if (config.method === 'get') {
        config.params = {
          ...config.params,
          _t: new Date().getTime()
        }
      }
      if (router.currentRoute.name !== 'login') {
        setHeaders(config)
      } else {
        // 针对menuList接口特殊处理
        // if (config.url.includes('menuList')) setHeaders(config)
        if (config.url.includes('getNavigateBar')) setHeaders(config)
      }
      function setHeaders(config) {
        if (isTokenExpired() || !getToken()) {
          vm.$Tip.info({ content: '异常下线，请重新登录' })
          store.dispatch('handleLogOut')
          setTimeout(() => {
            router.push({ name: 'login' })
          }, 500)
          return false
        }
        config.headers.Authorization = getToken()
        config.transformRequest = [function (data) {
          // 解决post请求的问题，用qs进行转换
          return qs.stringify(data)
        }]
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      vm.endTableLoading()
      vm.endEditLoading()
      res = res.data

      if (res.code === 200) {
        if (typeof res.data === 'string' && !instance.noShowTip) {
          // 全局的添加/修改/删除的提示，页面不需要做提示
          // vm.$Message.success(res.data)
          vm.$Tip.success({ content: res.data })
        }
        return res
      } else if (res.code === 300) {
        vm.$Tip.info({ content: res.message })
        store.dispatch('handleLogOut')
        // } else if (res.code === 304) {
        //   vm.$Tip.error({ content: res.message })
        //   store.dispatch('handleLogOut')
      } else if (res.code === 400) {
        vm.$Tip.info({ content: res.message })
      } else if (res.code === 401) {
        vm.$Tip.info({ content: res.message })
        setTimeout(() => {
          router.push({ name: 'error_401' })
        }, 500)
      } else if (res.code === 404) {
        vm.$Tip.info({ content: res.message })
        // setTimeout(() => {
        //   router.push({ name: 'error_404' })
        // }, 500)
      } else if (res.code === 500) {
        vm.$Tip.info({ content: res.message })
        // setTimeout(() => {
        //   router.push({ name: 'error_500' })
        // }, 500)
      } else if (res.code === 5003) {
        vm.$Tip.info({ content: '账号异常登录，请重新登录' })
        store.dispatch('handleLogOut')
      }
    }, error => {
      const { message } = error.response.data
      vm.$Tip.info({ content: message })
      vm.endTableLoading()
      vm.endEditLoading()
      return Promise.reject(error)
    })
  }
  request(options, noShowTip) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    instance.noShowTip = noShowTip
    return instance(options)
  }
}
export default HttpRequest
