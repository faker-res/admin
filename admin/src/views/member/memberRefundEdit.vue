<template>
  <div class="v2-edit">
    <div class="items bb">
      <div class="title">基础设置</div>
      <div class="section backWater">
        <Form ref="Form" :model="formKey" :rules="rules" :key="$route.params.page">
          <FormItem class="ti10" label="等级名称" prop="levelName">
            <Level-select
              ref="levelSelect"
              :width="320"
              class="ib"
              v-model="formKey.levelName"
              v-if="$route.params.page==='create'"
              placeholder="等级名称"
              :levelType="'refund'"
              @on-level-change="levelChange"
            />
            <Input
              v-else
              class="w320x"
              :value="formKey.levelName"
              :disabled="$route.params.page==='edit'"
              placeholder="等级名称"
            />
          </FormItem>
          <FormItem class="ti10" label="等级别称" prop="levelAlias">
            <Input class="w320x" placeholder="等级别称" v-model="formKey.levelAlias"/>
          </FormItem>
          <FormItem class="ti10" label="最低下注" prop="lessBetAmount">
            <Input-number class="w320x" placeholder="最低下注" v-model="formKey.lessBetAmount"
            :precision="2" :max="99999999.99" :min="0.01"
            />
          </FormItem>
          <FormItem class="ti10" label="最大返水" prop="maxBonusAmonut">
            <Input-number class="w320x" placeholder="最大返水" v-model="formKey.maxBonusAmonut"
            :precision="2" :max="99999999.99" :min="0.00"
            />
          </FormItem>
          <!-- <FormItem class="ti10" label="备注信息" prop="remark">
            <Input
              class="w320x"
              type="textarea"
              :rows="4"
              placeholder="此栏位仅供管理者记录其他资讯，会员无法检视"
              v-model="formKey.remark"
            />
          </FormItem>-->
          <FormItem class="w25 ti10">
            <div style="padding-left:100px" @click="formKey.default==='yes'?formKey.default='no':formKey.default==='no'?formKey.default='yes':''">
              <Icon
                v-if="formKey.default==='no'"
                type="md-checkmark-circle"
                size="16"
                color="#E4E4E4"
                class="pr5"
              />
              <Icon
                v-else
                type="md-checkmark-circle"
                size="16"
                color="#57a3f3"
                class="pr5"
              />
              <span class="ml5">设为默认？</span>
            </div>
          </FormItem>
        </Form>
      </div>
    </div>
    <div class="items mt15 bb">
      <div class="section">
        <RefundSelect ref="RefundSelect" :data="refund" @on-refund-change="onRefundChange"></RefundSelect>
      </div>
    </div>
    <div class="items mt15">
      <div class="flex-row p10">
        <div class="w40 flex-row">
          <Button
            type="primary"
            class="more-btn"
            @click="submit"
            :loading="$root.editBtnLoading"
          >确认提交</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Icons from "@/components/icons";
