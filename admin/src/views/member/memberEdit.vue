<template>
  <div class="v2-edit">
    <div class="items bb">
      <div class="title">基础设置</div>
      <div class="section">
        <Form inline :label-width="100" ref="Form" :model="formKey" :rules="rules">
          <FormItem class="w25 ti10" label="会员账号" prop="userName">
            <Input class="s-140" placeholder="会员账号" v-model="formKey.userName" disabled/>
          </FormItem>
          <FormItem class="w25 ti10" label="上级代理" prop="agencyName" v-if="formKey.agencyId!==0">
            <AutoSearch
              class="auto-serch"
              ref="autoSearch"
              :width="140"
              :clearable="false"
              @sendSuperior="getSuperior"
              @sendId="getId"
              :placeholder="'默认查询'"
            ></AutoSearch>
          </FormItem>
          <FormItem class="w25 ti10" label="真实姓名" prop="realName">
            <Input class="s-140" placeholder="暂无信息" v-model="formKey.realName" disabled/>
          </FormItem>
          <FormItem class="w25 ti10" label="邮箱账号" prop="email">
            <Input class="s-200" placeholder="暂无信息" v-model="formKey.email"/>
          </FormItem>
          <FormItem class="w25 ti10" label="手机号码" prop="phone">
            <Input class="s-140" placeholder="暂无信息" v-model="formKey.phone"/>
          </FormItem>
          <FormItem class="w25 ti10" label="微信账号" prop="wechat">
            <Input class="s-140" placeholder="暂无信息" v-model="formKey.wechat"/>
          </FormItem>
          <FormItem class="w50 ti10" label="备注信息" prop="remark">
            <Input class="s-436" placeholder="此栏位仅供管理者记录其他资讯，会员无法检视" v-model="formKey.remark"/>
          </FormItem>
        </Form>
      </div>
    </div>
    <div class="items mt15 bb">
      <div class="section">
        <RebateSelect
          :showParent="false"
          ref="rebateSelect"
          :data="rebate"
          @on-rebate-change="onRebateChange"
        ></RebateSelect>
      </div>
    </div>
    <div class="items mt15 bb">
      <div class="section">
        <RefundSelect
          :data="refund"
          ref="refundSelect"
          :showParent="false"
          @on-refund-change="onRefundChange"
        ></RefundSelect>
      </div>
    </div>
    <div class="items mt15">
      <div class="flex-row p10">
        <div class="flex-row">
          <Button
            type="primary"
            :loading="$root.editBtnLoading"
            class="more-btn ml40 ivu-btn export-ok"
            style="width:140px;"
            @click="submit"
          >确认保存</Button>
          <Button class="more-btn ml40"
            v-if="(adminType == 'super') || (authInPage.indexOf('memberResetPassword') != -1)"
           @click="resetMemberPassowrd('secret')">重设密保答案</Button>
          <Button class="more-btn ml40" @click="resetMemberPassowrd('payPwd')"
            v-if="(adminType == 'super') || (authInPage.indexOf('memberResetPassword') != -1)"
          >重设取款密码</Button>
          <Button class="more-btn ml40" @click="resetMemberPassowrd('loginPwd')"
            v-if="(adminType == 'super') || (authInPage.indexOf('memberResetPassword') != -1)"
          >重设登陆密码</Button>
        </div>
      </div>
    </div>
    <Modals ref="successModal" width="480" height="280" :title="title">
      <div slot="content" class="v2-form-wrapper flex-column">
        <div class="mb40 clearfix">
          <Input class="fl w70 disabled" v-model="result" disabled/>
          <Button
            class="bgc pl20 fl ft20"
            type="info"
            size="small"
            v-clipboard:copy="result"
            v-clipboard:success="onCopy"
          >
            <span class="ft20 blue-font">复制</span>
          </Button>
        </div>
        <Button type="primary" class="export-ok ft20" @click="secondSure">确定</Button>
      </div>
    </Modals>
  </div>
