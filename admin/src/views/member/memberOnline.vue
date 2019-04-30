<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="等级">
          <LevelSelect
            placeholder="全部"
            ref="LevelSelect"
            width="86"
            levelType="member"
            @on-level-change="levelChange"
          />
        </FormItem>
        <FormItem label="客户端">
          <Select clearable v-model="searchKey.lastDevice" class="s-86">
            <Option v-for="(t,i) in platformList" :key="i" :value="t.value">{{t.name}}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Checkbox v-model="searchKey.isLike">
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem>
        <FormItem>
          <Select v-model="searchKey.typeTag" class="s-100">
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
          <!-- :placeholder="searchKey.typeTag == 'userName' ? '多个请以，逗号隔开' : searchKey.typeTag == 'agencyName' ? '请输入上级代理账号' : searchKey.typeTag == 'phone' ? '请输入手机号' : searchKey.typeTag == 'email' ? '请输入email账号' : '请输入微信号'" -->
          <Input
            :placeholder="searchKey.isLike=='1'?'单个查询':'多个请以,逗号隔开'"
            class="s-140"
            v-model="searchKey.content"
            :disabled="!searchKey.typeTag"
          />
        </FormItem>
        <!-- <FormItem>
          <Poptip
            trigger="hover"
            content="多个请以,逗号隔开,仅支持同类型多个输入"
            placement="right-start"
            class="ml14f"
          >
            <Icons type="bangzhutishi" color="#E4E4E4" :size="26" class="pr5"/>
          </Poptip>
        </FormItem>-->
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
        editable
        :columns="table.columns"
        :loading="$root.tableLoading"
        :value="table.data"
        :total="table.total"
        @on-delete="onDelete"
        @on-page-change="onPageChange"
        :pageSizeOpts="table.pageSizeOpts"
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
    <Modals ref="twoTabFundsModal" :title="fundsModalTitle">
      <div slot="content">
        <Tabs type="card" :animated="false" value="single" @on-click="tabChange">
          <TabPane label="加款/减款" name="single">
            <FundsForms
              ref="twoTabFundsForms"
              mode="single"
              :oprateTypes="oprateTypes"
              @on-submit="submitFundsForm"
            ></FundsForms>
          </TabPane>
          <TabPane label="批量加款/减款" name="batch">
            <FundsForms mode="batch" @on-submit="submitFundsForm" :oprateTypes="oprateTypes"></FundsForms>
          </TabPane>
        </Tabs>
      </div>
    </Modals>
    <Modals ref="historyModal" title="历史登陆">
      <div slot="content" class="modal-overflow">
        <Tables
          :columns="historyTable.columns"
          :loading="historyTable.loading"
          :value="historyTable.data"
          :page="false"
        ></Tables>
      </div>
    </Modals>
    <member-code-detail :codeDetailTitle="'codeDetail'"/>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Icons from "@/components/icons";
