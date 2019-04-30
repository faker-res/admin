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
    <Modals ref="ModalsDetial" title="公告详情" width="480">
      <div slot="content" class="modal-overflow" style="width:480px">
        <Form ref="formKey" :label-width="150">
          <FormItem label="公告标题：">{{poplist.title}}</FormItem>
          <FormItem label="起止时间：">
            <span>{{$root.unixTime(poplist.publish_at)}}</span>--
            <span>{{$root.unixTime(poplist.offline_at)}}</span>
          </FormItem>
          <FormItem
            label="弹跳位置："
          >{{poplist.bounce_location=="1"?'登录前':(poplist.bounce_location=='2'?"登录后":"不限制")}}</FormItem>
          <FormItem label="出现位置：">{{poplist.appears_location =="1" ? "首页" : (poplist.appears_location=="2" ? "游戏页":(poplist.appears_location=="2,1"? "游戏页,首页":"首页,游戏页"))}}</FormItem>
          <FormItem label="编辑内容：" v-if="poplist.description"><span v-html="poplist.description"></span></FormItem>
          <FormItem label="pc：" v-if="poplist.pc_pic"><view-img :imgSrc='poplist.pc_pic'></view-img></FormItem>
          <FormItem label="手机端："v-if="poplist.mob_pic"><view-img :imgSrc='poplist.mob_pic'></view-img></FormItem>
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
import {
  popupsList,
  popupsDetail,
  popupsDel,
  popupsStatusChange
} from "@/api/system";
import Modals from "@/components/modals";
import ViewImg from "../../components/ViewImg"
import { getUserType } from '@/libs/util';
import Tables from "_c/tables";
export default {
  name: "noticePop",
  components: {
    Tables,
    Modals,
    ViewImg
  },
  data() {
    return {
      adminType: getUserType(),
      authInPage:  JSON.parse(localStorage.authInPage),
      table: {
        total: 0,
        more: true,
        page: true,
        loading: true,
        columns: [
          {
            title: "公告标题",
            key: "title",
            align: "center"
          },
          {
            title: "弹跳位置",
            key: "bounce_location",
            align: "center",
            render: (h, params) => {
              return (
                <span>
                  {params.row.bounce_location == 1
                    ? "登录前"
                    : params.row.bounce_location == 2
                    ? "登录后"
                    : "不限制"}
                </span>
              );
            }
          },
          {
            title: "出现位置",
            key: "appears_location",
            align: "center",
            render: (h, params) => {
              return (
                <span>
                  {params.row.appears_location =="1" ? "首页" : (params.row.appears_location=="2" ? "游戏页":(params.row.appears_location=="2,1"? "游戏页,首页":"首页,游戏页"))}
                </span>
              );
            }
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
              return (
                <span class={params.row.status === "yes" ? "" : "red-font"}>
                  {params.row.status === "yes" ? "正常" : "停用"}
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
                  style={{
                    display: (this.adminType == 'super') || (this.authInPage.indexOf('popupsStatusChange') != -1) ? 'inline-block': 'none'
                  }}
                  onClick={() => {this.onChangeStatus(params)}}
                >{params.row.status=='yes' ? '停用' : '正常'}</a>
                <a class="ib mr10"
                  style={{
                    display: (this.adminType == 'super') || (this.authInPage.indexOf('popupsDetail') != -1) ? 'inline-block' : 'none'
                  }}
                  onClick={() => {this.onDetails(params)}}
                >详情</a>
                <a class="ib mr10"
                  style={{
                    display: (this.adminType == 'super') || (this.authInPage.indexOf('popupsUpt') != -1) ? 'inline-block' : 'none'
                  }}
                  onClick={() => {this.edit(params)}}
                >编辑</a>
                <a class="ib mr10"
                  style={{
                    display: (this.adminType == 'super') || (this.authInPage.indexOf('popupsDel') != -1) ? 'inline-block' : "none"
                  }}
                  onClick={() => {this.del(params)}}
                >删除</a>
              </div>
            )
          }
        ],
        data: []
      },
      poplist: "",
      pagesize:"",
    };
  },
  mounted() {
    const params = { siteId: this.$root.nowSite.id, type: "popups" };
    params.startTime=this.$root.formatTimeS(this.$parent.Time[0])
    params.endTime=this.$root.formatnightTimeS(this.$parent.Time[1]);
    this.getData({params});
  },
  methods: {
    getData(data) {
      this.$root.startTableLoading(this);
      if(data.params.status=='all') delete data.params.status
      popupsList(data).then(res => {
        let {data,total} =res.data
        this.table.data = data;
        this.table.total=total
      });
    },
    //  编辑
    edit(params) {
      this.$router.push({
        name: "noticeDetial",
        params: { page: "edit" },
        query: { id: params.row.id }
      });
    },
    //详情
    onDetails(params) {
      const data = { id: params.row.id, siteId: this.$root.nowSite.id };
      popupsDetail(data).then(res => {
        this.poplist = res.data;
        this.$refs.ModalsDetial.show();
      });
    },
    del(params) {
      const data = { id: params.row.id, siteId: this.$root.nowSite.id };
      this.$Tip.confirm({
        content: "您确定删除此公告吗？",
        onOk: () => {
          popupsDel(data).then(res => {
            if(res.code == 200) this.table.data.splice(params.index, 1)
          });
        }
      });
    },
    //正常停用
    onChangeStatus(params) {
      let text, msg;
      const { id, siteId, status } = params.row;
      if (status === "yes") {
        text = `您确定停用吗？`;
        msg = `停用成功`;
      }
      if (status === "no") {
        text = `您确定启用吗？`;
        msg = `启用成功`;
      }
      const data = {
        siteId,
        id,
        status: status == "yes" ? "no" : "yes"
      };
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          popupsStatusChange(data).then(res => {
            if(res.code == 200)  params.row.status = status === "yes" ? "no" : "yes"
          });
        }
      });
    },
    onPageChange(page){
      this.total = 0
      let data = { ...this.$parent.searchKey}
      data.siteId=this.$root.nowSite.id
      data.limit = this.pagesize
      data.type="popups"
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
       this.getData({ params: data, query: { page}})
    },
    onPageSizeChange(pageSize){
        this.pagesize=pageSize
        this.searchKey={...this.$parent.searchKey}
        this.searchKey.limit = pageSize
        this.searchKey.type='popups'
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
        this.getData({params:this.searchKey});
    }
  }
};
</script>
