<template>
  <div>
    <div class="v2-search clearfix">
      <div class="fl font-bold ft18">当前彩票：{{$route.query.name}}</div>
      <div class="v2-button fl ml20">
        <Button class="blue-font blue-bd w120x" @click="saveEditPeriods"
          v-if="(adminType == 'super') || (authInPage.indexOf('lotteryLhcTimeAdd') != -1)"
        >添加期数</Button>
      </div>
      
    </div>
    <div class="v2-table">
      <Tables
        editable
        :columns="table.columns"
        :value="table.data"
        :loading="$root.tableLoading"
        :total="table.total"
        @on-page-change="onPageChange"
        :pageSizeOpts="table.pageSizeOpts"
      ></Tables>
    </div>
    <!-- 设置开奖号码 -->
    <Modals ref="setLotteryNum" title="设置开奖号码" width="560">
      <div slot="content" class="v2-form-wrapper">
        <Form style="width:560px;" :label-width="45">
          <FormItem v-if="isShow">
            <p v-for="(item,index) in clickLotteryInfo.number" :key="index" class="fl">
              <Input class="ib" v-model="clickLotteryInfo.number[index]"/>
              <span class="p10 yc">-</span>
            </p>
          </FormItem>
          <FormItem v-else>
            <p v-for="t in 7" :key="t" class="fl">
              <Input class="ib" v-model="clickLotteryInfo.number[t-1]"/>
              <span class="p10 yc">-</span>
            </p>
          </FormItem>
          <FormItem class="ml85">
            <Button type="primary" class="ivu-btn submit w260" @click="setLotteryNum">确认保存</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
    <!-- 编辑、添加期数 issueModal-true为添加-->
    <Modals ref="addPeriods" :title="issueModalShow ? '添加期数' : '编辑期数'" width="560">
      <div slot="content" class="v2-form-wrapper edit">
        <Form
          ref="addPeriodsInfo"
          :model="addPeriodsInfo"
          :rules="addPeriodsInfoValidate"
          style="width:560px;"
          :label-width="150"
        >
          <FormItem label="期数" prop="issue">
            <Input
              v-model="addPeriodsInfo.issue"
              placeholder="请输入期数"
              class="slect260"
              v-if="issueModalShow"
            />
            <Input v-model="addPeriodsInfo.issue" disabled class="slect260" v-else/>
          </FormItem>
          <FormItem label="开盘时间" prop="openTime">
            <DatePicker
              transfer
              type="datetime"
              placeholder="请选择开盘时间"
              class="slect260"
              v-model="addPeriodsInfo.openTime"
            ></DatePicker>
          </FormItem>
          <FormItem label="封盘时间" prop="closeTime">
            <DatePicker
              transfer
              type="datetime"
              placeholder="请选择封盘时间"
              class="slect260"
              v-model="addPeriodsInfo.closeTime"
            ></DatePicker>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              class="slect260"
              @click="saveAddPeriods"
            >{{issueModalShow ? '确认添加' : '保存修改'}}</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Modals from "@/components/modals";
