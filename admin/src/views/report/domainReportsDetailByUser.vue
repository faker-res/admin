<template>
  <div>
    <div class="v2-search clearfix">
      <Form ref="searchKey" inline class="ib fl">
        <FormItem v-for="(t,i) in btnList" :key="i">
          <Button :class="btnName == t ? 'bd-bg' : 'bg-or'" @click="changeBtn(t)">{{t}}</Button>
        </FormItem>
        <FormItem label="开始日期">
          <DatePicker placeholder="请选择开始日期" class="s-140" v-model="Time[0]"></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker placeholder="请选择开始日期" class="s-140" v-model="Time[1]"></DatePicker>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="$root.searchBtnLoading" class="ivu-btn search" @click="searchSubmit">查询</Button>
        </FormItem>
      </Form>
      <div class="fr">
        <span class='font-bold ft16'>域名：</span>
        <span class="pr10">{{$route.query.domain}}</span>
      </div>
    </div>
    <div class="v2-table">
      <Tables
        :loading="$root.tableLoading"
        :columns='table.columns'
        :total="table.total"
        :value="table.data"
        :pageSizeOpts='table.pageSizeOpts'
        @on-sort-change="sortChange"
        @on-page-change='onPageChange'
        @on-page-size-change="onPageSizeChange"
      ></Tables>
    </div>
  </div>
