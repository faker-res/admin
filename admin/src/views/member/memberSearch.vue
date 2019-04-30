<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="状态">
          <Select clearable v-model="searchKey.status" class="s-86" placeholder="全部">
            <Option value="yes">正常</Option>
            <Option value="no">停用</Option>
            <Option value="online">在线</Option>
            <Option value="offline">离线</Option>
            <Option value="catch">异常</Option>
          </Select>
        </FormItem>
        <FormItem label="客户端">
          <Select clearable v-model="searchKey.lastDevice" placeholder="全部">
            <Option v-for="(t,i) in platformList" :key="i" :value="t.value">{{t.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="等级">
          <LevelSelect
            placeholder="全部"
            ref="LevelSelect"
            clearable
            width="86"
            :levelType="'member'"
            @on-level-change="levelChange"
          />
        </FormItem>
        <FormItem label="开始日期">
          <DatePicker type="date" placeholder="开始时间" class="s-120" v-model="Time[0]"></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker type="date" placeholder="结束时间" class="s-120" v-model="Time[1]"></DatePicker>
        </FormItem>
        <FormItem>
          <Checkbox v-model="searchKey.isLike">
            <span>模糊</span>
          </Checkbox>
        </FormItem>
        <FormItem>
          <Select v-model="searchKey.typeTag" class="s-140" placeholder="请选择查询类型">
            <Option value="userName">会员账号</Option>
            <Option value="agencyName">上级代理</Option>
            <Option value="phone">手机号码</Option>
            <Option value="email">Email</Option>
            <Option value="wechat">微信号</Option>
            <Option value="shareholder">大股东</Option>
            <Option value="realName">姓名</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Input
            placeholder="多个请以,逗号隔开"
            class="s-140"
            v-model="searchKey.content"
            :disabled="!searchKey.typeTag"
          />
        </FormItem>
        <FormItem>
          <Poptip
            trigger="hover"
            content="多个请以,逗号隔开,仅支持同类型多个输入"
            placement="bottom-end"
            class="ml14f"
          >
            <Icons type="bangzhutishi" color="#E4E4E4" :size="26"/>
          </Poptip>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            :loading="$root.searchBtnLoading"
            class="search"
            @click="searchSubmit"
          >查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        ref="tables"
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
    <Modals ref="oneTabFundsModal" :title="fundsModalTitle">
      <div slot="content">
        <Tabs type="card" value="single">
          <TabPane label="加款/减款" name="single">
            <FundsForms
              ref="oneTabFundsForms"
              mode="single"
              :oprateTypes="oprateTypes"
              @on-submit="submitFundsForm"
            ></FundsForms>
          </TabPane>
        </Tabs>
      </div>
    </Modals>
    <Modals ref="twoTabFundsModal" :title="fundsModalTitle" @modalVisible="modalVisible">
      <div slot="content">
        <Tabs type="card" value="single" @on-click="tabChange">
          <TabPane label="加款/减款" name="single">
            <FundsForms
              ref="twoTabFundsForms"
              mode="single"
              :oprateTypes="oprateTypes"
              @on-submit="submitFundsForm"
            ></FundsForms>
          </TabPane>
          <TabPane label="批量加款/减款" name="batch">
            <FundsForms :oprateTypes="oprateTypes" mode="batch" @on-submit="submitFundsForm"></FundsForms>
          </TabPane>
        </Tabs>
      </div>
    </Modals>
    <Modals ref="historyModal" title="历史登录" width="800">
      <div slot="content" class="modal-overflow">
        <!-- <div style="height:500px;overflow:auto;"> -->
        <Tables
          :columns="historyTable.columns"
          :loading="historyTable.loading"
          :value="historyTable.data"
          :page="false"
        ></Tables>
        <!-- </div> -->
      </div>
    </Modals>
    <member-code-detail :codeDetailTitle="'mainCodeDetail'"/>
    <div></div>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Icons from "@/components/icons";
import Modals from "@/components/modals";
import FundsForms from "./components/funds-forms";
import LevelSelect from "@/components/level-select";
import { Tooltip } from "iview";
import tableMixins from "@/mixins/table";
import { getUserType } from '@/libs/util';
import memberCodeDetail from "./components/member-code-detail";
import {
  getMemberTableData,
  getMemberLoginLog,
  memberModifyStatus,
  memberDetail,
  thirdBalanceRecycle,
  refreshThirdBalance,
  memberBalanceHandle
} from "@/api/member";
export default {
  name: "memberSearch",
  mixins: [tableMixins],
  components: {
    Tables,
    Icons,
    Modals,
    FundsForms,
    LevelSelect,
    memberCodeDetail
  },
  data() {
    return {
      flag: {
        member: [],
        refund: []
      },
      uid: [],
      adminType: getUserType(),
      sort: false,
      authInPage: JSON.parse(localStorage.authInPage),
      sortParams: {},
      // subSts: false,
      routes: [],
      page: 1, //当前页码
      // expandData: {}, //展开的数据
      searchKey: {
        typeTag: "userName"
      },
      Time: [],
      platformList: [
        { value: "pc", name: "PC" },
        { value: "h5", name: "H5" },
        { value: "ios", name: "IOS" },
        { value: "android", name: "Android" }
      ],
      fundsModalTitle: "加款/减款",
      oprateTypes: {
        add: {
          manual: {
            id: 0,
            type: "deposit",
            subType: "manual",
            class: "存款",
            subClass: "人工汇款"
          },
          giftBonusAdmin: {
            id: 1,
            type: "bonus",
            subType: "giftBonusAdmin",
            class: "彩金",
            subClass: "彩金派送"
          },
          RebateBonus: {
            type: "bonus",
            subType: "manualRebateBonus",
            class: "返水",
            subClass: "返水派送"
          },
          bonus: {
            id: 3,
            type: "bonus",
            subType: "manualBonus",
            class: "优惠",
            subClass: "汇款优惠"
          },
          transfer: {
            id: 4,
            type: "deposit",
            subType: "transfer",
            class: "额度转换",
            subClass: "额度转换失败"
          },
          other: {
            id: 5,
            type: "other",
            subType: "other",
            class: "其他",
            subClass: "其他"
          }
        },
        reduce: {
          manual: {
            id: 6,
            type: "withdrawals",
            subType: "manual",
            class: "取款",
            subClass: "人工提出"
          },
          other: {
            id: 7,
            type: "other",
            subType: "other",
            class: "其他",
            subClass: "其他"
          }
        }
      },
      table: {
        total: 0,
        loading: true,
        pageSizeOpts: [20, 30, 40, 50],
        columns: [
          {
            title: "会员账号",
            key: "userName",
            align: "center",
            width: 180,
            render: (h, params) => {
              let flag = true
              return (
                  <Tooltip placement="right" title={params.row.userName.length > 9 ? params.row.userName: ''}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center"
                      }}
                    >
                      <span
                      style={{
                        width: "135px",
                        cursor: "pointer",
                        overflow:"hidden",
                        textOverflow:"ellipsis",
                        whiteSpace:"nowrap"
                        }}
                        onClick= { () => { if (flag) this.$store.commit('setCodeDetail', {uid: params.row.uid,
                        time: new Date().getTime(), title: 'mainCodeDetail'}) }
                        }
                        onMousemove = {(e) => {if (e.movementX > 4) {
                          flag = false
                        }}}
                        onMousedown =  { () => { flag = true }}
                      >{params.row.userName}</span>





                      <Icons
                        type="huiyuanchaxunzaixian"
                        color={params.row.online == "off" ? "#B3B3B3" : "#57A3F3"}
                        size="20"
                      />
                    </div>
                    <div slot="content">
                      {params.row.online === "off"
                        ? "离线"
                        : params.row.lastDevice + "在线"}
                    </div>
                  </Tooltip>
              );
            }
          },
          {
            title: "姓名",
            key: "realname",
            align: "center",
            width:95,
            render: (h, params) => {
              return <span>{this.$root.text(params.row.realName)}</span>;
            }
          },
          {
            title: "账号类型",
            key: "account_type",
            align: "center",
            width:90
          },
          {
            title: "等级",
            key: "levelAlias",
            align: "center",
             width:80

          },
          {
            title: "上级代理",
            key: "agencyName",
            align: "center",
            render: (h, params) => (
              <span>{this.$root.text(params.row.agencyName)}</span>
            )
          },
          {
            title: "余额",
            key: "balance",
            align: "center",
            sortable: "custom",
            render: (h, params) => {
              let { last, list } = params.row.wallet;
              return (
                <Tooltip
                  placement="bottom"
                  width="900px"
                  style="{display: block}"
                  class="money-tip"
                >
                  <a class="blue-font">{Number(last.balance).toFixed(2)}</a>
                  <div slot="content">
                    <div>
                      <div class="tooltip-title flex-row">
                        <div
                          class="txt-right-liner mt10"
                          style={{
                            display: (this.adminType == 'super') || (this.authInPage.indexOf('thirdBalanceRecycle') != -1) ? 'inline-block' : 'none'
                          }}
                        >
                          <Icons
                            type="huiyuanchaxunzhuanhui"
                            color="#FFF"
                            size="20"
                          />

                          <span
                            class="icon-right-txt"
                            onClick={e => {
                              this.changeBalance(params);
                            }}
                          >
                            转回
                          </span>
                        </div>
                        <div
                          class="txt-right-liner mt10"
                          style={{
                            display: (this.adminType == 'super') || (this.authInPage.indexOf('refreshThirdBalance') != -1) ? 'inline-block' : 'none'
                          }}
                        >
                          <Icons
                            type="huiyuanchaxunshuaxin"
                            color="#FFF"
                            size="18"
                          />
                          <span
                            class="icon-right-txt"
                            onClick={e => {
                              this.refreshBalance(params);
                            }}
                          >
                            刷新
                          </span>
                        </div>
                      </div>
                      <div class="tooltip-section pb10 flex-row">
                        {list.length ?
                          list.map((item, index) => (
                              <div class="items balance" >
                                {item.name}:{Number(item.balance).toFixed(2)}
                              </div>
                          )):<div class="item" style={{textAlign:'center',width:'100%'}}>加载中</div>}
                      </div>
                    </div>
                  </div>
                </Tooltip>
              );
            }
          },
          {
            title: "借呗",
            key: "lastWithdrawalsTime",
            align: "center",
            // sortable: 'cutom',
            render: (h, params) => {
              return (
                <Tooltip placement="bottom" max-width="350" class="money-tip">
                  <a class="blue-font">0</a>
                  <div slot="content">
                    <div class="tooltip-section pb10 borrow">
                      <div class="items">可借: 0</div>
                      <div class="items flex-row">
                        <span>借款: 0</span>
                        <span>时间: 2018.12.25</span>
                      </div>
                      <div class="items flex-row">
                        <span>还款: 0</span>
                        <span>时间: 2018.12.25</span>
                      </div>
                    </div>
                  </div>
                </Tooltip>
              );
            }
          },
          {
            title: '未登录/天',
            key: 'not_login_day',
            align: 'center',
            width:95
          },
          {
            title: "注册时间",
            key: "created_at",
            align: "center",
            width:180,
            render: (h, params) => {
              return <span class="pl20  pr20">{this.$root.unixTime(params.row.created_at)}</span>;
            }
          },
          // {
          //   title: "状态",
          //   key: "status",
          //   align: "center",
          //   width: 70,
          //   render: (h, params) => {
          //     const { status } = params.row;
          //     return (
          //       <span
          //         style={{
          //           color: status === "yes" ? "#515a6e" : "#FF2626"
          //         }}
          //       >
          //         {status === "yes" ? "正常" : "停用"}
          //       </span>
          //     );
          //   }
          // },
          // {
          //   title: "返水",
          //   key: "refundBonus",
          //   align: "center",
          //   width: 70,
          //   render: (h, params) => {
          //     let color =
          //       params.row.refundBonus === "yes" ? "#515a6e" : "#FF2626";
          //     return (
          //       <span style={{ color }}>
          //         {params.row.refundBonus === "yes" ? "正常" : "停用"}
          //       </span>
          //     );
          //   }
          // },
          {
            title: "操作",
            align: "center",
            minWidth: 150,
            render: (h, params) => {
              return (
                <div>
                  <span
                    class="ib mr10 blue-font"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('memberModifyStatus') != -1) ? 'inline-block' : 'none',
                      color: params.row.status !== "yes" ? "red" : ""
                    }}
                    onClick={() => {
                      this.changeStatus(params, "status");
                    }}
                  >
                    {params.row.status == "yes" ? "状态正常" : "状态停用"}
                  </span>

                  <span
                    class="ib mr10 blue-font"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('refundLevelModifyStatus') != -1) ? 'inline-block' : 'none',
                      color: params.row.refundBonus !== "yes" ? "red" : ""
                    }}
                    onClick={() => {
                      this.changeStatus(params, "refundBonus");
                    }}
                  >
                    {params.row.refundBonus === "yes" ? "返水正常" : "返水停用"}
                  </span>
                  <span
                    class="ib mr10 blue-font"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('memberDetail') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {
                      this.$router.push({
                        name: "memberDetails",
                        query: {
                          siteId: this.nowSite.id,
                          uid: params.row.uid
                        }
                      });
                    }}
                  >
                    详情
                  </span>
                  <span
                    class="ib mr10 blue-font"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('memberUpdate') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {
                      const { uid, siteId, agencyId } = params.row;
                      this.$router.push({
                        name: "memberEdit",
                        params: { page: "edit" },
                        query: { uid, siteId, agencyId }
                      });
                    }}
                  >
                    编辑
                  </span>
                  <span
                    class="ib mr10 blue-font"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('memberModifyStatus') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {
                      if (params.row.is_agency == 1) {
                        this.$Tip.info({ content: "此功能暂未开放" });
                      } else {
                        this.changeStatus(params, "is_agency");
                      }
                    }}
                  >
                    {params.row.is_agency !== 1 ? "升为代理" : "降为会员"}
                  </span>
                </div>
              );
            }
          }
        ],
        data: []
      },
      historyTable: {
        loading: true,
        columns: [
          {
            title: "登录设备",
            key: "device",
            align: "center"
          },
          {
            title: "登录域名",
            key: "domain",
            align: "center"
          },
          {
            title: "登录IP",
            key: "ip",
            align: "center"
          },
          {
            title: "归属地",
            key: "location",
            align: "center"
          },
          {
            title: "登录时间",
            key: "created_at",
            align: "center",
            render: (h, params) => (
              <span>{this.$root.unixTime(params.row.created_at)}</span>
            )
          }
        ],
        data: []
      }
    };
  },
  computed: {
    modalKey() {
      const { title } = this.$route.meta;
      return title !== "加款减款" ? "oneTabFundsModal" : "twoTabFundsModal";
    },
    fundsKey() {
      const { title } = this.$route.meta;
      return title !== "加款减款" ? "oneTabFundsForms" : "twoTabFundsForms";
    }
  },
  watch: {
    nowSite: {
      handler(val, oldVal) {
        this.$nextTick(() => {
          const { name } = this.$route;
          name === "memberSearch" && this.$refs.LevelSelect.init(val.id);
        });
      },
      deep: true,
      immediate: true
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.meta.title === "加款减款") {
        vm.routes = [];
        // vm.subSts = false;
        vm.routes.push(...[to, from]);
        vm.$refs.twoTabFundsForms.setOrigin();
        vm.$refs.twoTabFundsModal.show();
      }
    });
  },
  methods: {
    levelChange(res) {
      this.searchKey.levelId = res.levelLabel;
    },
    onPageChange(page) {
      this.page = page;
      let data = { ...this.searchKey, siteId: this.nowSite.id };
      data = { ...data, ...this.sortParams };
      this.getData({ params: data, query: { page } });
    },
    //刷新余额
    refreshBalance(params) {
      const { siteId, uid } = params.row;
      params.row.wallet.list = []
      refreshThirdBalance({ siteId, uid }).then(res => {
        params.row.wallet.list = [...res.data.platform_balance];
      });
    },
    changeBalance(params) {
      const { siteId, uid } = params.row;
      this.$Tip.confirm({
        content: "您确定回收该用户的第三方余额吗？",
        onOk: () => {
          thirdBalanceRecycle({ siteId, uid }).then(res => {
            if (res.code === 200) this.$Message.success("第三方余额回收成功");
          });
        }
      });
    },
    getData(data) {
      let dataParams = data.params;
      for (let key in dataParams) {
        if (!dataParams[key]) delete dataParams[key];
      }
      this.$root.startTableLoading();
      if (!data.params.typeTag) {
        delete data.params.content;
      }
      if (data.params.isLike) data.params.isLike = Number(data.params.isLike);
      getMemberTableData(data).then(res => {
        const { data, total } = res.data;
        this.table.data = data;
        this.table.total = total;
      });
    },
    //排序
    sortChange(column) {
      const { key, order } = column;
      const { id } = this.nowSite;
      let data = { sortKey: key, sortVal: order, siteId: id };
      if (data.sortVal == "normal") {
        delete data.sortKey;
        delete data.sortVal;
      }
      this.sortParams = {};
      this.sortParams = { ...data };
      if (this.page !== 1) {
        this.getData({
          params: { ...this.searchKey, ...data },
          query: { page: this.page }
        });
      } else {
        this.getData({ params: { ...this.searchKey, ...data } });
      }
    },
    //提交查询
    searchSubmit() {
      let params = { ...this.searchKey };
      if (this.$root.validateTime(this.Time)) {
        const [startTime, endTime] = this.$root.validateTime(this.Time);
        params.startTime = startTime && this.$root.formatTime(startTime);
        params.endTime = endTime && this.$root.formatTime(endTime);
      } else {
        return false;
      }

      this.searchKey.startTime = params.startTime;
      this.searchKey.endTime = params.endTime;

      params.siteId = this.nowSite.id;
      for (let key in params) {
        if (!params[key]) delete params[key];
      }
      this.$refs.tables.setPage();
      this.getData({ params });
    },
    changeStatus(params, key) {
      let text, msg, value, rowValue;
      const { status, refundBonus, is_agency } = params.row;
      switch (key) {
        case "status":
          text =
            status === "yes"
              ? "您确定停用该会员状态吗?"
              : "您确定启用该会员状态吗?";
          msg = status === "yes" ? "停用状态成功" : "启用状态成功";
          value = status === "yes" ? 0 : 1;
          rowValue = status === "yes" ? "no" : "yes";
          break;
        case "refundBonus":
          text =
            refundBonus === "yes"
              ? "您确定停用该会员返水吗？"
              : "您确定启用该会员返水吗？";
          msg = refundBonus === "yes" ? "停用返水成功" : "启用返水成功";
          value = refundBonus === "yes" ? 0 : 1;
          rowValue = refundBonus === "yes" ? "no" : "yes";
          break;
        case "is_agency":
          text =
            is_agency == 0
              ? "您确定晋升会员为代理吗？"
              : "您确定降级该代理为会员吗？";
          msg = is_agency == 0 ? "晋升为代理成功" : "降级为会员成功";
          value = is_agency == 0 ? 1 : 0;
          rowValue = is_agency == 0 ? 1 : 0;
          break;
      }
      const data = {
        siteId: this.nowSite.id,
        uid: params.row.uid,
        statusKey: key,
        statusVal: value
      };
      console.log(data)
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          // 不是代理升降级都可以调接口
          memberModifyStatus(data).then(res => {
            if (res.code == 200) {
              if (typeof res.data === "string") {
                this.$Tip.hide();
                this.$Message.config({
                  top: 150,
                  duration: 1
                })
                // this.changeTxtStatus(msg, data.uid)
                this.$Message.success({ content: msg })
              }

              params.row[key] = rowValue;
              // 代理的升降级
              let { account_type } = params.row;
              let level = account_type.split("级")[0];
              params.row.account_type =
                rowValue == 0 ? `${level}级会员` : `${level}级代理`;
            }
          });
        }
      });
    },
    // changeTxtStatus (msg, uid) {
    //   if (msg && msg.indexOf('状态') !== -1) {
    //     if (!this.flag.member.includes(uid)) {
    //       this.flag.member.push(uid)
    //     }
    //   } else if (msg && msg.indexOf('返水') !== -1) {
    //     if (!this.flag.refund.includes(uid)) {
    //       this.flag.refund.push(uid)
    //     }
    //   }
    // },
    // 会员加减款
    tabChange(tabName) {
      this.fundsModalTitle =
        tabName === "single" ? "加款/减款" : "批量加款/减款";
    },
    submitFundsForm(params) {
      // params.remarks = "暂无备注";
      this.$root.startEditLoading(this);
      memberBalanceHandle(params).then(res => {
        if (res.code == 200) {
          let msg = params.handle === "+" ? "加款成功" : "减款成功";
          this.$refs[this.modalKey].hide();
          if (!this.fundsModalTitle.includes("批量")) {
            let postData = {
              params: { ...this.searchKey, siteId: this.$root.nowSite.id },
              query: { page: this.page }
            };
            this.getData(postData);
            this.$store.commit("closeTag", this.routes[0]);
            // this.$router.push(this.routes[1])
            // this.subSts = true;
            // this.$router.push({ name: "memberFundsLog" });
          } else {
            this.$store.commit("closeTag", this.routes[0]);
            // this.$router.push(this.routes[1])
            // this.subSts = true;
            // this.$router.push({ name: "memberFundsLog" });
          }
        }
      });
    },
    // 会员历史记录
    loginHistory(params) {
      this.$refs.historyModal.show();
      memberDetail({ siteId: params.siteId, uid: params.uid }).then(res => {
        const { basic } = res.data;
        this.historyTable.loading = true;
        setTimeout(() => {
          this.historyTable.data = basic.login_history;
          this.historyTable.loading = false;
        }, 2000);
      });
    },
    //Modal弹框的状态改变
    modalVisible(flag) {
      // if (!flag && !this.subSts) {
      //   this.$store.commit('closeTag', this.routes[0])
      //   this.$router.push(this.routes[1])
      // }
      if (!flag) {
        this.$store.commit("closeTag", this.routes[0]);
        // this.$router.push(this.routes[1])
      }
    }
  }
};
</script>
<style lang="less"  scoped>
@import "../../styles/tabs.less";
@import "../../styles/function.less";
.aa {
  transition: all 2s;
}
.go {
  transform: rotate(-180deg);
  transition: all 2s;
}
@h: 40px;
/deep/.v2-table {
  .ivu-table-wrapper {
    overflow: visible;
  }
}
/deep/.tooltip-title {
  cursor: pointer;
  height: @h;
  line-height: @h;
  margin-bottom: 5px;
  position: relative;
  // display: flex;
  &::after {
    .after(100%, 1px, #7e7e7e, 0px, 45px);
  }
  .iconfont {
    vertical-align: middle;
  }
  .txt-right-liner {
    width: 50%;
    border-right: 1px solid #7e7e7e;
    text-align: center;
  }
  .icon-right-txt {
    color: #fff;
    margin-left: 3px;
    vertical-align: middle;
  }
}
/deep/.money-tip {
  .ivu-tooltip-inner {
    min-width: 300px;
    max-width: 350px;
    padding: 0;
  }
}
/deep/.tooltip-section {
  flex-wrap: wrap;
  line-height: @h;
  justify-content: start;
  // justify-content: flex-start;
  .items.balance {
    width: 50%;
    text-align: center;
    // padding-left:10px;
    // text-indent: 10px;
    position: relative;
    border-right: 1px solid #7e7e7e;
  }
  .items::after {
    .after(100%, 1px, #7e7e7e, 0px, 40px);
  }
  &.borrow {
    // width: 315px;
    .items {
      width: 100%;
      justify-content: flex-start;
      text-align: center;
      padding-left: 10px;
      text-indent: 10px;
      position: relative;
    }
    .items::after {
      .after(100%, 1px, #7e7e7e, 0px, 40px);
    }
  }
}

/deep/.expand {
  @h: 40px;
  .section {
    .row > .col {
      height: @h;
      line-height: @h;
    }
  }
  .remarks {
    height: @h;
    line-height: @h;
  }
}

.ivu-table-expanded-cell {
  padding: 10px 10px !important;
  .expand {
    width: 100%;
  }
}
.pconment {
  padding: 10;
}
.more {
  width: 130%;
}
.ivu-form-item {
  &:nth-child(5) {
    margin-right: -5px !important;
  }
  &:nth-child(8) {
    margin-top: 1px !important;
  }
}
</style>
