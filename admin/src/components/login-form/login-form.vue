<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName" ref="loginFormFirst" :show-message="status0">
      <label class="input-row input-row-user">
        <Input v-model="form.userName" class="input" placeholder="请输入账号" @on-focus="hideMsg"  @on-blur="showMsg(0)"/>
      </label>
    </FormItem>
    <FormItem prop="password" ref="loginFormSecond" :show-message="status1">
      <label class="input-row input-row-lock">
        <Input v-model="form.password" class="input" placeholder="请输入密码" type="password" @on-focus="hideMsg" @on-blur="showMsg(1)"/>
      </label>
    </FormItem>
    <FormItem prop="token" :show-message="status2">
      <label class="input-row input-row-key">
        <Input v-model="form.token" class="input" placeholder="请输入口令" @on-focus="hideMsg" @on-blur="showMsg(2)"/>
      </label>
    </FormItem>
    <FormItem>
      <Button class="btn" @click="handleSubmit">登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: "LoginForm",
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "请输入账号！", trigger: "blur" }];
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "请输入密码！", trigger: "blur" }];
      }
    },
    tokenRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: "请输入口令！", trigger: "blur" },
          {
            required: true,
            pattern: /^\w{6}$/i,
            message: "验证码限制6位",
            trigger: "blur"
          }
        ];
      }
    }
  },
  data() {
    return {
      form: {
        userName: "",
        password: "",
        token: ""
      },
      status0: false,
      status1: false,
      status2: false
    };
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules,
        token: this.tokenRules
      };
    },
  },
  methods: {
    handleSubmit() {
      this.partShowMsg()
      this.$refs.loginForm.validate(valid => {
        // this.showMsg()
        if (valid) {
          this.$emit("on-success-valid", {
            userName: this.form.userName,
            password: this.form.password,
            token: this.form.token
          });
        }
      });
    },
    showMsg (val) {
      this['status' + val] = true
    },
    hideMsg () {
      this.status0 = this.status1 = this.status2 = false
    },
    //添交信息提示，感觉要重写这个组件，写得台复杂l
    partShowMsg () {
      this.$nextTick(() => {
        this.status0 = true
        let status1 = this.$refs.loginFormFirst.validateState === 'success'
        this.status2 = this.status1 = false
        if (status1) {
          this.status1 = true
        }
        if (this.$refs.loginFormSecond.validateState === 'success'){
          this.status2 = true
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.ivu-form-item-error-tip{
  left: 280px;
  top: 15px;
  color: #e83535;
}
.btn{
  width: 378px;
  height: 47px;
  line-height: 47px!important;
  padding: 0;
  color: #ffffff;
  background-color: #1C4A73!important;
  border: none;
  font-size: 22px;
  border-radius: 0;
  margin-top: 30px;
}
.input-row {
  height: 54px;
  width: 378px;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid #26c7e9;
  display: block;
  position: relative;
  /deep/input{
    -ms-appearance: none !important;
    background-color: transparent !important;
  }

  &.input-row-user,
  &.input-row-lock,
  &.input-row-key {
    &::before {
      content: "";
      width: 30px;
      height: 30px;
      top: 12px;
      left: 16px;
      position: absolute;
      background-position: center;
      background-size: 100% 100%;
    }
  }

  &.input-row-user {
    &::before {
      width: 24px;
      height: 28px;
      background-image: url("../../assets/svg/user-login.svg");
    }
  }

  &.input-row-lock {
    &::before {
      width: 24px;
      height: 28px;
      background-image: url("../../assets/svg/lock-login.svg");
    }
  }

  &.input-row-key {
    &::before {
      width: 24px;
      height: 28px;
      background-image: url("../../assets/svg/key-login.svg");
    }
  }

  .input {
    margin-top: 12px;
    width: 90%;
    padding-left: 56px;
  }
}

/deep/ .ivu-input {
  border: none;
  background-color: transparent;
  font-size: 16px;
  color: #5e8e98;
  box-shadow: none !important;
  height: 30px;
  line-height: 30px;
  width: 100%;
  border-left: 1px solid #5e8e98 !important;
  border-radius: 0;
  padding-top: 0;
  padding-bottom: 0;
}
</style>

