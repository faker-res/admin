<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="开始日期">
          <DatePicker type="date" placeholder="请选择开始时间" class="s-120" v-model="Time[0]" ></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker type="date" placeholder="请选择结束时间" class="s-120" v-model="Time[1]" ></DatePicker>
        </FormItem>
        <!-- <FormItem>
          <Checkbox v-model="searchKey.isLike">
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem> -->
        <FormItem label="会员账号">
          <Input placeholder="请输入会员账号" class="s-140" v-model="searchKey.userName"/>
          <!-- <Poptip trigger="hover" content="多个请以,逗号隔开,仅支持同类型多个输入" placement="bottom-end">
            <Icons type="tishi" color="#E4E4E4" :size="26"/>
          </Poptip> -->
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="$root.searchBtnLoading" class="search ml10f" @click="searchSubmit">查询</Button>
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
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        @on-sort-change="sortChange"
      ></Tables>
    </div>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Icons from "@/components/icons";
import tableMixins from "@/mixins/table";
import { getMemberReportData } from "@/api/report";
export default {
  name: "memberReport",
  mixins: [tableMixins],
  components: {
    Tables,
    Icons
  },
  data() {
    return {
      searchKey: {
        startTime: this.$root.startTime(),
        endTime: this.$root.formatnightTimeS()
      },
      Time: [this.$root.startTime(), this.$root.formatnightTimeS()],
      table: {
        total: 0,
        columns: [
          {
            title: "会员账号",
            key: "userName",
            align: "center"
          },
          {
            title: "上级代理",
            key: "agencyName",
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
            title: "会员输赢",
            key: "netAmount",
            align: "center",
            sortable: 'custom',
            render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.netAmount)}</span>
            }
          },
          {
            title: "代理收入",
            key: "agencyRebateAmount",
            align: "center",
            sortable: 'custom',
             render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.agencyRebateAmount)}</span>
            }
          },
          {
            title: "优惠金额",
            key: "memberBonus",
            align: "center",
            sortable: 'custom',
             render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.memberBonus)}</span>
            }
          },
          { 
            title: "网站盈利",
            width: "150",
            key: "profit",
            align: "center",
            // sortable: 'cusotm',
            render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.profit)}</span>
            }
          },
          {
            title: "盈率",
            key: "profitRate",
            align: "center",
            // sortable: 'custom',
            render: (h,params) => <span>{`${params.row.profitRate}%`}</span>
          },
          {
            title: "存款金额",
            key: "depositAmount",
            align: "center",
            sortable: 'custom',
            width: "200",
            render: (h, params) => {
              return (
                <span>
                  {this.$root.keepTwo(params.row.depositAmount)}({params.row.depositCount}笔)
                </span>
              );
            }
          },
          {
            title: "取款金额",
            key: "withdrawalsAmount",
            align: "center",
            sortable: 'custom',
            width: "200",
            render: (h, params) => {
              return (
                <span>
                  {this.$root.keepTwo(params.row.withdrawalsAmount)}({params.row.withdrawalsCount}
                  笔)
                </span>
              );
            }
          }
        ],
        data: []
      }
    };
  },
  methods: {
    getData(data) {
      let dataParams=data.params
       for (let key in dataParams) {
        if (!dataParams[key]) delete dataParams[key];
      }
      this.$root.startTableLoading();
      if(data.params.isLike) data.params.isLike=Number(data.params.isLike)
      getMemberReportData(data).then(res => {
        const { list, total } = res.data.data;
        console.log(list)
        console.log(total)
        list.length && list.push(this.createTotalData(total));
        this.table.data = list;
        this.table.total = res.data.total;
        
      });
    },
    createTotalData(total) {
      const {
        betAmount,
        validBetAmount,
        netAmount,
        agencyRebateAmount,
        memberBonus,
        profit,
        profitRate,
        depositCount,
        depositAmount,
        withdrawalsCount, 
        withdrawalsAmount
      } = total;
      let item = {
        userName: "总计",
        agencyName: "-",
        betAmount,
        validBetAmount,
        netAmount,
        agencyRebateAmount,
        memberBonus,
        profit,
        profitRate,
        depositAmount,
        depositCount,
        withdrawalsCount,
        withdrawalsAmount
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
      if (params.userName && params.userName.length < 5) {
        this.$Tip.info({ content: "会员账号最小5个字符！" });
        return false;
      }
      if(!params.startTime || !params.endTime){
        this.$Tip.info({ content: '请选择查询时间'})
        return false
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
.ivu-form-item {
  &:nth-child(3) {
    margin-right: -5px;
  }
}
.mw104 {
  min-width: 104px;
}
</style>


