<template>
  <div>
    <div class="v2-button mt10">
      <Button @click="addPayment" v-if="(adminType == 'super') || (authInPage.indexOf('paymentClassCreate') != -1)">添加支付方式</Button>
    </div>
    <div class="v2-table">
      <Tables
        :columns="table.columns"
        :loading="$root.tableLoading"
        :value="table.data"
        @on-edit="edit"
        @on-details="detail"
        :page="false"
        @on-change-classStatus="changeStatus"
        @on-delete="deletei"
      ></Tables>
    </div>
    <!-- 详情 -->
    <!-- <Modals ref="detailModal" :title="modalTitle">
      <div slot="content" style="">
        <div class="box">
          <span>
            <p>{{detailData.className}}</p>
            <p>支付方式</p>
          </span>
          <span>
            <p>{{detailData.devices}}</p>
            <p>客户端</p>
          </span>
          <span>
            <p>{{detailData.classStatus == 'yes' ? '正常' : '停用'}}</p>
            <p>状态</p>
          </span>
          <span>
            <p>{{detailData.createUser}}</p>
            <p>创建人</p>
          </span>
          <span>
            <p>{{this.$root.text(detailData.updateUser)}}</p>
            <p>更新人</p>
          </span>
          <span>
            <p>{{this.$root.unixTime(detailData.createTime)}}</p>
            <p>创建时间</p>
          </span>
          <span>
            <p>{{detailData.classRemarks}}</p>
            <p>备注</p>
          </span>
        </div>
      </div>
    </Modals> -->
    <!-- 编辑 -->
    <Modals ref="paymentModal" :title="modalTitle" width="766">
      <div slot="content" class="v2-form-wrapper paymentModal">
        <Form ref="formKey" :model="formKey" :rules="rules" :label-width="80" >
          <FormItem label="支付类型" prop="classType">
            <Select v-model="formKey.classType" placeholder="请选择" class="w275x">
              <Option value="qr_code">扫码支付</Option>
              <Option value="payment">线上支付</Option>
            </Select>
          </FormItem>
          <FormItem label="支付方式" prop="className">
            <Input v-model="formKey.className" placeholder="请输入支付方式" class="w275x"/>
          </FormItem>
          <FormItem label="开放终端" prop="devices" class="clearfix">
            <div  class="fl">
              <Checkbox
                :indeterminate="indeterminate"
                :value="checkAll"
                @click.prevent.native="handleCheckAll"
              >全选</Checkbox>
            </div>
            <CheckboxGroup v-model="formKey.devices" @on-change="checkAllGroupChange">
              <Checkbox label="pc"></Checkbox>
              <Checkbox label="h5"></Checkbox>
              <Checkbox label="android"></Checkbox>
              <Checkbox label="ios"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="状态" prop="classStatus">
            <Select v-model="formKey.classStatus"  placeholder="请选择" class="w275x">
              <Option value="yes">正常</Option>
              <Option value="no">停用</Option>
            </Select>
          </FormItem>
          <FormItem label="备注信息">
            <Input
              v-model="formKey.classRemarks"
              type="textarea"
              placeholder="此栏位仅供管理者记录其他资讯，会员无法检视"
              class="w275x"
              :rows="4"
            />
          </FormItem>
          <FormItem>
            <Button class="w275x" type="primary" @click="submit">{{buttonText}}</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Modals from "@/components/modals";
