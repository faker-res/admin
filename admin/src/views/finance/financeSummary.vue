<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="业务类型">
          <Select class="s-86" v-model="searchKey.type">
            <Option v-for="(t,i) in typeList" :key="i" :value="t.value">{{t.name}}</Option>
          </Select>
        </FormItem>
        <FormItem v-if="searchKey.type != 'all'" label="变更类型">
          <Select class="s-120" v-model="searchKey.subType" clearable>
            <Option v-for="(key,val,i) in subTypeList" :key="i" :value="val">{{key}}</Option>
          </Select>
        </FormItem>
        <FormItem label="开始日期">
          <DatePicker type="date" placeholder="开始日期" v-model="Time[0]" class="s-120"></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker type="date" placeholder="结束日期" class="s-120" v-model="Time[1]"></DatePicker>
        </FormItem>
        <FormItem label="会员账号">
          <Input placeholder="多个请以，逗号隔开" class="s-195" v-model="searchKey.userName"/>
          <Button
            type="primary"
            class="search mb5"
            @click="searchSubmit"
            :loading="$root.searchBtnLoading"
          >查询</Button>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            class="ivu-btn export mb5"
            @click="() => {this.$refs.dataActive.show()}"
          >导出EXCEL</Button>
        </FormItem>
      </Form>
    </div>
    <Modals ref="dataActive" title="选择导出业务类型" width="840">
      <div slot="content">
        <Form ref="detail" :label-width="90">
          <FormItem label="存款：">
            <CheckboxGroup v-model="detail.deposit">
              <Checkbox v-for="(item,index) in depositList" :key="index" :label="item"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="取款：">
            <CheckboxGroup v-model="detail.withdrawal">
              <Checkbox label="取款成功"></Checkbox>
              <Checkbox label="人工取款"></Checkbox>
              <Checkbox label="其他"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="优惠：">
            <CheckboxGroup v-model="detail.preferential">
              <Checkbox
                v-for="(item,index) in preferentialList"
                :key="index"
                :label="item"
                class="pre"
              ></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="其他：" v-model="detail.other">
            <Checkbox label="其他"></Checkbox>
          </FormItem>
          <FormItem>
            <Button
              class="ivu-btn close"
              style="margin-left:130px"
              @click="() => {this.$refs.dataActive.hide()}"
            >取消</Button>
            <Button type="primary" class="ft20 ivu-btn export-ok ml150" @click="sumbit">确认</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
    <div class="v2-table">
      <Tables
        ref="table"
        editable
        :columns="table.columns"
        :loading="$root.tableLoading"
        :pageSizeOpts="table.pageSizeOpts"
        :value="table.data"
        :total="table.total"
        :showSizer="true"
        @on-page-size-change="onPageSizeChange"
        @on-page-change="onPageChange"
        :more="table.more"
      ></Tables>
    </div>
    <summaryDataShow ref="sum" v-show="flag"></summaryDataShow>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Modals from "@/components/modals";
