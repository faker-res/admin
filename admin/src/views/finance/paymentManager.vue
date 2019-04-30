<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <Button class="cardNutton mr20" @click="$router.push({path:'paymentAdd'})"
          v-if="(adminType == 'super') || (authInPage.indexOf('paymentChannelCreate') != -1)"
        >添加支付平台</Button>
        <Button class="cardNutton" @click="$router.push({path:'paymentGroups'})">支付方式</Button>
        <FormItem label="支付方式">
          <Select clearable v-model="searchKey.typeId" class="s-140" placeholder="全部">
            <Option v-for="(item,i) in payWay" :key="i" :value="item.id">{{item.className}}</Option>
          </Select>
        </FormItem>
        <FormItem label="支付平台">
          <Select clearable v-model="searchKey.payName" class="s-140" placeholder="全部">
            <Option v-for="(item,i) in payList" :key="i" :value="item.payName">{{item.payName}}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            class="search"
            :loading="$root.searchBtnLoading"
            @click="searchSubmit"
          >查询</Button>
        </FormItem>
        <FormItem></FormItem>
      </Form>
    </div>
    <div class="mb20">
      <ButtonGroup class="status-button">
        <Button :class="status ? 'active' : ''" @click="statusOn">正常</Button>
        <Button :class="status ? '' : 'active'" @click="statusOff">停用</Button>
      </ButtonGroup>
    </div>
    <div class="v2-table">
      <Tables
        v-if="status"
        :columns="table.columns"
        :loading="$root.tableLoading"
        :value="table.data"
        :total="table.total"
        @on-edit="edit"
        @on-change-status="changeStatus"
        @on-page-change="onPageChange"
        :pageSizeOpts="table.pageSizeOpts"
        @on-page-size-change="onPageSizeChange"
        @on-delete="deletei"
      ></Tables>

      <Tables
        v-else
        :columns="table.columns"
        :loading="$root.tableLoading"
        :value="table.data"
        :total="table.total"
        @on-edit="edit"
        @on-page-change="onPageChange"
        @on-change-status="changeStatus"
        :pageSizeOpts="table.pageSizeOpts"
        @on-page-size-change="onPageSizeChange"
        @on-delete="deletei"
      ></Tables>
    </div>
    <Modals ref="paymentModifyModal" title="支付修改">
      <div slot="content" class="modal-overflow">
        <Form ref="paymentModifyForm" :model="paymentModifyForm" :label-width="300">
          <FormItem label="支付平台">
            <span class="ft14">{{payform.payName}}</span>
          </FormItem>
          <FormItem label="支付方式">
            <div class="ml5">
              <paymentRadio
                style="width:360px;"
                :methodsdetail="paymentlist"
                :defaultChecked="methodsid"
                @sendArray="getArray"
                ref="payment"
              ></paymentRadio>
            </div>
          </FormItem>
          <!-- <FormItem class="ml5" label="银行编码" v-if="showID" prop="bankCode">
            <Input
              class="w360x ml10"
              :rows="4"
              type="textarea"
              placeholder="请输入银行编码"
              v-model="platform.bankCode"
            />
          </FormItem> -->
          <FormItem>
            <Button type="primary" class="ivu-btn submit ml40" @click="save">确认保存</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Icons from "@/components/icons";
