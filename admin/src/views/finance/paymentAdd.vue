<template>
  <div class>
    <Form ref="paymentInfo" :model="paymentInfo" :rules="rules">
      <FormItem label="支付平台" prop="queryName">
        <Select
          class="w360"
          v-model="paymentInfo.queryName"
          placeholder="请选择,可查询"
          filterable
          @on-change="changquery"
        >
          <Option
            v-for="(item,index) in platformList"
            :key="index"
            :value="item.queryName"
          >{{item.payName}}</Option>
        </Select>
      </FormItem>
      
       <FormItem label="商户编号" prop="businessNo">
        <Input class="w360" v-model="paymentInfo.businessNo" placeholder="10位数(支持微信支付)"/>
      </FormItem>

      <FormItem
        :label="item.label"
        style="margin-left:10px"
        v-for="(item,key,index) in paymentInfo.paylist "
        :key="item.index"
      >
        <Input class="w360"  v-model="item[Object.keys(item)[2]]"/>
      </FormItem>

     
      <!--      
     即使输入框 又有上传文件
    <FormItem :label="gongKeyValue" v-if="gongKeyValue" prop="gongyao">
      <Upload action="//jsonplaceholder.typicode.com/posts/" v-model="paymentInfo.gongyao">
        <Button class="gongyao">选择文件</Button>
        <span class="yiyou">公钥2.txt</span>
      </Upload>
    </FormItem>
    <FormItem :label="siKeyValue" v-if="siKeyValue" prop="siyao">
      <Upload action="//jsonplaceholder.typicode.com/posts/" v-model="paymentInfo.siyao" >
        <Button class="gongyao">选择文件</Button>
        <span class="yiyou">key.pem</span>
      </Upload>
    </FormItem>
    <FormItem :label="item.label" prop="payPassword" v-for="(item,index) in payKey" :key='index'>
      <Input class="w360" v-model="paymentInfo.payPassword"/>
      </FormItem>-->

      <!-- 文件上傳
     <FormItem :label="item.label" prop="gongyao" v-for="(item,index) in paylist" :key="">
      <Upload 
          :default-file-list="uploadForm.defaultList"
          :headers="uploadForm.headers"
          :action="uploadForm.action"
          :data="uploadForm.data"
          :name="uploadForm.name"
          :on-success="(res)=>{ onUploadSuccess(res,item.input_name) }"
      >
        <Button class="gongyao">选择文件</Button>
        <span class="yiyou">{{item.label}}.txt</span>
      </Upload>
    </FormItem>
      -->

      <!-- //輸入框 -->

      <FormItem label="支付方式" prop="payMethod">
        <paymentRadio
          class="w360"
          @sendArray="getChecked"
          ref="payment"
          :methodsdetail="paymentAdd"
        ></paymentRadio>
      </FormItem>

      <!-- <FormItem label="银行编码" class="ml10" v-if="showID" >
        <Input
          class="w360"
          v-model="paymentInfo.bankCode"
          value="paymentInfo.bankCode"
          placeholder="请输入银行编码"
        />
      </FormItem> -->
      <FormItem label="支付域名" prop="redirect_domain" >
        <Input class="w360" placeholder="例：123456.com" v-model="paymentInfo.redirect_domain"/>
      </FormItem>
      <!-- <FormItem label="有效时间" class="pl10">
        <InputNumber v-model="effectTime" class="w360" :step="1" :min="0"/>
      </FormItem> -->
      <FormItem label="支付状态" prop="status">
        <Select clearable class="w360" v-model="paymentInfo.status" placeholder="请选择">
          <Option value="yes">启用</Option>
          <Option value="no">停用</Option>
        </Select>
      </FormItem>
      <!-- <FormItem label="备注信息" prop="remarks">
        <Input
          style="width:360px"
          v-model="paymentInfo.remarks"
          type="textarea"
          placeholder="此栏位仅供管理者记录其他资讯，会员无法检视"
          :rows="4"
        />
      </FormItem> -->
      <FormItem>
        <Button class="ivu-btn save" style="margin-left:76px;width:360px;"  :loading="$root.editBtnLoading"   @click="submit">确认添加</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import paymentRadio from "./components/payment-radio-group";
