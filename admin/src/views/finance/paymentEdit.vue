<template>
  <Form ref="platform" :label-width="80" :model="platform" :rules="rules">
    <FormItem label="支付平台">
      <Button class="pingtai" style="width:360px">{{platform.payName}}</Button>
    </FormItem>
    <FormItem label="商户编号" prop="businessNo">
      <Input v-model="platform.businessNo" class="w360"/>
    </FormItem>

    <!-- <FormItem label="支付公钥">
      <Upload action="//jsonplaceholder.typicode.com/posts/" v-model="platform.gongyao">
        <Button class="gongyao">选择文件</Button>
        <span class="exit">23.txt</span>
        <span class="yiyou">公钥2.txt</span>
      </Upload>
    </FormItem>
    <FormItem label="支付私钥">
      <Upload action="//jsonplaceholder.typicode.com/posts/" v-model="platform.siyao">
        <Button class="gongyao">选择文件</Button>
        <span class="exit">ksmdk.txt</span>
        <span class="yiyou">key.pem</span>
      </Upload>
    </FormItem>
    <FormItem label="支付密钥">
      <Input class="w360" v-model="platform.miyao"/>
    </FormItem>-->

    <!-- 上传文件
     <FormItem :label="item.secret_label" prop="gongyao" v-for="(item,index) in platform.businessKey" :key="">
      <Poptip trigger="hover" :content="item.secret_val" class="fl">
        <Button class="w200x text-overflow-ellipsis">{{item.secret_val}}</Button>
      </Poptip>
      <Upload
          :default-file-list="uploadForm.defaultList"
          :headers="uploadForm.headers"
          :action="uploadForm.action"
          :data="uploadForm.data"
          :name="uploadForm.name"
          :on-success="(res)=>{ onUploadSuccess(res,item.input_name) }"
      >
        <Button class="gongyao fl ml10">选择文件</Button>
        <span class="yiyou">{{item.secret_label}}.txt</span>
      </Upload>
    </FormItem>-->

    <FormItem
      :label="item.secret_label"
       v-for="(item,key,index) in platform.businessKey"
      :key="index"
    >
      <Input class="w360" v-model="item.secret_val"/>
    </FormItem>

    <FormItem label="支付方式" prop="paymentClass">
      <paymentRadio
        class="w360"
        :methodsdetail="platform.paymentClass"
        v-model="platform.paymentClass"
        :defaultChecked="methodsid"
        ref="payment"
        @sendArray="getChecked"
      ></paymentRadio>
    </FormItem>
    <FormItem label="支付域名" prop="redirect_domain">
      <Input v-model="platform.redirect_domain" class="w360"/>
    </FormItem>
    <FormItem label="支付状态" prop="status">
      <Select v-model="platform.status" class="w360">
        <Option value="yes">正常</Option>
        <Option value="no">停用</Option>
      </Select>
    </FormItem>
    <!-- <FormItem label="银行编码" v-show="showID" >
      <Input
        class="w360"
        :rows="4"
        type="textarea"
        placeholder="请输入银行编码"
        v-model="platform.bankCode"
      />
    </FormItem> -->
    <!-- <FormItem label="备注信息">
      <Input
        type="textarea"
        class="w360"
        :rows="4"
        v-model="platform.remarks"
        placeholder="此栏位仅供管理者记录其他资讯，会员无法检视"
      />
    </FormItem>-->
    <FormItem>
      <Button class="ivu-btn h50 w360x blueBg ft20 white-font" @click="submit"  :loading="$root.editBtnLoading">确认保存</Button>
    </FormItem>
  </Form>
