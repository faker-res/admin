<template>
  <div class="cmg-v2-table" v-if="(adminType == 'super') || (authInPage.indexOf('companyBankCardList') != -1)">
    <Tables
      ref="tables"
      editable
      :columns="table.columns"
      :loading="$root.tableLoading"
      :value="table.data"
      :total="table.total"
      :draggable="true"
      @on-delete="onDelete"
      @on-edit="onEdit"
      :pageSizeOpts="table.pageSizeOpts"
      @on-page-change="onPageChange"
      @on-page-size-change="onPageSizeChange"
      @on-change-status="changeStatus"
      @on-drag-drop="onDragDrop"
      :more="table.more"
    ></Tables>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Icons from "@/components/icons";
// import Sortable from "sortablejs";
import { getUserType } from '@/libs/util';
import {
  companyBankCardSequence,
  companyBankCardListData,
  companyBankCardModifyStatusData,
  companyBankCardDelete
} from "@/api/finance";
export default {
  props: ["title"],
  components: { Tables, Icons },
  data() {
    return {
      countPage:"",
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      searchkey: {
        siteId: this.$root.nowSite.id
      },
      limit: 20,
      table: {
        total: 0,
        title: "入款卡管理",
        // loading: true,
        pageSize:20,
        pageSizeOpts: [20, 30, 40, 50],
        columns: [
          {
            title: "排序",
            key: "sort",
            align: "center",
            render: (h, params) => (
              <Icons type="paixukongjian" color="#dadada" size="20" />
            ),
            width:70
          },
          {
            title: "银行名称",
            key: "bankName",
            align: "center",
            width: 80
          },
          {
            title: "银行卡号",
            key: "cardNum",
            align: "center",
            width: "180"
          },
          {
            title: "银行归属地",
            key: "cardAddress",
            align: "center"
          },
          {
            title: "开放等级",
            key: "levelAlias",
            align: "center",
            width: 200,
            render:(h,params)=>{
              if(params.row.levelAlias.length>10){
                 
              } return (
           
                <Tooltip max-width="200" placement="right-start">
                  <div style="margin-left:20px;margin-right:20px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:150px">
                    <span class=" ib" >{params.row.levelAlias}</span>
                  </div>
                  <div slot="content">
                    <span>{params.row.levelAlias}</span>
                  </div>
                </Tooltip>
            )
            if(params.row.levelAlias.length<10){
              <Tooltip max-width="155" >
                   <div>
                    <span>{params.row.levelAlias}</span>
                  </div>
                  <div slot="content">
                    <span>{params.row.levelAlias}</span>
                  </div>
              </Tooltip>
            }
            }
          },
          {
            title: "开放终端",
            key: "terminal",
            align: "center"
          },
          {
            title: "存款金额",
            key: "depositAmount",
            align: "center",
            render: (h, params) => {
              return (
                <div>
                  {params.row.depositAmount}/{params.row.depositCount}笔
                </div>
              );
            }
          },
          {
            title: "创建时间",
            key: "addTime",
            align: "center",
            width: 180,
            render: (h, params) => (
              <span class="ml10 mr10">{this.$root.unixTime(params.row.addTime)}</span>
            )
          },
          {
            title: "创建人",
            key: "addUserName",
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
                    color: status === "yes" ? "" : "#ff2626"
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
            render: (h,params) => {
              return (
                <div>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('companyBankCardModifyStatus') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.changeStatus(params)}}
                  >{params.row.status == 'yes' ? '停用' : '启用'}</a>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('companyBankCardUpdate') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.onEdit(params)}}
                  >编辑</a>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('companyBankCardDelete') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.onDelete(params)}}
                  >删除</a>
                </div>
              )
            }
          }
        ],
        data: []
      }
    };
  },
  mounted() {
    this.getData({ params: { siteId: this.$root.nowSite.id } });
    // this.rowDrop();
  },
  methods: {
    onDragDrop(oldIndex, newIndex){

       const params = {
        current_id: this.$refs.tables.insideTableData[oldIndex].id,
        neighbor_id:this.$refs.tables.insideTableData[newIndex].id,
        siteId: this.$root.nowSite.id,
        type: +oldIndex > +newIndex ? 'up' : 'down'
      }
      companyBankCardSequence(params).then(res=>{
         this.getData({params})
      })


    },
    getQuery(params) {
      this.searchkey = {
        siteId: this.$root.nowSite.id,
        status: params.status,
        levelLabel: params.levelLabel,
        limit: this.limit
      };
      let data = { params: this.searchkey}
      this.getData(data)
    },
    getData(data) {
      this.$root.startTableLoading();
      companyBankCardListData(data).then(res => {
        const { data, total } = res.data;
        this.table.data = data;
        this.table.total = total;
        this.pageUrl = res.data.last_page_url;
        this.table.data.forEach(item => {
          if (item.status == "enabled") {
            item.status = "yes";
          } else {
            item.status = "no";
          }
        });
      });
    },
    // 修改状态
    changeStatus(params) {
      let text, msg;
      const { bankName, id, status } = params.row;
      if (status === "yes") {
        text = `您确定停用${bankName}吗？`;
        msg = `停用成功${bankName}`;
      }
      if (status === "no") {
        text = `您确定启用${bankName}吗？`;
        msg = `启用成功${bankName}`;
      }
      const data = {
        siteId: this.$root.nowSite.id,
        id,
        status: status === "yes" ? "no" : "yes"
      };
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          let origin = this.table.data[params.index].status;
          companyBankCardModifyStatusData(data).then(res => {
            if (res.code == 200)
              if (typeof res.data === 'string') {
                  this.$Tip.hide()
                  this.$Message.config({
                    top: 150
                  })
                  this.$Message.success("操作状态成功！");
                  this.table.data[params.index].status =
                  this.table.data[params.index].status === "yes" ? "no" : "yes";
                }

          });
        }
      });
    },
    // 银行卡管理删除
    onDelete(params) {
      let text = `您确定删除${params.row.bankName}吗？`;
      let msg = `删除${params.row.bankName}成功`;
      const data = {
        id: params.row.id,
        siteId: this.$root.nowSite.id
      };
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          companyBankCardDelete(data).then(res => {
            if (res.code == 200)
              if(typeof res.data === 'string'){
                this.$Tip.hide()
                this.$Message.config({
                  top: 150
                })
                this.$Message.success("删除成功！");
                this.table.data.splice(params.index, 1);
                 let page=this.countPage
                this.getData({params:data,query:{page}})
              }

          });
        }
      });
    },
    onEdit(params) {
      const {
        bankName,
        cardNum,
        cardName,
        cardAddress,
        terminal,
        levelAlias,
        status,
        id,
        addUserName,
        levelLabel
      } = params.row;
      this.$router.push({
        name: "bankCardEdit",
        params: { page: "edit" },
        //传编辑的参数
        query: {
          bankName,
          cardNum,
          cardName,
          cardAddress,
          terminal,
          levelAlias,
          status,
          id,
          addUserName,
          levelLabel
        }
      });
    },
    //点击分页
    onPageChange(page) {
      this.countPage=page
      let data = {
        params: {
          ...this.searchkey,
         limit:  this.pageSize,
        }
      , query: { page }}
      this.getData(data)
    },
    onPageSizeChange(pageSize){
      console.log(pageSize)
      this.limit = pageSize
      this.getData({ params: {
        limit:pageSize,
        siteId: this.$root.nowSite.id ? this.$root.nowSite.id :this.$parent.$root.nowSite.id ,
      }})
      this.pageSize = pageSize
    }
  }
};
</script>

<style lang="less" scoped>
.cmg-v2-table {
  /deep/thead {
    th {
      .ivu-table-cell {
        span {
          font-size: 16px;
          font-weight: normal;
        }
      }
    }
  }
}


/deep/.ivu-table-wrapper{
   overflow: visible;
}
</style>