import summaryDataShow from "./components/summaryDataShow";
import tableMixins from "@/mixins/table";
import { financeSummaryData, financeType } from "@/api/finance";
export default {
  name: "financeSummary",
  mixins: [tableMixins],
  components: {
    Tables,
    Modals,
    summaryDataShow
  },
  data() {
    return {
      flag: false,
      pageSizeOpts: [20, 30, 40, 50],
      tableData: {}, // 下方表格的统计数据
      listData: {},
      typeList: [], //业务类型下拉框
      subTypeList: [], //变更类型下拉框
      Time: [],
      searchKey: {
        purpose: "list",
        type: "all"
      },
      pageSize:20,
      other: "other",
      height: 286,
      totaldata: null,
      table: {
        total: 0,
        loading: true,
        data: [],
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
            title: "变更类型",
            key: "subType",
            align: "center"
          },
          {
            title: "变更金额",
            key: "money",
            align: "center"
          },
          {
            title: "变更前余额",
            key: "beforMoney",
            align: "center"
          },
          {
            title: "变更后余额",
            key: "afterMoney",
            align: "center"
          },
          {
            title: "提交时间",
            key: "order_created_at",
            align: "center",
            render: (h, params) => {
              return (
                <span class="pr10 pl10">{this.$root.unixTime(params.row.order_created_at)}</span>
              );
            }
          },
          {
            title: "变更时间",
            key: "created_at",
            align: "center",
            render: (h, params) => {
              return <span class="pr10 pl10">{this.$root.unixTime(params.row.created_at)}</span>;
            }
          },
          {
            title: "备注",
            key: "remarks",
            align: "center",
            width: "360"
          }
        ]
      },
      detail: {},
      preferentialList: [
        "存款优惠",
        "系统彩金派送",
        "人工彩金派送",
        "会员返水",
        "会员返点",
        "代理返水",
        "代理返点",
        "日工资",
        "佣金",
        "分红"
      ],
      depositList: ["线上支付", "公司入款", "人工存款", "额度转换失败", "其他"]
    };
  },
  created() {
    this.$nextTick(() => {
      financeType().then(res => {
        this.listData = res.data;
        this.typeList.push({ value: "all", name: "全部" });
        for (let key in res.data) {
          this.typeList.push({ value: key, name: res.data[key].name });
        }
        this.subTypeList = this.listData.deposit.list;
      });
    });
  },
  mounted() {
    let data = { ...this.searchKey, siteId: this.$root.nowSite.id };
    data.purpose = "statistical";
    // if (data.type == "all") delete data.type;
    this.$nextTick(() => {
      this.$refs.sum.initData({ params: data });
    });
    this.searchSubmit()
  },
  watch: {
    "searchKey.type"(val, oldVal) {
      this.subTypeList = this.listData[val].list;
      this.$refs.table.setPage();
    },
    "searchKey.subType"(val, oldVal) {
      this.$refs.table.setPage();
    },
  },
  methods: {
    // 提交查询
    searchSubmit() {
      let data = { ...this.searchKey };
      if (this.$root.validateTime(this.Time)) {
        const [startTime, endTime] = this.$root.validateTime(this.Time);
        data.startTime = startTime && this.$root.formatTime(startTime);
        data.endTime = endTime && this.$root.formatTime(endTime);
      } else {
        return false;
      }

      if (data.userName && data.userName.length < 5) {
        this.$Tip.error({ content: "会员账号最小5个字符！" });
        return false;
      }
      for (let key in data) {
        if (!data[key]) delete data[key];
      }
      this.searchKey.startTime = data.startTime;
      this.searchKey.endTime = data.endTime;

      data.siteId = this.$root.nowSite.id;
      for (let key in data) {
        if (!data[key]) delete data[key];
      }
      this.getData({ params: data });
      // 更新表格统计数据
      let postData = { ...data };
      postData.purpose = "statistical";
      this.$refs.sum.initData({ params: postData });
    },
    // 获取表格数据
    getData(data) {
      if (data.params.type == "all") {
        delete data.params.type;
        delete data.params.subType;
      }
      this.$root.startTableLoading(this);
      financeSummaryData(data).then(res => {
        const { data, total } = res.data;
        this.table.data = data;
        this.table.total = total;
      });
    },
    //确认导出
    sumbit() {
      this.$refs.dataActive.hide();
      this.$Tip.success({
        content: "导出表格成功",
        onOk: () => {}
      });
    },
    // onPageChange(page) {
    //   let data = { ...this.searchKey, siteId: this.$root.nowSite.id, limit :this.pageSize };

    //   this.getData({ params: data, query: { page } });
    //   let postData = { ...data };
    //   postData.purpose = "statistical";
    //   this.$refs.sum.initData({ params: postData, query: { page } });
    // },
    // onPageSizeChange(pageSize){
    //   let  data={...this.searchKey}
    //   this.getData({ params: {
    //     limit:pageSize,
    //     siteId: this.$root.nowSite.id ? this.$root.nowSite.id :this.$parent.$root.nowSite.id ,
    //     type:this.searchKey.type,
    //     subType:this.searchKey.subType,
    //     startTime:this.searchKey.startTime,
    //     endTime:this.searchKey.endTime,
    //     userName:this.searchKey.userName,

    //   }})
    //   this.pageSize = pageSize
    // }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
@import "../../styles/class.less";
.new-table {
  margin-top: 20px;
  height: 205px;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
}
.other {
  display: inline-block;
  height: 25%;
  width: 16.66%;
  border-bottom: 1px solid #dcdcdc;
  border-right: 1px solid #dcdcdc;
  &:nth-child(6n) {
    border-right: 0;
  }
}
.ivu-form-item {
  &:nth-child(4) {
    margin-right: -5px;
  }
}
</style>


