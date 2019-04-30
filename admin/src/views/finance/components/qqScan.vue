<template>
  <div>
    <Tables
      editable
      :columns="table.columns"
      :loading="$root.tableLoading"
      :value="table.data"
      :total="table.total"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-page-change="onPageChange"
      @on-page-size-change="onPageSizeChange"
      @on-change-status="changeStatus"
      :more="table.more"
    ></Tables>
    <Modals ref="editScanInfo" :title="editScan" :width="860">
      <div slot="content" class="v2-form-wrapper">
        <Form ref="addInfo" :label-width="130" :model="cardInfo" :rules="cardInfoRuleValidate">
          <FormItem label="创建人" prop="funder">
            <Input v-model="cardInfo.funder" class="input" disabled/>
          </FormItem>
          <FormItem label="入款卡" prop="depositCard">
            <Input v-model="cardInfo.depositCard" class="input" disabled/>
          </FormItem>
          <FormItem label="扫码类型" prop="scanType">
            <Select v-model="cardInfo.scanType" class="input">
              <Option value="alipy">支付宝扫码</Option>
              <Option value="wechat">微信扫码</Option>
              <Option value="qq">财付通扫码</Option>
            </Select>
          </FormItem>
          <FormItem label="收款姓名" prop="receiptName">
            <Input v-model="cardInfo.receiptName" class="input"/>
          </FormItem>
          <FormItem label="支付金额" prop="limit">
            <Input class="w140 mr15" style="width:140px;" v-model="cardInfo.lowLimit"/>-
            <Input class="w140 ml15" v-model="cardInfo.upLimit"/>
          </FormItem>
          <FormItem label="开放等级">
            <Select v-model="cardInfo.openLevel" multiple class="input">
              <Option v-for="(item,index) in level" :key="index" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="开放终端" prop="terminal" class="clearfix">
            <div class="fl">
              <Checkbox
                :indeterminate="indeterminate"
                :value="checkAll"
                @click.prevent.native="handleCheckAll"
              >全选</Checkbox>
            </div>
            <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange" class="fl">
              <Checkbox label="PC"></Checkbox>
              <Checkbox label="H5"></Checkbox>
              <Checkbox label="Android"></Checkbox>
              <Checkbox label="IOS"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="二维码">
            <Upload action="//jsonplaceholder.typicode.com/posts/">
              <Button class="blue-font">上传图片</Button>
              <p class="ft13 gray-font">图片大小不能超过2MB，仅支持JPG,PNG格式</p>
            </Upload>
          </FormItem>
          <FormItem label="状态">
            <Select class="input">
              <Option value="open">开启</Option>
              <Option value="close">关闭</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button class="ivu-btn save" @click="sumbit">确认保存</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Icons from "@/components/icons";
