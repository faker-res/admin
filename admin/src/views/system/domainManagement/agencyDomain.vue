<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="网址">
          <Input v-model="searchKey.domain" placeholder="网址/邀请码" class="s-260" clearable/>
        </FormItem>
        <FormItem label="状态">
          <Select v-model="searchKey.status" class="s-100">
            <Option value="all">全部</Option>
            <Option value="no">停用</Option>
            <Option value="yes">正常</Option>
          </Select>
        </FormItem>
        <FormItem label="冻结状态">
          <Select v-model="searchKey.coldstatus" class="s-100">
            <Option value="all">全部</Option>
            <Option value="no">冻结</Option>
            <Option value="yes">正常</Option>
          </Select>
        </FormItem>
        <!-- <FormItem>
          <Checkbox v-model="searchKey.isLike">
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem>-->
        <FormItem label="代理账号">
          <Input class="s-160" v-model="searchKey.uname" placeholder="多个请以，逗号隔开"/>
        </FormItem>
        <FormItem>
          <Button @click="submit" class="search bg ml5" :loading="$root.searchBtnLoading">查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-button mt10">
      <Button @click="createDomain('single')"
        v-if="(adminType == 'super') || (authInPage.indexOf('agencyDomainAdd') != -1)"
      >添加单个域名</Button>
      <Button @click="createDomain('batch')"
        v-if="(adminType == 'super') || (authInPage.indexOf('agencyDomainAddBatch') != -1)"
      >批量添加大股东域名</Button>
    </div>
    <div class="v2-table">
      <Tables
        ref="tables"
        editable
        :columns="table.columns"
        :loading="$root.tableLoading"
        :value="table.data"
        :total="table.total"
      
        @on-change-frostStatus="statusChange"
        @on-change-frost="frostChange"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        :page-size-opts="table.pageSizeOpts"
        @on-edit="edit"
        @on-delete="del"
        @on-check-odds="checkOdds"
        @on-sort-change="sortChange"
      ></Tables>
    </div>
    <Modals :width="1000" ref="oddsDetails" title="赔率详情">
      <div slot="content" class="odds ml20">
        <ButtonGroup class="status-button">
          <Button
            @click="() => {this.type = 'rebate'}"
            :class="type == 'rebate' ? 'active' : ''"
            style="width:120px;height:30px"
          >彩票返点</Button>
          <Button
            @click="() => {this.type = 'refund'}"
            :class="type == 'refund' ? 'active' : ''"
            style="width:120px;height:30px"
          >返水信息</Button>
        </ButtonGroup>
        <div class="mt20">
          <Form ref="rebateInfo" style="width:960px;" v-show="type == 'rebate'">
            <FormItem class="b" v-for="(t,i) in agencyRebate" :key="i">
              <p class="f6f8-bg ti10">{{t.name}}</p>
              <div class="clearfix">
                <div class="fl w20 p10" v-for="(item,index) in t.list" :key="index">
                  <span>{{item.name}}：{{item.rebate}}%</span>
                </div>
              </div>
            </FormItem>
          </Form>
          <Form ref="refundInfo" style="width:960px;" v-show="type == 'refund'">
            <FormItem class="b" v-for="(t,i) in agencyRefund" :key="i">
              <p class="f6f8-bg ti10">{{t.name}}</p>
              <div class="clearfix">
                <div class="fl w20 p10" v-for="(item,index) in t.list" :key="index">
                  <span>{{item.name}}：{{item.value}}%</span>
                </div>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Modals from "@/components/modals";
