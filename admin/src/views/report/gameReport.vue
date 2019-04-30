<template>
  <div>
    <div class="v2-search" v-show="$route.name!=='lotteryReportDetail'">
      <Form ref="searchKey" inline>
        <GameSelect
          ref="GameSelect"
          :platforname="platformessg"
          @on-game-change="onGameChange"
          @on-platform-change="onPlatformChange"
          :clearable="true"
          placeholder="全部"
        ></GameSelect>
        <FormItem label="开始日期">
          <DatePicker type="date" class="s-120" placeholder="开始时间" v-model="Time[0]" :options="options3"></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker type="date" class="s-120" placeholder="结束时间" v-model="Time[1]" :options="options3"></DatePicker>
        </FormItem>
        <FormItem label="注单编号">
          <Input class="s-180" v-model="searchKey.billNo" placeholder="请输入注单编号"/>
        </FormItem>
        <FormItem label="局号">
          <Input
            class="s-140"
            v-model="searchKey.gameCode"
            :disabled="searchKey.type!=='live_casino'"
            placeholder="请输入局号"
          />
        </FormItem>
        <!-- <FormItem>
          <Checkbox v-model="searchKey.isLike">
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem> -->
        <FormItem label="会员账号">
          <Input v-model="searchKey.userName" placeholder="多个请以,隔开" class="s-140"/>
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
          <Button
            type="primary"
            :loading="$root.exportBtnLoading"
            class="ivu-btn export"
            @click="exportExcel"
          >导出EXCEL</Button>
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
        :pageSizeOpts="table.pageSizeOpts"
         @on-sort-change="sortChange"
      >
        <div slot="footer">
          <div class="clearfix">
            <p class="fl ml20">
              <span>总计</span>
            </p>
            <p class="fl ml70">
              <span>投注金额</span>
              <span class="pl15 red-font">{{Number(statistics.betAmount).toFixed(2)}}</span>
            </p>
          <p class="fl ml70">
              <span>有效投注</span>
              <span class="pl15 red-font">{{Number(statistics.validBetAmount).toFixed(2)}}</span>
            </p>
            <p class="fl ml70">
              <span>会员输赢</span>
              <span class="pl15 red-font">{{Number(statistics.netAmount).toFixed(2)}}</span>
            </p>
          </div>
        </div>
      </Tables>
    </div>
  </div>
