<template>
  <div class="v2-table">
    <Tables
      :loading="$root.tableLaoding"
      :total="table.total"
      :value="table.data"
      :columns="table.columns"
    ></Tables>
  </div>
</template>
<script>
import Tables from "_c/tables";
import { managementData } from "@/api/data";
export default {
  components: {Tables},
  data() {
    return {
      table: {
        total: 100,
        loading: true,
        data: [],
        columns: [
          {
            title: '订单号',
            key: 'orderNum',
            align: 'center',
            width: 150
          },
          {
            title: '会员账号',
            key: 'account',
            align: 'center'
          },
          {
            title: '抵扣金额',
            key: 'gift',
            align: 'center',
            render: (h,params) => <span class='red-font'>{params.row.gift}</span>
          },
          {
            title: '剩余欠款',
            key: 'gift',
            align: 'center'
          },
          {
            title: '备注',
            key: 'remarks',
            align: 'center',
            tooltip: true
          },
          {
            title: '更新时间',
            key: 'updateTime',
            align: 'center'
          }
        ]
      }
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$root.startTableLoading(this)
      managementData().then(res => {
        this.table.data = res.data
      })
    }
  }
};
</script>

