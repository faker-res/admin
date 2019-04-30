<template>
  <collapse simple value="1">
    <panel name="1" :hide-arrow="true">
      <div class="title" @click="open=!open">
        返水设置
        <Icon v-show="!open" type="ios-arrow-down" size="18" color="#999"/>
        <Icon v-show="open" type="ios-arrow-forward" size="18" color="#999"/>
      </div>
      <div class="section p15" slot="content">
        <div class="btns">
          <Button
            v-for="(tab,key) in _data_"
            :key="tab.name"
            class="lottery mr20"
            :class="showKey == key ? 'bd-bg' : 'bg-or'"
            @click="onselectMenu(key)"
          >{{tab.name}}</Button>
        </div>
        <div class="clearfix info pt10" v-if="_data_[showKey]">
          <div v-for="sub in _data_[showKey].list" :key="sub.name_en" class="clearfix w20 h40 fl">
            <div class="label fl">{{sub.name_cn}}：</div>
            <div class="fl" v-if="$route.params.page">
              <InputNumber
                v-model="sub.refund"
                :step=".1"
                :max="sub.parent_refund"
                :min="0"
                class="w60xh36"
                @on-change="onChange"
              ></InputNumber>
             <span class="tip" v-if="showParent">
                <span class="mr5">上限</span>
                {{(sub.parent_refund).toFixed(2)||"-"}}
              </span>
            </div>
            <div v-else>{{sub.refund}}</div>
          </div>
        </div>
      </div>
    </panel>
  </collapse>
</template>
<script>
import Icons from "../icons";
import { rmRepeatItem } from "@/libs/util";
export default {
  components: { Icons },
  props: {
    data: {
      type: [Object, Array],
      required: true,
      default: () => {}
    },
    showParent: {
      //是否显示上限
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      open: false,
      showKey: "live"
    };
  },
  computed: {
    _data_() {
      let temp = { ...this.data };
      for (let key in temp) {
        temp[key].list.forEach(item => {
          item.refund = +item.refund;
          item.parent_refund = +item.parent_refund;
        });
      }
      return temp;
    }
  },
  methods: {
    onselectMenu(showKey) {
      this.showKey = showKey;
    },
    onChange(value) {
      this.createData();
    },
    createData() {
      let data = {};
      for (let key in this._data_) {
        this._data_[key].list.forEach(item => {
          data[item.name_en] = item.refund;
        });
      }
      this.$emit("on-refund-change", JSON.stringify(data));
      return JSON.stringify(data);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";

.btns {
  height: 50px;
  line-height: 50px;
}
.w60xh36 {
  width: 60px;
  height: 36px;
  line-height: 36px;
}
.h40 {
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
}
.label {
  width: 120px;
  padding-right: 10px;
  text-align: right;
  font-size: 14px;
  margin-right: 5px;
}
.tip {
  font-size: 14px;
  color: #ed3f14;
  margin-left: 10px;
}
.bd-bg {
  background-color: #2d8cf0;
  color: #ffffff;
  box-shadow: 0;
  &:focus {
    box-shadow: 0 0 0 0;
  }
}
.bg-or {
  border: 1px solid #eaeaea;
  &:focus {
    box-shadow: 0 0 0 0;
  }
  &:hover {
    background: #f4f9ff;
    border: 1px solid #2d8cf0;
    color: #2d8cf0;
  }
}
</style>