</template>
<script>
import GameSelect from "@/components/game-select";
import Tables from "@/components/tables";
import tableMixins from "@/mixins/table";
import { Tooltip } from "iview";
import { getgameRecordsDetailData } from "@/api/report";
export default {
  name: "gameReport",
  mixins: [tableMixins],
  components: {
    Tables,
    GameSelect
  },
  data() {
    return {
      searchKey: {
        status: "all",
        startTime: this.$root.startTime(),
        endTime: this.$root.formatnightTimeS(),
        type: "live_casino"
      },
      Time: [this.$root.startTime(), this.$root.formatnightTimeS()],
      columnsKey: "live_casino",
      statistics: {},
      platformessg:{

      },
      options3: {
        disabledDate:date=> {
         return date && date.valueOf() < Date.now() - 86400000*(this.$root.threemonth()+1);
        }
      },
      columns: [
        {
          title: "会员账号",
          key: "userName",
          align: "center"
        },
          {
            title: "游戏账号",
            key: "playerName",
            align: "center"
          },
        {
          title: "注单编号",
          key: "billNo",
          align: "center"
        },
        {
          title: "局号",
          key: "gameCode",
          align: "center"
        },
        {
          title: "游戏平台",
          key: "platform",
          align: "center"
        },
        {
          title: "投注金额",
          key: "betAmount",
          align: "center",
          // sortable: "custom",
            render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.betAmount)}</span>
            }
        },
        {
          title: "有效投注",
          key: "validBetAmount",
          align: "center",
          // sortable: "custom",
           render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.validBetAmount)}</span>
            }
        },
        {
          title: "会员输赢",
          key: "netAmount",
          align: "center",
          // sortable: "custom",
              render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.netAmount)}</span>
            }
        },
        {
          title: "玩法",
          key: "gameName",
          align: "center"
        },
        {
          title: "下注时间",
          key: "betTime",
          align: "center",
          render: (h, params) => {
            return <span class="pr10 pl10">{this.$root.unixTime(params.row.betTime)}</span>;
          }
        }
      ],
      table: {
        total: 0,
        columns: [],
        data: [],
        pageSizeOpts: [20,30, 40, 50]
      }
    };
  },
  created() {
    this.$nextTick(() => {
      this.$refs.GameSelect.init();
    });
    if (this.$route.query.startTime) {
      console.log(this.$route.query)
      const { startTime, endTime ,type,platform} = this.$route.query;
      this.searchKey = { ...this.searchKey, ...this.$route.query };
      this.searchKey.siteId=this.$root.nowSite.id;
      this.Time = [startTime, endTime];
      this.platformessg.game="lottery:3"
      this.platformessg.platform=platform
      this.updateColumns("lottery")
      // this.getData({ params: this.searchKey });
    }else{
      this.updateColumns("live_casino")
    }
    // this.table.columns = [...this.columns];
  },
  methods: {
    updateColumns(key) {
      this.table.columns = [];
      let columns = [...this.columns];
      switch (key) {
        case "live_casino":
          this.table.columns = columns;
          break;
        case "slot":
        case "chess":
          this.table.columns = columns.filter(item => item.key !== "gameCode");
          break;
        case "lottery":
        case "vr_lottery":
          let l_columns = columns.filter(
            item =>
              item.key !== "gameCode" &&
              item.key !== "betTime" &&
              item.key !== "gameName" &&
              item.key !== "platform" &&
              item.key !== "userName" &&
              item.key !== "playerName"
          );
          let l_items = {
            lotteryName: {
              title: "游戏平台",
              key: "lotteryName",
              align: "center"
            },
            userName: {
              title: "会员账号",
              key: "userName",
              align: "center"
            },
            issue: {
              title: "期数",
              key: "issue",
              align: "center"
            },
            gameName: {
              title: "玩法",
              key: "playwayName",
              align: "center"
            },
            gameNum: {
              title: "玩号",
              key: "ball",
              align: "center"
            },
            betContent: {
              title: "下注内容",
              key: "betInfo",
              align: "center"
            },
            odds: {
              title: "赔率",
              key: "odds",
              align: "center"
            },
            result: {
              title: "开奖结果",
              key: "result",
              align: "center"
            },
            rebate: {
              title: "返点值",
              key: "rebate",
              align: "center"
            },
            rebateAmount: {
              title: "返点金额",
              key: "fdAmount",
              align: "center",
               render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.fdAmount)}</span>
            }
            },
            // status: {
            //   title: "开奖状态",
            //   key: "status",
            //   align: "center",
            //   render: (h, params) => {
            //     if (params.row.status == 0) {
            //       return <span>未结算</span>;
            //     } else if (params.row.status == 1) {
            //       return <span>赢</span>;
            //     } else if (params.row.status == 2) {
            //       return <span>输</span>;
            //     } else if (params.row.status == 3) {
            //       return <span>和</span>;
            //     } else if (params.row.status  ==4) {
            //       return  <span>取消</span>
            //     } else{
            //          return <span>撤消</span>
            //     }
            //   }
            // },
            billStatus: {
              title: "结算状态",
              key: "billStatus",
              align: "center",
              render: (h, params) => {
                return <span>{params.row.status == 0  ? "未结算" : (params.row.status==1 ? "赢":(params.row.status==2?"输":(params.row.status==3? "和":(params.row.status=="4"?"用户撤单":"系统撤单"))))}</span>;
              }
            },
            betTime: {
              title: "下注时间/结算时间",
              key: "betTime",
              align: "center",
              width: 150,
              render: (h, params) => {
                return (
                  <div class="flex-colum">
                    <div class="bb mb5">
                      {this.$root.unixTime(params.row.betTime)}
                    </div>
                    <div>
                      {params.row.openTime > 0
                        ? this.$root.unixTime(params.row.openTime)
                        : "-"}
                    </div>
                  </div>
                );
              }
            }
          };
          l_columns.splice(
            1,
            0,
            l_items.lotteryName,
            l_items.userName,
            l_items.issue,
            l_items.gameName,
            l_items.gameNum,
            l_items.betContent,
            l_items.odds
          );
          l_columns.push(
            l_items.result,
            l_items.rebate,
            l_items.rebateAmount,
            // l_items.status,
            l_items.billStatus,
            l_items.betTime
          );
          this.table.columns = l_columns;
          break;
        case "sport":
          let s_columns = columns.filter(
            item =>
              item.key !== "gameCode" &&
              item.key !== "betTime" &&
              item.key !== "gameName"
          );
          let s_items = {
            gameType: {
              title: "游戏种类",
              key: "gameName",
              align: "center"
            },
            betContent: {
              title: "下注内容",
              key: "betInfo",
              align: "center",
              width: 200,
              render: (h, params) => {
                // return
                let text = "";
                return (
                  <Tooltip placement="right">
                    <div slot="content">
                      {params.row.betInfo instanceof Array &&
                        params.row.betInfo.map(item => {
                          const {
                            awayteamname,
                            bettypename,
                            hdp,
                            hometeamname,
                            leaguename,
                            odds,
                            productid,
                            teambetname,
                            winlostdatetime
                          } = item;
                          return <div>{awayteamname + hometeamname}</div>;
                        })}
                    </div>
                    <div class="text-overflow-ellipsis w200x p5">
                      {params.row.betInfo instanceof Array &&
                        params.row.betInfo.map(item => {
                          const {
                            awayteamname,
                            bettypename,
                            hdp,
                            hometeamname,
                            leaguename,
                            odds,
                            productid,
                            teambetname,
                            winlostdatetime
                          } = item;
                          return (text += awayteamname + hometeamname);
                        })}
                    </div>
                  </Tooltip>
                );
              }
            },
            status: {
              title: "状态",
              key: "status",
              align: "center",
              render: (h, params) => {
                if (params.row.status == 0) {
                  return <span>未结算</span>;
                } else if (params.row.status == 1) {
                  return <span>已结算</span>;
                } else if (params.row.status == 2) {
                  return <span>无效</span>;
                }
              }
            },
            betTime: {
              title: "下注时间/结算时间",
              key: "betTime",
              align: "center",
              render: (h, params) => {
                return (
                  <div class="flex-colum">
                    <div class="bb mb5">
                      {this.$root.unixTime(params.row.betTime)}
                    </div>
                    <div>{this.$root.unixTime(params.row.addTime)}</div>
                  </div>
                );
              }
            }
          };
          s_columns.splice(3, 0, s_items.gameType, s_items.betContent);
          s_columns.push(s_items.status, s_items.betTime);
          this.table.columns = s_columns;
          break;
      }
    },
    onGameChange(res) {
      this.searchKey.type = res;
      this.columnsKey = res;
    },
    onPlatformChange(res) {
      this.searchKey.platform = res;
    },
    getData(data) {
      let dataParams=data.params
       for (let key in dataParams) {
        if (!dataParams[key]) delete dataParams[key];
      }
      this.$root.startTableLoading();
      if (data.params.isLike) data.params.isLike = Number(data.params.isLike);
      if(data.params.platform=="all") delete data.params.platform
      getgameRecordsDetailData(data).then(res => {
        const { list, total } = res.data.data;
        this.statistics = total;
        this.table.data = list;
        this.table.total = res.data.total;
      });
    },
    searchSubmit() {
      this.$refs.table.setPage()
      this.updateColumns(this.columnsKey);
      let params = { ...this.searchKey };
      params.siteId = this.nowSite.id;
      if (this.$root.validateTime(this.Time)) {
        const [startTime, endTime] = this.$root.validateTime(this.Time);
        params.startTime = startTime && this.$root.formatTimeS(startTime);
        params.endTime = endTime && this.$root.formatnightTimeS(endTime);
      } else {
        return false;
      }
      this.searchKey.startTime = params.startTime;
      this.searchKey.endTime = params.endTime;

      if (params.userName && params.userName.length < 5) {
        this.$Tip.info({ content: "会员账号最小5个字符！" });
        return false;
      }

      if (params.billNo && params.billNo.length < 6) {
        this.$Tip.info({ content: "注单编号最小6个字符！" });
        return false;
      }
      if (params.gameCode && params.gameCode.length < 5) {
        this.$Tip.info({ content: "局号最小5个字符！" });
        return false;
      }

      if(!params.startTime && !params.endTime){
        this.$Tip.info({ content: '时间还未选择'})
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
/deep/.ivu-table {
  font-size: 14px;
  .ivu-table-cell {
    text-overflow: unset;
  }
}
.ivu-form-item {
  &:nth-child(7) {
    margin-right: -5px;
  }
}
/deep/.text-overflow-ellipsis {
  white-space: pre-wrap;
  -webkit-line-clamp: 2;
}
</style>


