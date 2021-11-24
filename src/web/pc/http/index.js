import store from '@pc/store'
import logout from '@pc/utils/logout'
import axios from 'axios'
import { Message } from 'element-ui'

const token = sessionStorage.getItem('token') || ''
const http = axios.create({
  baseURL: process.env.VUE_APP_API_HOST + process.env.VUE_APP_API_SUFFIX,
  timeout: 20000,
  headers: {
    access_token: token,
    terminal_type: 'pc'
  }
})

http.interceptors.request.use(function (config) {
  store.commit('SET_LOADING', true)

  return config
}, function (error) {
  return Promise.reject(error)
})

http.interceptors.response.use(function (response) {
  store.commit('SET_LOADING', false)

  const { code, msg } = response.data

  if (code === 403) return logout()

  if (code !== 200 && code !== 201) {
    Message.error(msg)
    return Promise.reject(msg)
  }

  return response.data
}, function (error) {
  store.commit('SET_LOADING', false)

  Message.error('请求似乎出现了错误，请重试~')
  return Promise.reject(error)
})

export default http
