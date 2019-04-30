<template>
  <Tables
    :loading="$root.tableLoading"
    :value="table.data"
    :total="table.total"
    :columns='table.columns'
  ></Tables>
</template>
<script>
import { levelMan } from '@/api/data'
import Tables from '_c/tables';
export default {
  components: { Tables },
  data() {
    return{
      table: {
        total: 100,
        data: [],
        loading: true,
        columns: [
          {
            title: '金管家等级',
            key: 'level',
            align: 'center'
          },
          {
            title: '累计打码',
            key: 'code',
            align: 'center'
          },
          {
            title: '晋级礼金',
            key: 'bonus',
            align: 'center'
          },
          {
            title: '月俸禄',
            key: 'monWage',
            align: 'center'
          },
          {
            title: '可借额度',
            key: 'borrowLimit',
            align: 'center'
          },
          {
            title: '晋级赠送总额',
            key: 'bonusUp',
            align: 'center'
          },
          {
            title: '月俸禄赠送总额',
            key: 'monthUp',
            align: 'center'
          },
          {
            title: '更新时间',
            key: 'updateTime',
            align: 'center'
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
      levelMan().then(res => {
        res.data.length && res.data.push(this.totalData())
        this.table.data = res.data
      })
    },
    //总计
    totalData() {
      let item = {
        level: '总计',
        code: '-',
        bonus: '-',
        monWage: '-',
        borrowLimit: '10000000.00',
        bonusUp: '2000000000.00',
        monthUp: '2000000000.00',
        updateTime: '-'
      }
      return item
    }
  }
}
</script>

