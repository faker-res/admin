import axios from '@/libs/api.request'

// 通用接口

// 游戏分类下拉列表
export const getgameClassData = data => {
  let postData = {
    url: '/gameSelect',
    method: 'get',
    data
  }
  return axios.request(postData)
}

// 彩票分类接口
export const getlotteryClassData = data => {
  let postData = {
    url: '/lotteryClass',
    method: 'get',
    data
  }
  return axios.request(postData)
}

// 第三方平台列表
export const platformCodeListData = data => {
  let postData = {
    url: '/platformCodeList',
    method: 'get',
    data
  }
  return axios.request(postData)
}

// 上传图片
export const uploadImg = data => {
  let postData = {
    url: 'uploadImg',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 获取空彩票返点列表
export const emptyRebateList = () => {
  let postData = {
    url: 'emptyRebateList',
    method: 'get'
  }
  return axios.request(postData)
}
// 获取空的彩票返水数据
export const agencyPlatform = data => {
  let postData = {
    url: 'agencyPlatform',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 菜单列表
export const getMenuList = (data) => {
  let postData = {
    url: '/menuList',
    method: 'get',
    data
  }
  return axios.request(postData)
}
// 管理员日志下拉
export const adminLogType = data => {
  let postData = {
    url: '/adminLogType',
    method: 'get',
    data
  }
  return axios.request(postData)
}

// 支付平台名称列表
export const paymentName = params => {
  let postData = {
    url: '/paymentName',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 右上角消息提示
export const remind = (params) => {
  let postData = {
    url: 'remind',
    method: 'get',
    params
  }
  return axios.request(postData)
}

// 公司入款——存入账户
export const storeBankNQRCode = params => {
  let postData = {
    url: 'storeBankNQRCode',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 获取用户对应的菜单权限
export const getNavigateBar = params => {
  let postData = {
    url: 'getNavigateBar',
    method: 'get',
    params
  }
  return axios.request(postData)
}
