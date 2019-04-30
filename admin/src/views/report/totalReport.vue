<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="游戏类型">
          <Select
            class="s-100"
            v-show="currentShow == 'game'"
            clearable
            v-model="searchKey.gameType"
          >
            <Option v-for="(t,i) in gameList" :value="t.value" :key="i">{{t.name}}</Option>
          </Select>
          <Select class="s-100" disabled v-show="currentShow == 'sum'">
            <Option v-for="(t,i) in gameList" :value="t.value" :key="i">{{t.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="游戏平台" v-show="searchKey.gameType">
          <Select class="s-100" v-model="searchKey.gamePlatform" clearable>
            <Option v-for="(t,i) in searchKey.gamePlatform" :key="i" :value="t.value">{{t.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="开始日期">
          <DatePicker type="date" placeholder="开始时间" class="s-120" v-model="Time[0]"></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker type="date" placeholder="结束时间" class="s-120" v-model="Time[1]"></DatePicker>
        </FormItem>

        <FormItem label="账号类型">
          <Select style="width:100px">
            <Option v-for="item in accountList" :value="item.value" :key="item.value"></Option>
          </Select>
        </FormItem>
        <FormItem>
          <Checkbox>
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem>
        <FormItem label="会员账号">
          <Input v-model="searchKey.account" placeholder="多个请以，逗号隔开" class="s-140"/>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="$root.searchBtnLoading" class="search">查询</Button>
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
    <div class="v2-search tabs">
      <ButtonGroup class="status-button mb10 mt10">
        <Button
          :class="currentShow == 'sum' ? 'active' : ''"
          style="width:120px;"
          @click="() => {this.currentShow = 'sum'}"
        >总计</Button>
        <Button
          :class="currentShow == 'game' ? 'active' : ''"
          style="width:120px;"
          @click="() => {this.currentShow = 'game'}"
        >游戏平台</Button>
      </ButtonGroup>
    </div>
    <div class="v2-table" v-show="currentShow == 'sum'">
      <Tables
        ref="tablesMain"
        editable
        :columns="table.columns"
        :loading="$root.tableLoading"
        :value="table.data"
        :total="table.total"
        :more="table.more"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        @on-sort-change="sortChange"
      >
        <!-- 总计页面 -->
        <!-- <div slot="footer" class="total" v-if="userWidth == 'middle'">
          <span class="ib txt-a br ft13" style="width:7.18%">本页统计</span>
          <span class="ib txt-a br ft13" style="width:7.15%">{{betSum|unit}}</span>
          <span class="ib txt-a br ft13" style="width:7.15%">{{numberSum|unit}}</span>
          <span class="ib txt-a br ft13 wp718" style="width:7.1%">{{moneySum|unit}}</span>
          <span class="ib txt-a br ft13 wp711" style="width:7.13%">{{betValidSum|unit}}</span>
          <span class="ib txt-a br ft13 wp715" style="width:7.15%">{{menberSySum|unit}}</span>
          <span class="ib txt-a br ft13 wp718" style="width:7.15%">{{rateSum|unit}}%</span>
          <span class="ib txt-a br ft13 wp715" style="width:7.1%">{{hdCashSum|unit}}</span>
          <span class="ib txt-a br ft13 wp718" style="width:7.15%">{{memberBackwaterSum|unit}}</span>
          <span class="ib txt-a br ft13" style="width:7.1%">{{agencyRebatesSum|unit}}</span>
          <span class="ib txt-a br ft13" style="width:7.15%">{{agencyBackwaterSum|unit}}</span>
          <span class="ib txt-a br ft13 wp715" style="width:7.15%">{{agencyCashSum|unit}}</span>
          <span class="ib txt-a br ft13 wp715" style="width:7.15%">{{agencyPaySum|unit}}</span>
          <span class="ib txt-a br ft13 wp715" style="width:7.16%">{{agencyProfitSum|unit}}</span>
        </div>
        <div slot="footer" class="total" v-if="userWidth == 'large'">
          <span class="ib txt-a br ft13" style="width:7.14%">本页统计</span>
          <span class="ib txt-a br ft13" style="width:7.12%">{{betSum|unit}}</span>
          <span class="ib txt-a br ft13" style="width:7.15%">{{numberSum|unit}}</span>
          <span class="ib txt-a br ft13 wp718" style="width:7.13%">{{moneySum|unit}}</span>
          <span class="ib txt-a br ft13 wp711" style="width:7.15%">{{betValidSum|unit}}</span>
          <span class="ib txt-a br ft13 wp715" style="width:7.15%">{{menberSySum|unit}}</span>
          <span class="ib txt-a br ft13 wp718" style="width:7.15%">{{rateSum|unit}}%</span>
          <span class="ib txt-a br ft13 wp715" style="width:7.15%">{{hdCashSum|unit}}</span>
          <span class="ib txt-a br ft13 wp718" style="width:7.13%">{{memberBackwaterSum|unit}}</span>
          <span class="ib txt-a br ft13" style="width:7.15%">{{agencyRebatesSum|unit}}</span>
          <span class="ib txt-a br ft13" style="width:7.15%">{{agencyBackwaterSum|unit}}</span>
          <span class="ib txt-a br ft13 wp715" style="width:7.15%">{{agencyCashSum|unit}}</span>
          <span class="ib txt-a br ft13 wp715" style="width:7.15%">{{agencyPaySum|unit}}</span>
          <span class="ib txt-a br ft13 wp715" style="width:7.12%">{{agencyProfitSum|unit}}</span>
        </div>-->

        <div class="clearfix" slot="more">
          <p class="b pl10 p5 f14 gay w190x">当前页:报表总计页面</p>
        </div>
      </Tables>
    </div>
    <div class="v2-table2" v-show="currentShow == 'game'">
      <Tables
        :more="table.more"
        :columns="surface.columns"
        :loading="surface.loading"
        :value="surface.data"
        :total="surface.total"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        @on-sort-change="sortChange"
      >
        <!-- 游戏总计 -->
        <!-- <div class="clearfix" slot="more">
          <p class="b pl10 p5 f14 gay w190x">当前页:报表游戏页面</p>
        </div>
        <div slot="footer" class="game" v-if="gameWidth == 'middleGame'">
          <span class="ib txt-a br ft13 wp1428" style="width:14.28%">总计</span>
          <span class="ib txt-a br ft13 wp1426" style="width:14.2%">-</span>
          <span class="ib txt-a br ft13 wp1428" style="width:14.2%">{{betSum|unit}}</span>
          <span class="ib txt-a br ft13 wp1428" style="width:14.25%">{{numberSum|unit}}</span>
          <span class="ib txt-a br ft13 wp1426" style="width:14.25%">{{moneySum|unit}}</span>
          <span class="ib txt-a br ft13 wp1426" style="width:14.25%">{{betValidSum|unit}}</span>
          <span class="ib txt-a br ft13 wp1426" style="width:14.25%">{{menberSySum|unit}}</span>
        </div>
        <div slot="footer" class="game" v-if="gameWidth == 'largeGame'">
          <span class="ib txt-a br ft13 wp1428" style="width:14.28%">总计</span>
          <span class="ib txt-a br ft13 wp1426" style="width:14.25%">-</span>
          <span class="ib txt-a br ft13 wp1428" style="width:14.3%">{{betSum|unit}}</span>
          <span class="ib txt-a br ft13 wp1428" style="width:14.3%">{{numberSum|unit}}</span>
          <span class="ib txt-a br ft13 wp1426" style="width:14.28%">{{moneySum|unit}}</span>
          <span class="ib txt-a br ft13 wp1426" style="width:14.3%">{{betValidSum|unit}}</span>
          <span class="ib txt-a br ft13 wp1426" style="width:14.28%">{{menberSySum|unit}}</span>
        </div>-->
      </Tables>
    </div>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import { reportTotalData } from "@/api/data";
export default {
  name: "totalReport",
  components: {
    Tables
  },
  data() {
    return {
      accountList: [
        {
          value: "大股东"
        },
        {
          value: "会员"
        },
        {
          value: "代理"
        }
      ],
      table: {
        more: true,
        loading: false,
        total: 100,
        columns: [
          {
            title: "会员账号/类型",
            key: "type",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "red",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        if (params.row.accountType) {
                          this.$router.push({ name: "totalReportChildren" });
                        }
                      }
                    }
                  },
                  params.row.accountType ? "111111/大股东" : ""
                ),
                h(
                  "span",
                  {
                    style: {
                      color: "red",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        if (!params.row.accountType) {
                          this.$router.push({ name: "totalReportChildren" });
                        }
                      }
                    }
                  },
                  params.row.accountType ? "" : "222222/大股东"
                )
              ]);
            }
          },
          {
            title: "投注人数",
            key: "bet",
            align: "center",
            sortable: true
          },
          {
            title: "注单数量",
            key: "number",
            align: "center",
            sortable: true
          },
          {
            title: "投注金额",
            key: "money",
            align: "center",
            sortable: true
          },
          {
            title: "有效投注",
            key: "validPepole",
            align: "center",
            sortable: true
          },
          {
            title: "会员输赢",
            key: "menberSy",
            align: "center",
            sortable: true
          },
          {
            title: "盈率",
            key: "rate",
            align: "center",
            sortable: true
          },

          {
            title: "会员收入",
            align: "center",
            children: [
              {
                title: "活动礼金",
                key: "hdCash",
                align: "center",
                sortable: true
              },
              {
                title: "会员返水",
                key: "memberBackwater",
                align: "center",
                sortable: true
              }
            ]
          },
          {
            title: "代理返点",
            key: "agencyRebates",
            align: "center",
            sortable: true
          },
          {
            title: "代理返水",
            key: "agencyBackwater",
            align: "center",
            sortable: true
          },
          {
            title: "代理收入",
            align: "center",
            children: [
              {
                title: "代理佣金",
                key: "agencyCash",
                align: "center",
                sortable: true
              },
              {
                title: "代理日工资",
                key: "agencyPay",
                align: "center",
                sortable: true
              },
              {
                title: "代理分红",
                key: "agencyProfit",
                align: "center",
                sortable: true
              }
            ]
          }
        ],
        data: []
      },
      surface: {
        loading: false,
        total: 100,
        columns: [
          {
            title: "游戏平台",
            key: "platform",
            align: "center",
            render: (h, params) => {
              return <span>{params.row.platform ? "欧博视讯" : "AG电子"}</span>;
            }
          },
          {
            title: "会员账号/类型",
            key: "type",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      color: "red",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        if (params.row.accountType) {
                          this.$router.push({
                            name: "totalReportGameChildren"
                          });
                        }
                      }
                    }
                  },
                  params.row.accountType ? "1111111/大股东" : ""
                ),
                h(
                  "span",
                  {
                    style: {
                      color: "red",
                      cursor: "pointer"
                    },
                    on: {
                      click: () => {
                        if (!params.row.accountType) {
                          this.$router.push({
                            name: "totalReportGameChildren"
                          });
                        }
                      }
                    }
                  },
                  params.row.accountType ? "" : "222222/大股东"
                )
              ]);
            }
          },
          {
            title: "投注人数",
            key: "bet",
            align: "center",
            sortable: true
          },
          {
            title: "注单数量",
            key: "number",
            align: "center",
            sortable: true
          },
          {
            title: "投注金额",
            key: "betmoney",
            align: "center",
            sortable: true
          },
          {
            title: "有效投注",
            key: "betValid",
            align: "center",
            sortable: true
          },
          {
            title: "会员输赢",
            key: "memberSy",
            align: "center",
            sortable: true
          }
        ]
      },
      searchKey: {},
      gameList: [
        {
          value: "zhenrenshixun",
          name: "真人视讯",
          info: [
            { value: "test1", name: "真人视讯1" },
            { value: "test2", name: "真人视讯2" }
          ]
        },
        {
          value: "dianziyouxi",
          name: "电子游戏",
          info: [
            { value: "test1", name: "电子游戏1" },
            { value: "test2", name: "电子游戏2" }
          ]
        },
        {
          value: "qipaiyouxi",
          name: "棋牌游戏",
          info: [
            { value: "test1", name: "棋牌游戏1" },
            { value: "test2", name: "棋牌游戏2" }
          ]
        },
        {
          value: "caipiaoyouxi",
          name: "彩票游戏",
          info: [
            { value: "test1", name: "彩票游戏1" },
            { value: "test2", name: "彩票游戏2" }
          ]
        },
        {
          value: "vrcaipiao",
          name: "VR彩票",
          info: [
            { value: "test1", name: "VR彩票1" },
            { value: "test2", name: "VR彩票2" }
          ]
        },
        {
          value: "tiyusaishi",
          name: "体育赛事",
          info: [
            { value: "test1", name: "体育赛事1" },
            { value: "test2", name: "体育赛事2" }
          ]
        }
      ]
    };
  },

  methods: {
    onLotteryChange(res) {
      this.searchKey.type = res.code;
    },
    getData(data) {
      this.$root.startTableLoading();
      if (data.params.isLike) data.params.isLike = Number(data.params.isLike);
      getlotteryReportData(data).then(res => {
        const { list, total } = res.data.data;
        this.table.data = list;
        this.statistics = total;
        this.table.total = res.data.total;
      });
    },
    searchSubmit() {
      let params = { ...this.searchKey };
      params.siteId = this.nowSite.id;
      if (this.$root.validateTime(this.Time)) {
        const [startTime, endTime] = this.$root.validateTime(this.Time);
        params.startTime = startTime;
        params.endTime = endTime;
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
<style lang="less" scoped>
@import "../../styles/button.less";
.ivu-form-item {
  &:nth-child(4) {
    margin-right: -5px;
  }
}
.tabs {
  margin-top: -10px !important;
}
</style>
