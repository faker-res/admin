<template>
  <div>
    <Tables
      :page="table.page"
      :loading="$root.tableLoading"
      :value="table.data"
      :columns="table.columns"
      :total="table.total"
      :showSizer="true"
      @on-details="onDetails"
      @on-edit="edit"
      @on-delete="del"
      @on-change-status="onChangeStatus"
      @on-page-change="onPageChange"
      @on-page-size-change="onPageSizeChange"
    ></Tables>
    <Modals ref="ModalsDetial" title="走马灯详情" width="600">
      <div slot="content" class="modal-overflow" style="width:600px">
        <Form ref="formKey" :label-width="200">
          <FormItem label="消息标题：">{{poplist.title}}</FormItem>
          <FormItem label="起止时间："><span>{{$root.unixTime(poplist.publish_at)}}</span>--<span>{{$root.unixTime(poplist.offline_at)}}</span></FormItem>
          <FormItem label="文字内容：" :width="270">{{poplist.description}}</FormItem>
          <FormItem label="客户端：">{{poplist.client_type}}</FormItem>
          <FormItem label="状态：">{{poplist.status=="yes"?"正常":'停用'}}</FormItem>
          <FormItem label="更新时间：">{{$root.unixTime(poplist.updated_at)}}</FormItem>
          <FormItem label="创建时间：">{{$root.unixTime(poplist.created_at)}}</FormItem>
          <FormItem label="操作人：">{{poplist.who}}</FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "_c/tables";
import { borrowDataO } from "@/api/data";
import Modals from "@/components/modals";
import { getUserType } from '@/libs/util';
import {lanternList,lanternDetail,lanternDel,lanternStatusChange} from "@/api/system";
export default {
  name: "couse",
  components: {
    Tables,
    Modals
  },
  data() {
    return {
      adminType: getUserType(),
      auhtInPage: JSON.parse(localStorage.authInPage),
      table: {
        loading: true,
        total: 0,
        more: true,
        page: true,
        formKey: {},
        columns: [
          {
            title: "消息标题",
            key: "title",
            align: "center"
          },
          {
            title: "客户端",
            key: "client_type",
            align: "center"
          },
          {
            title: "开始时间",
            key: "publish_at",
            align: "center",
            render: (h, params) => {
              return <span class="pr20 pl20">{this.$root.unixTime(params.row.publish_at)}</span>;
            }
          },
          {
            title: "结束时间",
            key: "offline_at",
            align: "center",
            render: (h, params) => {
              return <span class="pr20 pl20">{this.$root.unixTime(params.row.offline_at)}</span>;
            }
          },
          {
            title: "操作人",
            key: "who",
            align: "center"
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              let color = params.row.status === "yes" ? "" : "#FF2626FF";
              return (
                <span style={{ color }}>
                  {params.row.status === "yes" ? "正常" : "停用"}
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
                      display: (this.adminType == 'super') || (this.auhtInPage.indexOf('lanternStatusChange') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.onChangeStatus(params)}}
                  >{params.row.status == 'yes' ? '停用' : '启用'}</a>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.auhtInPage.indexOf('lanternDetail') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.onDetails(params)}}
                  >详情</a>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.auhtInPage.indexOf('lanternUpt') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.edit(params)}}
                  >编辑</a>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.auhtInPage.indexOf('lanternDel') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.del(params)}}
                  >删除</a>
                </div>
              )
            }
          }
        ],
       
        data: []
      },
       poplist:{
           title:"",
           publish_at:"",
           offline_at:"",
           description:"",
           client_type:"",
           status:"",
           updated_at:"",
           created_at:"", 
           who:"",
      },
      pagesize:"",
    };
  },
  mounted() {
    const params={siteId:this.$root.nowSite.id,type:"lantern"} 
    params.startTime=this.$root.formatTimeS(this.$parent.Time[0])
    params.endTime=this.$root.formatnightTimeS(this.$parent.Time[1]);
    this.getcouseData({params});
  },
  methods: {
    getcouseData(data) {
      this.$root.startTableLoading(this);
      if(data.params.status=='all') delete data.params.status
      lanternList(data).then(res => {
       let {data,total} =res.data
        this.table.data = data;
        this.table.total=total
      });
    },
    // 编辑
    edit(params) {
      this.$router.push({
        name: "couseDetial",
        params: { page: "edit" },
        query:{id:params.row.id}
      });
    },
    //详情
    onDetails(params) {
      const data={id:params.row.id,siteId: this.$root.nowSite.id}
       lanternDetail(data).then(res=>{
         this.poplist=res.data
         this.$refs.ModalsDetial.show();
        
      })
    },
    del(params) {
     const data={id:params.row.id,siteId: this.$root.nowSite.id}
      this.$Tip.confirm({
        content: "您确定删除此走马灯吗？",
        onOk: () => {
            lanternDel(data).then(res=>{
              if(res.code == 200)   this.table.data.splice(params.index, 1);
            })
        }
      });
    },
    //改变状态
    onChangeStatus(params) {
      let text, msg;
      const {id,siteId,status} =params.row
      if (status === "yes") {
        text = `您确定停用吗？`;
        msg = `停用成功`;
      }
      if (status === "no") {
        text = `您确定启用吗？`;
        msg = `启用成功`;
      }
      const data={
          siteId,
          id,
          status:status=="yes"?'no':'yes'
      }
      this.$Tip.confirm({
        content: text,
        onOk: () => {
           lanternStatusChange(data).then(res=>{
              if(res.code == 200)  params.row.status = status === "yes" ? "no" : "yes"; 
           })
        }
      });
    },
    onPageChange(page){
      this.total = 0
      let data = { ...this.$parent.searchKey}
      data.siteId=this.$root.nowSite.id
      data.limit=this.pagesize
      data.type="lantern"
      if (this.$root.validateTime(this.$parent.Time)) {
      const [startTime, endTime] = this.$root.validateTime(this.$parent.Time);
      data.startTime = startTime && this.$root.formatTimeS(startTime);
      data.endTime = endTime && this.$root.formatnightTimeS(endTime);
      } else {  
        return false;
      }
       for (let key in data) {
        if (!data[key]) delete data[key];
      }
       this.getcouseData({ params: data, query: { page}})
    },
     onPageSizeChange(pageSize){
        this.pagesize=pageSize
        this.searchKey={...this.$parent.searchKey}
        this.searchKey.limit = pageSize
        this.searchKey.type='lantern'
        this.searchKey.siteId = this.$root.nowSite.id
        if (this.$root.validateTime(this.$parent.Time)) {
        const [startTime, endTime] = this.$root.validateTime(this.$parent.Time);
        this.searchKey.startTime = startTime && this.$root.formatTimeS(startTime);
        this.searchKey.endTime = endTime && this.$root.formatnightTimeS(endTime);
        } else {  
         return false;
       }
       for (let key in this.searchKey) {
           if (!this.searchKey[key]) delete this.searchKey[key];
        }
        this.getcouseData({params:this.searchKey});
    }
  }
};
</script>

<style scoped lang="less">
/deep/.ivu-form-item-content{width:270px;}
</style>