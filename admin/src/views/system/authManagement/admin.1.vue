<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <!-- <FormItem>
          <Checkbox v-model="searchKey.isLike">
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem> -->
        <FormItem label="管理员账号">
          <Input placeholder="多个账号请以，逗号隔开" class="s-140" v-model="searchKey.userName"/>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            class="search"
            :loading="$root.searchBtnLoading"
            @click="searchSubmit"
          >查询</Button>
        </FormItem>
        <FormItem>
          <Button class="admin-add ml30" @click="addAdmin">
            <Icons class="mr5" type="jiakuan" size="14" color="#62B1FD"/>新增管理员
          </Button>
        </FormItem>
        <FormItem>
          <Poptip trigger="hover" class="ml15" placement="bottom-end">
            <div
              slot="content"
              class="w200x word-break h100"
            >其中的值为动态值，显示添加角色时对应的描述内容，且只显示当前登录者能看到的角色，不用显示上级角色描述内容</div>
            <Icons type="bangzhutishi" color="#E4E4E4" :size="26"/>
          </Poptip>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        :columns="table.columns"
        :loading="$root.tableLoading"
        :value="table.data"
        :total="table.total"
        :page="table.page"
        @on-change-status="onChangeStatus"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        @on-edit="onEdit"
        @on-details="onDetails"
        @on-delete="onDelete"
      ></Tables>
    </div>
    <Modals ref="editModal" :title="editModalTitle==='create'?'新增管理员':'编辑管理员'" width="900" >
      <div slot="content" class="pt10 modal-overflow">
        <Form ref="formKey" :model="formKey" :rules="rules" :label-width="260">
          <FormItem label="创建人">
            <Input
              :value="editModalTitle==='create'?userName:formKey.createUserName"
              class="w260x"
              disabled
            />
          </FormItem>
          <FormItem label="管理员账号" prop="userName">
            <Input v-model="formKey.userName" class="w260x" placeholder="请输入6-20位数字或字母"/>
          </FormItem>
          <FormItem label="管理员密码" :prop="editModalTitle==='create'?'password':''">
            <Input v-model="formKey.password" class="w260x" placeholder="请输入6-20位数字或字母"/>
          </FormItem>
          <FormItem label="管理员角色" prop="roleName">
            <RoleSelect ref="RoleSelect" class="w260x" @on-change="onRoleChange"/>
          </FormItem>
          <FormItem label="管理站点" prop="siteId">
            <SiteSelect
              ref="SiteSelect"
              mode="多选"
              :clearable="false"
              :siteList="accessSite || []"
              @on-site-change="onSiteChange"
            />
          </FormItem>
          <FormItem label="出入款等级操作" prop="levelId">
            <LevelSelect
              v-show="false"
              ref="LevelSelect"
              mode="多选"
              levelType="member"
              @on-change="onLevelChange"
            />
            <div v-for="permission in levelPermission" :key="permission.siteId">
              <div v-if="permission.levels.length">
                <span class="ib w70x">{{permission.siteName}}</span>
                <Checkbox
                  v-model="permission.checked"
                  :indeterminate="permission.indeterminate"
                  @on-change="(val)=>checkAll(permission,val)"
                >全选</Checkbox>
                <Checkbox
                  v-for="le in permission.levels"
                  :value="le.levelLabel"
                  :key="le.id"
                  v-model="le.checked"
                  @on-change="(val)=>checkOne(permission,le,val)"
                >{{le.levelName}}</Checkbox>
              </div>
            </div>
          </FormItem>
          <FormItem label="最大加款" prop="maxAddMoney">
            <Input v-model="formKey.maxAddMoney" class="w260x" placeholder="'0'或'空'表示无上限"/>
          </FormItem>
          <FormItem label="状态" prop="status">
            <Select class="w260x" v-model="formKey.status">
              <Option value="yes">正常</Option>
              <Option value="no">停用</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              :loading="$root.editLoading"
              class="ivu-btn submit"
              @click="editSubmit"
            >确认保存</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
    <Modals ref="detailModal" title="管理员详情" :width="70">
      <div slot="content" class="v2-form-wrapper">
        <div class="w90 pb20">
          <div class="clearfix top">
            <div class="fl bl bt h50 w33 ti20">创建人：{{detailsData.createUserName}}</div>
            <div class="fl bl bt h50 w33 ti20">创建IP：{{detailsData.createIp}}</div>
            <div class="fl bl bt h50 w33 ti20 br">创建时间：{{$root.unixTime(detailsData.time)}}</div>
            <div class="fl bl bt h50 w33 ti20">管理员账号：{{detailsData.userName}}</div>
            <div class="fl bl bt h50 w33 ti20">上次登录IP：{{detailsData.lastIp}}</div>
            <div class="fl bl bt h50 w33 ti20 br">更新时间：{{$root.unixTime(detailsData.updateTime)}}</div>
            <div class="fl bl bt h50 w33 ti20 text-overflow-ellipsis">
              管理员角色：
              <span v-for="(role,key) in detailsData.groupName" :key="key">{{role}} |</span>
            </div>
            <div class="fl bl bt h50 w33 ti20">最大加款：{{detailsData.maxAddMoney}}</div>
            <div class="fl bl bt h50 w33 ti20 br">上次登录时间：{{$root.unixTime(detailsData.lastTime)}}</div>
          </div>
          <div class="middle bl bt ti20 h50 br">
            管理站点：
            <span class="mr5" v-for="(site,i) in detailsData.siteId" :key="i">{{site.siteName}}</span>
          </div>
          <div class="bottom ti10 bb br">
            <div class="bl bt h50 center">出入款操作等级</div>
            <div class="bl bt h50" v-for="(level,key,i) in detailsData.levelName" :key="i">
              <span class="ib w80x">{{key}}</span>
              <span>{{level.join(" ")}}</span>
            </div>
            <div class="bl bt h50">花生娱乐</div>
          </div>
        </div>
      </div>
    </Modals>
      <div slot="content" class="modal-overflow">
        <div style="width:487px;margin:auto;">
          <p class="gr ft16">站点名称</p>
          <ul class="w100 clearfix b mb20">
            <li v-for="(item,i) in siteInfo" class="w20 fl txt-a h40 sitename ft14" :key="i">{{item.siteName}}</li>
          </ul>
        </div>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Modals from "@/components/modals";
