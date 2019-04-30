<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="操作事件">
          <Select clearable v-model="searchKey.act" class="s-86" placeholder="全部">
            <Option value="create">创建</Option>
            <Option value="update">更新</Option>
            <Option value="delete">删除</Option>
            <Option value="other">其它</Option>
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
        </FormItem>-->
        <FormItem label="会员账号">
          <Input v-model="searchKey.username" placeholder="多个请以，逗号隔开" class="s-140"/>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            :loading="$root.searchBtnLoading"
            class="search"
            @click="searchSubmit"
          >查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        :columns="table.columns"
        :loading="$root.tableLoading"
        :value="table.data"
        :total="table.total"
        :pageSizeOpts="table.pageSizeOpts"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        @on-sort-change="sortChange"
      ></Tables>
    </div>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Icons from "@/components/icons";
import tableMixins from "@/mixins/table";
import { memberHandleLog } from "@/api/member";
import { sortInteraction } from "@/libs/util";
export default {
  name: "memberLog",
  mixins: [tableMixins],
  components: { Tables, Icons },
  data() {
    return {
      Time: [],
      searchKey: { },
      table: {
        loading: true,
        pageSizeOpts: [20, 30, 40, 50],
        total: 100,
        columns: [
          {
            title: "会员账号",
            key: "username",
            align: "center"
          },
          {
            title: "IP",
            key: "ip",
            align: "center"
          },
          {
            title: "操作时间",
            key: "created_at",
            align: "center",
            render: (h, params) => {
              return <span class="pl20 pr20">{this.$root.unixTime(params.row.created_at)}</span>;
            }
          },
          {
            title: "操作事件",
            key: "act",
            align: "center",
            render: (h, params) => {
              let text;
              if (params.row.act === "create") {
                text = "创建";
              } else if (params.row.act === "update") {
                text = "更新";
              } else if (params.row.act === "delete") {
                text = "删除";
              } else {
                text = "其他";
              }
              return <span>{text}</span>;
            }
          },
          {
            title: "操作日志",
            key: "actionInfo",
            align: "center",
            tooltip: true
          }
        ],
        data: []
      }
    };
  },
  created() {},
  methods: {
    getData(data) {
      this.$root.startTableLoading(this);

      let dataParams=data.params
       for (let key in dataParams) {
        if (!dataParams[key]) delete dataParams[key];
      }

      memberHandleLog(data).then(res => {
        const { data, total } = res.data;
        this.table.data = data;
        this.table.total = total;
        this.table.loading = false;
      });
    },
    searchSubmit() {
      let params = { ...this.searchKey };
      params.siteId = this.nowSite.id;
      if (this.$root.validateTime(this.Time)) {
        const [startTime, endTime] = this.$root.validateTime(this.Time);
        params.startTime = startTime && this.$root.formatTime(startTime);
        params.endTime = endTime && this.$root.formatTime(endTime);
      } else {
        return false;
      }
      this.searchKey.startTime = params.startTime;
      this.searchKey.endTime = params.endTime;

      for (let key in params) {
        if (!params[key]) delete params[key];
      }

      if (!params.userName) {
        delete params.userName;
      }
      this.getData({ params });
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-form-item {
  &:nth-child(4) {
    margin-right: -5px;
  }
  &:nth-child(7) {
    margin-top: 1px !important;
  }
}
</style>
