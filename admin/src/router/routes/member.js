const member = {
  path: '/member',
  name: 'member',
  meta: {
    title: '会员管理',
    hideInMenu: true,
    hideInTop: false
  },
  component: () => import('@/components/main'),
  redirect: { name: 'memberSearch' },
  newChild: [],
  children: [
    {
      path: 'memberSearch',
      name: 'memberSearch',
      uri: 'api/v2/memberList',
      routeKey: 'memberSearch',
      parentKey: 'member',
      meta: {
        title: '会员查询',
        icon: 'cebianlanhuiyuanchaxun',
        notCache: true
      },
      component: () => import('@/views/member/memberSearch')
    },
    {
      path: 'memberSearchFunds',
      name: 'memberSearchFunds',
      uri: 'api/v2/memberBalanceHandle',
      routeKey: 'memberSearchFunds',
      parentKey: 'member',
      meta: {
        title: '加款减款',
        icon: 'cebianlanjiajiankuan'
      },
      component: () => import('@/views/member/memberSearch')
    },
    {
      path: 'memberSearch/detail',
      name: 'memberDetails',
      parentKey: 'member',
      meta: {
        title: '会员详情',
        notCache: true,
        hideInMenu: true
      },
      component: () => import('@/views/member/memberDetails')
    },
    {
      path: 'memberSearch/:page?',
      name: 'memberEdit',
      parentKey: 'member',
      meta: {
        title: '编辑会员',
        hideInMenu: true
      },
      component: () => import('@/views/member/memberEdit'),
      beforeEnter: (to, from, next) => {
        to.meta.title = to.params.page === 'edit' ? '编辑会员' : '添加会员'
        next()
      }
    },
    {
      path: 'memberAdd/:page?',
      name: 'memberAdd',
      uri: 'api/v1/member/create',
      routeKey: 'memberAdd',
      parentKey: 'member',
      meta: {
        title: '新增会员',
        icon: 'xinzenghuiyuan'
      },
      component: () => import('@/views/member/memberAdd')
    },
    {
      path: 'memberOnline',
      name: 'memberOnline',
      uri: '_debugbar/telescope/{id}',
      routeKey: 'memberOnline',
      parentKey: 'member',
      meta: {
        title: '在线会员',
        icon: 'cebianlanzaixianhuiyuan'
      },
      component: () => import('@/views/member/memberOnline')
    },
    {
      path: 'memberLevel',
      name: 'memberLevel',
      uri: 'api/v2/memberLevelList',
      routeKey: 'memberLevel',
      parentKey: 'member',
      meta: {
        title: '会员等级',
        icon: 'cebianlanhuiyuandengji'
      },
      component: () => import('@/views/member/memberLevel')
    },
    {
      path: 'memberRefund',
      name: 'memberRefund',
      uri: 'api/v2/refundLevelList',
      routeKey: 'memberRefund',
      parentKey: 'member',
      meta: {
        notCache: true,
        title: '返水等级',
        icon: 'cebianlanfanshui'
      },
      component: () => import('@/views/member/memberRefund')
    },
    {
      path: 'memberRefund/detail',
      name: 'memberRefundDetails',
      parentKey: 'member',
      meta: {
        title: '返水详情',
        hideInMenu: true
      },
      component: () => import('@/views/member/memberRefundDetails')
    },
    {
      path: 'memberRefund/:page?',
      name: 'memberRefundEdit',
      parentKey: 'member',
      meta: {
        title: '编辑返水等级',
        hideInMenu: true
      },
      component: () => import('@/views/member/memberRefundEdit'),
      beforeEnter: (to, from, next) => {
        to.meta.title = to.params.page === 'edit' ? '编辑返水等级' : '添加返水等级'
        next()
      }
    },
    {
      path: 'memberLog',
      name: 'memberLog',
      uri: 'api/v2/memberHandleLog',
      routeKey: 'memberLog',
      parentKey: 'member',
      meta: {
        title: '会员操作日志',
        icon: 'cebianlancaozuorizhi'
      },
      component: () => import('@/views/member/memberLog')
    },
    {
      path: 'memberLoginLog',
      name: 'memberLoginLog',
      uri: 'api/v2/memberLoginLog',
      routeKey: 'memberLoginLog',
      parentKey: 'member',
      meta: {
        title: '会员登录日志',
        icon: 'cebianlandenglurizhi'
      },
      component: () => import('@/views/member/memberLoginLog')
    },
    {
      path: 'memberFundsLog',
      name: 'memberFundsLog',
      uri: 'api/v2/memberFinanceLog',
      routeKey: 'memberFundsLog',
      parentKey: 'member',
      meta: {
        title: '会员资金日志',
        icon: 'cebianlanzijinrizhi'
      },
      component: () => import('@/views/member/memberFundsLog')
    },
    {
      path: 'memberBank',
      name: 'memberBank',
      uri: 'api/v2/bankCardList',
      routeKey: 'memberBank',
      parentKey: 'member',
      meta: {
        title: '银行卡管理',
        icon: 'cebianlanyinhangqia'
      },
      component: () => import('@/views/member/memberBank')
    }
  ]
}

export default member
