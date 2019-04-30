const agency = {
  path: '/agency',
  name: 'agency',
  meta: {
    title: '代理管理',
    hideInMenu: true
  },
  component: () => import('@/components/main'),
  redirect: { name: 'agencySearch' },
  children: [
    {
      path: 'agencySearch',
      name: 'agencySearch',
      uri: 'api/v1/agency/index',
      meta: {
        title: '代理查询',
        icon: 'cebianlanhuiyuanchaxun'
      },
      component: () => import('@/views/agency/agencySearch')
    },
    {
      path: 'agencyAdd/:page?',
      name: 'agencyAdd',
      uri: 'api/v1/agency/create',
      meta: {
        title: '新增代理',
        icon: 'cebianlanxinzengdaili'
      },
      component: () => import('@/views/agency/agencyAdd')
    },
    // {
    //   path: 'agencyDomain',
    //   name: 'agencyDomain',
    //   uri: 'api/v1/agencyDomain/index',
    //   meta: {
    //     title: '代理域名',
    //     icon: 'cebianlandailiyuming',
    //     notCache: true
    //   },
    //   component: () => import('@/views/agency/agencyDomain')
    // },
    {
      path: 'agencyLevel',
      name: 'agencyLevel',
      uri: 'api/v1/agencyLevel/index',
      meta: {
        title: '代理等级',
        icon: 'cebianlandailidengji'
      },
      component: () => import('@/views/agency/agencyLevel')
    },
    {
      path: 'agencyDividend',
      name: 'agencyDividend',
      meta: {
        title: '代理分红结算',
        icon: 'cebianlandailifenhong'
      },
      component: () => import('@/views/agency/agencyDividend')
    },
    {
      path: 'domainAdd/:page?',
      name: 'domainAdd',
      meta: {
        title: '添加域名',
        hideInMenu: true,
        notCache: true
      },
      component: () => import('@/views/agency/domainAdd')
    },
    {
      path: 'domainEdit/:page?',
      name: 'domainEdit',
      meta: {
        title: '编辑域名',
        hideInMenu: true
      },
      component: () => import('@/views/agency/domainEdit')
    },
    {
      path: 'agencyLevelAdd',
      name: 'agencyLevelAdd',
      meta: {
        title: '添加代理等级',
        hideInMenu: true
      },
      component: () => import('@/views/agency/agencyLevelAdd')
    },
    {
      path: 'agencyUnderling',
      name: 'agencyUnderling',
      meta: {
        title: '下属会员',
        hideInMenu: true
      },
      component: () => import('@/views/agency/agencyUnderling')
    },
    {
      path: 'agencySubordinate',
      name: 'agencySubordinate',
      meta: {
        title: '下级代理',
        hideInMenu: true
      },
      component: () => import('@/views/agency/agencySubordinate')
    }
  ]
}

export default agency
