<template>
  <div class="v2-form-wrapper">
    <Form
      ref="formKey"
      :model="formKey"
      :rules="mode==='single'?singleRule:batchRule"
      :label-width="80"
      style="width:450px"
    >
      <div class="btns clearfix" style="width:340px">
        <Button
          :type="formKey.handle === '-'?'primary':'default'"
          class="fr reduce"
          icon="md-remove"
          @click="handleChange('-')"
        >减款</Button>
        <Button
          :type="formKey.handle === '+'?'primary':'default'"
          class="fr add"
          icon="md-add"
          @click="handleChange('+')"
        >加款</Button>
      </div>
      <!-- 加入key切换时候清空会员账号 -->
      <FormItem label="会员账号" class="mt10" v-show="origin == false && mode =='single'" :key="formKey.handle">
        <AutoSearch
          ref="autoSearh"
          class="w260x"
          placeholder="输入会员账号，带搜索功能"
          @sendSuperior="getSuperior"
          stage="all"
        ></AutoSearch>
        <!-- <Input v-model="formKey.userName" :style="style"/> -->
      </FormItem>
      <FormItem :label="formKey.handle==='+'?'加款类型':'减款类型'">
        <Select clearable v-model="typeValues" :style="style">
          <Option
            v-show="formKey.handle==='+'"
            v-for="item in oprateTypes.add"
            :key="item.id"
            :value="item.type+':'+item.subType"
            :label="item.subClass"
          >
            <span>{{item.subClass}}</span>
            <span :style="{float: 'right', color: '#ccc'}">{{item.class}}</span>
          </Option>
          <!-- 减款类型 -->
          <Option
            v-show="formKey.handle==='-'"
            v-for="item in oprateTypes.reduce"
            :key="item.id"
            :value="item.type+':'+item.subType"
            :label="item.subClass"
          >
            <span>{{item.subClass}}</span>
            <span :style="{float: 'right', color: '#ccc'}">{{item.class}}</span>
          </Option>
        </Select>
      </FormItem>
      <FormItem label="打码倍数" prop="multiple" v-if="formKey.handle === '+'">
        <input-number :min="0" :step="1" :max="100" v-model="formKey.multiple" :style="style"/>
      </FormItem>
      <FormItem :label="formKey.handle==='+'?'存入金额':'提出金额'" :prop="mode==='single' ? 'money' : 'amount'">
        <input-number
          v-show="mode==='single'"
          v-model="formKey.money"
          :style="style"
          :placeholder="formKey.handle==='+'?'请输入加款金额':'请输入减款金额'"
          :max="10000000.00"
          :min="0.01"
          :max-length="11"
        />
        <Input
          v-show="mode==='batch'"
          v-model="formKey.amount"
          @on-change="testUserNum"
          :rows="5"
          type="textarea"
          :style="style"
          placeholder="*格式为*:账号,金额 例如:a123,100 注意逗号为英文格式,一行一个,最多操作10000个用户"
        />
      </FormItem>
      <FormItem label="备注信息" prop="remarks">
        <Input
          v-model="formKey.remarks"
          :style="style"
          :rows="5"
          type="textarea"
          placeholder="此栏位仅供管理者记录其他资讯，会员无法检视"
        />
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          class="submit"
          @click="submit"
          :loading="$root.editBtnLoading"
        >{{formKey.handle === '+'?'确定加款':'确定减款'}}</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import SiteSelect from "_c/site-select";
import AutoSearch from "_c/auto-search";
export default {
  components: { SiteSelect, AutoSearch },
  props: {
    mode: {
      type: String,
      required: true
    },
    oprateTypes: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      type: "",
      style: {
        width: "260px"
      },
      origin: true, //true会员查询进入 false侧边路由进入
      formKey: {
        amount: "",
        money: 0,
        handle: "+",
        userName: "",
        multiple: 0,
        remarks: ""
      },
      typeValues: "",
      singleRule: {
        multiple: [
          {
            required: true,
            message: "打码倍数必须填写",
            type: "number",
            trigger: "blur"
          }
        ],
        money: [
          {
            required: true,
            message: "金额必须填写",
            type: "number",
            trigger: "blur"
          },
          {
            message: "请输入正确的金额",
            trigger: "blur",
            pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
          },
        ],
        remarks: [
          {
            required: true,
            message: "备注必须填写",
            trigger: "blur"
          }
        ]
      },
      batchRule: {
        multiple: [
          {
            required: true,
            message: "打码倍数必须填写",
            type: "number",
            trigger: "blur"
          }
        ],
        amount: [
          {
            required: true,
            message: "金额必须填写",
            trigger: "blur"
          }
        ],
        remarks: [
          {
            required: true,
            message: "备注必须填写",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    setUname(name) {
      this.formKey.userName = name;
    },
    setOrigin() {
      this.origin = false;
    },
    testUserNum(e) {
      let arr = e.target.value.split(",");
      if (arr.length > 10000) {
        this.$Tip.info({
          content: "用户量太大，最多可操作一万个用户，请分批操作！"
        });
      }
    },
    resetForm() {
      this.$refs.formKey.resetFields();
      this.typeValues = "";
      //清空会员查询名字
      this.$refs.autoSearh.value = ''
    },
    //带搜索功能的输入框返回数据
    getSuperior(res) {
      this.formKey.userName = res;
    },
    submit() {
      this.getSuperior(this.$refs.autoSearh.value)
      this.$refs.formKey.validate(valid => {
        if (valid) {
          let params = { ...this.formKey };
          params.siteId = this.$root.nowSite.id;
          const [type, subType] = this.typeValues.split(":");
          params.type = type;
          params.subType = subType;
          if (this.mode === "single") {
            const { userName, money } = params;
            params.amount = `${userName},${money}`;
            params.userName = "";
            params.money = "";
          }
          if (!this.typeValues) {
            this.$Tip.info({ content: "请选择您的操作类型" });
            return false;
          }
          if ((this.mode == 'single' && !this.formKey.userName) || (this.mode == 'batch' && !this.formKey.amount.includes(','))) {
            this.$Tip.info({ content: '请选择您的操作账号'})
            return false
          }
          for (let key in params) {
            if (!params[key] && params[key] !== 0) delete params[key];
          }
          if (params.handle === "-") params.multiple = 0
          this.$emit("on-submit", params);
        }
      });
    },
    handleChange(handle) {
      this.formKey.handle = handle;
      this.typeValues = '';
      this.formKey.remarks = '';
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../styles/button.less";
.btns {
  padding-bottom: 20px;
}
// 备注栏最大拉伸高度设置
/deep/textarea.ivu-input {
  max-height: 300px;
}
</style>