</template>
<script>
import RebateSelect from "@/components/rebate-select";
import AutoSearch from "_c/auto-search";
import Modals from "@/components/modals";
import RefundSelect from "@/components/refund-select";
import { memberUpdate, memberDetail, memberResetPassword } from "@/api/member";
import { agencyRebatePlatform } from "@/api/agency";
import { getUserType } from '@/libs/util';
export default {
  components: { RebateSelect, RefundSelect, Modals, AutoSearch },
  data() {
    return {
      adminType: getUserType(),
       authInPage: JSON.parse(localStorage.authInPage),
      title: "", // 重置成功之后的信息
      result: "",
      formKey: {
        userName: "",
        agencyName: "",
        agencyId: -1,
        siteId: "",
        uid: "",
        realName: "",
        phone: "",
        email: "",
        wechat: "",
        remark: "",
        rebate: "",
        refund: ""
      },
      rebate: [],
      refund: [],
      bankInfo: [],
      rules: {
        userName: [
          {
            required: true,
            message: "请输入会员账号",
            trigger: "blur"
          }
        ],
        agencyName: [
          {
            required: true,
            message: "请选择上级代理",
            trigger: "blur"
          }
        ],
        email: [
          { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
        ],
        phone: [
          {
            pattern: /^1(3|4|5|7|8)\d{9}$/,
            message: "请输入正确的手机格式",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    const { uid, siteId } = this.$route.query;
    this.getDetails({params: { uid, siteId }});
  },
  watch: {
    "formKey.agencyName": {
      handler(val, oldVal) {
        this.$refs.autoSearch.setDefault(val);
        let postData = {
          uname: val,
          siteId: this.$root.nowSite.id
        };
        this.getRebateSetting(postData);
      }
    }
  },
  methods: {
    // 获取站点返水
    getSiteData() {
      let data = {
          siteId: this.$root.nowSite.id,
          uname: ''
        }
        agencyRebatePlatform(data).then(res => {
          let { rebate, platform } = res.data;
          this.rebate.forEach(item => {
            let a = rebate.filter(k => k.id === item.id)
            item.parent_rebate = a[0] ? a[0].rebate : ''
          });
          for (let key in this.refund) {
            this.refund[key].list.forEach(item => {
              let a = platform[key].list.filter(k => k.key === item.name_en)
              item.parent_refund = a[0] ? a[0].value : ''
            });
          }
          this.rebateShow = true;
        });
    },
    // 获取自动搜索框的代理名
    getSuperior(val) {
      this.formKey.agencyName = val;
    },
    getId(data) {
      this.formKey.agencyId = data
    },
    getDetails(params) {
      memberDetail(params).then(res => {
        const { basic, rebate, refund, bank_info } = res.data;
        this.rebate = rebate;
        this.rebate.forEach(item => {
          item.rebate = Number(item.rebate).toFixed(2);
        });
        this.refund = refund;
        this.bankInfo = bank_info;
        for (let key1 in this.formKey) {
          for (let key2 in basic) {
            if (key1 !== key2) continue;
            this.formKey[key1] = basic[key2];
          }
        }
      }).then(a => {
        if (this.$route.query.agencyId == 0) {
          this.getSiteData()
        }
      })
    },
    secondSure() {
      this.$refs.successModal.hide();
      this.$Message.success(this.title)
    },
    getRebateSetting(data) {
      agencyRebatePlatform(data).then(res => {
        let { rebate, platform } = res.data;
        this.rebate.forEach(item => {
          let a = rebate.filter(k => k.id === item.id)
          item.parent_rebate = a[0] ? a[0].rebate : ""
        });
        for (let key in this.refund) {
          this.refund[key].list.forEach(item => {
            let a = platform[key].list.filter(k => k.key === item.name_en)
            item.parent_refund = a[0] ? a[0].value: ''
          });
        }
        this.rebateShow = true;
      });
    },
    onRebateChange(res) {
      this.formKey.rebate = res;s
    },
    onRefundChange(res) {
      this.formKey.refund = res;
    },
    onCopy() {
      this.$Message.success(`复制${this.result}成功!`);
      this.$refs.successModal.hide()
    },
    submit() {
      this.$root.startEditLoading();
      this.$refs.Form.validate(valid => {
        if (valid) {
          const { siteId, agencyId } = this.$route.query;
          let params = { ...this.formKey };
          params.siteId = siteId;
          for (let key in params) {
            if (!params[key]) delete params[key];
          }
          if (agencyId == 0) {
            params.agencyId = agencyId;
            params.agencyName = "";
          }
          delete params.userName;
          if (!params.rebate) {
            params.rebate = this.$refs.rebateSelect.createData();
          }
          if (!params.refund) {
            params.refund = this.$refs.refundSelect.createData();
          }
          memberUpdate(params).then((res) => {
              if (res.code && res.code == 200) {
                this.$router.push({ name: 'memberSearch'})
              }
            })
        }
      });
    },
    //重设
    resetMemberPassowrd(type) {
      const { siteId, uid } = this.$route.query;
      let data = { siteId, uid, type };
      let content, msg;
      switch (type) {
        case "secret":
          content = "您确认要重设密保答案吗？";
          msg = "重设密保答案成功！";
          break;
        case "loginPwd":
          content = "您确认要重设登录密码吗？";
          msg = "重设登录密码成功！";
          break;
        case "payPwd":
          content = "你确定要重设取款密码吗？";
          msg = "重设取款密码成功！";
          break;
      }
      this.$Tip.confirm({
        content,
        onOk: () => {
          memberResetPassword(data, 123).then(res => {
            this.result = res.data;
            this.title = msg;
            this.$refs.successModal.show();
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
/deep/.ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
  padding-left: 0;
}
/deep/.ivu-collapse-content {
  padding: 0;
}
.ivu-collapse-content > .ivu-collapse-content-box {
  padding: 0;
}
.ivu-collapse {
  border: none;
}
.info {
  justify-content: flex-start;
}
.v2-form-wrapper {
  height: 100%;
}
/deep/.auto-serch {
  .ivu-input-wrapper {
    left: -10px;
  }
}
/deep/.ivu-input[disabled]{background-color:#fff !important;color:#808080 !important;}
.mb40,.result{
    display: flex;
    justify-content: space-evenly;
    .gouxuan{width:25px;height:25px;border-radius:16px;background-color:#62B1FD;display: unset;}
}
</style>
