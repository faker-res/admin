const finance = {
  path: '/finance',
  name: 'finance',
  meta: {
    title: '帐务管理',
    hideInMenu: true,
    hideInTop: false
  },
  component: () => import('@/components/main'),
  redirect: { name: 'payOnline' },
  newChild: [],
  children: [
    {
      path: 'payOnline',
      name: 'payOnline',
      routeKey: 'payOnline',
      parentKey: 'finance',
      uri: 'api/v2/depositOnlineList',
      meta: {
        notCache: true,
        title: '在线支付',
        icon: 'cebianlanzaixianzhifu'
      },
      component: () => import('@/views/finance/payOnline')
    },
    {
      path: 'payCompany',
      name: 'payCompany',
      uri: 'api/v2/depositOfflineList',
      routeKey: 'payCompany',
      parentKey: 'finance',
      meta: {
        // notCache: true,
        title: '公司入款',
        icon: 'cebianlangongsirukuan'
      },
      component: () => import('@/views/finance/payCompany')
    },
    {
      path: 'withdrawalsOnline',
      name: 'withdrawalsOnline',
      uri: 'api/v2/withdrawalsList',
      routeKey: 'withdrawalsOnline',
      parentKey: 'finance',
      meta: {
        title: '线上取款',
        icon: 'cebianlanxianshangqukuan'
      },
      component: () => import('@/views/finance/withdrawalsOnline')
    },
    {
      path: 'paymentGroups',
      name: 'paymentGroups',
      parentKey: 'finance',
      // uri: 'api/payment/class',
      meta: {
        title: '支付方式',
        hideInMenu: true
      },
      component: () => import('@/views/finance/paymentGroups')
    },
    {
      path: 'paymentManager',
      name: 'paymentManager',
      uri: 'api/v2/paymentChannelList',
      routeKey: 'paymentManager',
      parentKey: 'finance',
      meta: {
        title: '支付管理',
        icon: 'cebianlanzhifuguanli'
      },
      component: () => import('@/views/finance/paymentManager')
    },
    {
      path: 'accountsRecord',
      name: 'accountsRecord',
      uri: 'api/v2/emergencyRecord',
      routeKey: 'accountsRecord',
      parentKey: 'finance',
      meta: {
        title: '催帐记录',
        icon: 'cebianlancuizhangjilu'
      },
      component: () => import('@/views/finance/accountsRecord')
    },
    {
      path: 'preferentialRecord',
      name: 'preferentialRecord',
      parentKey: 'finance',
      meta: {
        title: '优惠记录',
        icon: 'cebianlanyouhuijilu'
      },
      component: () => import('@/views/finance/preferentialRecord')
    },
    {
      path: 'financeSummary',
      name: 'financeSummary',
      uri: 'api/v2/financeCollection',
      parentKey: 'finance',
      routeKey: 'financeSummary',
      meta: {
        title: '存取款总汇',
        icon: 'cebianlancunqukuanzonghui'
      },
      component: () => import('@/views/finance/financeSummary')
    },
    {
      path: 'systemInPaymentCard',
      name: 'systemInPaymentCard',
      uri: 'api/v2/companyBankCardList',
      routeKey: 'systemInPaymentCard',
      parentKey: 'finance',
      meta: {
        notCache: true,
        title: '入款卡管理',
        icon: 'cebianlanyinhangqia1'
      },
      component: () => import('@/views/finance/systemInPaymentCard')
    },
    {
      path: 'gamesTransfer',
      name: 'gamesTransfer',
      uri: 'api/v2/transferRecord',
      routeKey: 'gamesTransfer',
      parentKey: 'finance',
      meta: {
        title: '第三方转账记录',
        icon: 'cebianlandisanfangzhuanzhangjilu'
      },
      component: () => import('@/views/finance/gamesTransfer')
    },
    {
      path: 'paymentAdd',
      name: 'paymentAdd',
      parentKey: 'finance',
      meta: {
        title: '添加支付平台',
        hideInMenu: true
      },
      component: () => import('@/views/finance/paymentAdd')
    },
    {
      path: 'paymentEdit',
      name: 'paymentEdit',
      parentKey: 'finance',
      meta: {
        title: '编辑支付平台',
        hideInMenu: true
      },
      component: () => import('@/views/finance/paymentEdit')
    },
    {
      path: 'addCard',
      name: 'addCard',
      parentKey: 'finance',
      meta: {
        title: '添加入款卡',
        hideInMenu: true
      },
      component: () => import('@/views/finance/addCard')
    },
    {
      path: 'bankCardEdit/:page?',
      name: 'bankCardEdit',
      parentKey: 'finance',
      meta: {
        notCache: true,
        title: '编辑银行卡',
        hideInMenu: true
      },
      component: () => import('@/views/finance/bankCardEdit'),
      beforeEnter: (to, from, next) => {
        to.meta.title = to.params.page === 'edit' ? '编辑银行卡' : '添加银行卡'
        next()
      }
    }
  ]
}

export default finance
