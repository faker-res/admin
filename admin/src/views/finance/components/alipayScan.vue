<template>
  <div v-if="(adminType == 'super') || (authInPage.indexOf('companyBankCardList') != -1)">
    <Tables
      editable
      ref="table"
      :columns="table.columns"
      :loading="$root.tableLoading"
      :value="table.data"
      :total="table.total"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-page-change="onPageChange"
      @on-page-size-change="onPageSizeChange"
      @on-change-status="changeStatus"
       :draggable="true"
      @on-drag-drop="onDragDrop"
      :pageSizeOpts="table.pageSizeOpts"
      :more="table.more"
    ></Tables>
    <Modals ref="editScanInfo" title="编辑二维码" :width="860">
      <div slot="content" class="v2-form-wrapper">
        <Form ref="formKey" :label-width="130" :model="formKey" :rules="rules">
          <FormItem label="创建人" prop="funder">
            <Input v-model="formKey.funder" class="input" disabled/>
          </FormItem>
          <FormItem label="入款卡" prop="depositCard">
            <Input v-model="formKey.depositCard" class="input" disabled/>
          </FormItem>
          <FormItem label="扫码类型">
            <Select v-model="formKey.classId" class="input">
              <Option v-for="(item,i) in classNameList" :key="i" :value="item.id">{{item.className}}</Option>
            </Select>
          </FormItem>
          <FormItem label="收款姓名" prop="payName">
            <Input v-model="formKey.payName" class="input"/>
          </FormItem>
          <FormItem label="支付金额">
            <FormItem placeholder="单笔下限" class="ib" prop="min_amount">
              <Input v-model="formKey.min_amount" class="w130x"/>
            </FormItem>
            <FormItem class="ib">
              <span class="pl5 pr5">-</span>
            </FormItem>
            <FormItem placeholder="单笔上限" class="ib" prop="max_amount">
              <Input v-model="formKey.max_amount" class="w130x"/>
            </FormItem>
          </FormItem>
          <FormItem label="开放等级">
            <LevelSelect
              clearable
              ref="LevelSelect"
              v-model="formKey.newlevelLabel"
              :mode="'多选'"
              width="275"
              :levelType="'member'"
              @on-level-change="levelChange"
              all-modal
            />
          </FormItem>
          <FormItem label="开放终端" prop="devices" class="clearfix">
            <div class="fl">
              <Checkbox
                :indeterminate="indeterminate"
                :value="checkAll"
                @click.prevent.native="handleCheckAll"
              >全选</Checkbox>
            </div>
            <CheckboxGroup v-model="formKey.devices" @on-change="devicesChange" class="fl">
              <Checkbox label="pc"></Checkbox>
              <Checkbox label="h5"></Checkbox>
              <Checkbox label="android"></Checkbox>
              <Checkbox label="ios"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="二维码" prop="qr_code">
            <Upload
              :show-upload-list="false"
              :multiple="false"
              :max-size="2048"
              v-model="formKey.src"
              :default-file-list="uploadForm.defaultList"
              :headers="uploadForm.headers"
              :action="uploadForm.action"
              :data="uploadForm.data"
              :name="uploadForm.name"
              :on-success="onUploadSuccess"
            >
              更换图片
              <!-- 展示的框子 -->
              <div class="w100x h40 mt10" style="heigth:100px" v-if="hideShow">
                <img :src="imgSrc" style="width:100%;heigth:30px">
              </div>
              <!-- 更新后的框子 -->
              <div class="w100x h40 mt10" style="heigth:100px;" v-if="show">
                <img style="width:100%" :src="src">
              </div>
            </Upload>
            <p>（图片大小不能超过2MB,仅支持JPG,PNG格式）</p>
          </FormItem>
          <FormItem label="状态">
            <Select class="input" v-model="formKey.status">
              <Option value="yes">开启</Option>
              <Option value="no">关闭</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button
              class="save"
              style="width:278px"
              :loading="$root.editBtnLoading"
              @click="sumbit"
            >确认保存</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import { getUserName } from "@/libs/util";
