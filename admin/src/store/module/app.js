
import {
  setTagNavListInLocalstorage,
  // getMenuByRouter,
  getTagNavListFromLocalstorage,
  getHomeRoute,
  getNextRoute,
  routeHasExist,
  routeEqual,
  getRouteTitleHandled,
  getToken
} from '@/libs/util'
import { getNavigateBar } from '@/api/common'
import beforeClose from '@/router/before-close'
import router from '@/router'
import routers from '@/router/routes'
import config from '@/config'
// import system from '../../router/routes/system'
const { homeName } = config

const closePage = (state, route) => {
  const nextRoute = getNextRoute(state.tagNavList, route)
  state.tagNavList = state.tagNavList.filter(item => {
    return !routeEqual(item, route)
  })
  router.push(nextRoute)
}

export default {
  state: {
    tagNavList: [],
    homeRoute: {},
    activeMenu: localStorage.activeMenu || 'member',
    allMenu: localStorage.allMenu ? JSON.parse(localStorage.allMenu) : {},
    addSubMoney: false,
    menuItem: { name: '', count: 1 },
    singleLotteryArray: localStorage.singleSite ? JSON.parse(localStorage.singleSite) : []
  },
  getters: {
    // filterRouters: (state, getters, rootState) => routers[rootState.app.activeMenu].children,
    // menuList: (state, getters, rootState) => getMenuByRouter(getters.filterRouters)
  },
  mutations: {
    // 修复加减款关闭样式错误显示
    refreshMenuItem (state, name) {
      if (name) state.menuItem.name = name
      else state.menuItem.count++
    },
    showAddSubMoney (state, status) {
      state.addSubMoney = status
    },
    setAllMenu (state, menu) {
      state.allMenu = menu
      localStorage.allMenu = JSON.stringify(menu)
    },
    setActiveMenu (state, route) {
      if (typeof route === 'string') {
        state.activeMenu = route
        localStorage.activeMenu = route
      } else {
        const { path } = route
        let pathKey = path.split('/')[1]
        let excludeRoutes = ['home'] // 不再主路由的路由
        pathKey = excludeRoutes.includes(pathKey) ? 'member' : pathKey
        state.activeMenu = pathKey
        localStorage.activeMenu = pathKey
      }
    },
    setHomeRoute (state, routes) {
      state.homeRoute = getHomeRoute(routes, homeName)
    },
    setTagNavList (state, list) {
      let tagList = []
      if (list) {
        tagList = [...list]
      } else tagList = getTagNavListFromLocalstorage() || []
      if (tagList[0] && tagList[0].name !== homeName) tagList.shift()
      let homeTagIndex = tagList.findIndex(item => item.name === homeName)
      if (homeTagIndex > 0) {
        let homeTag = tagList.splice(homeTagIndex, 1)[0]
        tagList.unshift(homeTag)
      }
      state.tagNavList = tagList
      setTagNavListInLocalstorage([...tagList])
    },
    closeTag (state, route) {
      let tag = state.tagNavList.filter(item => routeEqual(item, route))
      route = tag[0] ? tag[0] : null
      if (!route) return
      if (route.meta && route.meta.beforeCloseName && route.meta.beforeCloseName in beforeClose) {
        new Promise(beforeClose[route.meta.beforeCloseName]).then(close => {
          if (close) {
            closePage(state, route)
          }
        })
      } else {
        closePage(state, route)
      }
    },
    addTag (state, { route, type = 'unshift' }) {
      let router = getRouteTitleHandled(route)
      if (!routeHasExist(state.tagNavList, router)) {
        if (type === 'push') state.tagNavList.push(router)
        else {
          if (router.name === homeName) state.tagNavList.unshift(router)
          else state.tagNavList.splice(1, 0, router)
        }
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    },
    setSingleLotteryArray (state, data) {
      state.singleLotteryArray = data
      localStorage.singleSite = JSON.stringify(data)
    },
    setAuthInPage (state, button) {
      state.authInPage = button
      localStorage.authInPage = JSON.stringify(button)
    }
  },
  actions: {
    getNewRoute (store, that) {
      let siteId = store.rootState.user.accessSite && store.rootState.user.accessSite.reverse()[0].id
      return new Promise((resolve, reject) => {
        let token = getToken()
        if (!token) return
        let routes = Object.values(routers)
        getNavigateBar({ siteId }).then(res => {
          if (res.code && res.code === 200) {
            store.commit('setAuthInPage', res.data.button)
            let newRoutes = []
            let arr = []
            res.data.bar && res.data.bar.forEach(htjk => {
              htjk.singleSiteIds && htjk.singleSiteIds.forEach(siteId => {
                arr.push(siteId)
              })
              store.commit('setSingleLotteryArray', arr)
              let target = routes.filter(item => item.meta.title === htjk.menu_name)[0] // 一级菜单及下属数据
              // 没有二级菜单不显示
              if (target.baseChildren) {
                target.children = target.baseChildren
              }
              if (Object.keys(htjk).length < 2) {
                if (htjk.menu_name === target.meta.title) {
                  target.meta.hideInTop = true
                }
              } else {
                if (htjk.menu_name === target.meta.title) {
                  target.meta.hideInTop = false
                }
              }
              target.newChild = []
              target.children && target.children.forEach(v => {
                v.newChild = []
              })
              // 普通二级菜单
              if (htjk.list) {
                htjk.list.forEach(htKey => {
                  if (target.baseChildren) {
                    target.children = target.baseChildren
                  }
                  target.children && target.children.forEach(sideMenu => {
                    if (sideMenu.routeKey === htKey) { // 匹配上的可以显示的二级菜单
                      target.newChild.push(sideMenu)
                    }
                  })
                })
                // 活动管理和系统配置的三级菜单
              } else {
                for (let key in htjk) {
                  if (key !== 'menu_name') { // 匹配特殊情况下的二级菜单
                    if (target.baseChildren) {
                      target.children = target.baseChildren
                    }
                    target.children && target.children.forEach(secondMenu => {
                      if (key === secondMenu.routeKey) {
                        target.newChild.push(secondMenu) // 有权限的二级菜单
                        htjk[key].forEach(htKey => { // htkey对应三级菜单的routekey,key对应二级菜单关键字
                          if (secondMenu.baseChildren) {
                            secondMenu.children = secondMenu.baseChildren
                          }
                          secondMenu.children && secondMenu.children.forEach(thirdMenu => {
                            if (thirdMenu.routeKey === htKey[0]) {
                              secondMenu.newChild.push(thirdMenu)
                            }
                          })
                        })
                      }
                    })
                  }
                }
              }
              newRoutes.push(target)
            })
            newRoutes.forEach(item => {
              item.newChild.forEach(second => {
                if (second.newChild) {
                  second.baseChildren = second.children
                  second.children = second.newChild
                }
              })
              item.baseChildren = item.children
              item.children = item.newChild
            })
            let obj = {}
            newRoutes.forEach(item => {
              obj[item.name] = item
            })
            let local = JSON.parse(localStorage.nowSite)
            obj.lottery.children.forEach((item) => {
              if (item.name === 'singleFastLottery' && store.state.singleLotteryArray) {
                item.meta.hideInMenu = store.state.singleLotteryArray.indexOf(local.id) === -1
              }
              if (item.name === 'fastLottery' && store.state.singleLotteryArray) {
                item.meta.hideInMenu = store.state.singleLotteryArray.indexOf(local.id) !== -1
              }
            })
            if (that) {
              that.$router.push({
                name: that.$config.homeName
              })
              that.$Spin.hide()
            }
            store.commit('setAllMenu', obj)
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
