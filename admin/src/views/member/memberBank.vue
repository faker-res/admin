<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="状态">
          <Select clearable v-model="searchKey.status" class="s-86" placeholder="全部">
            <!-- <Option value="all">全部</Option> -->
            <Option value="yes">正常</Option>
            <Option value="no">停用</Option>
          </Select>
        </FormItem>
        <FormItem label="银行卡号">
          <Input v-model="searchKey.cardNum" class="s-140" placeholder="请输入银行卡号"/>
        </FormItem>
        <!-- <FormItem>
          <Checkbox v-model="searchKey.isLike">
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem> -->
        <FormItem label="账号类型">
          <Select v-model="searchKey.typeTag" class="s-140">
            <Option  value="userName">会员账号</Option>
            <Option  value="cardName">姓名</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Input v-model="searchKey.content"
          :disabled="!searchKey.typeTag"
           placeholder="多个请以,逗号隔开" class='s-140'/>
        </FormItem>
        <FormItem>
          <Poptip
            trigger="hover"
            content="多个请以,逗号隔开,仅支持同类型多个输入"
            class="ml14f"
            placement="bottom-end"
          >
            <Icons type="bangzhutishi" color="#E4E4E4" :size="26"/>
          </Poptip>
        </FormItem>
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
        :columns="table.columns"
        :loading="$root.tableLoading"
        :value="table.data"
        :total="table.total"
        :pageSizeOpts="table.pageSizeOpts"
        @on-change-status="onChangeStatus"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        @on-edit="onEdit"
        @on-details="onDetails"
        @on-sort-change="sortChange"
        @on-delete="deleteBank"
      ></Tables>
    </div>
    <!-- 编辑银行卡 -->
    <Modals ref="editCard" title="编辑银行卡" :width="760">
      <div slot="content" class="pt10">
      <Form ref="formKey" :model="formKey" :rules="rules" :label-width="260">
          <FormItem label="会员账号">
            <Input v-model="formKey.userName" class="w260x" disabled/>
          </FormItem>
          <FormItem label="会员姓名">
            <Input v-model="formKey.cardName" class="w260x" disabled/>
          </FormItem>
          <FormItem label="银行名称" prop="bankName">
            <Select class="w260x" v-model="formKey.bankName">
              <Option v-for="(t,i) in bankList" :key="t.name" :value="t.name">{{t.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="银行卡号" prop="cardNum">
            <Input v-model="formKey.cardNum" class="w260x"  :maxlength="30"/>
          </FormItem>
          <FormItem label="银行归属地" prop="cardAddress">
            <Input v-model="formKey.cardAddress" class="w260x"/>
          </FormItem>
          <FormItem label="状态">
            <Select class="w260x" v-model="formKey.status">
              <Option value="yes">正常</Option>
              <Option value="no">停用</Option>
            </Select>
          </FormItem>
          <FormItem label="设为默认" class="h30">
            <RadioGroup v-model="formKey.default">
              <Radio label="yes">是</Radio>
              <Radio label="no" class="ml10">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem>
            <Button type="primary" class="ivu-btn submit" @click="editSubmit">确认保存</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
    <Modals ref="cardDetail" title="银行卡详情" :width="560">
      <div slot="content">
        <Form ref="cardDetail" :label-width="240">
          <FormItem label="会员ID：">
            <p class="w260x ti20">{{cardDetail.uid}}</p>
          </FormItem>
          <FormItem label="会员账号：">
            <p class="w260x ti20">{{cardDetail.userName}}</p>
          </FormItem>
          <FormItem label="会员姓名：">
            <p class="w260x ti20">{{cardDetail.cardName}}</p>
          </FormItem>
          <FormItem label="银行名称：">
            <p class="w260x ti20">{{cardDetail.bankName}}</p>
          </FormItem>
          <FormItem label="银行卡号：">
            <p class="w260x ti20">{{cardDetail.cardNum}}</p>
          </FormItem>
          <FormItem label="银行归属地：">
            <p class="w260x ti20">{{cardDetail.cardAddress}}</p>
          </FormItem>
          <FormItem label="默认银行：">
            <p class="w260x ti20">{{cardDetail.default === 'yes' ? '是' : '否'}}</p>
          </FormItem>
          <FormItem label="银行卡状态：">
            <p class="w260x ti20">{{cardDetail.status === 'yes' ? '启用' : '停用'}}</p>
          </FormItem>
          <FormItem label="创建时间：">
            <p class="w260x ti20">{{$root.unixTime(cardDetail.created_at)}}</p>
          </FormItem>
          <FormItem label="更新时间：">
            <p class="w260x ti20">{{$root.unixTime(cardDetail.updated_at)}}</p>
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
import tableMixins from "@/mixins/table";
import { getUserType } from '@/libs/util';
import {
  getbanklist,
  getbankdetail,
  changbankstatus,
  deletebank,
  getbankcode,
  bankCardUpdate,
  bankCardModifyStatus
} from "@/api/member";
export default {
  name: "memberBank",
  mixins: [tableMixins],
  components: { Tables, Icons, Modals },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      Time: [],
      searchKey: {
         status: "all",
         typeTag:"userName"
      },
      index: "",
      formKey: {
        id: "",
        userName: "",
        cardName: "",
        bankName: "",
        cardNum: "",
        cardAddress: "",
        status: "",
        default: ""
      },
      cardDetail: {},
      rules: {
        bankName: [
          {
            required: true,
            message: "请选择银行名称",
            trigger: "change",
            pattern: /.+/
          }
        ],
        cardNum: [
          {
            required: true,
            message: "请输入银行卡号",
            trigger: "blur"
          },
          {
            //校验默认*号值
            required: true,
            pattern: /(^(\d{16,30})$)|\*+/,
            message: "请输入16~30位纯数字的银行卡卡号",
            trigger: "blur",
          }
        ],
        cardAddress: [
          {
            required: true,
            message: "请输入银行归属地",
            trigger: "blur"
          }
        ]
      },
      bankList: [
        { value: "gongshang", name: "工商银行" },
        { value: "longye", name: "农业银行" },
        { value: "jianshe", name: "建设银行" },
        { value: "zhaoshang", name: "招商银行" },
        { value: "zhongguo", name: "中国银行" },
        { value: "pufa", name: "浦发银行" },
        { value: "zhongxin", name: "中信银行" },
        { value: "jiaotong", name: "交通银行" },
        { value: "minshen", name: "民生银行" },
        { value: "xingye", name: "兴业银行" },
        { value: "youzhen", name: "邮政银行" },
        { value: "guangda", name: "光大银行" },
        { value: "huaxia", name: "华夏银行" },
        { value: "zheshang", name: "浙商银行" },
        { value: "baoshang", name: "包商银行" },
        { value: "beijing", name: "北京银行" },
        { value: "shanghai", name: "上海银行" },
        { value: "hrb", name: "哈尔滨银行" },
        { value: "jiangsu", name: "江苏银行" },
        { value: "zhongguo", name: "其它" }
      ],
      table: {
        loading: true,
        pageSizeOpts: [20, 30, 40, 50],
        total: 100,
        columns: [
          {
            title: "会员账号",
            key: "userName",
            align: "center"
          },
          {
            title: "姓名",
            key: "cardName",
            align: "center"
          },
          {
            title: "银行名称",
            key: "bankName",
            align: "center"
          },
          {
            title: "卡号",
            key: "cardNum",
            align: "center",
            render: (h, params) => {
              const { handleClick, cardNum } = params.row;
              return (
                <span
                  class="blue-font cs"
                  onClick={e => {
                    this.changBankCode(params);
                  }}
                >
                  {handleClick ? "加载中..." : this.formateCardNum(cardNum)}
                </span>
              );
            }
          },
          {
            title: "归属地",
            key: "cardAddress",
            align: "center"
          },
          {
            title: "默认银行",
            key: "default",
            align: "center",
            render: (h, params) => {
              return <span>{params.row.default === "no" ? "否" : "是"}</span>;
            }
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              let color = params.row.status == "yes" ? "#515a6e" : "#FF2626";
              return (
                <span style={{ color: color }}>
                  {params.row.status === "yes" ? "正常" : "停用"}
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
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('bankCardUpdate') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.onEdit(params)}}
                  >编辑</a>
                  <a class="ib mr10"
                    onClick={() => {this.onChangeStatus(params)}}
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('bankCardModifyStatus') != -1) ? 'inline-block' : "none"
                    }}
                  >{params.row.status == 'yes' ? '停用' : '启用'}</a>
                  <a class="ib mr10"
                    onClick={() => { this.deleteBank(params)}}
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('bankCardDelete') != -1) ? 'inline-block' : 'none'
                    }}
                  >删除</a>
                </div>
              )
            } 
            // options: ["edit", "status", "delete"]
          }
        ],
        data: []
      }
    };
  },
  methods: {
    getData(data) {
      this.$root.startTableLoading();
      if (data.params.isLike) data.params.isLike = Number(data.params.isLike);
      if(data.params.status=="all") delete data.params.status
      getbanklist(data).then(res => {
        const { data, total } = res.data;
        this.table.data = data;
        this.table.total = total;
      });
    },
    //提交查询
    searchSubmit() {
      let params = { ...this.searchKey };
      params.siteId = this.nowSite.id;
      params.cardNum = params.cardNum.replace(/\s/g,"");
      if (!params.userName) delete params.isLike;
      for (let key in params) {
        if (!params[key]) delete params[key];
      }
      if(!params.typeTag) delete params.userName
      if(!params.status) params.status = 'all'
      this.getData({ params });
    },
    //改变银行卡号码
    changBankCode(params) {
      this.$set(params.row, "handleClick", true);
      const data = {
        siteId: this.nowSite.id,
        id: params.row.id
      };
      getbankcode(data).then(res => {
        params.row.cardNum = res.data.cardNum;
        this.$set(params.row, "handleClick", false);
      });
    },
    //删除银行卡
    deleteBank(params) {
      let text = "您确定删除" + params.row.bankName + "吗?";
      let msg = "删除"+params.row.bankName+"成功";
      const data = {
        siteId: this.nowSite.id,
        id: params.row.id
      };
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          deletebank(data).then(res => {
            if(res.code == 200 ) {
              if (typeof res.data === 'string') {
                this.$Tip.hide()
                this.$Message.config({
                  top: 150
                })
                this.$Message.success({ content: msg })
              }
            }
            this.table.data.splice(params.index, 1);
          });
        }
      });
    },
    //改变银行卡的状态
    onChangeStatus(params) {
      let text, msg;
      let { status, id , bankName} = params.row;
      if (status === "yes") {
        text = "您确定停用"+bankName+"吗？";
        msg = "停用"+bankName+"成功";
      }
      if (status === "no") {
        text = "您确定启用"+bankName+"吗？";
        msg = "启用"+bankName+"成功";
      }
      const data = {
        siteId: this.nowSite.id,
        id,
        status: params.row.status == 'yes' ? 'no' : 'yes'
      };
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          bankCardModifyStatus(data).then(res => {
            if(res.code == 200 ) {
              if (typeof res.data === 'string') {
                this.$Tip.hide()
                this.$Message.config({
                  top: 150
                })
                this.$Message.success({ content: msg })
              }
            }
            params.row.status = status == 'yes' ? 'no' : 'yes'
          });
        }
      });
    },
    //编辑银行卡
    onEdit(params) {
      for (let key in this.formKey) {
        this.formKey[key] = params.row[key];
      }
      this.index = params.index;
      this.$refs.editCard.show();
    },
    editSubmit() {
      let params = { ...this.formKey };
      params.siteId = this.nowSite.id;
      if (params.cardNum.includes("*")) delete params.cardNum;
      else params.cardNum = params.cardNum.replace(/\s+/g, "");
      this.$refs.formKey.validate(valid => {
        if (valid) {
          this.$refs.editCard.spinShow();
          bankCardUpdate(params)
            .then(res => {
              for (let key in params) {
                this.table.data[this.index][key] = params[key];
              }
             
              this.$refs.editCard.spinHide();
              this.$refs.editCard.hide();
              if (typeof res.data === 'string') {
                this.$Tip.hide()
                this.$Message.config({
                  top: 150
                })
                this.$Message.success({ content: "修改银行卡成功" })
              }
             
            })
            .catch(() => {
              this.$refs.editCard.spinHide();
            });
        }
      });
    },
    onDetails(params) {
      const data = {
        siteId: this.nowSite.id,
        id: params.row.id
      };
      getbankdetail(data).then(res => {
        this.cardDetail = res.data;
        this.$refs.cardDetail.show();
      });
    },
    //格式化银行卡号传入字符串
    formateCardNum (str) {
      if (str) {
        if (str.indexOf('*') === -1) {
          let cardNum = ''
          let index = -1
          for (let val of str) {
            index++
            cardNum += val
            if (index !== 0 && index % 3 === 0) {
              cardNum += ' '
              index = -1
            }
          }
          return cardNum
        } else {
          return str
        }
      } else {
        return str
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
.ivu-form-item {
  &:nth-child(2) {
    margin-right: -5px;
  }
  &:nth-child(6) {
    margin-top: 1px !important;
  }
}

/deep/.ivu-form-item-content {
  line-height: height 30px !important;
}

// 修改了设为默认一行
/deep/.ivu-form-item {
  .ivu-form-item-label {
    height: 30px;
  }

  .ivu-form-item-content {
    .ivu-radio-group {
      vertical-align: 0;
      height: 30px;
    }
  }
}
.ivu-form-item-label {
  padding: 0 12px 0 12px;
}

.ivu-form-item-content {
  line-height: 0;
}
</style>
