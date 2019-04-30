<template>
  <div class="header-bar">
    <Menu mode="horizontal" theme="dark" :active-name="activeMenu" @on-select="onSelectMenu">
      <div class="layout-site">
        <SiteSelect
          placeholder="全部"
          width="160"
          :clearable="false"
          :siteList="accessSite || []"
          @on-site-change="onSiteChange"
        />
      </div>
      <div class="layout-nav" v-if="allMenu">
        <MenuItem
          v-for="(menu,index) in allMenu"
          :name="menu.name"
          :key="index"
          v-if="!menu.meta.hideInTop"
        >{{menu.meta.title}}</MenuItem>
      </div>
      <div class="custom-content-con">
        <slot></slot>
      </div>
    </Menu>
  </div>
</template>
<script>
import SiteSelect from '@/components/site-select'
// import allRoutes from "@/router/routes";
import { mapState, mapMutations, mapActions } from 'vuex'
import './header-bar.less'
export default {
  name: 'HeaderBar',
  components: {
    SiteSelect
  },
  data () {
    return {
      originData: {}
    }
  },
  computed: {
    ...mapState({
      accessSite: state => state.user.accessSite,
      activeMenu: state => state.app.activeMenu,
      allMenu: state => state.app.allMenu,
      tagNavList: state => state.app.tagNavList,
      singleLotteryArray: state => state.app.singleLotteryArray
    })
  },
  mounted () {
    this.onSiteChange(this.$root.nowSite, false)
  },
  methods: {
    ...mapMutations(['updateNowSite', 'setActiveMenu', 'setAllMenu']),
    ...mapActions(['getNewRoute']),
    onSelectMenu (key) {
      this.setActiveMenu(key)
      if (this.allMenu[key].children[0].children.length > 0){
        this.$router.push(this.allMenu[key].children[0].children[0])
      } else {
        if (key == 'lottery') {
          this.allMenu[key].children.forEach(item => {
            if (item.meta.hideInMenu == false) this.$router.push(item)
          })
        } else {
          this.$router.push(this.allMenu[key].children[0])
        }
      }
    },
    onSiteChange (site, flag) {
      this.updateNowSite(site)
      // 用户没有单站权限
      this.allMenu.lottery.children.forEach(item => {
        if (item.name === 'singleFastLottery' && this.singleLotteryArray) {
          item.meta.hideInMenu = this.singleLotteryArray.indexOf(site.id) === -1 ? true : false
        }
        if (item.name === 'fastLottery' && this.singleLotteryArray) {
          item.meta.hideInMenu = this.singleLotteryArray.indexOf(site.id) === -1 ? false : true
        }
      })
      if (flag) {
        this.setActiveMenu('member')
        this.onSelectMenu(this.activeMenu)
        this.$emit('on-close-all', this.handRoute(), 'all')
      }
    },
    handRoute () {
      let arr
      arr = this.tagNavList.filter(el => el.name === this.$config.homeName)
      return arr
    }
  }
}
</script>
<style style="less"  scpoed>
</style>