</template>
<script>
import paymentRadio from "./components/payment-radio-group";
import { getpaymentDetail, updatepayment,getpaymentName} from "@/api/finance";
import { mapState } from "vuex";
import { uploadImg } from "@/api/common";
import { getUserName } from "@/libs/util";
import { getToken } from "@/libs/util";
export default {
  name: "editPayment",
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
      showID: false,
      bankCode:"",
      payKeylist: [],
      platform: {
        paymentClass:""
      },
      methodsid: [],
      platformList:[],
      rules: {
        // queryName: [
        //   {
        //     required: true,
        //     message: "请选择支付平台",
        //     trigger: "blur"
        //   }
        // ],
        businessNo: [
          {
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
        paymentClass: [
          {
            required: true,
            message: "请选择支付方式",
            trigger: "change",
            pattern: /.+/
          }
        ],
        bankID: [
          {
            required: true,
            message: "请输入银行编码",
            trigger: "blur"
          }
        ],
        redirect_domain: [
          {
            required: true,
            message: "请输入域名",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: "请选择支付状态",
            trigger: "blur"
          }
        ],

        // remarks: [
        //    {
        //     required: true,
        //     message: "请输入备注信息",
        //     trigger: "blur"
        //   }
        // ]
      }
      // platformMethods:[
      //   {value:'zhifubao',name:'支付宝线上'},
      //   {value:'wangyin',name:'网银在线'},
      //   {value:'test1',name:'支付测试1'},
      //   {value:'test2',name:'支付测试2'}
      // ]
    };
  },
  mounted() {
    const { id } = this.$route.query;
    const data = { id, siteId: this.$root.nowSite.id };
    this.paymentdetail(data);
    console.log(data)
    // this.getselectlist();
  },
  methods: {
    submit() {
       this.$root.startEditLoading();
      let params = { ...this.platform, ...this.newplatdata };
      params.siteId = this.$root.nowSite.id;
      //删除后台出入字段
      // params.siteName = this.$root.nowSite.siteName;
      let classIds = [];
      //  let payNames=[];
      if (params.newarray && params.newarray.length > 0) {
        params.newarray.map(item => {
          classIds.push(item.id);
          //  payNames.push(item.className)
        });
      }
      if (classIds.length > 1) params.classId = classIds.join(",");
      else params.classId = classIds[0];

      //  if(payNames.length>1) params.payName=payNames.join(',');
      //  else params.payName=payNames[0]

      delete params.newarray;
      params.formatAmount = JSON.stringify(params.formatAmount);
      params.limitAmount = JSON.stringify(params.limitAmount);
      let mess=false;
      let limitmess=false;
      if (params.formatAmount == "{}") {
        delete params.formatAmount;
      }else{
         let format;
         format=Object.values(JSON.parse(params.formatAmount))
         format.forEach(item=>{
             if(item.formatAmount==null){
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
             if(Number(item.maxAmount)<=Number(item.minAmount)){
                   this.$Tip.info({ content: "单笔上限必须大于单笔下限" });
                   limitmess=true
                   return false
             }
         })
      }
      if(mess||limitmess){
            console.log(5666)
            return false
      }
      let newbusinessKey = {};
      if (params.businessKey && params.businessKey.length > 0) {
        params.businessKey.map((item, key, index) => {
          let newkey = item.secret_key;
          let newval = item.secret_val;
          newbusinessKey[newkey] = newval;
        });
      }
      delete params.businessKey;
      params["businessKey"] = newbusinessKey;
      params.businessKey = JSON.stringify(params.businessKey);
      delete params.paymentClass;
      this.$refs.platform.validate(valid => {
        if (valid) {
          params.remarks = "暂无备注";
          updatepayment(params).then(res => {
            if (res.code == 200) {
              this.$Tip.success({
                content: "修改支付平台成功",
                onOk: () => {
                  this.$router.push({path:"paymentManager",query: {status: params.status}});
                }
              });
            }
          });
        }
      });
    },
    paymentdetail(params) {
      console.log(params)
      getpaymentDetail(params).then(res => {
        this.platform = res.data;
        this.methodsid =this.platform.paymentClass.map(i=>{
           return i.id
         })
        this.showID=this.platform.paymentClass.some(item=>item.name=="网银在线")
      });
    },
    onUploadSuccess(res, item) {
      const { path, src } = res.data;
      let key = item;
      let value = path;
      this.paymentInfo[key] = value;
    },
    getChecked(data) {
      this.newplatdata = data;
      //发送后台字段payMethod删除
      // this.platform.payMethod = "6666";
      if(this.newplatdata.newarray.length==0){
          this.showID=false
      } 
      this.showID=this.newplatdata.newarray.some(item=>item.className=="网银在线")
      console.log(this.platform)
      console.log(this.platformList)
      if(this.platformList.length>1){
          this.platform.bankCode=this.platformList.filter(
           item => item.payName == this.platform.payName
        )

        console.log(this.platform.bankCode)
      }
    },
     getselectlist() {
      getpaymentName({siteId:this.$root.nowSite.id,purpose:"payment_channel"}).then(res => {
        this.platformList = res.data;
      });
    },
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
    },
    "platform.businessKey": {
      handler(val) {
      },
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
@import "../../styles/class.less";
// .ivu-form-item-error-tip{

// }
.w360 {
  width: 360px;
}
.pingtai {
  width: 80px;
  height: 36px;
  background: #f5f5f5;
  border-radius: 5px;
}
.gongyao {
  width: 80px;
  height: 36px;
  border: 1px solid #62b1fd;
  border-radius: 5px;
  font-size: 14px;
  color: #62b1fd;
  text-align: center;
}
.yiyou {
  width: 57px;
  height: 14px;
  font-size: 14px;
  font-weight: 400;
  color: #c3c3c3;
  padding-left: 20px;
}
.guding {
  width: 250px;
  height: 36px;
  border-radius: 5px;
}
.limit {
  width: 80px;
  height: 36px;
  border-radius: 5px;
}
.exit {
  width: 37px;
  height: 12px;
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  padding-left: 20px;
}
</style>


