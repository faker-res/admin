<template>
  <div>
    <div class="v2-search clearfix">
      <Form ref="searchKey" class="fl" inline>
        <FormItem label="开始日期">
          <DatePicker type="date" placeholder="请选择" class="s-140" v-model="Time[0]"></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker type="date" placeholder="请选择" class="s-140" v-model="Time[1]"></DatePicker>
        </FormItem>
        <FormItem label="账号类型">
          <Select clearable  v-model="searchKey.isAgency" placeholder="全部" class="s-120" @on-change="typeChange">
            <Option
              v-for="(item,index) in accountList "
              :key="index"
              :value="item.value"
            >{{item.name}}</Option>
          </Select>
        </FormItem>
        <!-- <FormItem>
          <Checkbox v-model="searchKey.isLike">
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem> -->
        <FormItem label="账号">
          <Input v-model="searchKey.newuserName" placeholder="请输入账号" class="s-140"/>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            :loading="$root.searchBtnLoading"
            class="search"
            @click="searchSubmit(0)"
          >查询</Button>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            :loading="$root.exportBtnLoading"
            class="ivu-btn export"
            @click="exportExcel"
          >导出EXCEL</Button>
        </FormItem>
      </Form>
      <div class="fr">
        <span class="pr10">计算公式</span>
        <Poptip trigger="hover" placement="bottom-end">
          <div slot="content">
            <div>团队净盈利=会员输赢+团队返点+优惠金额</div>
            <div class="mt5">优惠金额=活动礼金+自身返水+下级返水</div>x
            <div class="red-font mt5">温馨提示：所有栏位数据为自身账号与所有下级数据之和</div>
          </div>
          <Icons type="bangzhutishi" color="#E4E4E4" :size="26"/>
        </Poptip>
      </div>
    </div>
    <div class="v2-table">
      <Breadcrumb separator=">" style="margin: 10px 10px 15px;">
        <BreadcrumbItem v-for="(bread,i) in breadList" :key="bread">
          <span class="blue-font" @click="linkTo(bread,i)">{{bread}}</span>
        </BreadcrumbItem>
      </Breadcrumb>
      <Tables
        ref="table"
        :loading="$root.tableLoading"
        :columns="table.columns"
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
import tableMixins from "@/mixins/table";
import { getAgencyReportData } from "@/api/report";
import Icons from "_c/icons";
export default {
  name: "agencyReport",
  mixins: [tableMixins],
  components: {
    Tables,
    Icons
  },
  data() {
    return {
      isLower: "",
      userName: "",
      breadList: ["列表首页"],
      searchKey: {
        startTime: this.$root.startTime(),
        endTime: this.$root.formatnightTimeS(),
        userName:"",
        isLower:"",
        isAgency:"",
      },
      Time: [this.$root.startTime(), new Date()],
      accountList: [
        { name: "代理", value: "yes" },
        { name: "会员", value: "no" }
      ],
      table: {
        total: 0,
        data: [],
        columns: [
          {
            title: "会员账号",
            key: "userName",
            align: "center",
            render: (h, params) => {
              const { isAgency, userName } = params.row;
              return (
                <span
                  class={{ "blue-font": isAgency === "yes" }}
                  onClick={() => {
                    if (isAgency === "yes") {
                      this.updateBread(params);
                    }
                  }}
                >
                  {userName}
                </span>
              );
            }
          },
          {
            title: "账号类型",
            key: "memberType",
            align: "center",
            render: (h, params) => {
              // const { isAgency } = params.row;
              // if (isAgency === "yes") {
              //   return <span>代理</span>;
              // } else if (isAgency === "no") {
              //   return <span>会员</span>;
              // } else {
              //   return <span>-</span>;
              // }
              return <span>{params.row.memberType}</span>
            }
          },
          {
            title: "注册人数",
            key: "regUserCount",
            align: "center",
            sortable: "custom"
          },
          {
            title: "投注人数",
            key: "betUserCount",
            align: "center",
            sortable: "custom"
          },
          {
            title: "首存人数",
            key: "firstDepositUserCount",
            align: "center",
            sortable: "custom"
          },
          {
            title: "首存金额",
            key: "firstDepositUserCount",
            align: "center",
            sortable: "custom",
            render:(h,params)=>{
                 return <span>-</span>
            }
          },
          {
            title: "投注金额",
            key: "betAmount",
            align: "center",
            sortable: "custom",
             render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.betAmount)}</span>
            }
          },
          {
            title: "会员输赢",
            key: "netAmount",
            align: "center",
            sortable: "custom",
             render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.netAmount)}</span>
            }
          },
          {
            title: "代理收入",
            key: "agencyRebateAmount",
            align: "center",
            sortable: "custom",
             render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.agencyRebateAmount)}</span>
            }
          },
          {
            title: "优惠金额",
            key: "bonusAmount",
            align: "center",
            sortable: "custom",
             render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.bonusAmount)}</span>
            }
          },  
          {
            title: "团队净盈利",
            key: "profit",
            align: "center",
              render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.profit)}</span>
            }
          },
          {
            title: "存款金额",
            key: "depositAmount",
            align: "center",
            sortable: "custom",
             render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.depositAmount)}</span>
            }
          },
          {
            title: "取款金额",
            key: "withdrawalsAmount",
            align: "center",
            sortable: "custom",
            render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.withdrawalsAmount)}</span>
            }
          },
          {
            title: "团队余额",
            key: "teamBalance",
            align: "center",
             sortable: "custom",
             render:(h,params)=>{
                 return <span>{this.$root.keepTwo(params.row.teamBalance)}</span>
            }
          }
        ]
      }
    };
  },
  methods: {
    typeChange(type) {
      this.searchSubmit(this.isLower, this.userName);
    },
    updateBread(params) {
      const { userName } = params.row;
      this.isLower = 1;
      this.userName = userName;
       console.log(params)
      // this.searchKey.isAgency = "all";
      this.breadList.push(userName);
      this.searchSubmit(this.isLower, this.userName);
    },
    linkTo(userName, i) {
      this.userName = userName;
      this.searchKey.isAgency = "all";
      let arr = this.breadList.slice(0, i + 1);
      this.breadList = arr;
      if (userName === "列表首页") {
        delete this.searchKey.newuserName;
        this.isLower = 0;
      } else {
        this.isLower = 1;
      }
      this.searchSubmit(this.isLower, this.userName);
    },
    getData(data) {
      let dataParams=data.params
        // dataParams.isLower=this.isLower
        // dataParams.userName=this.userName
        delete dataParams.newuserName

       for (let key in dataParams) {
        if (!dataParams[key]) delete dataParams[key];
      }
      this.$root.startTableLoading();

      if (data.params.isLike) data.params.isLike = Number(data.params.isLike);
      if (data.params.isAgency=="all") delete data.params.isAgency
      if (data.params.userName=="列表首页") delete data.params.userName
      getAgencyReportData(data).then(res => {
        if (res.data.data) {
          const { list, total } = res.data.data;
          list.length && list.push(this.createTotalData(total));
          this.table.data = list;
          this.table.total = res.data.total;
        } else {
          this.table.data = [];
          this.table.total = 0;
        }
      });
    },
    createTotalData(total) {
      const {
        agencyRebateAmount,
        betAmount,
        betUserCount,
        bonusAmount,
        depositAmount,
        firstDepositUserCount,
        netAmount,
        regUserCount,
        validBetAmount,
        withdrawalsAmount,
        teamBalance,
        profit
      } = total;
      let item = {
        userName: "总计",
        memberType: "-",
        regUserCount,
        betUserCount,
        firstDepositUserCount,
        firstDepositUserCount,
        betAmount,
        netAmount,
        agencyRebateAmount,
        bonusAmount,
        profit,
        depositAmount,
        withdrawalsAmount,
        teamBalance
      };
      return item;
    },
    searchSubmit(type, userName) {
      console.log(type)
      console.log(userName)
      this.$refs.table.setPage()
      // 查询全部的列表是不传isAgency参数的，isAgency => yes/no
      // type 0 搜索栏点击搜索
      // type 1 列表点击搜索
      if (type === 0) {
        if (this.breadList.length > 1) {
          // 在一级以上的列表页点击查询按钮时重置isAgency
          this.searchKey.isAgency = "all";
        }
        this.breadList = ["列表首页"];
      }
       // 当在搜索栏点击搜索的时候为用户输入的，当在列表点击的时候为查询列表传来的userName
      this.searchKey.userName=type===0 ? this.searchKey.newuserName : userName;
      console.log(this.searchKey)
      // 当在列表点击的时候清空账号输入框内容
      this.searchKey.newuserName = type === 1 ? "" : this.searchKey.newuserName;
      this.isLower = type;
      this.userName = userName;
      this.searchKey.isLower=type

      console.log(this.searchKey)
      let params = { ...this.searchKey };
      console.log(params)
      params.siteId = this.nowSite.id;
      // this.isLower = type;
      // this.userName = userName;
      // params.isLower = type;
      // 当在搜索栏点击搜索的时候为用户输入的，当在列表点击的时候为查询列表传来的userName
      // params.userName = type === 0 ? this.searchKey.newuserName : userName;
      // 当在列表点击的时候清空账号输入框内容
      // this.searchKey.newuserName = type === 1 ? "" : this.searchKey.newuserName;

      if (this.$root.validateTime(this.Time)) {
        const [startTime, endTime] = this.$root.validateTime(this.Time);
        params.startTime = startTime && this.$root.formatTimeS(startTime);
        params.endTime = endTime && this.$root.formatnightTimeS(endTime);
      } else {
        return false;
      }
      if (params.userName && params.userName.length < 5) {
        this.$Tip.info({ content: "会员账号最小5个字符！" });
        return false;
      }
      if (params.startTime.length < 1) {
        this.$Tip.info({ content: "请输入开始和结束时间！" });
        return false;
      }

      if (!params.endTime) {
        delete params.endTime;
      }

      if (!params.userName) delete params.isLike;
      if (params.isAgency === "all") delete params.isAgency;
      delete params.output;
      for (let key in params) {
        if (!params[key]) delete params[key];
      }
      this.getData({ params });
    },
    //排序
    // sortChange(column) {
    //   const { key, order } = column;
    //   const { id } = this.nowSite;
    //   let data = { sortKey: key, sortVal: order, siteId: id };
    //   if(data.sortVal=='normal'){
    //      delete data.sortKey
    //      delete data.sortVal
    //   }
    //   this.getData({ params: { ...this.searchKey, ...data } });
    // }
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


