<template>
  <!-- 打码详情 -->
  <div class="m-member-code-detail">
    <Modals :ref="codeDetailTitle" :title="codeDetail.title" @modalVisible="modalVisible">
      <div slot="content" class="modal-overflow">
        <Tables :page="false" :columns="codeDetail.columns" :value="codeDetail.data">
          <div slot="footer" class="clearfix">
            <span class="txt-a ib w16 br">统计</span>
            <span class="pl25 pr25">
              最后所需打码量：
              <span>{{codeNext.needBetAmount}}</span>
            </span>
            <span class="pl25 pr25 ib">
              现有打码量：
              <span>{{codeNext.betAmount}}</span>
            </span>
            <span class="pl25 pr25">
              是否满足提款要求：
              <span v-if="color" style="color:red">{{codeBeg.betAmount}}</span>
            </span>
          </div>
        </Tables>
      </div>
    </Modals>
  </div>
</template>

<script>
import Tables from '@/components/tables/tables'
import { checkBetAmount } from '@/api/finance'
import Modals from '@/components/modals/modals'

export default {
  name: 'memberCodeDetail',
  components: { Tables, Modals },
  props: {
    codeDetailTitle: {
      required: true
    }
  },
  data () {
    return {
      codeNext: {
        needBetAmount: 0,
        betAmount: 0
      },
      codeBeg: {
        betAmount: 0
      },
      color:true,
      //打码详情
      codeDetail: {
        title: '会员打码详情',
        data: [],
        columns: [
          {
            title: "类型",
            key: "type",
            align: "center"
          },
          {
            title: "金额",
            key: "amount",
            align: "center"
          },
          {
            title: "打码倍数",
            key: "multiple",
            align: "center"
          },
          {
            title: "已打码",
            key: "betAmount",
            align: "center"
          },
          {
            title: "累计所需打码量",
            key: "needBetAmount",
            align: "center"
          },
          {
            title: "时间",
            key: "time",
            width: 160,
            align: "center",
            render: (h, params) => {
              return <span>{this.$root.unixTime(params.row.time)}</span>
            }
          }
        ]
      },
    }
  },
  computed: {
    detailData () {
      return this.$store.state.info.codeDetail
    }
  },
  watch: {
    detailData (val) {
      if (this.codeDetailTitle === val.title) {
        if (!this.$refs[this.codeDetailTitle].isShow) {
          if (val.uid || val.uid === 0) {
            this.getCodeDetail(this.detailData.uid)
            this.$refs[this.codeDetailTitle].show()
          }
        }
      }
    }
  },
  methods: {
    //打码详情
    getCodeDetail(detailData) {
      const uid = detailData
      const data = {
        siteId: this.$root.nowSite.id,
        uid
      }
      checkBetAmount(data).then(res => {
        if (res.code === 200) {
          this.codeDetail.data = res.data
          let code = this.codeDetail.data
          if (code.length !== 0) {
            this.codeNext = code.pop()
            this.codeBeg = code.pop()
          }
          if (typeof this.codeBeg !== 'undefined') {
            if (this.codeBeg.betAmount === 0) {
              this.codeBeg.betAmount = "否"
            } else {
              this.codeBeg.betAmount = "是"
              this.color = false
            }
          }
        }
      })
    },
    modalVisible (flag) {
      if (!flag) {
        this.codeDetail.data = []
        this.codeNext = {
          needBetAmount: 0,
          betAmount: 0
        },
        this.codeBeg = {
          betAmount: 0
        },
        this.color = true
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>

