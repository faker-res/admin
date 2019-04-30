<template>
  <div>
    <div class="v2-table">
      <Tables
        editable
        :columns="table.columns"
        :loading="$root.tableLoading"
        :value="table.data"
        :total="table.total"
        :page="false"
        @on-details="onDetails"
        @on-edit="onEdit"
        @on-initialize="onInitialize"
      ></Tables>
      <!-- 编辑配置 -->
      <Modals ref="editSetting" title="编辑配置" width="560">
        <div slot="content" class="v2-form-wrapper">
          <Form ref="editSet" :label-width="150" style="width:560px;">
            <FormItem label="当前风控" prop="当前风控">
              <Select class="w260x" v-model="editSet.level">
                <Option value="rand">随机</Option>
                <Option value="kill">控制</Option>
                <Option value="open">放水</Option>
              </Select>
            </FormItem>
            <FormItem label="平台盈利率">
              <InputNumber :step="0.01" class="w260x" v-model="editSet.rate"/>
            </FormItem>
            <FormItem label="状态变更">
              <Switch v-model="editSet.lock" size="large">
                <span slot="open">锁定</span>
                <span slot="close">未锁定</span>
              </Switch>
            </FormItem>
            <FormItem>
              <Button class="ivu-btn submit w260x gd ft20" @click="submit" type="primary">确认保存</Button>
            </FormItem>
          </Form>
        </div>
      </Modals>
    </div>
  </div>
</template>
<script>
import { fastLottery, fastLotteryInit, fastLotteryUpdate } from "@/api/lottery";
import Tables from "@/components/tables";
import Modals from "@/components/modals";
import Icons from "@/components/icons";
import { getUserType} from '@/libs/util';
export default {
  name: "fastLottery",
  components: {
    Tables,
    Modals,
    Icons
  },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      table: {
        loading: true,
        total: 0,
        title: "快速彩票",
        data: [],
        columns: [
          {
            key: "lotteryName",
            align: "center",
            renderHeader: (h, params) => {
              return h("p", [
                h("span", "彩票名称"),
                h(
                  "Poptip",
                  {
                    props: {
                      trigger: "hover",
                      content: "24h可开奖，达到间隔时间可开奖",
                      placement: "right",
                      style: {
                        marginTop: "-4px"
                      }
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
            }
          },
          {
            title: "开始统计时间",
            key: "lastCountTime",
            align: "center",
            width: "150px",
            render: (h, params) => (
              <span>{this.$root.unixTime(params.row.lastCountTime)}</span>
            )
          },
          {
            title: "有效投注",
            key: "betMoney",
            align: "center"
          },
          {
            title: "会员输赢",
            key: "win",
            align: "center"
          },
          {
            title: "平台杀数",
            key: "rate",
            align: "center"
          },
          {
            title: "风控状态",
            key: "level",
            align: "center",
            render: (h, params) => {
              const { level } = params.row;
              return (
                <span>
                  {level == "rand" ? "随机" : level == "kill" ? "控制" : "放水"}
                </span>
              );
            }
          },
          {
            title: "有效投注（黑名单）",
            key: "blackBetMoney",
            align: "center"
          },
          {
            title: "会员输赢（黑名单）",
            key: "blackWin",
            align: "center"
          },
          {
            title: "开奖间隔",
            key: "openTimeSet",
            align: "center",
            render: (h, params) => {
              const { openTimeSet } = params.row;
              return (
                <span>{`${Math.floor(openTimeSet / 60)}'${
                  openTimeSet % 60 == 0 ? "" : (openTimeSet % 60) + "''"
                }`}</span>
              );
            }
          },
          {
            title: "状态",
            key: "lock",
            align: "center",
            render: (h, params) => {
              const { lock } = params.row;
              return (
                <span style={{ color: lock == "0" ? "#515a6e" : "#FF2626" }}>
                  {lock == "0" ? "未锁" : "锁定"}
                </span>
              );
            }
          },
          {
            title: "操作", 
            align: "center",
            render: (h,params) => {
              return(
                <div>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('fastLotteryDetail') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.onDetails(params)}}
                  >详情</a>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('fastLotteryInit') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.onInitialize(params)}}
                  >初始化</a>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('fastLotteryUpdate') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.onEdit(params)}}
                  >编辑</a>
                </div>
              )
            }
          }
        ]
      },
      editSet: {
        input: 0,
        level: "",
        lock: true
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  methods: {
    // 详情
    onDetails(params) {
      const { lotteryId, lotteryName } = params.row;
      this.$router.push({
        name: "fastLotteryDetails",
        query: { lotteryId, lotteryName }
      });
    },
    //编辑配置
    onEdit(params) {
      const { level, rate, lock, id } = params.row;
      this.editSet = {
        level,
        rate: Number(rate.split("%")[0]),
        lock: Boolean(lock),
        id
      };
      this.$refs.editSetting.show();
    },
    // 初始化
    onInitialize(params) {
      this.$Tip.confirm({
        content: "您确定要初始化吗?",
        onOk: () => {
          fastLotteryInit({ id: params.row.id }).then(res => {
            if(res.code=200)
              if(typeof res.data === 'string'){
                this.$Tip.hide()
                this.$Message.config({
                  top: 150
                })
                this.$Message.success("初始化成功！");
                this.getData()
              }
          });
        }
      });
    },
    getData() {
      this.$root.startTableLoading(this);
      fastLottery().then(res => {
        this.table.data = res.data;
      });
    },
    //  编辑配置确认
    submit() {
      this.$refs.editSetting.spinShow();
      let data = { ...this.editSet };
      let { lock, rate } = this.editSet;
      data.lock = lock == false ? 0 : 1;
      data.rate = rate / 100;
      fastLotteryUpdate(data)
        .then(res => {
          if (res.code == 200) {
            this.getData();
            this.$refs.editSetting.spinHide();
            this.$refs.editSetting.hide();
          }
        })
        .catch(error => {
          this.$refs.editSetting.spinHide();
        });
    }
  }
};
</script>
<style lang="less" scoped>
.w260x {
  width: 260px;
  height: 30px;
}
.gd {
  height: 50px;
}
/deep/.ivu-form-item-error-tip {
  top: 0;
  left: 270px;
}
</style>