import { qqScanData } from "@/api/data";
import Sortable from "sortablejs";
import Modals from "@/components/modals";
export default {
  props: ["title",'classId'],
  components: { Tables, Modals, Icons },
  data() {
    return {
      editScan: "编辑二维码",
      indeterminate: true,
      checkAll: false,
      checkAllGroup: [],
      table: {
        total: 100,
        loading: true,
        columns: [
          {
            title: "排序",
            key: "sort",
            align: "center",
            render: (h, params) => <Icons type="paixukongjian" color="#dadada" size="20" />
          },
          {
            title: "扫码类型",
            key: "scanType",
            align: "center"
          },
          {
            title: "收款姓名",
            key: "receiptName",
            align: "center"
          },
          {
            title: "二维码图片",
            key: "scanImg",
            align: "center",
            width: "120"
          },
          {
            title: "单笔下限",
            key: "lowLimit",
            align: "center"
          },
          {
            title: "单笔上限",
            key: "upLimit",
            align: "center"
          },
          {
            title: "开放等级",
            key: "openLevel",
            align: "center",
            width: "230"
          },
          {
            title: "开放终端",
            key: "openTerminal",
            align: "center",
            width: "130"
          },
          {
            title: "创建时间",
            key: "createTime",
            align: "center",
            width: "130"
          },
          {
            title: "创建人",
            key: "founder",
            align: "center"
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              let color = params.row.status ? "#515a6e" : "#FF2626FF";
              return (
                <span style={{ color }}>
                  {params.row.status ? "正常" : "停用"}
                </span>
              );
            }
          },
          {
            title: "操作",
            key: "handle",
            align: "center",
            width: "150",
            options: ["status", "edit", "delete"]
          }
        ]
      },
      level: [
        { value: "zero", label: "未分层" },
        { value: "one", label: "第一层" },
        { value: "two", label: "第二层" },
        { value: "three", label: "第三层" },
        { value: "four", label: "第四层" },
        { value: "five", label: "第五层" },
        { value: "six", label: "第六层" }
      ],
      cardInfo: {
        depositCard: "二维码",
        scanType: "qq",
        receiptName: "aaa",
        lowLimit: "10",
        upLimit: "10000",
        openLevel: ["two", "three", "four", "five", "six"]
      },
      terminal: [
        { value: "all", label: "全部" },
        { value: "PC", label: "PC" },
        { value: "H5", label: "H5" },
        { value: "Android", label: "Android" },
        { value: "IOS", label: "IOS" }
      ],
      cardInfoRuleValidate: {
        funder: [
          {
            required: true,
            message: "请选择会员等级",
            trigger: "blur"
          }
        ],
        depositCard: [
          {
            required: true,
            message: "请输入正确的入款卡",
            trigger: "blur"
          }
        ],
        scanType: [
          {
            required: true,
            message: "请选择扫码类型",
            trigger: "change"
          }
        ],
        receiptName: [
          {
            required: true,
            message: "请输入收款姓名",
            trigger: "blur"
          }
        ],
        limit: [
          {
            required: true,
            message: "请输入支付限额",
            trigger: "blur"
          }
        ],
        openLevel: [
          {
            required: true,
            message: "请选择正确的开放等级",
            trigger: "change"
          }
        ],
        terminal: [
          {
            required: true,
            message: "请选择开放终端",
            trigger: "blur"
          }
        ]
      }
    };
  },

  methods: {
    getData(query) {
      qqScanData().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
    },
    onPageChange(page) {
      let query = { page };
      this.getData(query);
    },
    onPageSizeChange() {},
    changeStatus(params) {
      let text = params.row.status
        ? "您确定停用财付通扫码吗？"
        : "您确定启用该财付通扫码吗？";
      let txt = params.row.status ? "停用财付通扫码成功" : "启用财付通扫码成功";
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          // this.getData();
          this.$Tip.success({
            content: txt,
            onOk: () => {}
          });
        }
      });
    },
    onEdit() {
      this.$refs.editScanInfo.show();
    },
    onDelete(params) {
      this.$Tip.confirm({
        content: "您确定删除财付通扫码吗?",
        onOk: () => {
          this.$Tip.success({
            content: "删除财付通扫码成功",
            onOk: () => {}
          });
        }
      });
    },
    sumbit() {
      this.$refs.editScanInfo.hide();
      this.$Tip.success({
        content: "编辑二维码成功",
        onOk: () => {
        }
      });
    },
    changeType() {
      alert(111);
    },
    rowDrop() {
      const tbody = document.querySelector(".ivu-table-tbody");
      // const _this = this;
      Sortable.create(tbody, {});
    },
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = ["PC", "H5", "Android", "IOS"];
      } else {
        this.checkAllGroup = [];
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
    }
  },
  mounted() {
    this.getData();
    this.rowDrop();
  }
};
</script>
<style lang="less" scoped>
@import "../../../styles/button.less";
@import "../../../styles/class.less";
.input {
  width: 280px;
}

.w140 {
  width: 100px;
}
</style>