import Icons from "@/components/icons";
import { getUserType } from '@/libs/util';
import {
  paymentClassList,
  paymentClassModifyStatus,
  paymentClassUpdate,
  paymentClassCreate,
  paymentClassDelete
} from "@/api/finance";
import Sortable from "sortablejs";
export default {
  name: "paymentGroups",
  components: {
    Tables,
    Modals,
    Icons
  },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      indeterminate: true,
      checkAll: true,
      modalTitle: "详情",
      buttonText: "确认添加",
      detailData: {},
      formKey: {},
      rules: {
        classStatus:[
          {
            required: true,
            message: "请选择状态",
            trigger: "change",
            pattern: /.+/
          }
        ],
        className: [
          {
            required: true,
            message: "请输入支付方式",
            trigger: "blur"
          }
        ],
        devices: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "请选择支付终端",
            trigger: "change"
          }
        ]
      },
      table: {
        loading: true,
        columns: [
          {
            title: "排序",
            align: "center",
            render: (h, params) => {
              return h(Icons, {
                props: {
                  type: "paixukongjian",
                  size: 20,
                  color: "#dadada"
                }
              });
            }
          },
          {
            title: "支付方式",
            key: "className",
            align: "center"
          },
          {
            title: "支付类型",
            key: "classType",
            align: "center",
            render: (h, params) => {
              let text =
                params.row.classType == "payment" ? "线上支付" : "扫码支付";
              return <span>{text}</span>;
            }
          },
          {
            title: "开放终端",
            key: "devices",
            align: "center"
          },
          {
            title: "支付备注",
            key: "classRemarks",
            align: "center",
            width: 200,
            tooltip: true
          },
          {
            title: "创建时间",
            key: "createTime",
            align: "center",
            render: (h, params) => (
              <span>{this.$root.unixTime(params.row.createTime)}</span>
            )
          },
          {
            title: "创建人",
            key: "createUser",
            align: "center"
          },
          {
            title: "状态",
            key: "classStatus",
            align: "center",
            width: 80,
            render: (h, params) => {
              let { classStatus } = params.row;
              let color = classStatus == "yes" ? "" : "#FF0000";
              return (
                <span style={{ color }}>
                  {classStatus == "yes" ? "正常" : "停用"}
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
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('paymentClassModifyStatus') != -1) ? 'inline-block' : "none"
                    }}
                    onClick={() => {this.changeStatus(params)}}
                  >{params.row.status == 'yes' ? '停用' : '启用'}</a>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('paymentClassUpdate') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.edit(params)}}
                  >编辑</a>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('paymentClassDelete') != -1) ? 'inline-block' : "none"
                    }}
                    onClick={() => {this.deletei(params)}}
                  >删除</a>
                </div>
              )
            }
          }
        ],
        data: []
      }
    };
  },
  mounted() {
    this.getData({ classType: "payment" });
    this.rowDrop();
  },
  methods: {
    getData(data) {
      this.$root.startTableLoading(this);
      paymentClassList(data).then(res => {
        this.table.data = res.data;
      });
    },
    // 全选
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;
      if (this.checkAll) {
        this.formKey.devices = ["pc", "h5", "android", "ios"];
      } else {
        this.formKey.devices = [];
      }
    },
    checkAllGroupChange(data) {
      if (data.length === 4) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    // 拖拽排序
    rowDrop() {
      const tbody = document.querySelector(".ivu-table-tbody");

      Sortable.create(tbody, {});
    },
    searchSubmit() {},
    // 状态停启用
    changeStatus(params) {
      let { classStatus, className, id } = params.row;
      let text =
        classStatus == "yes" ? `停用${className}成功` : `启用${className}成功`;
      let content =
        classStatus == "yes"
          ? `您确定停用${className}吗？`
          : `您确定启用${className}吗？`;
      let data = {
        id,
        status: classStatus == "yes" ? "no" : "yes"
      };
      this.$Tip.confirm({
        content,
        onOk: () => {
          paymentClassModifyStatus(data).then(res => {
            if(res.code == 200)  params.row.classStatus = data.status;
          });
        }
      });
    },
    // 编辑
    edit(params) {
      this.$refs.formKey.resetFields();
      let {
        id,
        classType,
        className,
        devices,
        classStatus,
        classRemarks
      } = params.row;
      this.formKey = {
        id,
        classType,
        className,
        devices: devices.split(","),
        classStatus,
        classRemarks
      };
      this.modalTitle = "编辑支付方式";
      this.buttonText = "确认保存";
      this.$refs.paymentModal.show();
    },
    // 添加支付方式
    addPayment() {
      this.checkAll=false
      this.indeterminate=false
      this.modalTitle = "添加支付方式";
      this.buttonText = "确认添加";
      this.formKey = {};
      this.formKey.classType = "payment";
      this.$refs.paymentModal.show();
    },
    // 详情
    detail(params) {
      this.detailData = params.row;
      this.$refs.detailModal.show();
    },
    //删除
    deletei(params) {
      let { id, className } = params.row
      let text = "您确定删除" + className + "吗？";
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          paymentClassDelete({ id }).then(res => {
            if(res.code == 200) {
              this.table.data.splice(params.index, 1);
            }
          });
        }
      });
    },
    submit() {
      this.$refs.formKey.validate(valid => {
        if (valid) {
          this.$refs.paymentModal.spinShow();
          switch (this.modalTitle) {
            case "添加支付方式":
              let postData = { ...this.formKey };
              postData.devices = String(postData.devices);
              paymentClassCreate(postData)
                .then(res => {
                  if(res.code == 200) {
                    this.$refs.paymentModal.spinHide();
                  this.$refs.paymentModal.hide();
                  this.getData({ classType: "payment" });
                  }
                })
                .catch(error => {
                  this.$refs.paymentModal.spinHide();
                });
              break;
            case "编辑支付方式":
              let data = { ...this.formKey };
              data.devices = String(data.devices);
              paymentClassUpdate(data)
                .then(res => {
                  if(res.code == 200) {
                    this.$refs.paymentModal.spinHide();
                  this.$refs.paymentModal.hide();
                  this.getData({ classType: "payment" });
                  }
                })
                .catch(error => {
                  this.$refs.paymentModal.spinHide();
                });
              break;
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
.box {
  border: 1px solid #eaeaea;
  > span {
    box-sizing: border-box;
    display: inline-block;
    width: 33.33%;
    height: 100px;
    text-align: center;
    border-right: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
    padding: 25px;
    &:nth-of-type(3n) {
      border-right: 0;
    }
    &:nth-last-of-type(1) {
      width: 100%;
      border-right: 0;
    }
    &:nth-last-of-type(1) {
      border-bottom: 0;
    }
    > p {
      &:nth-child(1) {
        font-size: 18px;
        color: #666666;
      }
      &:nth-child(2) {
        font-size: 14px;
        color: #c3c3c3;
      }
    }
  }
}
/deep/.ivu-form-item-error-tip {
  left: 280px;
  top: 5px;
  width: 110px;
}
/deep/.ivu-table-cell-tooltip-content {
  padding: 0 30px 0 30px !important;
}
.ivu-form-item-content {
  line-height: 0;
}
.v2-button {
  /deep/.ivu-btn {
      padding-left: 10px;
      padding-right: 10px;
      border-color: #2D8CF0;
      font-size: 16px;
      color: #2D8CF0;
      line-height: 20px
  }
}
</style>


