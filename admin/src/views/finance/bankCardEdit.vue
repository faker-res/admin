<template>
  <div class="cardLeft">
    <Form ref="formKey" :model="formKey" :rules="rules" :label-width="110">
      <FormItem label="创建人">
        <Input v-model="username" class="w275x" disabled/>
      </FormItem>
      <FormItem label="入款卡">
        <Select class="w275x" v-model="formKey.inCard" :disabled="$route.params.page==='edit'">
          <Option value="card">银行卡</Option>
          <Option value="code">二维码</Option>
        </Select>
      </FormItem>
      <FormItem label="银行名称" prop="bankName" v-if="formKey.inCard == 'card'">
        <Select v-model="formKey.bankName" class="w275x">
          <Option v-for="(t,i) in bankList" :key="i" :value="t.name">{{t.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="扫码类型" prop="codeType" v-if="formKey.inCard == 'code'">
        <Select v-model="formKey.codeType" class="w275x">
          <Option
            v-for="(item,i) in scanTypeList "
            :key="i"
            :value="item.className+`,`+item.id"
          >{{item.className}}</Option>
        </Select>
      </FormItem>
      <FormItem label="银行卡号" prop="cardNum" v-if="formKey.inCard == 'card'">
        <Input class="w275x" v-model="formKey.cardNum"/>
      </FormItem>
      <FormItem label="持卡人姓名" prop="cardName" v-if="formKey.inCard == 'card'">
        <Input v-model="formKey.cardName" class="w275x"/>
      </FormItem>
      <FormItem label="收款姓名" prop="payName" v-if="formKey.inCard == 'code'">
        <Input v-model="formKey.payName" placeholder="请输入收款姓名" class="w275x"/>
      </FormItem>
      <FormItem label="支付金额" v-if="formKey.inCard == 'code'">
        <FormItem placeholder="单笔下限" class="ib" prop="min_amount">
          <Input v-model="formKey.min_amount" style="width:125px"/>
        </FormItem>

        <FormItem class="ib">
          <span class="pl10 pr10">-</span>
        </FormItem>
         <FormItem placeholder="单笔上限" class="ib" prop="max_amount">
          <Input v-model="formKey.max_amount" style="width:125px"/>
        </FormItem>
      </FormItem>
      <FormItem label="银行归属地" prop="cardAddress" v-if="formKey.inCard == 'card'">
        <Input class="w275x" v-model="formKey.cardAddress"/>
      </FormItem>
      <FormItem label="开放等级" key="level-select" prop="levelLabel">
        <LevelSelect
          ref="LevelSelect"
          mode="多选"
          width="275"
          levelType="member"
          @on-level-change="levelChange"
          all-modal
        />
      </FormItem>
      <FormItem label="开放终端" prop="terminal" class="clearfix">
        <div class="fl">
          <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll"
          >全选</Checkbox>
        </div>
        <CheckboxGroup v-model="formKey.terminal"  prop="terminal" @on-change="checkAllGroupChange" class="fl">
          <Checkbox label="pc"></Checkbox>
          <Checkbox label="h5"></Checkbox>
          <Checkbox label="android"></Checkbox>
          <Checkbox label="ios"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="二维码" v-if="formKey.inCard == 'code'" prop="qr_code">
        <Upload
          v-model="formKey.qr_code"
          :default-file-list="uploadForm.defaultList"
          :headers="uploadForm.headers"
          :action="uploadForm.action"
          :data="uploadForm.data"
          :name="uploadForm.name"
          :on-success="onUploadSuccess"
        >
          <Button icon="ios-cloud-upload-outline">上传图片</Button>
          <div class="w275x mt20" style="heigth:100px;border:1px solid #dfdfde">
            <img style="width:100%" :src="imgSrc">
          </div>
        </Upload>
      </FormItem>
      <FormItem label="当前状态" prop="status">
        <Select class="w275x" v-model="formKey.status">
          <Option value="yes">正常</Option>
          <Option value="no">停用</Option>
        </Select>
      </FormItem>
        <!-- <FormItem label="开放等级" key="level-select" prop="levelLabel">
           <quSelect :selectValueProp="value" :optionArrProp="opt" :widthProp="150"></quSelect>
      </FormItem> -->
      <FormItem>
        <Button type="primary" :loading="$root.editBtnLoading"  class="export" @click="submit">确认保存</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import {
  companyBankCardCreate,
  companyBankCardUpdate,
  QRCodeList,
  paymentClassName,
  QRCodeCreate
} from "@/api/finance";
import { mapState } from "vuex";
import { uploadImg } from "@/api/common";
import { getUserName, getAccessFromLocal } from "@/libs/util";
import LevelSelect from "@/components/level-select";
import quSelect  from  "@/components/quSelect";
import { getToken } from "@/libs/util";
export default {
  // name: "bankCardEdit",
  components: {
    LevelSelect,
    quSelect
  },
  data() {
    return {
      value: [{value:"全选"},{value:"手机号"},{value:"电脑"}],
      opt: {},
      imgSrc: "",
      uploadForm: {
        headers: { Authorization: getToken() },
        action: "/api/v2/uploadImg",
        data: { siteId: "" },
        name: "img",
        defaultList: [],
        path: "",
        src: ""
      },
      levelList: {},
      indeterminate: true,
      checkAll: false,
      scanTypeList: {},
      bankList: [
        { value: "baoshang", name: "包商银行" },
        { value: "gongshang", name: "工商银行" },
        { value: "nongye", name: "农业银行" },
        { value: "jianshe", name: "建设银行" },
        { value: "zhaoshang", name: "招商银行" },
        { value: "pufa", name: "浦发银行" },
        { value: "pingan", name: "平安银行" },
        { value: "jiaotong", name: "交通银行" },
        { value: "guangda", name: "光大银行" },
        { value: "huaxia", name: "华夏银行" },
        { value: "zhongguo", name: "中国银行" },
        { value: "mingsheng", name: "民生银行" },
        { value: "beijing", name: "北京银行" },
        { value: "haerbin", name: "哈尔滨银行" },
        { value: "dongguang", name: "东莞银行" },
        { value: "jiangsu", name: "江苏银行" },
        { value: "shanghai", name: "上海银行" },
        { value: "youzheng", name: "邮政储蓄银行" },
        { value: "nongcun", name: "农村信用社" }
      ],
      terminal: [],
      formKey: {
        username: "",
        siteName: "",
        classId: "",
        className: "",
        inCard: "card",
        qr_code: "",
        amount: {},
        levelLabel: "",
      },
      rules: {
        levelLabel: [
          {
            type: "number",
            required: true,
            message: "请选择会员等级",
            trigger: "change",
            pattern: /.+/
          }
        ],
        bankName: [
          {
            required: true,
            message: "请选择银行名称",
            trigger: "change"
          }
        ],
        cardNum: [
          {
            required: true,
            message: "请输入银行卡号",
            trigger: "blur"
          },
          {
            pattern:/^[0-9]{15,19}$/,
            message: "请输入15-19位的银行卡号",
            trigger: "blur",
            required: true
          }
        ],
        codeType: [
          {
            required: true,
            message: "请选择扫码类型",
            trigger: "change",
            pattern: /.+/
          }
        ],
        cardName: [
          {
            required: true,
            message: "请输入持卡人姓名",
            trigger: "blur"
          },
          {
            pattern: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/,
            message: "请输入中文姓名",
            trigger: "blur"
          }
        ],
        cardAddress: [
          {
            required: true,
            message: "请输入银行归属地",
            trigger: "blur"
          },
          {
            pattern: /[\u4E00-\u9FA5\\s]+/,
            message: "请输入正确的归属地",
            trigger: "blur"
          }
        ],
        levelLabel: [
          {
            required: true,
            message: "请选择开放等级",
            trigger: "blur",
            pattern: /.+/
          }
        ],
        payName: [
          {
            required: true,
            message: "请输入收款姓名",
            trigger: "blur"
          }
        ],
        min_amount: [
          {
            required: true,
            message: "请输入支付下限",
            trigger: "blur"
          }
        ],
        max_amount: [
          {
            required: true,
            message: "请输入支付上限",
            trigger: "blur"
          }
        ],
        qr_code: [
          {
            required: true,
            message: "请上传二维码图片",
            trigger: "change",
            pattern: /.+/
          }
        ],
        status: [
          {
            required: true,
            message: "请选择状态",
            trigger: "change"
          }
        ],
        terminal: [
          {
            required: true,
            message: "请选择开放终端",
            trigger: "change",
            pattern: /.+/
          }
        ]
      }
    };
  },
  computed: {
    // 默认创建人
    username() {
      return getUserName();
    },
    accessSite() {
      return getAccessFromLocal();
    },
    ...mapState({
      token: state => state.user.token
    })
  },
  watch: {
    "$root.nowSite": {
      handler(val, oldVal) {
        this.$nextTick(() => {
          const { name } = this.$route;
          name === "bankCardEdit" && this.$refs.LevelSelect.init(val.id);
          this.uploadForm.data.siteId = val.id;
        });
      },
      deep: true,
      immediate: true
    },
  },
  created() {
    this.$nextTick(() => {
      if (this.$route.name == "bankCardEdit") {
        this.scanType();
      }
      if (Object.keys(this.$route.query).length) {
        //接受点击编辑银行卡的值
        this.formKey = this.$route.query;
        let { levelLabel, levelAlias } = this.formKey;
        this.$refs.LevelSelect.init(this.$root.nowSite.id, {
          levelLabel,
          levelAlias
        });
        this.formKey.inCard = "card";
        this.formKey.terminal = this.formKey.terminal.split(",");
      }
    });
  },
  methods: {
    // 上传图片
    onUploadSuccess(res) {
      const { path, src, host } = res.data;
      this.path = path;
      this.src = src;
      this.host = host;
      this.imgSrc = `${this.host}/${this.src}`;
      this.formKey.qr_code = this.imgSrc;
    },
    //扫码的类型
    scanType() {
      const data={
        classType:"qr_code",
        siteId:this.$root.nowSite.id
      }
      paymentClassName(data).then(res => {
        this.scanTypeList = res.data;
      });
    },
    // 等级
    levelChange(res) {
      this.formKey.levelLabel = res.levelLabel;
    },
    //开放终端全选
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;
      if (this.checkAll) {
        this.formKey.terminal = ["pc", "h5", "android", "ios"];
      } else {
        this.formKey.terminal = [];
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
        // 成功后返回列表页
    goCardList(data) {
      data.classId
      ?this.$router.push({
        name: 'systemInPaymentCard',
        params: {inCard: data.inCard,classId:data.classId,className:data.className}
      })
      :this.$router.push({
        name: 'systemInPaymentCard',
        params: {inCard: data.inCard}
      })
    },
    // 提交
    submit() {
        this.$root.startEditLoading();
      // 添加银行卡
      this.formKey.username = this.username;
      let params = { ...this.formKey };
      this.$refs.formKey.validate(valid => {
        if (valid) {
          if (this.$route.params.page === "create") {
            let params = { ...this.formKey };
            // 入款卡银行卡时添加
            if (params.inCard === "card") {
              const { id, siteName } = this.$root.nowSite;
              let params = { ...this.formKey };
              params.siteId = id;
              params.siteName = siteName;
              let levelLabel = String(params.levelLabel);
              params.levelLabel = levelLabel;
              let terminal = String(params.terminal);
              params.terminal = terminal;
              companyBankCardCreate(params).then(res => {
                if (res.code == 200) return this.goCardList(params.inCard);
              });
            }

            // 入款卡为二维码添加
            if (params.inCard === "code") {       
              const { id, siteName } = this.$root.nowSite;
              let params = { ...this.formKey };
              params.siteId = id;
              params.siteName = siteName;
              let levelLabel = String(params.levelLabel);
              params.levelLabel = levelLabel;
              let terminal = String(params.terminal);
              params.terminal = terminal;
              // 入款卡二维码
              const data = {
                siteId: this.$root.nowSite.id,
                classId: Number(params.codeType.split(",")[1]),
                className: String(params.codeType.split(",")[0]),
                payName: params.payName,
                min_amount: params.min_amount,
                max_amount: params.max_amount,
                levelLabel: params.levelLabel,
                devices: params.terminal,
                qr_code: this.path,
                status: params.status,
                username: this.username,
                siteName: siteName
              };
              let src = this.imgSrc;
              QRCodeCreate(data).then(res => {
                let { className, classId } = data;
                if (res.code == 200) return this.goCardList({inCard:params.inCard,classId:classId,className:className});
              });
            }
          }
          // 编辑银行卡确认保存
          if (this.$route.params.page === "edit") {
            const { id } = this.$root.nowSite;
            let params = { ...this.formKey };
            params.siteId = id;
            let levelLabel = String(params.levelLabel);
            params.levelLabel = levelLabel;
            let terminal = String(params.terminal);
            params.terminal = terminal;
            companyBankCardUpdate(params).then(res => {
              if (res.code == 200) {
                this.$Tip.success({
                  content: "修改入款卡成功"
                })
                 return this.goCardList(params.inCard);
              }
            });
          }
        }
      });
    },
    cancel() {
      this.goCardList();
    }
  },
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
/deep/.ivu-form-item-error-tip {
  left: 290px;
  top: 7px;
}
.cardLeft {
  margin-top: 10px;
  .ivu-form-item {
    &:nth-last-child(1) {
      button {
        width: 275px;
        height: 34px;
      }
    }
  }
}
</style>


