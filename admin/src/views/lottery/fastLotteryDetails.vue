<template>
  <div>
    <div class="ft18 mb10 mr10 fl">
      <span>当前彩票：</span>
      <span class="pl10">{{$route.query.lotteryName}}</span>
    </div>
    <div class="v2-button">
      <Button
        @click="openInit"
        class="w160x"
        v-if="(adminType == 'super') || (authInPage.indexOf('fastLotteryOpenInit') != -1) || (authInPage.indexOf('fastLotteryOpenInitBySite') != -1)"
      >预设期数</Button>
    </div>
    <div class="v2-table">
      <Tables
        editable
        :columns="table.columns"
        :loading="$root.tableLoading"
        :value="table.data"
        :total="table.total"
        :more="table.more"
        :show-sizer="false"
        @on-page-change="onPageChange"
        :pageSizeOpts="table.pageSizeOpts"
      ></Tables>
      <Modals title="修改开奖号码" width="800" ref="editLotteryOpen">
        <div slot="content">
          <Form :label-width="150">
            <FormItem label="彩票名称：">
              <span class="font-bold ft16 pl15">{{$route.query.lotteryName}}</span>
            </FormItem>
            <FormItem label="彩票期数：">
              <Input v-model="issue" class="w160x"/>
              <span class="pl10">期:</span>
            </FormItem>
            <FormItem label="开奖号码：">
              <div class="clearfix periods">
                <p v-for="(t,i) in lotteryInfo" :key="i" class="fl">
                  <Input class="inp" v-model="lotteryInfo[i]" @on-blur="testNum(lotteryInfo[i])"/>
                  <span class="p10 yc">-</span>
                </p>
              </div>
            </FormItem>
            <FormItem>
              <Button class="primary save ml100 mt20 mb20" @click="save">确认保存</Button>
            </FormItem>
          </Form>
        </div>
      </Modals>
      <Modals title="预设期数" width="422" ref="openInit">
        <div slot="content">
          <Form
            ref="openInitInfo"
            style="width:422px;"
            :label-width="130"
            :model="openInitInfo"
            :rules="openInitInfoRules"
          >
            <FormItem label="彩票名称：">
              <span class="ft20 f-color">{{$route.query.lotteryName}}</span>
            </FormItem>
            <FormItem label="预设数量" prop="count" class="fix">
              <Input v-model="openInitInfo.count" class="w160x" placeholder="请输入"/>
            </FormItem>
            <FormItem>
              <Button type="primary" class="w160x mt55" @click="addInit">确认新增</Button>
            </FormItem>
          </Form>
        </div>
      </Modals>
    </div>
  </div>
