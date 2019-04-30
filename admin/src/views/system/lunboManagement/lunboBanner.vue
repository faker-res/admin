<template>
  <div>
    <div class="mt10 mb20">
      <Button class="w130x oldColor" @click="addLunbo"
        v-if="(adminType == 'super') || (authInPage.indexOf('slideIns') != -1)"
      >新增轮播图</Button>
    </div>
    <div class="v2-table">
      <Tables
        :page="false"
        :loading="$root.tableLoading"
        :value="table.data"
        :columns="table.columns"
        @on-look="onLook"
        @on-delete="del"
      ></Tables>
    </div>
  </div>
</template>
<script>
import Icons from "_c/icons";
import Tables from "_c/tables";
import Sortable from "sortablejs";
import { getlunboManagement, dellunboManagement , slideUpt} from "@/api/system";
import ViewImg from "./../components/ViewImg";
import { getUserType } from '@/libs/util';
export default {
  name: "lunboBanner",
  components: {
    Tables,
    Icons,
    ViewImg
  },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      table: {
        loading: true,
        columns: [
          {
            title: "排序",
            align: "center",
            render: (h, params) => {
              return h(Icons, {
                props: {
                  type: "paixukongjian",
                  color: "#dadada",
                  size: 20
                }
              });
            }
          },
          {
            title: "终端",
            key: "clientType",
            align: "center"
          },
          {
            title: "图片",
            key: "tupian",
            align: "center",
            minWidth: 350,
            render: (h, params) => {  
              let { body } = params.row;
              body = body && JSON.parse(body);
              console.log(55)
              return body.slice(0,10).map(item => {
                 console.log(66)
                return <ViewImg imgSrc={item.img}  />;
              });
            }
          },
          // {
          //   title: "上线时间",
          //   key: "publish_at",
          //   align: "center",

          // },
          // {
          //   title: "下线时间",
          //   key: "offline_at",
          //   align: "center",
          //   //   render: (h, params) => {
          //   //   return <span>{this.$root.unixTime(params.row.offline_at)}</span>;
          //   // }
          // },
          // {
          //   title: "创建时间",
          //   key: "created_at",
          //   align: "center",
          //   // render: (h, params) => {
          //   //   return <span>{this.$root.unixTime(params.row.created_at)}</span>;
          //   // }
          // },
          // {
          //   title: "状态",
          //   key: "status",
          //   align: "center",
          //   render: (h, params) => {
          //     const statu = params.row.status == "yes" ? true : false;
          //     return h('i-switch',{
          //         props:{
          //             value:statu
          //         },
          //         scopedSlots:{
			    //           	open:()=>h('span','开启'),
				  //             close:()=>h('span','停用')
          //         },
          //         on:{
          //             "on-change":(value)=>{
          //                  this.switch(params.row)
          //             }
          //         }
          //     })
          //   }
          // },
          {
            title: "操作",
            align: "center",
            render: (h,params) => {
              return (
                <div>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('slideUpt') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.onLook(params)}}
                  >查看</a>
                  <a class='ib mr10'
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('slideDel') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.del(params)}}
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
  watch: {
    "$root.nowSite.id": function(val, oldval) {
      this.getData();
    }
  },
  created() {
    this.getData();
    this.$nextTick(() => {
      const tbody = document.querySelector(".ivu-table-tbody");
      Sortable.create(tbody, {});
    });
  },
  methods: {
    //新增轮播图
    getData() {
      const data = { siteId: this.$root.nowSite.id };
      getlunboManagement(data).then(res => {
        this.table.data = res.data.data;
        console.log(this.table.data)
      });
    },
    addLunbo() {
      this.$router.push({
        name: "lunboEdit",
        params: { page: "create" }
      });
    },
    //编辑
    onLook(params) {
      const { id } = this.$root.nowSite;
      const { promotionId } = params.row;
      this.$router.push({
        name: "lunboEdit",
        params: { page: "edit" },
        query: { siteId: id, promotionId }
      });
    },
    // 删除
    del(params) {
      const data = {
        promotionId: params.row.promotionId,
        siteId: this.$root.nowSite.id
      };
      let msg = "删除成功";
      this.$Tip.confirm({
        content: `你确定要删除吗？`,
        onOk: () => {
          dellunboManagement(data).then(res => {
            this.table.data.splice(params.index, 1);
          });
        }
      });
    },
  //  switch(index){
  //       const {siteId,promotionId,status}=index
  //       const data={
  //           siteId,
  //           promotionId,
  //           status:status=="yes"? "no":"yes"
  //       }
  //       slideUpt(data,123).then(res=>{
  //       })
  //  }
  }
};
</script>
<style lang="less" scoped>

// /deep/.ivu-modal-wrap{
//      z-index: 1020;
//     position: fixed;
//     overflow: auto;
//     top: 0;
//     right: 0;
//     bottom: 0;
//     left: 0;
//     background-color: #ff0;
//     /deep/.ivu-modal{
//            top: 50% !important;
//            background-color:red;
//     }
// }
.ivu-modal{  
  background-color:red;
}
</style>