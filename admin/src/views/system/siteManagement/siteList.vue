<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
         <Button class="w130x cardNutton"  @click="addSite"
          v-if="(adminType == 'super') || (authInPage.indexOf('siteManagementCreate') != -1)"
         >新增站点</Button>
        <FormItem label="站点名称">
          <Input class="s-140" placeholder="请输入站点名称" v-model="searchKey.siteName" clearable/>
        </FormItem>
        <FormItem label="站点代号">
          <Input class="s-140" placeholder="请输入站点代号" v-model="searchKey.siteCode" clearable/>
        </FormItem>
        <FormItem>
          <Button type="primary" class="search" :loading="$root.searchBtnLoading" @click="submit">查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        :loading="$root.tableLoading"
        :value="table.data"
        :columns="table.columns"
        :total="table.total"
        @on-page-change="onPageChange"
        :pageSizeOpts="table.pageSizeOpts"
        @on-page-size-change="onPageSizeChange"
        @on-details="onDetail"
        @on-edit="onEdit"
      ></Tables>
    </div>
  </div>
</template>
<script>
import Tables from "_c/tables";
import { siteManagementList, siteManagementUpdate } from "@/api/system";
import { getUserType } from '@/libs/util';
export default {
  name: "siteList",
  components: {
    Tables
  },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      searchKey: { limit: 20},
      table: {
        total: 0,
        data: [],
        loading: true,
        pageSizeOpts: [20, 30, 40],
        columns: [
          {
            title: "站点名称",
            key: "siteName",
            align: "center"
          },
          {
            title: "站点代号",
            key: "siteCode",
            align: "center"
          },
          {
            title: "创建人",
            key: "createUserName",
            align: "center"
          },
          {
            title: "更新人",
            key: "updateUserName",
            align: "center",
            render: (h, params) => (
              <span>{this.$root.text(params.row.updateUserName)}</span>
            )
          },
          {
            title: "创建日期",
            key: "created_at",
            align: "center",
            render: (h, params) => (
              <span>{this.$root.unixTime(params.row.created_at)}</span>
            )
          },
          {
            title: "操作",
            align: "center",
            render: (h,params) => {
              return (
                <div>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('siteManagementDetail') != -1) ? 'inline-block' : "none"
                    }}
                    onClick={() => {this.onDetail(params)}}
                  >详情</a>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('siteManagementUpdate') != -1) ? 'inlinr-block' : 'none'
                    }}
                    onClick={() => {this.onEdit(params)}}
                  >编辑</a>
                </div>
              )
            }
          }
        ]
      }
    };
  },
  mounted() {
    this.getData({params: this.searchKey})
  },
  methods: {
    getData(data) {
      this.$root.startTableLoading(this);
      siteManagementList(data).then(res => {
        const { data, total } = res.data;
        this.table.data = data;
        this.table.total = total;
      });
    },
    onPageChange(page) {
      let data = { ...this.searchKey };
      for (let key in data) {
        if (!data[key]) delete data[key];
      }
      this.getData({ params: data, query: { page } });
    },
    onPageSizeChange(pageSize) {
      this.searchKey.limit = pageSize
       let data = { ...this.searchKey }
       for(let key in data) {
         if(!data[key]) delete data[key]
       }
      this.getData({ params: data })
    },
    submit() {
      let data = { ...this.searchKey };
      for (let key in data) {
        if (!data[key]) delete data[key];
      }
      this.getData({ params: data });
    },
    // 查看详情
    onDetail(params) {
      this.$router.push({
        name: "siteDetail",
        query: { id: params.row.id }
      });
    },
    // 新增,编辑站点
    addSite() {
      this.$router.push({
        name: "siteAdd",
        params: { page: "create" }
      });
    },
    onEdit(params) {
      this.$router.push({
        name: "siteAdd",
        params: { page: "edit" },
        query: { id: params.row.id }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../styles/button.less";

</style>
