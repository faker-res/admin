<template>
  <div class="my-tip">
    <Modal v-model="show" width="480" :mask-closable="false" :style="{display: delay}">
      <div class="header" :class="{'error':type==='error'}" slot="header">{{title}}</div>
      <Icons slot="close" type="guanbi" color="white" class="lh50" :size="24"></Icons>
      <div class="content" :style="{height:addSub.show?'230px':'190px'}">
        <div class="txt flex-row">
          <Icons v-if="type==='info'" type="danchuangtishi" color="#57A3F3" :size="26"></Icons>
          <Icons v-else-if="type==='success'" type="chenggongtishi" color="#57A3F3" :size="26" class="ib ml20"></Icons>
          <Icons v-else-if="type==='error'" type="danchuangguanbi" color="#ed4014" :size="26"></Icons>
          <Icons
            v-else-if="type==='confirm'"
            type="danchuangtishi"
            color="#57A3F3"
            :size="26"
            class="pl10"
          ></Icons>
          <div class="font" v-if="!addSub.show">{{content}}</div>
          <div class="font" v-else>
            <p class="mt65" v-show="addSub.mount">
              {{addSub.mount}}个会员余额不足
            </p>
            <Input type="textarea" class="mt10" :readonly="true" :value="addSub.mDetail" v-show="addSub.mount"/>
            <p class="red-font" v-show="addSub.account" :class="!addSub.mount?'mt65':''">
              以下有{{addSub.account}}个账户不存在
            </p>
            <Input type="textarea" class="mt10" :readonly="true" :value="addSub.aDetail" v-show="addSub.account"/>
          </div>
        </div>
        <div class="btns flex-row" :class="addSub.show?'mt65':''">
          <Button v-if="type==='confirm'" class="cancel" @click="show=false">取消</Button>
          <Button v-if="type==='error'" type="error" @click="onConfirm">确定</Button>
          <Button v-else type="primary" @click="onConfirm">确定</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
import Icons from "_c/icons/icons";
export default {
  components: { Icons },
  data() {
    return {
      show: false,
      title: "",
      content: "",
      type: "",
      delay: "none",
      addSub: {
        show: false
      }
    };
  },
  watch: {
    show (val) {
      if (val === true) {
        setTimeout(() => this.delay = "block", 500)
      } else {
        this.delay = "none"
      }
    }
  },
  methods: {
    onConfirm() {
      this.show = false;
      if (this.onOk) {
        this.onOk();
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../styles/color.less";
@errorColor: #ed4014;
/deep/.ivu-modal-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
    margin: 0;
  }
}
// .mt10 {
//   /deep/textarea.ivu-input {
//     height: 55px;
//     max-height: 55px;
//   }
// }
/deep/.ivu-modal-content {
  overflow: hidden;
  .ivu-modal-body {
    padding: 0;
  }
  .ivu-modal-header {
    padding: 0;
    .header {
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 23px;
      color: #fff;
      background: @btnColor;
    }
    .header.error {
      background: @errorColor;
    }
  }
  .ivu-modal-close {
    top: 0;
  }
  .content {
    height: 190px;
    .txt {
      justify-content: center;
      height: 107px;
      .font {
        font-size: 20px;
        margin-left: 10px;
        color: @baseFontColor;
        word-break: break-all;
        //margin-top: 10px;
      }
    }
    .btns {
      padding-bottom: 33px;
      justify-content: center;
      /deep/.ivu-btn {
        width: 120px;
        height: 50px;
        font-size: 20px;
        // border: none;
      }
      .cancel {
        margin-right: 40px;
      }
    }
  }
  .ivu-modal-footer {
    display: none;
  }
}
.txt,
.font,
.flex-row,
.font {
  padding-top: 0 !important;
}
.lh50 {
  line-height: 50px;
}

</style>

