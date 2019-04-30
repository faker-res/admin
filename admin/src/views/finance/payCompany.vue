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
        <FormItem label="存入账户">
          <Select class="s-160" v-model="searchKey.depositId" clearable placeholder="全部">
            <Option
              v-for="(item,i) in depositAccount"
              :key="i"
              :value="item.depositId"
            >{{item.bankName}}/{{item.cardName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="状态">
          <Select class="s-100" clearable v-model="searchKey.status">
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
        <!-- 一屏显示 -->
        <div v-if="showMethod == 'large'" class="ib ml25">
          <FormItem>
            <Select clearable v-model="searchKey.typeTag">
              <Option value="userName">会员账号</Option>
              <Option value="agencyName">上级代理</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Input
              placeholder="多个请以,逗号隔开"
              v-model="searchKey.content"
              :disabled="!searchKey.typeTag"
              class="s-140"
            />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              class="search"
              :loading="$root.searchBtnLoading"
              @click="searchSubmit"
            >查询</Button>
          </FormItem>
        </div>
        <!-- 1707-1920  掉落两个 -->
        <div v-if="showMethod == 'middle' && showMore" class="ml75 mt5 ib">
          <FormItem>
            <Select clearable v-model="searchKey.typeTag">
              <Option value="userName">会员账号</Option>
              <Option value="agencyName">上级代理</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Input
              placeholder="多个请以,逗号隔开"
              v-model="searchKey.content"
              :disabled="!searchKey.typeTag"
              class="s-180"
            />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              class="search"
              :loading="$root.searchBtnLoading"
              @click="searchSubmit"
            >查询</Button>
          </FormItem>
        </div>
        <!-- 1707以下掉落3个 -->
        <div v-if="showMethod == 'small' && showMore" class="ml75 mt5 ib">
          <FormItem>
            <Select clearable v-model="searchKey.typeTag">
              <Option value="userName">会员账号</Option>
              <Option value="agencyName">上级代理</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Input
              placeholder="多个请以,逗号隔开"
              v-model="searchKey.content"
              :disabled="!searchKey.typeTag"
              class="s-180"
            />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              class="search"
              :loading="$root.searchBtnLoading"
              @click="searchSubmit"
            >查询</Button>
          </FormItem>
        </div>
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
    <Modals ref="detailModal" title="入款详情" :width="760">
      <div slot="content">
        <div class="box">
          <div class="detail" ref="formKey" :model="formKey">
            <p>
              <label>订单号：</label>
              <span>{{dataDetail.code}}</span>
            </p>
            <p>
              <label>会员账号：</label>
              <span>{{dataDetail.bankAccountName}}</span>
            </p>
            <p>
              <label>会员姓名：</label>
              <span>{{dataDetail.username}}</span>
            </p>
            <p>
              <label>存入账户：</label>
              <span>{{dataDetail.bankName}}</span>
            </p>
            <p>
              <label>账户号码：</label>
              <span>{{dataDetail.bankId}}</span>
            </p>
            <p>
              <label>存款金额：</label>
              <span>{{dataDetail.amount}}</span>
            </p>
            <p>
              <label>到账金额：</label>
              <span>{{(dataDetail.amount*(1+ (formKey.paymentBonus)/100)).toFixed(2)}}</span>
            </p>
            <p>
              <label>存款优惠：</label>
              <Select v-model="formKey.paymentBonus" style="width:120px;">
                <Option
                  v-for="(item,i) in paymentBonusList"
                  :key="i"
                  :value="item"
                  :label="item+'%'"
                ></Option>
              </Select>
            </p>
            <p>
              <label>提交时间：</label>
              <span>{{dataDetail.commitTime}}</span>
            </p>
            <p>
              <label>操作类型：</label>
              <span>通过</span>
            </p>
            <p style="text-align:center;">
              <Button
                class="submit mb60"
                :loading="$root.editBtnLoading"
                type="primary"
                @click="success"
              >确定</Button>
            </p>
          </div>
        </div>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Icons from "@/components/icons";
import tableMixins from "@/mixins/table";
import LevelSelect from "@/components/level-select";
import Modals from "@/components/modals";
import { depositOfflineList, depositAuditData } from "@/api/finance";
import { getUserType } from '@/libs/util';
import { storeBankNQRCode } from "@/api/common";
import { mapState, mapActions } from "vuex";
export default {
  name: "payCompany",
  mixins: [tableMixins],
  components: {
    Tables,
    Icons,
    Modals,
    LevelSelect
  },
  computed: {
    ...mapState({
      autoFresh: state => state.info.payCompanyFresh,
      autoFreshTimer: state => state.info.payCompanyTimer
    })
  },
  beforeDestroy() {
    this.changeFresh({ stage: "payCompany", val: this.autoFresh });
    this.clearPayOnline("payCompany");
  },
  data() {
    return {
      showMethod: 'large',
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      index: 0,
      depositAccount: [], //存入账户
      formKey: {
        paymentBonus: 0
      },
      moreData: [],
      commitTime: "",
      dataDetail: {},
      searchKey: {
        status: "wait",
        typeTag: "userName",
        siteId: this.$root.nowSite.id,
        depositId: "",
        bankId: ""
      },
      Time: [],
      paymentBonusList: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
      table: {
        pageSizeOpts: [20, 30, 40, 50],
        total: 0,
        columns: [ 
          {
            title: "订单号",
            key: "code",
            align: "center",
            width: 180
          },
          {
            title: "等级",
            key: "levelAlias",
            align: "center",
            width: 120,
          },
          {
            title: "上级代理",
            key: "agencyName",
            align: "center"
          },
          {
            title: "会员账号",
            key: "username",
            align: "center",
          },
          {
            title: "存款方式/姓名",
            key: "",
            align: "center",
            render: (h, params) => (
              <div>
                <p class="bb pb2 fh">{params.row.subType}</p>
                <p class="pt1 fh">{params.row.realName}</p>
              </div>
            )
          },
          {
            title: "存款金额",
            key: "amount",
            align: "center",
            render: (h, params) => {
              let { amount, status } = params.row;
              let color = status == "wait" ? "#2D8CF0" : "";
              return <span style={{ color }}>{amount}</span>;
            }
          },
          {
            title: "存入账户/姓名",
            key: "bankName",
            align: "center",
            render: (h, params) => (
              <div>
                <p class="bb pb2 fh">{params.row.bankName}</p>
                <p class="pt1 fh">{params.row.bankAccountName}</p>
              </div>
            )
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
            width: "150",
            render: (h, params) => {
              let props = {
                size: "small"
              };
              return h("div", {
                style: {
                  display: (this.adminType == 'super') || (this.authInPage.indexOf('depositAudit') != -1) ? 'block' : 'none'
                }
              },[
                h(
                  "Button",
                  {
                    props: props,
                    style: {
                      color: "#fff",
                      backgroundColor: "#2D8CF0",
                      paddingRight: "12px",
                      paddingLeft: "12px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      size: "small",
                      marginRight: "15px",
                      display:
                        params.row.status === "wait" ? "inline-block" : "none"
                    },
                    on: {
                      click: () => {
                        this.commitTime = this.$root.unixTime(params.row.time);
                        this.$set(params.row, "commitTime", this.commitTime);
                        this.index = params.index;
                        this.dataDetail = "";
                        this.$refs.detailModal.spinShow();
                        this.$refs.detailModal.show();
                        setTimeout(() => {
                          this.dataDetail = params.row;
                          this.$refs.detailModal.spinHide();
                        }, 500);
                      }
                    }
                  },
                  "通过"
                ),
                h(
                  "Button",
                  {
                    props: props,
                    style: {
                      color: "#fff",
                      backgroundColor: "#2D8CF0",
                      paddingRight: "12px",
                      paddingLeft: "12px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      display:
                        params.row.status === "wait" ? "inline-block" : "none"
                    },
                    on: {
                      click: () => {
                        this.index = params.index;
                        this.$Tip.confirm({
                          content: "您确定拒绝此入款吗",
                          onOk: () => {
                            this.dataDetail = params.row;
                            this.reject();
                          }
                        });
                      }
                    }
                  },
                  "拒绝"
                ),
                h(
                  "span",
                  {
                    style: {
                      display:
                        params.row.status !== "wait" ? "inline-block" : "none"
                    }
                  },
                  "-"
                )
              ]);
            }
          },
          {
            title: "提交时间/审核时间",
            key: "time",
            align: "center",
            width:180,
            render: (h, params) => {
              const { status, item, updateTime } = params.row;
              if (status == "wait")
                return (
                  // return <span>-</span>;
                  <div>
                    <p class="bb pb10 pl10 pr10">
                      {this.$root.unixTime(params.row.time)}
                    </p>
                    <p class="pt1">-</p>
                  </div>
                );
              if (status == "success" || status == "fail")
                return (
                  <div>
                    <p class="bb pb10 pl10 pr10">
                      {this.$root.unixTime(params.row.time)}
                    </p>
                    <p class="pt1">
                      {this.$root.unixTime(params.row.updateTime)}
                    </p>
                  </div>
                );
            }
          },
          {
            title: "审核者",
            key: "updateUserName",
            align: "center",
            render: (h, params) => {
              if (params.row.status == "wait") {
                return <span>-</span>;
              }
              if (
                params.row.status == "success" ||
                params.row.status == "fail"
              ) {
                return <span>{params.row.updateUserName}</span>;
              }
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
          name === "payCompany" && this.$refs.LevelSelect.init(val.id);
        });
      },
      deep: true,
      immediate: true
    },
    showWidth() {
      if (this.showWidth >= 2195) {
        this.showMethod = "large";
      } else if (this.showWidth >= 1707) {
        //1920-1  1707-2  1536-3  1280-3
        this.showMethod = "middle";
      } else {
        this.showMethod = "small";
      }
    }
  },
  created(){
        this.autoFreshFun(this.autoFresh);
  },
  mounted() {
    this.getStoreBankNQRCode();
  },
  methods: {
    ...mapActions(["changeFresh", "clearPayOnline", "setTimer"]),
    changeAuto(val) {
      this.changeFresh({ stage: "payCompany", val }); //改变时间
      this.autoFreshFun(val);
    },
    //存入账户
    getStoreBankNQRCode() {
      const data = {
        siteId: this.$root.nowSite.id
      };
      storeBankNQRCode(data).then(res => {
        this.depositAccount = res.data;
      });
    },
    //列表数据
    getData(data) {
      this.$root.startTableLoading();
      let dataParams = data.params;
      for (let key in dataParams) {
        if (!dataParams[key]) delete dataParams[key];
      }
      if (!data.params.typeTag) {
        delete data.params.content;
      }
      if(this.searchKey.depositId) {
        data.params.bankId = this.depositAccount.filter(item => item.depositId == this.searchKey.depositId)[0].bankId
        console.log(data.params.bankId)
      }
      depositOfflineList(data).then(res => {
        if (res.data.data) {
          this.table.total = res.data.total;
          const { total, list } = res.data.data;
          this.table.data = list;
          this.moreData = total;
        } else {
          //数据的值为空
          this.table.data = [];
          this.table.total = 0;
        }
      });
    },
    searchSubmit() {
          this.$refs.tables.setPage();
      // this.searchKey.bankId = this.depositAccount.filter(item => item.depositId == this.searchKey.depositId)[0].bankId
      let params = { ...this.searchKey, siteId: this.$root.nowSite.id };
      if (this.$root.validateTime(this.Time)) {
        const [startTime, endTime] = this.$root.validateTime(this.Time);
        params.startTime = startTime && this.$root.formatTime(startTime);
        params.endTime = endTime && this.$root.formatTime(endTime);
      } else {
        return false;
      }
      this.searchKey.startTime = params.startTime;
      this.searchKey.endTime = params.endTime;

      for (let key in params) {
        if (!params[key]) delete params[key];
      }

      if (this.searchKey.depositId) {
        params.bankId = this.depositAccount.filter(
          item => item.depositId == this.searchKey.depositId
        )[0].bankId;
        console.log(params.bankId);
      }
      // return
      this.getData({ params });
    },
    //通过
    success() {
      let params = { ...this.formKey };
      const { id, time } = this.dataDetail;
      params.id = id;
      params.status = "success";
      params.siteId = this.$root.nowSite.id;
      params.timestamp = time;
      params.depositType = 1;
      this.$root.startEditLoading();
      depositAuditData(params).then(res => {
        if (res.code == 200) {
          this.$refs.detailModal.hide();
          if (!this.searchKey.bankId) delete this.searchKey.depositId;
          this.getData({ params: this.searchKey });
        }

        // this.$refs.detailModal.hide();
        // this.$Tip.success({ content: "入款成功" });
        // this.getData({ params: this.searchKey });
      });
    },
    //拒绝
    reject() {
      const { id, time } = this.dataDetail;
      const params = {
        id: id,
        status: "fail",
        siteId: this.$root.nowSite.id,
        timestamp: time,
        paymentBonus: 0,
        depositType: 1
      };
      console.log(params);

      depositAuditData(params).then(res => {
        if (res.code == 200) this.table.data[this.index].status = "fail";
        this.getData({ params: this.searchKey });
        // this.$Tip.success({ content: "拒绝入款成功" });
        // this.table.data[index].status = "success";
      });
    },
    levelChange(res) {
      this.searchKey.levelId = res.id;
    },
    autoFreshFun(val) {
      const data = { ...this.searchKey, siteId: this.$root.nowSite.id };
      this.getData({ params: data });
      if (val == "0") {
        this.clearPayOnline("payCompany");
      } else {
        this.clearPayOnline("payCompany");
        this.setTimer({
          stage: "payCompany",
          time: setInterval(() => {
            this.getData({ params: data });
          }, val * 1000)
        });
      }
    },
    catchError() {
      this.clearPayOnline("payCompany");
      this.changeFresh({ stage: "payCompany", val: "0" });
    }
  },
  activated() {
    this.autoFreshFun(this.autoFresh);
  },
  deactivated() {
    this.clearPayOnline("payCompany");
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
/deep/.s-180 input {
  border-radius: 4px !important;
}
/deep/.fh {
  line-height: 32px;
}
.ivu-table-cell {
  padding: 0 10px;
}
.box {
  display: flex;
  justify-content: center;
  .detail {
    font-size: 16px;
    p {
      line-height: 3.3;
      label {
        display: inline-block;
        width: 110px;
        text-align: right;
        color: #666666;
      }
    }
  }
}
.ivu-form-item {
  &:nth-child(6) {
    margin-right: -5px;
  }
}
/deep/.ivu-table-header {
  /deep/.ivu-table-column-center {
    height: 40px;
  }
}

/deep/.ivu-table-column-center {
  height: 80px;
}
</style>


