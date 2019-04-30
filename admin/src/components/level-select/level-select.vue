<template>
  <div>
    <div v-if="mode==='单选'">
      <Select
        :clearable="clearable"
        :disabled="disabled"
        :style="_width"
        :placeholder="placeholder"
        :class="className"
        v-model="singleData.levelLabel"
      >
        <Option
          v-for="item in levelList"
          :key="item.id"
          :value="item.levelLabel"
        >{{(item.levelAlias ? choiceShow ? false : item.levelAlias : false)|| item.levelName}}</Option>
      </Select>
    </div>
    <div v-else-if="mode==='多选'">
      <Select
        :clearable="clearable"
        multiple
        :disabled="disabled"
        :style="_width"
        :placeholder="placeholder"
        :class="className"
        v-model="multipleData.levelLabel"
        ref="selector"
      >
        <Option v-if="allModal" value="all">全部</Option>
        <Option
          v-for="item in levelList"
          :key="item.id"
          :value="item.levelLabel"
        >{{item.levelAlias || item.levelName}}</Option>
      </Select>
    </div>
    <div v-else-if="mode==='单选全部'">
      <Select
        :clearable="clearable"
        :disabled="disabled"
        :style="_width"
        :placeholder="placeholder"
        :class="className"
        v-model="singleData.levelLabel"
      >
        <Option v-if="allModal" value="all">全部</Option>
        <Option
          v-for="item in levelList"
          :key="item.id"
          :value="item.levelLabel"
        >{{item.levelAlias || item.levelName}}</Option>
      </Select>
    </div>
  </div>