import { getpaymentName, getpaymentID, createpayment } from "@/api/finance";
import { mapState } from "vuex";
import { close } from "fs";
import { uploadImg } from "@/api/common";
import { getUserName } from "@/libs/util";
import { getToken } from "@/libs/util";
import { log } from "util";
import { setTimeout } from "timers";
import { parse } from 'path';
export default {
  name: "addPayment",
  components: {
    paymentRadio
  },
  data() {
    return {
      uploadForm: {
        headers: { Authorization: getToken() },
        action: "/api/v2/uploadImg",
        data: { siteId: "" },
        name: "img",
        defaultList: [],
        path: "",
        src: ""
      },
      la: 1,
      showID: false,
      gongKeyValue: "",
      siKeyValue: "",
      payKey: [],
      paymentAdd: [],
      paylist: "",
      platformList: [],
      newplatdata: "",
      // effectTime: 20,
      paymentInfo: {
        siteId: "",
        siteName: "",
        classId: "",
        payName: "",
        status: "yes",
        businessNo: "",
        redirect_domain: "",
        // remarks: "",
        queryName: "",
        businessKey: {},
        payMethod: "",
        bankCode:"",
      },
      rules: {
        queryName: [
          {
            required: true,
            message: "请选择支付平台",
            trigger: "blur"
          }
        ],
        businessNo: [
          {
            required: true,
            message: "请输入平台编号",
            trigger: "blur"
          },
          {
            // pattern: /^\d{10}$/,
            required: true,
            message: "请输入平台编号",
            trigger: "blur"
          }
        ],
        gongyao: [
          {
            required: true,
            message: "请输入支付公钥",
            trigger: "blur"
          }
        ],
        payMethod: [
          {
            required: true,
            message: "请选择支付方式",
            trigger: "change"
          }
        ],
        redirect_domain: [
          {
            required: true,
            message: "请输入域名",
            trigger: "blur",
            pattern:/^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
          }
        ],
        status: [
          {
            required: true,
            message: "请选择支付状态",
            trigger: "blur"
          }
        ]
      }
    };
  },  
  created() {
    this.getselectlist();
    setTimeout(() => {
      this.$refs.payment.getpayselectlist();
    });
  },
  methods: {
    submit() {
      this.$root.startEditLoading();
      let params = { ...this.paymentInfo, ...this.newplatdata };
      params.siteId = this.$root.nowSite.id;
      params.siteName = this.$root.nowSite.siteName;
      let classIds = [];
      if (params.newarray && params.newarray.length > 0) {
        params.newarray.map(item => {
          classIds.push(item.id);
        });
      }
      if (classIds.length > 1) params.classId = classIds.join(",");
      else params.classId = classIds[0];
      delete params.newarray;
      params.formatAmount = JSON.stringify(params.formatAmount);
      params.limitAmount = JSON.stringify(params.limitAmount);
      let mess=false;
      let limitmess=false;
      if (params.formatAmount == "{}") {
        delete params.formatAmount;
      }else{
        let format;
         if(params.formatAmount ==undefined) return
          format=Object.values(JSON.parse(params.formatAmount))
         format.forEach(item=>{
             if(item.formatAmount=="" ||Number(item.maxAmount)<0 ||Number(item.minAmount)<0 ){
                this.$Tip.info({ content: "请输入固定金额" });
                 mess=true
                return false
             }
         })
      }
      if (params.limitAmount == "{}") {
        delete params.limitAmount;
      }else{
         let limitdata;
         limitdata=Object.values(JSON.parse(params.limitAmount))
         limitdata.forEach(item=>{
             if(item.maxAmount==null||item.minAmount==null){
                  this.$Tip.info({ content: "请输入单笔金额" });
                  limitmess=true
                   return false
             }
             if(Number(item.maxAmount)<=Number(item.minAmount)||Number(item.maxAmount)<0 || Number(item.minAmount)<0){
                   this.$Tip.info({ content: "单笔上限必须大于单笔下限,而且不能为负数" });
                   limitmess=true
                   return false
             }
         })
      }
      if(mess||limitmess){
            return false      
      }
      if (params.paylist && params.paylist.length > 0) {
        params.paylist.map((item, key, index) => {
          let newkey = Object.keys(item)[2];
          let newval = item[Object.keys(item)[2]];
          params.businessKey[newkey] = newval;
        });
      }
      params.businessKey = JSON.stringify(params.businessKey);
      delete params.paylist;
      this.$refs.paymentInfo.validate(valid => {
        if (valid) {
          delete params.payMethod;
          createpayment(params).then(res => {
            if(res.code==200){
              this.$Tip.success({
              content: "添加支付平台成功",
              onOk: () => {
                this.$router.push({
                  path:"paymentManager",
                  query: {
                    status: params.status,
                    siteId: params.siteId
                  }
                });
              }
            });
            }
          });
        }
      });
    },
    getChecked(data) {
      this.newplatdata = data;
      this.paymentInfo.payMethod = "6666";
      // this.paymentInfo.payMethod = data;
      console.log(this.newplatdata.newarray)
      this.showID=this.newplatdata.newarray.some(item=>item.className=="网银在线")
      // this.showID = this.paymentInfo.payMethod && this.paymentInfo.payMethod.includes('wangyinzaixian') ? true : false;
    },
    getselectlist() {
      getpaymentName({siteId:this.$root.nowSite.id,purpose:"payment_channel"}).then(res => {
        this.platformList = res.data;
      });
    },
    changquery() {
      this.paylist = "";
      this.paylist = this.platformList.filter(
        item => item.queryName == this.paymentInfo.queryName
      )[0].needUseKeyType;

      this.paymentInfo.payName=this.platformList.filter(
        item => item.queryName == this.paymentInfo.queryName
      )[0].payName
      
       this.paymentInfo.bankCode=this.platformList.filter(
        item => item.queryName == this.paymentInfo.queryName
      )[0].bankCode
      
      this.paylist.map(item => {
        if (item.input_name) {
          let key = item.input_name;
          let value = "";
          item[key] = value;
        }
      });
      this.paymentInfo.paylist = this.paylist;
      // this.paymentInfoRulesValidate.
    },
    //上传文件
    onUploadSuccess(res, item) {
      const { path, src } = res.data;
      let key = item;
      let value = path;
      this.paymentInfo[key] = value;
    }
  },
  computed: {
    username() {
      return getUserName();
    },
    ...mapState({
      token: state => state.user.token
    })
  },
  watch: {
    "$root.nowSite": {
      handler(val) {
        this.uploadForm.data.siteId = val.id;
      },
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
.yiyou {
  width: 57px;
  height: 14px;
  font-size: 14px;
  font-weight: 400;
  color: #c7c7c7;
  padding-left: 20px;
}
.gongyao {
  width: 80px;
  height: 36px;
  background: #ffffff;
  border: 1px solid #62b1fd;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 400;
  color: #62b1fd;
  text-align: center;
}
/deep/.ivu-form-item-error-tip {
  left: 440px !important;
  top: 6px;
}
.w360 {
  width: 360px;
}
</style>


