<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="标题">
          <Input v-model="searchKey.title" placeholder="输入标题关键字"/>
        </FormItem>
        <FormItem label="发件人">
          <Input v-model="searchKey.send_username" placeholder="输入发件人账号"/>
        </FormItem>
        <FormItem label="开始时间">
          <DatePicker type="date" placeholder="请选择日期" class="s-120" v-model="Time[0]"></DatePicker>
        </FormItem>
        <FormItem label="结束时间">
          <DatePicker type="date" placeholder="请选择日期" class="s-120" v-model="Time[1]"></DatePicker>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            class="search"
            :loading="$root.searchBtnLoading"
            @click="searchSubmit"
          >查询</Button>
        </FormItem>
      </Form>
    </div>
    <div>
      <Button class="ml5 w120x blue-font" @click="sendMessage()"
        v-if="(adminType == 'super') || (authInPage.indexOf('letterSend') != -1)"
      ><Icons type="fazhanneixin" size="14"></Icons>发站内信</Button>
      <Button class="ml5 w90x blue-font" v-if="(showComponent=='getEMail' && ((adminType == 'super') || (authInPage.indexOf('letterReply') != -1)))" @click="replyselect">回复选中</Button>
      <Button class="ml5 w90x blue-font" @click="deleselect">删除选中</Button>
    </div>
    <div>
      <div class="tab-titel">
        <span :class="showComponent === 'getEMail' ? 'active cs' : 'cs'" @click="eMail('getEMail')"
          v-if="(adminType == 'super') || (authInPage.indexOf('inBox') != -1)"
        >收件箱</span>
        <span :class="showComponent === 'sendEMail' ? 'active cs' : 'cs'" @click="eMail('sendEMail')"
          v-if="(admintype == 'super') || (authInPage.indexOf('outBox') != -1)"
        >发件箱</span>
      </div>
      <!-- <div class="tab">
        <component :is="showComponent" ref="component"></component>
      </div>-->
    </div>
    <Tables
      :page="table.page"
      :loading="$root.tableLoading"
      :value="table.data"
      :columns="table.columns"
      :total="table.total"
      :showSizer="true"
      @on-details="onDetails"
      @on-delete="del"
      @on-reply="reply"
      @on-selection-change="onSelectionChange"
      @on-page-change="onPageChange"
      @on-page-size-change="onPageSizeChange"
    ></Tables>

    <Modals ref="Modals" title="收件箱回复" width="620">
      <div slot="content" class="modal-overflow" style="width:620px">
        <Form ref="sendInfor" :model="sendInfor" :label-width="180" :rules="rules">
          <FormItem label="回复标题" prop="title">
            <Input class="w290x" v-model="sendInfor.title"/>
          </FormItem>
          <FormItem label="回复内容" prop="content">
            <Input
              class="w290x"
              type="textarea"
              placeholder="请输入内容(150字内)"
              :rows="4"
              v-model="sendInfor.content"
            />
          </FormItem>
          <FormItem>
            <Button class="ivu-btn send-close ft20" @click="close()">取消</Button>
            <Button class="ivu-btn send ft20" style="margin-left:145px" @click="send">发送</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
    <Modals ref="ModalsMessage" :title="titlemessg" width="480">
      <div slot="content" class="modal-overflow" style="width:400px">
        <Form ref="formKey" :label-width="95">
          <FormItem>
            <div>{{content}}</div>
          </FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "_c/tables";
