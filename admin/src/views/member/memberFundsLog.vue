<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="业务类型">
          <Select clearable  v-model="searchKey.type"  class="s-86">
            <Option v-for="item in  typeList" :key="item.value" :value="item.value">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="开始时间">
          <DatePicker type="date" placeholder="请选择日期" class="s-120" v-model="Time[0]"></DatePicker>
        </FormItem>
        <FormItem label="结束时间">
          <DatePicker type="date" placeholder="请选择日期" class="s-120" v-model="Time[1]"></DatePicker>
        </FormItem>
        <!-- <FormItem>
          <Checkbox>
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem> -->
        <FormItem label="会员账号">
          <Input placeholder="多个请以，逗号隔开"   v-model="searchKey.userName" class="s-140" />
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="$root.searchBtnLoading" class="search" @click="searchSubmit">查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        :columns="table.columns"
        :loading="$root.tableLoading"
        :value="table.data"
        :total="table.total"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        :pageSizeOpts="table.pageSizeOpts"
      ></Tables>
    </div>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import tableMixins from "@/mixins/table";
import Icons from "@/components/icons";
import { memberFinanceLog } from "@/api/member";
import {sortInteraction} from '@/libs/util';
export default {
  name: "memberFundsLog",
  mixins: [tableMixins],
  components: { Tables, Icons },
  data() {
    return {
      typeList:[
        {name:"全部",value:"all"},
        {name:'存款',value:'deposit'},
        {name:'取款',value:'withdrawals'},
        {name:'优惠',value:'bonus'},
        {name:'投注',value:'bet'},
        {name:'平台转账',value:'platform'},
        {name:'代理转账',value:'agency'},
        {name:'其它',value:'other'},
      ],
      Time: [],
      searchKey: {
        type:"all"
      },
      table: {
        loading: true,
        total: 100,
        pageSizeOpts: [20, 30, 40, 50],
        columns: [
          {
            title: "会员账号",
            key: "userName",
            align: "center"
          },
          {
            title: "业务类型",
            key: "type",
            align: "center"
          },
          {
            title: '变更类型',
            key: 'subType',
            align: 'center'
          },
          {
            title: "变更金额",
            key: "money",
            align: "center"
          },
          {
            title: "变更前余额",
            key: "beforMoney",
            align: "center",
            width: "280"
          },
          {
            title: "变更后余额",
            key: "afterMoney",
            align: "center",
            width: "280"
          },
          {
            title: "变更时间",
            key: "created_at",
            align: "center",
            render: (h,params) =>{
              return <span class="pl20 pr20">{this.$root.unixTime(params.row.created_at)}</span>;
            }
          },
          {
            title: "备注",
            key: "remarks",
            align: "center"
          }
        ],
        data: []
      }
    };
  },
  created() {
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === 'memberSearchFunds') {
        vm.$store.commit('closeTag', from)
      }
    })
  },
  methods: {
    getData(data) {
       this.$root.startTableLoading(this);

      let dataParams = data.params;
      for (let key in dataParams) {
        if (!dataParams[key]) delete dataParams[key];
      }

       if(!data.params.userName){
         delete data.params.userName
       }

       if(data.params.isLike) data.params.isLike=Number(data.params.isLike)
       if(data.params.type=='all') delete data.params.type
      memberFinanceLog(data).then(res => {
        const {data,total}=res.data;
        this.table.loading=false;
        this.table.data=data;
        this.table.total=total;

      });
    },
    searchSubmit() {
      let params={...this.searchKey};
      params.siteId=this.nowSite.id;
      if(this.$root.validateTime(this.Time)){
        const [startTime, endTime] = this.$root.validateTime(this.Time);
        params.startTime = startTime && this.$root.formatTime(startTime);
        params.endTime = endTime && this.$root.formatTime(endTime);
      }else{
          return false;
      }
      this.searchKey.startTime = params.startTime;
      this.searchKey.endTime = params.endTime;

      for (let key in params) {
        if (!params[key]) delete params[key];
      }
      this.getData({params});
    },
  }
};
</script>
<style lang="less" scoped>
.ivu-form-item{
  &:nth-child(4){
    margin-right: -5px;
  }
  &:nth-child(7){
    margin-top: 1px!important;
  }
}
</style>
