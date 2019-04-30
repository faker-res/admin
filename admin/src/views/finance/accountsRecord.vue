<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="催账类型">
          <Select clearable class="s-86" v-model="searchKey.type" placeholder="全部">
            <Option value="deposit">存款</Option>
            <Option value="withdrawals">取款</Option>
            <Option value="preferential">优惠</Option>
          </Select>
        </FormItem>
        <FormItem label="催账状态">
          <Select clearable class="s-86" v-model="searchKey.status">
            <Option value="fail">失败</Option>
            <Option value="success">成功</Option>
            <Option value="wait">待审核</Option>
          </Select>
        </FormItem>
        <FormItem label="开始日期">
          <DatePicker type="date" placeholder="开始日期" class="s-120" v-model="Time[0]"></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker type="date" placeholder="结束日期" class="s-120" v-model="Time[1]"></DatePicker>
        </FormItem>
        <!-- <FormItem>
          <Checkbox v-model="searchKey.isLike">
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem>-->
        <FormItem label="会员账号">
          <Input placeholder="多个请以，逗号隔开" class="s-195" v-model="searchKey.userName"/>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            class="search ml10f mb5"
            :loading="$root.searchBtnLoading"
            @click="searchSubmit"
          >查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        editable
        ref="tables"
        :columns="table.columns"
        :loading="$root.tableLoading"
        :value="table.data"
        :total="table.total"
        :pageSizeOpts="table.pageSizeOpts"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        :more="table.more"
      ></Tables>
    </div>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import { emergencyLogListData } from "@/api/finance";
import tableMixins from "@/mixins/table";
export default {
  name: "accountsRecord",
  mixins: [tableMixins],
  components: {
    Tables
  },
  data() {
    return {
      Time: [],
      title: "催账记录",
      searchKey: {
        status: "wait"
      },
      table: {
        total: 0,
        loading: true,
        pageSizeOpts: [20, 30, 40, 50],
        columns: [
          {
            title: "订单号",
            key: "code",
            align: "center"
          },
          {
            title: "等级",
            key: "levelAlias",
            align: "center"
          },
          {
            title: "会员账号",
            key: "userName",
            align: "center"
          },
          {
            title: "催账类型",
            key: "type",
            align: "center",
            render: (h, params) => {
              const { type } = params.row;
              return (
                <span>
                  {type === "deposit"
                    ? "存款"
                    : type === "withdrawals"
                    ? "取款"
                    : "优惠"}
                </span>
              );
            }
          },
          {
            title: "催账金额",
            key: "amount",
            align: "center"
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              const { status } = params.row;
              let color = status == "success" ? "" : "#FF2626";
              return (
                <span style={{ color }}>
                  {status === "wait"
                    ? "待审核"
                    : status === "success"
                    ? "成功"
                    : "失败"}
                </span>
              );
            }
          },
          {
            title: "催账时间",
            key: "created_at",
            align: "center",
            render: (h, params) => {
              return <span class="pr10 pl10">{this.$root.unixTime(params.row.created_at)}</span>;
            }
          },
          {
            title: "审核时间",
            key: "updated_at",
            align: "center",
            render: (h, params) => {
              if (params.row.status == "wait") {
                return <span>-</span>;
              }
              if (
                params.row.status == "success" ||
                params.row.status == "fail"
              ) {
                return (
                  <span class="pr10 pr10">{this.$root.unixTime(params.row.updated_at)}</span>
                );
              }
            }
          },
          {
            title: "审核者",
            key: "update_user",
            align: "center"
          }
        ],
        data: []
      }
    };
  },
  created() {},
  methods: {
    getData(data) {
      this.$root.startTableLoading();
      emergencyLogListData(data).then(res => {
        const { total, data } = res.data;
        this.table.total = total;
        this.table.data = data;
      });
    },
    searchSubmit() {
      let params = { ...this.searchKey, siteId: this.$root.nowSite.id };
      if (this.$root.validateTime(this.Time)) {
        const [startTime, endTime] = this.$root.validateTime(this.Time);
        params.startTime = startTime && this.$root.formatTime(startTime);
        params.endTime = endTime && this.$root.formatTime(endTime);
      } else {
        return false;
      }
      for (let key in params) {
        if (!params[key]) delete params[key];
      }
 
       this.$refs.tables.setPage();
      this.getData({ params });
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-form-item {
  &:nth-child(5) {
    margin-right: -5px;
  }
}
</style>


