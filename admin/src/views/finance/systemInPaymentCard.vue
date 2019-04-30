<template>
  <div>
    <div class="v2-search" >
      <Form ref="searchKey" inline>
         <Button class="cardNutton" @click="addBankCard"
          v-if="(adminType == 'super') ||  (authInPage.indexOf('companyBankCardCreate') != -1)"
         >添加入款卡</Button>
        <FormItem label="等级" class="ml20">
          <LevelSelect
            placeholder="全部"
            ref="LevelSelect"
            clearable
            width="86"
            :levelType="'member'"
            @on-level-change="levelChange"
          />
        </FormItem>
        <FormItem label="状态" class="ml20">
          <Select clearable class="s-86" v-model="searchKey.status">
            <Option value="yes">正常</Option>
            <Option value="no">停用</Option>
          </Select>
        </FormItem>
        <FormItem class="ml20">
          <Button type="primary" class="search" @click="searchSubmit">查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class=" v2-search ">
      <ButtonGroup class="status-button mb20 button">
      <Button   :class="type == item.className ? 'active' : ''" v-for="(item,i) in classNameList" :value="item.id"  :key="i" @click="changeType(item.className,item.id)">
        <span class="ml20  mr20 ">  {{item.className}}</span>
       </Button>
       </ButtonGroup>
    </div>
    <div>
      <component :is="showComponent" ref="component" :searchSubmit="searchSubmit"    :classNameList="modalData"  :id="showid"></component>
    </div>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import cardManagement from "./components/cardManagement";
import alipayScan from "./components/alipayScan";
import { paymentClassName } from "@/api/finance";
import { getUserType } from '@/libs/util';
import LevelSelect from "@/components/level-select";
export default {
  name: "systemInPaymentCard",
  components: {
    LevelSelect,
    Tables,
    cardManagement,
    alipayScan
  },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      modalData: [], //扫码列表数据
      showComponent: "cardManagement",
      showid:"",
      className: "",
      showTable: true, //银行卡   false-扫码
      paymentId: 1, //扫码类型ID
      classNameList: [],
      type: "银行卡管理",
      searchKey: {
        status: "yes"
      },
      cardManagement: "入款卡管理",
      imgSrc: ""
    };
  },
  mounted() {
    this.getData();
    this.imgSrc = this.$route.query.src;
  },
  watch: {
    "$root.nowSite": {
      handler(val, oldVal) {
        this.$nextTick(() => {
          this.$refs.LevelSelect.init(val.id);
        });
      },
      deep: true,
      immediate: true
    },
    "$route.params": {
      handler(val, oldVal) {
        this.$nextTick(() => {
        if(val.inCard == undefined || val == null) return
          this.backChangeType(val)
        });
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    levelChange(res) {
      this.searchKey.levelLabel = res.levelLabel;
    },

    //新增入款卡
    addBankCard() {
      this.$router.push({
        name: "bankCardEdit",
        params: { page: "create", classId : this.showid}
      });
    },
    //支付，微信，财付通扫码
    getData() {
      const data={
        classType:"qr_code"
      }
      paymentClassName(data).then(res => {
        const data = res.data;
        this.classNameList = res.data;
        this.modalData = JSON.parse(JSON.stringify(res.data))
        let newbank = {};
        newbank["id"] = "0";
        newbank["className"] = "银行卡管理";
        this.classNameList.unshift(newbank);
        const { className, classId } = this.$route.params;
        this.type=className
        console.log(this.type)
        if (classId) {
            this.showid=classId
            this.showComponent='alipayScan'
        } else {
            this.showComponent='cardManagement'
        }
      });
    },
    //根据对应的导航展示对应的表格
    changeType(name, id) {
      console.log(id);
        this.showid=id;
        this.paymentId = id;
        this.type = name;
      if(name=="银行卡管理") this.showComponent='cardManagement'
        else  this.showComponent='alipayScan';
    },
    //添加银行卡跳转回来显示对应的表格
    backChangeType(data) {
      if(data.inCard=="card"){
        this.showComponent='cardManagement'
      }else{
        this.showid= data.classId;
        this.paymentId = data.classId;
        this.type = data.className;
        this.showComponent='alipayScan';
      }
    },
    //查询
    searchSubmit() {
      let params = { ...this.searchKey };
      for (let key in params) {
        if (!params[key]) delete params[key];
      }
      params.siteId=this.$root.nowSite.id
      params.classId=this.showid

      if(this.showComponent=='cardManagement'){
          delete params.classId
          this.$refs.component.getQuery(params)
          // this.$refs.component.getData(params)
      }
      if(this.showComponent=='alipayScan'){
          this.$refs.component.getData(params)
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
.status-button  {
    border-color: #e4e4e4;
    background-color: #f6f6f8;
}
</style>


