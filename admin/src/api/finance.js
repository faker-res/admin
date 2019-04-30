import axios from '@/libs/api.request'
// 在线支付-列表
export const depositOnlineList = data => {
  const { params, query } = data
  let postData = {
    url: 'depositOnlineList',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}

// 公司入款-列表
export const depositOfflineList = data => {
  const { params, query } = data
  let postData = {
    url: 'depositOfflineList',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}

// 存款审核
export const depositAuditData = data => {
  let postData = {
    url: 'depositAudit',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// ------------线上取款-----------

// 线上取款列表
export const withdrawalsListData = data => {
  const { params, query } = data
  let postData = {
    url: 'withdrawalsList',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}

// 线上取款的详情
export const withdrawalsDetail = params => {
  let postData = {
    url: 'withdrawalsDetail',
    method: 'get',
    params
  }
  return axios.request(postData)
}

// 打码详情
export const checkBetAmount = params => {
  let postData = {
    url: 'checkBetAmount',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 提款审核
export const withdrawalsAuditData = data => {
  let postData = {
    url: 'withdrawalsAudit',
    method: 'post',
    data
  }
  return axios.request(postData)
}

// 催账记录
export const emergencyLogListData = data => {
  const { params, query } = data
  let postData = {
    url: 'emergencyRecord',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 第三方游戏转账记录
export const transferLogListData = data => {
  const { params, query } = data
  let postData = {
    url: 'transferRecord',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// ----------入款卡管理 ----------

// 银行卡管理列表
export const companyBankCardListData = data => {
  const { params, query } = data
  let postData = {
    url: 'companyBankCardList',
    method: 'post',
    data: params
  }
  if( query) postData.params = query
  return axios.request(postData)
}

// 银行卡排序
export const companyBankCardSequence = data => {
  let postData = {
    url: 'companyBankCardSequence',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 扫码排序
export const QRCodeSequence = data => {
  let postData = {
    url: 'QRCodeSequence',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 银行卡管理修改状态
export const companyBankCardModifyStatusData = data => {
  let postData = {
    url: 'companyBankCardModifyStatus',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 银行卡管理删除
export const companyBankCardDelete = params => {
  let postData = {
    url: 'companyBankCardDelete',
    method: 'get',
    params
  }
  return axios.request(postData)
}

// 添加银行卡
export const companyBankCardCreate = data => {
  let postData = {
    url: 'companyBankCardCreate',
    method: 'post',
    data
  }
  return axios.request(postData)
}

// 编辑银行卡
export const companyBankCardUpdate = data => {
  let postData = {
    url: 'companyBankCardUpdate',
    method: 'post',
    data
  }
  return axios.request(postData)
}

// 扫码类型
export const paymentClassName = params => {
  let postData = {
    url: 'paymentClassName',
    method: 'get',
    params
  }
  return axios.request(postData)
}

// 扫码-添加
export const QRCodeCreate = data => {
  let postData = {
    url: 'QRCodeCreate',
    method: 'post',
    data
  }
  return axios.request(postData)
}

// 扫码-列表
export const QRCodeList = data => {
  let postData = {
    url: 'QRCodeList',
    method: 'post',
    data
  }
  return axios.request(postData)
}

// 扫码-修改状态
export const QRCodeModifyStatus = data => {
  let postData = {
    url: 'QRCodeModifyStatus',
    method: 'post',
    data
  }
  return axios.request(postData)
}

// 扫码—编辑
export const QRCodeUpdate = data => {
  let postData = {
    url: 'QRCodeUpdate',
    method: 'post',
    data
  }
  return axios.request(postData)
}

// 扫码-删除
export const QRCodeDelete = params => {
  let postData = {
    url: 'QRCodeDelete',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 存取款总汇
export const financeSummaryData = data => {
  const { params, query } = data
  let postData = {
    url: 'financeCollection',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 存取款总汇 二级联动数据
export const financeType = () => {
  let postData = {
    url: 'financeType',
    method: 'get'
  }
  return axios.request(postData)
}

// 支付平台---列表
export const paymentManagerData = data => {
  const { params, query } = data
  let postData = {
    url: 'paymentChannelList',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 支付平台---修改状态
export const changpaymentstatus = data => {
  let postData = {
    url: 'paymentChannelModifyStatus',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 支付平台---删除
export const deletepayment = params => {
  let postData = {
    url: 'paymentChannelDelete',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 支付平台---创建
export const createpayment = data => {
  let postData = {
    url: 'paymentChannelCreate',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 支付平台 - 只显示支付平台名字
export const getpaymentName = params => {
  let postData = {
    url: 'paymentName',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 支付方式 - 只返回ID与名字
export const getpaymentID = params => {
  let postData = {
    url: 'paymentClassName',
    method: 'get',
    params
  }
  return axios.request(postData)
}
//支付平台-详情
export const getpaymentDetail = params => {
  let postData = {
    url: 'paymentChannelDetail',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 支付方式  支付列表
export const paymentClassList = params => {
  let postData = {
    url: 'paymentClassList',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 支付平台--编辑
export const updatepayment = data => {
  let postData = {
    url: 'paymentChannelUpdate',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 支付方式 状态停启用
export const paymentClassModifyStatus = data => {
  let postData = {
    url: 'paymentClassModifyStatus',
    method: 'post',
    data
  }
  return axios.request(postData)
}

// 支付方式 编辑
export const paymentClassUpdate = data => {
  let postData = {
    url: 'paymentClassUpdate',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 支付方式 添加
export const paymentClassCreate = data => {
  let postData = {
    url: 'paymentClassCreate',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 支付方式 删除
export const paymentClassDelete = params => {
  let postData = {
    url: 'paymentClassDelete',
    method: 'get',
    params
  }
  return axios.request(postData)
}