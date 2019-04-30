<template>
  <div>
    <div class="v2-search clearfix">
      <Form ref="searchKey" inline class="fl">
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
          <DatePicker
            type="datetime"
            placeholder="结束时间"
            class="s-180"
            v-model="Time[1]"
            format="yyyy-MM-dd 23:59:59"
          ></DatePicker>
        </FormItem>
        <FormItem>
          <Checkbox>模糊</Checkbox>
        </FormItem>
        <FormItem label="会员账号">
          <Input v-model="searchKey.userName" class="s-140" placeholder="多个请以,逗号隔开"/>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            :loading="$root.searchBtnLoading"
            class="search"
            @click="searchSubmit"
          >查询</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="$root.exportBtnLoading" class="ivu-btn export">导出EXCEL</Button>
        </FormItem>
      </Form>
      <div class="fr" v-if="table.data[0]">
        <span class="ft16" style="fontWeight:bold;">当前彩票：</span>
        <span class="ft16">{{table.data[0].gameName}}</span>
      </div>
    </div>
    <div class="v2-table">
      <Tables
        ref="table"
        :loading="$root.tableLoading"
        :columns="table.columns"
        :total="table.total"
        :value="table.data"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        @on-sort-change="sortChange"
      ></Tables>
    </div>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import tableMixins from "@/mixins/table";
import { getlotteryReportDetailData } from "@/api/report";
import { endianness } from "os";
export default {
  name: "lotteryReportDetail",
  mixins: [tableMixins],
  components: {
    Tables
  },
  data() {
    return {
      searchKey: {
        timeType: "cn",
        startTime: this.$root.startTime(),
        endTime: this.$root.formatnightTimeS()
      },
      Time: [this.$root.startTime(), this.$root.formatnightTimeS()],
      table: {
        total: 0,
        data: [],
        columns: [
          {
            title: "会员账号",
            key: "userName",
            align: "center",
            render: (h, params) => {
              const { userName } = params.row;
              return (
                <span
                  class={{ "blue-font": userName !== "本页统计" }}
                  onClick={() => this.goGameRecordPage(params)}
                >
                  {userName}
                </span>
              );
            }
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
            render: (h, params) => {
              return <span>{this.$root.keepTwo(params.row.betAmount)}</span>;
            }
          },
          {
            title: "有效投注",
            key: "validBetAmount",
            sortable: 'custom',
            align: "center",
            render: (h, params) => {
              return (
                <span>{this.$root.keepTwo(params.row.validBetAmount)}</span>
              );
            }
          },
          {
            title: "中奖金额",
            key: "winAmount",
            align: "center",
            sortable: 'custom',
            render: (h, params) => {
              return <span>{this.$root.keepTwo(params.row.winAmount)}</span>;
            }
          },

          {
            title: "撤单金额",
            key: "cancelBetAmount",
            sortable: 'custom',
            align: "center",
            render: (h, params) => {
              return (
                <span>{this.$root.keepTwo(params.row.cancelBetAmount)}</span>
              );
            }
          },
          {
            title: "返点金额",
            key: "rebatePointsAmount",
            sortable: 'custom',
            align: "center",
            render: (h, params) => {
              return (
                <span>{this.$root.keepTwo(params.row.rebatePointsAmount)}</span>
              );
            }
          },
          {
            title: "平台输赢",
            key: "netAmount",
            align: "center",
            sortable: 'custom',
            render: (h, params) => {
              return <span>{this.$root.keepTwo(params.row.netAmount)}</span>;
            }
          },
          {
            title: "盈率",
            key: "winRate",
            align: "center",
            sortable: 'custom',
            render: (h, params) => <span>{`${params.row.winRate}%`}</span>
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
    goGameRecordPage(params) {
      const { userName } = params.row;
      let platform = this.$route.query.platform;
      let [startTime, endTime] = this.Time;
      startTime = this.$root.formatTimeS(startTime);
      endTime = this.$root.formatnightTimeS(endTime);
      this.$router.push({
        name: "gameReport",
        query: { type: "lottery", userName, startTime, endTime, platform }
      });
    },
    getData(data) {
      let dataParams = data.params;
      for (let key in dataParams) {
        if (!dataParams[key]) delete dataParams[key];
      }
      this.$root.startTableLoading();
      if (data.params.isLike) data.params.isLike = Number(data.params.isLike);
      getlotteryReportDetailData(data).then(res => {
        const { list, total } = res.data.data;
        list.length && list.push(this.createTotalData(total));
        this.table.data = list;
        this.table.total = res.data.total;
      });
    },
    createTotalData(total) {
      const {
        betUser,
        betCount,
        betAmount,
        validBetAmount,
        netAmount,
        cancelBetAmount,
        rebatePointsAmount,
        winAmount,
        winRate
      } = total;
      let item = {
        userName: "本页统计",
        betUser,
        betCount,
        betAmount,
        validBetAmount,
        netAmount,
        cancelBetAmount,
        rebatePointsAmount,
        winAmount,
        winRate
      };
      return item;
    },
    searchSubmit() {
      this.$refs.table.setPage();
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

      this.searchKey.startTime = params.startTime;
      this.searchKey.endTime = params.endTime;
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
</style>