</template>
<script>
import { getMemberLevelData } from "@/api/member";
import { getAgencyLevelData } from "@/api/agency";
export default {
  props: {
    choiceShow: {
      type: Boolean,
      default: false
    },
    allModal: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: "单选"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    width: {
      type: [String, Number],
      default: 260
    },
    levelType: {
      type: String // member || agency || commom
    },
    className: {
      type: String
    }
  },
  data() {
    return {
      singleData: {
        levelLabel: ""
      },
      multipleData: {
        levelLabel: []
      },
      levelList: [],
      //增加会员写死等级 addLevel
      subType: ''
    };
  },
  computed: {
    _width() {
      return "width:" + this.width + "px";
    }
    // allModalList () {
    //   (this.levelList)
    //   return this.levelList
    // }
  },
  watch: {
    "multipleData.levelLabel"(now, old) {
      if (!old.includes("all") && now.includes("all")) {
        this.multipleData.levelLabel = ["all"];
      }

      if (old.includes("all") && now.length > 1) {
        this.multipleData.levelLabel.splice(now.indexOf("all"), 1);
      }
    },
    singleData: {
      handler(val, oldVal) {
        this.singleChange(val);
      },
      deep: true
    },
    multipleData: {
      handler(val, oldVal) {
        this.multipleChange(val);
      },
      deep: true
    },
    allModal() {
      this.checkAll();
    }
  },
  mounted() {
    this.checkAll();
  },
  methods: {
    checkAll() {
      // if(this.mode === '多选') {
      //   if(this.$refs.selector && this.allModal) {
      //     const allEl = document.createElement('li')
      //     allEl.className = 'ivu-select-item'
      //     allEl.innerText = '全部'
      //     this.$refs.selector.$el.querySelector('.ivu-select-dropdown-list').append(allEl)
      //     allEl.addEventListener('click', evt => {
      //       const data = {
      //         levelLabel: [],
      //         levelName: []
      //       }
      //       const levelLabel = []
      //       this.levelList.forEach(item => {
      //         data.levelLabel.push(item.levelLabel)
      //         data.levelName.push(item.levelName)
      //         levelLabel.push(item.levelLabel)
      //       })
      // this.$emit("on-level-change", data);
      //       this.multipleData.levelLabel = levelLabel
      //       this.$emit("on-level-change", data);
      // this.$nextTick(() => {
      //   const allItem = document.createElement('div')
      //    this.$refs.selector.$el.querySelector('.ivu-select-selection div').append(allItem)
      //    (this.$refs.selector.$el.querySelector('.ivu-select-selection div').innerHTML)
      //    this.$refs.selector.$el.querySelectorAll('.ivu-select-selection div .ivu-tag.ivu-tag-checked').forEach(item => {
      //      (item)
      //      item.style.display = 'none'
      //    })
      //    allItem.outerHTML = '<div class="ivu-tag ivu-tag-checked"><span class="ivu-tag-text">全部</span><i class="ivu-icon ivu-icon-ios-close"></i></div>'
      //   //  '<div class="ivu-tag ivu-tag-checked"><span class="ivu-tag-text">全部</span><i class="ivu-icon ivu-icon-ios-close"></i></div>'+
      //   //  '<span class="" style="display: none;"></span>'+
      //   //  '<i class="ivu-icon ivu-icon-ios-arrow-down ivu-select-arrow"></i>'
      //     // this.$refs.selector.$el.querySelector('.ivu-icon.ivu-icon-ios-close').addEventListener('click', () => {
      //     //     this.multipleData.levelLabel = []
      //     //     this.$emit("on-level-change", {
      //     //       levelLabel: [],
      //     //       levelName: []
      //     //     });
      //     //     this.$refs.selector.$el.querySelector('.ivu-select-selection div').innerHTML =
      //     //     '<span class="ivu-select-placeholder">请选择</span>'+
      //     //     '<i class="ivu-icon ivu-icon-ios-arrow-down ivu-select-arrow"></i>'
      //     // })
      // })
      // })
      // }
      // }
    },
    async setDefaultLevel(levelLabel, levelName) {
      // 如果跳转页面需要同步等级可以异步调用这个方法
      if (this.mode === "单选") {
        this.singleData.levelLabel = +levelLabel;
        this.singleData.levelName = levelName;
        this.$set(this.singleData, "levelLabel", +levelLabel);
      } else {
        if (typeof levelLabel == "string") {
          let arr = levelLabel.split(",");
          arr.forEach(item => {
            this.multipleData.levelLabel.push(Number(item));
          });
        } else {
          this.multipleData.levelLabel = levelLabel;
        }
      }
    },
    async init(siteId, defaultLevel) {
      if (this.levelType === "member") {
        if (this.subType === 'addLevel') {
          this.levelList = this.$store.state.info.memberLevelList
          this.subType = ''
        } else {
          this.levelList = await this.getMemberLevel(siteId, "select");
        }
      } else if (this.levelType === "agency") {
        this.levelList = await this.getAgencyLevel(siteId, "select");
      } else if (this.levelType === 'refund') {
        this.levelList = this.$store.state.info.memberLevelList
      }
      if (defaultLevel) {
        const { levelLabel, levelName } = defaultLevel;
        this.setDefaultLevel(levelLabel, levelName);
      }
      return this.levelList;
    },

    singleChange(val) {
      if (this.multipleData.levelLabel.includes("all")) {
        const data = {
          levelLabel: [],
          levelName: []
        };

        const levelLabel = [];

        this.levelList.forEach(item => {
          data.levelLabel.push(item.levelLabel);
          data.levelName.push(item.levelName);
          levelLabel.push(item.levelLabel);
        });
        this.$emit("on-level-change", data);
      } else {
        let data = { ...this.singleData };
        this.levelList.forEach(le => {
          if (val.levelLabel == le.levelLabel) {
            data.levelName = le.levelName;
            data.id = le.id;
          }
        });
        this.$emit("on-level-change", data);
      }
    },
    multipleChange(val) {
      if (this.multipleData.levelLabel.includes("all")) {
        const data = {
          levelLabel: [],
          levelName: []
        };
        const levelLabel = [];
        this.levelList.forEach(item => {
          data.levelLabel.push(item.levelLabel);
          data.levelName.push(item.levelName);
          levelLabel.push(item.levelLabel);
        });
        this.$emit("on-level-change", data);
      } else {
        let data = { ...this.multipleData };
        data.levelName = [];
        this.levelList.forEach(le => {
          data.levelLabel &&
            data.levelLabel.forEach(dle => {
              if (dle == le.levelLabel) {
                data.levelName.push(le.levelName);
              }
            });
        });
        this.$emit("on-level-change", data);
      }
    },
    getMemberLevel(siteId, purpose) {
      return getMemberLevelData({ siteId, purpose }).then(res => {
        this.$emit("sendLevelName", res.data);
        return res.data;
      });
    },
    getAgencyLevel(siteId, purpose) {
      return getAgencyLevelData({ siteId, purpose }).then(res => {
        return res.data;
      });
    },
    // 清空多选默认值
    reset(val) {
      if (typeof val === 'undefined') {
        this.multipleData.levelLabel = [];
      } else if (val === 'single') {
        this.singleData.levelLabel = ''
      }
    },
    changeSubType (val) {
      this.subType = val
    }
  }
};
</script>
