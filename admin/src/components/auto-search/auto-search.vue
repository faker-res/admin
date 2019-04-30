<template>
  <AutoComplete
    :disabled="disabled"
    :clearable="clearable"
    :style="_width"
    :placeholder="placeholder"
    v-model="value"
    @on-focus="onFocus"
    @on-select="onSelect"
    @on-search="onSearch"
    @on-clear="onClear"
    @on-blur="onBlur"
    @on-change="onChange"
  >
    <div class="tip" v-if="tip===0">请输入您要查询的内容</div>
    <div class="tip" v-else-if="tip===1">搜索中...</div>
    <div class="tip" v-else-if="tip===2">搜索完成</div>
    <div class="tip error" v-else-if="tip===3">搜索结果不存在!</div>
    <Option v-for="(item,index) in data" :value="item.userName" :key="index">{{ item.userName }}</Option>
  </AutoComplete>
</template>

<script>
import { agencyGetName } from "@/api/agency";
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: "请输入，可自动搜索"
    },
    width: {
      type: [String, Number],
      default: 260
    },
    // data: {
    //   type: [Array, Object],
    //   default: () => []
    // },
    stage: {
      type: String,
      default: "agency" //  agency || member
    },
    // key: {
    //   type: String
    // },
    // http: {
    //   type: Function,
    //   default: () => {}
    // },
    doSomeThing: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      value: "",
      tip: 0,
      data: []
    };
  },
  computed: {
    _width() {
      return "width:" + this.width + "px";
    }
  },
  watch: {
    value(val, oldVal) {
      if (!val) {
        this.$emit("changeShow", false);
      }
    }
  },
  methods: {
    // onBlur() {
    //   this.$Tip.info({ content: "搜索结果不存在!" });
    // },
    onSearch() {
      this.tip = 1;
      if (this.stage == "agency") {
        let postData = {
          type: "agency",
          content: this.value,
          siteId: this.$root.nowSite.id
        };
        agencyGetName(postData).then(res => {
          if (res.data.length > 0) {
            this.data = res.data;
            this.tip = 2;
          } else {
            this.tip = 3;
            this.data = [];
          }
        });
      } else if (this.stage == "member") {
        let postData = {
          type: "member",
          content: this.value,
          siteId: this.$root.nowSite.id
        };
        agencyGetName(postData).then(res => {
          if (res.data.length > 0) {
            this.data = res.data;
            this.tip = 2;
          } else {
            this.tip = 3;
            this.data = [];
          }
        });
      } else {
        let postData = {
          type: "all",
          content: this.value,
          siteId: this.$root.nowSite.id
        };
        agencyGetName(postData).then(res => {
          if (res.data.length > 0) {
            this.data = res.data;
            this.tip = 2;
          } else {
            this.tip = 3;
            this.data = [];
          }
        });
      }
    },
    onBlur(e) {
      this.data &&
        this.data.forEach(item => {
          if (item.userName === e.target.value) {
            this.onSelect(item.userName)
            // this.$emit("sendSuperior", item.userName);
          }
        });
    },
    onSelect(value) {
      this.$emit("sendSuperior", value);
      this.data.forEach(item => {
        if (item.userName == value) this.$emit('sendId', item.id)
      })
    },
    // 返回false  不显示返点、返水设置
    onClear() {
      this.$emit("sendSuperior", false);
    },
    onFocus(e) {
      this.tip = 0;
      // this.$emit("sendOtherResult", e.target.value)
    },
    onChange(val) {
      // this.$emit("sendOtherResult", val)
    },
    // 再次调用，清除上次的数据
    removeDefault() {
      this.value = "";
    },
    //设置绑定的默认值
    setDefault(val) {
      this.value = val;
    }
  }
};
</script>
<style lang="less" scoped>
.tip {
  text-align: center;
  &.error {
    color: #ed3f14;
  }
}
// /deep/.ivu-modal-content{
//   overflow: inherit!important;
// }
/deep/.ivu-select-dropdown-list {
  height: 100px;
}
</style>
