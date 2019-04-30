export default {
  state: {
    sixLotteryColor: [
      {
        color: '#ed3e14',
        number: [1, 7, 23, 29, 45, 12, 18, 30, 34, 13, 19, 35, 2, 8, 24, 40, 46]
      },
      {
        color: '#47cb89',
        number: [5, 16, 21, 27, 32, 38, 43, 6, 11, 17, 22, 28, 33, 39, 44, 49]
      },
      {
        color: '#2d8cf0',
        number: [3, 9, 25, 41, 47, 10, 14, 36, 15, 31, 37, 4, 20, 26, 42, 48]
      }
    ],
    // 写死的会员等级数据
    memberLevelList: [
      { levelLabel: '1', levelName: 'vip1' },
      { levelLabel: '2', levelName: 'vip2' },
      { levelLabel: '3', levelName: 'vip3' },
      { levelLabel: '4', levelName: 'vip4' },
      { levelLabel: '5', levelName: 'vip5' },
      { levelLabel: '6', levelName: 'vip6' },
      { levelLabel: '7', levelName: 'vip7' },
      { levelLabel: '8', levelName: 'vip8' },
      { levelLabel: '9', levelName: 'vip9' },
      { levelLabel: '10', levelName: 'vip10' },
      { levelLabel: '11', levelName: 'vip11' },
      { levelLabel: '12', levelName: 'vip12' },
      { levelLabel: '13', levelName: 'vip13' },
      { levelLabel: '14', levelName: 'vip14' },
      { levelLabel: '15', levelName: 'vip15' },
      { levelLabel: '16', levelName: 'vip16' },
      { levelLabel: '17', levelName: 'vip17' },
      { levelLabel: '18', levelName: 'vip18' },
      { levelLabel: '19', levelName: 'vip19' },
      { levelLabel: '20', levelName: 'vip20' }
    ],
    // 写死的返水数据
    refundList: [
      { levelAlias: '等级一', levelLabel: '1', levelName: 'vip1' },
      { levelAlias: '等级二', levelLabel: '2', levelName: 'vip2' },
      { levelAlias: '等级三', levelLabel: '3', levelName: 'vip3' },
      { levelAlias: '等级四', levelLabel: '4', levelName: 'vip4' },
      { levelAlias: '等级五', levelLabel: '5', levelName: 'vip5' },
      { levelAlias: '等级六', levelLabel: '6', levelName: 'vip6' },
      { levelAlias: '等级七', levelLabel: '7', levelName: 'vip7' },
      { levelAlias: '等级八', levelLabel: '8', levelName: 'vip8' },
      { levelAlias: '等级九', levelLabel: '9', levelName: 'vip9' },
      { levelAlias: '等级十', levelLabel: '10', levelName: 'vip10' },
      { levelAlias: '等级十一', levelLabel: '11', levelName: 'vip11' },
      { levelAlias: '等级十二', levelLabel: '12', levelName: 'vip12' },
      { levelAlias: '等级十三', levelLabel: '13', levelName: 'vip13' },
      { levelAlias: '等级十四', levelLabel: '14', levelName: 'vip14' },
      { levelAlias: '等级十五', levelLabel: '15', levelName: 'vip15' },
      { levelAlias: '等级十六', levelLabel: '16', levelName: 'vip16' },
      { levelAlias: '等级十七', levelLabel: '17', levelName: 'vip17' },
      { levelAlias: '等级十八', levelLabel: '18', levelName: 'vip18' },
      { levelAlias: '等级十九', levelLabel: '19', levelName: 'vip19' },
      { levelAlias: '等级二十', levelLabel: '20', levelName: 'vip20' }
    ],
    payOnlineFresh: '0', // 在线支付 自动刷新
    payOnlineTimer: null,
    payCompanyFresh: '0', // 公司入款 自动刷新
    payCompanyTimer: null,
    withFresh: '0', // 线上取款 自动刷新
    withTimer: null,
    codeDetail: { uid: undefined, time: 1, title: 'mainCodeDetail' }
  },
  mutations: {
    setCodeDetail (state, item) {
      state.codeDetail = item
    },
    setPayOnlineFresh (state, val) {
      state.payOnlineFresh = val
    },
    setPayOnlineTimer (state) {
      clearInterval(state.payOnlineTimer)
      state.payOnlineTimer = null
    },
    setPayCompanyFresh (state, val) {
      state.payCompanyFresh = val
    },
    setPayCompanyTimer (state) {
      clearInterval(state.payCompanyTimer)
      state.payCompanyTimer = null
    },
    setWithFresh (state, val) {
      state.withFresh = val
    },
    setWithTimer (state) {
      clearInterval(state.withTimer)
      state.withTimer = null
    },
    setNewOnlie (state, { time }) {
      state.payOnlineTimer = time
    },
    setnewPayCompany (state, { time }) {
      state.payCompanyTimer = time
    },
    setnewWithTimer (state, { time }) {
      state.withTimer = time
    }
  },
  actions: {
    // 改变刷新时间
    changeFresh ({ commit }, { stage, val }) {
      if (stage === 'payOnline') {
        commit('setPayOnlineFresh', val)
      } else if (stage === 'payCompany') {
        commit('setPayCompanyFresh', val)
      } else {
        commit('setWithFresh', val)
      }
    },
    // 清除定时器
    clearPayOnline ({ commit }, stage) {
      if (stage === 'payOnline') {
        commit('setPayOnlineTimer')
      } else if (stage === 'payCompany') {
        commit('setPayCompanyTimer')
      } else {
        commit('setWithTimer')
      }
    },
    // 设置
    setTimer ({ commit }, { stage,time }) {
      if (stage === 'payOnline') {
        commit('setNewOnlie', { time })
      } else if (stage === 'payCompany') {
        commit('setnewPayCompany', { time })
      } else {
        commit('setnewWithTimer', { time })
      }
    }
  }
}
