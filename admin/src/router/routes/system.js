const system = {
  path: '/system',
  name: 'system',
  meta: {
    title: '系统管理',
    hideInMenu: true,
    hideInTop: false
  },
  component: () => import('@/components/main'),
  redirect: { name: 'authManagement' },
  newChild: [],
  children: [{
    path: 'domainManagement',
    name: 'domainManagement',
    uri: 'api/v2/agencyDomainManage',
    parentKey: 'system',
    routeKey: 'domain',
    meta: {
      title: '域名管理',
      icon: 'yumingguanli'
    },
    component: () =>
      import('@/views/system/parent'),
    redirect: { name: 'agencyDomain' },
    newChild: [],
    children: [{
      path: 'agencyDomain',
      name: 'agencyDomain',
      uri: 'api/v2/agencyDomainList',
      routeKey: 'agencyDomain',
      parentKey: 'domain',
      meta: {
        title: '代理域名',
        icon: 'cebianlandailiyuming1'
      },
      component: () =>
        import('@/views/system/domainManagement/agencyDomain')
    },
    {
      path: 'addDomain/:page?',
      name: 'addDomain',
      parentKey: 'domain',
      meta: {
        title: '添加域名',
        hideInMenu: true
        // notCache: true
      },
      component: () => import('@/views/system/domainManagement/domainAdd')
    },
    {
      path: 'editDomain/:page?',
      name: 'editDomain',
      parentKey: 'domain',
      meta: {
        title: '编辑域名',
        hideInMenu: true
      },
      component: () => import('@/views/system/domainManagement/domainEdit')
    }]
  },
  {
    path: 'authManagement',
    name: 'authManagement',
    uri: 'api/admin/group_update',
    routeKey: 'authManagement',
    parentKey: 'system',
    meta: {
      title: '权限管理',
      icon: 'quanxian'
    },
    component: () =>
      import('@/views/system/parent'),
    redirect: { name: 'menu' },
    newChild: [],
    children: [{
      path: 'menu',
      name: 'menu',
      uri: 'api/v2/roleList',
      parentKey: 'authManagement',
      meta: {
        title: '菜单管理',
        icon: 'caidanguanliicon'
      },
      component: () =>
        import('@/views/system/authManagement/menu')
    },
    {
      path: 'role',
      name: 'role',
      uri: 'api/role/list',
      parentKey: 'authManagement',
      meta: {
        title: '角色管理',
        icon: 'jiaoseguanli'
      },
      component: () =>
        import('@/views/system/authManagement/role')
    },
    {
      path: 'role/:page?',
      name: 'roleEdit',
      parentKey: 'authManagement',
      meta: {
        title: '编辑角色',
        hideInMenu: true
      },
      component: () =>
        import('@/views/system/authManagement/roleEdit'),
      beforeEnter: (to, from, next) => {
        to.meta.title = to.params.page === 'edit' ? '编辑角色' : '添加角色'
        next()
      }
    },
    {
      path: 'admin',
      name: 'admin',
      uri: 'api/v2/adminList',
      parentKey: 'authManagement',
      routeKey: 'admin',
      meta: {
        title: '管理员列表',
        icon: 'guanliyuanliebiao'
      },
      component: () =>
        import('@/views/system/authManagement/admin')
    },
    {
      path: 'admin/:page?',
      parentKey: 'authManagement',
      name: 'adminEdit',
      meta: {
        title: '编辑管理员',
        hideInMenu: true
      },
      component: () =>
        import('@/views/system/authManagement/adminEdit'),
      beforeEnter: (to, from, next) => {
        to.meta.title = to.params.page === 'edit' ? '编辑管理员' : '添加管理员'
        next()
      }
    },
    {
      path: 'adminLog',
      name: 'adminLog',
      uri: 'api/v2/adminLogList',
      routeKey: 'adminLog',
      parentKey: 'authManagement',
      meta: {
        title: '管理员日志',
        icon: 'guanliyuanrizhi'
      },
      component: () =>
        import('@/views/system/authManagement/adminLog')
    }
    ]
  },
  {
    path: 'siteManagement',
    name: 'siteManagement',
    uri: 'api/v2/systemMemberLevelAdd',
    routeKey: 'siteManagement',
    parentKey: 'system',
    meta: {
      title: '站点管理',
      icon: 'zhandianguanli'
    },
    component: () =>
      import('@/views/system/parent'),
    redirect: { name: 'siteList' },
    newChild: [],
    children: [{
      path: 'siteList',
      name: 'siteList',
      uri: 'api/v2/siteManagementList',
      parentKey: 'siteManagement',
      routeKey: 'siteList',
      meta: {
        title: '站点管理列表',
        icon: 'zhandianguanliliebiao'
      },
      component: () =>
        import('@/views/system/siteManagement/siteList')
    },
    {
      path: 'siteDetail',
      parentKey: 'siteManagement',
      name: 'siteDetail',
      meta: {
        title: '站点详情',
        hideInMenu: true
      },
      component: () =>
        import('@/views/system/siteManagement/siteDetail')
    },
    {
      path: 'siteAdd',
      name: 'siteAdd',
      parentKey: 'siteManagement',
      meta: {
        title: '新增站点',
        hideInMenu: true
      },
      component: () =>
        import('@/views/system/siteManagement/siteAdd'),
      beforeEnter: (to, from, next) => {
        to.meta.title = to.params.page === 'edit' ? '编辑站点' : '新增站点'
        next()
      }
    },
    {
      path: 'sysPreset',
      name: 'sysPreset',
      uri: 'api/v1/level/index',
      routeKey: 'sysPreset',
      parentKey: 'siteManagement',
      meta: {
        title: '系统预设',
        icon: 'xitongyushe'
      },
      component: () =>
        import('@/views/system/siteManagement/sysPreset')
    },
    {
      path: 'sysPreRefundDetail',
      parentKey: 'siteManagement',
      name: 'sysPreRefundDetail',
      meta: {
        title: '系统预设详情',
        hideInMenu: true
      },
      component: () =>
        import('@/views/system/siteManagement/sysPreRefundDetail')
    },
    {
      path: 'sysPreRefundEdit',
      name: 'sysPreRefundEdit',
      parentKey: 'siteManagement',
      meta: {
        title: '编辑返水等级',
        hideInMenu: true
      },
      component: () =>
        import('@/views/system/siteManagement/sysPreRefundEdit'),
      beforeEnter: (to, from, next) => {
        to.meta.title = to.params.page === 'edit' ? '编辑返水等级' : '添加返水等级'
        next()
      }
    },
    {
      path: 'siteBlackList',
      name: 'siteBlackList',
      uri: 'api/v2/blackList',
      parentKey: 'system',
      routeKey: 'siteBlackList',
      meta: {
        title: '黑名单管理',
        icon: 'heimingdan'
      },
      component: () =>
        import('@/views/system/siteManagement/siteBlackList')
    },
    {
      path: 'activeList',
      parentKey: 'system',
      routeKey: 'activityList',
      name: 'activeList',
      meta: {
        title: '活动列表',
        icon: 'huodongliebiao-huodong',
        uri: 'api/v2/activitList'
      },
      component: () =>
        import('@/views/system/activeSum/activeList')

    },
    {
      path: 'addActivities:page',
      name: 'addActivities',
      parentKey: 'siteManagement',
      meta: {
        title: '新增活动',
        icon: 'lunbotu',
        hideInMenu: true
      },
      component: () =>
        import('@/views/system/activeSum/addActivities'),
      beforeEnter: (to, from, next) => {
        to.meta.title = to.params.page === 'edit' ? '编辑活动' : '新增活动'
        next()
      }
    },
    {
      path: 'lunboManagement',
      name: 'lunboBanner',
      uri: 'api/v2/adminLogType',
      parentKey: 'siteManagement',
      routeKey: 'lunboManagement',
      meta: {
        title: '轮播图管理',
        icon: 'lunbotu'
      },
      component: () =>
        import('@/views/system/lunboManagement/lunboBanner')
    },
    {
      path: 'lunboEdit/:page?',
      name: 'lunboEdit',
      parentKey: 'siteManagement',
      meta: {
        title: '编辑轮播图',
        hideInMenu: true
      },
      component: () =>
        import('@/views/system/lunboManagement/lunboEdit'),
      beforeEnter: (to, from, next) => {
        to.meta.title = to.params.page === 'edit' ? '编辑轮播图' : '添加轮播图'
        next()
      }
    }
    ]
  },
  {
    path: ' gameManagement',
    name: 'gameManagement',
    uri: 'api/v2/gameManage',
    routeKey: 'gameManagement',
    meta: {
      title: '游戏管理',
      icon: 'youxiguanli'
    },
    component: () =>
    import('@/views/system/parent'),
    redirect: { name: 'gameSort' },
    newChild: [],
    children: [
      {
        path: 'gameSort',
        name: 'gameSort',
        uri: 'api/v2/gameSequence',
        routeKey: 'gameSort',
        meta: {
          title: '游戏排序',
          icon: 'youxipaixu'
        },
        component: () => import('@/views/system/gameManagement/gameSort')
      },
      {
        path: 'gameManage',
        name: 'gameManage',
        uri: 'api/v2/gameManagement',
        routeKey: 'gameManage',
        meta: {
          title: '游戏管理',
          icon: 'youxiguanlihuise'
        },
        component: () => import('@/views/system/gameManagement/gameManage')
      },
      {
        path: 'gameMaintain',
        name: 'gameMaintain',
        uri: 'api/v2/gameMaintenance',
        routeKey: 'gameMaintain',
        meta: {
          title: '游戏维护',
          icon: 'youxiweihu'
        },
        component: () => import('@/views/system/gameManagement/gameMaintain')
      }
      // {
      //   path: 'gameList',
      //   name: 'gameList',
      //   meta: {
      //     title: '游戏列表'
      //   },
      //   ideInMenu: true,
      //   component: () => import('@/views/system/gameManagement/gameList')
      // }
    ]
  },
  {
    path: 'message',
    name: 'message',
    uri: 'api/v2/systemMemberLevelUp',
    parentKey: 'system',
    routeKey: 'message',
    meta: {
      title: '信息中心',
      icon: 'xinxizhongxin'
    },
    component: () =>
      import('@/views/system/parent'),
    redirect: { name: 'mail' },
    newChild: [],
    children: [{
      path: 'mail',
      name: 'mail',
      uri: 'api/v2/outBox',
      parentKey: 'message',
      routeKey: 'mail',
      meta: {
        title: '站内信',
        icon: 'zhanneixin'
      },
      component: () =>
        import('@/views/system/message/mail')
    },
    {
      path: 'sendMessage',
      name: 'sendMessage',
      parentKey: 'message',
      meta: {
        title: '发信',
        hideInMenu: true
      },
      component: () =>
        import('@/views/system/message/sendMessage')
    },
    {
      path: 'notice',
      name: 'notice',
      uri: 'api/notice/index',
      parentKey: 'message',
      routeKey: 'notice',
      meta: {
        title: '站内公告',
        icon: 'zhanneigonggao'
      },
      component: () =>
        import('@/views/system/message/notice')
    },
    {
      path: 'notice/:page?',
      parentKey: 'message',
      name: 'noticeDetial',
      meta: {
        notCache: true,
        title: '公告弹框详情',
        hideInMenu: true
      },
      component: () =>
        import('@/views/system/message/noticeDetial'),
      beforeEnter: (to, from, next) => {
        to.meta.title = to.params.page === 'edit' ? '编辑公告' : '增加公告'
        next()
      }
    },
    {
      path: 'notice/:page?',
      name: 'couseDetial',
      parentKey: 'message ',
      meta: {
        notCache: true,
        title: '详情',
        hideInMenu: true
      },
      component: () =>
        import('@/views/system/message/couseDetial'),
      beforeEnter: (to, from, next) => {
        to.meta.title = to.params.page === 'edit' ? '编辑走马灯' : '增加走马灯'
        next()
      }
    },
    {
      path: 'siteArtciles',
      name: 'siteArtciles',
      uri: 'api/v2/systemMemberRefundLevelListDefault',
      parentKey: 'message',
      routeKey: 'siteArtciles',
      meta: {
        title: '站点文章',
        icon: 'zhanneiwenzhang'
      },
      component: () =>
        import('@/views/system/message/siteArtciles')
    },
    {
      path: 'siteArtciles/:page?',
      name: 'addArtciles',
      parentKey: 'message',
      meta: {
        notCache: true,
        hideInMenu: true
      },
      component: () =>
        import('@/views/system/message/addArtciles'),
      beforeEnter: (to, from, next) => {
        to.meta.title = to.params.page === 'edit' ? '编辑文章' : '新增文章'
        next()
      }
    }
    ]
  }
  ]
}
export default system
