<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
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
          <Button type='primary' :loading="$root.searchBtnLoading" class="ivu-btn search" @click="searchSubmit">查询</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="$root.exportBtnLoading" class="ivu-btn export">导出EXCEL</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        :loading="$root.tableLoading"
        :columns="table.columns"
        :value="table.data"
        :total="table.total"
        :pageSizeOpts="table.pageSizeOpts"
        @on-sort-change="sortChange"
        @on-page-change='onPageChange'
        @on-page-size-change="onPageSizeChange"
      ></Tables>
    </div>
  </div>
</template>
<script>
import { dayReport } from '@/api/report';
import Tables from '_c/tables';
export default {
  name: 'dailyCashReport',
  components: { Tables },
  data() {
    return {
      btnList: ['本月','上月'],
      btnName: '本月',
      Time: [],
      searchKey: {
        siteId: this.$root.nowSite.id
      },
      table: {
        loading: true,
        data: [],
        total: 0,
        pageSizeOpts: [20,30,40,50],
        columns: [
          {
            title: "日期",
            align: 'center',
            key: 'data_date',
            render: (h,params) => {
              let { data_date } = params.row
              if (data_date == '本页统计') {
                return <span>{data_date}</span>
              } else {
                return <span>{this.$moment.unix(data_date).format('YYYY-MM-DD')}</span>
              }
            }
          },
          {
            title: '注册人数',
            align: 'center',
            key: 'registerUserCount',
            sortable: 'custom'
          },
          {
            title: '首存人数',
            align: 'center',
            key: 'firstDepositUserCount',
            sortable: 'custom'
          },
          {
            title: '在线支付',
            align: 'center',
            key: 'depositAmountOnline',
            sortable: 'custom',
            render: (h,params) => {
              let { depositAmountOnline, depositCountOnline, depositUserOnline } = params.row
              return <span>{this.$root.keepTwo(depositAmountOnline)}/{depositCountOnline}笔/{depositUserOnline}人</span>
            }
          },
          {
            title: '公司入款',
            align: 'center',
            key: 'depositAmountOffline',
            sortable: 'custom',
            render: (h,params) => {
              let { depositAmountOffline, depositCountOffline, depositUserOffline } = params.row
              return <span>{this.$root.keepTwo(depositAmountOffline)}/{depositCountOffline}笔/{depositUserOffline}人</span>
            }
          },
          {
            title: '存款总额',
            align: 'center',
            key: 'depositAmount',
            sortable: 'custom',
            render: (h,params) => {
              let { depositAmount, depositCount, depositUserCount } = params.row
              return <span>{this.$root.keepTwo(depositAmount)}/{depositCount}笔/{depositUserCount}人</span>
            }
          },
          {
            title: '取款总额',
            align: 'center',
            key: 'withdrawalsAmount',
            sortable: 'custom',
            render: (h,params) => {
              let { withdrawalsAmount, withdrawalsCount, withdrawalsUserCount } = params.row
              return <span>{this.$root.keepTwo(withdrawalsAmount)}/{withdrawalsCount}笔/{withdrawalsUserCount}人</span>
            }
          },
          {
            title: '现金利润',
            align: 'center',
            key: 'moneyReport',
            sortable: 'custom',
            render: (h,params) => <span>{this.$root.keepTwo(params.row.moneyReport)}</span>
          },
          {
            title: '盈率',
            align: 'center',
            key: 'moneyReportRate',
            sortable: 'custom',
            render: (h,params) => {
              let { moneyReportRate } = params.row
              if (moneyReportRate.includes('%')) {
                return <span>{this.$root.keepTwo(moneyReportRate.split('%')[0])}%</span>
              } else {
                return <span>{this.$root.keepTwo(moneyReportRate)}%</span>
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    // 获取默认显示的本月时间
    this.changeBtn('本月')
  },
  methods: {
    changeBtn(name) {
      this.btnName = name
       switch (name) {
        case "本月":
          this.searchKey.startTime = this.$moment().month(this.$moment().month()).startOf('month').set('hours',0).set('minutes',0).set('seconds',0).format('YYYY-MM-DD HH:mm:ss')
          this.searchKey.endTime = this.$moment().endOf('day').set('hours',23).set('minutes',59).set('seconds',59).format('YYYY-MM-DD HH:mm:ss')
          break;
        case "上月":
          this.searchKey.startTime =  this.$moment().month(this.$moment().month() - 1).startOf("month").set('hours',0).set('minutes',0).set('seconds',0).format('YYYY-MM-DD HH:mm:ss')
          this.searchKey.endTime = this.$moment().month(this.$moment().month() - 1).endOf('month').set('hours',23).set('minutes',59).set('seconds',59).format('YYYY-MM-DD HH:mm:ss')
          break;
      }
      this.Time[0] = this.searchKey.startTime
      this.Time[1] = this.searchKey.endTime
      this.getData({params: this.searchKey})
    },
    getData(data) {
       this.$root.startTableLoading();
      dayReport(data).then(res => {
        if (res.data.data) {
          const { list, total } = res.data.data;
          list.length && list.push(this.createTotalData(total));
          this.table.data = list;
          this.table.total = res.data.total;
        } else {
          this.tabla.data = [];
          this.table.total = 0;
        }
      });
    },
    createTotalData(total) {
      const {registerUserCount,firstDepositUserCount,depositAmountOnline, depositCountOnline,
        depositAmountOffline, depositCountOffline, depositAmount, depositCount,
        withdrawalsAmount, withdrawalsCount, moneyReport,moneyReportRate,depositUserOnline,depositUserOffline,depositUserCount,withdrawalsUserCount
      } = total
      let item = {
        data_date: '本页统计',
        registerUserCount,
        firstDepositUserCount,
        depositCountOnline,
        depositAmountOnline,
        depositCountOffline,
        depositAmountOffline,
        depositCount,
        depositAmount,
        withdrawalsCount,
        withdrawalsAmount,
        moneyReport,
        moneyReportRate,
        depositUserOnline,
        depositUserOffline,
        depositUserCount,
        withdrawalsUserCount
      }
      return item
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
    sortChange({ column, key, order }) {
      let data = {
        sortKey:key,
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

