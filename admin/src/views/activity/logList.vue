<template>
  <div>
    <div class="v2-search">
      <Form ref="searchkey" inline>
        <FormItem label='开始日期'>
          <DatePicker class="s-140" type="date" v-model="Time[0]" placeholder="请选择开始日期"></DatePicker>
        </FormItem>
        <FormItem label='结束日期'>
          <DatePicker class="s-140" type="date" v-model="Time[1]" placeholder="请选择结束日期"></DatePicker>
        </FormItem>
         <FormItem>
          <Checkbox v-model="searchKey.isLike"></Checkbox>
          <span>模糊</span>
        </FormItem>
        <FormItem label="会员账号">
          <Input placeholder="多个请以,逗号隔开" class="s-140" v-model="searchKey.account"/>
        </FormItem>
        <FormItem>
          <Poptip
            trigger="hover"
            content="多个请以,逗号隔开,仅支持同类型多个输入"
            placement="bottom-start"
            class="ml14f"
          >
            <Icons type="bangzhutishi" color="#E4E4E4" :size="26"/>
          </Poptip>
        </FormItem>
        <FormItem>
          <Button type="primary" class="search">查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-search bb">
      <ButtonGroup class="repay-button">
        <Button
          @click="() => { currentBtn = 'live' }"
          :class="currentBtn == 'live' ? 'active' : ''"
        >视讯</Button>
        <Button
          @click="() => { currentBtn = 'chess' }"
          :class="currentBtn == 'chess' ? 'active' : ''"
        >棋牌</Button>
        <Button
          @click="() => { currentBtn = 'game' }"
          :class="currentBtn == 'game' ? 'active' : ''"
        >电子</Button>
        <Button
          @click="() => { currentBtn = 'lottery' }"
          :class="currentBtn == 'lottery' ? 'active' : ''"
        >彩票</Button>
      </ButtonGroup>
    </div>
    <div class="v2-table">
      <Tables
        :loading="$root.tableLoading"
        :value="table.data"
        :columns="table.columns"
        :total="table.total"
      ></Tables>
    </div>
  </div>
</template>
<script>
import Icons from '_c/icons';
import Tables from '_c/tables';
import { logList } from '@/api/data';
export default {
  name: 'logList',
  components: {
    Icons,Tables
  },
  data() {
    return{
      currentBtn: 'live',
      searchKey: {},
      Time: [],
      currentBtn:'live',
      table: {
        total: 100,
        data: [],
        loading: true,
        columns: [
          {
            title: '会员账号',
            key: 'account',
            align: 'center',
            width: 120
          },
          {
            title: '审核人账号',
            key: 'checker',
            align: 'center',
            width:150
          },
          {
            title: '操作时间',
            key: 'time',
            align: 'center',
            width: 200
          },
          {
            title: '操作日志',
            key: 'log',
            align: 'center'
          },
        ]
      }
    }
  },
  watch: {
    currentBtn: {
      handler(val,oldVal){
        this.getData()
      },
      immediate: true
    }
  },
  methods: {
    //  监听currentBtn,给getData传参，掉不同接口
    getData() {
      logList().then(res => {
        this.table.data = res.data
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
</style>

