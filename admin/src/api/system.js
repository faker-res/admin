import axios from '@/libs/api.request'

// 站点管理 列表
export const siteManagementList = data => {
  const { params, query } = data
  let postData = {
    url: 'siteManagementList',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
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
// 菜单排序
export const sortMenu = data => {
  let postData = {
    url: '/menuSort',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 菜单删除
export const deleteMenu = data => {
  let postData = {
    url: '/menuDel',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 菜单新增
export const addMenu = data => {
  let postData = {
    url: '/menuAdd',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 菜单编辑
export const updateMenu = data => {
  let postData = {
    url: '/menuUpdate',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 查询uri
export const searchUri = data => {
  let postData = {
    url: '/permissionSearchUri',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 角色列表
export const getPermissionList = data => {
  let postData = {
    url: '/permissionList',
    method: 'get',
    data
  }
  return axios.request(postData)
}
// 角色列表
export const getRoleList = () => {
  let postData = {
    url: '/roleList',
    method: 'get'
  }
  return axios.request(postData)
}
// 角色新增
export const roleAdd = data => {
  let postData = {
    url: '/roleAdd',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 角色编辑
export const roleUpdate = data => {
  let postData = {
    url: '/roleUpdate',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 角色删除
export const roleDel = data => {
  let postData = {
    url: '/roleDel',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 角色详情
export const roleDetail = data => {
  let postData = {
    url: '/roleDetail',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 管理员列表
export const getAdminList = data => {
  const { params, query } = data
  let postData = {
    url: '/adminList',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 管理员详情
export const adminDetail = data => {
  let postData = {
    url: '/adminDetail',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 管理员新增
export const adminAdd = data => {
  let postData = {
    url: '/adminAdd',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 管理员编辑
export const adminUpdate = data => {
  let postData = {
    url: '/adminUpdate',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 管理员删除
export const adminDelete = data => {
  let postData = {
    url: '/adminDelete',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 管理员状态
export const adminModifyStatus = params => {
  let postData = {
    url: '/adminModifyStatus',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 管理员日志列表
export const getAdminLogList = data => {
  const { params, query } = data
  let postData = {
    url: '/adminLogList',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 管理员日志分类
export const adminLogType = data => {
  let postData = {
    url: '/adminLogType',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 站点管理 列表 查看详情
export const siteManagementDetail = params => {
  let postData = {
    url: 'siteManagementDetail',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 站点管理 列表 编辑
export const siteManagementUpdate = data => {
  let postData = {
    url: 'siteManagementUpdate',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 站点管理 列表 添加站点
export const siteManagementCreate = data => {
  let postData = {
    url: 'siteManagementCreate',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 站点管理 获取服务器ID
export const siteManagementDbId = () => {
  let postData = {
    url: 'siteManagementDbId',
    method: 'get'
  }
  return axios.request(postData)
}
// 系统预设 会员等级列表
export const systemMemberLevelList = (data) => {
  const { params, query } = data
  let postData = {
    url: 'systemMemberLevelList',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 系统预设 会员返水等级配置
export const systemMemberRefundLevelList = data => {
  const { params, query } = data
  let postData = {
    url: 'systemMemberRefundLevelList',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 系统预设 添加会员等级
export const systemMemberLevelAdd = data => {
  let postData = {
    url: 'systemMemberLevelAdd',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 系统预设 编辑会员等级
export const systemMemberLevelUp = data => {
  let postData = {
    url: 'systemMemberLevelUp',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 系统预设 会员返水等级添加
export const systemMemberRefundLevelAdd = data => {
  let postData = {
    url: 'systemMemberRefundLevelAdd',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 系统预设 会员返水等级编辑
export const systemMemberRefundLevelUp = data => {
  let postData = {
    url: 'systemMemberRefundLevelUp',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 黑名单列表
export const blackList = params => {
  let postData = {
    url: 'blackList',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 黑名单列表 添加黑名单
export const blackListCreate = data => {
  let postData = {
    url: 'blackListCreate',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 黑名单列表 删除
export const blackListDelete = params => {
  let postData = {
    url: 'blackListDelete',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 活动列表
// export const activityListData = params => {
//   let postData = {
//     url: '',
//     method: '',
//     params
//   }
//   return axios.request(postData)
// }
// 轮播图信息列表
export const getlunboManagement = params => {
  let postData = {
    url: '/slideList',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 轮播信息添加
export const slideIns = (data) => {
  let postData = {
    url: 'slideIns',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 轮播信息编辑
export const slideUpt = (data,noShowTi) => {
  let postData = {
    url: 'slideUpt',
    method: 'post',
    data
  }
  return axios.request(postData,noShowTi)
}
// 轮播信息删除
export const dellunboManagement = params => {
  let postData = {
    url: '/slideDel',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 轮播信息详情
export const slideImgInfo = params => {
  let postData = {
    url: '/slideImgInfo',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 轮播图信息编辑
export const slideImgInfoUpt = (data) => {
  let postData = {
    url: 'slideImgInfoUpt',
    method: 'post',
    data
  }
  return axios.request(postData)
}

// ------------信息中心----------

// ----------- 站内信
// 收件箱
export const inBox = data => {
  const { params, query } = data
  let postData = {
    url: 'inBox',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 发件箱
export const sendBox = data => {
  const { params, query } = data
  let postData = {
    url: 'outBox',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 回复消息
export const letterReply = (data) => {
  let postData = {
    url: 'letterReply',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 发送消息
export const letterSend = (data) => {
  let postData = {
    url: 'letterSend',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 删除消息
export const letterDel = (data) => {
  let postData = {
    url: 'letterDel',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 信息详情
export const letterDetail = params => {
  let postData = {
    url: '/letterDetail',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 更新已读状态
export const letterUptRead = params => {
  let postData = {
    url: '/letterUptRead',
    method: 'get',
    params
  }
  return axios.request(postData)
}

// -----------公告信息
// 公告列表
// export const noticeList = (data) => {
//   let postData = {
//     url: 'noticeList',
//     method: 'post',
//     data
//   }
//   return axios.request(postData)
// }

//弹框列表
export const popupsList = data => {
  const { params, query } = data
  let postData = {
    url: 'popupsList',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 弹框详情
export const popupsDetail = params => {
  let postData = {
    url: 'popupsDetail',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 删除弹框
export const popupsDel = params => {
  let postData = {
    url: '/popupsDel',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 公告状态更新
export const popupsStatusChange = (data) => {
  let postData = {
    url: 'popupsStatusChange',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 添加公告弹幕
export const popupsIns = (data) => {
  let postData = {
    url: 'popupsIns',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 编辑公告弹幕
export const popupsUpt = (data) => {
  let postData = {
    url: 'popupsUpt',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 走马灯列表
export const lanternList = data => {
  const { params, query } = data
  let postData = {
    url: 'lanternList',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 走马灯详情
export const lanternDetail = params => {
  let postData = {
    url: 'lanternDetail',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 删除走马灯
export const lanternDel = params => {
  let postData = {
    url: '/lanternDel',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 走马灯状态更新
export const lanternStatusChange = (data) => {
  let postData = {
    url: 'lanternStatusChange',
    method: 'post',
    data
  }
  return axios.request(postData)
}

// 添加走马灯
export const lanternIns = (data) => {
  let postData = {
    url: 'lanternIns',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 编辑走马灯
export const lanternUpt = (data) => {
  let postData = {
    url: 'lanternUpt',
    method: 'post',
    data
  }
  return axios.request(postData)
}

// 文章列表
export const articleList = data => {
  const { params, query } = data
  let postData = {
    url: 'articleList',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 弹文章详情
export const articleDetail = params => {
  let postData = {
    url: 'articleDetail',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 删除文章
export const articleDel = params => {
  let postData = {
    url: '/articleDel',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 文章状态更新
export const articleStatusChange = (data) => {
  let postData = {
    url: 'articleStatusChange',
    method: 'post',
    data
  }
  return axios.request(postData)
}

// 添加文章
export const articleIns = (data) => {
  let postData = {
    url: 'articleIns',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 编辑文章
export const articleUpt = (data) => {
  let postData = {
    url: 'articleUpt',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// ---------------- 新权限
// 管理员列表
export const adminNewList = data => {
  const { params, query } = data
  let postData = {
    url: 'adminNewList',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
// 管理员密码修改
export const changePassWord = data => {
  let postData = {
    url: 'changePassWord',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 删除管理员
export const adminNewDelete = data => {
  let postData = {
    url: 'adminNewDelete',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 管理员详情
export const adminNewDetail = data => {
  let postData = {
    url: 'adminNewDetail',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 管理员复制
export const copyAdmin = data => {
  let postData = {
    url: 'copyAdmin',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 管理员新增
export const adminNewAdd = data => {
  let postData = {
    url: 'adminNewAdd',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// 管理员编辑
export const adminNewUpdate = data => {
  let postData = {
    url: 'adminNewUpdate',
    method: 'post',
    data
  }
  return axios.request(postData)
}

//活动

//活动列表
export const activityList = data => {
  const { params, query } = data
  let postData = {
    url: 'activityList',
    method: 'post',
    data: params
  }
  if (query) postData.params = query
  return axios.request(postData)
}
//活动添加
export const activityIns= data => {
  let postData = {
    url: 'activityIns',
    method: 'post',
    data
  }
  return axios.request(postData)
}
//活动编辑
export const activityUpt= data => {
  let postData = {
    url: 'activityUpt',
    method: 'post',
    data
  }
  return axios.request(postData)
}
//活动删除
export const activityDel = params => {
  let postData = {
    url: '/activityDel',
    method: 'get',
    params
  }
  return axios.request(postData)
}
//活动详情
export const activityDetail = params => {
  let postData = {
    url: '/activityDetail',
    method: 'get',
    params
  }
  return axios.request(postData)
}
//活动状态设置
export const activityChangeStatus= data => {
  let postData = {
    url: 'activityChangeStatus',
    method: 'post',
    data
  }
  return axios.request(postData)
}
//活动排序
// export const activityDel = params => {
//   let postData = {
//     url: '/activityDel',
//     method: 'get',
//     params
//   }
//   return axios.request(postData)
// }
//活动排序
export const activityBySort = params => {
  let postData = {
    url: '/activityBySort',
    method: 'get',
    params
  }
  return axios.request(postData)
}
//活动分类列表
export const activityCateList = params => {
  let postData = {
    url: '/activityCateList',
    method: 'get',
    params
  }
  return axios.request(postData)
}
//活动分类添加
export const activityCateIns= data => {
  let postData = {
    url: 'activityCateIns',
    method: 'post',
    data
  }
  return axios.request(postData)
}
//活动分类编辑
export const activityCateUpt= data => {
  let postData = {
    url: 'activityCateUpt',
    method: 'post',
    data
  }
  return axios.request(postData)
}
//活动分类删除
export const activityCateDel = params => {
  let postData = {
    url: '/activityCateDel',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// ----------游戏排序------------
//站点游戏排列列表
export  const  systemSiteGameUp =data =>{
  let postData ={
    url:'systemSiteGameUp',
    method: 'post',
    data
  }
  return axios.request(postData)
}
//站点游戏修改排序
export  const  systemSiteGameList =data =>{
  let postData ={
    url:'systemSiteGameList',
    method: 'post',
    data
  }
  return axios.request(postData)
}
// ----------游戏管理------------
export  const  gameConfigList =data =>{
  let postData ={
    url:'gameConfigList',
    method: 'post',
    data
  }
  return axios.request(postData)
}

// 游戏分类列表
export const gameConfigClassification = params => {
  let postData = {
    url: '/gameConfigClassification',
    method: 'get',
    params
  }
  return axios.request(postData)
}
// 游戏维护列表
export const gameConfigUpGameStatus = params => {
  let postData = {
    url: '/gameConfigUpGameStatus',
    method: 'post',
    data: params
  }
  return axios.request(postData)
}
