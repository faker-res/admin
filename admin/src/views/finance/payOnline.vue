 <template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem class="ml10" v-show="showMethod != 'large'">
          <div @click="showMore = !showMore" class="cs">
            <span>更多</span>
            <Icon v-show="!showMore" type="ios-arrow-down" size="18" color="#999"/>
            <Icon v-show="showMore" type="ios-arrow-forward" size="18" color="#999"/>
          </div>
        </FormItem>
        <FormItem label="刷新">
          <Select class="s-86" :value="autoFresh" @on-change="changeAuto">
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
        <FormItem label="起止日期">
          <DatePicker type="date" placeholder="开始时间" class="s-120" v-model="Time[0]"></DatePicker>
          <span class="date-divide"></span>
          <DatePicker type="date" placeholder="结束时间" class="s-120" v-model="Time[1]"></DatePicker>
        </FormItem>
        <FormItem label="订单号">
          <Input placeholder="请输入订单号" v-model="searchKey.code" class="s-140"/>
        </FormItem>
        <FormItem label="状态" class="pib">
          <Select clearable class="s-100" v-model="searchKey.status" :value="1" placeholder="全部">
            <Option value="success">成功</Option>
            <Option value="fail">失败</Option>
            <Option value="payment">交易中</Option>
          </Select>
        </FormItem>
         <FormItem label="会员账号">
            <Input placeholder="多个请以,逗号隔开" v-model="searchKey.userName" class="s-140"/>
          </FormItem>
        <!-- 一屏显示 -->
        <div v-if="showMethod == 'large'" class="ib">
          <FormItem label="支付平台" class="ml10">
            <Select clearable v-model="searchKey.paymentId" class="s-86">
              <Option v-for="(item,i) in payList" :key="i" :value="item.id">{{item.payName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="支付方式">
            <Select clearable v-model="searchKey.typeId" class="s-86">
              <Option v-for="(item,i) in payWay" :key="i" :value="item.id">{{item.className}}</Option>
            </Select>
          </FormItem>
          <FormItem label="客户端">
            <Select clearable v-model="searchKey.terminal" placeholder="全部">
              <Option v-for="(t,i) in platformList" :key="i" :value="t.value">{{t.name}}</Option>
            </Select>
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
          <FormItem label="状态">
            <Select clearable class="s-100" v-model="searchKey.status">
              <Option value="success">成功</Option>
              <Option value="fail">失败</Option>
              <Option value="payment">交易中</Option>
            </Select>
          </FormItem>
          <FormItem label="支付平台">
            <Select clearable v-model="searchKey.paymentId" class="s-86">
              <Option v-for="(item,i) in payList" :key="i" :value="item.id">{{item.payName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="支付方式">
            <Select clearable v-model="searchKey.typeId" class="s-86">
              <Option v-for="(item,i) in payWay" :key="i" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="会员账号">
            <Input placeholder="多个请以,逗号隔开" v-model="searchKey.userName" class="s-140"/>
          </FormItem>
          <FormItem>
            <Button type="primary" class="search">查询</Button>
          </FormItem>
        </div>
        <!-- 1707以下掉落3个效果 -->
        <div v-if="showMethod == 'small' && showMore" class="ml75 mt5 ib">
          <FormItem label="状态">
            <Select clearable class="s-100" v-model="searchKey.status">
              <Option>全部</Option>
              <Option value="success">成功</Option>
              <Option value="fail">失败</Option>
              <Option value="pending">交易中</Option>
            </Select>
          </FormItem>
          <FormItem label="支付平台">
            <Select clearable v-model="searchKey.paymentId" class="s-86">
              <Option v-for="(item,i) in payList" :key="i" :value="item.id">{{item.payName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="支付方式">
            <Select clearable v-model="searchKey.typeId" class="s-86">
              <Option v-for="(item,i) in payWay" :key="i" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="会员账号">
            <Input placeholder="多个请以,逗号隔开" v-model="searchKey.userName" class="s-140"/>
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
        :more="table.more"
        :pageSizeOpts="table.pageSizeOpts"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
      ></Tables>
    </div>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Icons from "@/components/icons";
import LevelSelect from "@/components/level-select";
import {
  depositOnlineList,
  getpaymentID,
  depositAuditData
} from "@/api/finance";
import { paymentName } from "@/api/common";
import tableMixins from "@/mixins/table";
import { mapState, mapActions } from "vuex";
import { setTimeout } from "timers";
export default {
  name: "payOnline",
  mixins: [tableMixins],
  components: {
    Tables,
    Icons,
    LevelSelect
  },
  computed: {
    ...mapState({
      autoFresh: state => state.info.payOnlineFresh,
      autoFreshTimer: state => state.info.payOnlineTimerpayOnlineTimer
    })
  },
  data() {
    return {
      dataDetail: {},
      platformList: [
        { value: "pc", name: "PC" },
        { value: "h5", name: "H5" },
        { value: "ios", name: "IOS" },
        { value: "android", name: "Android" }
      ],
      // more数据
      moreData: {},
      showWidth: screen.width,
      showMore: false,
      showMethod: "large",
      searchKey: {},
      Time: [],
      payWay: [],
      payList: [],
      table: {
        pageSizeOpts: [20, 30, 40, 50],
        total: 0,
        columns: [
          {
            title: "订单号",
            key: "code",
            align: "center"
            // width: 180
          },
          {
            title: "等级",
            key: "levelAlias",
            align: "center"
          },
          {
            title: "会员账号",
            key: "username",
            align: "center"
          },
          {
            title: "支付平台",
            key: "paymentName",
            align: "center"
          },
          {
            title: "支付方式",
            key: "type",
            align: "center"
          },
          {
            title: "存款金额",
            key: "amount",
            align: "center"
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            // width: "90",
            render: (h, params) => {
              let color =
                params.row.status === "success"
                  ? "#36A80C"
                  : params.row.status === "fail"
                  ? "#FF2626FF"
                  : "#0338e4";
              return (
                <span style={{ color }}>
                  {params.row.status === "success"
                    ? "成功"
                    : params.row.status === "fail"
                    ? "失败"
                    : "交易中"}
                </span>
              );
            }
          },
          {
            title: "操作",
            align: "center",
            // width: 120,
            render: (h, params) => {
              let props = { size: "small" };
              return h("div", [
                h(
                  "Button",
                  {
                    props: props,
                    style: {
                      color: "#fff",
                      backgroundColor: "#2D8CF0",
                      borderRadius: "6px",
                      cursor: "pointer",
                      display:
                        params.row.status === "payment"
                          ? "inline-block"
                          : "none"
                    },
                    on: {
                      click: () => {
                        this.dataDetail = params.row;
                        this.$Tip.confirm({
                          content: "您确定要继续入款吗",

                          onOk: () => {
                            console.log("确定");
                            const { id, time } = params.row;
                            const data = {
                              id,
                              siteId: this.$root.nowSite.id,
                              timestamp: time,
                              depositType: "0",
                              status: "success",
                              paymentBonus: "0"
                            };
                            depositAuditData(data).then(res => {
                              this.searchSubmit();
                            });
                          }
                        });
                      }
                    }
                  },
                  "强制入款"
                ),
                h(
                  "span",
                  {
                      style: {
                      display:
                        params.row.updateUserName== "-"&& params.row.status!=="payment" ? "inline-block" : "none"

                    }
                  },
                  "-"
                ),
                 h(
                  "span",
                  {
                      style: {
                      display:
                        params.row.updateUserName !== "-" ? "inline-block" : "none"

                    }
                  },
                  "强制入款"
                ),

             
              ]);
            }
          },
          {
            title: "提交时间",
            key: "time",
            align: "center",
            width: 170,
            render: (h, params) => {
              return (
                <span class="pl10 pr10">
                  {this.$root.unixTime(params.row.time)}
                </span>
              );
            }
          },
          {
            title: "审核时间",
            key: "updateTime",
            align: "center",
            render: (h, params) => {
              if (
                params.row.status == "payment" ||
                params.row.status == "fail"
              ) {
                return <span>-</span>;
              }
              if (params.row.status == "success") {
                return (
                  <span class="pl10 pr10">{this.$root.unixTime(params.row.updateTime)}</span>
                );
              }
            }
          },
          {
            title: "审核者",
            key: "updateUserName",
            align: "center"
            // width: 140
          },
          {
            title: "客户端",
            key: "terminal",
            align: "center",
            width: 85
          }
        ],
        data: []
      }
    };
  },
  watch: {
    showWidth() {
      if (this.showWidth >= 2195) {
        this.showMethod = "large";
      } else if (this.showWidth >= 1707) {
        //1920-1  1707-2  1536-3  1280-3
        this.showMethod = "middle";
      } else {
        this.showMethod = "small";
      }
    },
    nowSite: {
      handler(val, oldVal) {
        this.$nextTick(() => {
          const { name } = this.$route;
          name === "payOnline" && this.$refs.LevelSelect.init(val.id);
        });
      },
      deep: true,
      immediate: true
    },
  },
  created() {
    this.getPaymentName();
    this.getPayWay();
    this.autoFreshFun(this.autoFresh);
    // console.log(this.autoFresh)
  },
  beforeDestroy() {
    this.changeFresh({ stage: "payOnline", val: this.autoFresh });
    this.clearPayOnline("payOnline");
  },
  mounted() {},
  methods: {
    ...mapActions(["changeFresh", "clearPayOnline", "setTimer"]),
    changeAuto(val) {
      this.changeFresh({ stage: "payOnline", val }); //改变时间
      this.autoFreshFun(val);
    },
    getPaymentName() {
      const data = {
        siteId: this.$root.nowSite.id
      };
      paymentName(data).then(res => {
        console.log(res.data);
        
        this.payList = res.data;
      });
    },
    //获取支付方式
    getPayWay() {
      const data = {
        classType: "payment"
      };
      console.log();
      
      getpaymentID(data).then(res => {
        this.payWay = res.data;
      });
    },
    getData(data) {
      // if (data.params.isLike) data.params.isLike = Number(data.params.isLike);
      this.$root.startTableLoading(this);
      depositOnlineList(data)
        .then(res => {
          console.log(res.data.data);
          
          if (res.data.data) {
            const { list, total } = res.data.data;
            this.table.total = res.data.total;
            this.table.data = list;
            this.moreData = total;
          } else {
            //数据的值为空
            this.table.data = [];
            this.table.total = 0;
          }
        })
        .catch(err => {
          this.catchError();
        });
    },
    searchSubmit() {
      let params = { ...this.searchKey };
      
      console.log(params);
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
      this.searchKey.startTime = params.startTime;
      this.searchKey.endTime = params.endTime;


      this.$refs.tables.setPage();
          for (let key in params) {
        if (!params[key]) delete params[key];
      }
      
      this.getData({ params });
    },
    levelChange(res) {
      this.searchKey.levelId = res.id;
    },
    autoFreshFun(val) {
      const data = { ...this.searchKey, siteId: this.$root.nowSite.id };
      this.getData({ params: data });
      if (val == "0") {
        this.clearPayOnline("payOnline");
      } else {
        this.clearPayOnline("payOnline");
        this.setTimer({
          stage: "payOnline",
          time: setInterval(() => {
            this.getData({ params: data });
          }, val * 1000)
        });
      }
    },
    catchError() {
      this.clearPayOnline("payOnline");
      this.changeFresh({ stage: "payOnline", val: "0" });
    }
  },
  activated() {
    this.autoFreshFun(this.autoFresh);
  },
  deactivated() {
    this.clearPayOnline("payOnline");
  }
};
</script>
<style lang="less" scoped>
.v2-search .ivu-form-item:first-child {
    margin-left: 15px;
}
.ivu-form-item {
  &:nth-child(6) {
    margin-right: -5px;
  }
}
.ib {
  .pib {
    margin-left: 20px;
  }
}
/deep/.ivu-table-cell-tooltip-content {
  padding: 0 20px 0 20px !important;
}
</style>


