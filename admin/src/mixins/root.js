/* eslint-disable space-before-function-paren */
// 根节点的mixns
import { mapState, mapActions } from 'vuex'
const rootMixins = {
  data() {
    return {
      tableLoading: false,
      searchBtnLoading: false,
      exportBtnLoading: false,
      editBtnLoading: false
    }
  },
  computed: {
    ...mapState({
      nowSite: state => state.user.nowSite
    })
  },
  created() {
    this.$Message.config({
      top: 80, duration: 4
    })
    this.getNewRoute()
  },
  methods: {
    ...mapActions(['getNewRoute']),
    // 开启表格的loading还有查询按钮的loading
    startTableLoading() {
      this.tableLoading = true
      this.searchBtnLoading = true
    },
    // 关闭表格的loading还有查询按钮的loading
    endTableLoading() {
      this.tableLoading = false
      this.searchBtnLoading = false
    },
    // 开启编辑页loading
    startEditLoading() {
      this.editBtnLoading = true
    },
    // 关闭编辑页loading
    endEditLoading() {
      this.editBtnLoading = false
    },
    // 获取表格搜索栏默认的时间
    startTime(type) {
      type = type === 1 ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss'
      return this.$moment().startOf('day').format(type)
    },
    // 获取当前对应格式的时间
    newstartTime() {
      return this.$moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    },
    endTime(type) {
      type = type === 1 ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss'
      return this.$moment().format(type)
    },
    midnight(type) {
      type = type === 1 ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss'
      return this.$moment().endOf('day').set('hours', 23).set('minutes', 59).set('seconds', 59).format(type)
    },
    // 获取距离目前多少天前的时间
    fromNow(num, type) {
      let moment = this.$moment
      type = type === 1 ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss'
      return moment().day(moment().day() - num).format(type)
    },
    // 转换时间为YYYY-MM-DD格式
    formatTime(time) {
      return this.$moment(time).format('YYYY-MM-DD')
    },
    // 转换时间为YYY-MM-DD HH:mm-SS
    formatTimeS(time) {
      return this.$moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    formatnightTimeS(time) {
      return this.$moment(time).format('YYYY-MM-DD 23:59:59')
    },
    moneyTime(time) {
      return this.$moment(time).format('YYYY-MM-DD 09:00:00')
    },
    lastTime(time) {
      return this.$moment(time).format('YYYY-MM-DD 08:59:59')
    },
    nextTime(time) {
      return this.$moment(time).day(this.$moment(time).day() + 1).format('YYYY-MM-DD 08:59:59')
    },
    // 时间戳并转换时间为YYYY-MM-DD格式
    unixTime(time) {
      return this.$moment.unix(time).format('YYYY-MM-DD HH:mm:ss')
    },
    //获取三个月之前的时间
    threemonth(){
      let start_date = this.$moment(new Date()).subtract(3,'months').format('YYYY-MM-DD 00:00:00')
      let end_date = this.$moment()
       return end_date.diff(start_date, 'days') 
    },
    // 验证查询页面的时间
    validateTime(Time) {
      if ((Time[0] && !Time[1]) || (Time[1] && !Time[0])) {
        this.$Tip.info({ content: '请选择完整的开始时间和结束时间' })
        return false
      }

      if (Time[0] && Time[1]) {
        const [startTime, endTime] = Time
        if (new Date(endTime).getTime() - new Date(startTime).getTime() < 0) {
          this.$Tip.info({ content: '结束时间必须大于开始时间！' })
          return false
        } else if (new Date(endTime).getTime() - new Date(startTime).getTime() === 0) {
          return Time
        }
        return Time
      }
      return Time
    },
    // 验证查询页面的时间
    validatecourseTime(Time) {
      if ((Time[0] && !Time[1]) || (Time[1] && !Time[0])) {
        this.$Message.error('请选择完整的开始时间和结束时间')
        return false
      }

      if (Time[0] && Time[1]) {
        const [startTime, endTime] = Time
        if (new Date(endTime).getTime() - new Date(startTime).getTime() < 0) {
          this.$Message.error('结束时间必须大于开始时间！')
          return false
        } else if (new Date(endTime).getTime() - new Date(startTime).getTime() === 0) {
          return Time
        }
        return Time
      }
      return Time
    },
    // 过滤返回空的数据
    text(text) {
      // eslint-disable-next-line no-unneeded-ternary
      return text ? text : '-'
    },
    keepTwo(num) {
      if(num==null) return "0.00"
      var result = parseFloat(num)
      result = Math.round(num * 100) / 100
      var sx = result.toString()
      var posDes = sx.indexOf('.')
      if (posDes < 0) {
        posDes = sx.length
        sx += '.'
      }
      while (sx.length <= posDes + 2) {
        sx += 0
      }
      return sx
    },
    btnShow(parent, child) {
      if (parent && parent.indexOf(child) !== -1) {
        return 'inline-block'
      } else {
        return 'none'
      }
    }
  }
}

// eslint-disable-next-line eol-last
export default rootMixins