import tableMixins from "@/mixins/table";
import Icons from "@/components/icons";
import { getUserType } from "@/libs/util";
import {
  inBox,
  letterDetail,
  letterDel,
  sendBox,
  letterUptRead,
  letterReply
} from "@/api/system";
import Modals from "@/components/modals";
export default {
  name: "mail",
  components: {
    Tables,
    Modals,
    Icons
  },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      rules: {
        content: [
          {
            required: true,
            message: "请输入回复内容",
            trigger: "blur",
            pattern: /.+/
          }
        ],
        title: [
          {
            required: true,
            message: "请输入回复标题",
            trigger: "blur",
            pattern: /.+/
          }
        ]
      },
      showComponent: "getEMail",
      Time: [this.$root.startTime(), this.$root.formatnightTimeS()],
      searchKey: {
        send_username: "",
        title: ""
      },
      table: {
        total: 0,
        more: true,
        page: true,
        loading: true,
        columns: [],
        data: []
      },
      sendInfor: {
        title: "",
        content: ""
      },
      sendtable: {
        loading: true,
        sendcolumns: [
          {
            type: "selection",
            title: "全选",
            width: 60,
            align: "center"
          },
          {
            title: "发件人",
            key: "send_username",
            align: "center"
          },
          {
            title: "收件人",
            key: "to_username",
            align: "center"
          },
          {
            title: "标题",
            key: "title",
            align: "center",
            tooltip: true
          },
          {
            title: "内容",
            key: "content",
            align: "center",
            tooltip: true
          },
          {
            title: "发送时间",
            key: "send_time",
            align: "center",
            render: (h, params) => {
              return <span class="pl20 pr20">{this.$root.unixTime(params.row.send_time)}</span>;
            }
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              return (
                <div>
                  <Icons
                    type={params.row.status == "yes" ? "yidu" : "weidu"}
                    color={params.row.status == "yes" ? "#B3B3B3" : "#57A3F3"}
                    size="20"
                  />
                </div>
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
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('letterDetail') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.onDetails(params)}}
                  >详情</a>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('letterDel') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.del(params)}}
                  >删除</a>
                </div>
              )
            }
          }
        ],
        getcolumns: [
          {
            type: "selection",
            title: "全选",
            width: 60,
            align: "center"
          },
          {
            title: "发件人",
            key: "send_username",
            align: "center"
          },
          {
            title: "标题",
            key: "title",
            align: "center",
            tooltip: true
          },
          {
            title: "内容",
            key: "content",
            align: "center",
            tooltip: true
          },
          {
            title: "收取时间",
            key: "created_at",
            align: "center",
            render: (h, params) => {
              return <span class="pl20 pr20">{this.$root.unixTime(params.row.created_at)}</span>;
            }
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              return (
                <div>
                  <Icons
                    type={params.row.status == "yes" ? "yidu" : "weidu"}
                    color={params.row.status == "yes" ? "#B3B3B3" : "#57A3F3"}
                    size="20"
                  />
                </div>
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
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('letterReply') != -1) ? 'inline-block' : "none"
                    }}
                    onClick={() => {this.reply(params)}}
                  >回复</a>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('letterDetail') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.onDetails(params)}}
                  >详情</a>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('letterDel') != -1) ? 'inline-block' : 'none'
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
      content: "",
      titlemessg: "",
      selectstatus: []
    };
  },
  created(){
      this.searchSubmit()
  },
  methods: {
    sendMessage() {
      this.$router.push({
        name: "sendMessage"
      });
    },
    //查询
    searchSubmit() {
      let params = { ...this.searchKey };
      params.siteId = this.$root.nowSite.id;
      if (this.$root.validateTime(this.Time)) {
        const [startTime, endTime] = this.$root.validateTime(this.Time);
        params.startTime = startTime && this.$root.formatTimeS(startTime);
        params.endTime = endTime && this.$root.formatnightTimeS(endTime);
      } else {
        return false;
      }
      for (let key in params) {
        if (!params[key]) delete params[key];
      }
      if (this.showComponent == "sendEMail") {
        this.getSendData({ params });
      } else {
        this.getData({ params });
      }
    },
    eMail(val) {
      this.showComponent = val;
      this.searchSubmit();
      // if(val=="sendEMail"){
      //       const params={siteId:this.$root.nowSite.id}
      //       this.getSendData({params})
      // }else{
      //       const params={siteId:this.$root.nowSite.id}
      //       this.getData({params})
      // }
    },
    // 删除单个
    del(params) {
      const { siteId, id } = params.row;
      this.$Tip.confirm({
        content:
          this.showComponent == "getEMail"
            ? "您确定删除此收件吗？"
            : "您确定删除此发件吗？",
        onOk: () => {
          letterDel({ siteId, ids: id.toString() }).then(res => {
            this.table.data.splice(params.index, 1);
          });
        }
      });
    },
    // 删除多个
    deleselect() {
      if (this.selectstatus.length > 0) {
        const params = {};
        let idArray = [];
        this.selectstatus.map(item => {
          idArray.push(item.id);
        });
        if (idArray.length > 1) params.ids = idArray.join(",");
        else params.ids = idArray[0];
        params.siteId = this.$root.nowSite.id;

        this.$Tip.confirm({
          content:
            this.showComponent == "getEMail"
              ? "您确定删除选中收件吗？"
              : "您确定删除选中发件吗？",
          onOk: () => {
            letterDel(params).then(res => {
              //  this.$Message.success("删除成功");
              //  this.table.data.splice(params.index, 1);
              if (this.showComponent == "getEMail") {
                const params = { siteId: this.$root.nowSite.id };
                this.getData({ params });
              } else {
                const params = { siteId: this.$root.nowSite.id };
                this.getSendData({ params });
              }
            });
          }
        });
      } else {
        this.$Message.success("请先选中");
      }
    },
    onDetails(params) {
      const { siteId, id, status } = params.row;
      letterDetail({ siteId, id }).then(res => {
        this.$refs.ModalsMessage.show();
        this.content = res.data.content;
        this.titlemessg = res.data.title;
        if (status == "no") {
          letterUptRead({ siteId, id }).then(res => {
            params.row.status = params.row.status == "yes" ? "no" : "yes";
          });
        }
      });
    },
    onSelectionChange(res) {
      this.selectstatus = [];
      this.selectstatus = res;
    },
    reply(params) {
      for (var key in this.sendInfor) {
        this.sendInfor[key] = "";
      }
      this.$refs.Modals.show();
      this.sendInfor.replyIds = params.row.id.toString();
      // if(this.selectstatus.length>0){
      //      this.selectstatus.map(item=>{
      //          if(item.id==params.row.id){
      //               for(var key in this.sendInfor){
      //                     this.sendInfor[key]=""
      //               }
      //               this.$refs.Modals.show();
      //               this.sendInfor.replyIds=params.row.id.toString()
      //          }else{
      //              this.$Message.success("请先选中");
      //          }
      //      })
      //  }else{
      //    this.$Message.success("请先选中");
      //  }
    },
    replyselect() {
      if (this.selectstatus.length > 0) {
        for (var key in this.sendInfor) {
          this.sendInfor[key] = "";
        }
        this.$refs.Modals.show();
        let selectid = [];
        this.selectstatus.map(item => {
          selectid.push(item.id);
        });
        if (selectid.length > 1) this.sendInfor.replyIds = selectid.join(",");
        else this.sendInfor.replyIds = selectid[0];
      } else {
        this.$Message.success("请先选中");
      }
    },
    send() {
      this.$refs.sendInfor.validate(valid => {
        if (valid) {
          const params = { ...this.sendInfor };
          params.siteId = this.$root.nowSite.id;
          letterReply(params).then(res => {
            if (res.code == 200) this.$refs.Modals.hide();
          });
        }
      });
    },
    getData(data) {
      this.$root.startTableLoading();
      this.table.columns = this.sendtable.getcolumns;
      inBox(data).then(res => {
        let { data, total } = res.data;
        this.table.data = data;
        this.table.total = total;
      });
    },
    getSendData(data) {
      this.$root.startTableLoading();
      this.table.columns = this.sendtable.sendcolumns;
      sendBox(data).then(res => {
        let { data, total } = res.data;
        this.table.data = data;
        this.table.total = total;
      });
    },
    onPageChange(page) {
      this.total = 0;
      this.searchKey.siteId = this.$root.nowSite.id;
      let data = { ...this.searchKey };
      if (this.$root.validateTime(this.Time)) {
        const [startTime, endTime] = this.$root.validateTime(this.Time);
        data.startTime = startTime && this.$root.formatTimeS(startTime);
        data.endTime = endTime && this.$root.formatnightTimeS(endTime);
      } else {
        return false;
      }
      for (let key in data) {
        if (!data[key]) delete data[key];
      }
      if (this.showComponent == "sendEMail") {
        this.getSendData({ params: data, query: { page } });
      } else {
        this.getData({ params: data, query: { page } });
      }
    },
    onPageSizeChange(pageSize) {
      this.searchKey.limit = pageSize;
      this.searchKey.siteId = this.$root.nowSite.id;
      if (this.$root.validateTime(this.Time)) {
        const [startTime, endTime] = this.$root.validateTime(this.Time);
        this.searchKey.startTime =
          startTime && this.$root.formatTimeS(startTime);
        this.searchKey.endTime =
          endTime && this.$root.formatnightTimeS(endTime);
      } else {
        return false;
      }
      for (let key in this.searchKey) {
        if (!this.searchKey[key]) delete this.searchKey[key];
      }
      if (this.showComponent == "sendEMail") {
        this.getSendData({ params: this.searchKey });
      } else {
        this.getData({ params: this.searchKey });
      }
    }
  },
  watch: {
    "$root.nowSite": {
      handler(val, oldVal) {
        this.searchSubmit();
      }
    },
  }
};
</script>
<style scoped lang="less">
.blue-font{border:1px solid #62B1FD}
.tab-titel {
  span {
    padding: 5px 20px 5px 20px;
    display: inline-block;
    background: #fff;
    margin-bottom: -1px;
    border: 1px solid #fff;
    border-bottom: 1px solid #eee;
    margin-left: 10px;
  }
  span.active {
    border: 1px solid #62B1FD;
    border-bottom: 1px solid #fff;
    color: #2D8CF0;
  }
  margin-top: 15px;
  border-bottom: 1px solid #eee;
}
.tab {
  padding-left: 10px;
  margin: 15px 0;
  width: 100%;
}
</style>