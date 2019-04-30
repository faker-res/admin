/* eslint-disable space-before-function-paren */
/* eslint-disable camelcase */
import {
  login,
  logout
} from '@/api/user'
import {
  setToken,
  getToken,
  setAccessInLocal,
  getAccessFromLocal,
  setNowSiteInLocal,
  getNowSiteFromLocal,
  setUserName,
  setAdminId,
  setUserType
} from '@/libs/util'
import router from '@/router'

export default {
  state: {
    currentPremission: [],
    userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null,
    token: getToken(),
    accessSite: getAccessFromLocal(),
    nowSite: getNowSiteFromLocal(),
    roleNames: null,
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {},
    authMenu: localStorage['authMenu'] || '',
    authInPage: localStorage['authInPage'] || ''
  },
  mutations: {
    setUserInfo(state, basic) {
      state.userInfo = basic
      setAdminId(basic.adminId)
      setUserName(basic.userName)
      setUserType(basic.type)
      sessionStorage.setItem('userInfo', JSON.stringify(basic))
    },
    setAccess(state, site) {
      state.accessSite = site
      setAccessInLocal(site)
    },
    setNowSite(state, site) {
      state.nowSite = site
      setNowSiteInLocal(site)
    },
    updateNowSite(state, site) {
      state.nowSite = site
      setNowSiteInLocal(site)
    },
    setRoleNames(state, name) {
      state.roleNames = name
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setAuthMenu(state, authMenu) {
      localStorage['authMenu'] = state.authMenu = authMenu
    },
    setAuthInPage(state, authInPage) {
      localStorage['authInPage'] = state.authInPage = authInPage
    }
  },
  actions: {
    // 登录
    handleLogin({ commit }, { userName, password, token }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password,
          token
        }).then(res => {
          const { token, basic, site, roleNames, authMenu, authInPage } = res.data
          commit('setToken', token)
          commit('setUserInfo', basic)
          commit('setAccess', site)
          commit('setAuthMenu', authMenu)
          commit('setAuthInPage', authInPage)
          commit('setNowSite', site[0] || {})
          commit('setRoleNames', roleNames)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut(store) {
      return new Promise((resolve, reject) => {
        if (store.state.token) {
          logout(store.state.token, true).then(() => {
            store.commit('setToken', '')
            store.commit('setAccess', [])
            store.commit('setAuthMenu', '')
            store.commit('setAuthInPage', '')
            store.rootState.app.allMenu = {}
            setUserName('')
            localStorage.clear()
            router.push({ name: 'login' })
            resolve()
          }).catch(err => {
            reject(err)
          })
        } else {
          router.push({ name: 'login' })
        }
      })
    }
  }
}
