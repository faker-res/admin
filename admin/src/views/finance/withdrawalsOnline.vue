<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="刷新">
          <Select :value="autoFresh" @on-change="changeAuto" class="s-86">
            <Option value="15">15秒</Option>
            <Option value="30">30秒</Option>
            <Option value="60">60秒</Option>
            <Option value="0">暂停</Option>
          </Select>
        </FormItem>
        <FormItem label="等级">
          <LevelSelect
            placeholder="全部"
            ref="LevelSelect"
            width="80"
            :levelType="'member'"
            @on-level-change="levelChange"
          />
        </FormItem>
        <FormItem label="状态">
          <Select class="s-100" v-model="searchKey.status" clearable>
            <Option value="success">成功</Option>
            <Option value="fail">失败</Option>
            <Option value="wait">待审核</Option>
          </Select>
        </FormItem>
        <FormItem label="开始日期">
          <DatePicker type="date" placeholder="开始时间" class="s-120" v-model="Time[0]"></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker type="date" placeholder="结束时间" class="s-120" v-model="Time[1]"></DatePicker>
        </FormItem>
        <FormItem>
          <!-- <Checkbox v-model="searchKey.isLike">
            <span class="pl5">模糊</span>
          </Checkbox>-->
        </FormItem>
        <FormItem label="会员账号">
          <Input placeholder="多个请以,隔开" class="s-140" v-model="searchKey.userName"/>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            class="search"
            :loading="$root.searchBtnLoading"
            @click="searchSubmit"
          >查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        ref="tables"
        :columns="table.columns"
        :loading="$root.tableLoading"
        :value="table.data"
        :total="table.total"
        :pageSizeOpts="table.pageSizeOpts"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
      ></Tables>
    </div>
    <Modals ref="auditModal" title="取款详情" :width="870">
      <div slot="content">
        <Tabs type="card" v-model="tabName">
          <TabPane
            label="取款详情"
            name="withdraw"
            v-if="(adminType == 'super') || (authInPage.indexOf('withdrawalsDetail') != -1)"
          >
            <div class="modal-overflow box">
              <div class="detail">
                <p>
                  <label class="c3Color">订单号</label>
                  <span>{{dataDetail.code}}</span>
                </p>
                <p>
                  <label class="c3Color">账号余额</label>
                  <span>{{dataDetail.balance | numFilter}}</span>
                </p>
                <p>
                  <label class="c3Color">会员账号</label>
                  <span>{{dataDetail.username}}</span>
                </p>
                <p>
                  <label class="c3Color">银行名称</label>
                  <span>{{dataDetail.bankName}}</span>
                  <Button
                    class="ml50 ivu-btn copy"
                    type="info"
                    size="small"
                    v-clipboard:copy="dataDetail.bankName"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  >复制</Button>
                </p>
                <p>
                  <label class="c3Color">银行姓名</label>
                  <span>{{dataDetail.bankAccountName}}</span>
                  <Button
                    type="info"
                    size="small"
                    class="ml50 ivu-btn copy"
                    v-clipboard:copy="dataDetail.bankAccountName"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  >复制</Button>
                </p>
                <p>
                  <label class="c3Color">银行账号</label>
                  <span>{{dataDetail.bankAccount}}</span>
                  <Button
                    type="info"
                    size="small"
                    class="ml50 ivu-btn copy"
                    v-clipboard:copy="dataDetail.bankAccount"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  >复制</Button>
                </p>
                <p>
                  <label class="c3Color">开户网点</label>
                  <span>{{dataDetail.bankAddress}}</span>
                  <Button
                    type="info"
                    size="small"
                    class="ml50 ivu-btn copy"
                    v-clipboard:copy="dataDetail.bankAddress"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  >复制</Button>
                </p>
                <p>
                  <label class="c3Color">实际取款</label>
                  <span>{{dataDetail.actualAmount}}</span>
                  <Button
                    type="info"
                    size="small"
                    class="ml50 ivu-btn copy"
                    v-clipboard:copy="dataDetail.actualAmount"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  >复制</Button>
                </p>
                <p>
                  <label class="c3Color">操作类型</label>
                  <RadioGroup v-if="!detailModal" v-model="auditType" class="select">
                    <Radio label="pass" class="mr30">
                      <span>通过</span>
                    </Radio>
                    <Radio label="reject">
                      <span>拒绝</span>
                    </Radio>
                  </RadioGroup>
                  <span
                    v-else
                    :class="dataDetail.status ? '' : 'redText'"
                  >{{dataDetail.status == 'success' ? '通过' : "拒绝"}}</span>
                </p>
                <!-- 成功状态也会显示加入状态判断 -->
                <P v-if="showRemark&&dataDetail.status=='fail'">
                  <label>拒绝原因</label>
                  <span>{{remark}}</span>
                </P>
                <!-- 如果未清空会显示拒绝原因修正 -->
                <p v-if="!detailModal&&auditType=='reject'">
                  <label>拒绝原因</label>
                  <Select style="width:200px;" class="mb15 select" v-model="rejectmark">
                    <Option v-for="(t,i) in rejectReason" :key="i" :value="t">{{t}}</Option>
                  </Select>
                </p>
                <p class="txt-a pt20" v-if="!detailModal">
                  <Button class="moneySubmit fl" type="primary" @click="submit">确认提交</Button>
                  <Button class="moneySubmit fr" type="primary" @click="moneySubmit">自动出款</Button>
                </p>
              </div>
            </div>
            <div class="mb20 mt20" style="height:1px;border-top:1px  solid #e4e4e4;width:100%"></div>
            <div class="W80%">
              <Tables
                :width="870"
                :columns="tableData.columns"
                :loading="tableData.loading"
                :value="tableData.data"
                :page="tableData.page"
                :total="tableData.total"
                :more="tableData.more"
              ></Tables>
            </div>
          </TabPane>
          <TabPane
            label="打码详情"
            name="mobile"
            v-if="(adminType == 'super') || (authInPage.indexOf('checkBetAmount') != -1)"
          >
            <div class="modal-overflow">
              <Tables :page="false" :columns="codeDetail.columns" :value="codeDetail.data">
                <div slot="footer" class="clearfix">
                  <span class="txt-a ib w16 br">统计</span>
                  <span class="pl25 pr25">
                    最后所需打码量
                    <span>{{codeNext.needBetAmount}}</span>
                  </span>
                  <span class="pl25 pr25 ib">
                    现有打码量
                    <span>{{codeNext.betAmount}}</span>
                  </span>
                  <span class="pl25 pr25">
                    是否满足提款要求
                    <span v-if="color" style="color:red">{{codeBeg.betAmount}}</span>
                  </span>
                </div>
              </Tables>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import tableMixins from "@/mixins/table";
