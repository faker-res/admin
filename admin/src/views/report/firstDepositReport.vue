<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="存款类型">
          <Select style="width:100px" v-model="searchKey.type">
            <Option v-for="item in scList" :value="item.value" :key="item.value">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="开始时间">
          <DatePicker type="date" placeholder="开始时间" class="s-120" v-model="Time[0]"></DatePicker>
          <!-- <span class="date-divide"></span> -->
        </FormItem>
        <FormItem label="结束时间">
          <DatePicker type="date" placeholder="结束时间" class="s-120" v-model="Time[1]"></DatePicker>
         </FormItem>
        <!-- <FormItem>
          <Checkbox v-model="searchKey.isLike">
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem> -->
        <FormItem label="会员账号">
          <Input v-model="searchKey.userName" placeholder="多个请以，逗号隔开" class="s-140"/>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="$root.searchBtnLoading" class="search" @click="searchSubmit">查询</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" :loading="$root.exportBtnLoading" class="ivu-btn export" @click="exportExcel">导出EXCEL</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        ref="table"
        :columns="table.columns"
        :loading="$root.tableLoading"
        :value="table.data"
        :total="table.total"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        @on-sort-change="sortChange"
      ></Tables>
    </div>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import { getfirstReportData } from "@/api/report";
import tableMixins from "@/mixins/table";
export default {
  name: "firstDepositReport",
  mixins: [tableMixins],
  components: {
    Tables
  },
  data() {
    return {
      scList: [
        { value: "firstTime", name: "首存" },
        { value: "secondTime", name: "二存" },
        { value: "thirdTime", name: "三存" }
      ],
      searchKey: {
        startTime: this.$root.startTime(),
        endTime: this.$root.formatnightTimeS(),
        type: "firstTime"
      },
      Time:[this.$root.startTime(),this.$root.formatnightTimeS()],
      table: {
        data: [],
        total: 0,
        columns: [
          {
            title: "会员账号",
            key: "username",
            align: "center"
          },
          {
            title: "账号类型",
            key: "agencyLevel",
            align: "center"
          },
          {
            title: "首存金额",
            key: "firstAmount",
            align: "center",
            sortable: 'custom',
              render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.firstAmount)}</span>
            }
          },
          {
            title: "首存时间",
            key: "firstTime",
            align: "center",
            render: (h, params) => {
              return <span class="pr10 pl10">{params.row.firstTime>0?this.$root.unixTime(params.row.firstTime):'-'}</span>;
            }
          },
          {
            title: "二存金额",
            key: "secondAmount",
            align: "center",
            sortable: 'custom',
             render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.secondAmount)}</span>
            }
          },
          {
            title: "二存时间",
            key: "secondTime",
            align: "center",
            render: (h, params) => {
              return <span class="pr10 pl10">{params.row.secondTime>0?this.$root.unixTime(params.row.secondTime):"-"}</span>;
            }
          },
          {
            title: "三存金额",
            key: "thirdAmount",
            sortable: 'custom',
            align: "center",
             render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.thirdAmount)}</span>
            }
          },
          {
            title: "三存时间",
            key: "thirdTime",
            align: "center",
            render: (h, params) => {
              return <span class="pr10 pl10">{params.row.thirdTime>0?this.$root.unixTime(params.row.thirdTime):"-"}</span>;
            }
          },
          {
            title: "注册时间",
            key: "addTime",
            align: "center",
            render: (h, params) => {
              return <span class="pr10 pl10">{this.$root.unixTime(params.row.addTime)}</span>;
            }
          }
        ]
      }
    };
  },
  methods: {
    getData(data) {
      let dataParams=data.params
       for (let key in dataParams) {
        if (!dataParams[key]) delete dataParams[key];
      }
      this.$root.startTableLoading();
      if(data.params.isLike) data.params.isLike=Number(data.params.isLike)
      getfirstReportData(data).then(res => {
        const { data, total } = res.data;
        this.table.data = data.list;
        this.table.total = total;
      });
    },
    searchSubmit() {
      this.$refs.table.setPage()
      let params = { ...this.searchKey };
      params.siteId = this.nowSite.id;
      if (this.$root.validateTime(this.Time)) {
        const [startTime, endTime] = this.$root.validateTime(this.Time);
        params.startTime = startTime && this.$root.formatTimeS(startTime);
        params.endTime = endTime && this.$root.formatnightTimeS(endTime);
      } else {
        return false;
      }

      this.searchKey.startTime = params.startTime
      this.searchKey.endTime = params.endTime
      if(!params.startTime && !params.endTime){
        this.$Tip.info({ content: '时间还未选择'})
        return false
      }
      if (params.userName && params.userName.length < 5) {
        this.$Tip.info({ content: "会员账号最小5个字符！" });
        return false;
      }
      if (!params.userName) delete params.isLike;
      for (let key in params) {
        if (!params[key]) delete params[key];
      }
      this.getData({ params });
    },
    // 排序
    // sortChange(column) {
    //   const { key, order } = column
    //   const { id } = this.nowSite
    //   let data = { sortKey: key, sortVal: order, siteId: id }
    //   if(data.sortVal=='normal'){
    //      delete data.sortKey
    //      delete data.sortVal
    //   }
    //   this.getData({ params: { ...this.searchKey, ...data } })
    // },
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
.ivu-form-item {
  &:nth-child(3) {
    margin-right: -5px;
  }
}
</style>