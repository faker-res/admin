<template>
  <div>
    <div class="v2-search" style="margin-bottom:20px">
      <Form ref="searchKey" inline>
        <FormItem v-for="(btn, i) in btns" :key="btn">
          <Button
            class="btn80 bd"
            :class="index == i ? 'bd-bg':'bg-or'"
            @click="changeDate(i)"
          >{{btn}}</Button>
        </FormItem>
        <FormItem label="开始日期">
          <DatePicker
            class="s-180"
            type="datetime"
            v-model="Time[0]"
            placeholder="请选择开始日期"
            :format="format1"
          ></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker
            class="s-180"
            type="datetime"
            v-model="Time[1]"
            placeholder="请选择结束日期"
            @on-change="tickendTime"
            :format="format2"
          ></DatePicker>
        </FormItem>
        <FormItem label="时区">
          <Select v-model="searchKey.timeType" class="s-120" @on-change="changtime">
            <Option value="cn">北京时间</Option>
            <Option value="en">美东时间</Option>
            <Option value="cw">财务时间</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            :loading="$root.searchBtnLoading"
            class="ivu-btn search"
            @click="searchSubmit"
          >查询</Button>
        </FormItem>
        <FormItem>
          <div>
            <div class="clearfix">
              <span class="fl">计算公式</span>
              <Poptip trigger="hover" placement="bottom-end" class="ml5 fl">
                <div slot="content">
                  <div class="mb10">网站盈利=会员输赢+代理收入+优惠金额</div>


                  <div>现金利润=存款金额-取款金额</div>
                  <div class="mb10">现金利率=现金利润/存款金额</div>

                   <div>本月利润=本月存款金额-本月取款金额</div>
                  <div class="mb10">本月利率=本月利润/本月存款金额</div>

                  <div>代理收入=代理返水+代理返点</div>
                  <div>代理返水：下级给上级的返水差金额</div>
                  <div class="mb10">代理返点：只包含彩票（下级给上级的返点金额）</div>

                  <div class="mb10">拒绝金额：存款和取款的总拒绝金额</div>

                   <div>首存金额：当天注册，当天充值</div>
                  <div class="mb10">总首存金额：历史注册，今天充值</div>

                  <div>时区统计时间：</div>
                  <div>北京时间：00:00:00~23:59:59</div>
                  <div>美东时间：12:00:00~次日11:59:59</div>
                  <div>财务时间：09:00:00~次日08:59:59</div>
                </div>
                <Icons type="bangzhutishi" color="#E4E4E4" :size="26"/>
              </Poptip>
            </div>
          </div>
        </FormItem>
      </Form>
    </div>
    <div style="position:relative;">
      <Spin fix v-show="spinShow"></Spin>
      <ul class="top clearfix pt20 pb20 pl20" style="padding-left:0px;">
        <li class="fl w25">
          <div class="circle bgBule fl">
            <Icons
              type="zonghebaobiaoyouxiaotouzhu"
              class="ib hv"
              style="color:#fff;marginTop:4px;marginLeft:7px;"
              size="21"
            ></Icons>
          </div>
          <div class="fl ml10">
            <span class="db">有效投注</span>
            <span
              class="red-font ft14"
            >{{betData.validBetAmount}}/{{betData.betUserCount}}人</span>
          </div>
        </li>

        <li class="fl w25">
          <div class="circle bgPurple fl">
            <Icons
              type="zonghebaobiaohuiyuanshuying"
              class="ib hv"
              style="color:#fff;marginTop:3px;marginLeft:8px;"
              size="23"
            ></Icons>
          </div>
          <div class="fl ml10">
            <span class="db">会员输赢</span>
            <span class="red-font ft14">{{betData.netAmount}}</span>
          </div>
        </li>
        <li class="fl w25">
          <div class="circle bgOrange fl">
            <Icons
              type="zonghebaobiaopingtaiyingli"
              class="ib hv"
              style="color:#fff;margin-top:4px;margin-left:7px;"
              size="22"
            ></Icons>
          </div>
          <div class="fl ml10">
            <span class="db">网站盈利</span>
            <!-- 差地段 -->
            <span class="red-font ft14">{{otherData.webProfit}}</span>
          </div>
        </li>
        <li class="fl w25">
          <div class="circle bgGreen fl">
            <Icons
              type="zonghebaobiaopingtaiyingshuai"
              class="ib hv"
              style="color:#fff;marginLeft:8px;marginTop:4px;"
              size="23"
            ></Icons>
          </div>
          <div class="fl ml10">
            <span class="db">现金利润</span>
            <span class="red-font ft14">{{otherData.moneyProfit}}</span>
          </div>
        </li>
      </ul>
      <div class="mt20 clearfix">
        <!-- 存款金额 -->
        <div class="fl w30 b">
          <div class="f6f8-bg bb clearfix">
            <span class="ib pt12 pb12 pl20">存款金额</span>
            <div class="fr pt12 pb12 ib mr20 red-font">
              <span class="ib pl20">{{depositData.amount}}/</span>
              <span>{{depositData.userCount}}人/</span>
              <span>{{depositData.count}}笔</span>
            </div>
          </div>
          <ul class="middle-con">
            <ul v-if="depositData.typeCount" class="middle-con">
              <li class="pt12 bb" v-for="(t,i) in depositData.typeCount" :key="i">
                <span class="ib pl15 pb12 pl20">
                  <span class="ib box mr5" :key="i" :class="sstt[i]"></span>
                  {{t.depositClassName}}
                </span>
                <div class="fr mr20">
                  <span class="ib blue-font pl20">{{t.depositAmount}}/</span>
                  <span class="blue-font">{{t.depositUserCount}}人/</span>
                  <span class="blue-font">{{t.depositCount}}笔</span>
                </div>
              </li>
            </ul>
          </ul>
          <div class="bb">
            <span class="ib pt12 pb12 pl20">
              <span class="ib box ss1 mr5"></span>
              在线支付笔数
            </span>
            <div class="fr pt12 pb12 ib mr20">
              <span class="ib blue-font pl20">
                {{depositData.onlineUserCount}}人/
                {{depositData.onlineCount}} 笔
              </span>
            </div>
          </div>
          <div>
            <span class="ib pt12 pb12 pl20">
              <span class="ib box ss2 mr5"></span>
              公司入款笔数
            </span>
            <div class="fr pt12 pb12 ib mr20">
              <span class="ib blue-font pl20">
                {{depositData.offlineUserCount}}人/
                {{depositData.offlineCount}}笔
              </span>
            </div>
          </div>
          <div class="f6f8-bg bt">
            <span class="ib pt12 pb12 pl20">代理收入</span>
            <div class="fr pt12 pb12 ib mr20 red-font">
              <span class="ib pl20">{{agencyIncome.amount}}/</span>
              <span>{{agencyIncome.userCount}}人</span>
            </div>
          </div>
        </div>
        <!-- -----------------------中间列------------------- -->
        <!-- 取款金额 -->
        <div class="fl w30 b ml20">
          <div class="f6f8-bg bb">
            <span class="ib pt12 pb12 pl20 ft14">取款金额</span>
            <div class="fr pt12 pb12 ib mr20 red-font">
              <span class="ib pl20">{{withdrawalData.amount}}/</span>
              {{withdrawalData.userCount}}人/
              <span>{{withdrawalData.count}}笔</span>
            </div>
          </div>
          <ul class="middle-con ft12">
            <li class="bb">
              <span class="ib pt12 pb12 pl20">
                <span class="ib box ss1 mr5"></span>
                线上取款
              </span>
              <div class="fr pt12 pb12 blue-font ib mr20">
                <span class="ib pl20">{{withdrawalData.systemAmount}}/</span>
                {{withdrawalData.systemUserCount}}人
                <span>{{withdrawalData.systemCount}}笔</span>
              </div>
            </li>
            <li>
              <span class="ib pt12 pb12 pl20">
                <span class="ib box ss2 mr5"></span>
                人工取款
              </span>
              <div class="fr pt12 pb12 ib mr20 blue-font">
                <span class="ib blue-font pl20">{{withdrawalData.adminAmount}}/</span>
                {{withdrawalData.adminUserCount}}人
                <span>{{withdrawalData.adminCount}}笔</span>
              </div>
            </li>
          </ul>
          <div class="f6f8-bg bt bb">
            <span class="ib pt12 pb12 pl20 ft14">优惠金额</span>
            <div class="fr pt12 pb12 ib mr20">
              <span class="ib red-font pl20">{{bonusData.amount}}/</span>
              <span class="red-font">{{bonusData.userCount}}人</span>
            </div>
          </div>
          <ul class="middle-con ft12">
            <li class="bb">
              <span class="ib pt12 pb12 pl20">
                <span class="ib box ss4 mr5"></span>
                活动派送
              </span>
              <div class="fr pt12 pb12 ib mr20 blue-font">
                <span class="ib pl20">{{bonusData.systemAmount}}/</span>
                {{bonusData.systemUserCount}}人
              </div>
            </li>
            <li class="bb">
              <span class="ib pt12 pb12 pl20">
                <span class="ib box ss1 mr5"></span>
                返水派送
              </span>
              <div class="fr pt12 pb12 ib mr20 blue-font">
                <span class="ib blue-font pl20">{{bonusData.rebateAmount}}/</span>
                {{bonusData.rebateUserCount}}人
              </div>
            </li>
            <li>
              <span class="ib pt12 pb12 pl20">
                <span class="ib box ss2 mr5"></span>
                人工派送
              </span>
              <div class="fr pt12 pb12 ib mr20 blue-font">
                <span class="ib pl20">{{bonusData.adminAmount}}/</span>
                {{bonusData.adminUserCount}}人
              </div>
            </li>
          </ul>
          <div class="bt f6f8-bg">
            <span class="ib pt12 pb12 pl20">在线人数</span>
            <div class="fr pt12 pb12 ib mr20 blue-font">
              <span class="ib blue-font pl35">{{otherData.onlineUserCount}}人</span>
            </div>
          </div>
          <div class="bb bt">
            <span class="ib pt12 pb12 pl20">入款时间</span>
            <div class="fr pt12 pb12 ib mr20 red-font">
              <span class="ib pl35">{{depositData.averageTime}}秒</span>
            </div>
          </div>
          <div class="f6f8-bg bb">
            <span class="ib pt12 pb12 pl20">取款时间</span>
            <div class="fr pt12 pb12 ib mr20 red-font">
              <span class="ib pl35">{{withdrawalData.averageTime}}秒</span>
            </div>
          </div>
          <div>
            <span class="ib pt12 pb12 pl20">拒绝金额</span>
            <div class="fr pt12 pb12 ib mr20 red-font">
              <span class="ib blue-font pl35">{{betData.cancelBetAmount}}/</span>
              <span class="blue-font">{{betData.cancelBetUserCount}}人</span>
            </div>
          </div>
            <div class="f6f8-bg">
            <span class="ib pt12 pb12 pl20">首存金额</span>
            <div class="fr pt12 pb12 ib mr20">
              <span class="ib blue-font pl35">{{otherData.firstDepositByRegAmount}}/{{otherData.firstDepositByRegUserCount}}人</span>
            </div>
          </div>
          <div class="bb">
            <span class="ib pt12 pb12 pl20">总首存金额</span>
            <div class="fr pt12 pb12 ib mr20">
              <!-- 差个总首存金额字段和人数 -->
              <span class="ib blue-font pl20">{{otherData.firstDepositAmount}}/{{otherData.firstDepositUserCount}}人</span>
            </div>
          </div>
        
        </div>
        <!-- -----------------------右边列------------------- -->
        <div class="fl w30 b ml20">
          <ul class="right-con">
            <li class="bb">
              <span class="ib pt12 pb12 pl20">注单数量</span>
              <div class="fr pt12 pb12 ib mr20">
                <span class="ib pl20">
                  {{betData.betCount}}/
                  {{betData.betUserCount}}人
                </span>
              </div>
            </li>
            <li class="bb">
              <span class="ib pt12 pb12 pl20">撤单金额</span>
              <div class="fr pt12 pb12 ib mr20">
                <span class="ib pl20">
                  {{betData.cancelBetAmount}}/
                  {{betData.cancelBetUserCount}}人
                </span>
              </div>
            </li>
            <li class="bb">
              <span class="ib pt12 pb12 pl20">会员余额</span>
              <div class="fr pt12 pb12 ib mr20">
                <span class="pl20">{{otherData.userBalanceAmount}}</span>
              </div>
            </li>
                       <li class="bb">
              <span class="ib pt12 pb12 pl20">本月输赢</span>
              <div class="fr pt12 pb12 ib mr20">
                <span class="pl20 red-font">{{totalMonth.netAmount}}</span>
              </div>
            </li>
            <li class="bb">
              <span class="ib pt12 pb12 pl20">上月输赢</span>
              <div class="fr pt12 pb12 ib mr20">
                <span class="pl20 red-font">{{totalLastMonth.netAmount}}</span>
              </div>
            </li>
             <li class="bb">
              <span class="ib pt12 pb12 pl20">本月盈利</span>
              <div class="fr pt12 pb12 ib mr20">
                <span class="red-font pl20">{{totalMonth.webProfit}}</span>
              </div>
            </li>
            <li class="bb">
              <span class="ib pt12 pb12 pl20">上月盈利</span>
              <div class="fr pt12 pb12 ib mr20">
                <span class="red-font pl20">{{totalLastMonth.webProfit}}</span>
              </div>
            </li>
            <li class="bb">
              <span class="ib pt12 pb12 pl20">本月利润</span>
              <div class="fr pt12 pb12 ib mr20">
                <span class="red-font pl20">{{totalMonth.moneyProfit}}</span>
              </div>
            </li>
            <li class="bb">
              <span class="ib pt12 pb12 pl20">上月利润</span>
              <div class="fr pt12 pb12 ib mr20">
                <span class="red-font pl20">{{totalLastMonth.moneyProfit}}</span>
              </div>
            </li>
            <li class="bb">
              <span class="ib pt12 pb12 pl20">本月利率</span>
              <div class="fr pt12 pb12 ib mr20">
                <span class="pl20">{{totalMonth.moneyProfitRate}}</span>
              </div>
            </li>
            <li class="bb">
              <span class="ib pt12 pb12 pl20">上月利率</span>
              <div class="fr pt12 pb12 ib mr20">
                <span class="pl20">{{totalLastMonth.moneyProfitRate}}</span>
              </div>
            </li>
 
            <!-- <li class="bb">
              <span class="ib pt12 pb12 pl20">本月毛率</span>
                <div class="fr pt12 pb12 ib mr20 ">
              <span class=" pl20">{{totalMonth.grossInterestRate}}</span>
              </div>
            </li>
            <li class="bb">
              <span class="ib pt12 pb12 pl20">上月毛率</span>
                 <div class="fr pt12 pb12 ib mr20 ">
              <span class=" pl20">{{totalLastMonth.grossInterestRate}}</span>
                </div>
            </li>-->
            <li class="bb">
              <span class="ib pt12 pb12 pl20">注册人数</span>
              <div class="fr pt12 pb12 ib mr20">
                <span class="ib red-font pl20">{{otherData.registerUserCount}}人</span>
              </div>
            </li>

            <li class="bb">
              <span class="ib pt12 pb12 pl20">有效人数</span>
               <div class="fr pt12 pb12 ib mr20">
              <span class="red-font pl20">{{otherData.validUser}}人</span>
              </div>
            </li>
            <li class="bb">
              <span class="ib pt12 pb12 pl20">当月有效</span>
              <span class="red-font pl20">{{totalMonth.validUser}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Icons from "@/components/icons";
import { getmultipleReports } from "@/api/report";
export default {
  name: "complexReport",
  components: { Icons },
  data() {
    return {
      sstt: [
        "ss1",
        "ss2",
        "ss3",
        "ss4",
        "ss1",
        "ss2",
        "ss3",
        "ss4",
        "ss1",
        "ss2"
      ],
      spinShow: false,
      format1: "yyyy-MM-dd 00:00:00",
      format2: "yyyy-MM-dd 23:59:59",
      index: "",
      btns: ["今天", "昨天", "本月", "上月"],
      searchKey: {
        timeType: "cn",
        startTime: this.$root.startTime(),
        endTime: this.$root.formatnightTimeS()
      },
      Time: [this.$root.newstartTime(), new Date()],
      otherData: {},
      depositData: [],
      agencyIncome: {},
      withdrawalData: [],
      bonusData: [
        {
          title: "活动派送",
          amount: "100000000.00",
          number: "1000"
        },
        {
          title: "返水派送",
          amount: "100000000.00",
          number: "1000"
        },
        {
          title: "人工派送",
          amount: "100000000.00",
          number: "1000",
          data: [
            {
              title: "活动",
              amount: "100000000.00",
              number: "100"
            },
            {
              title: "返水",
              amount: "100000000.00",
              number: "100"
            }
          ]
        }
      ],
      betData: {},
      totalMonth: {},
      totalLastMonth: {}
    };
  },
  created() {
    let data = { siteId: this.$root.nowSite.id };
    this.changeDate(0);
  },
  methods: {
    changeDate(i) {
      this.index = i;
      let moment = this.$moment;
      let startDate, endDate;
      if (i == 0) {
        if (
          this.searchKey.timeType == "cn" ||
          this.searchKey.timeType == "en"
        ) {
          startDate = moment()
            .startOf("day")
            .format("YYYY-MM-DD HH:mm:ss");
          // endDate =  moment().format('YYYY-MM-DD HH:mm:ss');
          endDate = moment()
            .endOf("day")
            .set("hours", 23)
            .set("minutes", 59)
            .set("seconds", 59)
            .format("YYYY-MM-DD HH:mm:ss");
        } else {
          let date = new Date().getHours();
          if (date > 9) {
            startDate = moment()
              .startOf("day")
              .set("hours", 9)
              .set("minutes", 0)
              .format("YYYY-MM-DD HH:mm:ss");
            endDate = moment()
              .day(moment().day() + 1)
              .endOf("day")
              .set("hours", 8)
              .set("minutes", 59)
              .set("seconds", 59)
              .format("YYYY-MM-DD HH:mm:ss");
          } else {
            startDate = moment()
              .day(moment().day() - 1)
              .startOf("day")
              .set("hours", 9)
              .set("minutes", 0)
              .format("YYYY-MM-DD HH:mm:ss");
            endDate = moment()
              .day(moment().day())
              .endOf("day")
              .set("hours", 8)
              .set("minutes", 59)
              .set("seconds", 59)
              .format("YYYY-MM-DD HH:mm:ss");
          }
        }
      } else if (i == 1) {
        if (
          this.searchKey.timeType == "cn" ||
          this.searchKey.timeType == "en"
        ) {
          startDate = moment()
            .day(moment().day() - 1)
            .startOf("day")
            .format("YYYY-MM-DD HH:mm:ss");
          endDate = moment()
            .day(moment().day() - 1)
            .endOf("day")
            .format("YYYY-MM-DD HH:mm:ss");
        } else {
          let date = new Date().getHours();
          if (date > 9) {
            startDate = moment()
              .day(moment().day() - 1)
              .startOf("day")
              .set("hours", 9)
              .set("minutes", 0)
              .format("YYYY-MM-DD HH:mm:ss");
            endDate = moment()
              .day(moment().day())
              .startOf("day")
              .set("hours", 8)
              .set("minutes", 59)
              .set("seconds", 59)
              .format("YYYY-MM-DD HH:mm:ss");
          } else {
            startDate = moment()
              .day(moment().day() - 2)
              .startOf("day")
              .set("hours", 9)
              .set("minutes", 0)
              .format("YYYY-MM-DD HH:mm:ss");
            endDate = moment()
              .day(moment().day() - 1)
              .startOf("day")
              .set("hours", 8)
              .set("minutes", 59)
              .set("seconds", 59)
              .format("YYYY-MM-DD HH:mm:ss");
          }
        }
      } else if (i == 2) {
        if (
          this.searchKey.timeType == "cn" ||
          this.searchKey.timeType == "en"
        ) {
          startDate = moment()
            .month(moment().month())
            .startOf("month")
            .format("YYYY-MM-DD HH:mm:ss");
          // endDate =  moment().format('YYYY-MM-DD HH:mm:ss')
          endDate = moment()
            .endOf("day")
            .format("YYYY-MM-DD HH:mm:ss");
        } else {
          let date = new Date().getHours();
          if (date > 9) {
            startDate = moment()
              .month(moment().month())
              .startOf("month")
              .set("hours", 9)
              .set("minutes", 0)
              .format("YYYY-MM-DD HH:mm:ss");
            endDate = moment()
              .day(moment().day() + 1)
              .endOf("day")
              .set("hours", 8)
              .set("minutes", 59)
              .set("seconds", 59)
              .format("YYYY-MM-DD HH:mm:ss");
          } else {
            startDate = moment()
              .month(moment().month())
              .startOf("month")
              .set("hours", 9)
              .set("minutes", 0)
              .format("YYYY-MM-DD HH:mm:ss");
            endDate = moment()
              .endOf("day")
              .set("hours", 8)
              .set("minutes", 59)
              .set("seconds", 59)
              .format("YYYY-MM-DD HH:mm:ss");
          }
        }
      } else if (i == 3) {
        if (
          this.searchKey.timeType == "cn" ||
          this.searchKey.timeType == "en"
        ) {
          startDate = moment()
            .month(moment().month() - 1)
            .startOf("month")
            .format("YYYY-MM-DD HH:mm:ss");
          endDate = moment()
            .month(moment().month() - 1)
            .endOf("month")
            .format("YYYY-MM-DD HH:mm:ss");
        } else {
          startDate = moment()
            .month(moment().month() - 1)
            .startOf("month")
            .set("hours", 9)
            .set("minutes", 0)
            .format("YYYY-MM-DD HH:mm:ss");
          endDate = moment()
            .month(moment().month())
            .startOf("month")
            .set("hours", 8)
            .set("minutes", 59)
            .set("seconds", 59)
            .format("YYYY-MM-DD HH:mm:ss");
        }
      }
      this.Time = [startDate, endDate];
      this.searchSubmit();
    },
    changtime(val) {
      this.changeDate(0);
      if (val == "cw") {
        this.format1 = "yyyy-MM-dd 09:00:00";
        this.format2 = "yyyy-MM-dd 08:59:59";
      } else {
        this.format1 = "yyyy-MM-dd 00:00:00";
        this.format2 = "yyyy-MM-dd 23:59:59";
      }
    },
    tickendTime(val) {
      if (this.searchKey.timeType == "cw") {
        this.format1 = "yyyy-MM-dd 09:00:00";
        this.format2 = "yyyy-MM-dd 08:59:59";
        let date = new Date().getHours();
        // console.log(this.Time[1]);
        if (date > 9) {
          this.Time[1] = this.$root.nextTime(val);
        } else {
          this.Time[1] = this.$root.lastTime(val);
        }
      } else {
        this.format1 = "yyyy-MM-dd 00:00:00";
        this.format2 = "yyyy-MM-dd 23:59:59";
      }
    },
    getData(data) {
      this.spinShow = true;
      this.$root.startTableLoading();
      getmultipleReports(data).then(res => {
        const {
          agencyIncome,
          bet,
          bonus,
          deposit,
          firstDepositUserCount,
          firstDepositByRegUserCount,
          firstDepositByRegAmount,
          onlineUserCount,
          profit,
          profitRate,
          registerUserCount,
          totalLastMonth,
          totalMonth,
          userBalanceAmount,
          firstDepositAmount,
          withdrawals,
          moneyProfit,
          webProfit,
          validUser
        } = res.data;
        this.otherData = {
           moneyProfit,
          profit,
          profitRate,
          userBalanceAmount,
          onlineUserCount,
          firstDepositUserCount,
          firstDepositByRegUserCount,
          registerUserCount,
          firstDepositByRegAmount,
          firstDepositAmount,
          webProfit,
          validUser
        };
        this.depositData = deposit;
        console.log(this.depositData);
        // console.log(this.depositData.typeCount);
        // console.log(this.sstt);
        for (let key in this.depositData.typeCount) {
          // console.log(key);
        }

        this.agencyIncome = agencyIncome;
        this.withdrawalData = withdrawals;
        this.bonusData = bonus;
        this.betData = bet;
        this.totalMonth = totalMonth;
        console.log(this.totalMonth)
        this.totalLastMonth = totalLastMonth;
        this.spinShow = false;
      });
    },
    searchSubmit() {
      // console.log(this.Time);
      let params = { ...this.searchKey };
      params.siteId = this.$root.nowSite.id;
      if (this.$root.validateTime(this.Time)) {
        const [startTime, endTime] = this.$root.validateTime(this.Time);
        if (params.timeType == "cn" || params.timeType == "en") {
          params.startTime = startTime && this.$root.formatTimeS(startTime);
          params.endTime = endTime && this.$root.formatnightTimeS(endTime);
        } else {
          let date = new Date().getHours();
          params.startTime = this.$root.moneyTime(this.Time[0]);
          params.endTime = this.$root.lastTime(this.Time[1]);
          //   if (date > 9) {
          //     params.endTime = this.$root.nextTime(this.Time[1]);
          //  } else {
          //     params.endTime = this.$root.lastTime(this.Time[1]);
          //  }
        }
      } else {
        return false;
      }
      for (let key in params) {
        if (!params[key]) delete params[key];
      }
      if (params.timeType == "cw") params.timeType = "cn";
      this.getData(params);
    }
  }
};
</script>
<style lang="less" scoped>
.ss1 {
  background: #2d8cf0;
}
.ss2 {
  background: #ee8470;
}
.ss3 {
  background: #91c58a;
}
.ss4 {
  background: #f6d467;
}

.w30 {
  width: 32%;
}
.ml10 {
  .db {
    font-size: 18px;
  }
}
.pl30 {
  border-bottom: 1px solid #dcdcdc;
}
.pb20 {
  padding-bottom: 0px;
  padding-top: 0px;
}
.w25 {
  padding: 20px 0px;
  width: 24.15%;
}
.pb20 li {
  margin-left: 10px;
  border: 1px solid #dcdcdc;
  padding-left: 40px;
  &:first-child {
    margin-left: 0px;
  }
}
.btn80 {
  width: 80px;
  height: 36px;
}
.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #fff;
}
.circle:hover {
  border-color: #2d8cf0;
}
.dot {
  display: inline-block;
  background-color: #62befd;
  width: 6px;
  height: 6px;
}
.left-con {
  li {
    &:nth-last-child(2) {
      border-top: 1px solid #dcdcdc;
    }
  }
}
.right-con {
  li {
    &:nth-child(2n-1) {
      background: #f6f6f8;
    }
    &:nth-last-child(1) {
      border-bottom: none;
    }
  }
}
.bd-bg {
  background-color: #2d8cf0;
  color: #ffffff;
  box-shadow: 0;
  &:focus {
    box-shadow: 0 0 0 0;
  }
}
.bg-or {
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
.box {
  width: 9px;
  height: 9px;
}
</style>


