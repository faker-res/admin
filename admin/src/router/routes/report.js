const report = {
  path: '/report',
  name: 'report',
  meta: {
    title: '报表管理',
    hideInMenu: true,
    hideInTop: false
  },
  component: () => import('@/components/main'),
  redirect: { name: 'complexReport' },
  newChild: [],
  children: [
    {
      path: 'complexReport',
      name: 'complexReport',
      uri: 'api/v2/multipleReports',
      routeKey: 'complexReport',
      parentKey: 'report',
      meta: {
        title: '综合报表',
        icon: 'cebianlanzonghebaobiao'
      },
      component: () => import('@/views/report/complexReport')
    },
    {
      path: 'totalReportChildren',
      name: 'totalReportChildren',
      parentKey: 'report',
      meta: {
        title: '报表下级',
        hideInMenu: true
      },
      component: () => import('@/views/report/totalReportChildren')
    },
    {
      path: 'totalReportGameChildren',
      name: 'totalReportGameChildren',
      parentKey: 'report',
      meta: {
        title: '报表下级',
        hideInMenu: true
      },
      component: () => import('@/views/report/totalReportGameChildren')
    },
    {
      path: 'gameReport',
      name: 'gameReport',
      uri: 'api/v2/gameRecordsDetail',
      parentKey: 'report',
      routeKey: 'gameReport',
      meta: {
        notCache: true,
        title: '游戏记录',
        icon: 'cebianlanyouxijilubaobiao'
      },
      component: () => import('@/views/report/gameReport')
    },
    {
      path: 'firstDepositReport',
      name: 'firstDepositReport',
      uri: 'api/v2/firstDepositReports',
      routeKey: 'firstDepositReport',
      parentKey: 'report',
      meta: {
        title: '首存报表',
        icon: 'cebianlanshoucunbaobiao'
      },
      component: () => import('@/views/report/firstDepositReport')
    },
    {
      path: 'platformReport',
      name: 'platformReport',
      uri: 'api/v2/platformReports',
      parentKey: 'report',
      routeKey: 'platformReport',
      meta: {
        title: '平台报表',
        icon: 'cebianlanpingtaibaobiao'
      },
      component: () => import('@/views/report/platformReport')
    },
    {
      path: 'platformReport/detail',
      name: 'platformReportDetail',
      parentKey: 'report',
      meta: {
        notCache: true,
        title: '平台报表详情',
        hideInMenu: true
      },
      component: () => import('@/views/report/platformReportDetail')
    },
    {
      path: 'lotteryReport',
      name: 'lotteryReport',
      uri: 'api/v2/lotteryReports',
      parentKey: 'report',
      routeKey: 'lotteryReport',
      meta: {
        title: '彩票报表',
        icon: 'cebianlancaipiaobaobiao'
      },
      component: () => import('@/views/report/lotteryReport')
    },
    {
      path: 'lotteryReport/detail',
      name: 'lotteryReportDetail',
      parentKey: 'report',
      meta: {
        notCache: true,
        title: '彩票报表详情',
        hideInMenu: true
      },
      component: () => import('@/views/report/lotteryReportDetail')
    },
    {
      path: 'memberReport',
      name: 'memberReport',
      uri: 'api/v2/memberReports',
      parentKey: 'report',
      routeKey: 'memberReport',
      meta: {
        title: '会员报表',
        icon: 'cebianlanhuiyuanbaobiao'
      },
      component: () => import('@/views/report/memberReport')
    },
    {
      path: 'agencyReport',
      name: 'agencyReport',
      uri: 'api/v2/agencyReports',
      parentKey: 'report',
      routeKey: 'agencyReport',
      meta: {
        notCache: true,
        title: '代理报表',
        icon: 'cebianlandailibaobiao'
      },
      component: () => import('@/views/report/agencyReport')
    },
    {
      path: 'totalReport',
      name: 'totalReport',
      uri: 'api/v1/reports/reports',
      parentKey: 'report',
      meta: {
        title: '总报表',
        icon: 'cebianlanzongbaobiao'
      },
      component: () => import('@/views/report/totalReport')
    },
    {
      path: 'domainReports',
      name: 'domainReports',
      parentKey: 'report',
      routeKey: 'domainReport',
      meta: {
        title: '域名报表',
        icon: 'cebianlandailiyuming1'
      },
      component: () => import('@/views/report/domainReport')
    },
    {
      path: 'domainReportsDetailByDomain',
      name: 'domainReportsDetailByDomain',
      parentKey: 'report',
      meta: {
        title: '域名人数报表',
        hideInMenu: true
      },
      component: () => import('@/views/report/domainReportsDetailByDomain')
    },
    {
      path: 'domainReportsDetailByUser',
      name: 'domainReportsDetailByUser',
      parentKey: 'report',
      meta: {
        title: '注册人数详情',
        hideInMenu: true
      },
      beforeEnter: (to, from, next) => {
        to.meta.title = to.params.page === 'register' ? '注册人数详情' : '登录人数详情'
        next()
      },
      component: () => import('@/views/report/domainReportsDetailByUser')
    },
    {
      path: 'dailyCashReport',
      name: 'dailyCashReport',
      parentKey: 'report',
      routeKey: 'dailyCashReport',
      meta: {
        title: '现金报表',
        icon: 'chongzhi'
      },
      component: () => import('@/views/report/dailyCashReport')
    }
  ]
}
export default report
