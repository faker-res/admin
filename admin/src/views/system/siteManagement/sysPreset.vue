<template>
  <div>
    <div class="mb20">
      <Button
        type="primary"
        class="w160x"
        @click="addLevel"
        v-if="(adminType == 'super') || ((currentBtn == 'level') && (authInPage.indexOf('systemMemberLevelAdd') != -1) || ((currentBtn != 'level') && (authInPage.indexOf('systemMemberRefundLevelAdd') != -1)))"
      >{{currentBtn == 'level' ? '添加会员等级' : '添加返水等级'}}</Button>
    </div>
    <div class="v2-search bb mb20">
      <ButtonGroup class="repay-button">
        <Button
          @click="() => {currentBtn = 'level'}"
          :class="currentBtn == 'level' ? 'active' : ''"
        >会员等级配置</Button>
        <Button
          @click="() => {currentBtn = 'refund'}"
          :class="currentBtn == 'refund' ? 'active' : ''"
        >返水等级配置</Button>
      </ButtonGroup>
    </div>
    <div class="v2-table">
      <Tables
        v-show="currentBtn == 'level'"
        :loading="$root.tableLoading"
        :total="table.total"
        :value="table.data"
        :columns="table.columns"
        @on-edit="onEdit"
        @on-change-status="onStatusChange"
        @on-page-size-change="onPageSizeChange"
        @on-page-change="onPageChange"
        :pageSizeOpts="table.pageSizeOpts"
      ></Tables>
      <Tables
        v-show="currentBtn != 'level'"
        :loading="$root.tableLoading"
        :total="refundTable.total"
        :value="refundTable.data"
        :columns="refundTable.columns"
        @on-edit="onEdit"
        @on-change-status="onStatusChange"
        :pageSizeOpts="refundTable.pageSizeOpts"
        @on-page-size-change="onPageSizeChange"
        @on-page-change="onPageChange"
      ></Tables>
    </div>
    <!-- 添加/修改会员等级 -->
    <Modals
      ref="siteLevelModal"
      :title="siteLevelModalTitle==='create'?'添加会员等级':'编辑会员等级'"
      :width="760"
    >
      <div slot="content" class="modal-overflow v2-form-wrapper pt10">
        <Form
          ref="memberLevelForm"
          :model="memberLevelForm"
          :rules="memberLevelRule"
          :label-width="260"
          style="width:700px;"
        >
          <FormItem label="选择等级" prop="levelLabel" required>
            <Select v-model="memberLevelForm.levelLabel" class="w260x" @on-change="getLevelName">
              <Option v-for="(item,index) in memberLevelList" :key="index" :value="item.levelLabel">{{item.levelName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="等级别称" prop="levelAlias">
            <Input v-model="memberLevelForm.levelAlias" placeholder="请输入等级别称" class="w260x"/>
          </FormItem>
          <FormItem label="最小存款" prop="minPay">
            <Input v-model="memberLevelForm.minPay" placeholder="请输入最小存款" class="w260x"/>
          </FormItem>
          <FormItem label="晋级打码倍数" prop="betAmount">
            <Input v-model="memberLevelForm.betAmount" placeholder="请输入晋级打码倍数" class="w260x"/>
          </FormItem>
          <FormItem label="最大单笔" prop="maxDeposit">
            <Input v-model="memberLevelForm.maxDeposit" placeholder="请输最大单笔" class="w260x"/>
          </FormItem>
          <FormItem label="取款打码倍数" prop="multiple">
            <Input v-model="memberLevelForm.multiple" placeholder="整数" class="w260x"/>
          </FormItem>
          <FormItem label="彩金奖励" prop="giftBonus">
            <Input v-model="memberLevelForm.giftBonus" placeholder="请输入彩金奖励" class="w260x"/>
          </FormItem>
          <FormItem label="等级状态" prop="status" class="ivu-form-item no-before">
            <Select v-model="memberLevelForm.status" placeholder="请选择" class="w260x">
              <Option value="yes">启用</Option>
              <Option value="no">停用</Option>
            </Select>
          </FormItem>
          <FormItem class="clearfix h20">
            <div class="fl">
              <Icon
                type="md-checkmark-circle"
                size="16"
                v-if="memberLevelForm.default === 'no'"
                color="#E4E4E4"
                @click="setDefault('yes')"
                class="pr5"
              />
              <Icon
                type="md-checkmark-circle"
                size="16"
                v-else
                color="#57a3f3"
                @click="setDefault('no')"
                style="margin-top:2px"
                class="pr5"
              />
            </div>
            <span class="fl ib cs" @click="setDefault('span')">设为默认？</span>
          </FormItem>
          <FormItem>
            <Button
              class="submit"
              type="primary"
              @click="submit"
            >{{siteLevelModalTitle==='create'?'确认添加':'确认修改'}}</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
    <!-- 等级分配 -->
    <Modals ref="levelDispatchModal" :title="dispatchTitle" :width="1060">
      <div slot="content" class="pt10">
        <Form
          ref="levelDispatchForm"
          :model="levelDispatchForm"
          style="width:1060px;"
          :rules="levelDispatchRules"
          :label-width="360"
        >
          <FormItem label="最小存款" prop="minPay">
            <Input v-model="levelDispatchForm.minPay" class="w370x"/>
          </FormItem>
          <FormItem label="打码倍数" prop="damabeishu">
            <Input v-model="levelDispatchForm.damabeishu" class="w370x"/>
          </FormItem>
          <FormItem label="最大单笔" prop="maxSingle">
            <Input v-model="levelDispatchForm.maxSingle" class="w370x"/>
          </FormItem>
          <FormItem label="支付方式" prop="paymentMethods">
            <!-- <paymentRadio
              :methodsList="methodsList"
              :defaultChecked="defaultChecked"
              style="width:370px;"
            ></paymentRadio>-->
          </FormItem>
          <FormItem>
            <Button class="w260x bg white-font ml20 white-font" @click="dispatchLevelSubmit">提交保存</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>
<script>
import {
  systemMemberLevelList,
  systemMemberRefundLevelList,
  systemMemberLevelAdd,
  systemMemberLevelUp
} from "@/api/system";
import { mapState } from 'vuex';
import Modals from "_c/modals";
import Icons from "_c/icons";
import Tables from "_c/tables";
import LevelSelect from "_c/level-select";
import paymentRadio from "@/views/finance/components/payment-radio-group";
import Sortable from "sortablejs";
import { getUserType } from '@/libs/util';
import { changMemberStatus, refundLevelModifyStatus } from "@/api/member";
export default {
  name: "sysPreset",
  components: {
    Tables,
    Icons,
    Modals,
    LevelSelect
  },
  computed: {
    ...mapState({
      memberLevelList: state => state.info.memberLevelList
    })
  },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      limit: 10,
      refundLimit: 10,
      dispatchTitle: "", //等级分配的标题
      levelDispatchForm: {}, //等级分配的数据
      memberLevelForm: {
        levelName: "",
        minPay: "0",
        status: "yes",
        default: "no",
        levelLabel: "",
        levelAlias: "",
        betAmount: '',
        minPay: "",
        maxDeposit: "",
        multiple: '',
        giftBonus: "",
        depositNumber: "0" //存款次数
      },
      currentBtn: "level",
      levelDispatchRules: {
        minPay: [
          {
            required: true,
            message: "请输入最小存款",
            trigger: "blur"
          },
          {
            message: '最小存款必须是个整数',
            trigger: 'blur',
            pattern: /^[1-9]\d*$/
          }
        ],
        damabeishu: [
          {
            required: true,
            message: "请输入打码倍数",
            trigger: "blur"
          }
        ],
        maxSingle: [
          {
            required: true,
            message: "请输入最大单笔",
            trigger: "blur"
          }
        ],
        paymentMethods: [
          {
            required: true,
            message: "请选择支付方式",
            trigger: "blur"
          }
        ]
      },
      memberLevelRule: {
        levelAlias: [
          {
            required: true,
            message: "请输入会员别称",
            trigger: "blur",
            pattern: /.+/
          }
        ],
        maxDeposit: [
          {
            required: true,
            message: "请输入正确的最大单笔",
            trigger: "blur"
          }
        ],
        minPay: [
          {
            required: true,
            message: "请输入正确的最小存款",
            trigger: "blur",
            pattern: /.+/
          },
          {
            message: '最小存款必须是个整数',
            trigger: 'blur',
            pattern: /^[1-9]\d*$/
          }
        ],
        multiple: [
          {
            required: true,
            message: "请输入正确的取款打码倍数",
            trigger: "blur",
            pattern: /.+/
          },
           {
            message: '取款打码倍数必须是个整数',
            trigger: 'blur',
            pattern: /^[1-9]\d*$/
            //整数和0
            // pattern: /^[+]{0,1}(\d+)$/,
          }
        ],
        betAmount: [
          {
            required: true,
            message: "请输入正确的晋级打码倍数",
            trigger: "blur",
            pattern: /.+/
          },
          {
            message: "晋级打码倍数必须为整数",
            trigger: "blur",
            // pattern: /^[0-9]*[1-9][0-9]*$/
            pattern: /^[+]{0,1}(\d+)$/,
          }
        ],
        // giftBonus: [
        //   {
        //     required: true,
        //     message: "请输入正确的彩金奖励",
        //     trigger: "blur",
        //     pattern: /.+/
        //   }
        // ],
        status: [
          {
            required: true,
            message: "请选择等级状态",
            trigger: "change"
          }
        ]
      },
      // 编辑会员等级的标题
      siteLevelModalTitle: "",
      // 会员等级数据
      table: {
        loading: true,
        total: 0,
        pageSizeOpts: [10,20,30],
        data: [],
        columns: [
          {
            title: "排序",
            align: "center",
            width: 60,
            render: (h, params) => {
              return h(Icons, {
                props: {
                  type: "paixukongjian",
                  color: "#dadada",
                  size: 20
                }
              });
            }
          },
          {
            title: "等级",
            key: "levelName",
            align: "center"
          },
          {
            title: "等级别称",
            key: "levelAlias",
            align: "center"
          },
          {
            title: "最小存款",
            key: "minPay",
            align: "center"
          },
          {
            title: "晋级打码倍数",
            key: "betAmount",
            align: "center"
          },
          {
            title: "最大单笔",
            key: "maxDeposit",
            align: "center"
          },
          {
            title: "取款打码倍数",
            key: "multiple",
            align: "center"
          },
          {
            title: "彩金奖励",
            key: "giftBonus",
            align: "center"
          },
          {
            title: "创建时间",
            key: "created_at",
            align: "center",
            width: 170,
            render: (h, params) => (
              <span class="pl10 pr10">{this.$root.unixTime(params.row.created_at)}</span>
            )
          },
          {
            title: "默认等级",
            key: "default",
            align: "center",
            render: (h, params) => {
              let color = params.row.default == "yes" ? "#ec923e" : "";
              return (
                <span style={{ color }}>
                  {params.row.default == "yes" ? "是" : "否"}
                </span>
              );
            }
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              let color = params.row.status == "yes" ? "" : "#F84040";
              return (
                <span style={{color}}>
                  {params.row.status == "yes" ? "正常" : "停用"}
                </span>
              );
            }
          },
          {
            title: "操作",
            align: "center",
            width: 220,
            render: (h,params) => {
              return (
                <div>
                  <a class="ib mr10"
                    style={{ 
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('memberLevelModifyStatus') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.onStatusChange(params)}}
                  >{params.row.status == 'yes' ? '停用' : '启用'}</a>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('systemMemberLevelUp') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.onEdit(params)}}
                  >编辑</a>
                </div>
              )
            }
          }
        ]
      },
      //返水配置数据
      refundTable: {
        total: 0,
        loading: true,
        pageSizeOpts: [10, 20, 30],
        data: [],
        columns: [
          {
            title: "返水等级",
            key: "levelName",
            align: "center"
          },
          {
            title: "返水等级别称",
            key: "levelAlias",
            align: "center"
          },
          {
            title: "最低下注",
            key: "lessBetAmount",
            align: "center"
          },
          {
            title: "最大返水",
            key: "maxBonusAmonut",
            align: "center"
          },
          {
            title: "创建日期",
            key: "created_at",
            align: "center",
            render: (h, params) => (
              <span class="pr10 pl10">{this.$root.unixTime(params.row.created_at)}</span>
            )
          },
          {
            title: "默认返水等级",
            key: "default",
            align: "center",
            render: (h, params) => (
              <span>{params.row.default == "yes" ? "是" : "否"}</span>
            )
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              let color = params.row.status == "yes" ? "" : "#FF2626";
              return (
                <span style={{ color }}>
                  {params.row.status == "yes" ? "正常" : "停用"}
                </span>
              );
            }
          },
          {
            title: "操作",
            align: "center",
            render: (h,params) => {
              return (
                <div>
                  <a class="ib mr10"
                    onClick={() => {this.onStatusChange(params)}}
                  >{params.row.status == 'yes' ? '停用' : '启用'}</a>
                  <a class="ib mr10"
                    onClick={() => {this.onEdit(params)}}
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('systemMemberRefundLevelUp') != -1)
                    }}
                  >编辑</a>
                </div>
              )
            }
          }
        ]
      }
    };
  },
  mounted() {
    let data = { limit: this.limit };
    this.getLevelData({ params: data });
    this.rowDrop();
    //从返水编辑回来默认显示返水
    if(this.$route.params.stage){
      this.currentBtn = 'refund'
    }
  },
  watch: {
    currentBtn(val, oldVal) {
      if (val == "level") {
        let data = { limit: this.limit, siteId: this.$root.nowSite.id };
        this.getLevelData({ params: data });
      } else {
        let data = { limit: this.refundLimit };
        this.getRefundData({ params: data });
      }
    }
  },
  methods: {
    getLevelName(val) {
      this.memberLevelForm.levelName = this.memberLevelList.filter(item => item.levelLabel == val)[0].levelName
    },
    //会员等级数据
    getLevelData(data) {
      this.$root.startTableLoading(this);
      systemMemberLevelList(data).then(res => {
        const { data, total } = res.data;
        this.table.data = data;
        this.table.total = total;
      });
    },
    // 返水等级数据
    getRefundData(data) {
      this.$root.startTableLoading(this);
      systemMemberRefundLevelList(data).then(res => {
        const { data, total } = res.data;
        this.refundTable.data = data;
        this.refundTable.total = total;
      });
    },
    rowDrop() {
      const tbody = document.querySelector(".ivu-table-tbody");
      Sortable.create(tbody, {});
    },
    levelChange(res) {
      this.memberLevelForm.levelLabel = res.levelLabel;
      this.memberLevelForm.levelName = res.levelName;
    },
    //添加等级
    addLevel() {
      //添加会员等级
      if (this.currentBtn == "level") {
        this.siteLevelModalTitle = "create";
        this.$refs.memberLevelForm.resetFields();
        this.$refs.memberLevelForm.status = 'yes'
        this.$refs.siteLevelModal.show();
      } else {
        //添加会员返水等级
        this.$router.push({
          name: "sysPreRefundEdit",
          params: { page: "create" }
        });
      }
    },
    // 弹窗的提交
    submit() {
      this.$refs.memberLevelForm.validate(valid => {
        if (valid) {
          // 添加等级
          this.$refs.siteLevelModal.spinShow();
          if (this.siteLevelModalTitle == "create") {
            systemMemberLevelAdd(this.memberLevelForm)
              .then(res => {
                this.$refs.siteLevelModal.spinHide();
                if(res.code == 200){
                  this.$refs.siteLevelModal.hide()
                  let data = { params: { limit: this.limit, siteId: this.$root.nowSite.id }}
                  this.getLevelData(data)
                }
              })
              .catch(error => {
                this.$refs.siteLevelModal.spinHide();
              });
          } else {
            systemMemberLevelUp(this.memberLevelForm)
              .then(res => {
                  this.$refs.siteLevelModal.spinHide();
                  if(res.code == 200){
                    this.$refs.siteLevelModal.hide()
                    let data = { params: { limit: this.limit, siteId: this.$root.nowSite.id }}
                    this.getLevelData(data)
                  }
              })
              .catch(error => {
                this.$refs.siteLevelModal.spinHide();
              });
          }
        }
      });
    },
    onEdit(params) {
      this.$refs.memberLevelForm.resetFields();
      if (this.currentBtn == "level") {
        this.siteLevelModalTitle = "edit";
        const { levelLabel, levelName, id, levelAlias } = params.row
        this.memberLevelForm = { ...params.row };
        this.memberLevelForm.levelLabel = String(levelLabel);
        let { minPay, giftBonus } = this.memberLevelForm;
        this.memberLevelForm.minPay = Number(minPay);
        this.memberLevelForm.giftBonus = Number(giftBonus);
        this.$refs.siteLevelModal.show();
        this.$refs.siteLevelModal.spinShow();
        setTimeout(() => {
          this.$refs.siteLevelModal.spinHide();
        }, 500);
      } else {
        this.$router.push({
          name: "sysPreRefundEdit",
          params: { page: "edit" },
          query: { id: params.row.id, limit: this.refundTable.total }
        });
      }
    },
    // 改变状态
    onStatusChange(params) {
      let { id, status, levelAlias } = params.row;
      let data = {
        siteId: 0,
        id,
        statusKey: "status",
        statusVal: status == "yes" ? 0 : 1
      };
      let content =
        status == "yes"
          ? `您确定要停用${levelAlias}吗？`
          : `您确定要启用${levelAlias}吗？`;
      let msg = status == "yes" ? "停用状态成功" : "启用状态成功";
      this.$Tip.confirm({
        content,
        onOk: () => {
          if (this.currentBtn == "level") {
            changMemberStatus(data).then(res => {
              if(res.code == 200) params.row.status  = status == 'yes' ? 'no' : 'yes'
            });
          } else {
            refundLevelModifyStatus(data).then(res => {
              if(res.code == 200) params.row.status = status == 'yes' ? 'no' : 'yes'
            });
          }
        }
      });
    },
    onPageSizeChange(pageSize) {
      if (this.currentBtn == "level") {
        this.limit = pageSize;
        let data = { params: { limit: pageSize, siteId: this.$root.nowSite.id } };
        this.getLevelData(data);
      } else {
        this.refundLimit = pageSize;
        let data = { params: { limit: pageSize } };
        this.getRefundData(data);
      }
    },
    onPageChange(page) {
      let data = { params: { limit: this.limit, siteId: this.$root.nowSite.id }, query: { page } };
      if (this.currentBtn == "level") {
        this.getLevelData(data);
      } else {
        data.params.limit = this.refundLimit;
        this.getRefundData(data);
      }
    },
    dispatchLevelSubmit() {},
    //设为默认
    setDefault(stage) {
      if (stage == "span") {
        this.memberLevelForm.default =
          this.memberLevelForm.default == "yes" ? "no" : "yes";
      } else {
        this.memberLevelForm.default = stage;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../styles/button.less";

/deep/.no-before {
  .ivu-form-item-label::before {
    content: ''
  }
}
</style>

