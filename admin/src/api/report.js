import axios from '@/libs/api.request'

// 平台报表
export const getplatformReportData = data => {
  const { params, query } = data
  let postData = {
    url: '/platformReports',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}

// 平台报表详情
export const getplatformReportsDetailData = data => {
  const { params, query } = data
  let postData = {
    url: '/platformReportsDetail',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}

// 首存报表
export const getfirstReportData = data => {
  const { params, query } = data
  let postData = {
    url: '/firstDepositReports',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}

// 彩票报表
export const getlotteryReportData = data => {
  const { params, query } = data
  let postData = {
    url: '/lotteryReports',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}

// 彩票详情
export const getlotteryReportDetailData = data => {
  const { params, query } = data
  let postData = {
    url: '/lotteryReportsDetail',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}

// 代理报表
export const getAgencyReportData = data => {
  const { params, query } = data
  let postData = {
    url: '/agencyReports',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}

// 会员报表
export const getMemberReportData = data => {
  const { params, query } = data
  let postData = {
    url: '/memberReports',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}

// 游戏记录
export const getgameRecordsDetailData = data => {
  const { params, query } = data
  let postData = {
    url: '/gameRecordsDetail',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 综合报表
export const getmultipleReports = data => {
  let postData = {
    url: '/multipleReports',
    method: 'post',
    data
  }
  return axios.request(postData)
}

// 域名报表 列表数据
export const domainReports = data => {
  const { params, query } = data
  let postData = {
    url: 'domainReports',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 域名报表 按域名
export const domainReportsDetailByDomain = data => {
  const { params, query } = data
  let postData = {
    url: 'domainReportsDetailByDomain',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 域名报表 按人数
export const domainReportsDetailByUser = data => {
  const { params, query } = data
  let postData = {
    url: 'domainReportsDetailByUser',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 现金报表
export const dayReport = data => {
  const { params, query } = data
  let postData = {
    url: 'dayReport',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