import Icons from "@/components/icons"
import {
  QRCodeList,
  QRCodeModifyStatus,
  QRCodeDelete,
  QRCodeUpdate,
  QRCodeSequence
} from "@/api/finance";
import { uploadImg } from "@/api/common";
import Modals from "@/components/modals";
import LevelSelect from "@/components/level-select";
import { getToken, getUserType } from "@/libs/util";
export default {
  props: ["classId", "classNameList", "id"], //扫码id，扫码列表
  components: { Tables, Modals, Icons, LevelSelect },
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      hideShow: true, //更换前的图片展示
      show: false, //更换图片后的展示
      bannerData: {},
      imgSrc: "", //编辑展示图片
      upLoadSrc: "", //更换的图片
      uploadForm: {
        headers: { Authorization: getToken() },
        action: "/api/v2/uploadImg",
        data: { siteId: "" },
        name: "img",
        defaultList: [],
        path: "",
        src: ""
      },
      indeterminate: true,
      checkAll: false,
      devices: [],
      table: {
        total: 0,
        loading: true,
        pageSizeOpts: [20, 30, 40, 50],
        data: [],
        columns: [
          {
            title: "排序",
            key: "sort",
            align: "center",
            render: (h, params) => (
              <Icons type="paixukongjian" color="#dadada" size="20" />
            ),
            width: 70
          },
          {
            title: "扫码类型",
            key: "className",
            align: "center"
          },
          {
            title: "收款姓名",
            key: "payName",
            align: "center"
          },
          {
            title: "二维码图片",
            key: "qr_code",
            align: "center",
            width: "120",
            render: (h, params) => {
              return (
                <img style="width:50px;height:50px" src={params.row.src} />
              );
            }
          },
          {
            title: "单笔下限",
            key: "min_amount",
            align: "center"
          },
          {
            title: "单笔上限",
            key: "max_amount",
            align: "center"
          },
          {
            title: "开放等级",
            key: "levelAlias",
            align: "center",
            width: 200,
            render: (h, params) => {
                if(params.row.levelAlias.length>10){
                 
              }return (
                <Tooltip max-width="200" placement="right-start">
                  <div
                   style="margin-left:20px;margin-right:20px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:150px"
                  >
                    <span  class=" ib" >{params.row.levelAlias}</span>
                  </div>
                  <div slot="content">
                    <span>{params.row.levelAlias}</span>
                  </div>
                </Tooltip>
              );
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
            key: "devices",
            align: "center",
            width: "130"
          },
          {
            title: "创建时间",
            key: "created_at",
            align: "center",
            width: "180",
            render: (h, params) => (
              <span class="pl20 pr20">
                {this.$root.unixTime(params.row.created_at)}
              </span>
            )
          },
          {
            title: "创建人",
            key: "created_user",
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
            width: "150",
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
                      display: (this.adminType == 'super') || (this.authInPage.indexOf('companyBankCardUpdate')) != -1 ? 'inline-block' : 'none'
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
        ]
      },
      formKey: {
        depositCard: "",
        scanType: "",
        payName: "",
        min_amount: "",
        max_amount: "",
        levelLabel: "",
        path: "",
        newlevelLabel: []
      },
      rules: {
        levelLabel: [
          {
            type: "number",
            required: true,
            message: "请选择会员等级",
            trigger: "change",
            pattern: /.+/
          }
        ],
        depositCard: [
          {
            required: true,
            message: "请输入正确的入款卡",
            trigger: "blur"
          }
        ],
        // className: [
        //   {
        //     required: true,
        //     message: "请选择扫码类型",
        //     trigger: "change"
        //   }
        // ],
        payName: [
          {
            required: true,
            message: "请输入收款姓名",
            trigger: "blur"
          }
        ],
        min_amount: [
          {
            required: true,
            message: "请输入支付下限",
            trigger: "blur"
          }
        ],
        max_amount: [
          {
            required: true,
            message: "请输入支付上限",
            trigger: "blur"
          }
        ],
        devices: [
          {
            required: true,
            message: "请选择开放终端",
            trigger: "change",
            pattern: /.+/
          }
        ],
        qr_code: [
          {
            required: true,
            message: "请选择图片",
            trigger: "change",
            pattern: /.+/
          }
        ]
      }
    };
  },
  mounted() {
    const data = {
      siteId: this.$root.nowSite.id,
      classId: this.id
    };
    if (data.classId) this.getData(data);
  },
  watch: {
    "$root.nowSite": {
      handler(val, oldVal) {
        this.$nextTick(() => {
          this.$refs.LevelSelect.init(val.id);
          this.uploadForm.data.siteId = val.id;
        });
      },
      deep: true,
      immediate: true
    },
    id: {
      handler(val, oldVal) {
        const data = {
          siteId: this.$root.nowSite.id,
          classId: this.id
        };
        this.getData(data);
      }
    }
  },
  computed: {
    //获取创建人
    username() {
      return getUserName();
    }
  },
  methods: {
    //  接口排序
    onDragDrop(oldIndex, newIndex) {
      // console.log(classId)
      console.log(this.id)
      const params = {
        current_id: this.$refs.table.insideTableData[oldIndex].id,
        neighbor_id: this.$refs.table.insideTableData[newIndex].id,
        siteId: this.$root.nowSite.id,
        type: +oldIndex > +newIndex ? "up" : "down",
        classId:this.id
      };
      QRCodeSequence(params).then(res=>{
        this.getData(this. bannerData);
      } )
    },
    // 上传图片
    onUploadSuccess(res) {
      const { path, src, host } = res.data;
      //传给后台的路径
      this.path = path;
      //展示图片的地址
      this.src = src;

      this.host = host;

      // this.upLoadSrc = this.src;

      if (this.show == false) {
        this.show = true;
        this.hideShow = false;
      }
    },
    levelChange(res) {
      this.formKey.newlevelLabel = res.levelLabel;
    },
    //扫码列表
    getData(data) {
      if (data.classId == undefined) return;
      this.$root.startTableLoading();
      this.bannerData = data;
      QRCodeList(data).then(res => {
        this.table.loading = false;
        const { data, total } = res.data;
        this.table.data = data;
        this.table.total = total;
      });
    },
    // 修改支付宝扫码状态
    changeStatus(params) {
      let text, msg;
      const { id, status, className } = params.row;
      if (status === "yes") {
        text = `您确定停用${className}吗？`;
        msg = `停用${className}成功`;
      }
      if (status === "no") {
        text = `您确定启用${className}吗？`;
        msg = `启用${className}成功`;
      }
      const data = {
        siteId: this.$root.nowSite.id,
        id,
        status: status === "yes" ? "no" : "yes"
      };
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          QRCodeModifyStatus(data).then(res => {
            if (res.code == 200)
              params.row.status = status === "yes" ? "no" : "yes";
          });
        }
      });
    },
    // 支付宝扫码编辑
    onEdit(params) {
      this.hideShow = true;
      this.show = false;
      //调用reset方法，清空点击编辑等级累加
      this.$refs.LevelSelect.reset();
      let {
        payName,
        max_amount,
        min_amount,
        className,
        levelLabel,
        levelAlias,
        devices,
        qr_code,
        src,
        id,
        status
      } = params.row;
      //展示图片的地址
      this.imgSrc = params.row.src;
      this.$refs.LevelSelect.init(this.$root.nowSite.id, {
        levelLabel,
        levelAlias
      });

      let classId = this.classNameList.filter(
        item => item.className === className
      )[0].id;

      this.formKey = {
        funder: this.username,
        depositCard: "二维码",
        payName,
        max_amount,
        min_amount,
        className,
        classId,
        id,
        levelLabel,
        status,
        qr_code,
        src,
        devices: devices.split(",")
      };
      console.log(this.formKey);
      console.log(this.formKey.className);

      this.$refs.editScanInfo.show();
    },
    //编辑-修改提交
    sumbit() {
      this.$root.startEditLoading();
      let params = JSON.parse(JSON.stringify(this.formKey));
      let Name = this.classNameList.filter(
        item => item.id === this.formKey.classId
      )[0].className;
      this.formKey.className = Name;
      // console.log(Name);
      // console.log(this.formKey.className);
      // console.log(params);
      params.className = Name;
      params.classId = this.formKey.classId;

      params.qr_code = this.path || this.formKey.qr_code;
      //  默认显示为数组 提交时需要转为字符
      params.devices = String(params.devices);
      params.siteId = this.$root.nowSite.id;
    
      console.log(this.formKey.classId);
      if (params.newlevelLabel.length > 1)
        params.levelLabel = params.newlevelLabel.join(",");
      else params.levelLabel = params.newlevelLabel[0];
      delete params.newlevelLabel;

      this.$refs.formKey.validate(valid => {
        if (valid) {
          this.$refs.editScanInfo.spinShow();

          console.log("这是params的值"+params.qr_code)
          console.log("这是上传图片更新的地址"+this.path)
          console.log("这是formkey的值"+this.formKey.qr_code)

          params.qr_code = this.path || this.formKey.qr_code;
          QRCodeUpdate(params).then(res => {
              this.$refs.editScanInfo.spinHide();
              this.$refs.editScanInfo.hide();
              if (res.code == 200) {
                this.$Tip.hide();
                  this.$parent.type=this.formKey.className;
                this.bannerData.classId=this.formKey.classId;
                this.getData(this.bannerData);
              }
              this.$Message.success({ content: "编辑二维码成功" });
            }) .catch(() => {
              this.$refs.editScanInfo.spinHide();
            });
        
        
        
        
        
        }
      });
    },
    changeType() {},
    //全选单选
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.formKey.devices = ["pc", "h5", "android", "ios"];
      } else {
        this.formKey.devices = [];
      }
    },
    devicesChange(data) {
      if (data.length === 4) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    // 支付宝扫码删除
    onDelete(params) {
      let text = "您确定删除" + params.row.className + "吗？";
      let msg = `删除${params.row.className}`;
      const data = {
        siteId: this.$root.nowSite.id,
        id: params.row.id
      };
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          QRCodeDelete(data).then(res => {
            if (res.code == 200) this.table.data.splice(params.index, 1);
          });
        }
      });
    },
    onPageChange(page) {
      let data = { params: this.$parent.searchkey, query: { page } };
      this.getData(data);
    },
    onPageSizeChange(pageSize) {
      this.getData({
        params: {
          limit: pageSize,
          ...this.bannerData
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../styles/button.less";
@import "../../../styles/class.less";
.input {
  width: 280px;
}

.w140 {
  width: 100px;
}


/deep/.ivu-table-wrapper{
   overflow: visible;
}
</style>
