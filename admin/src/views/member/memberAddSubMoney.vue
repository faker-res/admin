<template>
  <div class="v2-serch">
    <Modals ref="oneTabFundsModal" :title="fundsModalTitle">
      <div slot="content" v-if="flag">
        <Tabs type="card" value="single">
          <TabPane label="加款/减款" name="single">
            <FundsForms
              ref="oneTabFundsForms"
              mode="single"
              :oprateTypes="oprateTypes"
              @on-submit="submitFundsForm"
            ></FundsForms>
          </TabPane>
        </Tabs>
      </div>
    </Modals>
    <Modals ref="twoTabFundsModal" :title="fundsModalTitle" @modalVisible="modalVisible">
      <div slot="content" v-if="flag">
        <Tabs type="card" value="single" @on-click="tabChange">
          <TabPane label="加款/减款" name="single">
            <FundsForms
              ref="twoTabFundsForms"
              mode="single"
              :oprateTypes="oprateTypes"
              @on-submit="submitFundsForm"
            ></FundsForms>
          </TabPane>
          <TabPane label="批量加款/减款" name="batch">
            <FundsForms :oprateTypes="oprateTypes" mode="batch" @on-submit="submitFundsForm"></FundsForms>
          </TabPane>
        </Tabs>
      </div>
    </Modals>
  </div>
</template>

<script>
import Modals from '@/components/modals'
import { memberBalanceHandle } from '@/api/member'
import FundsForms from './components/funds-forms'

export default {
  name: 'memberAddSubMoney',
  components: {
    Modals,
    FundsForms
  },
  data () {
    return {
      flag: true,
      fundsModalTitle: "加款/减款",
      oprateTypes: {
        add: {
          manual: {
            id: 0,
            type: "deposit",
            subType: "manual",
            class: "存款",
            subClass: "人工汇款"
          },
          giftBonusAdmin: {
            id: 1,
            type: "bonus",
            subType: "giftBonusAdmin",
            class: "彩金",
            subClass: "彩金派送"
          },
          RebateBonus: {
            type: "bonus",
            subType: "manualRebateBonus",
            class: "返水",
            subClass: "返水派送"
          },
          bonus: {
            id: 3,
            type: "bonus",
            subType: "manualBonus",
            class: "优惠",
            subClass: "汇款优惠"
          },
          transfer: {
            id: 4,
            type: "deposit",
            subType: "transfer",
            class: "额度转换",
            subClass: "额度转换失败"
          },
          other: {
            id: 5,
            type: "other",
            subType: "other",
            class: "其他",
            subClass: "其他"
          }
        },
        reduce: {
          manual: {
            id: 6,
            type: "withdrawals",
            subType: "manual",
            class: "取款",
            subClass: "人工提出"
          },
          other: {
            id: 7,
            type: "other",
            subType: "other",
            class: "其他",
            subClass: "其他"
          }
        }
      },
    }
  },
  computed: {
    showAddSubMoney () {
      return this.$store.state.app.addSubMoney
    }
  },
  watch: {
    showAddSubMoney () {
      //解决直接渲染了子组件
      this.flag = true
      this.$nextTick(() => {
        this.$refs.twoTabFundsForms.setOrigin();
        this.$refs.twoTabFundsModal.show();
      })
    },
  },
  methods: {
    // 会员加减款
    tabChange(tabName) {
      this.fundsModalTitle =
        tabName === "single" ? "加款/减款" : "批量加款/减款";
    },
    submitFundsForm(params) {
      // params.remarks = "暂无备注";
      this.$root.startEditLoading(this);
      memberBalanceHandle(params).then(res => {
        if (res.code == 200) {
          let msg = params.handle === "+" ? "加款成功" : "减款成功";
          this.$refs['twoTabFundsModal'].hide();
          if (typeof res.data === 'object' && res.data !== null) {
            const {not_enough, not_exists} = res.data
            let mount, account, aDetail, mDetail
            if (Array.isArray(not_enough)) {
              mount = not_enough.length
              mDetail = not_enough.toString()
            }
            if (Array.isArray(not_exists)) {
              account = not_exists.length
              aDetail = not_exists.toString()
            }
            if (account === 0 && mount === 0) {
              this.$Tip.success({ content: '操作成功' })
            } else {
              this.$Tip.hide()
              this.$Tip.showAddSub({show: true, mount, account, aDetail, mDetail })
            }
          }
          // this.$refs['twoTabFundsForms'].resresetForm()
        }
      });
    },
    modalVisible(flag) {
      if (!flag) {
        this.$store.commit('refreshMenuItem')
        this.flag = flag
      }
    }
  },
}
</script>

<style lang="less" scoped>

</style>
