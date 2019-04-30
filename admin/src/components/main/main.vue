<template>
  <Layout style="height: 100%" class="main">
    <Header class="header-con">
      <header-bar @on-close-all="handleCloseTag" ref="headerBar">
        <notice :notice="notice"/>
        <user/>
        <sy-log :messageCount="messageCount"/>
        <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
      </header-bar>
    </Header>
    <Layout>
      <Sider
        hide-trigger
        collapsible
        :width="170"
        :collapsed-width="50"
        v-model="collapsed"
        class="left-sider"
        :style="{overflow: 'hidden'}"
      >
        <side-menu
          accordion
          ref="sideMenu"
          :active-name="$route.name"
          :collapsed="collapsed"
          @on-select="turnToPage"
          :menu-list="menuList"
        >
          <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
          <div class="logo-con">
            <span
              v-show="!collapsed"
              class="ft20"
              style="color:#fff"
            >{{allRoutes[activeMenu].meta.title}}</span>
            <Icons @click.native="handleCollapsedChange" :type="expandIcon" style="color:#fff"/>
          </div>
        </side-menu>
      </Sider>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <tags-nav
              :value="$route"
              @input="handleClick"
              :list="tagNavList"
              @on-close="handleCloseTag"
            />
          </div>
          <Content class="content-wrapper">
            <member-add-sub-money/>
            <keep-alive :include="cacheList" :exclude="notCacheList">
              <router-view :key="$route.fullPath + '-' + nowSite.siteCode"/>
            </keep-alive>
            <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import ABackTop from './components/a-back-top'
import Fullscreen from './components/fullscreen'
import SyLog from './components/sy-log'
import Icons from '@/components/icons'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { getNewTagList, routeEqual, getMenuByRouter, getToken } from '@/libs/util'
import routers from '@/router/routers'
import allRoutes from '@/router/routes'
import { remind } from '@/api/common'
import Notice from './components/header-notice/notice'
import './main.less'
import itemMixin from './components/side-menu/item-mixin'
import memberAddSubMoney from '@/views/member/memberAddSubMoney.vue'
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    TagsNav,
    Fullscreen,
    SyLog,
    User,
    ABackTop,
    Icons,
    Notice,
    memberAddSubMoney
  },
  data () {
    return {
      collapsed: false,
      isFullscreen: false,
      allRoutes: allRoutes,
      messageCount: 0, // 未读信息数量,
      timer: null,
      notice: ''
    }
  },
  computed: {
    ...mapState({
      nowSite: state => state.user.nowSite,
      tagNavList: state => state.app.tagNavList,
      activeMenu: state => state.app.activeMenu,
      addSubMoney: state => state.app.addSubMoney
    }),
    notCacheList () {
      return [
        this.$route.meta && this.$route.meta.notCache ? this.$route.name : ''
      ]
    },
    cacheList () {
      const list = [
        ...(this.tagNavList.length
          ? this.tagNavList
            .filter(item => !(item.meta && item.meta.notCache))
            .map(item => item.name)
          : [])
      ]
      return list
    },
    menuList () {
      let isLength = Object.keys(this.$store.state.app.allMenu).length
      if (isLength) {
        const activeMenu = this.$store.state.app.activeMenu
        let menu = this.$store.state.app.allMenu[activeMenu].children
        return getMenuByRouter(menu.length && menu)
      }
    },
    expandIcon () {
      return this.collapsed ? 'cebianlanzhankai' : 'cebianlanshouqi'
    },
    token () {
      return getToken()
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
  },
  watch: {
    $route (newRoute) {
      const { name, query, params, meta, path } = newRoute
      this.addTag({
        route: { name, query, params, meta, path },
        type: 'push'
      })
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.setHomeRoute(routers)
    const { name, params, query, meta, path } = this.$route
    this.addTag({
      route: { name, params, query, meta, path }
    })
    // 设置初始语言
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      })
    }
    window.addEventListener('resize', () => {
      if (document.documentElement.clientWidth <= 1470) this.collapsed = true
    })

    // 定时发送remind请求
    this.remindInterval()
  },
  methods: {
    ...mapMutations([
      'setActiveMenu',
      'setTagNavList',
      'addTag',
      'setHomeRoute',
      'closeTag',
      'showAddSubMoney',
      'refreshMenuItem'
    ]),
    ...mapActions(['handleLogin']),
    turnToPage (route) {
      let { name, params, query, path } = {}
      if (route === 'memberSearchFunds') {
        this.showAddSubMoney(!this.addSubMoney)
        return
      }
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
        path = route.path
      }
      this.refreshMenuItem(route)
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query,
        path
      })
    },
    handleCollapsedChange () {
      this.collapsed = !this.collapsed
    },
    // 关闭窗口
    handleCloseTag (res, type, route) {
      if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage(this.$config.homeName)
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route)
          }
        }
      }
      this.setTagNavList(res)
    },
    handleClick (item) {
      this.setActiveMenu(item)
      this.turnToPage(item)
    },
    // 获取公告信息
    getRemind () {
      let time = new Date().getTime()
      let str = ''
      remind({ siteId: this.$root.nowSite.id, time }).then(res => {
        if (res.data) {
          // this.messageCount = res.data.filter(item => item.code == 'message')[0].count
          for (let item of res.data) {
            if (item.code !== 'message') {
              str += `${item.name}: ${item.count}条 `
            }
          }
          this.notice = str
        }
      })
    },
    // 定时请求
    remindInterval () {
      clearInterval(this.timer)
      this.timer = null
      this.getRemind()
      this.timer = setInterval(() => {
        this.getRemind()
      }, 15000)
    }
  }
}
</script>