import LevelSelect from "@/components/level-select";
import Modals from "@/components/modals";
import { mapState, mapActions } from "vuex";
import { getUserType } from "@/libs/util";
import {
  withdrawalsListData,
  withdrawalsDetail,
  withdrawalsAuditData,
  checkBetAmount
} from "@/api/finance";
import { constants } from "crypto";
export default {
  name: "withdrawalsOnline",
  mixins: [tableMixins],
  components: {
    Tables,
    LevelSelect,
    Modals
  },
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后两位

      let realVal = parseFloat(value).toFixed(2);

      return realVal;
    }
  },
  computed: {
    ...mapState({
      autoFresh: state => state.info.withFresh,
      autoFreshTimer: state => state.info.withTimer
    })
  },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      color: true,
      showRemark: true, //拒绝原因显示
      remark: "",
      codeNext: [],
      codeBeg: [],
      // moreData: [], //存款成功，失败，待审核
      searchKey: {
        status: "wait"
      },
      tabName: "withdraw",
      Time: [],
      rejectmark: "",
      dataDetail: [], //取款详情,
      qrCodeData: {}, //打码详情需要的参数
      detailModal: false,
      showSelect: false,
      rejectReason: [
        "打码量不足",
        "注单审核中",
        "银行信息错误",
        "跨行维护中",
        "其他原因"
      ],
      tableData: {
        page: false,
        loading: false,
        columns: [
          {
            title: "日期",
            key: "date",
            align: "center"
          },
          {
            title: "公司入款",
            key: "deposit_offline_amount",
            align: "center"
          },
          {
            title: "在线支付",
            key: "deposit_online_amount",
            align: "center"
          },
          {
            title: "线上取款",
            key: "withdrawals_amount",
            align: "center"
          },
          {
            title: "现金盈利",
            key: "cash_profit",
            align: "center"
          },
          {
            title: "会员输赢",
            key: "net_amount",
            align: "center"
          },
          {
            title: "代理收入",
            key: "agency_amount",
            align: "center"
          },
          {
            title: "优惠金额",
            key: "bonus_amount",
            align: "center"
          }
        ],
        data: []
      },
      //打码详情
      codeDetail: {
        data: [],
        columns: [
          {
            title: "类型",
            key: "type",
            align: "center"
          },
          {
            title: "金额",
            key: "amount",
            align: "center"
          },
          {
            title: "打码倍数",
            key: "multiple",
            align: "center"
          },
          {
            title: "已打码",
            key: "betAmount",
            align: "center"
          },
          {
            title: "累计所需打码量",
            key: "needBetAmount",
            align: "center"
          },
          {
            title: "时间",
            key: "time",
            width: 160,
            align: "center",
            render: (h, params) => {
              return (
                <span class="mr5 ml5">
                  {this.$root.unixTime(params.row.time)}
                </span>
              );
            }
          }
        ]
      },
      auditType: "pass",
      time: "",
      rejectReasonList: [
        "打码量不足",
        "注单审核中",
        "银行信息有误",
        "跨行维护中",
        "当日提款金额已超限",
        "额度异常",
        "请联系在线客服",
        "其他情况"
      ],
      table: {
        pageSizeOpts: [20, 30, 40, 50],
        total: 0,
        columns: [
          {
            title: "等级",
            key: "levelAlias",
            align: "center",
            width: 160,
            render: (h, params) => {
              return (
                <Tooltip max-width="200">
                  <div
                  // class="ml20 "
                  // style="width:120px"
                  >
                    <span>{params.row.levelAlias}</span>
                  </div>
                  <div slot="content">
                    <span>{params.row.levelAlias}</span>
                  </div>
                </Tooltip>
              );
            }
          },
          {
            title: "会员账号",
            key: "username",
            align: "center"
          },
          {
            title: "姓名",
            key: "bankAccountName",
            align: "center",
            width: 100
          },
          {
            title: "取款金额",
            key: "amount",
            align: "center",
            width: 110
          },
          {
            title: "手续费",
            key: "fees",
            align: "center"
          },
          {
            title: "实际取款",
            key: "actualAmount",
            align: "center"
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              const { status } = params.row;
              return (
                <span
                  class={{
                    "red-font": status === "fail",
                    "green-font": status === "success",
                    "blue-font": status === "wait"
                  }}
                >
                  {status === "wait"
                    ? "待审核"
                    : status === "success"
                    ? "成功"
                    : "失败"}
                </span>
              );
            }
          },
          {
            title: "操作",
            key: "",
            align: "center",
            width: 170,
            render: (h, params) => {
              const { status } = params.row;
              return (
                <div>
                  <span
                    class="blue-font"
                    style={{
                      display:
                        status === "wait" &&
                        (this.adminType == "super" ||
                          this.authInPage.indexOf("withdrawalsAudit") != -1)
                          ? "inline-block"
                          : "none"
                    }}
                    onClick={() => {
                      if (status == "wait") {
                        this.showRemark = false;
                      }
                      this.toggleModal(params.row, false);
                    }}
                  >
                    审核
                  </span>
                  <span
                    class="blue-font"
                    style={{
                      display: status !== "wait" ? "inline-block" : "none"
                    }}
                    onClick={() => {
                      if (status !== "fail") {
                        this.showRemark = false;
                      }
                      this.qrCodeData = {
                        siteId: this.$root.nowSite.id,
                        uid: params.row.id
                      };

                      this.toggleModal(params.row, true);
                    }}
                  >
                    详情
                  </span>
                </div>
              );
            }
          },

          {
            title: "提交时间",
            key: "time",
            align: "center",
            width: 170,
            render: (h, params) => {
              return (
                <span class="pr10 pl10">
                  {this.$root.unixTime(params.row.time)}
                </span>
              );
            }
          },
          {
            title: "审核时间",
            key: "update_time",
            align: "center",
            width: 170,
            render: (h, params) => {
              if (params.row.status == "wait") {
                return <span>-</span>;
              }
              if (
                params.row.status == "success" ||
                params.row.status == "fail"
              ) {
                return (
                  <span class="pr10 pl10">
                    {this.$root.unixTime(params.row.update_time)}
                  </span>
                );
              }
            }
          },
          {
            title: "审核者",
            key: "update_user",
            align: "center",
            render: (h, params) => {
              if (params.row.status == "wait") {
                return <span>-</span>;
              }
              if (
                params.row.status == "success" ||
                params.row.status == "fail"
              ) {
                return <span>{params.row.update_user}</span>;
              }
            }
          },
          {
            title: "备注",
            key: "remark",
            align: "center",
            tooltip: true,
            width: 170,
            render: (h, params) => {
              return <span>{params.row.remark ? params.row.remark : "-"}</span>;
            }
          }
        ],
        data: []
      }
    };
  },
  watch: {
    nowSite: {
      handler(val, oldVal) {
        this.$nextTick(() => {
          const { name } = this.$route;
          name === "withdrawalsOnline" && this.$refs.LevelSelect.init(val.id);
        });
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.autoFreshFun(this.autoFresh);
  },
  methods: {
    ...mapActions(["clearPayOnline", "changeFresh", "setTimer"]),
    changeAuto(val) {
      this.changeFresh({ stage: "with", val }); //改变时间
      this.autoFreshFun(val);
    },
    moneySubmit() {},
    //打码详情
    getCodeDetial(detaidata) {
      const { uid } = detaidata;
      const data = {
        siteId: this.$root.nowSite.id,
        uid
      };
      checkBetAmount(data).then(res => {
        console.log(res)
        this.codeDetail.data = res.data;
        console.log(this.codeDetail.data)
        let code = this.codeDetail.data;
        console.log(code)
        this.codeNext = code.pop();
        this.codeBeg = code.pop();
        if (this.codeBeg.betAmount == 0) {
          this.codeBeg.betAmount = "否";
        } else {
          this.codeBeg.betAmount = "是";
          this.color = false;
        }
      });
    },
    toggleModal(row, flag) {
      this.detailModal = flag;
      this.showSelect = !flag;
      this.time = row.time;
      this.getDetailData(row);
      this.getCodeDetial(row);
    },
    //获取等级id
    levelChange(res) {
      this.searchKey.levelId = res.id;
    },
    //列表
    getData(data) {
      this.$root.startTableLoading(this);
      let dataParams = data.params;
      for (let key in dataParams) {
        if (!dataParams[key]) delete dataParams[key];
      }

      if (data.params.userName && data.params.userName.length < 5) {
        this.$Tip.error({ content: "会员账号最小5个字符！" });
        return false;
      }
      withdrawalsListData(data).then(res => {
        if (res.data.data) {
          this.table.total = res.data.total;
          const { total, list } = res.data.data;
          this.table.data = list;
        } else {
          this.table.total = 0;
          this.table.data = [];
        }
      });
    },
    //点击详情
    getDetailData(detaidata) {
      const { id, time, remark } = detaidata;
      //其他操作影响showRemark,点击详情时候打开
      this.showRemark = true;
      this.remark = remark;
      const data = {
        id,
        timestamp: time,
        siteId: this.$root.nowSite.id
      };
      this.dataDetail = "";
      this.tabName = "withdraw";
      this.$refs.auditModal.show(remark);
      this.$refs.auditModal.spinShow();
      withdrawalsDetail(data)
        .then(res => {
          this.dataDetail = res.data;
          const { one_day, thirty_day } = res.data.finance_report;
          let arr = [];
          arr.push(one_day, thirty_day);
          this.tableData.data = arr;

          console.log(this.dataDetail.balance.toFixed(2));
          this.$refs.auditModal.spinHide();
        })
        .catch(err => {
          this.$refs.auditModal.spinHide();
        });
    },

    //查询
    searchSubmit() {
      let params = { ...this.searchKey };
      params.siteId = this.nowSite.id;
      if (this.$root.validateTime(this.Time)) {
        const [startTime, endTime] = this.$root.validateTime(this.Time);
        params.startTime = startTime && this.$root.formatTime(startTime);
        params.endTime = endTime && this.$root.formatTime(endTime);
      } else {
        return false;
      }
      if (params.userName && params.userName.length < 5) {
        this.$Tip.info({ content: "会员账号最小5个字符！" });
        return false;
      }
      if (params.userName && params.userName.length > 20) {
        this.$Tip.info({ content: "会员账号最大小于20个字符！" });
        return false;
      }
      this.searchKey.startTime = params.startTime;
      this.searchKey.endTime = params.endTime;
      for (let key in params) {
        if (!params[key]) delete params[key];
      }
      this.$refs.tables.setPage();
      this.getData({ params });
    },
    // 审核
    submit() {
      const { id } = this.dataDetail;
      const datatail = {
        id: id,
        siteId: this.$root.nowSite.id,
        timestamp: this.time,
        status: this.auditType == "reject" ? "fail" : "success",
        remark: this.auditType == "reject" ? this.rejectmark : "审核通过"
      };
      //用户不选择拒绝原因删除字段
      if (!datatail.remark) {
        delete datatail.remark;
      }
      withdrawalsAuditData(datatail).then(res => {
        this.$refs.auditModal.hide();
        this.$Tip.success({
          content: "审核成功",
          onOk: () => {
            let params = { ...this.searchKey };
            params.siteId = this.nowSite.id;
            this.getData({ params });
          }
        });
      });
    },
    onCopy: function(e) {
      this.$Message.success("复制成功");
    },
    onError: function(e) {
      this.$Message.error("复制失败");
    },
    autoFreshFun(val) {
      const data = { ...this.searchKey, siteId: this.$root.nowSite.id };
      this.getData({ params: data });
      if (val == "0") {
        this.clearPayOnline("with");
      } else {
        this.clearPayOnline("with");
        this.setTimer({
          stage: "with",
          time: setInterval(() => {
            this.getData({ params: data });
          }, val * 1000)
        });
      }
    },
    catchError() {
      this.clearPayOnline("with");
      this.changeFresh({ stage: "with", val: "0" });
    }
  },
  beforeDestroy() {
    this.changeFresh({ stage: "with", val: this.autoFresh });
    this.clearPayOnline("with");
  },
  activated() {
    this.autoFreshFun(this.autoFresh);
  },
  deactivated() {
    this.clearPayOnline("with");
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/tabs.less";
@import "../../styles/button.less";
.box {
  display: flex;
  justify-content: center;
  .detail {
    margin: 0px 0 auto -40px;
    font-size: 16px;
    p {
      line-height: 2;
      margin-bottom: 10px;
      position: relative;
      > label {
        position: absolute;
        display: inline-block;
        width: 110px;
        text-align: center;
      }
      > span {
        margin-left: 110px;
        display: inline-block;
        width: 200px;
        color: #808080;
      }
      > button {
        // position: absolute;
      }
      /deep/.select {
        margin-left: 110px;
      }
      &:last-child {
        > button {
          // position: relative;
          // margin-left: 65px;
        }
      }
    }
  }
}
.w16 {
  width: 16.5%;
}
.fw {
  font-weight: bolder;
}
.ivu-form-item {
  &:nth-child(5) {
    margin-right: -5px;
  }
}
/deep/.ivu-table-overflowX {
  overflow-x: hidden;
}
</style>


