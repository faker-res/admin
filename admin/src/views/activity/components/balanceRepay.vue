<template>
  <div>
    <div class="v2-table">
      <Tables
      :loading="$root.tableLaoding"
      :total="table.total"
      :value="table.data"
      :columns="table.columns"
      ></Tables>
    </div>
    <!-- 余额抵扣审核 -->
     <Modals ref="review" title="余额抵扣审核" :width="460">
      <div slot="content">
        <p class="ft14 ml85 mt20">
          <span class="pr10">会员账号：</span>
          <span>{{reviewInfo.account}}</span>
        </p>
        <p class="ft14 ml85 mt20">
          <span class="pr10">订单号：</span>
          <span>{{reviewInfo.orderNum}}</span>
        </p>
        <p class="ft14 ml85 mt20">
          <span class="pr10">欠款金额</span>
          <span>{{reviewInfo.overdraftAmount}}</span>
        </p>
        <p class="ft14 ml85 mt20">
          <span class="pr10">还款金额</span>
          <span class="red-font">{{reviewInfo.repaymentAmount}}</span>
        </p>
        <p class="ft14 ml85 mt20">
          <span class="pr10">操作类型：</span>
          <RadioGroup v-model="reviewInfo.type">
            <Radio label="success">通过</Radio>
            <Radio label="fail" class="ml5">拒绝</Radio>
          </RadioGroup>
        </p>
        <p class="ft14 ml85 mt20">
          <span class="pr10">备注信息：</span>
          <Input
            type="textarea"
            placeholder="此栏位仅供管理者记录其他咨询，会员无法检视"
            :rows="4"
            class="b w260x mt10 mb20"
          />
        </p>
        <Button type="primary" class="w260x ml85 h50x ft20 mb20" @click="modalsSubmit('review')">确定</Button>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from '_c/tables';
import Modals from '_c/modals';
import { borrowDataO } from "@/api/data";
export default {
  components: {
    Tables,Modals
  },
  data() {
    return {
      reviewInfo: {},
       table: {
        total: 100,
        data: [],
        loading: true,
        columns: [
          {
            title: '订单号',
            key: 'orderNum',
            align: 'center'
          },
          {
            title: '会员账号',
            key: 'account',
            align: 'center'
          },
          {
            title: '欠款金额',
            key: 'overdraftAmount',
            align: 'center'
          },
          {
            title: '还款金额',
            key: 'repaymentAmount',
            align: 'center',
            render: (h,params) => <span style={{color: '#118C1E'}}>{params.row.repaymentAmount}</span>
          },
          {
            title: '状态',
            key: 'status',
            align: 'center',
            render: (h,params) => {
              let color = params.row.status ? '#E2930E' : params.row.return ? '#118C1E' : '#FF0000';
              let text = params.row.status ? '待审核' : params.row.return ? '成功' : '失败';
              return <span style={{color}}>{text}</span>
            }
          },
          {
            title: '操作',
            align: 'center',
            render: (h,params) => {
              if (params.row.status) {
                return (
                  <span
                    class="blue-font"
                    onClick={() => {
                      let { account, orderNum, overdraftAmount, repaymentAmount } = params.row;
                      this.reviewInfo = {
                        account,
                        orderNum,
                        overdraftAmount,
                        repaymentAmount,
                        type: "success"
                      };
                      this.modalsShow("review");
                    }}
                  >
                    审核
                  </span>
                );
              } else {
                return <span class="blue-font" onClick={() => {
                  this.$Tip.confirm({
                    content: '您确定撤销审核吗？撤销后，可重新进行审核！',
                    onOk: () => {
                      this.$Message.success('撤销审核成功')
                    }
                  })
                }}>撤销</span>;
              }
            }
          },
          {
            title: '备注',
            key: 'remarks',
            align: 'center',
            tooltip: true,
            width: '120'
          },
          {
            title: '提交时间',
            key: 'updateTime',
            align: 'center'
          },
          {
            title: '审核时间',
            key: 'checkTime',
            align: 'center',
            render: (h,params) => <span>{params.row.status ? '-' : params.row.checkTime}</span>
          },
          {
            title: '审核者',
            key: 'checker',
            align: 'center',
            render: (h,params) => <span>{params.row.status ? '-' : params.row.checker}</span>
          }
        ]
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$root.startTableLoading(this)
      borrowDataO().then(res => {
        this.table.data = res.data
      })
    },
    modalsShow(name) {
      this.$refs[name].show()
    },
    modalsSubmit(name) {
      this.$refs[name].hide();
      this.$Message.success('余额还款成功')
    }
  }
}
</script>
<style lang="less" scoped>
.b{
  display: block;
}
</style>


