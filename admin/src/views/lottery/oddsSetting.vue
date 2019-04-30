<template>
  <div>
    <div class="v2-search clearfix">
      <div class="v2-button fl" v-if="(adminType == 'super') || (authInPage.indexOf('lotteryUpdateOddsSiteidLid') != -1)">
        <Button class="w120x" v-show="oddsStatus" @click="btnShow">修改赔率</Button>
        <div v-show="!oddsStatus" class="ib">
          <Button @click="save(1)" :loading="$root.editBtnLoading" class="w120x">确认保存</Button>
          <Button @click="save(0)" class="w120x">取消修改</Button>
        </div>
      </div>
      <div class="fl clearfix">
        <span class="ib mr15">玩法</span>
        <input placeholder="请输入完整的玩法描述" v-model="play" class="w160x" style="height: 30px;"/>
        <Button type="primary" class="ivu-btn bg ib ml15" @click="toTegional">查询</Button>
      </div>
      <div class="font-bold ft18 fr mr30">当前彩票：{{oddData.lotteryName || ""}}</div>
    </div>
    <div class="v2-table">
      <table
        class="bt ivu-table ivu-table-default ivu-table-border"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tr>
          <th class="ivu-table-column-center w15 bl">描述</th>
          <th class="ivu-table-column-center w60">号码</th>
          <th class="ivu-table-column-center w10">赔率</th>
          <th class="ivu-table-column-center w10">返水</th>
        </tr>
        <tr v-for="(item,i) in oddData.oddsInfo" :key="'row'+ i">
          <td class="ivu-table-column-center w15 bl" :id="item.title" :style="{color: play == item.title ? '#2D8CF0' : ''}">{{item.title}}</td>
          <td class="ivu-table-column-center w60" :style="{color: play == item.title ? '#2D8CF0' : ''}">{{item.ball}}</td>
          <td class="ivu-table-column-center w10">
            <span v-if="oddsStatus">{{item._oddsMin}}</span>
            <span v-else class="ib clearfix">
              <InputNumber
                v-model="item.oddsMin"
                v-if="typeof item.oddsMin === 'number'"
                :step="0.01"
                :min="0"
              />
              <span v-else>
                <InputNumber
                  class="ib w40"
                  v-model="item.oddsMin[0]"
                  :step="0.01"
                  :min="0"
                />
                <InputNumber
                  class="ib w40"
                  v-model="item.oddsMin[1]"
                  :step="0.01"
                  :min="0"
                />
              </span>
            </span>
          </td>
          <td class="ivu-table-column-center w10">
            <span v-if="oddsStatus">{{item._fsrate}}</span>
            <InputNumber v-else v-model="item.fsrate" :step="0.01" :min="0"/>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import { lotteryOddsSiteId, lotteryUpdateOddsSiteidLid } from "@/api/lottery";
import { getUserType } from '@/libs/util';
export default {
  // name: "oddsSetting",
  data() {
    return {
      adminType: getUserType(),
      authInPage: JSON.parse(localStorage.authInPage),
      play: '', //搜索玩法的关键字
      oddData: {},
      formKey: {
        lotteryId: this.$route.query.lotteryId,
        siteId: this.$root.nowSite.id
      },
      isTitle:false,
      oddsStatus: true
    };
  },
  created() {
    this.getData(this.formKey);
  },
  methods: {
    btnShow() {
      this.oddsStatus = false;
      this.transform();
    },
    transform() {
      let { oddsInfo } = this.oddData;
      if (this.oddsStatus) {
        // 当取消修改的时候，返回原来的值
        oddsInfo.forEach(item => {
          item.oddsMin = item._oddsMin;
          item.oddsMax = item._oddsMax;
        });
      } else {
        // 点击修改按钮的的时候，做以下操作
        oddsInfo.forEach(item => {
          if (typeof item.oddsMin === "string" && item.oddsMin.includes("/")) {
            item.oddsMin = item.oddsMin.split("/");
            item.oddsMin = item.oddsMin.map(Number);
            item.oddsMax = item.oddsMax.split("/");
            item.oddsMax = item.oddsMax.map(Number);
          }
        });
      }
    },
    getData(data) {
      this.$root.startTableLoading();
      lotteryOddsSiteId(data).then(res => {
        res.data.oddsInfo.forEach(item => {
          item._oddsMin = item.oddsMin;
          item._oddsMax = item.oddsMax;
          item._fsrate = item.fsrate;
          // 初始化数据
          item.oddsMin = item.oddsMin + "";
          if (!item.oddsMin.includes("/")) {
            item.oddsMin = +item.oddsMin;
            item.oddsMax = +item.oddsMax;
            item._oddsMin = +item.oddsMin;
            item._oddsMax = +item.oddsMax;
          }
          item.fsrate = +item.fsrate;
        });
        this.oddData = res.data;
      });
    },
    toTegional() {
      document.querySelector(`#${this.play}`).scrollIntoView(true) 
    },
    // 赔率修改
    save(flag) {
      // 确认保存
      if (flag == 1) {
        let { oddsInfo } = this.oddData;
        let _oddsInfo = JSON.parse(JSON.stringify(oddsInfo));
        _oddsInfo.forEach(item => {
          if (Array.isArray(item.oddsMin)) {
            item.oddsMin = item.oddsMin.join("/");
            item.oddsMax = item.oddsMax.join("/");
            // item.oddsMax = item.oddsMax.join("/");
          } 
          delete item._oddsMin;
          delete item._oddsMax;
          delete item._fsrate;
        });
        _oddsInfo.forEach(item => {
          item.oddsMax = item.oddsMin
        })
        let data = {
          id: this.oddData.id,
          oddsInfo: JSON.stringify(_oddsInfo)
        };
        this.$root.startEditLoading();
        lotteryUpdateOddsSiteidLid(data).then(res => {
          if(res.code == 200){
            this.oddsStatus = true;
            this.getData(this.formKey);
          }
        });
      } else {
        this.oddsStatus = true;
        this.transform();
      }
    }
  }
};
</script>
<style lang="less" scoped >
@import '../../styles/button.less';
.clearfix {
  .dqcp {
    width: 40%;
    border: 1px solid #dcdcdc;
    text-align: center;
    line-height: 32px;
  }
}
.ivu-table {
  width: 100%;
}
.ivu-input-number {
  margin: auto;
}
/deep/.ivu-table-cell-tooltip-content {
  padding: 0 100px 0 100px !important;
}
/deep/.ivu-input-number-input {
  border-radius: 0px !important;
}
</style>


