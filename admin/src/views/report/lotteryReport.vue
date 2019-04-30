<template>
  <div>
    <div class="v2-search">
      <Form inline ref="searchKey">
        <FormItem label="彩票分类">
          <LotterySelect ref="LotterySelect" class="s-140" @on-lottery-change="onLotteryChange"></LotterySelect>
        </FormItem>
        <FormItem label="时区">
          <Select v-model="searchKey.timeType" class="s-140">
            <Option value="cn">北京时间</Option>
            <Option value="en">美东时间</Option>
          </Select>
        </FormItem>
         <FormItem label="开始时间">
          <DatePicker type="datetime" placeholder="开始时间" class="s-180" v-model="Time[0]"></DatePicker>
         </FormItem>
        <FormItem label="结束时间">
          <DatePicker type="datetime" placeholder="结束时间" class="s-180" v-model="Time[1]" format="yyyy-MM-dd 23:59:59"></DatePicker>
        </FormItem>
        <!-- <FormItem>
          <Checkbox v-model="searchKey.isLike">
            <span>模糊</span>
          </Checkbox>
        </FormItem> -->
        <FormItem label="会员账号">
          <Input v-model="searchKey.userName" placeholder="请输入会员账号" class="s-140"/>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="$root.searchBtnLoading" class="search" @click="searchSubmit">查询</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="$root.exportBtnLoading" class="ivu-btn export" @click="exportExcel">导出EXCEL</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        ref="table"
        :loading="$root.tableLoading"
        :columns="table.columns"
        :value="table.data"
        :total="table.total"
         :pageSizeOpts="table.pageSizeOpts"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        @on-sort-change="sortChange"
      ></Tables>
    </div>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import LotterySelect from "@/components/lottery-select";
import tableMixins from "@/mixins/table";
import { getlotteryReportData } from "@/api/report";
export default {
  name: "lotteryReport",
  mixins: [tableMixins],
  components: {
    Tables,
    LotterySelect
  },
  data() {
    return {
      searchKey: {
        timeType: "cn",
        startTime: this.$root.startTime(),
        endTime: this.$root.formatnightTimeS()
      },
      Time: [this.$root.newstartTime(),this.$root.formatnightTimeS()],
      table: {
        total: 10,
        loading: true,
        pageSizeOpts: [20, 30, 40, 50],
        data: [],
        columns: [
          {
            title: "彩票名称",
            key: "gameName",
            align: "center",
            render: (h, params) => {
              const { gameName, platform } = params.row;
              return (
                <span
                  class={{ "blue-font": gameName !== "总计" }}
                  onClick={() => {
                    this.goDetailPage(params);
                  }}
                >
                  {params.row.gameName}
                </span>
              );
            }
          },
          {
            title: "投注人数",
            key: "betUser",
            align: "center"
          },
          {
            title: "注单数量",
            key: "betCount",
            align: "center"
          },
          {
            title: "投注金额",
            key: "betAmount",
            align: "center",
            sortable: 'custom',
             render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.betAmount)}</span>
            }
          },
          {
            title: "有效投注",
            key: "validBetAmount",
            align: "center",
            sortable: 'custom',
              render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.validBetAmount)}</span>
            }
          },
          {
            title: "中奖金额",
            key: "winAmount",
            align: "center",
            sortable: 'custom',
             render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.winAmount)}</span>
            }
          },
          {
            title: "撤单金额",
            key: "cancelBetAmount",
            align: "center",
             render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.cancelBetAmount)}</span>
            }
          },
          {
            title: "返点金额",
            key: "rebatePointsAmount",
            align: "center",
             render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.rebatePointsAmount)}</span>
            }
          },
          {
            title: "平台输赢",
            key: "netAmount",
            align: "center",
            sortable: 'custom',
            render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.netAmount)}</span>
            }
          },
          {
            title: "盈利",
            key: "winRate",
            align: "center",
            sortable: 'custom',
            render: (h,params) => <span>{`${params.row.winRate}%`}</span>
          }
        ]
      }
    };
  },
  created() {
    this.$nextTick(() => {
      this.$refs.LotterySelect.init();
    });
  },
  methods: {
    goDetailPage(params) {
      console.log(params.row)
      const { platform } = params.row;
      const { timeType } = this.searchKey;
      let [startTime, endTime] = this.Time;
      startTime = this.$root.formatTimeS(startTime);
      endTime = this.$root.formatnightTimeS(endTime);
      console.log(startTime,endTime)
      this.$router.push({
        name: "lotteryReportDetail",
        query: { platform, startTime, endTime, timeType }
      });
    },
    checkAll (res) {
      return res === 'ALL' ? Reflect.deleteProperty(this.searchKey, 'type') : false
    },
    onLotteryChange(res) {
      if (this.checkAll(res.code)) return
      this.searchKey.type = res.code;
    },
    getData(data) {
      let dataParams=data.params
       for (let key in dataParams) {
        if (!dataParams[key]) delete dataParams[key];
      }
      this.$root.startTableLoading();
      if(data.params.isLike) data.params.isLike=Number(data.params.isLike)
      getlotteryReportData(data).then(res => {
        const { list, total } = res.data.data;
        list.length && list.push(this.createTotalData(total));
        this.table.data = list;
        this.table.total = res.data.total;
        console.log(this.table.total)
      });
    },
    createTotalData(total) {
      const {
        betUser,
        betCount,
        betAmount,
        validBetAmount,
        winAmount,
        cancelBetAmount,
        rebatePointsAmount,
        netAmount,
        winRate
      } = total;
      let item = {
        gameName: "总计",
        betUser,
        betCount,
        betAmount,
        validBetAmount,
        winAmount,
        cancelBetAmount,
        rebatePointsAmount,
        netAmount,
        winRate
      };
      return item;
    },
    searchSubmit() {
      this.$refs.table.setPage()
      let params = { ...this.searchKey };
      params.siteId = this.nowSite.id;
      if (this.$root.validateTime(this.Time)) {
        const [startTime, endTime] = this.$root.validateTime(this.Time);
        params.startTime = startTime && this.$root.formatTimeS(startTime);
        params.endTime = endTime && this.$root.formatnightTimeS(endTime);
      } else {
        return false;
      }
      let { startTime, endTime } = params
      this.searchKey.startTime = startTime
      this.searchKey.endTime = endTime
      if (params.userName && params.userName.length < 5) {
        this.$Tip.info({ content: "会员账号最小5个字符！" });
        return false;
      }

      if (!params.userName) delete params.isLike;

      for (let key in params) {
        if (!params[key]) delete params[key];
      }
      this.getData({ params });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
.td,
.td2,
.td3 {
  display: inline-block;
  width: 10%;
  text-align: center;
  border-right: 1px solid #dcdcdc;
  font-size: 14px;
}
</style>


