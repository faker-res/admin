<template>
  <div>
    <Form
      ref="formKey"
      :label-width="100"
      class="mt10"
      :model="formKey"
      :rules="rules"
      :key="formKey.agencyType"
    >
      <FormItem :label="formKey.agencyType == 'member' ? '会员类型' : '代理类型'">
        <Select v-model="formKey.agencyType" class="w340x">
          <Option value="member">会员</Option>
          <Option value="agency">代理</Option>
          <Option value="shareholder">大股东</Option>
        </Select>
      </FormItem>
      <FormItem label="上级代理" prop="superiorUserName" v-if="formKey.agencyType != 'shareholder'">
        <AutoSearch
          ref="autoSearch"
          :width="340"
          :clearable="false"
          v-model="formKey.superiorUserName"
          :placeholder="'上级代理账号，默认查询'"
          @sendSuperior="getSuperior"
          @changeShow="changeShow"
        ></AutoSearch>
      </FormItem>
      <FormItem
        :label="formKey.agencyType == 'member' ? '会员账号' : formKey.agencyType == 'agency' ? '代理账号' : '大股东账号'"
        prop="userName"
      >
        <Input v-model="formKey.userName" placeholder="6-20位数字或字母" class="w340x"/>
      </FormItem>
      <FormItem label="默认密码">
        <Input v-model="formKey.passwd" class="w340x" disabled/>
      </FormItem>
      <FormItem
        label="会员等级"
        prop="levelLabel"
        v-show="(formKey.agencyType != 'shareholder' && formKey.superiorUserName) || (formKey.agencyType == 'shareholder')"
      >
        <LevelSelect
          ref="levelSelect"
          class="ib"
          width="340"
          :choiceShow="true"
          :levelType="'member'"
          @on-level-change="onLevelChange"
        ></LevelSelect>
        <Poptip class="ml10" trigger="hover" content="此代理下新注册会员会归属到指定会员等级" placement="right-start">
          <Icons :type="'bangzhutishi'" :size="20" :color="'#b6afaf'"></Icons>
        </Poptip>
      </FormItem>
      <FormItem label="状态">
        <Select v-model="formKey.status" class="w340x">
          <Option value="yes">正常</Option>
          <Option value="no">停用</Option>
        </Select>
      </FormItem>
      <FormItem label="备注信息">
        <Input
          v-model="formKey.remark"
          type="textarea"
          :rows="4"
          class="w340x"
          placeholder="此栏位仅供管理者记录其他资讯，会员无法检视"
        />
      </FormItem>
      <div v-show="rebateShow">
        <rebate-select ref="rebateSelect" :data="rebate" @on-rebate-change="onRebateChange"></rebate-select>
        <refund-select ref="refundSelect" :data="refund" @on-refund-change="onRefundChange"></refund-select>
      </div>
      <FormItem>
        <Button
          class="ivu-btn bg mt15 w340 ft20"
          @click="submit"
          :loading="$root.editBtnLoading"
        >确认新增</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import Icons from "@/components/icons";