import RefundSelect from "@/components/refund-select";
import LevelSelect from "@/components/level-select";
import {
  getrefundLevelDetailData,
  refundLevelUpdateData,
  refundLevelCreateData
} from "@/api/member";
import { agencyPlatform } from "@/api/common";
import { type } from "os";
export default {
  components: { Icons, RefundSelect, LevelSelect },
  data() {
    return {
      refund: [],
      formKey: {
        id: "",
        levelName: "",
        levelLabel: "",
        levelAlias: "",
        lessBetAmount: 0,
        maxBonusAmonut: 0,
        remark: "",
        default: "no"
      },
      rules: {
        levelName: [
          {
            required: true,
            message: "请选择等级名称",
            trigger: "change"
          }
        ],
        levelAlias: [
          {
            required: true,
            message: "请输入返水等级别称",
            trigger: "blur"
          }
        ],
        lessBetAmount: [
          {
            //输入框为空提示请输入正确的最低下注金额
            type: 'number',
            required: true,
            message: "请输入正确的最低下注金额",
            trigger: "blur"
          },
          {
             //输入框金额边界值：0<金额<=99999999.99
            type: 'number',
            pattern: /^(([0-9]{1}\d{0,7}\.\d{0,2})|([1-9]{1}\d{0,7})|(0\.[1-9]{1}\d?)|(0\.\d{1}[1-9]{1}))$/,
            message: "请输入正确的最低下注金额",
            trigger: "blur"
          }
        ],
        maxBonusAmonut: [
          {
            type: 'number',
            required: true,
            message: "请输入最大返水金额",
            trigger: "blur"
          },
          // {
          //   // pattern: /^[0-9]*[1-9][0-9]*$/,
          //   pattern: /^[+]{0,1}(\d+)$/,
          //   message: "最大返水金额限制必须是个整数",
          //   trigger: "blur"
          // },
          {
            //输入框金额边界值：0<金额<=99999999.99,还要验证0非要限制输入使用inputnumber
            type: 'number',
            pattern: /^(([1-9]{1}\d{0,7}\.\d{0,2})|([1-9]{1}\d{0,7})|(0\.[1-9]{1}\d?)|(0\.\d{1}[1-9]{1})|(0{1}))$/,
            message: "请输入正确最大返水金额限制",
            trigger: "blur"
          }
        ],
        remark: [
          {
            required: true,
            message: "请输入备注信息",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    const { siteId, id } = this.$route.query;
    const { page } = this.$route.params;
    const data = { siteId, id };
    if (page === "edit") {
      data.purpose = "update";
      this.getData(data);
    } else {
      this.getDefaultRefund();
    }
    if (page === "create") {
      this.getLevelName();
    }
  },
  methods: {
    getDefaultRefund() {
      let data = { siteId: 1 };
      agencyPlatform(data).then(res => {
        this.refund = res.data.zore;
      });
    },
    onRefundChange(res) {
      this.formKey.refund = res;
    },
    getData(data) {
      getrefundLevelDetailData(data).then(res => {
        const { basic, refund } = res.data;
        if (this.$route.params.page === "edit") {
          for (let key in this.formKey) {
            this.formKey[key] = basic[key];
          }
          // this.formKey.lessBetAmount = +basic.lessBetAmount.split(".")[0];
          // this.formKey.maxBonusAmonut = +basic.maxBonusAmonut.split(".")[0];
          this.formKey.lessBetAmount = +basic.lessBetAmount
          this.formKey.maxBonusAmonut = +basic.maxBonusAmonut
        }
        this.refund = refund;
      });
    },
    getLevelName() {
      this.$nextTick(() => {
        this.$refs.levelSelect.init(this.$root.nowSite.id, {
          levelLabel: "1",
          levelName: "vip1"
        });
      });
    },
    levelChange(res) {
      this.formKey.levelName = res.levelName;
      this.formKey.levelLabel = +res.levelLabel;
    },
    submit() {
      this.$refs.Form.validate(valid => {
        for (let key in this.formKey) {
          if (!this.formKey[key]) delete this.formKey[key];
        }
        if (!this.formKey.refund) {
          this.formKey.refund = this.$refs.RefundSelect.createData();
        }
        if (valid) {
          if (this.$route.params.page === "create") {
            const { siteName, id } = this.$root.nowSite;
            let params = { ...this.formKey };
            params.siteId = id;
            params.siteName = siteName;
            params.default = params.default === "yes" ? 1 : 0;
            params.lessBetAmount = +params.lessBetAmount;
            params.maxBonusAmonut = +params.maxBonusAmonut;
            this.$root.startEditLoading();
            refundLevelCreateData(params).then(res => {
              if (res.code && res.code == 200)
                this.$router.push({ name: "memberRefund" });
            });
          }
          if (this.$route.params.page === "edit") {
            const { siteId, id } = this.$route.query;
            let params = { ...this.formKey };
            params.siteId = siteId;
            params.default = params.default === "yes" ? 1 : 0;
            params.lessBetAmount = +params.lessBetAmount;
            params.maxBonusAmonut = +params.maxBonusAmonut;
            this.$root.startEditLoading();
            refundLevelUpdateData(params).then(res => {
              if (res.code && res.code == 200) {
                this.$Tip.success({
                  content: "修改返水等级成功",
                  onOk: () => {
                    this.$router.go(-1);
                  }
                });
              }
            });
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
.v2-edit {
  .backWater {
    /deep/.ivu-select-placeholder,
    /deep/.ivu-select-selected-value {
      padding: 0;
    }
    /deep/.ivu-input-number {
      margin-left: 10px;
      .ivu-input-number-input {
        padding: 0;
      }
      .ivu-input-number-handler-up-inner,
      .ivu-input-number-handler-down-inner {
        right: 15px;
      }
    }
  }
}
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

/deep/.ivu-form-item-error-tip {
  left: 340px !important;
  width: 200px;
}

/deep/.ivu-form-item-content .ivu-form-item-error-tip {
  top: 0;
}
/deep/.ivu-form-item-content {
  line-height: 0;
}
</style>
