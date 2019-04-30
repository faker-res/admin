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
          <Button type='primary' :loading="$root.searchBtnLoading" class="ivu-btn search" @click="searchSubmit">查询</Button>
        </FormItem>
      </Form>
      <div class="fr">
        <span class='font-bold ft16 pr10'>域名：</span>
        <span class="pr10">{{$route.query.domain}}</span>
      </div>
    </div>
    <div class="v2-table">
      <Tables
        :loading="$root.tableLoading"
        :columns="table.columns"
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
import { domainReportsDetailByDomain } from '@/api/report';
export default {
  name: 'domainReportsDetailByDomain',
  components: {Tables},
  data() {
    return{
      btnList: ['最近7天','本月','上月'],
      btnName: '',
      Time: [this.$root.fromNow(7),this.$root.startTime()],
      searchKey: {
        startTime: this.$moment().day(this.$moment().day() - 7).set('hours',23).set('minutes',59).set('seconds',59).format('YYYY-MM-DD HH:mm:ss'),
        endTime: this.$moment().startOf('day').set('hours',23).set('minutes',59).set('seconds',59).format('YYYY-MM-DD HH:mm:ss'),
        siteId: this.$root.nowSite.id,
        domain: this.$route.query.domain
      },
      table: {
        loading: true,
        total: 0,
        data: [],
        pageSizeOpts: [20,30,40,50],
        columns: [
          {
            title: '日期',
            key: 'data_date',
            align: 'center',
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
            title: "访问人数",
            key: "accessIpNum",
            align: 'center',
            sortable: 'custom'
          },
          {
            title: '注册人数',
            key: "registerNum",
            align: 'center',
            sortable: 'custom'
          },
          {
            title: "登录人数",
            key: "loginIpNum",
            align: 'center',
            sortable: 'custom'
          }
        ]
      }
    }
  },
  mounted() {
    let { btnName } = this.$route.query
    if (btnName) {
      this.changeBtn(btnName)
    } else {
      this.btnName = '最近7天'
      this.getData({ params: this.searchKey })
    }
  },
  methods: {
    changeBtn(name) {
      this.btnName = name
      switch (name) {
        case '最近7天':
          this.searchKey.startTime = this.$moment().day(this.$moment().day() - 7).set('hours',23).set('minutes',59).set('seconds',59).format('YYYY-MM-DD HH:mm:ss')
          this.searchKey.endTime = this.$moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
        break;
        case '本月':
          this.searchKey.startTime = this.$moment().month(this.$moment().month()).startOf('month').set('hours',0).set('minutes',0).set('seconds',0).format('YYYY-MM-DD HH:mm:ss')
          this.searchKey.endTime = this.$moment().endOf('day').set('hours',23).set('minutes',59).set('seconds',59).format('YYYY-MM-DD HH:mm:ss')
        break;
        default: 
          this.searchKey.startTime =  this.$moment().month(this.$moment().month() - 1).startOf("month").set('hours',0).set('minutes',0).set('seconds',0).format('YYYY-MM-DD HH:mm:ss')
          this.searchKey.endTime = this.$moment().month(this.$moment().month() - 1).endOf('month').set('hours',23).set('minutes',59).set('seconds',59).format('YYYY-MM-DD HH:mm:ss')
        break;
      }
      this.Time[0] = this.searchKey.startTime
      this.Time[1] = this.searchKey.endTime
      this.getData({params: this.searchKey})
    },
    getData(data) {
      this.$root.startTableLoading()
      domainReportsDetailByDomain(data).then(res => {
        if (res.data.data) {
          const { list, total } = res.data.data
          list.length && list.push(this.createTotalData(total))
          this.table.data = list
          this.table.total = res.data.total
        }
      })
    },
    createTotalData(total) {
      const { data_date, accessIpNum, registerNum, loginIpNum, domain } = total
      let item = {
        data_date: '本页统计',
        accessIpNum,
        registerNum,
        loginIpNum,
        domain
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