</template>
<script>
import {
  fastLotteryDetail,
  fastLotteryDetailBySite,
  fastLotteryUpdateOpen,
  fastLotteryUpdateOpenBySite,
  fastLotteryOpenInitBySite,
  fastLotteryOpenInit
} from "@/api/lottery";
import Modals from "_c/modals";
import Tables from "@/components/tables";
import { mapState } from "vuex";
import { testfastLotteryInfo, getUserType } from "@/libs/util";
export default {
  name: "fastLotteryDetails",
  components: { Tables, Modals },
  computed: {
    ...mapState({
      sixLotteryColor: state => state.info.sixLotteryColor
    })
  },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      stage: "", //single为单站  all为全站
      lotteryInfo: [], //修改开奖号码的原始值
      randOpen: "",
      issue: "", //修改期数,
      postData: {}, //传递的数据
      testInfo: {},
      openInitInfo: {
        lotteryId: this.$route.query.lotteryId,
        count: 1
      }, //预设期数的数据
      openInitInfoRules: {
        count: [
          {
            required: true,
            message: "请填写预设数量",
            trigger: "blur",
            pattern: /.+/
          },
          {
            message: "预设数量必须为正整数",
            trigger: "blur",
            pattern: /^[1-9]\d*$/
          }
        ]
      },
      searchKey: {},
      table: {
        pageSizeOpts: [30],
        loading: true,
        total: 0,
        title: "彩票详情",
        data: [],
        columns: [
          {
            title: "期数",
            key: "qishu",
            align: "center"
          },
          {
            title: "开奖结果",
            key: "open",
            align: "center",
            width: 300,
            render: (h, params) => {
              let { open } = params.row;
              let { lotteryId } = this.$route.query;
              let bgColor;
              if (open) {
                return open.split(",").map(item => {
                  if (lotteryId == 1 || lotteryId == 18 || lotteryId == 19) {
                    this.sixLotteryColor.map(color => {
                      if (color.number.includes(item * 1)) {
                        bgColor = color.color;
                      }
                    });
                  } else {
                    let c1 = parseInt(Math.random() * 256);
                    let c2 = parseInt(Math.random() * 256);
                    let c3 = parseInt(Math.random() * 256);
                    bgColor = `rgba(${c1},${c2},${c3},.9)`;
                  }
                  return h(
                    "span",
                    {
                      style: {
                        color: "#fff",
                        cursor: "pointer",
                        width: "20px",
                        height: "20px",
                        marginLeft: "5px",
                        display: "inline-block",
                        backgroundColor: bgColor,
                        textShadow: "1px 1px 1px #000"
                      }
                    },
                    item
                  );
                });
              } else {
                return <span>-</span>;
              }
            }
          },
          {
            title: "注单数量",
            key: "betCount",
            align: "center"
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
            title: "有效投注(黑名单)",
            key: "blackBetMoney",
            align: "center"
          },
          {
            title: "会员输赢(黑名单)",
            key: "blackWin",
            align: "center"
          },
          {
            title: "开奖模式",
            key: " killStatus",
            align: "center",
            render: (h, params) => {
              const { killStatus } = params.row;
              let text =
                killStatus == "rand"
                  ? "随机"
                  : killStatus == "kill"
                  ? "控制"
                  : killStatus == "open"
                  ? "放水"
                  : "人工开奖";
              return <span>{text}</span>;
            }
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              let color, text;
              const { status } = params.row;
              if (status == "init") {
                text = "待开奖";
                color = "#666666";
              } else if (status == "waitWincalc") {
                text = "等待预结算";
                color = "#FF2626";
              } else if (status == "waitOpen") {
                text = "等待开奖";
                color = "#FF9655";
              } else {
                text = "已开奖";
                color = "#73C32E";
              }
              return <span style={{ color }}>{text}</span>;
            }
          },
          {
            title: "开奖时间",
            key: "openTime",
            align: "center",
            render: (h, params) => {
              const { openTime } = params.row;
              return (
                <span>{openTime ? this.$root.unixTime(openTime) : "-"}</span>
              );
            }
          },
          {
            title: "操作",
            align: "center",
            render: (h, params) => {
              return (
                <div>
                  <span style={{ display: params.row.open ? "block" : "none" }}>
                    -
                  </span>
                  <span
                    style={{
                      color: "#62B1FD",
                      display: params.row.open ? "none" : "block",
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      if (this.state == "single") {
                        if (
                          this.adminType == "super" ||
                          this.authInPage.indexOf(
                            "fastLotteryUpdateOpenBySite"
                          ) != -1
                        ) {
                          let { randOpen, id, qishu } = params.row;
                          this.randOpen = randOpen.split("|");
                          this.lotteryInfo = randOpen.split("|")[0].split(",");
                          this.issue = qishu;
                          this.postData.id = id;
                          this.$refs.editLotteryOpen.show();
                        }
                      } else {
                        if (
                          this.adminType == "super" ||
                          this.authInPage.indexOf("fastLotteryUpdateOpen") != -1
                        ) {
                          let { randOpen, id, qishu } = params.row;
                          this.randOpen = randOpen.split("|");
                          this.lotteryInfo = randOpen.split("|")[0].split(",");
                          this.issue = qishu;
                          this.postData.id = id;
                          this.$refs.editLotteryOpen.show();
                        }
                      }
                    }}
                  >
                    修改
                  </span>
                </div>
              );
            }
          }
        ]
      }
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const { siteId, lotteryId } = vm.$route.query;
      if (siteId) {
        vm.searchKey = { siteId, lotteryId };
        vm.stage = "single";
      } else {
        vm.searchKey = { lotteryId };
        vm.stage = "all";
      }
      let data = {
        params: vm.searchKey
      };
      vm.getData(data);
    });
  },
  methods: {
    getData(data) {
      if (this.stage == "single") {
        this.$root.startTableLoading(this);
        fastLotteryDetailBySite(data).then(res => {
          let { data, total } = res.data;
          this.table.data = data;
          this.table.total = total;
        });
      } else {
        this.$root.startTableLoading(this);
        fastLotteryDetail(data).then(res => {
          let { data, total } = res.data;
          this.table.data = data;
          this.table.total = total;
        });
      }
      this.testInfo = {};
      this.testInfo = testfastLotteryInfo(this.openInitInfo.lotteryId);
    },
    //预设期数
    openInit() {
      this.$refs.openInitInfo.resetFields();
      this.$refs.openInit.show();
    },
    // 预设期数 确认新增
    addInit() {
      this.$refs.openInitInfo.validate(valid => {
        if (valid) {
          if (this.openInitInfo.count <= 100) {
            if (this.stage == "single") {
              this.$refs.openInit.spinShow();
              let data = {
                ...this.openInitInfo,
                siteId: this.$root.nowSite.id
              };
              fastLotteryOpenInitBySite(data)
                .then(res => {
                  if (res.code == 200) {
                    this.$refs.openInit.spinHide();
                    this.$Tip.success({ content: "预设期数成功" });
                    this.$refs.openInit.hide();
                    this.getData({ params: this.searchKey });
                  }
                })
                .catch(error => {
                  this.$refs.openInit.spinHide();
                });
            } else {
              this.$refs.openInit.spinShow();
              let data = { ...this.openInitInfo };
              fastLotteryOpenInit(data)
                .then(res => {
                  if (res.code == 200) {
                    this.$refs.openInit.spinHide();
                    this.$Tip.success({ content: "预设期数成功" });
                    this.$refs.openInit.hide();
                    this.getData({ params: this.searchKey });
                  }
                })
                .catch(error => {
                  this.$refs.openInit.spinHide();
                });
            }
          } else {
            this.$Tip.info({ content: "一次预设期数不能超过100期" });
          }
        }
      });
    },
    onPageChange(page) {
      let data = { ...this.searchKey };
      this.getData({ params: data, query: { page } });
    },
    onPageSizeChange(pageSize) {
      this.searchKey.limit = pageSize;
      this.getData({ params: this.searchKey });
    },
    // 修改开奖号码
    save() {
      const { lotteryId, siteId, lotteryName } = this.$route.query;
      let flag = true
      let flag2 = true
      let arr = [];
      let reg = /^[0-9]\d*$/;
      //  如果有空值或者类型不对则验证失败
      for (let item of this.lotteryInfo.values()) {
        item && reg.test(item) ? "" : (flag = false);
      }
      if (flag) {
        //单站
        this.randOpen.forEach(item => {
          item = String(this.lotteryInfo);
          arr.push(item);
        });
        let checkArr = arr[0];
        arr[0].split(",").forEach(item => {
          this.randOpen[0].split(",").forEach(key => {
            if (item.length > key.length) {
              this.$Tip.info({ content: "修改开奖号码不正确" });
              flag2 = false;
            }
          })
        })
       let obj = this.testInfo 
        if (lotteryName.includes('时时彩') || lotteryName.includes('快3')) obj.repeat = true
        if(obj.repeat == false) {
          let arr = [...new Set(this.lotteryInfo)]
          let arr1 = this.lotteryInfo.filter( (i, v) => i < obj.maxNum)
          if(arr1.length !== this.lotteryInfo.length) {
            this.$Tip.info({ content: '最小为0最大为'+( obj.maxNum-1)})
            flag2 = false
          }
          if (arr.length !== this.lotteryInfo.length) {
            this.$Tip.info({ content: "该彩票开奖不能重复" });
            flag2 = false;
          }
        } else if (obj.repeat == true) {
          let arr1 = this.lotteryInfo.filter((i, v) => i < obj.maxNum);
          if (arr1.length !== this.lotteryInfo.length) {
            this.$Tip.info({ content: "最小为0最大为" + (obj.maxNum - 1) });
            flag2 = false;
          }
        }
        if (this.stage == "single" && flag2 == true) {
          this.$refs.editLotteryOpen.spinShow();
          this.postData.randOpen = arr.join("|");
          this.postData.siteId = siteId;
          this.postData.issue = this.issue;
          fastLotteryUpdateOpenBySite(this.postData)
            .then(res => {
              this.$refs.editLotteryOpen.spinHide();
              if (res.code == 200) {
                this.$refs.editLotteryOpen.hide();
                this.getData({ params: this.searchKey });
              }
            })
            .catch(error => {
              this.$refs.editLotteryOpen.spinHide();
            });
        } else if (this.stage != "single" && flag2 == true) {
          this.postData.randOpen = arr.join("|");
          this.postData.issue = this.issue;
          fastLotteryUpdateOpen(this.postData)
            .then(res => {
              this.$refs.editLotteryOpen.spinHide();
              if (res.code == 200) {
                this.$refs.editLotteryOpen.hide();
                this.getData({ params: this.searchKey });
              }
            })
            .catch(error => {
              this.$refs.editLotteryOpen.spinHide();
            });
        }
      } else {
        this.$Message.error("请检查您所填写的开奖号码");
      }
    },
    //验证开奖号码
    testNum(m) {
      let i = m.replace(/\D/g, "");
      let maxNum = this.testInfo.maxNum;
      i < maxNum && i > 0
        ? ""
        : this.$Tip.info({ content: "最小为0最大为" + (maxNum - 1) });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
.inp {
  width: 40px;
  height: 36px;
}
.periods {
  p {
    &:nth-last-child(1) {
      span {
        display: none !important;
      }
    }
  }
}
/deep/.ivu-form-item-error-tip {
  padding-left: 0;
}
/deep/.fix {
  .ivu-form-item-label {
    padding-right: 25px;
  }
}
</style>
