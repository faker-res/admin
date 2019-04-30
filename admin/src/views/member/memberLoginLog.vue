<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="是否登录">
          <Select clearable v-model="searchKey.isLogin" class="s-86">
            <Option value="yes">是</Option>
            <Option value="no">否</Option>
          </Select>
        </FormItem>
        <FormItem label="开始时间">
          <DatePicker type="date" placeholder="请选择日期" class="s-120" v-model="Time[0]"></DatePicker>
        </FormItem>
        <FormItem label="结束时间">
          <DatePicker type="date" placeholder="请选择日期" class="s-120" v-model="Time[1]"></DatePicker>
        </FormItem>
        <!-- <FormItem>
          <Checkbox v-model="searchKey.isLike">
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem>-->
        <FormItem>
          <Select v-model="searchKey.typeTag" class="s-100">
            <Option value="userName">会员账号</Option>
            <Option value="agencyName">上级代理</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Input placeholder="多个请以，逗号隔开" class="s-140" v-model="searchKey.content"/>
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
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
      ></Tables>
    </div>
    <Modals ref="Modals" title="历史登录">
      <div slot="content" class="modal mb20">
        <Tables
          ref="historyDataTable"
          :columns="historyTable.columns"
          :loading="historyTable.loading"
          :value="historyTable.data"
          :pageSizeOpts="historyTable.pageSizeOpts"
          :total="historyTable.total"
          @on-page-change="onHistoryPageChange"
          :show-sizer="false"
          :page-fix-show="true"
        >
        </Tables>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import tableMixins from "@/mixins/table";
import Icons from "@/components/icons";
import Modals from "@/components/modals";
import { memberLoginLog, singleMemberHistory } from "@/api/member";
export default {
  name: "memberLoginLog",
  mixins: [tableMixins],
  components: { Tables, Icons, Modals },
  data() {
    return {
      Time: [],
      searchKey: {
        isLogin: "yes",
        typeTag: "userName"
      },
      table: {
        loading: true,
        total: 0,
        columns: [
          {
            title: "会员账号",
            key: "userName",
            align: "center"
          },
          {
            title: "上级",
            key: "agencyName",
            align: "center"
          },
          {
            title: "登录设备",
            key: "device",
            align: "center"
          },
          {
            title: "登录域名",
            key: "domain",
            align: "center"
          },
          {
            title: "登录IP",
            key: "ip",
            align: "center"
          },
          {
            title: "归属地",
            key: "location",
            align: "center"
          },
          {
            title: "登录时间",
            key: "created_at",
            align: "center",
            render: (h, params) => {
              return <span class="pl20 pr20">{this.$root.unixTime(params.row.created_at)}</span>;
            }
          },
          {
            title: "操作",
            align: "center",
            render: (h, params) => {
              return (
                <a
                  class="blue-font"
                  onClick={e => {
                    this.loginHistory(params);
                  }}
                >
                  历史登录
                </a>
              );
            }
          }
        ],
        data: []
      },
      historyTable: {
        pageSizeOpts: [10],
        total: 0,
        loading: true,
        columns: [
          {
            title: "登录设备",
            key: "device",
            align: "center"
          },
          {
            title: "登录域名",
            key: "domain",
            align: "center"
          },
          {
            title: "登录IP",
            key: "ip",
            align: "center"
          },
          {
            title: "归属地",
            key: "location",
            align: "center"
          },
          {
            title: "登录时间",
            key: "created_at",
            align: "center",
            render: (h, params) => {
              return <span>{this.$root.unixTime(params.row.created_at)}</span>;
            }
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
      let dataParams = data.params;
      for (let key in dataParams) {
        if (!dataParams[key]) delete dataParams[key];
      }
      if (!data.params.content) {
        delete data.params.typeTag;
      }
      if (!data.params.typeTag) {
        delete data.params.content;
      }
      memberLoginLog(data).then(res => {
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
      this.getData({ params });
    },
    loginHistory(params) {
      this.historyTable.loading = true;
      const data = {
        siteId: this.$root.nowSite.id,
        uid: params.row.uid,
        limit: 10
      };
      this.historyData = { ...data }
      singleMemberHistory({params: data}).then(res => {
        const { data, total } = res.data
        this.historyTable.data = data;
        this.historyTable.total = total;
        this.historyTable.loading = false;
      });
      //修正再次打开模态框时候页码不更新
      this.$refs.historyDataTable.setPage()
      this.$refs.Modals.show();
    },
    onHistoryPageChange(page) {
      this.historyTable.loading = true;
      const data = { params: {...this.historyData}, query: {page} }
      singleMemberHistory(data).then(res => {
        const { data, total } = res.data
        this.historyTable.data = data
        this.historyTable.total = total
        this.historyTable.loading = false
      })
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
.modal {
	max-height: 800px;
	overflow-y: auto;
}
</style>
