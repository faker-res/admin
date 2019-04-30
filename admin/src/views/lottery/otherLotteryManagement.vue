<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <Button class="w120x cardNutton" @click="showModal('addLottery')"
          v-if="(adminType == 'super') || (authInPage.indexOf('lotteryAddNumFast') != -1)"
        >添加开奖</Button>
        <FormItem label="彩票名称">
          <LotterySelect
            ref="lotterySelect"
            :mode="'快速彩'"
            :clearable="false"
            class="s-140"
            @on-lottery-change="OnLotteryChange"
            @on-name-change="onNameChange"
          ></LotterySelect>
        </FormItem>
        <FormItem label="期数">
          <Input clearable v-model="searchKey.issue" placeholder="请输入期数" class="s-140"/>
        </FormItem>
        <FormItem label="状态">
          <Select v-model="searchKey.status" class="s-140">
            <Option value="0">全部</Option>
            <Option value="1">已结算</Option>
            <Option value="2">未结算</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button
            class="search"
            type="primary"
            @click="searchSubmit('search')"
            :loading="$root.searchBtnLoading"
          >查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        ref="tables"
        editable
        :columns="table.columns"
        :loading="$root.tableLoading"
        :value="table.data"
        :total="table.total"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        :pageSizeOpts="table.pageSizeOpts"
      ></Tables>
    </div>
    <!-- 开奖回滚 -->
    <Modals ref="lotteryBack" title="开奖回滚" width="800">
      <div slot="content" class="ft14 ml0">
        <div class="mb20 ml20 mt20">彩票名称: {{lotteryName}}</div>
        <Form
          ref="lotteryBackInfo"
          :model="lotteryBackInfo"
          :rules="lotteryBackInfoValidate"
          :label-width="110"
          inline
        >
          <div class="ml105f">
            <FormItem>
              <span class="pl15 pr15">{{lotteryBackInfo.issue}}期</span>
              <span class="pr15">撤回类型</span>
              <Select style="width:140px;" v-model="lotteryBackInfo.type">
                <Option value="1">撤回未中奖注单</Option>
                <Option value="2">撤回所有注单</Option>
              </Select>
            </FormItem>
            <FormItem label="开奖号码" prop="lotteryNum">
              <Input
                class="w240x"
                placeholder="如：1,2,3,4,5,6,7(以英文逗号隔开)"
                v-model="lotteryBackInfo.lotteryNum"
              />
            </FormItem>
          </div>
          <Button
            type="primary"
            class="btw260 ft20 mb20"
            style="margin-left:250px"
            @click="searchSubmit('back')"
          >确认回滚</Button>
        </Form>
      </div>
    </Modals>
    <!-- 添加开奖 -->
    <Modals ref="addLottery" title="添加开奖" width="560">
      <div slot="content">
        <Form
          ref="addLotteryInfo"
          :model="addLotteryInfo"
          :rules="addLotteryInfoValidate"
          style="width:560px;"
          :label-width="160"
        >
          <FormItem label="期数" class="mt20" prop="issue">
            <Input v-model="addLotteryInfo.issue" placeholder="如2019001" class="w240x"/>
          </FormItem>
          <FormItem label="封盘时间" prop="openingTime">
            <DatePicker
              transfer
              style="width:240px;"
              v-model="addLotteryInfo.openingTime"
              type="datetime"
              placeholder="请选择封盘时间"
            ></DatePicker>
          </FormItem>
          <FormItem label="开奖号码" prop="number">
            <Input
              v-model="addLotteryInfo.number"
              class="w240x"
              placeholder="如：1,2,3,4,5,6,7(以英文逗号隔开)"
            />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              class="w240x"
              @click="searchSubmit('add')"
              :loading="$root.editBtnLoaing"
            >确认添加</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
    <!-- 修改开奖号码 -->
    <Modals ref="editLotteryNum" title="修改开奖号码" width="680">
      <div slot="content" class="v2-form-wrapper">
        <div class="lotteryMan">
          <Form style="width:680px;">
            <FormItem>
              <div class="ml80">
                <span>彩票名称：{{lotteryName}}</span>
                <span></span>
              </div>
            </FormItem>
            <div class="ml80 ft14">
              <p class="mb15">{{editInfo.issue}}期</p>
              <FormItem class="periods">
                <div class="clearfix ml20">
                  <p v-for="(t,i) in editInfo.number" :key="i" class="fl">
                    <Input class="ib" v-model="editInfo.number[i]"/>
                    <span class="p10 yc">-</span>
                  </p>
                </div>
              </FormItem>
            </div>
            <FormItem>
              <Button
                type="primary"
                class="w240x ml220"
                @click="searchSubmit('edit')"
                :loading="$root.editBtnLoading"
              >确认保存</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Modals from "@/components/modals";