</template>
<script>
import Tables from '_c/tables';
import { domainReportsDetailByUser } from '@/api/report';
export default {
  name: 'domainReportsDetailByUser',
  components: {Tables},
  data() {
    return {
      btnList: ['今天','昨天','本月','上月','总数据'],
      btnName: '',
      Time: [this.$root.newstartTime(), new Date()],
      searchKey: {
        siteId: this.$root.nowSite.id,
        startTime: this.$root.startTime(),
        endTime: this.$root.formatnightTimeS(),
        domain: this.$route.query.domain,
        type: this.$route.query.page
      },
      table: {
        loading: true,
        total: 0,
        data: [],
        pageSizeOpts: [20,30,40],
        columns: [
          {
            title: '会员账号',
            key: 'userName',
            align: 'center'
          },
          {
            title: '账号类型',
            key: 'agencyLevel',
            align: 'center'
          },
          {
            title: "姓名",
            key: 'realName',
            align: 'center',
            render: (h,params) => <span>{this.$root.text(params.row.realName)}</span>
          },
          {
            title: '余额',
            key: "balance",
            align: 'center',
            sortable: 'custom',
            render: (h,params) => <span>{this.$root.keepTwo(params.row.balance)}</span>
          },
          {
            title: '存款总额',
            align: 'center',
            key: 'depositAmount',
            sortable: 'custom',
            render: (h,params) => {
              let { depositAmount, depositCount } = params.row
              return <span>{this.$root.keepTwo(depositAmount)}/{depositCount}笔</span>
            }
          },
          // {
          //   title: '最大单笔',
          //   key: 'maxDeposit',
          //   sortable: 'custom',
          //   align: 'center'
          // },
          {
            title: '取款总额',
            align: 'center',
            key: 'withdrawalsAmount',
            sortable: 'custom',
            render: (h,params) => {
              let { withdrawalsAmount, withdrawalsCount } = params.row
              return <span>{this.$root.keepTwo(withdrawalsAmount)}/{withdrawalsCount}笔</span>
            }
          },
          {
            title: '总输赢',
            key: 'profit',
            sortable: 'custom',
            align: 'center',
            render: (h,params) => <span>{this.$root.keepTwo(params.row.profit)}</span>
          },
          {
            title: '注册时间',
            key: 'created_at',
            align: 'center',
            render: (h,params) => {
              let { created_at } = params.row
              if (created_at > 0) {
                return <span>{this.$root.unixTime(created_at)}</span>
              } else {
                return <span>{created_at}</span>
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.changeBtn(this.$route.query.btnName)
  },
  methods: {
    changeBtn(name) {
      this.btnName = name;
      switch (name) {
        case "今天":
          this.searchKey.startTime = this.$moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
          this.searchKey.endTime = this.$moment().endOf('day').set('hours',23).set('minutes',59).set('seconds',59).format('YYYY-MM-DD HH:mm:ss')
          break;
        case "昨天":
          this.searchKey.startTime =  this.$moment().day(this.$moment().day()-1).startOf('day').set('hours',0).set('minutes',0).set('seconds',0).format('YYYY-MM-DD HH:mm:ss')
          this.searchKey.endTime = this.$moment().day(this.$moment().day()-1).startOf('day').set('hours',23).set('minutes',59).set('seconds',59).format('YYYY-MM-DD HH:mm:ss')
          break;
        case "本月":
          this.searchKey.startTime = this.$moment().month(this.$moment().month()).startOf('month').set('hours',0).set('minutes',0).set('seconds',0).format('YYYY-MM-DD HH:mm:ss')
          this.searchKey.endTime = this.$moment().endOf('day').set('hours',23).set('minutes',59).set('seconds',59).format('YYYY-MM-DD HH:mm:ss')
          break;
        case "上月":
          this.searchKey.startTime =  this.$moment().month(this.$moment().month() - 1).startOf("month").set('hours',0).set('minutes',0).set('seconds',0).format('YYYY-MM-DD HH:mm:ss')
          this.searchKey.endTime = this.$moment().month(this.$moment().month() - 1).endOf('month').set('hours',23).set('minutes',59).set('seconds',59).format('YYYY-MM-DD HH:mm:ss')
          break;
        default:
          this.searchKey.startTime =  this.$moment().month(this.$moment().month() - 3).set('hours',0).set('minutes',0).set('seconds',0).format('YYYY-MM-DD HH:mm:ss')
          this.searchKey.endTime = this.$moment().endOf('day').set('hours',23).set('minutes',59).set('seconds',59).format('YYYY-MM-DD HH:mm:ss')
        break;
      }
        this.Time[0] = this.searchKey.startTime
        this.Time[1] = this.searchKey.endTime
        this.getData({params: this.searchKey})
    },
    getData(data) {
      this.$root.startTableLoading()
      domainReportsDetailByUser(data).then(res => {
        if (res.data.data) {
          const { list, total } = res.data.data
          list.length && list.push(this.createData(total))
          this.table.data = list
          this.table.total = res.data.total
        }
      })
    },
    searchSubmit() {
      let data = { ...this.searchKey,startTime: this.$root.formatTimeS(this.Time[0]),endTime: this.$root.formatnightTimeS(this.Time[1])}
      for(let key in data) {
        if (!data[key]) delete data[key]
      }
      let { startTime, endTime } = data
      if (startTime == 'Invalid date' || endTime =='Invalid date') {
        this.$Tip.info({content: '请选择查询时间'})
        return false
      }
      this.getData({ params: data })
    },
    createData(total) {
      const {userName,agencyLevel,realName,balance,depositAmount,depositCount,withdrawalsAmount,withdrawalsCount,profit,created_at,maxDeposit} = total
      let item = {
        userName: '本页统计',
        agencyLevel: '-',
        realName: '-',
        depositAmount,depositCount,
        withdrawalsAmount,withdrawalsCount,
        profit,
        balance,
        created_at: '-',
        maxDeposit: '-'
      }
      return item
    },
    sortChange({ columns, key, order }) {
      let data = {
        sortKey: key,
        sortVal: order,
        ...this.searchKey
      }
      if (data.sortVal == 'normal') {
        delete data.sortKey
        delete data.sortVal
      }
      this.getData({ params: data })
    },
    onPageChange(page) {
      this.getData({ params: this.searchKey, query: { page }})
    },
    onPageSizeChange(pageSize) {
      this.searchKey.limit = pageSize
      this.getData({ params: this.searchKey })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
.bd-bg {
  width: 80px;
  height: 36px;
  background-color: #2d8cf0;
  color: #ffffff;
  box-shadow: 0;
  &:focus {
    box-shadow: 0 0 0 0;
  }
}
.bg-or {
  width: 80px;
  height: 36px;
  border: 1px solid #eaeaea;
  &:focus {
    box-shadow: 0 0 0 0;
  }
  &:hover {
    background: #f4f9ff;
    border: 1px solid #2d8cf0;
    color: #2d8cf0;
  }
}
</style>

