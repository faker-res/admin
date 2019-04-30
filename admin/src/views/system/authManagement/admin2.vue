<template>
  <div>
    <div class="v2-search">
      <Form inline ref="searchKey">
        <FormItem>
          <Button class="s-120 bgSend white-font" @click="addAdmin">
            <Icon type="ios-add" color="#ffffff" size="22"/>新增管理员
          </Button>
        </FormItem>
        <FormItem>
          <Checkbox v-model="searchKey.type">
            <span>只看超管</span>
          </Checkbox>
        </FormItem>
        <FormItem label="管理员账号">
          <Input class="s-160" placeholder="多个请以,逗号隔开" v-model="searchKey.userName"/>
        </FormItem>
        <FormItem>
          <Button
            class="search"
            type="primary"
            @click="searchSubmit"
            :loading="$root.searchBtnLoading"
          >查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        ref="tables"
        :columns="table.columns"
        :loading="$root.tableLoading"
        :value="table.data"
        :total="table.total"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        :pageSizeOpts="table.pageSizeOpts"
      ></Tables>
    </div>
    <!-- 修改密码 -->
    <Modals title="修改密码" ref="changePwd" width="526">
      <div slot="content">
        <Form
          style="width:526px;"
          ref="changePwdInfo"
          :label-width="130"
          :model="changePwdInfo"
          :rules="changePwdInfoRules"
        >
          <FormItem label="管理员账号" prop="userName" required>
            <Input v-model="changePwdInfo.userName" class="w320x" disabled/>
          </FormItem>
          <FormItem label="管理员密码" prop="password">
            <Input v-model="changePwdInfo.password" class="w320x" placeholder="请输入6-20位数字或字母"/>
          </FormItem>
          <FormItem>
            <Button class="w260x ml30" type="primary" @click="saveChange">确认保存</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
    <!-- 复制权限 -->
    <Modals title="复制权限" ref="copyPermission" width="526">
      <div slot="content">
        <div class="copy-tip">
          <Icon type="ios-alert-outline" class="ib ml20" size="22" style="marginTop:-2px;"/>
          <p class="ib ml10">复制成功将继承该管理员的所有权限</p>
        </div>
        <Form
          ref="copyPermissionInfo"
          style="width:526px;"
          :model="copyPermissionInfo"
          :rules="copyPermissionInfoRules"
          :label-width="140"
        >
          <FormItem label="当前管理员" prop="currentAdmin" required>
            <Input class="w320x" disabled v-model="copyPermissionInfo.currentAdmin"/>
          </FormItem>
          <FormItem label="新增管理员" prop="userName">
            <Input class="w320x" v-model="copyPermissionInfo.userName" placeholder="请输入6-20位数字或字母"/>
          </FormItem>
          <FormItem label="管理员密码" prop="password">
            <Input class="w320x" v-model="copyPermissionInfo.password" placeholder="请输入6-20位数字或字母"/>
          </FormItem>
          <FormItem>
            <Button type="primary" class="w320x" @click="copyAdminSubmit">确认新增</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "_c/tables";
