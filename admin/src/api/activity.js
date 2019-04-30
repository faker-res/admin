import axios from '@/libs/api.request'
//   活动黑名单

// 优惠活动黑名单列表
export const blackListShow = data => {
  const { params, query } = data
  let postData = {
    url: 'Preferential/blackListShow',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 活动类型下拉数据
export const preferentialList = data => {
  let postData = {
    url: 'Preferential/preferentialList',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 添加黑名单接口
export const addtoBlackList = data => {
  let postData = {
    url: '/Preferential/addtoBlackList',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 移除黑名单
export const removeBlackList = data => {
  let postData = {
    url: 'Preferential/removeBlackList',
    method: 'post',
    data
  }
  return axios.request(postData)
}
