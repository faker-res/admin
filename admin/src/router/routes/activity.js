const activity = {
  path: '/activity',
  name: 'activity',
  meta: {
    title: '活动管理',
    hideInMenu: true
  },
  component: () => import('@/components/main'),
  redirect: { name: 'borrow' },
  children: [
    {
      path: 'borrow',
      name: 'borrow',
      meta: {
        title: '借呗',
        icon: 'cebianlanhuiyuanchaxun'
      },
      component: () => import('@/views/activity/parent'),
      redirect: { name: 'activityBorrow' },
      children: [
        {
          path: 'activityBorrow',
          name: 'activityBorrow',
          meta: {
            title: '借款管理',
            icon: 'cebianlanhuiyuanchaxun'
          },
          component: () => import('@/views/activity/activityBorrow')
        },
        {
          path: 'activityRepay',
          name: 'activityRepay',
          meta: {
            title: '还款管理',
            icon: 'cebianlanhuiyuanchaxun'
          },
          component: () => import('@/views/activity/activityRepay')
        },
        {
          path: 'overDueStatic',
          name: 'overDueStatic',
          meta: {
            title: '逾期统计',
            icon: 'cebianlanhuiyuanchaxun'
          },
          component: () => import('@/views/activity/overDueStatic')
        },
        {
          path: 'amountStatic',
          name: 'amountStatic',
          meta: {
            title: '借还款统计',
            icon: 'cebianlanhuiyuanchaxun'
          },
          component: () => import('@/views/activity/amountStatic')
        }
      ]
    },
    {
      path: 'housekeeper',
      name: 'housekeeper',
      meta: {
        title: '金管家',
        icon: 'cebianlanhuiyuanchaxun'
      },
      component: () => import('@/views/activity/parent'),
      redirect: { name: 'levelManagement' },
      children: [
        {
          path: 'levelManagement',
          name: 'levelManagement',
          meta: {
            title: '等级管理',
            icon: 'cebianlanhuiyuanchaxun'
          },
          component: () => import('@/views/activity/levelManagement')
        },
        {
          path: 'codeManagement',
          name: 'codeManagement',
          meta: {
            title: '打码管理',
            icon: 'cebianlanhuiyuanchaxun'
          },
          component: () => import('@/views/activity/codeManagement')
        },
        {
          path: 'logList',
          name: 'logList',
          meta: {
            title: '日志列表',
            icon: 'cebianlanhuiyuanchaxun'
          },
          component: () => import('@/views/activity/logList')
        }
      ]
    },
    {
      path: 'blackList',
      name: 'blackList',
      uri: 'api/v2/activityBlackList',
      meta: {
        title: '活动黑名单',
        icon: 'cebianlanhuiyuanchaxun'
      },
      component: () => import('@/views/activity/parent'),
      redirect: { name: 'activityBlackList' },
      children: [
        {
          path: 'activityBlackList',
          name: 'activityBlackList',
          uri: 'api/v2/activity/black/activityBlackList',
          meta: {
            title: '活动黑名单',
            icon: 'cebianlanhuiyuanchaxun'
          },
          component: () => import('@/views/activity/activityBlackList')
        }
      ]
    }
  ]
}
export default activity
