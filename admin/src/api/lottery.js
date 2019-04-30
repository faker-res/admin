import axios from '@/libs/api.request'
// 获取彩票分类列表及对应的数据
export const lotteryNameList = () => {
  let postData = {
    url: 'lotteryNameList',
    method: 'get'
  }
  return axios.request(postData)
}
// 根据跳转来的站点ID和彩票ID获取赔率
export const lotteryOddsSiteId = (data) => {
  const { siteId, lotteryId } = data
  let postData = {
    url: `lotteryOddsSiteidLid/${siteId}/${lotteryId}`,
    method: 'get'
  }
  return axios.request(postData)
}
// 修改赔率
export const lotteryUpdateOddsSiteidLid = ({ id, oddsInfo }) => {
  const data = { id, oddsInfo }
  let postData = {
    url: 'lotteryUpdateOddsSiteidLid',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 香港六合彩 时间设置  列表展示
export const lotteryLhcTimeList = (params) => {
  let postData = {
    url: 'lotteryLhcTimeList',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 其他彩种 时间设置 列表展示
export const lotteryTimeList = (data) => {
  const { params, lid } = data
  let postData = {
    url: `lotteryTimeList/${lid}`,
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 香港六合彩 时间设置 添加期数
export const lotteryLhcTimeAdd = (data) => {
  let postData = {
    url: 'lotteryLhcTimeAdd',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 香港六合彩 时间设置  修改开奖时间
export const lotteryLhcTimeUp = (data) => {
  let postData = {
    url: 'lotteryLhcTimeUp',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 香港六合彩 时间设置 设置开奖号码
export const lotteryLhcAddNum = data => {
  let postData = {
    url: 'lotteryLhcAddNum',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 其他彩种 时间设置 编辑时间
export const lotteryTimeOneUp = (data) => {
  let postData = {
    url: 'lotteryTimeOneUp',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 其他彩种 时间设置 批量修改
export const lotteryTimeUp = (data) => {
  let postData = {
    url: 'lotteryTimeUp',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 开奖管理 修改彩票的开奖结果 官方彩
export const lotteryUpNum = (data) => {
  let postData = {
    url: 'lotteryUpNum',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 开奖管理 修改彩票开奖结果 快速彩
export const lotteryUpNumFast = data => {
  let postData = {
    url: 'lotteryUpNumFast',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 开奖管理 混滚  快速彩
export const lotteryAgainPrizeFast = data => {
  let postData = {
    url: 'lotteryAgainPrizeFast',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 香港六合彩 设置某一条彩票为当前开奖期
export const lotteryLhcTimeSetUp = (data) => {
  let postData = {
    url: 'lotteryLhcTimeSetUp',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 香港六合彩 删除一条开奖记录
export const lotteryLhcTimeDel = (data) => {
  let postData = {
    url: 'lotteryLhcTimeDel',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 开奖管理，获取单彩票开奖记录 官方彩
export const lotteryOpenNumberList = (data) => {
  const { params, query } = data
  let postData = {
    url: 'lotteryOpenNumberList',
    method: 'post',
    data: params,
    query
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 开奖管理 单彩票开奖记录 快速彩
export const lotteryOpenNumberListFast = data => {
  const { params, query } = data
  let postData = {
    url: 'lotteryOpenNumberListFast',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 单条彩票结算
export const lotteryPayMoney = (data) => {
  let postData = {
    url: 'lotteryPayMoney',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 开奖管理 添加彩票开奖结果 官方彩
export const lotteryAddNum = data => {
  let postData = {
    url: 'lotteryAddNum',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 开奖管理 添加彩票开奖结果 快速彩
export const lotteryAddNumFast = data => {
  let postData = {
    url: 'lotteryAddNumFast',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 开奖管理 彩票重开号 官方彩
export const lotteryAgainPrize = (data) => {
  let postData = {
    url: 'lotteryAgainPrize',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 未开奖列表
export const lotteryNoNumLottery = data => {
  let postData = {
    url: 'lotteryNoNumLottery',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 未开奖列表 撤单
export const lotteryRevocation = data => {
  let postData = {
    url: 'lotteryRevocation',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 快速彩票 列表
export const fastLottery = data => {
  let postData = {
    url: 'fastLottery',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 快速彩票 详情
export const fastLotteryDetail = data => {
  const { params, query } = data
  let postData = {
    url: 'fastLotteryDetail',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 快速彩票 初始化
export const fastLotteryInit = data => {
  let postData = {
    url: 'fastLotteryInit',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 快速彩票  配置更新
export const fastLotteryUpdate = data => {
  let postData = {
    url: 'fastLotteryUpdate',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 快速彩票 黑名单列表
export const fastLotteryBlackList = data => {
  const { params, query } = data
  let postData = {
    url: 'fastLotteryBlackList',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 快速彩票 添加至黑名单
export const fastLotteryBlackListAdd = data => {
  let postData = {
    url: 'fastLotteryBlackListAdd',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 快速彩票  移除黑名单
export const fastLotteryBlackListDel = data => {
  let postData = {
    url: 'fastLotteryBlackListDel',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 快速彩票 单站 列表
export const fastLotteryBySite = data => {
  let postData = {
    url: 'fastLotteryBySite',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 快速彩票 单站 开奖结果详情
export const fastLotteryDetailBySite = data => {
  const { params, query } = data
  let postData = {
    url: 'fastLotteryDetailBySite',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 快速彩票 单站 初始化
export const fastLotteryInitBySite = data => {
  let postData = {
    url: 'fastLotteryInitBySite',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 快速彩票 单站 配置更新
export const fastLotteryUpdateBySite = data => {
  let postData = {
    url: 'fastLotteryUpdateBySite',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 快速彩票 全站 修改开奖
export const fastLotteryUpdateOpen = data => {
  let postData = {
    url: 'fastLotteryUpdateOpen',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 快速彩票 单站 修改开奖
export const fastLotteryUpdateOpenBySite = data => {
  let postData = {
    url: 'fastLotteryUpdateOpenBySite',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 快速彩票 单站 提前开奖
export const fastLotteryOpenInitBySite = data => {
  let postData = {
    url: 'fastLotteryOpenInitBySite',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 快速彩票 全站 提前开奖
export const fastLotteryOpenInit = data => {
  let postData = {
    url: 'fastLotteryOpenInit',
    method: 'post',
    data
  }
  return axios.request(postData)
}
