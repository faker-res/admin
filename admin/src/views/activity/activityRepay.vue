<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="还款状态">
          <Select v-model="searchKey.status" class="s-86">
            <Option value="1">待审核</Option>
            <Option value="2">失败</Option>
            <Option value="3">成功</Option>
          </Select>
        </FormItem>
        <FormItem label="开始日期">
          <DatePicker type="date" class="s-140" placeholder="请选择开始日期" v-model="Time[0]"></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker type="date" class="s-140" placeholder="请选择结束日期" v-model="Time[1]"></DatePicker>
        </FormItem>
        <FormItem>
          <Checkbox v-model="searchKey.isLike"></Checkbox>
          <span>模糊</span>
        </FormItem>
        <FormItem>
          <Button type="primary" class="search">查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-search bb mb20">
      <ButtonGroup class="repay-button">
        <Button 
        @click="() => {currentBtn = 'balance'}"
        :class="currentBtn == 'balance' ? 'active' : ''">余额还款</Button>
        <Button
        @click="() => {currentBtn = 'management'}"
         :class="currentBtn == 'management' ? 'active' : ''">金管家抵扣</Button>
        <Button 
        @click="() => {currentBtn = 'refund'}"
        :class="currentBtn == 'refund' ? 'active' : ''">返水抵扣</Button>
      </ButtonGroup>
    </div>
      <balanceRepay v-show="currentBtn == 'balance'"></balanceRepay>
      <managementRepay v-show="currentBtn == 'management'"></managementRepay>
      <refundRepay v-show="currentBtn == 'refund'"></refundRepay>
  </div>
</template>
<script>
import balanceRepay from "./components/balanceRepay";
import managementRepay from './components/managementRepay';
import refundRepay from './components/refundRepay';
export default {
  name: "activityRepay",
  components: {
    balanceRepay,managementRepay,refundRepay
  },
  data() {
    return {
      searchKey: {
        status: "1"
      },
      Time: [],
      //当前按钮
      currentBtn: "balance"
    };
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
</style>


