<template>
  <div>
    <div class="ivu-btn addArtciles ft16 mb20 " @click="addArtciles()"
      v-if="(adminType == 'super') || (authInPage.indexOf('articleIns') != -1)"
    >+新增文章</div>
    <Tables
      :page="table.page"
      :loading="$root.tableLoading"
      :value="table.data"
      :columns="table.columns"
      :total="table.total"
      :showSizer="true"
      @on-delete="del"
      @on-edit="edit"
      @on-change-status="onChangeStatus"
      @on-page-change="onPageChange"
      @on-page-size-change="onPageSizeChange"
    ></Tables>
  </div>
</template>
<script>
import { articleList, articleStatusChange, articleDel } from "@/api/system";
import { borrowDataO } from "@/api/data";
import Modals from "@/components/modals";
import { getUserType } from '@/libs/util';
import Tables from "_c/tables";
export default {
  name: "siteArtciles",
  components: {
    Tables,
    Modals
  },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      typeList: [{ value: "1", name: "正常" }, { value: "2", name: "停用" }],
      Time: [],
      table: {
        total: 0,
        more: true,
        page: true,
        loading: true,
        columns: [
          {
            title: "标题",
            key: "title",
            align: "center"
          },
          {
            title: "客户端",
            key: "client_type",
            align: "center"
          },
          {
            title: "发布人",
            key: "who",
            align: "center"
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              const { status } = params.row;
              return (
                <span
                  style={{
                    color: status === "yes" ? "#515a6e" : "#FF2626"
                  }}
                >
                  {status === "yes" ? "正常" : "停用"}
                </span>
              );
            }
          },
          {
            title: "操作",
            align: "center",
            render: (h,params) => (
              <div>
                <a class="ib mr10"
                  onClick={() => {this.onChangeStatus(params)}}
                  style={{
                    display: (this.adminType == 'super') || (this.authInPage.indexOf('articleStatusChange') != -1) ? 'inline-block' : 'none'
                  }}
                >{params.row.status == 'yes' ? '停用' : '启用'}</a>
                <a class="ib mr10"
                  onClick={() => {this.del(params)}}
                  style={{
                    display: (this.adminType == 'super') || (this.authInPage.indexOf('articleDel') != -1) ? 'inline-block' : 'none'
                  }}
                >删除</a>
                <a class="ib mr10"
                  onClick={() => {this.edit(params)}}
                  style={{
                    display: (this.adminType == 'super') || (this.authInPage.indexOf('articleUpt') != -1) ? 'inline-block' : 'none'
                  }}
                >编辑</a>
              </div>
            )
          }
        ],
        data: []
      }
    };
  },
  mounted() {
    const params = { siteId: this.$root.nowSite.id, type: "article" };
    this.getData({params});
  },
  methods: {
    getData(data) {
       this.$root.startTableLoading();
      articleList(data).then(res => {
        let {data,total} =res.data
        this.table.data = data;
        this.table.total=total
      });
    },
    edit(params) {
      this.$router.push({
        name: "addArtciles",
        params: { page: "edit" },
        query: { id: params.row.id }
      });
    },
    addArtciles() {
      this.$router.push({
        name: "addArtciles",
        params: { page: "create" }
      });
    },
    onChangeStatus(params) {
      let text, msg;
      const { status, id } = params.row;
      if (status === "yes") {
        text = `您确定停用吗？`;
        msg = `停用状态成功`;
      }
      if (status === "no") {
        text = `您确定启用吗？`;
        msg = `启用状态成功`;
      }
      const data = {
        siteId: this.$root.nowSite.id,
        id,
        status: status === "yes" ? "no" : "yes"
      };
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          articleStatusChange(data).then(res => {
            if (res.code == 200)
              params.row.status = status === "yes" ? "no" : "yes";
          });
        }
      });
    },
    del(params) {
      let msg = "删除成功";
      let text = "您确定要删除" + params.row.title + "吗？";
      const data = {
        siteId: this.$root.nowSite.id,
        id: params.row.id
      };
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          articleDel(data).then(res => {
            this.table.data.splice(params.index, 1);
          });
        }
      });
    },
    onPageChange(page){
      this.total = 0
      let data = {siteId:this.$root.nowSite.id,type:"article"}
      this.getData({params:data,query: { page}});
    },
    onPageSizeChange(pageSize){
      let data = {siteId:this.$root.nowSite.id,type:"article"}
      data.limit=pageSize
      this.getData({params:data})
    }
  }
};
</script>
<style scoped lang="less">
@import "../../../styles/button.less";
</style>
