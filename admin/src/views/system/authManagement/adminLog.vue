<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="操作事件">
          <LogSelect class="w160x" @on-change="onLogTypeChange"/>
        </FormItem>
        <FormItem label="开始时间">
          <DatePicker type="date" placeholder="请选择日期" class="s-120" v-model="Time[0]"></DatePicker>
        </FormItem>
        <FormItem label="结束时间">
          <DatePicker type="date" placeholder="请选择日期" class="s-120" v-model="Time[1]"></DatePicker>
        </FormItem>
        <FormItem label="管理员账号">
          <Input placeholder="多个请以，逗号隔开" v-model="searchKey.created_name" class="s-140"/>
        </FormItem>
        <FormItem label="内容">
          <Input placeholder v-model="searchKey.message" class="s-140"/>
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
        :showSizer="false"
        @on-page-change="onPageChange"
        @on-details="onDetails"
      ></Tables>
    </div>
    <Modals ref="detailModal" title="日志详情" :width="750">
      <div slot="content" class="box">
        <p>
          <span class="title">操作事件：</span>
          <span>{{detailsData.type_name}}</span>
        </p>
        <p>
          <span class="title">操作日志：</span>
          <span>{{detailsData.message}}</span>
        </p>
        <!-- <p>
          <span class="title">path：</span>
          <span>{{detailsData.path}}</span>
        </p>
        <p>
          <span class="title">request：</span>
          <span>{{detailsData.request}}</span>
        </p> -->
        <p>
          <span class="title">IP：</span>
          <span>{{detailsData.remote_addr}}</span>
        </p>
        <p>
          <span class="title">操作人：</span>
          <span>{{detailsData.created_name}}</span>
        </p>
        <p>
          <span class="title">操作时间：</span>
          <span>{{$root.unixTime(detailsData.created_at)}}</span>
        </p>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import tableMixins from "@/mixins/table";
import Icons from "@/components/icons";
import Modals from "@/components/modals";
import LogSelect from "./components/log-select";
import { getAdminLogList } from "@/api/system";
export default {
  name: "adminLog",
  components: { Tables, Icons, Modals, LogSelect },
  data() {
    return {
      detailsData: {},
      Time: [this.$root.startTime(1), this.$root.endTime(1)],
      searchKey: {
        startTime: this.$root.startTime(1),
        endTime: this.$root.endTime(1)
      },
      table: {
        loading: true,
        total: 0,
        columns: [
          {
            title: "管理员账号",
            key: "created_name",
            align: "center"
          },
          {
            title: "IP",
            key: "remote_addr",
            align: "center"
          },
          {
            title: "操作事件",
            key: "type_name",
            align: "center"
          },
          {
            title: "操作内容",
            key: "message",
            align: "center"
          },
          {
            title: "操作时间",
            key: "created_at",
            align: "center",
            render: (h, params) => {
              return <span>{this.$root.unixTime(params.row.created_at)}</span>;
            }
          },
          {
            title: "操作",
            key: "handle",
            align: "center",
            options: ["details"]
          }
        ],
        data: []
      }
    };
  },
  mounted() {
    this.getData({params: { ...this.searchKey, siteId: this.$root.nowSite.id}})
  },
  methods: {
    onLogTypeChange(res) {
      this.searchKey.type_name = res
    },
    getData(data) {
      this.$root.startTableLoading(this);
      getAdminLogList(data).then(res => {
        const { data, total } = res.data;
        this.table.data = data;
        this.table.total = total;
      });
    },
    searchSubmit() {
      let params = { ...this.searchKey };
      params.siteId = this.$root.nowSite.id;
      if (this.$root.validateTime(this.Time)) {
        const [startTime, endTime] = this.$root.validateTime(this.Time);
        params.startTime = startTime && this.$root.formatTime(startTime);
        params.endTime = endTime && this.$root.formatTime(endTime);
      } else {
        return false;
      }
      if (params.created_name && params.created_name.length < 5) {
        this.$Tip.info({ content: "管理员账号最小5个字符" });
        return false;
      }
      this.searchKey.startTime = params.startTime;
      this.searchKey.endTime = params.endTime;

      for (let key in params) {
        if (!params[key]) delete params[key];
      }
      this.getData({ params });
    },
    onDetails(params) {
      this.$refs.detailModal.show();
      this.detailsData = {};
      setTimeout(() => {
        this.detailsData = params.row;
      }, 50);
    },
    onPageChange(page) {
      let data = { ...this.searchKey, siteId: this.$root.nowSite.id }
      this.getData({ params: data, query: { page } })
    }
  }
};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  p {
    width: 60%;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 160px;
    span {
      padding-left: 30px;
    }
    span.title {
      display: inline-block;
      width: 90px;
      color: #c5c5c5;
    }
  }
}
</style>