import RefundSelect from "@/components/refund-select";
import RebateSelect from "@/components/rebate-select";
import LevelSelect from "@/components/level-select";
import { agencyAdd, agencyRebatePlatform } from "@/api/agency";
import { getMemberTableData } from "@/api/member";
import AutoSearch from "@/components/auto-search";
export default {
  name: "memberAdd",
  components: { Icons, LevelSelect, RefundSelect, RebateSelect, AutoSearch },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '' || value === undefined) {
        callback(new Error('请选择会员等级'));
      } else {
        callback();
      }
    }
    const validatePassTwo = (rule, value, callback) => {
      if (this.$refs.autoSearch.value === '' || this.$refs.autoSearch.value === undefined) {
        callback(new Error('请输入或选择上级代理账号'));
      } else {
        callback();
      }
    }
    return {
      stageValue: "", //用来提交做校验使用，防止用户选择后又加新数据
      showFlag: true, //true为代理显示,false为大股东显示
      rebateShow: false, //返点，返水显示
      levelAlias: "",
      rebate: [],
      refund: {},
      formKey: {
        status: "yes",
        agencyType: "member",
        passwd: "123456",
        levelId: "0.1",
        levelLabel: "",
        superiorUserName: ""
      },
      rules: {
        superiorUserName: {
          required: true,
          validator: validatePassTwo,
          trigger: 'blur'
        },
        userName: [
          {
            required: true,
            message: "请输入正确的账号",
            trigger: "blur"
          },
          {
            pattern: /^[A-Za-z0-9_]{6,20}$/,
            message: "6-20位数字或字母",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    "formKey.agencyType"(newVal, oldVal) {
      this.resetForm();
        //清空选择等级以及校验值，清空会员账号值，算了难得封装了
        this.$refs.levelSelect.reset("single");
        this.formKey.levelLabel = "";
        //初始化等级
        this.$nextTick(() => this.$refs.levelSelect.init(this.$root.nowSite.id));
      if (newVal == "agency" || newVal == "member") {
        this.showFlag = true;
        this.formKey = {
          agencyType: newVal,
          passwd: "123456",
          status: "yes"
        };
        this.rebateShow = false;
        if (this.formKey.superiorUserName) {
          this.rebateShow = true;
        }
      } else if (newVal === "shareholder") {
        this.showFlag = false;
        this.formKey = {
          agencyType: newVal,
          passwd: "abc1233123",
          status: "yes"
        };
        //默认大股东选择VIP1
        this.$nextTick(() => {
          this.$refs.levelSelect.setDefaultLevel('1', 'vip1')
        })
        let postData = {
          uname: "",
          siteId: this.$root.nowSite.id
        };
        this.getRebateSetting(postData);

      }
    },
    "$root.nowSite": {
      handler(val, oldVal) {
        this.$nextTick(() => {
          const { name } = this.$route;
          name === "memberAdd" && this.$nextTick(() => this.$refs.levelSelect.init(val.id));
        });
      },
      deep: true,
      immediate: true
    }
    ,'formKey.superiorUserName'(val,oldVal) {
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$router.push({
        name: "memberAdd",
        params: { page: "create" }
      });
    });
  },
  methods: {
    changeShow(flag) {
      this.rebateShow = flag;
    },
    resetForm() {
      for (let key in this.formKey) {
        this.formKey[key] = "";
      }
    },
    // 获取用户层级
    onLevelChange(res) {
      this.formKey.levelId = res.levelLabel;
      this.formKey.levelLabel = res.levelLabel;
    },
    // 获取上级代理账号
    getSuperior(value) {
      if (value == false) {
        this.rebateShow = false;
      } else {
        this.formKey.superiorUserName = value;
        this.stageValue = value;
        let postData = {
          uname: value,
          siteId: this.$root.nowSite.id
        };
        this.getRebateSetting(postData);
        let data = {
          siteId: this.$root.nowSite.id,
          typeTag: "userName",
          content: value
        };
        this.getDefaultId({ params: data });
      }
    },
    //获取默认的id
    getDefaultId(data) {
      getMemberTableData(data).then(res => {
        this.$refs.levelSelect.setDefaultLevel(
          res.data.data[0].levelId,
          res.data.data[0].levelName
        );
      });
    },
    gteOtherName(val) {
      this.formKey.superiorUserName = val;
      let postData = {
        uname: val,
        siteId: this.$root.nowSite.id
      };
      this.getRebateSetting(postData);
    },
    onRebateChange(res) {
      this.formKey.rebate = res;
    },
    onRefundChange(res) {
      this.formKey.refund = res;
    },
    // 获取返水、返点数据
    getRebateSetting(data) {
      agencyRebatePlatform(data).then(res => {
        let { rebate, platform } = res.data;
        // 给rebate添加父级返点属性
        rebate.forEach(item => {
          item.parent_rebate = item.rebate;
        });
        this.rebate = rebate;
        // 给refund添加父级返水属性
        for (let i in platform) {
          platform[i].list.forEach(item => {
            item.parent_refund = item.value;
            item.name_cn = item.name;
            item.name_en = item.key;
            item.refund = item.value;
          });
        }
        this.refund = platform;
        this.rebateShow = true;
      });
    },
    submit() {
      this.$refs.formKey.validate(valid => {
        if (!this.formKey.levelLabel) {
          this.$Tip.info({ content: "请选择会员等级" });
          return false;
        }
        //过滤大股东，当用户不触发onselect事件，在提交处触发
        if (this.formKey.agencyType !== "shareholder") {
          // if (!this.formKey.rebate) {
          this.getSuperior(this.$refs.autoSearch.value);
          // }
          if (!this.formKey.superiorUserName) {
            this.$Tip.info({ content: "请输入上级代理账号" });
            return false;
          }
        }
        if (valid) {
          if (!this.formKey.platform) {
            this.formKey.platform = this.$refs.refundSelect.createData();
          }
          if (!this.formKey.rebate) {
            this.formKey.rebate = this.$refs.rebateSelect.createData();
          }
          let { agencyType } = this.formKey;
          let postData = { ...this.formKey, siteId: this.$root.nowSite.id };
          agencyAdd(postData).then(res => {
            if (res.code == 200) {
              let content =
                agencyType == "member"
                  ? "新增会员成功"
                  : agencyType == "agency"
                  ? "新增代理成功"
                  : "新增大股东成功";
              this.$Tip.success({
                content,
                onOk: () => {
                  if (agencyType !== "shareholder") {
                    this.$refs.autoSearch.value = ""; //清空上级代理搜索值
                  }
                  this.$refs.levelSelect.reset("single"); // 清空等级选项
                  this.formKey.superiorUserName = ""; //清空会员名称
                  this.resetForm();
                  this.memberSearch();
                }
              });
              this.$Tip.hide();
              this.$Message.config({
                top: 600,
                duration: 3
              });
              this.$Message.success(content);
            }
          });
        }
      });
    },
    memberSearch() {
      this.$router.push({ name: "memberSearch" });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
/deep/.ivu-form-item-error-tip {
  left: 340px;
  top: 5px;
}
.center {
  text-align: center;
}
.w340 {
  width: 340px !important;
}
.w340x {
  /deep/textarea.ivu-input {
    max-height: 200px;
  }
}
</style>
