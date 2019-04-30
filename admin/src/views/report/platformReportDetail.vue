<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="时区">
          <Select v-model="searchKey.timeType" class="s-120">
            <Option v-for="item in  timeList" :value="item.value" :key="item.value">{{item.name}}</Option>
          </Select>
        </FormItem>
          <FormItem label="开始时间">
          <DatePicker type="datetime" placeholder="开始时间" class="s-180" v-model="Time[0]"></DatePicker>
         </FormItem>
          <!-- <span class="date-divide"></span> -->
           <FormItem label="结束时间">
          <DatePicker type="datetime" placeholder="结束时间" class="s-180" v-model="Time[1]" format="yyyy-MM-dd 23:59:59"></DatePicker>
        </FormItem>
        <!-- <FormItem>
          <Checkbox v-model="searchKey.isLike">
            <span>模糊</span>
          </Checkbox>
        </FormItem> -->
        <FormItem label="会员账号">
          <Input v-model="searchKey.userName" placeholder="多个请以，逗号隔开" class="s-140"/>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="$root.searchBtnLoading" class="search" @click="searchSubmit">查询</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="$root.exportBtnLoading" class="ivu-btn export w100x" @click="exportExcel">导出EXCEL</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        ref="table"
        editable
        :columns="table.columns"
        :loading="$root.tableLoading"
        :total="table.total"
        :value="table.data"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
      ></Tables>
    </div>
  </div>
</template>

<script>
import Tables from "@/components/tables";
import tableMixins from "@/mixins/table";
import { getplatformReportsDetailData } from "@/api/report";
import { mapState } from "vuex";
export default {
  name: "platformReportDetail",
  mixins: [tableMixins],
  components: {
    Tables
  },
  data() {
    return {
      timeList: [
        { value: "cn", name: "北京时间" },
        { value: "en", name: "美东时间" }
      ],
      searchKey: {
        timeType: "cn",
        startTime: this.$root.formatTime(new Date()) + " 00:00:00",
        endTime: this.$root.formatTimeS(new Date()),
        platform: "live_casino"
      },
      table: {
        loading: true,
        pageSizeOpts: [20],
        total: 100,
        data: [],
        columns: [
          {
            title: "会员账号",
            key: "userName",
            align: "center"
          },
          {
            title: "注单数量",
            key: "betCount",
            align: "center",
           sortable: "custom"
          },
          {
            title: "投注金额",
            key: "betAmount",
            align: "center",
             sortable: "custom",
               render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.betAmount)}</span>
            }
          },
          {
            title: "有效投注",
            key: "validBetAmount",
            align: "center",
             sortable: "custom",
              render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.validBetAmount)}</span>
            }
          },
          {
            title: "平台输赢",
            key: "netAmount",
            align: "center",
             sortable: "custom",
               render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.netAmount)}</span>
            }
          },

          {
            title: "盈率",
            key: "winRate",
            align: "center",
            sortable: "custom",
            render: (h,params) => <span>{`${params.row.winRate}%`}</span>
          }
        ]
      }
    };
  },
  created() {
    const { startTime, endTime } = this.$route.query;
    this.searchKey = { ...this.searchKey, ...this.$route.query };
    this.Time = [startTime, endTime];
  },
  methods: {
    getData(data) {
      let dataParams=data.params
       for (let key in dataParams) {
        if (!dataParams[key]) delete dataParams[key];
      }
      if(data.params.isLike) data.params.isLike=Number(data.params.isLike)
      this.$root.startTableLoading();
      getplatformReportsDetailData(data).then(res => {
        const { list, total } = res.data.data;
        list.length && list.push(this.createTotalData(total));
        this.table.data = list;
        this.table.total = res.data.total;
        
      });
    },
    createTotalData(total) {
      const { betCount, betAmount, validBetAmount, netAmount, winRate } = total;
      let item = {
        userName: "本页统计",
        betCount,
        betAmount,
        validBetAmount,
        netAmount,
        winRate
      };
      return item;
    },
    searchSubmit() {
      this.$refs.table.setPage()
      let params = { ...this.searchKey };
      params.siteId = this.$root.nowSite.id;
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

      if (!params.userName) delete params.isLike;

      for (let key in params) {
        if (!params[key]) delete params[key];
      }

      this.getData({ params });
    }
  }
};
</script>
<style>
.w10 {
  width: 12.5%;
}
</style>