<template>
  <div class="my-modal">
    <Modal v-model="isShow" :width="width" :mask-closable="false" @on-visible-change="onVisibleChange">
      <div v-if="showHeader" class="header" slot="header">{{title}}</div>
      <Icons slot="close" type="guanbi" class="lh50" color="white" :size="24"></Icons>
      <div class="content mt20" style="position:relative;" :style="_height">
        <Spin fix size="small" v-if="spin"></Spin>
        <slot name="content"></slot>
      </div>
    </Modal>
  </div>
</template>
<script>
import Icons from "_c/icons";
export default {
  components: { Icons },
  props: {
    width: {
      default: 1000
    },
    height: {
      type: [String, Number]
    },
    title: {
      type: String
    },
    showHeader: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isShow: false,
      spin: false
    };
  },
  computed: {
    _height() {
      return "height:" + this.height + "px";
    }
  },
  methods: {
    show() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    },
    spinShow() {
      this.spin = true;
    },
    spinHide() {
      this.spin = false;
    },
    onVisibleChange(flag) {
      this.$emit('modalVisible',flag)
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/color.less";

/deep/.ivu-modal-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
    margin: 0;
  }
}
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
  }
  .ivu-modal-close {
    top: 0;
  }
  .ivu-modal-footer {
    display: none;
  }
}
.lh50 {
  line-height: 50px;
}
</style>