import paymentRadio from "./components/payment-radio-group";
import Modals from "@/components/modals";
import tableMixins from "@/mixins/table";
import Sortable from "sortablejs";
import { getUserType } from '@/libs/util';
import {
  paymentManagerData,
  changpaymentstatus,
  deletepayment,
  updatepayment,
  getpaymentID,
  getpaymentName
} from "@/api/finance";
export default {
  // name: "paymentManager",
  mixins: [tableMixins],
  components: {
    Tables,
    Modals,
    Icons,
    paymentRadio
  },
  // computed() {
    
  // },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      searchKey: {
         status: "yes"
      },
      platform: {
        bankCode: ""
      },
      payform: "",
      flag: false,
      newplatdata: "",
      showID: false,
      paymentInfo: {
        id: "",
        siteId: "",
        siteName: "",
        classId: "",
        payName: "",
        status: "yes",
        businessNo: "",
        redirect_domain: "",
        remarks: "",
        queryName: ""
      },
      payWay: "", //支付方式
      pageSize:"",
      payList: [], //支付平台
      buttonText: "确认添加",
      insideColumns: "",
      detailData: {},
      paymentForm: { b: [] },
      status: true,
      modalTitle: "支付修改",
      paymentModifyForm: {},
      paymentlist: [],
      methodsid: [],
      table: {
        loading: true,
        total: 0,
        pageSizeOpts: [20, 30, 40, 50],
        columns: [
          {
            title: "排序",
            align: "center",
            width: 60,
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
            title: "商户编号",
            key: "businessNo",
            align: "center"
          },
          {
            title: "支付平台",
            key: "payName",
            align: "center"
          },
          {
            title: "支付方式",
            key: "paymentClass",
            align: "center",
            render: (h, params) => {
              return params.row.paymentClass
                ? params.row.paymentClass.length
                  ? params.row.paymentClass.map(item => {
                      return h(
                        "div",
                        {
                          style: {
                            color: "#666666"
                            // borderBottom: "1px solid #dcdcdc"
                          }
                        },
                        item.name
                      );
                    })
                  : h("span", "-")
                : h("span", "-");
            }
          },
          {
            title: "支付金额",
            key: "paymentClass",
            align: "center",
            render: (h, params) => {
              return params.row.paymentClass
                ? params.row.paymentClass.length
                  ? params.row.paymentClass.map(item => {
                      return h(
                        "div",
                        {
                          style: {
                            color: "#666666"
                          }
                        },
                        item.amount_limit
                      );
                    })
                  : h("span", "-")
                : h("span", "-");
            }
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
            render: (h,params) => {
              return (
                <div>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('paymentChannelModifyStatus') != -1) ? 'inline-block' : "none"
                    }}
                    onClick={() => {this.changeStatus(params)}}
                  >{params.row.status == 'yes' ? '停用' : '启用'}</a>
                  <a class="ib mr10"
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('paymentChannelUpdate') != -1) ? 'inline-block' : 'none'
                    }}
                    onClick={() => {this.edit(params)}}
                  >编辑</a>
                  <a class="in mr5"
                    onClick={() => {this.deletei(params)}}
                    style={{
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('paymentChannelDelete') != -1) ? 'inline-block' : "none"
                    }}
                  >删除</a>
                  <a class="in mr5"
                    style={{
                      color: "#62B1FD",
                      cursor: "pointer",
                      marginLeft: "5px",
                                  display: (this.adminType == 'super') || (this.authInPage.indexOf('paymentChannelUpdate') != -1) ? 'inline-block' : "none"
                           

                    }}
                    onClick={() => {
                      this.platform.bankCode=params.row.bankCode
                        this.payform = params.row;
                        this.methodsid = [];
                        this.paymentlist = [];
                        this.platform.bankCode=params.row.bankCode
                        this.payform = params.row;
                        params.row.paymentClass.map(item => {
                          this.methodsid.push(item.id);
                          this.paymentlist.push(item);
                          if (item.name == "网银在线") this.showID = true;
                          else this.showID = false;
                        });
                        if (this.methodsid.length > 0) {
                          this.$refs.paymentModifyModal.show();
                        }
                    }}
                  >支付修改</a>
                </div>
              )
            }
          }
        ],
        data: []
      }
    };
  },
  created() {
    if(this.$route.query.status){
       this.searchKey.status=this.$route.query.status  
       this.status = this.$route.query.status== "yes" ? true : false
    }
    this.getselectdata();
    this.getselectlist();
  },
  mounted() {
    this.rowDrop();
  },
  methods: {
    //获取支付平台下拉列表平台
    getselectlist() {
      getpaymentName({ siteId: this.$root.nowSite.id }).then(res => {
        this.payList = res.data;
      });
    },
    getQuery(params) {
      this.searchkey = {
        siteId: this.$root.nowSite.id,
        status: params.status,
        levelLabel: params.levelLabel
      };
      let data = { params: this.searchkey}
      this.getData(data)
    },
    getData(data) {
      let params = {
        ...data
      }
      
      this.$root.startTableLoading();
      paymentManagerData(data).then(res => {
        console.log(res.data.data);
        
        this.table.data = res.data.data;
        this.table.total = res.data.total;
      });
    },
    //修改状态
    changeStatus(params) {
      let text, msg;
      const { status, id, payName } = params.row;
      if (status === "yes") {
        text = `您确定停用${payName}吗？`;
        msg = `停用成功${payName}`;
      }
      if (status === "no") {
        text = `您确定启用${payName}吗？`;
        msg = `启用成功${payName}`;
      }

      const data = {
        siteId: this.$root.nowSite.id,
        id,
        status: status === "yes" ? "no" : "yes"
      };
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          changpaymentstatus(data).then(res => {
            console.log(data)
            if (res.code == 200) {
                if (typeof res.data === 'string') {
                  this.$Tip.hide()
                  this.$Message.config({
                    top: 150
                  })
                  this.$Message.success({content:msg})
                  
                  params.row.status = status === "yes" ? "no" : "yes";
                  // this.table.data.splice(params.index, 1);
              
                  // console.log(this.setPage)
                  // let newPage=this.setPage
                  // console.log(newPage)
                  // let  a ={...this.searchKey}
                  // console.log(a)
                  // console.log(this.searchKey)
                  // let  page =this.page
                  // this.searchSubmit({query:newPage})
                  //  this.searchSubmit({query:{page}})
                  // this.getData({params: data,query:{page}})
                }
            }
          });
        }
      });
    },
    //编辑
    edit(params) {
      this.$router.push({
        name: "paymentEdit",
        query: {
          id: params.row.id
        }
      });
    },
    // 删除
    deletei(params) {
      const data = { id: params.row.id, siteId: this.$root.nowSite.id };
      let text = "您确定删除" + params.row.payName + "吗？";
      let msg = `删除${params.row.payName}成功`;
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          deletepayment(data).then(res => {
            let a={...this.searchKey}
            console.log(a)
            if (res.code == 200) {
              this.table.total--
              this.table.data.splice(params.index, 1);
              //  this.getData({params:data})
              // this.searchSubmit({query:newPage});
            }
          });
        }
      });
    },
    //切换 正常状态下
    statusOn() {
      this.status = true;
      const params = { siteId: this.$root.nowSite.id, status: "yes", limit: this.pageSize, classId: this.searchKey.typeId };
      this.getData({ params });
    },
    //切换 停用状态下
    statusOff() {
      this.status = false;
      const params = { siteId: this.$root.nowSite.id, status: "no" , limit: this.pageSize, classId: this.searchKey.typeId };
      this.searchSubmit()
    },
    //拖拽排序
    rowDrop() {
      const tbody = document.querySelector(".ivu-table-tbody");
      Sortable.create(tbody, {});
    },
    //支付修改的确认保存
    save() {
      let params = { ...this.newplatdata, payName: "" };
      params.siteId = this.$root.nowSite.id;
      params.id = this.payform.id;
      params.payName = this.payform.payName;
      params.siteName = this.$root.nowSite.siteName;
      let classIds = [];
      params.newarray.map(item => {
        classIds.push(item.id);
      });
      if (classIds.length > 1) params.classId = classIds.join(",");
      else params.classId = classIds[0];

      delete params.newarray;
      params.formatAmount = JSON.stringify(params.formatAmount);
      params.limitAmount = JSON.stringify(params.limitAmount);
      params.bankCode = this.platform.bankCode;
      let mess=false;
      let limitmess=false;
      if (params.formatAmount == "{}") {
        delete params.formatAmount;
      }else{
         let format;
         format=Object.values(JSON.parse(params.formatAmount))
         format.forEach(item=>{
             if(item.formatAmount==null){
                this.$Tip.info({ content: "请输入固定金额" });
                 mess=true
                return false
             }
         })
      }
      if (params.limitAmount == "{}") {
        delete params.limitAmount;
      }else{
         let limitdata;
         limitdata=Object.values(JSON.parse(params.limitAmount))
         limitdata.forEach(item=>{
             if(item.maxAmount==null||item.minAmount==null){
                  this.$Tip.info({ content: "请输入单笔金额" });
                  limitmess=true
                   return false
             }
             if(Number(item.maxAmount)<= Number(item.minAmount)){
                   this.$Tip.info({ content: "单笔上限必须大于单笔下限" });
                   limitmess=true
                   return false
             }
         })
      }
      if(mess||limitmess){
            return false
      }
      updatepayment(params).then(res => {
        if (res.code == 200) {
          this.$refs.paymentModifyModal.hide();
          this.$Tip.success({
            content: "支付修改成功",
            onOk: () => {
              // const params = { siteId: this.$root.nowSite.id,status:params.row.status};
              // this.getData({ params });
              this.searchSubmit()
            }
          });
        }
      });
    },
    //获取支付方式组件的选中值
    getArray(data) {
      this.newplatdata = data;
      console.log(this.newplatdata)
      if (this.newplatdata.newarray.length == 0) {
        this.showID = false;
      }
      this.newplatdata.newarray.map(item => {
        if (item.className == "网银在线") this.showID = true;
      });
    },
    //查询
    searchSubmit() {
      // 正常状态
      if (this.status == true) {
        let status = this.status ? "yes" : "no";
        const params = {
          classId: this.searchKey.typeId,
          siteId: this.$root.nowSite.id,
          payName: this.searchKey.payName,
          status: status,
          limit: this.pageSize
        };
        this.getData({ params });
               
      }

      //停用状态
      if (this.status == false) {
        let status = this.status ? "yes" : "no";
        const params = {
          classId: this.searchKey.typeId,
          siteId: this.$root.nowSite.id,
          payName: this.searchKey.payName,
          status: status,
          limit: this.pageSize
        };

        
        this.getData({ params });
      }
    },
    // 获取支付方式下拉框
    getselectdata() {
      const params = {classType: "payment"};
      getpaymentID(params).then(res => {
        this.payWay = res.data;
      });
    },
    //点击分页
    onPageChange(page) { 
      console.log(page)
      this.setPage=page;
      const params = {
        ...this.$parent.searchKey,
        classId: this.searchKey.typeId,
        siteId: this.$root.nowSite.id,
        payName: this.searchKey.payName,
        status: this.status ? "yes" : "no",
        limit:  this.pageSize,
      }
      this.getData({ params: params, query: { page } });
    },
    onPageSizeChange(pageSize){
      const params = {
        ...this.$parent.searchKey,
        classId: this.searchKey.typeId,
        siteId: this.$root.nowSite.id,
        payName: this.searchKey.payName,
        status: this.status ? "yes" : "no",
        limit:pageSize,
      }

      this.getData({ params: params})
      this.pageSize = pageSize
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
.box {
  border: 1px solid #eaeaea;
  > span {
    box-sizing: border-box;
    display: inline-block;
    width: 33.33%;
    height: 100px;
    text-align: center;
    border-right: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
    padding: 25px;
    &:nth-of-type(3n) {
      border-right: 0;
    }
    &:nth-last-of-type(1) {
      width: 100%;
      border-right: 0;
    }
    &:nth-last-of-type(1) {
      border-bottom: 0;
    }
    > p {
      &:nth-child(1) {
        font-size: 18px;
        color: #666666;
      }
      &:nth-child(2) {
        font-size: 14px;
        color: #c3c3c3;
      }
    }
  }
}
.btngroup {
  margin-bottom: 30px;

  /deep/.zcBtn {
    span {
      vertical-align: 0;
    }
  }
}
</style>
