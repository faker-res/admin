<template>
  <Modals ref="paymentListModal" title="支付通道详情" :width="1150">
    <div slot="content">
      <Tabs type="card" value="pc">
        <TabPane label="电脑端" name="pc">
          <div class="scroll" :style="{'height': pcList.length? '659px':'100px'}">
            <div class="paymentTable">
              <div class="head clearfix">
                <div class="th">等级</div>
                <div class="th">支付方式</div>
                <div class="th">通道一</div>
                <div class="th">通道二</div>
                <div class="th">通道三</div>
                <div class="th">通道四</div>
                <div class="th last">通道五</div>
              </div>
              <div class="main" v-if="pcList.length">
                <div v-for="pc in pcList" :key="pc.lvl_name">
                  <div
                    v-if="pc.payment_info.length"
                    class="info clearfix"
                    v-for="(info,i) in pc.payment_info"
                    :key="'111'+info.payment_class"
                  >
                    <div
                      class="td"
                      :class="{'other-td':i!==0}"
                      :style="{'lineHeight': i===0&&pc.payment_info.length>1? 40*pc.payment_info.length+'px':''}"
                    >{{pc.lvl_name || pc.lvl_alias_name}}</div>
                    <div class="td">{{info.payment_class}}</div>
                    <div
                      class="td"
                      :class="{'last': i === (info.payment_name.length-1)}"
                      v-for="(name,i) in info.payment_name"
                      :key="'222'+i"
                    >{{name}}</div>
                    <div
                      class="td empty"
                      :class="{'last': i === (4-(info.payment_name.length))}"
                      v-for="(empty,i) in (5-(info.payment_name.length))"
                      :key="i+'xxxx'"
                    ></div>
                  </div>
                  <div v-if="!pc.payment_info.length" style="display:flex">
                    <div class="td">{{pc.lvl_name || pc.lvl_alias_name}}</div>
                    <div
                      class="td empty"
                      :class="{'last': i === 5}"
                      v-for="(num,i) in 6"
                      :key="i+'yyyyy'"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="no-data" v-else>暂无数据</div>
            </div>
          </div>
        </TabPane>
        <TabPane label="手机端" name="mobile">
          <div class="scroll" :style="{'height': h5List.length? '659px':'100px'}">
            <div class="paymentTable">
              <div class="head clearfix">
                <div class="th">等级</div>
                <div class="th">支付方式</div>
                <div class="th">通道一</div>
                <div class="th">通道二</div>
                <div class="th">通道三</div>
                <div class="th">通道四</div>
                <div class="th last">通道五</div>
              </div>
              <div class="main h5" v-if="h5List.length">
                <div v-for="h5 in h5List" :key="h5.lvl_name">
                  <div
                    v-if="h5.payment_info.length"
                    class="info clearfix"
                    v-for="(info,i) in h5.payment_info"
                    :key="'333'+info.payment_class"
                  >
                    <div
                      class="td"
                      :class="{'other-td':i!==0}"
                      :style="{'lineHeight': i===0&&h5.payment_info.length>1? 40*h5.payment_info.length+'px':''}"
                    >{{h5.lvl_name || h5.lvl_alias_name}}</div>
                    <div class="td">{{info.payment_class}}</div>
                    <div
                      class="td"
                      :class="{'last': i === (info.payment_name.length-1)}"
                      v-for="(name,i) in info.payment_name"
                      :key="'444'+i"
                    >{{name}}</div>
                    <div
                      class="td empty"
                      :class="{'last': i === (4-(info.payment_name.length))}"
                      v-for="(empty,i) in (5-(info.payment_name.length))"
                      :key="i+'aaa'"
                    ></div>
                  </div>
                  <div v-if="!h5.payment_info.length">
                    <div class="td">{{h5.lvl_name || h5.lvl_alias_name}}</div>
                    <div
                      class="td empty"
                      :class="{'last': i === 5}"
                      v-for="(num,i) in 6"
                      :key="i+'bbb'"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="no-data" v-else>暂无数据</div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </Modals>
</template>
<script>
import Modals from "@/components/modals";
import { payMentDetail } from "@/api/member";
export default {
  components: { Modals },
  data() {
    return {
      h5List: [],
      pcList: []
    };
  },
  methods: {
    init() {
      payMentDetail({ siteId: this.$root.nowSite.id }).then(res => {
        const { h5, pc } = res.data;
        this.h5List = h5;
        this.pcList = pc;
        this.$refs.paymentListModal.show();
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../styles/tabs.less";
.scroll {
  overflow: auto;
}
.main.h5 {
  overflow: hidden;
}
.paymentTable {
  text-align: center;
  font-size: 14px;
  border-collapse: collapse;
  margin: 0 15px;
  border-bottom: 1px solid #dcdcdc;
  border-left: 1px solid #dcdcdc;
  .head .th {
    background: #f6f6f8;
  }
  .th,
  .td {
    width: 14.28%;
    float: left;
    height: 40px;
    line-height: 40px;
    border-top: 1px solid #dcdcdc;
    border-right: 1px solid #dcdcdc;
  }
  .th.last,
  .td.last {
    border-right: 1px solid #dcdcdc;
  }
  .td.other-td {
    border-top: none;
    color: transparent;
  }
  .no-data{
    height: 40px;
    line-height: 40px;
    border-right: 1px solid #dcdcdc;
  }
}
</style>