import Modals from "@/components/modals";
import FundsForms from "./components/funds-forms";
import LevelSelect from "@/components/level-select";
import { Tooltip } from "iview";
import { sortInteraction, getUserType } from "@/libs/util";
import memberCodeDetail from "./components/member-code-detail";
import {
  getMemberTableData,
  memberModifyStatus,
  memberDetail,
  thirdBalanceRecycle,
  refreshThirdBalance,
  memberBalanceHandle
} from "@/api/member";
import tableMixins from "@/mixins/table";
export default {
  name: "memberOnline",
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
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      page: 1,
      platformList: [
        { value: "pc", name: "PC" },
        { value: "h5", name: "H5" },
        { value: "ios", name: "IOS" },
        { value: "android", name: "Android" }
      ],
      Time: [],
      fundsModalTitle: "加款/减款",
      searchKey: {
        status: "online",
        typeTag: "userName"
      },
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
        loading: true,
        total: 0,
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
                <Tooltip placement="right" title = { params.row.userName.length > 9 ? params.row.userName: '' }>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center"
                    }}
                  >
                    <span style={{
                        width: "135px",
                        cursor: "pointer",
                        overflow:"hidden",
                        textOverflow:"ellipsis",
                        whiteSpace:"nowrap"
                      }} onClick=
                      { (e) => { if (flag) this.$store.commit('setCodeDetail', {uid: params.row.uid,
                      time: new Date().getTime(), title: 'codeDetail'})} }
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
            render: (h, params) => {
              return <span>{this.$root.text(params.row.realName)}</span>;
            }
          },
          {
            title: "账号类型",
            key: "account_type",
            align: "center"
          },
          {
            title: "等级",
            key: "levelAlias",
            align: "center"
          },
          {
            title: "上级代理",
            key: "agencyName",
            align: "center"
          },
          {
            title: "余额",
            key: "balance",
            align: "center",
            sortable: 'custom',
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
            title: "注册时间",
            key: "created_at",
            align: "center",
             width:180,
            render: (h, params) => {
              return <span  class="pl20  pr20">{this.$root.unixTime(params.row.created_at)}</span>;
            }
          },
          // {
          //   title: "状态",
          //   key: "status",
          //   align: "center",
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
                      const { uid, siteId } = params.row;
                      this.$router.push({
                        name: "memberEdit",
                        params: { page: "edit" },
                        query: { uid, siteId }
                      });
                    }}
                  >
                    编辑
                  </span>
                  <span
                    class="ib mr10 blue-font"
                    onClick={() => {
                      if (params.row.is_agency == 1) {
                        this.$Tip.info({ content: "此功能暂未开放" });
                      } else {
                        this.changeStatus(params, "is_agency");
                      }
                    }}
                  >
                    {params.row.is_agency !== 1 ? "晋升代理" : "降级会员"}
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
            title: "登陆设备",
            key: "device",
            align: "center"
          },
          {
            title: "登陆域名",
            key: "domain",
            align: "center"
          },
          {
            title: "登陆IP",
            key: "ip",
            align: "center"
          },
          {
            title: "归属地",
            key: "location",
            align: "center"
          },
          {
            title: "登陆时间",
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
          name === "memberOnline" && this.$refs.LevelSelect.init(val.id);
        });
      },
      deep: true,
      immediate: true
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.meta.title === "加款减款") {
        vm.$refs.twoTabFundsModal.show();
      }
    });
  },
  methods: {
    levelChange(res) {
      this.searchKey.levelId = res.levelLabel;
    },
    onPageChange(page) {

      let data = { ...this.searchKey, siteId: this.$root.nowSite.id }
      this.page = page
      this.getData({ params: data, query: { page }})
    },
    //刷新余额
    refreshBalance(params) {
      const { siteId, uid } = params.row;
      params.row.wallet.list = [];
      refreshThirdBalance({ siteId, uid }).then(res => {
        // if(res.code == 200) {
        //   this.$nextTick(() => {
        //     params.row.wallet.list = res.data;
        //   })
        // }
         params.row.wallet.list = [...res.data.platform_balance];
      });
    },
    changeBalance(params) {
      const { siteId, uid } = params.row;
      this.$Tip.confirm({
        content: "您确定回收该用户的第三方余额吗？",
        onOk: () => {
          thirdBalanceRecycle({ siteId, uid });
        }
      });
    },
    getData(data) {
      this.$root.startTableLoading();
      if (data.params.isLike) data.params.isLike = Number(data.params.isLike);
      let { startTime, endTime } = data.params
      if (startTime) delete data.params.startTime
      if (endTime) delete data.params.endTime
      getMemberTableData(data).then(res => {
        const { data, total } = res.data;
        this.table.data = data;
        this.table.total = total;
      });
    },
    onDelete(params) {},
    //查询
    searchSubmit() {
      let params = this.searchKey;
      params.siteId = this.$root.nowSite.id;
      if (!params.content) {
        delete params.content;
      }
      this.getData({ params });
    },
    searchReset() {},
    changeStatus(params, key) {
      let text, msg, value, rowValue;
      const { status, refundBonus, is_agency } = params.row;
      switch (key) {
        case "status":
          text =
            status === "yes"
              ? "您确定要停用此会员账号吗?"
              : "您确定要启用此会员账号吗?";
          msg = status === "yes" ? "停用状态成功" : "启用状态成功";
          value = status === "yes" ? 0 : 1;
          rowValue = status === "yes" ? "no" : "yes";
          break;
        case "refundBonus":
          text =
            refundBonus === "yes"
              ? "您确定要停用此会员返水吗？"
              : "您确定要启用此会员返水吗？";
          msg = refundBonus === "yes" ? "停用返水成功" : "启用返水成功";
          value = refundBonus === "yes" ? 0 : 1;
          rowValue = refundBonus === "yes" ? "no" : "yes";
          break;
        case "is_agency":
          text =
            is_agency == 0
              ? "您确定要升级此会员为代理吗？?"
              : "您确定要降级该代理为会员吗？?";
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
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          // 不是代理升降级都可以调接口
          memberModifyStatus(data).then(res => {
            if (res.code == 200) {
              this.$Tip.hide();
              this.$Message.success(msg);
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
    tabChange(tabName) {
      this.fundsModalTitle =
        tabName === "single" ? "加款/减款" : "批量加款/减款";
    },
    submitFundsForm(params) {
      // params.remarks = '暂无备注'
      this.$root.startEditLoading(this);
      memberBalanceHandle(params).then(res => {
        if (res.code == 200) {
          let msg = params.handle === "+" ? "加款成功" : "减款成功";
          this.$refs[this.modalKey].hide();
          if (!this.fundsModalTitle.includes("批量")) {
            this.$router.push({ name: "memberOnline" });
          } else {
            this.$router.push({ name: "memberFundsLog" });
          }
        }
      });
    },
    loginHistory(params) {
      this.$refs.historyModal.show();
      this.$refs;
      memberDetail({ siteId: params.siteId, uid: params.uid }).then(res => {
        const { basic } = res.data;
        this.historyTable.loading = true;
        setTimeout(() => {
          this.historyTable.data = basic.login_history;
          this.historyTable.loading = false;
        }, 2000);
      });
    },
    // sortChange(obj) {
    //   sortInteraction(obj);
    // }
    //排序传入站点，分页时候传入page
    sortChange(column) {
      const { key, order } = column;
      const { id } = this.nowSite;
      let data = { sortKey: key, sortVal: order, siteId: id };
      if(data.sortVal=='normal'){
         delete data.sortKey
         delete data.sortVal
      }
      this.sortParams = {};
      this.sortParams = {...data};
      if (this.page !==1 ) {
        this.getData({ params: { ...this.searchKey, ...data }, query: {page: this.page}});
      } else {
        this.getData({ params: { ...this.searchKey, ...data } });
      }
    },
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/tabs.less";
@import "../../styles/function.less";
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
.more {
  width: 130%;
}
.ivu-form-item {
  &:nth-child(3) {
    margin-right: -5px;
  }
  &:nth-child(6) {
    margin-top: 1px !important;
  }
}
</style>
