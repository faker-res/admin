<template>
  <div class="ib">
    <Select
      class="className"
      placeholder="请选择"
      multiple
      v-model="checkedArray"
      @on-change="sendCheckedArray"
    >
      <Option v-for="(t,i) in payWay" :key="i" :value="t.id">{{t.className}}</Option>
    </Select>
    <div class="mt20  ">
      <div
          class="clearfix"
         style="width:435px;margin-left:-70px;margin-bottom:10px"
        v-for="(t,i) in methodsList"
        :key="i"
        v-if="checkedArray && checkedArray.includes(t.id)"
      >
        <label style="height:37.8px;margin-left:-7px">{{t.className}}：</label>
        <RadioGroup v-model="modelData[i].limit" @on-change="sendCheckedArray" >
          <Radio label="limit" class="mr5 ">
            <span>限额</span>
          </Radio>
          <Radio label="format">
            <span>固定金额</span>
          </Radio>
        </RadioGroup>
        <div class="fr" v-show="modelData[i].limit == 'limit'">
          <InputNumber
            placeholder="单笔下限"
            :min="1"
            style="width:85px;height:30px"
            v-model="modelData[i].minAmount"
            @on-change="sendCheckedArray"
          />
          <span class="pl5 pr5">-</span>
          <InputNumber
            :min="1"
            placeholder="单笔上限"
             style="width:85px;height:30px"
            v-model="modelData[i].maxAmount"
            @on-change="sendCheckedArray"
          />
        </div>
        <div class="fr" style="margin-rigth:60px;" v-show="modelData[i].limit == 'format'">
          <Input
            type="text"
            placeholder="固定金额"
            style="width:180px;height:30px;"
            v-model="modelData[i].formatAmount"
            @on-blur="sendCheckedArray"
            @on-keyup="modelData[i].formatAmount=modelData[i].formatAmount.replace(/[^\d\,.]/g,'')"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getpaymentID } from "@/api/finance";
import { log } from "util";
export default {
  props: {
    methodsdetail: Array,
    className: String, //样
    defaultChecked: Array //默认选中的支付方式
  },
  data() {
    return {
      modelData: [],
      checkedArray: [],
      checkobject: { formatAmount: {}, limitAmount: {} },
      methodsList: [],
      payWay:[],
      payname: []
    };
  },
  created() {
    // this.getpayselectlist()
    // this.$nextTick(() => {
    //   if(this.defaultChecked){
    //     this.checkedArray.push(this.defaultChecked)
    //   }
    // });
  },
  mounted() {},
  methods: {
    sendCheckedArray(value) {
      let newarray = [];
      console.log(this.checkedArray)
      console.log(this.modelData)
      this.checkedArray.map(item => {
        this.modelData.map(newitem => {
          if (item == newitem.id) {
            newarray.push(newitem);
          }
        });
      });
      console.log(newarray)
      
      const { formatAmount, limitAmount } = this.checkobject;
      Object.keys(formatAmount).forEach(el => {
        delete formatAmount[el];
      });
      Object.keys(limitAmount).forEach(el => {
        delete limitAmount[el];
      });
      newarray.map((item, index) => {
        this.payname.push(item.className);
        if (item.limit == "format") {
          let key = item.id + "";
          formatAmount[key] = {};
          formatAmount[key].name = item.className;
          formatAmount[key].formatAmount = item.formatAmount;
          if(item.formatAmount){
              var Regx = /^[A-Za-z]*$/;
              if(Regx.test(item.formatAmount)){
                  this.$Message.error("请输入正确的固定金额")
                  item.formatAmount=" "
              }else{
                var index=item.formatAmount.split(",").indexOf("")
                if(index!=-1){
                   this.$Message.error("请输入正确的固定金额")
                   item.formatAmount=" "
                }
              }
          }
        }
        if (item.limit == "limit") {
          let key2 = item.id + "";
          limitAmount[key2] = {};
          limitAmount[key2].name = item.className;
          limitAmount[key2].minAmount = item.minAmount;
          limitAmount[key2].maxAmount = item.maxAmount;
          if(item.maxAmount && Number(item.minAmount)>Number(item.maxAmount)){
               this.$Message.error("上限必须大于下限")
          }
        }
      });
      let newkey = "newarray";
      let newvalue = newarray;
      this.checkobject[newkey] = newvalue;

      this.$emit("sendArray", this.checkobject);
    },
    getpayselectlist() {
      const data = {
        classType: "payment"
      };
      getpaymentID(data).then(res => {
        this.payWay = res.data;
        console.log(this.payWay);
        this.methodsList = res.data;
        this.modelData=[]
        this.methodsList.map(item => {
          var data = {};
          data.limit = "limit";
          data.id = item.id;
          data.className = item.className;
          data.minAmount = null;
          data.maxAmount = null;
          data.formatAmount = null;
          this.modelData.push(data);
        });
        if (this.methodsdetail.length > 0) {
          this.methodsdetail.map(item => {
            this.modelData.map(newitem => {
              if (newitem.id == item.id) {
                if (item.type == "formatAmount") {
                  newitem.limit = "format";
                  newitem.formatAmount = item.amount_limit;
                } else {
                  let newlimit = item.amount_limit.split("-");
                  newitem.minAmount = Number(newlimit[0]);
                  newitem.maxAmount = Number(newlimit[1]);
                }
              }
            });
          });
        }
      });
    },
    getdefaultChecked() {
      if (this.defaultChecked.length > 0) {
        this.checkedArray = [];
        this.defaultChecked.map(item => {
          this.checkedArray.push(item);
        });
      }
    }
  },
  watch: {
    defaultChecked: function(val, oldval) {
      this.getdefaultChecked();
    },
    methodsdetail: function(val, oldval) {
      this.getpayselectlist();
    }
  }
};
</script>
<style lang="less" scoped >

/deep/.ivu-input{
height: 30px;
}
.w110x {
  width: 110px;
}

.w245x {
  width: 245px;
}
.mlf70 {
  margin-left: -70px;
}

.h50 {
  height: 50px;
}
.w500 {
  width: 500px;
}
</style>