import LotterySelect from "@/components/lottery-select";
import { getUserType } from '@/libs/util';
import {
  lotteryOpenNumberListFast,
  lotteryNameList,
  lotteryPayMoney,
  lotteryAddNumFast,
  lotteryUpNumFast,
  lotteryAgainPrizeFast
} from "@/api/lottery";
export default {
  name: "otherLotteryManagement",
  components: {
    Tables,
    Modals,
    LotterySelect
  },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      currentIndex: 0,
      lotteryName: "快速赛车PK10",
      selectLotteryList: [], //下拉框所有彩种数据
      searchKey: { lid: 12, issue: "", status: "0" },
      //添加新的开奖信息
      addLotteryInfo: {
        issue: "",
        openingTime: "",
        number: ""
      },
      //修改信息
      editInfo: {},
      addLotteryInfoValidate: {
        issue: [
          {
            required: true,
            message: "请输入期数",
            trigger: "blur"
          }
        ],
        openingTime: [
          {
            required: true,
            message: "请选择封盘时间",
            trigger: "blur",
            pattern: /.+/
          }
        ],
        number: [
          {
            required: true,
            message: "请输入开奖号码",
            trigger: "blur"
          }
        ]
      },
      //回滚信息
      lotteryBackInfo: {},
      lotteryBackInfoValidate: {
        lotteryNum: [
          {
            required: true,
            message: "请输入开奖号码",
            trigger: "blur"
          }
        ]
      },
      table: {
        total: 0,
        title: "开奖管理",
        pageSizeOpts: [20, 30, 40, 50],
        data: [],
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
            width: 320,
            render: (h, params) => {
              let bgColor;
              return params.row.resultInfo.split(",").map(item => {
                let c1 = parseInt(Math.random() * 256);
                let c2 = parseInt(Math.random() * 256);
                let c3 = parseInt(Math.random() * 256);
                bgColor = `rgba(${c1},${c2},${c3},.9)`;
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
            }
          },
          {
            title: "开奖时间",
            key: "openingTime",
            align: "center",
            render: (h, params) => (
              <span>{this.$root.unixTime(params.row.openingTime)}</span>
            )
          },
          {
            title: "添加时间",
            key: "addTime",
            align: "center",
            render: (h, params) => (
              <span>{this.$root.unixTime(params.row.addTime)}</span>
            )
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => (
              <span>{params.row.status === "no" ? "未结算" : "已结算"}</span>
            )
          },
          {
            title: "操作",
            align: "center",
            render: (j, params) => {
              return h("div", [
                h(
                  "a",
                  {
                    style: {
                      display: (params.row.status == 'no') && ((this.adminType == 'super') || (this.authInPage.indexOf('lotteryUpNumFast') != -1)) ? 'inline-block' : 'none',
                      paddingRight: "15px"
                    },
                    on: {
                      click: () => {
                        const { issue, resultInfo } = params.row;
                        this.$refs.editLotteryNum.show();
                        this.editInfo = {
                          issue,
                          lid: this.searchKey.lid,
                          number: resultInfo.split(",")
                        };
                        this.currentIndex = params.index;
                      }
                    }
                  },
                  "修改"
                ),
                h(
                  "a",
                  {
                    style: {
                      display: (params.row.status == 'yes') && ((this.adminType == 'super') || (this.authInPage.indexOf('lotteryAgainPrizeFast') != -1)) ? 'inline-block' : "none",
                      paddingRight: "15px"
                    },
                    on: {
                      click: () => {
                        const { issue, resultInfo } = params.row;
                        this.lotteryBackInfo = {
                          type: "1",
                          issue
                        };
                        this.$refs.lotteryBackInfo.resetFields();
                        this.$refs.lotteryBack.show();
                      }
                    }
                  },
                  "回滚"
                ),
                h(
                  "a",
                  {
                    style: {
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('lotteryPayMoney') != -1) ? 'inline-block' : 'none'
                    },
                    on: {
                      click: () => {
                        let data = {
                          issue: params.row.issue,
                          lid: this.searchKey.lid,
                          siteId: this.$root.nowSite.id
                        };
                        lotteryPayMoney(data).then(res => {
                          this.getData({params: this.searchKey})
                        });
                      }
                    }
                  },
                  "结算"
                )
              ]);
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.lotterySelect.init();
      this.searchKey.siteId = this.$root.nowSite.id;
      this.getData({ params: this.searchKey });
    });
  },
  methods: {
    // 重置表单
    resetForm() {
      for(let key in this.addLotteryInfo){
        delete this.addLotteryInfo[key]
      }
    },
    getData(data) {
      this.$root.startTableLoading(this);
      lotteryOpenNumberListFast(data).then(res => {
        const { data, total } = res.data;
        this.table.total = total;
        this.table.data = data;
        this.table.loading = false;
      });
    },
    onPageChange(page) {
      this.getData({ params: this.searchKey, query: { page } });
    },
    onPageSizeChange(pageSize) {
      this.searchKey.limit = pageSize;
      this.getData({ params: this.searchKey });
    },
    // 点击出现弹窗
    showModal(name) {
      this.$refs.addLotteryInfo.resetFields();
      this.resetForm()
      this.$refs[name].show();
    },
    OnLotteryChange(res) {
      this.searchKey.lid = res;
    },
    onNameChange(list) {
      this.selectLotteryList = list;
    },
    // 表单提交  search查询  add添加开奖  edit修改  back回滚
    searchSubmit(modalName) {
      switch (modalName) {
        case "search":
          // 显示修改，回滚时的彩票名字
          this.selectLotteryList.forEach(item => {
            item.id == this.searchKey.lid ? (this.lotteryName = item.name) : "";
          });
          this.$refs.tables.setPage()
          this.getData({ params: this.searchKey });
          break;
        case "add":
          this.$refs.addLotteryInfo.validate(valid => {
            if (valid) {
              this.$refs.addLottery.spinShow();
              const { siteId, lid } = this.searchKey;
              let data = { ...this.addLotteryInfo, lid, siteId };
              data.openingTime = this.$root.formatTimeS(data.openingTime);
              lotteryAddNumFast(data)
                .then(res => {
                  if (res.code == 200) {
                    this.$refs.addLottery.spinHide();
                    this.getData({ params: this.searchKey });
                    this.$refs.addLottery.hide();
                    this.addLotteryInfo = {};
                  }
                })
                .catch(error => {
                  this.$refs.addLottery.spinHide();
                });
            }
          });
          break;
        case "edit":
          let { number, issue } = this.editInfo;
          const { lid, siteId } = this.searchKey;
          let postData = {
            issue: String(issue),
            number: number.join(","),
            lid,
            siteId
          };
          this.$refs.editLotteryNum.spinShow();
          lotteryUpNumFast(postData)
            .then(res => {
              if (res.code == 200) {
                this.$refs.editLotteryNum.spinHide();
                this.$refs.editLotteryNum.hide();
                this.table.data[this.currentIndex].resultInfo = postData.number;
              }
            })
            .catch(error => {
              this.$refs.editLotteryNum.spinHide();
            });
          break;
        case "back":
          this.$refs.lotteryBackInfo.validate(valid => {
            const { type, issue, lotteryNum } = this.lotteryBackInfo;
            if (valid) {
              this.$refs.lotteryBack.spinShow();
              let postData = {
                lid: this.searchKey.lid,
                type,
                issue: String(issue),
                result: lotteryNum,
                siteId: this.searchKey.siteId
              };
              lotteryAgainPrizeFast(postData)
                .then(res => {
                  this.$refs.lotteryBack.spinHide();
                  if (res.code == 200) {
                    this.$refs.lotteryBack.hide();
                    this.getData({ params: this.searchKey });
                  }
                })
                .catch(error => {
                  this.$refs.lotteryBack.spinHide();
                });
            }
          });
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
@import "../../styles/lottery.less";
.jz {
  padding-left: 110px !important;
}
.yc:nth-child(7) {
  display: none !important;
}
.ivu-modal {
  width: 560px;
}
.ib {
  width: 40px;
  height: 36px;
}
.ivu-form-item-content {
  p:nth-last-child(1) {
    span:nth-last-child(1) {
      display: none !important;
    }
  }
}
.w240x {
  width: 240px;
  height: 50px;
  font-size: 20px;
}
/deep/.ivu-form-item-error-tip {
  left: 230px;
  top: 2px;
  width: 100px;
}
/deep/.ivu-table-header {
  th {
    &:nth-child(1) {
      .ivu-checkbox {
        display: none;
      }
    }
  }
}
//modal提示小图标距左边的距离
/deep/.ivu-modal-content {
  .content {
    .txt {
      .font {
        margin-left: 0 !important;
      }
    }
  }
}
</style>