import { getUserType } from '@/libs/util';
import {
  lotteryLhcTimeList,
  lotteryLhcTimeAdd,
  lotteryLhcAddNum,
  lotteryLhcTimeSetUp,
  lotteryLhcTimeDel,
  lotteryLhcTimeUp,
  lotteryPayMoney
} from "@/api/lottery";
export default {
  name: "markTimeSetting",
  components: {
    Tables,
    Modals
  },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      currentIndex: 0,
      page: 1, //当前页码  修改后显示当前页码
      isShow: true, //循环显示
      clickLotteryInfo: {
        //当前点击彩票修改开奖号码的数据
        lid: 1, //彩票大类的id
        number: [],
        issue: ""
      },
      //编辑、添加期数的数据
      issueModalShow: true,
      table: {
        total: 0,
        pageSizeOpts: [20],
        data: [],
        title: "时间设置",
        columns: [
          {
            title: "期数",
            key: "issue",
            align: "center"
          },
          {
            title: "开奖结果",
            key: "resultInfo",
            align: "center",
            render: (h, params) => (
              <span>{this.$root.text(params.row.resultInfo)}</span>
            )
          },
          {
            title: "开盘时间",
            key: "openTime",
            align: "center",
            render: (h, params) => (
              <span>{this.$root.unixTime(params.row.openTime)}</span>
            )
          },
          {
            title: "封盘时间",
            key: "closeTime",
            align: "center",
            render: (h, params) => (
              <span>{this.$root.unixTime(params.row.closeTime)}</span>
            )
          },
          {
            title: "开奖时间",
            key: "updated_at",
            align: "center",
            render: (h, params) => (
              <span>{this.$root.unixTime(params.row.updated_at)}</span>
            )
          },
          {
            title: "创建时间",
            key: "created_at",
            align: "center",
            render: (h, params) => (
              <span>{this.$root.unixTime(params.row.created_at)}</span>
            )
          },
          {
            title: "是否当期",
            key: "is_current",
            align: "center",
            width: 80,
            render: (h, params) => {
              let color = params.row.is_current === "yes" ? "green" : "red";
              return (
                <span style={{ color }}>
                  {params.row.is_current === "yes" ? "是" : "否"}
                </span>
              );
            }
          },
          {
            title: "操作",
            align: "center",
            width: 350,
            render: (h, params) => {
              return (
                <div class="ml10">
                  <span
                    class="mr5 blue-font ib"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('lotteryLhcAddNum') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {
                      let { issue, resultInfo } = params.row;
                      this.clickLotteryInfo = {
                        issue: String(issue),
                        number: resultInfo.split(","),
                        lid: 1
                      };
                      this.isShow = this.clickLotteryInfo.number.length == 1 ? false : true;
                      this.$refs.setLotteryNum.show();
                      this.currentIndex = params.index;
                    }}
                  >
                    设置开奖号码
                  </span>
                  <span
                    class="mr5 blue-font ib"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('lotteryLhcTimeSetUp') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {
                      this.$Tip.confirm({
                        content: "确定设置为当前开奖期吗？",
                        onOk: () => {
                          const { row, index } = params;
                          lotteryLhcTimeSetUp({ id: row.id }).then(res => {
                            if(res.code == 200) {
                              this.table.data.forEach(item => {
                              item.id == params.row.id ? (item.is_current = "yes") : (item.is_current = "false");
                            });
                            }
                          });
                        }
                      });
                    }}
                  >
                    设置为当前开奖期
                  </span>
                  <span
                    class="mr5 blue-font ib"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('lotteryLhcTimeUp') != -1) ? 'inline-block' : "none"
                    }}
                    onClick={() => {
                      let { issue, openTime, closeTime, id } = params.row;
                      this.issueModalShow = false;
                      this.addPeriodsInfo = {
                        issue,
                        openTime: this.$root.unixTime(openTime),
                        closeTime: this.$root.unixTime(closeTime),
                        id
                      };
                      this.$refs.addPeriodsInfo.resetFields();
                      this.$refs.addPeriods.show();
                    }}
                  >
                    修改
                  </span>
                  <span
                    class="mr5 blue-font ib"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('lotteryLhcTimeDel') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {
                      this.$Tip.confirm({
                        content: `您确定删除香港六合彩【${
                          params.row.issue
                        }】期吗？`,
                        onOk: () => {
                          lotteryLhcTimeDel({ id: params.row.id }).then(res => {
                            if(res.code == 200) {
                              this.table.total--;
                            this.table.data.splice(params.row.initRowIndex, 1);
                            if(this.table.data == 0){
                              this.getData({ page: this.page - 1})
                            }
                            }
                          });
                        }
                      });
                    }}
                  >
                    删除
                  </span>
                  <span
                    class="mr5 blue-font ib"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('lotteryPayMoney') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {
                      let data = {
                        issue: params.row.issue,
                        lid: 1,
                        siteId:this.$root.nowSite.id
                      };
                      lotteryPayMoney(data).then(res => {
                        this.$Tip.success({
                          content: res.data,
                          onOk: () => {}
                        });
                      });
                    }}
                  >
                    结算
                  </span>
                </div>
              );
            }
          }
        ]
      },
      addPeriodsInfo: {},
      addPeriodsInfoValidate: {
        issue: [
          {
            required: true,
            message: "请输入期数",
            trigger: "blur",
            pattern: /.+/
          }
        ],
        openTime: [
          {
            required: true,
            message: "请选择开盘时间",
            trigger: "blur",
            pattern: /.+/
          }
        ],
        closeTime: [
          {
            required: true,
            message: "请选择封盘时间",
            trigger: "blur",
            pattern: /.+/
          }
        ]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  methods: {
    getData(data) {
      this.$root.startTableLoading();
      lotteryLhcTimeList(data).then(res => {
        const { data, total } = res.data;
        this.table.data = data;
        this.table.total = total;
        
      });
    },
    onPageChange(page) {
      this.page = page;
      this.getData({ page });
    },
    // 设置开奖号码
    setLotteryNum() {
      let { number, lid, issue } = this.clickLotteryInfo;
      let flag = true
      //  只能填写数字
      let reg = /^([1-9]|[1-4]\d)$/
      number.length == 7 && number.forEach(item => {
        if(item == '' || reg.test(item) == false ) flag=false
      })
      if (number.length < 7|| flag == false) {
        this.$Message.error("请检查填写的开奖号码");
      } else {
        this.$refs.setLotteryNum.spinShow()
        let postData = { ...this.clickLotteryInfo, number: number.join(",") };
        lotteryLhcAddNum(postData).then(res => {
          if(res.code == 200){
            this.$refs.setLotteryNum.spinHide();
          this.$refs.setLotteryNum.hide();
          let temp = this.table.data[this.currentIndex]
          temp.issue == issue ? temp.resultInfo = postData.number : '';
          }
        }).catch(error => {
          this.$refs.setLotteryNum.spinHide();
        })
      }
    },
    //添加期数弹窗
    saveEditPeriods() {
      this.issueModalShow = true;
      this.addPeriodsInfo = {};
      this.$refs.addPeriodsInfo.resetFields(); //重置表单数据和验证
      this.$refs.addPeriods.show();
    },
    // 添加期数的表单提交
    saveAddPeriods() {
      let { openTime, closeTime } = this.addPeriodsInfo;
      //添加
      if (this.issueModalShow) {
        this.$refs.addPeriodsInfo.validate(valid => {
          if (valid) {
            this.$refs.addPeriods.spinShow();
            openTime = this.$root.formatTimeS(openTime);
            closeTime = this.$root.formatTimeS(closeTime);
            lotteryLhcTimeAdd(this.addPeriodsInfo).then(res => {
              if(res.code == 200) {
                this.$refs.addPeriods.spinHide();
              this.$refs.addPeriods.hide();
              this.getData()
              }
            }).catch(error => {
              this.$refs.addPeriods.spinHide();
            })
          }
        });
        // 修改
      } else {
        this.$refs.addPeriodsInfo.validate(valid => {
          if (valid) {
            this.$refs.addPeriods.spinShow();
            openTime = this.$root.formatTimeS(openTime);
            closeTime = this.$root.formatTimeS(closeTime);
            lotteryLhcTimeUp(this.addPeriodsInfo).then(res => {
              if(res.code == 200) {
                this.$refs.addPeriods.spinHide();
              this.$refs.addPeriods.hide();
              this.getData({ page: this.page });
              }
            }).catch(error => {
              this.$refs.addPeriods.spinHide();
            })
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped >
@import "../../styles/button.less";
.ivu-form-item-content {
  p:nth-last-child(1) {
    span:nth-last-child(1) {
      display: none !important;
    }
  }
}
.caipiao {
  width: 160px;
  height: 30px;
  line-height: 30px;
}
.ib {
  width: 40px;
  height: 36px;
}
//点击结算出现的温馨提示
/deep/.ivu-modal-content {
  .content {
    .txt {
      .font {
        margin-left: 0px !important;
      }
    }
  }
}
.w120x {
  width: 120px;
}
/deep/.ivu-form {
  margin-top: 20px;
}
</style>


