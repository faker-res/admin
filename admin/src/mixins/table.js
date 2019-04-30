/* eslint-disable space-before-function-paren */
// 表格页的mixins
import { mapState } from 'vuex'

const listMixins = {
  data() {
    return {
      Time: [],
      // autoFresh: '0',
      // autoFreshTimer: null,
      searchKey: {},
      page: 1,
      sortParams: {}
    }
  },
  computed: {
    ...mapState({
      nowSite: state => state.user.nowSite
    })
  },
  watch: {
    // 自动刷新
    // autoFresh(newVal, oldVal) {
    //   if (newVal !== oldVal) this.autoFreshFun(newVal)
    // }
  },
  filters: {},
  mounted() {
    let data = { siteId: this.$root.nowSite.id }
    this.getData({ params: { ...this.searchKey, ...data } })
  },
  methods: {
    // 分页
    onPageChange(page) {
      console.log(this.searchKey)
      let data = { ...this.searchKey, siteId: this.nowSite.id }
      delete data.startTime
      delete data.endTime
      if (this.$root.formatTimeS(this.Time[0]) !== 'Invalid date') {
        data.startTime = this.$root.formatTimeS(this.Time[0])
        data.endTime = this.$root.formatnightTimeS(this.Time[1])
      }
      this.page = page
      data = { ...data, ...this.sortParams }
      this.getData({ params: data, query: { page } })
    },
    // 每页显示几条
    onPageSizeChange(pageSize) {
      this.searchKey.limit = pageSize
      let data = { ...this.searchKey, siteId: this.nowSite.id, limit: pageSize }
      delete data.startTime
      delete data.endTime
      if (this.$root.formatTimeS(this.Time[0]) !== 'Invalid date') {
        data.startTime = this.$root.formatTimeS(this.Time[0])
        data.endTime = this.$root.formatnightTimeS(this.Time[1])
      }
      this.getData({ params: data })
    },
    // 排序
    sortChange({ column, key, order }) {
      let data = { sortKey: key, sortVal: order, siteId: this.$root.nowSite.id }
      this.searchKey.startTime = this.$root.formatTimeS(this.Time[0])
      this.searchKey.endTime = this.$root.formatnightTimeS(this.Time[1])
      if (data.sortVal === 'normal') {
        delete data.sortKey
        delete data.sortVal
      }
      this.sortParams = {}
      this.sortParams = { ...data }
      if (this.page !== 1) {
        this.getData({ params: { ...this.searchKey, ...data }, query: { page: this.page } })
      } else {
        this.getData({ params: { ...this.searchKey, ...data } })
      }
      // this.getData({ params: { ...this.searchKey, ...data } })
    },
    exportExcel() {
      this.$root.exportBtnLoading = true
      this.$root.exportBtnLoading = false
    }
    // autoFreshFun(val) {
    //   const data = { ...this.searchKey, siteId: this.$root.nowSite.id }
    //   this.getData({ params: data })
    //   if (val === '0') {
    //     clearInterval(this.autoFreshTimer)
    //   } else {
    //     clearInterval(this.autoFreshTimer)
    //     this.autoFreshTimer = setInterval(() => {
    //       this.getData({ params: data })
    //     }, val * 1000)
    //   }
    // },
    // catchError() {
    //   clearInterval(this.autoFreshTimer)
    //   this.autoFresh = '0'
    // }
  }
  // activated() {
  //   this.autoFreshFun(this.autoFresh)
  // },
  // deactivated() {
  //   clearInterval(this.autoFreshTimer)
  // }
}
export default listMixins
