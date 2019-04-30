/* eslint-disable camelcase */
import axios from '@/libs/api.request'

export const login = ({ userName, password, token }) => {
  const data = {
    userName,
    password,
    token
  }
  return axios.request({
    url: '/adminLogin',
    data,
    method: 'post'
  })
}

export const logout = (data, noShowTip) => {
  return axios.request({
    url: '/adminLogout',
    method: 'get',
    data
  }, noShowTip)
}

// 修改管理员密码
export const adminResetPassword = data => {
  let postData = {
    url: 'adminResetPassword',
    method: 'post',
    data
  }
  return axios.request(postData)
}
