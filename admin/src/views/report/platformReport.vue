<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <GameSelect ref="GameSelect" :showPlateform="false" @on-game-change="onGameChange"></GameSelect>
        <FormItem label="时区">
          <Select v-model="searchKey.timeType" class="s-120">
            <Option v-for="item in  timeList" :value="item.value" :key="item.value">{{item.name}}</Option>
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
        :total="table.total"
        :value="table.data"
        :pageSizeOpts="table.pageSizeOpts"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        @on-sort-change="sortChange"
      ></Tables>
    </div>
  </div>
</template>
<script>
import Icons from "@/components/icons";
import Tables from "@/components/tables";
import GameSelect from "@/components/game-select";
import tableMixins from "@/mixins/table";
import { getplatformReportData } from "@/api/report";
export default {
  name: "platformReport",
  mixins: [tableMixins],
  components: {
    Tables,
    Icons,
    GameSelect
  },
  data() {
    return {
      timeList: [
        { value: "cn", name: "北京时间" },
        { value: "en", name: "美东时间" }
      ],
      searchKey: {
        timeType: "cn",
        startTime: this.$root.startTime(),
        endTime: this.$root.midnight(),
      },
      Time: [this.$root.startTime(), this.$root.formatnightTimeS()],
      table: {
        total: 0,
        pageSizeOpts: [20, 30, 40, 50],
        data: [],
        columns: [
          {
            title: "游戏平台",
            align: "center",
            key: "platformName",
            render: (h, params) => {
              const { platformName } = params.row;
              return (
                <span
                  class={{ "blue-font": platformName !== "总计" }}
                  onClick={() => {
                    this.goDetailPage(params);
                  }}
                >
                  {platformName}
                </span>
              );
            }
          },
          {
            title: "投注人数",
            key: "betUser",
            align: "center",
            sortable: "custom"
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
            sortable:"custom",
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
            sortable:"custom",
            render: (h,params) => <span>{`${params.row.winRate}%`}</span>
          },
          {
            align: "center",
            renderHeader: (h, params) => {
              return h("div", [
                h("span", "活动类型"),
                h(
                  "Poptip",
                  {
                    props: {
                      trigger: "hover",
                      content: "平台方活动"
                    }
                  },
                  [
                    h(Icons, {
                      props: {
                        type: "bangzhutishi"
                      },
                      style: {
                        color: "#b3b3b3",
                        marginLeft: "5px"
                      }
                    })
                  ]
                )
              ]);
            },
            render: (h, params) => {
                  return params.row.activity
                    ? params.row.activity.length
                      ? params.row.activity.map(item => {
                          return h(
                            "div",
                            {
                               style:{
                                color:"#666666"
                              }
                            },
                            item.typeName
                          );
                        })
                      : h('span','-')
                    : h('span','-');
                },
             width: "200"
          },
          {
            title: "活动人数",
            key: "activity",
            align: "center",
            render: (h, params) => {
                  return params.row.activity
                    ? params.row.activity.length
                      ? params.row.activity.map(item => {
                          return h(
                            "div",
                            {
                               style:{
                                color:"#666666"
                              }
                            },
                            item.actUser
                          );
                        })
                      : h('span','-')
                    : h('span','-');
                }
          },
          {
            title: "活动金额",
            key: "c",
            align: "center",
             render: (h, params) => {
                  return params.row.activity
                    ? params.row.activity.length
                      ? params.row.activity.map(item => {
                          return h(
                            "div",
                            {
                              style:{
                                color:"#666666"
                              }
                            },
                            item.amount
                          );
                        })
                      : h('span','-')
                    : h('span','-');
                }
          }
        ]
      }
    };
  },
  created() {
    this.$nextTick(() => {
      this.$refs.GameSelect.init();
    });
  },
  methods: {
    goDetailPage(params) {
      const { platform } = params.row;
      const { timeType } = this.searchKey;
      let [startTime, endTime] = this.Time;
      startTime = this.$root.formatTimeS(startTime);
      endTime = this.$root.formatnightTimeS(endTime);
      this.$router.push({
        name: "platformReportDetail",
        query: { platform, startTime, endTime, timeType }
      });
    },
    checkAll (res) {
      return res === 'ALL' ? Reflect.deleteProperty(this.searchKey, 'type') : false
    },
    onGameChange(res) {
      if (this.checkAll(res)) return
      this.searchKey.type = res;
    },
    getData(data) {
      let dataParams=data.params
       for (let key in dataParams) {
        if (!dataParams[key]) delete dataParams[key];
      }
      this.$root.startTableLoading();
      if(data.params.isLike) data.params.isLike=Number(data.params.isLike)
      if(!data.params.type) delete data.params.type
      this.table.data=[];
      getplatformReportData(data).then(res => {
        // return
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
        winRate,
        actUser,
        actAmount
      } = total;
      let item = {
        platformName: "总计",
        betUser,
        betCount,
        betAmount,
        validBetAmount,
        netAmount,
        winRate,
        actUser,
        actAmount
      };
      return item;
    },
    // 排序
    // sortChange(column) {
    //   const { key, order } = column
    //   const { id } = this.nowSite
    //   let data = { sortKey: key, sortVal: order, siteId: id }
    //   if(data.sortVal=='normal'){
    //      delete data.sortKey
    //      delete data.sortVal
    //   }
    //   this.getData({ params: { ...this.searchKey, ...data } })
    // },
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
      if(!params.startTime && !params.endTime){
        this.$Tip.info({ content: '时间还未选择'})
        return false
      }
      let { startTime, endTime } = params
      this.searchKey.startTime = startTime
      this.searchKey.endTime = endTime

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
.w985 {
  width: 9.7%;
}
.w983 {
  width: 9.7%;
}
.w115 {
  width: 11%;
}
.w102 {
  width: 10%;
}
.w1015 {
  width: 10.15%;
}
.w840 {
  width: 8.4%;
}
.w1014 {
  width: 10.14%;
}
.w200x {
  width: 200px;
}
.w97 {
  width: 9.7%;
}
</style>