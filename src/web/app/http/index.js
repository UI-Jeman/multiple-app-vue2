import { token, logout } from '@app/utils';
import { Toast } from 'vant';
import axios from 'axios'
const http = axios.create({
  baseURL: process.env.VUE_APP_API_HOST + process.env.VUE_APP_API_SUFFIX,
  timeout: 3000,
  headers: {
    access_token: token.get(),
    terminal_type: 'mobile'
  }
})

http.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
  const { code, msg } = response.data

  if (code === 403) return logout()
  if (code !== 200 && code !== 201) {
    // Toast.fail(msg)
    return Promise.reject(msg)
  }

  return response.data
}, function (error) {
  Toast.fail("服务器异常")
  return Promise.reject(error)
})

export default http