import Icons from "@/components/icons";
import LevelSelect from "@/components/level-select";
import SiteSelect from "@/components/site-select";
import RoleSelect from "./components/role-select";
import tableMixins from "@/mixins/table";
import { getUserName } from "@/libs/util";
import { mapState } from "vuex";
import { Tooltip } from "iview";
import {
  getAdminList,
  adminDetail,
  adminAdd,
  adminUpdate,
  adminDelete,
  adminModifyStatus
} from "@/api/system";
import { setTimeout } from "timers";
export default {
  name: "admin",
  mixins: [tableMixins],
  components: { Tables, Icons, Modals, RoleSelect, LevelSelect, SiteSelect },
  data() {
    return {
      siteInfo: [],
      levelPermission: [], // 出入款等级权限
      userName: getUserName(),
      Time: [],
      editModalTitle: "",
      searchKey: {},
      formKey: {
        createUserName: "",
        userName: "",
        password: "",
        maxAddMoney: "",
        status: "yes",
        siteId: [],
        levelId: null,
        roleName: []
      },
      detailsData: {},
      rules: {
        siteId: [
          {
            type: "array",
            required: true,
            message: "请选择站点",
            trigger: "change"
          }
        ],
        maxAddMoney: [
          {
            required: true,
            message: "请输入最大加款金额",
            trigger: "blur"
          }
        ],
        roleName: [
          {
            type: "array",
            required: true,
            message: "请选择角色",
            trigger: "change"
          }
        ],
        userName: [
          {
            required: true,
            message: "请输入管理员账号",
            trigger: "blur"
          },
          {
            pattern: /^[/\d,/\w]{6,20}$/,
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
            pattern: /^[/\d,/\w]{8,20}$/,
            message: "请输入8-20位数字或字母",
            trigger: "blur"
          }
        ]
      },
      table: {
        loading: true,
        total: 0,
        columns: [
          {
            title: "管理员账号",
            key: "userName",
            align: "center"
          },
          {
            title: "角色",
            key: "groupName",
            align: "center",
            render: (h, params) => {
              let { groupName } = params.row;
              groupName = Object.values(groupName);
              return (
                <Tooltip placement="right">
                  <div class="flex-column">
                    <span class="cs">
                      {groupName.slice(0, 1)[0]}
                      ...
                    </span>
                  </div>
                  <div slot="content" class="word-break w90x">
                    {groupName.map(name => (
                      <div>{name}</div>
                    ))}
                  </div>
                </Tooltip>
              );
            }
          },
          {
            title: "可用站点",
            key: "siteId",
            align: "center",
            render: (h,params) => <a 
            onClick={() => {
              this.siteInfo = params.row.siteId
              this.$refs.siteModal.show()
            }}>{params.row.siteId.slice(0,1)[0].siteName}...</a>
          },
          {
            title: "上次登录",
            key: "lastTime",
            align: "center",
            render: (h, params) => {
              return <span>{this.$root.unixTime(params.row.lastTime)}</span>;
            }
          },
          {
            title: "创建时间",
            key: "time",
            align: "center",
            render: (h, params) => {
              return <span>{this.$root.unixTime(params.row.time)}</span>;
            }
          },
          {
            title: "创建人",
            key: "createUserName",
            align: "center",
            render: (h, params) => {
              return <span>{this.$root.unixTime(params.row.time)}</span>;
            }
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              let color = params.row.status == "yes" ? "#515a6e" : "#FF2626";
              return (
                <span style={{ color: color }}>
                  {params.row.status === "yes" ? "正常" : "停用"}
                </span>
              );
            }
          },
          {
            title: "操作",
            key: "handle",
            align: "center",
            options: ["status", "details", "edit", "delete"]
          }
        ],
        data: []
      }
    };
  },
  computed: {
    ...mapState({
      accessSite: state => state.user.accessSite
    })
  },
  methods: {
    createData() {
      let ids = [];
      this.levelPermission.forEach(permission => {
        permission.levels.forEach(level => {
          if (level.checked) {
            ids.push(level.id);
          }
        });
      });
      // 去重
      let _ids = [];
      ids.forEach(id => {
        if (!_ids.includes(id)) {
          _ids.push(id);
        }
      });
      this.formKey.levelId = _ids;
    },
    checkAll(parent, val) {
      this.$set(parent, "indeterminate", false);
      this.$set(parent, "checked", val);
      parent.levels.forEach(level => {
        this.$set(level, "checked", val);
      });
      this.createData();
    },
    checkOne(parent, le, val) {
      this.$set(le, "checked", val);
      let count = 0;
      parent.levels.forEach(level => {
        if (level.checked) count++;
      });
      if (count) {
        if (count < parent.levels.length) {
          this.$set(parent, "checked", false);
          this.$set(parent, "indeterminate", true);
        } else {
          this.$set(parent, "checked", true);
          this.$set(parent, "indeterminate", false);
        }
      } else {
        this.$set(parent, "checked", false);
        this.$set(parent, "indeterminate", false);
      }
      this.createData();
    },
    onSiteChange(res) {
      const { id, siteName } = res;
      if (id) {
        if (this.editModalTitle === "create") {
          const { siteId } = this.formKey;
          if (id.length > siteId.length) {
            let obj = {};
            obj.siteId = id[id.length - 1];
            obj.siteName = siteName[siteName.length - 1];
            obj.levels = [];
            this.$refs.LevelSelect.init(obj.siteId).then(res => {
              obj.levels = res;
            });
            this.levelPermission.push(obj);
          } else if (id.length < siteId.length) {
            let excludeId;
            siteId.forEach(sid => {
              id.forEach(item => {
                if (sid != item && !id.includes(sid)) {
                  excludeId = sid;
                }
              });
            });
            this.levelPermission.forEach((item, i) => {
              if (item.siteId == excludeId) {
                this.levelPermission.splice(i, 1);
              }
            });
          }
          this.formKey.siteId = id;
        }
        if (this.editModalTitle === "edit") {
          this.levelPermission = [];
          // 经历两次change，后台脏数据
          const len1 = this.formKey.siteId.length
          const len2 = id.length
          this.formKey.siteId = id;
          if (len1 === len2) return;
          const waitFor = (item, i) => {
            return new Promise(resolve => {
              let obj = {};
              obj.siteId = item;
              obj.siteName = siteName[i];
              obj.levels = [];
              this.$refs.LevelSelect.init(item).then(res => {
                obj.levels = res;
                this.levelPermission.push(obj);
                // 编辑check同步
                this.levelPermission.forEach(parent => {
                  let count = 0;
                  parent.levels.forEach(level => {
                    this.formKey.levelId.forEach(_level => {
                      if (level.id == +_level) {
                        count++;
                        this.$set(level, "checked", true);
                      }
                    });
                  });
                  if (count) {
                    if (count < parent.levels.length) {
                      this.$set(parent, "checked", false);
                      this.$set(parent, "indeterminate", true);
                    } else {
                      this.$set(parent, "checked", true);
                      this.$set(parent, "indeterminate", false);
                    }
                  } else {
                    this.$set(parent, "checked", false);
                    this.$set(parent, "indeterminate", false);
                  }
                });
              });
            });
          };
          id.forEach(async (item, i) => {
            await waitFor(item, i);
          });
        }
      }
      if (!id.length) {
        this.levelPermission = [];
      }
    },
    onRoleChange(res) {
      this.formKey.roleName = res;
    },
    onLevelChange(res) {
      this.formKey.levelId = res;
    },
    addAdmin() {
      this.editModalTitle = "create";
      this.$refs.editModal.show();
      this.resetForm();
    },
    onEdit(params) {
      this.resetForm();
      for (let key in this.formKey) {
        if (key !== "siteId") {
          this.formKey[key] = params.row[key];
        }
      }
      this.levelPermission = [];
      this.editModalTitle = "edit";
      let { siteId, levelId, id, groupName, maxAddMoney } = params.row;
      this.$refs.editModal.show();
      let ids = [];
      siteId.forEach(item => {
        ids.push(item.siteId);
      });
      this.formKey.levelId = levelId.split(",");
      this.formKey.adminId = id;
      this.formKey.maxAddMoney = maxAddMoney + "";
      this.$refs.RoleSelect.setDefaultRole(Object.keys(groupName));
      this.$refs.SiteSelect.setDefaultSite(ids);
    },
    resetForm() {
      for (let key in this.formKey) {
        this.formKey[key] = "";
      }
    },
    getData(data) {
      this.$root.startTableLoading();
      for(let key in data.params) {
        if(!data.params[key]) delete data.params[key]
      }
      getAdminList(data).then(res => {
        const { data, total } = res.data;
        this.table.data = data;
        this.table.total = total;
      });
    },
    //提交查询
    searchSubmit() {
      let params = { ...this.searchKey };
      params.siteId = this.nowSite.id;
      if (params.userName && params.userName.length < 5) {
        this.$Message.error("会员账号最小5个字符！");
        return false;
      }
      if (!params.userName) delete params.isLike;
      for (let key in params) {
        if (!params[key]) delete params[key];
      }
      this.getData({ params });
    },
    onDelete(params) {
      const { userName, id } = params.row;
      let text = "您确定删除" + userName + "吗?";
      const data = {
        siteId: this.nowSite.id,
        adminId: id
      };
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          adminDelete(data).then(res => {
            if(res.code == 200) this.table.data.splice(params.index, 1);
          });
        }
      });
    },
    onChangeStatus(params) {
      let text, msg;
      const { status, id } = params.row;
      if (status === "yes") {
        text = "您确定停用该管理员吗？";
        msg = "停用状态成功";
      }
      if (status === "no") {
        text = "您确定启用该管理员吗？";
        msg = "启用状态成功";
      }
      const data = {
        siteId: this.nowSite.id,
        id: id,
        status: status === "yes" ? "no" : "yes"
      };
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          adminModifyStatus(data).then(res => {
            if(res.code == 200) params.row.status = status === "yes" ? "no" : "yes";
          });
        }
      });
    },
    editSubmit() {
      let params = { ...this.formKey };
      this.$refs.formKey.validate(valid => {
        if (valid) {
          this.$root.startEditLoading();
          params.siteId = params.siteId.join(",");
          params.levelId = params.levelId.join(",");
          for (let key in params) {
            if (!params[key]) delete params[key];
          }
          if (this.editModalTitle === "create") {
            adminAdd(params)
              .then(res => {
                this.$refs.editModal.hide();
                this.searchSubmit();
              })
              .catch(() => {
                this.$root.endEditLoading();
              });
          }
          if (this.editModalTitle === "edit") {
            adminUpdate(params)
              .then(res => {
                this.$refs.editModal.hide();
                this.searchSubmit();
              })
              .catch(() => {
                this.$root.endEditLoading();
              });
          }
        }
      });
    },
    onDetails(params) {
      this.detailsData = {};
      this.$refs.detailModal.show();
      this.$refs.detailModal.spinShow();
      let { siteId, levelId } = params.row;
      levelId = levelId.split(",");
      this.detailsData = params.row;
      let levelName = {};
      const waitFor = item => {
        return new Promise(resolve => {
          const { siteId, siteName } = item;
          levelName[siteName] = [];
          this.$refs.LevelSelect.init(siteId).then(res => {
            levelId.forEach(l => {
              res.forEach(r => {
                if (r.id == +l) {
                  levelName[siteName].push(r.levelName);
                }
              });
            });
            this.$set(this.detailsData, "levelName", levelName);
          });
        });
      };
      siteId.forEach(async item => {
        let res = await waitFor(item);
      });
      setTimeout(() => {
        this.$refs.detailModal.spinHide();
      }, 300);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../styles/button.less";
.h50 {
  line-height: 50px;
}
.h40{
  line-height: 40px;
}
.w33 {
  width: 33.333%;
}
.gr{
  background: #dcdcdc;
  height:40px;
  line-height: 40px;
  width:100%;
  text-align: center;
}
</style>
