<template>
  <div class="mt20" style="[v-cloak] {display: none;}"  v-cloak>
    <ul class="clearfix mb20 bonus " >
      <li class="fl  " >
        <span class="db  bb  bl bt   ">{{tableData.bonus.name}}</span>
        <span class="db  bl blue-font">{{tableData.bonus.total}}</span>
      </li>
      <li v-for="(t,i) in tableData.bonus.list" :key="i" class="fl  ">
        <span class="db bb bl bt">{{t.name}}</span>
        <span :class="['db', 'blue-font', 'bl', i > 1 ? 'bb' : ''] ">{{t.total}}</span>
      </li>
    </ul>
    <ul class="clearfix mb20 deposit">
      <li class="fl ">
        <span class="db bb  bl bt">{{tableData.deposit.name}}</span>
        <span class="db bl bb  blue-font">{{tableData.deposit.total}}</span>
      </li>
      <li v-for="(t,i) in tableData.deposit.list" :key="i" class="fl ">
        <span class="db bb  bl bt">{{t.name}}</span>
        <span class="db bl bb   blue-font">{{t.total}}</span>
      </li>
    </ul>
    <ul class="clearfix mb20 deposit">
      <li class="fl  ">
        <span class="db bb  bl bt">{{tableData.withdrawals.name}}</span>
        <span class="db bl bb  blue-font">{{tableData.withdrawals.total}}</span>
      </li>
      <li v-for="(t,i) in tableData.withdrawals.list" :key="i" class="fl ">
        <span class="db bb  bl bt">{{t.name}}</span>
        <span class="db bl bb  blue-font">{{t.total}}</span>
      </li>
    </ul>
    <ul class="clearfix deposit">
      <li class="fl ">
        <span class="db bb  bl bt">{{tableData.other.name}}</span>
        <span class="db bl bb  blue-font">{{tableData.other.total}}</span>
      </li>
      <li v-for="(t,i) in tableData.other.list" :key="i" class="fl ">
        <span class="db bb  bl bt">{{t.name}}</span>
        <span class="db bl bb  blue-font">{{t.total}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { financeSummaryData } from "@/api/finance";
export default {
   name: "summaryDataShow",
  data() {
    return {
      tableData : {
        bonus: {
          name: '',
          total: '',
          list: []
        },
        deposit: {
          name: '',
          total: '',
          list: []
        },
        withdrawals: {
          name: '',
          total: '',
          list: []
        },
        other: {
          name: '',
          total: '',
          list: []
        }
      }
    }
  },
  methods: {
    initData(data){
      if(data.params.type == 'all'){
        delete data.params.type
        delete data.params.subType
      }
      financeSummaryData(data).then(res => {
        this.tableData = res.data
        this.$parent.flag = true
      })
    }
  }
};
</script>
<style lang="less" scoped>
.db{
  display: block;
}
ul{
  li{
    box-sizing: border-box;
    width: 10%;

    text-align: center;
    span{
      &:nth-child(1){
        padding-top: 10px;
        padding-bottom: 10px;
      }
      &:nth-child(2){
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
  }
}
.clearfix li span{
  border-left: 1px solid #dcdcdc;
}
.bonus{
  li{
    &:nth-child(1){
      border-bottom: 1px solid #dcdcdc;
    }
    &:nth-child(2){
      border-bottom: 1px solid #dcdcdc;
    }
     &:nth-child(3){
      border-bottom: 1px solid #dcdcdc;
    }
    &:nth-last-child(1){
      border-top: 0;
      border-right: 1px solid #dcdcdc;
    }
    &:nth-last-child(2){
      border-top: 0;
    }
  }
}
.deposit{
  li{
    &:nth-last-child(1){
      border-right:1px solid #dcdcdc;
    }
  }
}

</style>