import Modals from "_c/modals";
import { Tooltip } from "iview";
import {
  adminNewList,
  adminModifyStatus,
  changePassWord,
  adminNewDelete,
  adminNewDetail,
  copyAdmin
} from "@/api/system";
import { error } from "util";
export default {
  name: "admin",
  components: {
    Tables,
    Modals
  },
  data() {
    return {
      //修改密码信息
      changePwdInfo: {
        userName: "",
        adminId: null,
        password: ""
      },
      changePwdInfoRules: {
        password: [
          {
            required: true,
            message: "请输入您的新密码",
            trigger: "blur"
          },
          {
            pattern: /^[A-Za-z0-9]{6,20}$/,
            message: "请输入6-20位数字或字母",
            trigger: "blur"
          }
        ]
      },
      //复制权限信息
      copyPermissionInfo: {
        currentAdmin: "",
        userName: "",
        password: ""
      },
      copyPermissionInfoRules: {
        userName: [
          {
            required: true,
            message: "请输入管理员账号",
            trigger: "blur"
          },
          {
            pattern: /^[A-Za-z0-9]{6,20}$/,
            message: "请输入6-20位数字或字母",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入管理员密码",
            trigger: "blur"
          },
          {
            pattern: /^[A-Za-z0-9]{8,20}$/,
            message: "请输入8-20位数字或字母",
            trigger: "blur"
          }
        ]
      },
      searchKey: {
        siteId: this.$root.nowSite.id
      },
      table: {
        loading: true,
        pageSizeOpts: [20, 30, 40, 50],
        data: [],
        total: 0,
        columns: [
          {
            title: "管理员账号",
            key: "userName",
            align: "center"
          },
          {
            title: "管理员别称",
            key: "groupName",
            align: "center",
            render: (h, params) => (
              <span>{this.$root.text(params.row.otherName)}</span>
            )
          },
          {
            title: "可用站点",
            key: "siteId",
            align: "center",
            width: 100,
            render: (h, params) => {
              return (
                <a>
                  {params.row.siteId.slice(0, 1)[0] &&
                    params.row.siteId.slice(0, 1)[0].siteName}
                </a>
              );
            }
          },
          {
            title: "上次登录",
            key: "lastTime",
            align: "center",
            render: (h, params) => (
              <span>{this.$root.unixTime(params.row.lastTime)}</span>
            )
          },
          {
            title: "创建时间",
            key: "time",
            align: "center",
            render: (h, params) => (
              <span>{this.$root.unixTime(params.row.time)}</span>
            )
          },
          {
            title: "创建人",
            key: "createUserName",
            align: "center",
            width: 110
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            width: 70,
            render: (h, params) => {
              let color = params.row.status === "yes" ? "" : "#FF0000";
              let text = params.row.status == "yes" ? "正常" : "停用";
              return <span style={{ color }}>{text}</span>;
            }
          },
          {
            title: "操作",
            align: "center",
            render: (h, params) => (
              <div>
                <a
                  class="ib mr15"
                  onClick={() => {
                    let postData = {
                      id: params.row.id,
                      status: params.row.status === "yes" ? "no" : "yes"
                    };
                    let text = params.row.status
                      ? "您确定停用此管理员账号吗？"
                      : "您确定启用此管理员账户吗？";
                    this.$Tip.confirm({
                      content: text,
                      onOk: () => {
                        adminModifyStatus(postData).then(res => {
                          if (res.code == 200)
                            this.table.data[params.index].status =
                              this.table.data[params.index].status == "yes"
                                ? "no"
                                : "yes";
                        });
                      }
                    });
                  }}
                >
                  {params.row.status == "yes" ? "停用" : "启用"}
                </a>
                <a
                  class="ib mr15"
                  onClick={() => {
                    this.$router.push({
                      name: "adminEdit",
                      query: { id: params.row.id },
                      params: { page: "edit" }
                    });
                  }}
                >
                  编辑
                </a>
                <a
                  class="ib mr15"
                  onClick={() => {
                    this.changePwdInfo.userName = params.row.userName;
                    this.changePwdInfo.adminId = params.row.id;
                    this.$refs.changePwd.show();
                  }}
                >
                  修改密码
                </a>
                <a
                  class="ib mr15"
                  onClick={() => {
                    this.copyPermissionInfo.currentAdmin = params.row.userName;
                    this.copyPermissionInfo.adminId = params.row.id;
                    this.$refs.copyPermission.show();
                  }}
                >
                  复制
                </a>
                <a
                  class="ib"
                  onClick={() => {
                    let data = { adminId: params.row.id };
                    this.$Tip.confirm({
                      content: "您确定删除此管理员账号吗？",
                      onOk: () => {
                        adminNewDelete(data).then(res => {
                          if (res.code == 200) {
                            this.table.data.splice(params.index, 1);
                            this.table.total--;
                          }
                        });
                      }
                    });
                  }}
                >
                  删除
                </a>
              </div>
            )
          }
        ]
      }
    };
  },
  mounted() {
    let data = { ...this.searchKey };
    this.searchKey.type ? (data.type = "super") : "";
    this.getData({ params: data });
  },
  methods: {
    getData(data) {
      this.$root.startTableLoading(this);
      adminNewList(data).then(res => {
        let { data, total } = res.data;
        this.table.data = data;
        this.table.total = total;
      });
    },
    searchSubmit() {
      let postData = { params: { ...this.searchKey } };
      this.searchKey.type ? (postData.params.type = "super") : '';
      if (postData.params.userName && postData.params.userName.length < 5) {
        this.$Tip.info({ content: "查询会员账号须大于5字符" });
        return false;
      }
      for (let key in postData.params) {
        if (!postData.params[key]) delete postData.params[key];
      }
      this.getData(postData);
    },
    //修改密码
    saveChange() {
      this.$refs.changePwdInfo.validate(valid => {
        if (valid) {
          this.$refs.changePwd.spinShow();
          let { adminId, password } = this.changePwdInfo;
          let data = { adminId, password };
          changePassWord(data)
            .then(res => {
              this.$refs.changePwd.spinHide();
              if (res.code == 200) {
                let postData = { params: { ...this.searchKey } };
                postData.params.type = postData.params.type ? "super" : "";
                for(let key in postData.params) {
                  if(!postData.params[key]) delete postData.params[key]
                }
                this.$refs.changePwd.hide();
                this.getData(postData);
                this.$refs.changePwdInfo.resetFields();
              }
            })
            .catch(error => {
              this.$refs.changePwd.spinHide();
            });
        }
      });
    },
    //复制权限
    copyAdminSubmit() {
      this.$refs.copyPermissionInfo.validate(valid => {
        if (valid) {
          let data = { ...this.copyPermissionInfo };
          delete data.currentAdmin;
          this.$refs.copyPermission.spinShow();
          copyAdmin(data)
            .then(res => {
              this.$refs.copyPermission.spinHide();
              if (res.code == 200) {
                this.$refs.copyPermission.hide();
                let postData = { params: { ...this.searchKey } };
                this.searchKey.type ? (postData.params.type = "super") : '';
                for (let key in postData.params) {
                  if (!postData.params[key]) delete postData.params[key];
                }
                this.getData(postData);
                this.$refs.tables.setPage();
                this.$refs.copyPermissionInfoRules.resetFields();
              }
            })
            .catch(error => {
              this.$refs.copyPermission.spinHide();
            });
        }
      });
    },
    onPageChange(page) {
      let postData = {
        params: { ...this.searchKey },
        query: { page }
      };
      postData.params.type = postData.params.type ? "super" : '';
      for(let key in postData.params) {
        if(!postData.params[key]) delete postData.params[key]
      }
      this.getData(postData);
    },
    onPageSizeChange(pageSize) {
      this.searchKey.limit = pageSize;
      let postData = {
        params: { ...this.searchKey }
      };
      postData.params.type = postData.params.type ? "super" : '';
      for(let key in postData.params) {
        if(!postData.params[key]) delete postData.params[key]
      }
      this.getData(postData);
    },
    addAdmin() {
      this.$router.push({
        name: "adminEdit",
        params: { page: "add" }
      });
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.copy-tip {
  background-color: #f6f6f8;
  height: 36px;
  line-height: 36px;
  margin-bottom: 10px;
  margin-top: -10px;
  color: #666666;
}
</style>


