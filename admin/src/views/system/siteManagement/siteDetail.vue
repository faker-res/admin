<template>
  <div>
    <div class="clearfix">
      <p class="pt10 pb10">个人信息</p>
      <div class="w25 fl b h40">
        <span class="pl20">站点名称：</span>
        <span>{{siteInfo.siteName}}</span>
      </div>
      <div class="w25 fl bt bb br h40">
        <span class="pl20">站点代号：</span>
        <span>{{siteInfo.siteCode}}</span>
      </div>
      <div class="w25 fl bt bb br h40">
        <span class="pl20">创建人：</span>
        <span>{{siteInfo.createUserName}}</span>
      </div>
      <div class="w25 fl bt bb br h40">
        <span class="pl20">创建时间：</span>
        <span>{{siteInfo.created_at ? this.$root.unixTime(siteInfo.created_at) : '-'}}</span>
      </div>
    </div>
    <div class="clearfix mt10">
      <p class="pt10 pb10">站点配置</p>
      <div class="w33 b h40 fl">
        <span class="pl20">最低存款：</span>
        <span>{{siteInfo.siteConfig.limit.paymentLimit}}</span>
      </div>
      <div class="w33 fl h40 bt bb br">
        <span class="pl20">汇款赠送比例：</span>
        <span>{{siteInfo.siteConfig.limit.paymentBonus}}</span>
      </div>
      <div class="w33 fl h40 bt bb br">
        <span class="pl20">最低取款：</span>
        <span>{{siteInfo.siteConfig.limit.withdrawalsLimit}}</span>
      </div>
      <div class="w33 fl h40 bl br bb">
        <span class="pl20">彩票最低下注金额：</span>
        <span>{{siteInfo.siteConfig.limit.lotteryBetMin}}</span>
      </div>
      <div class="w33 fl h40 bb br">
        <span class="pl20">彩票最高下注金额：</span>
        <span>{{siteInfo.siteConfig.limit.lotteryBetMax}}</span>
      </div>
      <div class="w33 fl h40 bb br">
        <span class="pl20">取款打码倍数：</span>
        <span>{{siteInfo.siteConfig.limit.withdrawalsMultiple}}</span>
      </div>
      <div class="w33 fl h40 bb br bl">
        <span class="pl20">待出款免审核：</span>
        <span>{{this.$root.text(siteInfo.siteConfig.limit.checkBetAmount)}}</span>
      </div>
      <div class="w33 fl h40 bb br">
        <span class="pl20">PC活动图：</span>
        <span>{{this.$root.text(siteInfo.siteConfig.activity_pic_size.pc)}}</span>
      </div>
      <div class="w33 fl h40 bb br">
        <span class="pl20">移动端活动图：</span>
        <span>{{this.$root.text(siteInfo.siteConfig.activity_pic_size.app)}}</span>
      </div>
      <div class="w33 fl h40 bb br bl">
        <span class="pl20">自动出款上限：</span>
        <span>{{this.$root.text(siteInfo.siteConfig.limit.onlineForceAudit)}}</span>
      </div>
      <div class="w33 fl h40 bb br">
        <span class="pl20">移动banner图：</span>
        <span>{{this.$root.text(siteInfo.siteConfig.banner_pic_size.app)}}</span>
      </div>
      <div class="w33 fl h40 bb br">
        <span class="pl20">PC端banner图：</span>
        <span>{{this.$root.text(siteInfo.siteConfig.banner_pic_size.pc)}}</span>
      </div>
      <div class="w33 fl h40 bb br bl">
        <span class="pl20">APP域名：</span>
        <span>{{this.$root.text(siteInfo.siteConfig.app_domain)}}</span>
      </div>
      <div class="w33 fl h40 bb br">
        <span class="pl20">网站维护状态配置：</span>
        <span>{{siteInfo.siteConfig.close.status == 'off' ? '正常' : '维护中'}}</span>
      </div>
      <div class="w33 fl h40 br">
        <span class="pl20">静态资源路径：</span>
        <span>{{this.$root.text(siteInfo.siteConfig.statics)}}</span>
      </div>
      <div class="w33 fl lh40 br bb bl">
        <span class="pl20">PC注册填写项：</span>
        <span style="display: block;" class="h40 pl20">{{this.$root.text(siteInfo.siteConfig.register.pc.join(','))}}</span>
      </div>
      <div class="w33 fl br lh40 bb">
        <span class="pl20">H5注册填写项：</span>
        <span style="display: block;" class="h40 pl20">{{this.$root.text(siteInfo.siteConfig.register.h5.join(','))}}</span>
      </div>
      <div class="w33 fl br lh40 bb bt">
        <span class="pl20">APP注册填写项：</span>
        <span style="display:block;" class="h40 pl20">{{this.$root.text(siteInfo.siteConfig.register.app.join(','))}}</span>
      </div>
    </div>
    <div class="mt20">
      <RebateSelect :data="siteInfo.rebate"></RebateSelect>
    </div>
  </div>
</template>
<script>
import RebateSelect from "_c/rebate-select";
import { siteManagementDetail } from "@/api/system";
export default {
  name: "siteDetail",
  components: {
    RebateSelect
  },
  data() {
    return {
      siteInfo: {
        siteConfig: {
          limit: {},
          activity_pic_size: {},
          banner_pic_size: {},
          close: {},
          register: {
            pc: [],
            app: [],
            h5: []
          },
          Android: {},
          IOS: {},
          service:{}
        }
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      let id = this.$route.query.id;
      this.getData({ id });
    });
  },
  methods: {
    getData(data) {
      siteManagementDetail(data).then(res => {
        this.siteInfo = res.data;
        // 处理异常数据
        if(!this.siteInfo.siteConfig.activity_pic_size){
          this.siteInfo.siteConfig.activity_pic_size = { pc: '', app: ''}
        }
        if(!this.siteInfo.siteConfig.banner_pic_size) {
          this.siteInfo.siteConfig.banner_pic_size = { pc: '',app: ''}
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.h40 {
  height: 40px;
  line-height: 40px;
}
.lh40 {
  line-height: 40px;
}
</style>

