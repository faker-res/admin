import axios from '@/libs/api.request'
// 获取会员查询列表
export const getMemberTableData = data => {
  const { params, query } = data
  let postData = {
    url: 'memberList',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 获取会员等级列表
export const getMemberLevelData = params => {
  let postData = {
    url: 'memberLevelList',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 修改会员状态
export const memberModifyStatus = data => {
  let postData = {
    url: 'memberModifyStatus',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 跳转会员详情
export const memberDetail = data => {
  const { query, params } = data
  let postData = {
    url: 'memberDetail',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 编辑会员
export const memberUpdate = data => {
  let postData = {
    url: 'memberUpdate',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 会员查询 回收第三方余额
export const thirdBalanceRecycle = params => {
  let postData = {
    url: 'thirdBalanceRecycle',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 会员查询 刷新第三方余额
export const refreshThirdBalance = params => {
  let postData = {
    url: 'refreshThirdBalance',
    method: 'get',
    params: params
  }
  return axios.request(postData)
}
// 重置密码
export const memberResetPassword = (data, noShowTip) => {
  let postData = {
    url: 'memberResetPassword',
    method: 'post',
    data
  }
  return axios.request(postData, noShowTip)
}
// 会员加减款
export const memberBalanceHandle = data => {
  let postData = {
    url: 'memberBalanceHandle',
    method: 'post',
    data
  }
  return axios.request(postData)
}

export const getCommonLevelData = () => { }

// 返水等级列表
export const getMemberRefundLevelData = params => {
  let postData = {
    url: 'refundLevelList',
    method: 'get',
    params
  }
  return axios.request(postData)
}

// 返水等级详情
export const getrefundLevelDetailData = params => {
  let postData = {
    url: 'refundLevelDetail',
    method: 'get',
    params
  }
  return axios.request(postData)
}

// 增加返水等级
export const refundLevelCreateData = data => {
  let postData = {
    url: '/refundLevelCreate',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 编辑返水
export const refundLevelUpdateData = data => {
  let postData = {
    url: 'refundLevelUpdate',
    method: 'post',
    data
  }
  return axios.request(postData)
}

// 修改返水状态
export const refundLevelModifyStatus = data => {
  let postData = {
    url: '/refundLevelModifyStatus',
    method: 'post',
    data
  }
  return axios.request(postData)
}

// 银行卡管理列表
export const getbanklist = data => {
  const { params, query } = data
  let postData = {
    url: 'bankCardList',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}

// 显示银行卡号
export const getbankcode = params => {
  let postData = {
    url: 'bankCardDisplay',
    method: 'get',
    params
  }
  return axios.request(postData)
}

// 银行卡修改状态
export const bankCardModifyStatus = data => {
  let postData = {
    url: 'bankCardModifyStatus',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 银行卡删除
export const deletebank = params => {
  let postData = {
    url: 'bankCardDelete',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 银行卡详情
export const getbankdetail = params => {
  let postData = {
    url: 'bankCardDetail',
    method: 'get',
    params
  }
  return axios.request(postData)
}
export const bankCardUpdate = data => {
  let postData = {
    url: 'bankCardUpdate',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 会员修改状态
export const changMemberStatus = data => {
  let postData = {
    url: 'memberLevelModifyStatus',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 会员等级详情
export const getmembershipdetail = params => {
  let postData = {
    url: 'memberLevelDetail',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 会员等级创建
export const memberLevelCreate = data => {
  let postData = {
    url: 'memberLevelCreate',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 会员等级编辑
export const memberLevelUpdate = data => {
  let postData = {
    url: 'memberLevelUpdate',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 批量修改会员等级
export const memberLevelModifyBatch = (data, noShowTip) => {
  let postData = {
    url: 'memberLevelModifyBatch',
    method: 'post',
    data
  }
  return axios.request(postData, noShowTip)
}
// 修改会员等级 查询会员列表
export const searchmemberList = data => {
  const { params, query } = data
  let postData = {
    url: 'soonModifyMemberList',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 会员等级-支付通道详情
export const payMentDetail = params => {
  let postData = {
    url: 'getBoundPaymentChannel',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 会员等级支付设置
export const paymentsetting = data => {
  let postData = {
    url: 'bindingPaymentChannel',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 修改会员等级-批量修改
export const batchmembermodify = data => {
  let postData = {
    url: 'memberLevelModifyBatch',
    method: 'post',
    data
  } 
  return axios.request(postData)
}

// 日志
// 会员操作日志
export const memberHandleLog = data => {
  const { params, query } = data
  let postData = {
    url: '/memberHandleLog',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}

// 会员登录日志
export const memberLoginLog = data => {
  const { params, query } = data
  let postData = {
    url: '/memberLoginLog',
    method: 'post',
    data: params
  }
  if (query) postData.params = query

  return axios.request(postData)
}

// 会员登录日志-历史登录
export const singleMemberHistory = data => {
  const { params, query } = data
  let postData = {
    url: 'singleMemberHistory',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}

// 会员资金日志

export const memberFinanceLog = data => {
  const { params, query } = data
  let postData = {
    url: '/memberFinanceLog',
    method: 'post',
    data: params
  }
  if (query) postData.params = query

  return axios.request(postData)
}