import tableMixins from "@/mixins/table";
import { getUserType } from '@/libs/util';
import {
  agencyDomainList,
  agencyDomanUpStatus,
  agencyDomainDel,
  agencyDomainDetails
} from "@/api/agency";
import { sortInteraction } from "@/libs/util";
export default {
  name: "agencyDomain",
  mixins: [tableMixins],
  components: {
    Tables,
    Modals
  },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      page: 1, //点击删除数据返回第一页，页码没变
      agencyRebate: [], //点击赔率后对应的代理返水返点数据
      agencyRefund: {},
      type: "rebate",
      searchKey: {
        status: "all",
        coldstatus: "all",
        isLike: "0"
      },
      table: {
        total: 0,
        title: "代理域名",
        pageSizeOpts: [20, 30, 40, 50],
        data: [],
        columns: [
          {
            title: "代理账号",
            key: "userName",
            align: "center"
          },
          {
            title: "代理类型",
            key: "agent_type",
            align: "center",
            render: (h, params) => {
              const { agent_type } = params.row;
              let level = agent_type - 1;
              return <span>{level > 0 ? `${level}级代理` : "大股东"}</span>;
            }
          },
          {
            title: "网址",
            key: "domain",
            width: 200,
            align: "center",
            render: (h, params) => (
              <span>{this.$root.text(params.row.domain)}</span>
            )
          },
          {
            title: "邀请码",
            key: "agencyCode",
            align: "center",
            render: (h, params) => (
              <span>{this.$root.text(params.row.agencyCode)}</span>
            )
          },
          {
            title: "注册会员",
            key: "registered_count",
            align: "center"
          },
          {
            title: "创建日期",
            key: "created_at",
            align: "center",
            width: "170",
            render: (h, params) => (
              <span class="pl10 pr10">{this.$root.unixTime(params.row.created_at)}</span>
            )
          },
          {
            title: "运营模式",
            key: "run_model",
            align: "center"
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              const { agent_type, status } = params.row;
              let color = status === 'yes' ? "#515a6e" : "#FF2626";
              return (
                <span style={{ color }}>
                  {status === "yes" ? "正常" : "停用"}
                </span>
              );
            }
          },
          {
            title: "冻结",
            key: "frost",
            align: "center",
            render: (h, params) => {
              const { admin_status, agent_type } = params.row;
              let color = admin_status !== 0 ? "#FF2626" : "#515a6e";
              return (
                <span style={{ color }}>
                  {admin_status === 0 ? "正常" : "冻结"}
                </span>
              );
            }
          },
          {
            title: "操作",
            align: "center",
            width: "200",
            render: (h,params) => {
              return (
                <div>
                  <a class="ib mr10"
                    style={{
                      color: (params.row.agent_type - 1) > 0 ? '#2D8CF0' : '#918b8b',
                      display: (this.adminType == 'super') ||  (this.authInPage.indexOf('agencyDomainUpStatus') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.statusChange(params)}}
                  >{params.row.status == 'yes' ? '停用' : '启用'}</a>
                  <a class="ib mr10"
                    style={{
                      color: (params.row.agent_type - 1) > 0 ? '#2D8CF0' : '#918b8b',
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('agencyDomainUpStatus') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.frostChange(params)}}
                  >{params.row.admin_status == 1 ? '解冻' : '冻结'}</a>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('agencyDomainDetails') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => { this.checkOdds(params)}}
                  >赔率</a>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('agencyDomainUpdate') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.edit(params)}}
                  >编辑</a>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('agencyDomainDel') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.del(params)}}
                  >删除</a>
                </div>
              )
            },
            options: ["frostStatus", "frost", "odds", "edit", "delete"]
          }
        ]
      }
    };
  },
  methods: {
    // 查询
    submit() {
      this.$refs.tables.setPage();
      let data = { ...this.searchKey, siteId: this.$root.nowSite.id };
      this.getData({ params: data });
    },
    getData(data) {
      this.$root.startTableLoading(this);
      data.params.isLike = Number(data.params.isLike);
      agencyDomainList(data).then(res => {
        const { total, data } = res.data;
        this.table.total = total;
        this.table.data = data;
      });
    },
    onPageChange(page) {
      this.page = page;
      let data = { ...this.searchKey, siteId: this.$root.nowSite.id };
      this.getData({
        params: { ...data },
        query: { page }
      });
    },
    // 状态停启用
    statusChange(params) {
      const { status, id, agent_type } = params.row;
      let text = status === "yes" ? "您确定停用此网址吗" : "您确定启用此网址吗";
      if (agent_type - 1 > 0) {
        this.$Tip.confirm({
          content: text,
          onOk: () => {
            let data = {
              siteId: this.$root.nowSite.id,
              id,
              status: status === "yes" ? "no" : "yes"
            };
            agencyDomanUpStatus(data).then(res => {
              if (res.code == 200)
                if(typeof res.data === 'string'){
                  this.$Tip.hide()
                  this.$Message.config({
                      top: 150
                  })
                  this.$Message.success("操作成功！");
                  status === "yes"
                  ? (this.table.data[params.index].status = "no")
                  : (this.table.data[params.index].status = "yes");
                }
            });
          }
        });
      }
    },
    //  冻结与解冻
    frostChange(params) {
      const { agent_type, admin_status, id } = params.row;
      let text =
        admin_status === 1 ? "您确定解冻此网址吗" : "你确定冻结此网址吗";
      if (agent_type - 1 > 0) {
        this.$Tip.confirm({
          content: text,
          onOk: () => {
            let data = {
              siteId: this.$root.nowSite.id,
              id,
              coldstatus: admin_status === 1 ? 0 : 1
            };
            agencyDomanUpStatus(data).then(res => {
              if (res.code == 200)
                if(typeof res.data === 'string'){
                  this.$Tip.hide()
                  this.$Message.config({
                      top: 150
                  })
                  this.$Message.success("操作成功！");
                  admin_status === 0
                  ? (this.table.data[params.index].admin_status = 1)
                  : (this.table.data[params.index].admin_status = 0);
                }
            });
          }
        });
      }
    },
    // 编辑
    edit(params) {
      this.$router.push({
        name: "editDomain",
        params: { page: "edit" },
        query: { id: params.row.id }
      });
    },
    // 删除网址
    del(params) {
      const { row, index } = params;
      this.$Tip.confirm({
        content: "您确定删除此网址吗",
        onOk: () => {
          let data = {
            siteId: this.$root.nowSite.id,
            id: row.id
          };
          agencyDomainDel(data).then(res => {
            if (res.code == 200) {
              if(typeof res.data === 'string'){

                if (this.table.data.length == 1) {
                  //最后一页无数据 显示上一页
                  this.page--;
                }
                this.getData({
                  params: { ...this.searchKey, siteId: this.$root.nowSite.id },
                  query: { page: this.page }
                });
                this.$Tip.hide()
                this.$Message.config({
                    top: 150
                })
                this.$Message.success("删除成功！");
              }
            }
          });
        }
      });
    },
    // 点击查看赔率数据 返点格式处理
    setRebateData(data) {
      let nameList = [];
      let arr = [];
      data.forEach(item => {
        arr.push(item.className);
      });
      nameList = Array.from(new Set(arr));
      arr = [];
      for (let i in nameList) {
        arr[i] = {};
        arr[i].name = nameList[i];
        arr[i].list = data.filter(item => item.className == arr[i].name);
      }
      return arr;
    },
    // 点击赔率出现的弹窗
    checkOdds(params) {
      let data = {
        siteId: this.$root.nowSite.id,
        id: params.row.id
      };
      this.$refs.oddsDetails.show();
      this.$refs.oddsDetails.spinShow();
      agencyDomainDetails(data).then(res => {
        let { rebate, platform } = res.data;
        this.agencyRebate = this.setRebateData(rebate);
        this.agencyRefund = platform;
        this.$refs.oddsDetails.spinHide();
      });
    },
    sortChange(obj) {
      sortInteraction(obj);
    },
    // 点击添加域名
    createDomain(stage) {
      this.$router.push({
        name: "addDomain",
        params: { page: "add" },
        query: { stage }
      });
    },
    //获取行数据的详情
    getLotteryDetail(data) {
      agencyDomainDetails(data).then(res => {});
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../styles/button.less";
.ivu-form-item {
  &:nth-child(4) {
    margin-right: -5px;
  }
}
// 赔率框高度
.odds {
  max-height: 800px;
  overflow-y: auto;
}
</style>



