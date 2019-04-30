<template>
  <div>
    <div class="mt10 mb20">
      <Button @click="addMessage()" class="w130x oldColor mr20"
        v-if="(adminType == 'super') || (authInPage.indexOf('popupsIns') != -1)"
      ><Icons type="xinzeng" size="14" class="mr5"/>新增公告</Button>
      <Button @click="addCouse()" class="w130x oldColor"
        v-if="(adminType == 'super') || (authInPage.indexOf('lanternIns') != -1)"
      ><Icons type="xinzeng" size="14" class="mr5"/>新增走马灯</Button>
    </div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="状态">
          <Select class="w110x" v-model="searchKey.status">
            <Option v-for="(item,index) in typeList" :value="item.value" :key="index">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="标题">
          <Input class="w135x" placeholder="关键字查询" v-model="searchKey.title"/>
        </FormItem>
        <FormItem label="操作人">
          <Input class="w135x" placeholder="请输入" v-model="searchKey.who"/>
        </FormItem>
        <FormItem>
          <FormItem label="开始时间">
            <DatePicker type="date" placeholder="请选择日期" class="s-120" v-model="Time[0]"></DatePicker>
          </FormItem>
          <FormItem label="结束时间">
            <DatePicker type="date" placeholder="请选择日期" class="s-120" v-model="Time[1]"></DatePicker>
          </FormItem>
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
    <div>
      <div class="tab-titel">
        <span :class="showComponent == 'noticePop' ? 'cs active' : 'cs'" @click="Pop('noticePop')"
          v-if="(adminType == 'super') ||  (authInPage.indexOf('popupsList') != -1)"
        >公告弹窗</span>
        <span :class="showComponent == 'couse' ? 'cs active' : 'cs'" @click="Pop('couse')"
          v-if="(adminType == 'super') || (authInPage.indexOf('lanternList') != -1)"
        >走马灯</span>
      </div>
      <div class="tab">
        <component :is="showComponent" ref="component"></component>
      </div>
    </div>
  </div>
</template>
<script>
import noticePop from "./components/noticePop.vue";
import couse from "./components/couse.vue";
import Icons from "@/components/icons";
import { getUserType } from '@/libs/util';
export default {
  name: "notice",
  components: {
    noticePop,
    couse,
    Icons
  },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      typeList: [{ value:"all",name: "请选择" },{ value: "yes", name: "正常" }, { value: "no", name: "停用" }],
      showComponent: "noticePop",
      Time: [this.$root.startTime(), this.$root.formatnightTimeS()],
      searchKey:{
        status:'all'
      }
    };
  },
  created(){
       if(this.$route.params.page=='success'){
           this.showComponent="couse"
       }
  },
  methods: {
    searchSubmit() {
        let params ={...this.searchKey}
        params.siteId = this.$root.nowSite.id
        params.type="popups"
        if (this.$root.validateTime(this.Time)) {
        const [startTime, endTime] = this.$root.validateTime(this.Time);
        params.startTime = startTime && this.$root.formatTime(startTime);
        params.endTime = endTime && this.$root.formatnightTimeS(endTime);
       } else {
          return false;
       }

       for (let key in params) {
        if (!params[key]) delete params[key];
      }
       if(this.showComponent=='noticePop'){
          this.$refs.component.getData({params})
       }else{
          params.type="lantern"
          this.$refs.component.getcouseData({params})
       }
    },
    Pop(val) {
      this.showComponent = val;
    },
    //新增信息
    addMessage() {
      this.$router.push({
        name: "noticeDetial",
        params: { page: "create" }
      });
    },
    //新增走马灯
    addCouse() {
      this.$router.push({
        name: "couseDetial",
        params: { page: "add" }
      });
    }
  }
};
</script>
<style scoped lang="less">
.v2-button {
  button:hover {
		background-color:#f4f9ff;
		border-color:#2d8cf0;
		color:#2d8cf0;
  }
}
.tab-titel {
  span {
    padding: 5px 20px 5px 20px;
    display: inline-block;
    background: #fff;
    margin-bottom: -1px;
    border: 1px solid #fff;
    border-bottom: 1px solid #eee;
    margin-left: 10px;
  }
  span.active {
    border: 1px solid #2D8CF0;
    border-bottom: 1px solid #fff;
    color: #2D8CF0;
  }
  margin-top: 15px;
  border-bottom: 1px solid #eee;
}
.tab {
  padding-left: 10px;
  margin: 15px 0;
  width: 100%;
}
</style>