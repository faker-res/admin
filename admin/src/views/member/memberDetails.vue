<template>
  <div class="v2-details">
    <div class="items mt15">
      <div class="title">个人信息</div>
      <div class="section br flex-row">
        <div class="row ti20 btl w25">
          <div class="col bb">会员账号：{{basicInfo.userName}}</div>
          <div class="col bb">上级代理：{{basicInfo.agencyName}}</div>
          <div class="col bb">会员等级: {{basicInfo.levelName}}</div>
          <div class="col bb">登录时间：{{$root.unixTime(basicInfo.lastTime)}}</div>
        </div>
        <div class="row ti20 btl w20">
          <div class="col bb">真实姓名：{{basicInfo.realName ? basicInfo.realName : '暂无信息'}}</div>
          <div class="col bb">手机号码：{{basicInfo.phone ? basicInfo.phone : '暂无信息'}}</div>
          <div class="col bb">邮箱账号：{{basicInfo.email ? basicInfo.email : '暂无信息'}}</div>
          <div class="col bb">微信账号：{{basicInfo.wechat ? basicInfo.wechat : '暂无信息'}}</div>
        </div>
        <div class="row ti20 btl w20">
          <div class="col bb">存款总额：{{basicInfo.total_deposit_amount}}</div>
          <div class="col bb">公司入款：{{basicInfo.offline_deposit_amount}}</div>
          <div class="col bb">线上支付：{{basicInfo.online_deposit_amount}}</div>
          <div class="col bb">存款大笔：0.00</div>
        </div>
        <div class="row ti20 btl w20">
          <div class="col bb">提款总额：{{basicInfo.withdrawals_amount}}</div>
          <div class="col bb">有效投注：{{basicInfo.valid_bet_amount}}</div>
          <div class="col bb">会员输赢：0.00</div>
          <div class="col bb">现金利润：0.00</div>
          <!-- <div class="col bb">会员报表：0.00</div>
          <div class="col bb">现金报表：0.00</div> -->
        </div>
        <div class="row ti20 btl w20">
          <div class="col bb">棋牌金管家：0级</div>
          <div class="col bb">视讯金管家：0级</div>
          <div class="col bb">电子金管家：10级</div>
          <div class="col bb">彩票金管家：10级</div>
        </div>
        <div class="row ti20 btl w20">
          <div class="col bb">代理收入{{basicInfo.refund_amount}}</div>
          <!-- <div class="col bb">返水金额：{{basicInfo.refund_amount}}</div> -->
          <div class="col bb">优惠金额：0.00</div>
          <div class="col bb">
            历史登录：
            <a class="blue-font" @click="loginHistory">历史登录</a>
          </div>
          <div class="col bb">注册IP：{{basicInfo.createIp}}</div>
        </div>
      </div>
      <div class="remarks ti20 bl br bb">备注：{{basicInfo.remark}}</div>
    </div>
    <div class="items mt15">
      <div class="title">银行信息</div>
      <div class="section gray-bg clearfix pt15 pb15 pl4">
        <div>
          <div class="bank-card fl ml10" v-for="t in bankInfo" :key="t.id">
            <Icons
              type="morenyinhangqia"
              class="morenyinhangqia"
              size="50"
              color="#62B1FD"
              v-show="t.default === 'yes'"
            ></Icons>
            <div class="bank-name clearfix">
              <Icons class="logo fl ml5" type="zhongguoyinhang" size="40" color="#c22527"></Icons>
              <div class="fl">
                <div class="name ft20 pl20">{{t.bankName}}</div>
                <div class="address gray-font pl20">{{t.cardAddress}}</div>
              </div>
            </div>
            <div class="bank-num">
              <div class="num ml5 ft18 g66Color">{{t.cardNum}}</div>
              <div class="real-name gray-font ml5">{{t.cardName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="items mt15">
      <RebateSelect :data="rebate"></RebateSelect>
    </div>
    <div class="items mt15">
      <RefundSelect :data="refund"></RefundSelect>
    </div>
    <div class="items mt15">
      <div class="flex-row pt20 bt">
        <div class="w30 flex-row">
          <Button class="more-btn f6Color" @click="resetMemberPassowrd('secret')"
            v-if="(adminType == 'super') || (authInPage.indexOf('memberResetPassword') != -1)"
          >重设密保答案</Button>
          <Button class="more-btn ml40 f6Color" @click="resetMemberPassowrd('payPwd')"
            v-if="(adminType == 'super') || (authInPage.indexOf('memberResetPassword') != -1)"
          >重设取款密码</Button>
          <Button class="more-btn ml40 f6Color" @click="resetMemberPassowrd('loginPwd')"
            v-if="(adminType == 'super') || (authInPage.indexOf('memberResetPassword') != -1)"
          >重设登录密码</Button>
        </div>
      </div>
    </div>
    <Modals ref="successModal" width="480" height="280" :title="title">
      <div slot="content" class="v2-form-wrapper flex-column">
        <div class="mb40 ft20"><span class="gouxuan"><Icons type="gouxuan" color="#fff" size="20"/></span>重设{{this.okmsg}}成功！</div>
        <div class="mb40 clearfix result">
          <Input class="fl w50 disabled" v-model="result" disabled/>
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
    <Modals ref="historyModal" title="历史登录" width="800">
      <div slot="content" class="modal mb20 ml10 mr10">
        <!-- <div style="height:500px;overflow:auto;"> -->
        <Tables
          :columns="historyTable.columns"
          :loading="historyTable.loading"
          :pageFixShow="true"
          :value="historyTable.data"
          :total="historyTable.total"
          :show-sizer="false"
          @on-page-change="onPageChange"
        ></Tables>
        <!-- </div> -->
      </div>
    </Modals>
  </div>
</template>
<script>
import Icons from "@/components/icons";
import Modals from "@/components/modals";
import Tables from "@/components/tables";
import { getMemberLoginLog } from "@/api/data";
import RebateSelect from "@/components/rebate-select";
import RefundSelect from "@/components/refund-select";
import { memberDetail, memberResetPassword } from "@/api/member";
import { mapStatem, mapMutations, mapState} from 'vuex';
import { getUserType } from '@/libs/util';
export default {
  components: { Icons, Modals, Tables, RebateSelect, RefundSelect },
  data() {
    return {
      title: '',
      adminType: getUserType(),
       authInPage: JSON.parse(localStorage.authInPage),
      basicInfo: {},
      bankInfo: {},
      rebate: [],
      refund: [],
      result: "",
      okmsg:"",
      historyTable: {
        total: 0,
        loading: true,
        columns: [
          {
            title: "登录设备",
            key: "device",
            align: "center"
          },
          {
            title: "登录域名",
            key: "domain",
            align: "center"
          },
          {
            title: "登录IP",
            key: "ip",
            align: "center"
          },
          {
            title: "归属地",
            key: "location",
            align: "center"
          },
          {
            title: "登录时间",
            key: "created_at",
            align: "center",
            render:(h,params)=>{
              return<span>{this.$root.unixTime(params.row.created_at)}</span>
            }
          }
        ],
        data: []
      }
    };
  },
  created() {
    const { siteId, uid } = this.$route.query;
    let data = {params: { siteId, uid }}
    this.getData(data);
    this.tagNavList.forEach(item => {
      if (item.name === this.$route.name) {
        item.query = this.$route.query
        item.params = this.$route.params
        item.fullPath = this.$route.fullPath
      }
    });
  },
  computed: {
    ...mapState({
      tagNavList: state => state.app.tagNavList,
    })
  },
  methods: {
    getData(data) {
      memberDetail(data).then(res => {
        const { rebate, refund, bank_info, basic } = res.data;
        this.basicInfo = basic;
        this.bankInfo = bank_info;
        this.rebate = rebate;
        this.refund = refund;
      });
    },
    onCopy(){
      this.$Message.success(`复制${this.result}成功`);
      this.$refs.successModal.hide()
    },
    secondSure() {
      this.$refs.successModal.hide();
      this.$Message.success(this.title)
    },
    loginHistory() {
      const { login_history } = this.basicInfo;
      this.$refs.historyModal.show();
      this.historyTable.loading = true;
      setTimeout(() => {
        this.historyTable.data = login_history.data
        this.historyTable.total = login_history.total
        this.historyTable.loading = false;
      }, 2000);
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
          this.okmsg = "密保答案";
          break;
        case "loginPwd":
          content = "您确认要重设登录密码吗？";
          msg = "重设登录密码成功！";
          this.okmsg = "登录密码";
          break;
        case "payPwd":
          content = "你确定要重设取款密码吗？";
          msg = "重设取款密码成功！";
          this.okmsg = "取款密码";
          break;
      }
      this.$Tip.confirm({
        content,
        onOk: () => {
          memberResetPassword(data, true).then(res => {
            this.result = res.data;
            this.title = msg;
            this.$refs.successModal.show();
          });
        }
      });
    },
    onPageChange(page) {
      let data = {
        params: { siteId: this.$route.query.siteId, uid: this.$route.query.uid },
        query: { page }
      }
      this.getData(data)
      this.loginHistory()
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
// 样式间距修改
.ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
  padding-left: 0 !important;
}
// 样式间距修改
.ivu-collapse-content {
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
// 默认的样式
.bank-card {
  position: relative;
  .icon-morenyinhangqia {
    position: absolute;
    top: -17px !important;
    right: -5px !important;
  }
}
/deep/.ivu-collapse-content {
  padding: 0;
}
/deep/.ivu-collapse-item {
  .ivu-collapse-header {
    padding: 0;
  }
}
//成功弹窗勾选icon

/deep/.ivu-input[disabled]{background-color:#fff !important;color:#808080 !important;}
.mb40,.result{
    display: flex;
    justify-content: space-evenly;
    .gouxuan{width:25px;height:25px;border-radius:16px;background-color:#62B1FD;display: unset;}
}
.modal {
	max-height: 800px;
	overflow-y: auto;
} 
</style>
